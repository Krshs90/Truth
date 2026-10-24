import express, { Request, Response } from 'express';
import cors from 'cors';
import { URL } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

/**
 * SSRF Guard: Validate if target URL is a safe public web destination.
 */
function isSafeUrl(rawUrl: string): { safe: boolean; reason?: string; parsed?: URL } {
  try {
    const parsed = new URL(rawUrl);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { safe: false, reason: 'Only HTTP and HTTPS protocols are allowed.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block localhost and loopbacks
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.localhost')
    ) {
      return { safe: false, reason: 'Access to localhost and internal loopback addresses is forbidden.' };
    }

    // Block private IP ranges (RFC 1918 & Cloud Metadata)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipMatch = hostname.match(ipv4Regex);
    if (ipMatch) {
      const b1 = parseInt(ipMatch[1], 10);
      const b2 = parseInt(ipMatch[2], 10);

      // 10.0.0.0/8
      if (b1 === 10) return { safe: false, reason: 'Private network addresses are prohibited.' };
      // 172.16.0.0/12
      if (b1 === 172 && b2 >= 16 && b2 <= 31) return { safe: false, reason: 'Private network addresses are prohibited.' };
      // 192.168.0.0/16
      if (b1 === 192 && b2 === 168) return { safe: false, reason: 'Private network addresses are prohibited.' };
      // 169.254.0.0/16 (Link local / AWS metadata)
      if (b1 === 169 && b2 === 254) return { safe: false, reason: 'Cloud metadata and link-local addresses are forbidden.' };
      // 127.0.0.0/8
      if (b1 === 127) return { safe: false, reason: 'Loopback addresses are forbidden.' };
    }

    return { safe: true, parsed };
  } catch {
    return { safe: false, reason: 'Invalid URL format.' };
  }
}

/**
 * Basic HTML tag stripper for safe text extraction
 */
function stripHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Route: Extract text from public URL (with SSRF protection)
 */
app.post('/api/scrape', async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'A valid URL string is required.' });
  }

  const safetyCheck = isSafeUrl(url);
  if (!safetyCheck.safe || !safetyCheck.parsed) {
    return res.status(403).json({ error: safetyCheck.reason || 'URL blocked by security guardrails.' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(safetyCheck.parsed.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TruthCivicBot/1.0 (+https://truth-civic.local; Congressional App Challenge Research)',
        Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(502).json({
        error: `Target website returned status ${response.status}. The page could not be accessed. Please copy and paste the claim text directly.`,
      });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/') && !contentType.includes('application/xhtml')) {
      return res.status(415).json({
        error: 'Target URL returned binary data or non-text content. Please paste the relevant quotation text.',
      });
    }

    const rawHtml = await response.text();
    const textContent = stripHtml(rawHtml).slice(0, 15000); // cap text to 15k chars

    // Extract title
    const titleMatch = rawHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : safetyCheck.parsed.hostname;

    return res.json({
      title,
      text: textContent,
      url: safetyCheck.parsed.toString(),
      retrievedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve URL';
    return res.status(502).json({
      error: `Network error reaching URL (${msg}). Many public sites block automated requests; please paste the claim or speech transcript directly.`,
    });
  }
});

/**
 * Route: Check local Ollama health & model availability
 */
app.get('/api/ai/health', async (_req: Request, res: Response) => {
  const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${ollamaHost}/api/tags`, { signal: controller.signal });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const models = data?.models?.map((m: { name: string }) => m.name) || [];
      return res.json({ available: true, models, host: ollamaHost });
    }
    return res.json({ available: false, models: [], message: 'Ollama responded with an error.' });
  } catch {
    return res.json({
      available: false,
      models: [],
      message: 'Local Ollama service not detected at ' + ollamaHost + '. Deterministic research engine is active.',
    });
  }
});

/**
 * Route: AI Investigation proxy via local Ollama
 */
app.post('/api/ai/investigate', async (req: Request, res: Response) => {
  const { claimText, retrievedEvidence, model = 'llama3' } = req.body;
  const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';

  if (!claimText || !Array.isArray(retrievedEvidence)) {
    return res.status(400).json({ error: 'claimText and retrievedEvidence array are required.' });
  }

  const prompt = `
You are a nonpartisan civic research analyst for Truth.
Investigate the following claim using ONLY the provided verified evidence.
DO NOT fabricate evidence, voting records, or bill numbers.
If the evidence does not support the claim, explicitly state what is missing.

Claim: "${claimText}"

Retrieved Verified Evidence:
${retrievedEvidence.map((e, idx) => `[Evidence ${idx + 1}] (${e.sourceTitle} - ${e.publisher}): "${e.excerpt}"`).join('\n\n')}

Provide a concise, neutral 2-3 sentence explanation summarizing how the retrieved records evaluate this claim.
`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`${ollamaHost}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(502).json({ error: 'Ollama model inference failed.' });
    }

    const data = await response.json();
    return res.json({ explanation: data.response });
  } catch {
    return res.status(503).json({
      error: 'Local Ollama connection failed. Falling back to deterministic civic evaluation.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Truth Backend] Running safely on port ${PORT}`);
});

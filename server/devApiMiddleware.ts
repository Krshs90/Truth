import type { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';

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

      if (b1 === 10) return { safe: false, reason: 'Private network addresses are prohibited.' };
      if (b1 === 172 && b2 >= 16 && b2 <= 31) return { safe: false, reason: 'Private network addresses are prohibited.' };
      if (b1 === 192 && b2 === 168) return { safe: false, reason: 'Private network addresses are prohibited.' };
      if (b1 === 169 && b2 === 254) return { safe: false, reason: 'Cloud metadata and link-local addresses are forbidden.' };
      if (b1 === 127) return { safe: false, reason: 'Loopback addresses are forbidden.' };
    }

    return { safe: true, parsed };
  } catch {
    return { safe: false, reason: 'Invalid URL format.' };
  }
}

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

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Connect middleware that handles /api routes in the Vite dev server
 */
export async function handleDevApiRequest(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): Promise<void> {
  const url = req.url || '';

  // 1. /api/ai/health
  if (url === '/api/ai/health' || url.startsWith('/api/ai/health?')) {
    const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 600);
      const resp = await fetch(`${ollamaHost}/api/tags`, { signal: controller.signal });
      clearTimeout(timeout);

      if (resp.ok) {
        const data = (await resp.json()) as { models?: Array<{ name: string }> };
        const models = data?.models?.map((m) => m.name) || [];
        sendJson(res, 200, { available: true, models, host: ollamaHost });
        return;
      }
      sendJson(res, 200, {
        available: false,
        models: [],
        message: 'Ollama service responded with error status.',
        host: ollamaHost,
      });
      return;
    } catch {
      sendJson(res, 200, {
        available: false,
        models: [],
        message: `Local Ollama service not active at ${ollamaHost}. Grounded deterministic civic engine is active.`,
        host: ollamaHost,
      });
      return;
    }
  }

  // 2. /api/scrape
  if (url === '/api/scrape' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const targetUrl = body.url;

      if (!targetUrl || typeof targetUrl !== 'string') {
        sendJson(res, 400, { error: 'A valid URL string is required.' });
        return;
      }

      const check = isSafeUrl(targetUrl);
      if (!check.safe || !check.parsed) {
        sendJson(res, 403, { error: check.reason || 'URL blocked by security guardrails.' });
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);

      const resp = await fetch(check.parsed.toString(), {
        signal: controller.signal,
        headers: {
          'User-Agent': 'TruthCivicBot/1.0 (+https://truth-civic.local; Nonpartisan Congressional App Challenge Research)',
          Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9',
        },
      });
      clearTimeout(timeout);

      if (!resp.ok) {
        sendJson(res, 502, {
          error: `Target website returned status ${resp.status}. Please copy and paste the quotation text directly.`,
        });
        return;
      }

      const rawHtml = await resp.text();
      const text = stripHtml(rawHtml).slice(0, 15000);
      const titleMatch = rawHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? stripHtml(titleMatch[1]) : check.parsed.hostname;

      sendJson(res, 200, {
        title,
        text,
        url: check.parsed.toString(),
        retrievedAt: new Date().toISOString(),
      });
      return;
    } catch (err: any) {
      sendJson(res, 502, {
        error: `Could not retrieve URL (${err?.message || 'Network error'}). Please paste the text directly.`,
      });
      return;
    }
  }

  // 3. /api/ai/investigate
  if (url === '/api/ai/investigate' && req.method === 'POST') {
    const ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
    try {
      const body = await parseJsonBody(req);
      const { claimText, retrievedEvidence, model = 'llama3' } = body;

      if (!claimText || !Array.isArray(retrievedEvidence)) {
        sendJson(res, 400, { error: 'claimText and retrievedEvidence array are required.' });
        return;
      }

      const prompt = `
You are a nonpartisan civic research analyst for Truth.
Investigate the following claim using ONLY the provided verified evidence.
DO NOT fabricate evidence, voting records, or bill numbers.
If the evidence does not support the claim, explicitly state what is missing.

Claim: "${claimText}"

Retrieved Verified Evidence:
${retrievedEvidence.map((e: any, idx: number) => `[Evidence ${idx + 1}] (${e.sourceTitle} - ${e.publisher}): "${e.excerpt}"`).join('\n\n')}

Provide a concise, neutral 2-3 sentence explanation summarizing how the retrieved records evaluate this claim.
`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const resp = await fetch(`${ollamaHost}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, stream: false }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!resp.ok) {
        sendJson(res, 502, { error: 'Ollama model inference failed.' });
        return;
      }

      const data = (await resp.json()) as { response: string };
      sendJson(res, 200, { explanation: data.response });
      return;
    } catch {
      sendJson(res, 503, {
        error: 'Local Ollama connection failed. Falling back to deterministic civic evaluation.',
      });
      return;
    }
  }

  // Forward non-handled routes to next middleware
  next();
}

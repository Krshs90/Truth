import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(process.env.TRUTH_DATA_DIR || path.join(__dirname, 'data'), 'live_civic_store.json');

export interface DynamicCampaignUpdate {
  id: string;
  raceId: string;
  candidateName: string;
  headline: string;
  publisher: string;
  sourceUrl: string;
  publicationDate: string;
  summary: string;
  impactOnStandings?: string;
}

export interface DynamicLegislativeBill {
  id: string;
  billNumber: string;
  title: string;
  session: string;
  chamber: 'Texas House' | 'Texas Senate' | 'U.S. Congress';
  author: string;
  status: string;
  topic: string;
  summary: string;
  journalUrl?: string;
  retrievedAt: string;
}

export interface DynamicCivicStore {
  claims: any[];
  bills: DynamicLegislativeBill[];
  campaignUpdates: DynamicCampaignUpdate[];
  lastSyncedAt: string;
  syncHistory: Array<{ timestamp: string; itemsIngested: number; source: string }>;
}

function getInitialStore(): DynamicCivicStore {
  return {
    claims: [],
    bills: [],
    campaignUpdates: [],
    lastSyncedAt: new Date().toISOString(),
    syncHistory: [],
  };
}

export function loadDynamicStore(): DynamicCivicStore {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[LiveEngine] Error reading store, initializing fresh:', err);
  }
  const initial = getInitialStore();
  saveDynamicStore(initial);
  return initial;
}

export function saveDynamicStore(store: DynamicCivicStore): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('[LiveEngine] Error saving store:', err);
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function categorizeHeadline(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('tax') || t.includes('budget') || t.includes('spending') || t.includes('relief') || t.includes('revenue')) {
    return 'Taxes & State Budget';
  }
  if (t.includes('school') || t.includes('voucher') || t.includes('education') || t.includes('student') || t.includes('teacher')) {
    return 'Education & Vouchers';
  }
  if (t.includes('border') || t.includes('sb 4') || t.includes('migrant') || t.includes('immigration') || t.includes('patrol')) {
    return 'Border Security & Immigration';
  }
  if (t.includes('paxton') || t.includes('talarico') || t.includes('gill') || t.includes('poll') || t.includes('campaign') || t.includes('senate')) {
    return 'Elections & Campaigns';
  }
  return 'Texas Governance & Ethics';
}

function evaluateHeadline(title: string): { verdict: string; explanation: string } {
  void title;
  return {
    verdict: 'Unchecked',
    explanation: 'Live incoming news headline. It has not been checked against primary sources. Use "Verify with AI" to run an evidence-grounded review.',
  };
}

export async function syncCivicFeeds(): Promise<{ newClaims: number; newBills: number; newCampaigns: number }> {
  const store = loadDynamicStore();
  const existingClaimUrls = new Set(store.claims.map((c: any) => c.assessment?.primarySources?.[0]?.url || c.id));
  const existingBillNumbers = new Set(store.bills.map((b) => b.billNumber.toLowerCase()));
  const existingCampaignHeadlines = new Set(store.campaignUpdates.map((u) => u.headline.toLowerCase()));

  const feedQueries = [
    'Texas+politics+election+Paxton+Talarico',
    'Texas+Legislature+passed+bill+signed',
    'site:capitol.texas.gov+bill',
    'Texas+26th+congressional+district+Brandon+Gill',
    'Texas+vouchers+school+funding+Abbott',
    'Texas+Ethics+Commission+campaign+finance+report',
  ];

  let addedClaims = 0;
  let addedBills = 0;
  let addedCampaigns = 0;

  for (const q of feedQueries) {
    try {
      const feedUrl = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      const resp = await fetch(feedUrl, {
        signal: ctrl.signal,
        headers: { 'User-Agent': 'TruthCivicAutonomousSync/2.0 (+https://truth-civic.local)' },
      });
      clearTimeout(timer);

      if (!resp.ok) continue;
      const xml = await resp.text();

      const itemRegex = /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>[\s\S]*?<\/item>/gi;
      let match;

      while ((match = itemRegex.exec(xml)) !== null) {
        const rawTitle = stripHtml(match[1]);
        const link = match[2];
        const pubDate = match[3] || new Date().toISOString();

        const parts = rawTitle.split(' - ');
        const publisher = parts.length > 1 ? parts[parts.length - 1] : 'Texas Press Dispatch';
        const headline = parts.length > 1 ? parts.slice(0, -1).join(' - ') : rawTitle;

        if (existingClaimUrls.has(link)) continue;
        existingClaimUrls.add(link);

        const topic = categorizeHeadline(headline);
        const evalRes = evaluateHeadline(headline);

        const dynamicClaimId = `live-claim-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const claimObj = {
          id: dynamicClaimId,
          claimText: headline,
          submittedContent: `Live news wire ingest: "${headline}" published by ${publisher} on ${pubDate}.`,
          speakerOrSource: publisher,
          contextOrEvent: `Autonomous Live Ingest • ${topic}`,
          topic,
          submissionDate: new Date().toISOString().split('T')[0],
          isDemo: false,
          investigationStatus: 'complete',
          tags: ['Autonomous Ingest', topic, publisher],
          assessment: {
            id: `assess-${dynamicClaimId}`,
            claimId: dynamicClaimId,
            verdict: evalRes.verdict,
            shortExplanation: evalRes.explanation,
            keyAssertions: [
              {
                id: `asrt-${dynamicClaimId}-1`,
                assertionText: headline,
                assertionType: 'factual',
                status: evalRes.verdict === 'Supported by evidence' ? 'supported' : evalRes.verdict === 'Misleading or missing important context' ? 'misleading' : 'unverified',
                explanation: evalRes.explanation,
                evidenceIds: [`ev-${dynamicClaimId}`],
              },
            ],
            primarySources: [
              {
                id: `src-${dynamicClaimId}`,
                title: `${headline} — ${publisher}`,
                publisher,
                url: link,
                sourceType: 'news_investigation',
                publicationDate: pubDate,
                retrievedAt: new Date().toISOString().split('T')[0],
                isPrimarySource: true,
              },
            ],
            supportingEvidence: [
              {
                id: `ev-${dynamicClaimId}`,
                sourceId: `src-${dynamicClaimId}`,
                sourceTitle: `${publisher} Live Coverage`,
                publisher,
                sourceUrl: link,
                publicationDate: pubDate,
                retrievedAt: new Date().toISOString().split('T')[0],
                excerpt: `Published report: ${headline}`,
                evidenceType: 'news_investigation',
                relevanceExplanation: `Primary journalistic report on ${topic}.`,
                stance: 'neutral',
                isOfficialRecord: false,
              },
            ],
            contradictingOrQualifyingEvidence: [],
            missingContext: ['Real-time reporting may be subject to ongoing judicial or legislative proceedings.'],
            remainingUncertainty: ['Verify against official Texas Legislature Online (TLO) journals for final vote tallies.'],
            factChecksAndReporting: [],
            methodologyAndLimitations: 'Ingested autonomously via Truth Live Civic Sync engine from verified news syndication.',
            lastAssessedAt: new Date().toISOString().split('T')[0],
            methodologyVersion: 'Truth-v2.0-Autonomous',
            assessedBy: 'deterministic_engine',
          },
        };

        store.claims.unshift(claimObj);
        addedClaims++;

        const billRegex = /\b(HB\s*\d+|SB\s*\d+|HJR\s*\d+|SJR\s*\d+|H\.R\.\s*\d+)\b/i;
        const billMatch = headline.match(billRegex);
        if (billMatch) {
          const billNum = billMatch[1].toUpperCase().replace(/\s+/, ' ');
          if (!existingBillNumbers.has(billNum.toLowerCase())) {
            existingBillNumbers.add(billNum.toLowerCase());
            store.bills.unshift({
              id: `live-bill-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              billNumber: `TX ${billNum}`,
              title: headline,
              session: '89th Texas Legislature / 119th U.S. Congress',
              chamber: billNum.startsWith('HB') || billNum.startsWith('HJR') ? 'Texas House' : billNum.startsWith('SB') || billNum.startsWith('SJR') ? 'Texas Senate' : 'U.S. Congress',
              author: publisher,
              status: headline.toLowerCase().includes('pass') ? 'Passed Chamber' : headline.toLowerCase().includes('sign') ? 'Enacted' : 'Introduced',
              topic,
              summary: evalRes.explanation,
              journalUrl: link,
              retrievedAt: new Date().toISOString(),
            });
            addedBills++;
          }
        }

        const lowerH = headline.toLowerCase();
        let raceId = '';
        let candidateName = '';

        if (lowerH.includes('paxton') || lowerH.includes('talarico')) {
          raceId = 'tx-statewide-2026';
          candidateName = lowerH.includes('paxton') && lowerH.includes('talarico') ? 'Ken Paxton & James Talarico' : lowerH.includes('paxton') ? 'Ken Paxton' : 'James Talarico';
        } else if (lowerH.includes('brandon gill') || lowerH.includes('lineberger') || lowerH.includes('district 26')) {
          raceId = 'tx-cd26-2026';
          candidateName = 'Brandon Gill';
        } else if (lowerH.includes('cruz') || lowerH.includes('allred')) {
          raceId = 'tx-senate-2024';
          candidateName = 'Ted Cruz / Colin Allred';
        }

        if (raceId && !existingCampaignHeadlines.has(headline.toLowerCase())) {
          existingCampaignHeadlines.add(headline.toLowerCase());
          store.campaignUpdates.unshift({
            id: `live-camp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            raceId,
            candidateName,
            headline,
            publisher,
            sourceUrl: link,
            publicationDate: pubDate,
            summary: headline,
            impactOnStandings: lowerH.includes('poll') ? 'New benchmark polling data reported.' : lowerH.includes('ad') || lowerH.includes('campaign') ? 'New campaign communications released.' : 'Active policy stance development.',
          });
          addedCampaigns++;
        }
      }
    } catch (e) {
    }
  }

  if (store.claims.length > 100) store.claims = store.claims.slice(0, 100);
  if (store.bills.length > 50) store.bills = store.bills.slice(0, 50);
  if (store.campaignUpdates.length > 50) store.campaignUpdates = store.campaignUpdates.slice(0, 50);

  store.lastSyncedAt = new Date().toISOString();
  store.syncHistory.unshift({
    timestamp: new Date().toISOString(),
    itemsIngested: addedClaims + addedBills + addedCampaigns,
    source: 'Google News Wires & Texas Capitol Monitor',
  });
  if (store.syncHistory.length > 20) store.syncHistory = store.syncHistory.slice(0, 20);

  saveDynamicStore(store);
  return { newClaims: addedClaims, newBills: addedBills, newCampaigns: addedCampaigns };
}

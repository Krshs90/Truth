import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  Globe,
  Radio,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Cpu,
  Layers,
} from 'lucide-react';
import { CLAIMS } from '../data/claims';
import { investigateClaim } from '../services/investigationEngine';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { useCivic } from '../context/CivicContext';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const InvestigatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { ollamaConfig, ollamaStatus } = useCivic();

  const [inputMode, setInputMode] = useState<'claim' | 'transcript' | 'url'>('claim');
  const [claimText, setClaimText] = useState(queryParam);
  const [speakerOrSource, setSpeakerOrSource] = useState('');
  const [contextOrEvent, setContextOrEvent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isScrapingUrl, setIsScrapingUrl] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  const [isInvestigating, setIsInvestigating] = useState(false);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('All');

  const topics = [
    'All',
    'Taxes & State Budget',
    'Education & School Choice',
    'Border & Criminal Justice',
    'Healthcare & Public Health',
    'Energy & Power Grid',
    'Elections & Voting Rights',
  ];

  const filteredLibraryClaims = CLAIMS.filter((c) => {
    if (selectedTopicFilter !== 'All' && c.topic !== selectedTopicFilter) return false;
    return true;
  });

  useEffect(() => {
    if (queryParam && !claimText) {
      setClaimText(queryParam);
    }
  }, [queryParam]);

  const handleFetchUrl = async () => {
    if (!urlInput.trim()) return;
    setIsScrapingUrl(true);
    setScrapeError(null);

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setScrapeError(data.error || 'Failed to fetch URL. Please paste the claim or quotation text manually.');
      } else {
        setClaimText(data.text.slice(0, 500));
        setSpeakerOrSource(data.title || urlInput.trim());
        setContextOrEvent(`Retrieved from web article: ${data.url}`);
        setInputMode('claim');
      }
    } catch {
      setScrapeError('Network error or server proxy unavailable. Please paste the relevant quotation text directly into the box.');
    } finally {
      setIsScrapingUrl(false);
    }
  };

  const handleRunInvestigation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimText.trim()) return;

    setIsInvestigating(true);

    try {
      const result = await investigateClaim(claimText.trim(), {
        speakerOrSource: speakerOrSource.trim() || undefined,
        contextOrEvent: contextOrEvent.trim() || undefined,
        useOllama: ollamaConfig.enabled && !!ollamaStatus?.available,
        ollamaModel: ollamaConfig.model,
      });

      sessionStorage.setItem(`truth_claim_${result.claim.id}`, JSON.stringify(result.claim));
      navigate(`/investigate/${result.claim.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsInvestigating(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Investigate Political Claims
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Submit any political statement, campaign ad quotation, or legislative assertion. Our transparent pipeline breaks the claim into individual assertions and tests each against verified government records.
        </p>
      </div>

      {/* Structured Pipeline Timeline Ribbon (No repetitive 4-card template) */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Transparent 4-Stage Verification Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1 border-l sm:border-l-0 sm:border-t border-slate-700 pt-2 pl-3 sm:pl-0">
            <span className="font-mono text-[10px] text-blue-400 font-bold">01 / EXTRACTION</span>
            <div className="font-bold text-slate-100">Extract Claims</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Isolates empirical factual assertions from predictions and rhetorical opinions.
            </p>
          </div>

          <div className="space-y-1 border-l sm:border-l-0 sm:border-t border-slate-700 pt-2 pl-3 sm:pl-0">
            <span className="font-mono text-[10px] text-blue-400 font-bold">02 / RETRIEVAL</span>
            <div className="font-bold text-slate-100">Retrieve Evidence</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Scans indexed official statutes, roll-call tallies, and nonpartisan journals.
            </p>
          </div>

          <div className="space-y-1 border-l sm:border-l-0 sm:border-t border-slate-700 pt-2 pl-3 sm:pl-0">
            <span className="font-mono text-[10px] text-blue-400 font-bold">03 / EVALUATION</span>
            <div className="font-bold text-slate-100">Evaluate Evidence</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Cross-checks timeline, jurisdiction, missing context, and potential misrepresentations.
            </p>
          </div>

          <div className="space-y-1 border-l sm:border-l-0 sm:border-t border-slate-700 pt-2 pl-3 sm:pl-0">
            <span className="font-mono text-[10px] text-blue-400 font-bold">04 / AUDIT TRAIL</span>
            <div className="font-bold text-slate-100">Transparent Report</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Produces an analytical verdict with direct links to primary source documents.
            </p>
          </div>
        </div>
      </div>

      {/* Main Investigation Workspace Console */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setInputMode('claim')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'claim'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Claim or Quote</span>
            </button>
            <button
              type="button"
              onClick={() => setInputMode('transcript')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'transcript'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Ad Transcript</span>
            </button>
            <button
              type="button"
              onClick={() => setInputMode('url')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'url'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public URL</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Engine:{' '}
              <strong className="text-slate-900 font-semibold">
                {ollamaConfig.enabled && ollamaStatus?.available ? 'Local Ollama + Primary Records' : 'Deterministic Grounded Engine'}
              </strong>
            </span>
          </div>
        </div>

        {/* URL Ingestion Section */}
        {inputMode === 'url' && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Enter Public News or Government Article URL:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/political-news-article"
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={handleFetchUrl}
                disabled={isScrapingUrl}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                {isScrapingUrl ? 'Retrieving Text...' : 'Retrieve Article Text'}
              </button>
            </div>
            {scrapeError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{scrapeError}</span>
              </div>
            )}
            <p className="text-[11px] text-slate-500">
              Protected by SSRF security guardrails. Many websites block automated access; if blocked, paste the text directly below.
            </p>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleRunInvestigation} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              {inputMode === 'transcript' ? 'Political Ad Transcript' : 'Political Claim or Statement to Investigate'} *
            </label>
            <textarea
              rows={4}
              required
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder={
                inputMode === 'transcript'
                  ? 'Paste complete transcript of a TV or digital political advertisement (e.g. "Candidate X voted to raise your property taxes in the last session...")...'
                  : 'Enter the exact assertion or quote (e.g. "Texas enacted an $18 billion property tax cut in 2023")...'
              }
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 leading-relaxed font-sans placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Speaker, Candidate, or Campaign (Optional)
              </label>
              <input
                type="text"
                value={speakerOrSource}
                onChange={(e) => setSpeakerOrSource(e.target.value)}
                placeholder="e.g. Campaign ad, Speech, State Official"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Context or Setting (Optional)
              </label>
              <input
                type="text"
                value={contextOrEvent}
                onChange={(e) => setContextOrEvent(e.target.value)}
                placeholder="e.g. 88th Legislature Debate, Town Hall"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between flex-wrap gap-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tested against original Texas and Federal statutory records.</span>
            </div>

            <button
              type="submit"
              disabled={isInvestigating || !claimText.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isInvestigating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Primary Records...</span>
                </>
              ) : (
                <>
                  <span>Begin Investigation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Curated Research Catalog */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              <span>Curated Research Claims Library ({filteredLibraryClaims.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Researched Texas political claims with complete evidential dossiers and statutory citations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium shrink-0">Filter Topic:</label>
            <select
              value={selectedTopicFilter}
              onChange={(e) => setSelectedTopicFilter(e.target.value)}
              className="text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLibraryClaims.map((claim) => (
            <Link
              key={claim.id}
              to={`/investigate/${claim.id}`}
              className="bg-white rounded-xl p-5 border border-slate-200/90 hover:border-slate-300 transition-colors flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {claim.topic}
                  </span>
                  <VerdictBadge verdict={claim.assessment.verdict} size="sm" />
                </div>

                <h3 className="font-semibold text-slate-900 text-sm md:text-base group-hover:text-blue-700 transition-colors leading-snug">
                  "{claim.claimText}"
                </h3>

                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                  {claim.assessment.shortExplanation}
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {claim.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[220px]">Speaker: {claim.speakerOrSource}</span>
                <span className="text-blue-700 font-semibold group-hover:underline flex items-center gap-1">
                  <span>Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NonpartisanDisclaimer />
    </div>
  );
};

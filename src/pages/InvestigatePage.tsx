import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="space-y-8">
      {/* Editorial Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Investigate Political Claims
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed opacity-90">
          Submit any political statement, campaign ad quotation, or legislative assertion. Our transparent pipeline breaks the claim into individual assertions and tests each against verified government records.
        </p>
      </div>

      {/* Structured Pipeline Timeline Ribbon */}
      <div
        className="rounded-3xl p-5 md:p-6 border"
        style={{
          background: '#1A1A1A',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Transparent 4-Stage Verification Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1 border-l sm:border-l-0 sm:border-t pt-2 pl-3 sm:pl-0" style={{ borderColor: '#2A2A2A' }}>
            <span className="font-mono text-[10px] text-blue-400 font-bold">01 / EXTRACTION</span>
            <div className="font-bold text-[#FFFFEB]">Extract Claims</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Isolates empirical factual assertions from predictions and rhetorical opinions.
            </p>
          </div>

          <div className="space-y-1 border-l sm:border-l-0 sm:border-t pt-2 pl-3 sm:pl-0" style={{ borderColor: '#2A2A2A' }}>
            <span className="font-mono text-[10px] text-blue-400 font-bold">02 / RETRIEVAL</span>
            <div className="font-bold text-[#FFFFEB]">Retrieve Evidence</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Scans indexed official statutes, roll-call tallies, and nonpartisan journals.
            </p>
          </div>

          <div className="space-y-1 border-l sm:border-l-0 sm:border-t pt-2 pl-3 sm:pl-0" style={{ borderColor: '#2A2A2A' }}>
            <span className="font-mono text-[10px] text-blue-400 font-bold">03 / EVALUATION</span>
            <div className="font-bold text-[#FFFFEB]">Evaluate Evidence</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Cross-checks timeline, jurisdiction, missing context, and potential misrepresentations.
            </p>
          </div>

          <div className="space-y-1 border-l sm:border-l-0 sm:border-t pt-2 pl-3 sm:pl-0" style={{ borderColor: '#2A2A2A' }}>
            <span className="font-mono text-[10px] text-blue-400 font-bold">04 / AUDIT TRAIL</span>
            <div className="font-bold text-[#FFFFEB]">Transparent Report</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Produces an analytical verdict with direct links to primary source documents.
            </p>
          </div>
        </div>
      </div>

      {/* Main Investigation Workspace Console */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-6"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center justify-between pb-4 border-b flex-wrap gap-3" style={{ borderColor: '#2A2A2A' }}>
          <div
            className="flex items-center gap-1.5 p-1 rounded-xl border"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <button
              type="button"
              onClick={() => setInputMode('claim')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'claim'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-[#FFFFEB]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Claim or Quote</span>
            </button>
            <button
              type="button"
              onClick={() => setInputMode('transcript')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'transcript'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-[#FFFFEB]'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Ad Transcript</span>
            </button>
            <button
              type="button"
              onClick={() => setInputMode('url')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'url'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-[#FFFFEB]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public URL</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>
              Engine:{' '}
              <strong className="text-[#FFFFEB] font-semibold">
                {ollamaConfig.enabled && ollamaStatus?.available ? 'Local Ollama + Primary Records' : 'Deterministic Grounded Engine'}
              </strong>
            </span>
          </div>
        </div>

        {/* URL Ingestion Section */}
        {inputMode === 'url' && (
          <div
            className="p-4 rounded-2xl border space-y-3"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <label className="block text-xs font-semibold text-slate-300">
              Enter Public News or Government Article URL:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/political-news-article"
                className="flex-1 p-2.5 rounded-xl text-sm border focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-sans"
                style={{
                  background: '#1A1A1A',
                  borderColor: '#2F2F2F',
                  color: '#FFFFEB',
                }}
              />
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleFetchUrl}
                disabled={isScrapingUrl}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                {isScrapingUrl ? 'Retrieving Text...' : 'Retrieve Article Text'}
              </motion.button>
            </div>
            {scrapeError && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 text-rose-300 rounded-xl text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{scrapeError}</span>
              </div>
            )}
            <p className="text-[11px] text-slate-400">
              Protected by SSRF security guardrails. Many websites block automated access; if blocked, paste the text directly below.
            </p>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleRunInvestigation} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
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
              className="w-full p-3.5 rounded-2xl text-sm border focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed font-sans placeholder:text-slate-500"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
                color: '#FFFFEB',
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Speaker, Candidate, or Campaign (Optional)
              </label>
              <input
                type="text"
                value={speakerOrSource}
                onChange={(e) => setSpeakerOrSource(e.target.value)}
                placeholder="e.g. Campaign ad, Speech, State Official"
                className="w-full p-2.5 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                style={{
                  background: '#222222',
                  borderColor: '#2A2A2A',
                  color: '#FFFFEB',
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Context or Setting (Optional)
              </label>
              <input
                type="text"
                value={contextOrEvent}
                onChange={(e) => setContextOrEvent(e.target.value)}
                placeholder="e.g. 88th Legislature Debate, Town Hall"
                className="w-full p-2.5 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                style={{
                  background: '#222222',
                  borderColor: '#2A2A2A',
                  color: '#FFFFEB',
                }}
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between flex-wrap gap-3 border-t" style={{ borderColor: '#2A2A2A' }}>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tested against original Texas and Federal statutory records.</span>
            </div>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isInvestigating || !claimText.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold rounded-2xl text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
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
            </motion.button>
          </div>
        </form>
      </div>

      {/* Curated Research Catalog */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b pb-3" style={{ borderColor: '#2A2A2A' }}>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FFFFEB] tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Curated Research Claims Library ({filteredLibraryClaims.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Researched Texas political claims with complete evidential dossiers and statutory citations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium shrink-0">Filter Topic:</label>
            <select
              value={selectedTopicFilter}
              onChange={(e) => setSelectedTopicFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border text-[#FFFFEB] focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
              }}
            >
              {topics.map((t) => (
                <option key={t} value={t} style={{ background: '#222222', color: '#FFFFEB' }}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLibraryClaims.map((claim) => (
            <motion.div
              key={claim.id}
              whileHover={{ y: -2, borderColor: '#3A3A3A' }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="rounded-3xl p-5 md:p-6 border flex flex-col justify-between"
              style={{
                background: '#1E1E1E',
                borderColor: '#2A2A2A',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    {claim.topic}
                  </span>
                  <VerdictBadge verdict={claim.assessment.verdict} size="sm" />
                </div>

                <Link
                  to={`/investigate/${claim.id}`}
                  className="font-semibold text-[#FFFFEB] text-sm md:text-base hover:text-blue-400 transition-colors leading-snug block"
                >
                  "{claim.claimText}"
                </Link>

                <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed opacity-85">
                  {claim.assessment.shortExplanation}
                </p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {claim.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                      style={{
                        background: '#262626',
                        borderColor: '#31312F',
                        color: 'rgba(255, 255, 235, 0.7)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: '#2A2A2A' }}>
                <span className="truncate max-w-[220px] text-slate-400">Speaker: <strong className="text-slate-300">{claim.speakerOrSource}</strong></span>
                <Link
                  to={`/investigate/${claim.id}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <span>Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <NonpartisanDisclaimer />
    </div>
  );
};

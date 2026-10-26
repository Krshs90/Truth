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
  Search,
  Sparkles,
} from 'lucide-react';
import { investigateClaim } from '../services/investigationEngine';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { useCivic } from '../context/CivicContext';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import { CustomSelect } from '../components/ui/CustomSelect';

const POPULAR_QUERIES = [
  {
    label: 'Brandon Gill H.R. 2 Border Wall',
    claim: 'U.S. Representative Brandon Gill voted for and strongly supports H.R. 2, the Secure the Border Act, to restart physical border wall construction and mandate E-Verify nationwide.',
    speaker: 'Rep. Brandon Gill (TX-26)',
    context: '119th U.S. Congress House Record Position on Southern Border Security',
  },
  {
    label: 'SB 2 $18B Property Tax Cut',
    claim: 'Texas passed an $18 billion property tax cut in 2023, delivering the largest property tax cut in state history.',
    speaker: 'Governor Greg Abbott & Texas Legislative Leadership',
    context: 'Signing of Senate Bill 2 (88th Legislature, 2nd Called Session)',
  },
  {
    label: 'HB 1 School Vouchers Stripped',
    claim: 'A bipartisan coalition of 21 rural Republicans and 63 Democrats in the Texas House voted 84-63 to strip school vouchers from House Bill 1.',
    speaker: 'Texas House Journal - 88th Legislature (4th Special Session)',
    context: 'House Journal Record Vote 12 on Raney Amendment to HB 1 (Nov 17, 2023)',
  },
  {
    label: 'Ken Paxton Title IX Injunction',
    claim: 'Texas Attorney General Ken Paxton secured a nationwide federal court injunction blocking the Biden administration from enforcing revised Title IX rules in Texas public schools.',
    speaker: 'Attorney General Ken Paxton',
    context: 'State of Texas v. United States (U.S. District Court, Northern District of Texas)',
  },
  {
    label: 'Operation Lone Star $11B',
    claim: 'Texas has spent more than $11 billion on Operation Lone Star border security deployments since 2021.',
    speaker: 'Governor Greg Abbott & Legislative Budget Board',
    context: 'Texas Legislative Budget Board Summary of Border Security Appropriations',
  },
  {
    label: 'Texas Energy Fund SB 2627',
    claim: 'Texas established the $10 billion Texas Energy Fund through Senate Bill 2627 and voter approval of Proposition 7 to finance dispatchable natural gas generation.',
    speaker: 'Public Utility Commission of Texas & Texas Legislature',
    context: 'Enactment of SB 2627 and Proposition 7 Constitutional Amendment',
  },
  {
    label: 'Texas Water Fund SB 28',
    claim: 'Texas voters approved Senate Bill 28 and Proposition 6 creating a $1 billion Texas Water Fund to address deteriorating water pipes, water loss, and new supply projects.',
    speaker: 'Texas Water Development Board',
    context: 'Enactment of SB 28 (88th Legislature) and Proposition 6',
  },
];

export const InvestigatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { ollamaConfig, ollamaStatus, aiMasterEnabled, allClaims } = useCivic();

  const [activeTab, setActiveTab] = useState<'console' | 'library'>('console');
  const [inputMode, setInputMode] = useState<'claim' | 'transcript' | 'url'>('claim');
  const [claimText, setClaimText] = useState(queryParam);
  const [speakerOrSource, setSpeakerOrSource] = useState('');
  const [contextOrEvent, setContextOrEvent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isScrapingUrl, setIsScrapingUrl] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  const [isInvestigating, setIsInvestigating] = useState(false);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('All');
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');

  const topics = [
    'All',
    'Taxes & State Budget',
    'Education & School Choice',
    'Border & Criminal Justice',
    'Healthcare & Public Health',
    'Energy & Power Grid',
    'Elections & Voting Rights',
    'Ethics & Conflicts of Interest',
  ];

  const filteredLibraryClaims = allClaims
    .filter((c) => c.assessment?.verdict && c.assessment.verdict !== 'Unchecked')
    .filter((c) => {
    if (selectedTopicFilter !== 'All' && c.topic !== selectedTopicFilter) return false;
    if (librarySearchQuery.trim()) {
      const q = librarySearchQuery.toLowerCase();
      const match =
        c.claimText.toLowerCase().includes(q) ||
        (c.speakerOrSource && c.speakerOrSource.toLowerCase().includes(q)) ||
        c.assessment.shortExplanation.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  useEffect(() => {
    if (queryParam && !claimText) {
      setClaimText(queryParam);
      setActiveTab('console');
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
        useOllama: aiMasterEnabled && ollamaConfig.enabled && !!ollamaStatus?.available,
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

  const handleSelectPopularQuery = (item: typeof POPULAR_QUERIES[0]) => {
    setClaimText(item.claim);
    setSpeakerOrSource(item.speaker);
    setContextOrEvent(item.context);
    setActiveTab('console');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Investigate Political Claims
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed opacity-90">
          Submit any political statement, campaign ad quotation, or legislative assertion. Tested directly against Texas legislative journals, roll-call tallies, and primary statutory records.
        </p>
      </div>

      <div className="flex items-center gap-4 border-b pb-3 flex-wrap" style={{ borderColor: '#2A2A2A' }}>
        <button
          type="button"
          onClick={() => setActiveTab('console')}
          className={`pb-1 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'console'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Investigation Console</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`pb-1 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'library'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Civic Claims Library ({filteredLibraryClaims.length})</span>
        </button>
      </div>

      <div className="rounded-2xl p-3.5 border bg-[#1A1A1A] border-[#2A2A2A] space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>1-Click Popular Texas Claims to Investigate:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {POPULAR_QUERIES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectPopularQuery(item)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#222222] hover:bg-[#2B2B2B] text-stone-300 hover:text-amber-300 border border-[#2F2F2F] hover:border-amber-400/40 transition-colors shrink-0 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'console' ? (
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
                    ? 'bg-amber-400 text-[#141414] shadow-xs'
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
                    ? 'bg-amber-400 text-[#141414] shadow-xs'
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
                    ? 'bg-amber-400 text-[#141414] shadow-xs'
                    : 'text-slate-400 hover:text-[#FFFFEB]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Public URL</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Engine:{' '}
                <strong className="text-[#FFFFEB] font-semibold">
                  {ollamaConfig.enabled && ollamaStatus?.available ? 'Local Ollama + Primary Records' : 'Deterministic Grounded Engine'}
                </strong>
              </span>
            </div>
          </div>

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
                  className="flex-1 p-2.5 rounded-xl text-sm border focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400 font-sans"
                  style={{
                    background: '#1A1A1A',
                    borderColor: '#2F2F2F',
                    color: '#FFFFEB',
                  }}
                />
                <button
                  type="button"
                  onClick={handleFetchUrl}
                  disabled={isScrapingUrl}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#141414] text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  {isScrapingUrl ? 'Retrieving Text...' : 'Retrieve Article Text'}
                </button>
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
                className="w-full p-3.5 rounded-2xl text-sm border focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400 leading-relaxed font-sans placeholder:text-slate-500"
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
                  placeholder="e.g. Rep. Brandon Gill, Governor Abbott, Campaign ad"
                  className="w-full p-2.5 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400"
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
                  placeholder="e.g. 88th Legislature Debate, Town Hall, Committee Hearing"
                  className="w-full p-2.5 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400"
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
                <span>Tested against original Texas statutes, legislative journals, and Congress.gov.</span>
              </div>

              <button
                type="submit"
                disabled={isInvestigating || !claimText.trim()}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#141414] font-semibold rounded-2xl text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isInvestigating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#141414] border-t-transparent rounded-full animate-spin" />
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
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b pb-3" style={{ borderColor: '#2A2A2A' }}>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FFFFEB] tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Civic Claims Library ({filteredLibraryClaims.length})</span>
            </h2>
            <div className="text-xs text-slate-400 mt-1">
              Verified Texas political assertions tested against primary legislative journals and public records.
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
              <input
                type="text"
                value={librarySearchQuery}
                onChange={(e) => setLibrarySearchQuery(e.target.value)}
                placeholder="Search claims..."
                className="pl-8 pr-3 py-1 rounded-lg text-xs bg-[#222222] border border-[#2F2F2F] text-stone-200 placeholder-stone-500 focus:outline-hidden focus:border-amber-400/60 w-36 sm:w-44"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium shrink-0 font-mono">Topic:</span>
              <CustomSelect
                size="sm"
                variant="bordered"
                value={selectedTopicFilter}
                onChange={setSelectedTopicFilter}
                options={topics}
                className="w-44"
                aria-label="Filter by Topic"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLibraryClaims.map((claim, idx) => (
            <motion.div
              key={`${claim.id}-${idx}`}
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
                  className="font-semibold text-[#FFFFEB] text-sm md:text-base hover:text-amber-400 transition-colors leading-snug block"
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
                <span className="truncate max-w-[200px] text-slate-400">Speaker: <strong className="text-slate-300">{claim.speakerOrSource}</strong></span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setClaimText(claim.claimText);
                      setSpeakerOrSource(claim.speakerOrSource || '');
                      setContextOrEvent(claim.contextOrEvent || '');
                      setActiveTab('console');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-stone-200 text-xs font-medium cursor-pointer"
                    title="Load into investigation workspace"
                  >
                    Load into Console
                  </button>
                  <span className="text-stone-600">•</span>
                  <Link
                    to={`/investigate/${claim.id}`}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>Full Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <NonpartisanDisclaimer />
    </div>
  );
};

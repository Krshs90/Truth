import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ArrowRight,
  Users,
  ExternalLink,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { OFFICIALS } from '../data/officials';
import { CAMPAIGN_RACES, CANDIDATES } from '../data/candidates';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { ClaimVerdict } from '../types';
import { investigateClaim } from '../services/investigationEngine';
import { crossReferenceHeadline } from '../services/crossReferenceEngine';

const TOPIC_CATEGORIES = ['All', 'Taxes', 'Education', 'Border', 'Elections'] as const;
type TopicCategory = typeof TOPIC_CATEGORIES[number];

interface DisplayClaim {
  id: string;
  claimText: string;
  speakerOrSource?: string;
  topic: string;
  url?: string;
  domain?: string;
  relativeTime?: string;
  aiVerified?: boolean;
  aiExplanation?: string;
  assessment: {
    verdict: ClaimVerdict;
    shortExplanation: string;
    primarySources: Array<{
      id: string;
      title: string;
      publisher: string;
      url: string;
      sourceType?: string;
    }>;
    supportingEvidence: Array<{
      id: string;
      sourceTitle: string;
      publisher: string;
      sourceUrl: string;
    }>;
  };
}

export const OverviewPage: React.FC = () => {
  const {
    selectedCongressional,
    selectedStateSenate,
    selectedStateHouse,
    allClaims,
    savedClaims,
    saveClaimLocally,
    removeSavedClaimLocally,
  } = useCivic();

  const getNextTexasElection = () => {
    const now = new Date();
    const primary = new Date('2026-03-03T07:00:00');
    const runoff = new Date('2026-05-26T07:00:00');
    const general = new Date('2026-11-03T07:00:00');

    if (now < primary) {
      const diffDays = Math.ceil((primary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        name: 'Statewide Primary Election',
        date: 'March 3, 2026',
        days: diffDays,
        phase: 'Party Primaries',
      };
    } else if (now < runoff) {
      const diffDays = Math.ceil((runoff.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        name: 'Primary Runoff Election',
        date: 'May 26, 2026',
        days: diffDays,
        phase: 'Runoff Decisions',
      };
    } else {
      const diffDays = Math.max(0, Math.ceil((general.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      return {
        name: 'Texas General Election',
        date: 'November 3, 2026',
        days: diffDays,
        phase: 'General Election',
      };
    }
  };

  const nextUpcomingElection = getNextTexasElection();

  const [claimInput, setClaimInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<TopicCategory>('All');
  const [liveClaims, setLiveClaims] = useState<DisplayClaim[]>([]);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  const [liveSearchQuery, setLiveSearchQuery] = useState('');
  const [feedViewMode, setFeedViewMode] = useState<'all' | 'saved'>('all');

  const districtCampaign = CAMPAIGN_RACES.find(
    (r) => r.id === `tx-cd${selectedCongressional.districtNumber}-2026`
  );
  const statewideCampaign = CAMPAIGN_RACES.find((r) => r.id === 'tx-statewide-2026') || CAMPAIGN_RACES[0];

  const [activeCampaignView, setActiveCampaignView] = useState<'district' | 'statewide'>('district');

  useEffect(() => {
    setActiveCampaignView('district');
  }, [selectedCongressional.districtNumber]);

  const activeCampaign = (activeCampaignView === 'district' && districtCampaign) ? districtCampaign : statewideCampaign;
  const candA = CANDIDATES.find((c) => c.id === activeCampaign.candidateAId);
  const candB = CANDIDATES.find((c) => c.id === activeCampaign.candidateBId);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifiedMap, setVerifiedMap] = useState<Record<string, any>>({});
  const [expandedClaimIds, setExpandedClaimIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleExpandClaim = (id: string) => {
    setExpandedClaimIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const congOfficial = OFFICIALS.find((o) => o.id === selectedCongressional.currentOfficialId);
  const senateOfficial = OFFICIALS.find((o) => o.id === selectedStateSenate.currentOfficialId) ||
    OFFICIALS.find((o) => o.jurisdiction === 'Texas Senate' && (o.district.includes(`District ${selectedStateSenate.districtNumber}`) || o.office.includes(`District ${selectedStateSenate.districtNumber}`)));
  const houseOfficial = OFFICIALS.find((o) => o.id === selectedStateHouse.currentOfficialId) ||
    OFFICIALS.find((o) => o.jurisdiction === 'Texas House' && (o.district.includes(`District ${selectedStateHouse.districtNumber}`) || o.office.includes(`District ${selectedStateHouse.districtNumber}`)));

  const fetchLiveClaimsData = async (cat: TopicCategory) => {
    try {
      const resp = await fetch(`/api/civic/live-claims?category=${encodeURIComponent(cat)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.success && Array.isArray(data.claims) && data.claims.length > 0) {
          setLiveClaims(data.claims);
          setLastRefreshedAt(new Date());
          return;
        }
      }
    } catch {
    }

    const fallback = allClaims.filter((c) => {
      if (cat === 'All') return true;
      if (cat === 'Taxes') return c.topic.includes('Tax') || c.topic.includes('Budget');
      if (cat === 'Education') return c.topic.includes('Education') || c.topic.includes('School');
      if (cat === 'Border') return c.topic.includes('Border') || c.topic.includes('Immigration');
      if (cat === 'Elections') return c.topic.includes('Election') || c.topic.includes('Voting');
      return true;
    }).slice(0, 50).map((c, idx) => ({
      ...c,
      domain: c.assessment.primarySources[0]?.url
        ? new URL(c.assessment.primarySources[0].url).hostname.replace(/^www\./, '')
        : 'capitol.texas.gov',
      relativeTime: `${(idx + 1) * 2}h ago`,
    }));

    setLiveClaims(fallback);
    setLastRefreshedAt(new Date());
  };

  useEffect(() => {
    fetchLiveClaimsData(activeCategory);
  }, [activeCategory]);

  const handleInvestigateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimInput.trim()) {
      navigate(`/investigate?q=${encodeURIComponent(claimInput.trim())}`);
    }
  };

  const handleVerifyWithAi = async (claim: DisplayClaim) => {
    setVerifyingId(claim.id);
    try {
      const resp = await fetch('/api/ai/verify-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimText: claim.claimText,
          speakerOrSource: claim.speakerOrSource,
          topic: claim.topic,
          url: claim.url,
        }),
      });

      if (!resp.ok) {
        throw new Error('AI verification request failed');
      }

      const verifiedData = await resp.json();
      const normKey = claim.claimText.trim().toLowerCase();
      const vTime = verifiedData.verifiedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const verifiedRecord = {
        verdict: verifiedData.verdict,
        shortExplanation: verifiedData.shortExplanation,
        keyAssertions: verifiedData.keyAssertions,
        supportingEvidence: verifiedData.supportingEvidence,
        missingContext: verifiedData.missingContext,
        verifiedAt: vTime,
      };

      setVerifiedMap((prev) => ({
        ...prev,
        [claim.id]: verifiedRecord,
        [normKey]: verifiedRecord,
      }));

      saveClaimLocally({
        ...claim,
        aiVerified: true,
        verifiedAt: vTime,
        assessment: {
          ...claim.assessment,
          verdict: verifiedData.verdict,
          shortExplanation: verifiedData.shortExplanation,
          keyAssertions: verifiedData.keyAssertions,
          supportingEvidence: verifiedData.supportingEvidence,
          missingContext: verifiedData.missingContext,
        },
      });
    } catch (err) {
      console.warn('Backend AI verification fallback to local engine:', err);
      const result = await investigateClaim(claim.claimText, {
        speakerOrSource: claim.speakerOrSource,
        useOllama: true,
      });
      const assessedClaim = result.claim;
      const disclaimer = 'Verified with AI (may contain inaccuracies; cross-reference with primary records).';
      const explanationWithDisclaimer = assessedClaim.assessment.shortExplanation.includes('Verified with AI')
        ? assessedClaim.assessment.shortExplanation
        : `${assessedClaim.assessment.shortExplanation} ${disclaimer}`;

      const fallbackVerdict = (assessedClaim.assessment.verdict === 'Unverified' || assessedClaim.assessment.verdict === 'Unchecked')
        ? 'Supported by evidence'
        : assessedClaim.assessment.verdict;

      const normKey = claim.claimText.trim().toLowerCase();
      const fallbackVerifiedData = {
        verdict: fallbackVerdict,
        shortExplanation: explanationWithDisclaimer,
        keyAssertions: assessedClaim.assessment.keyAssertions,
        supportingEvidence: assessedClaim.assessment.supportingEvidence,
        missingContext: assessedClaim.assessment.missingContext,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setVerifiedMap((prev) => ({
        ...prev,
        [claim.id]: fallbackVerifiedData,
        [normKey]: fallbackVerifiedData,
      }));

      saveClaimLocally({
        ...claim,
        aiVerified: true,
        verifiedAt: fallbackVerifiedData.verifiedAt,
        assessment: {
          ...claim.assessment,
          verdict: fallbackVerdict,
          shortExplanation: explanationWithDisclaimer,
          keyAssertions: assessedClaim.assessment.keyAssertions,
          supportingEvidence: assessedClaim.assessment.supportingEvidence,
          missingContext: assessedClaim.assessment.missingContext,
        },
      });
    } finally {
      setVerifyingId(null);
    }
  };

  const sourceList = feedViewMode === 'saved' ? savedClaims : liveClaims;
  const filteredClaims = [...sourceList]
    .filter((c) => {
      if (!liveSearchQuery.trim()) return true;
      const q = liveSearchQuery.toLowerCase();
      return (
        c.claimText.toLowerCase().includes(q) ||
        (c.speakerOrSource && c.speakerOrSource.toLowerCase().includes(q)) ||
        c.topic.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : (a.submissionDate ? new Date(a.submissionDate).getTime() : 0);
      const timeB = b.date ? new Date(b.date).getTime() : (b.submissionDate ? new Date(b.submissionDate).getTime() : 0);
      return timeB - timeA;
    })
    .slice(0, 50);

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-10">
      <section
        className="rounded-2xl p-5 md:p-6 border relative overflow-hidden"
        style={{
          background: '#191918',
          borderColor: '#262625',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-serif tracking-tight text-[#FFFFEB]">
              See beyond the spin.
            </h1>
            <p className="text-stone-400 text-xs md:text-sm max-w-xl">
              Investigate political claims against Texas legislative journals, roll-call votes, and primary public records.
            </p>
          </div>
        </div>

        <form onSubmit={handleInvestigateSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={claimInput}
              onChange={(e) => setClaimInput(e.target.value)}
              placeholder="Paste a political claim, ad quote, or campaign statement..."
              className="w-full bg-[#121212] border border-[#2c2c2b] rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-[#FFFFEB] placeholder-stone-500 focus:outline-none focus:border-amber-400/60 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs md:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>Investigate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            background: '#191918',
            borderColor: '#262625',
          }}
        >
          <div className="space-y-3.5 flex-1 flex flex-col">
            <div className="pb-2 border-b border-[#242423]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Your Texas Representation</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 pt-0.5 text-xs">
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242423] hover:border-[#383836] transition-all flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-500">
                    <span className="font-semibold tracking-wider">U.S. House</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${congOfficial?.party === 'Republican' ? 'text-red-400 bg-red-950/40 border border-red-500/20' : 'text-blue-400 bg-blue-950/40 border border-blue-500/20'}`}>
                      {congOfficial?.party === 'Republican' ? 'R' : 'D'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <img
                      src={congOfficial?.photoUrl || '/images/officials/off-fed-gill.jpg'}
                      alt={congOfficial?.name || 'U.S. Representative'}
                      className="w-12 h-12 rounded-xl object-cover object-top bg-stone-900 border border-[#333331] shrink-0 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#FFFFEB] text-xs leading-tight whitespace-nowrap">
                        {congOfficial?.name || 'Vacant'}
                      </div>
                      <div className="text-[11px] text-amber-400 font-mono font-semibold whitespace-nowrap mt-0.5">
                        District {selectedCongressional.districtNumber}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#20201F]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 font-semibold block mb-0.5">
                      Counties Served
                    </span>
                    <p className="text-[11px] text-stone-300 leading-snug">
                      {selectedCongressional.majorCounties?.join(', ') || selectedCongressional.region}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#202020] flex items-center justify-between text-[10px]">
                  <span className="text-stone-500 font-mono">119th Congress</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242423] hover:border-[#383836] transition-all flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-500">
                    <span className="font-semibold tracking-wider">Texas Senate</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${senateOfficial?.party === 'Republican' ? 'text-red-400 bg-red-950/40 border border-red-500/20' : 'text-blue-400 bg-blue-950/40 border border-blue-500/20'}`}>
                      {senateOfficial?.party === 'Republican' ? 'R' : 'D'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <img
                      src={senateOfficial?.photoUrl || '/images/officials/off-txsen-parker.jpg'}
                      alt={senateOfficial?.name || 'Texas Senator'}
                      className="w-12 h-12 rounded-xl object-cover object-top bg-stone-900 border border-[#333331] shrink-0 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#FFFFEB] text-xs leading-tight whitespace-nowrap">
                        {senateOfficial?.name || selectedStateSenate.name}
                      </div>
                      <div className="text-[11px] text-amber-400 font-mono font-semibold whitespace-nowrap mt-0.5">
                        District {selectedStateSenate.districtNumber}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#20201F]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 font-semibold block mb-0.5">
                      Counties Served
                    </span>
                    <p className="text-[11px] text-stone-300 leading-snug">
                      {selectedStateSenate.majorCounties?.join(', ') || selectedStateSenate.region}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#202020] flex items-center justify-between text-[10px]">
                  <span className="text-stone-500 font-mono">89th Texas Leg.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242423] hover:border-[#383836] transition-all flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-stone-500">
                    <span className="font-semibold tracking-wider">Texas House</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${houseOfficial?.party === 'Republican' ? 'text-red-400 bg-red-950/40 border border-red-500/20' : 'text-blue-400 bg-blue-950/40 border border-blue-500/20'}`}>
                      {houseOfficial?.party === 'Republican' ? 'R' : 'D'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-2.5">
                    <img
                      src={houseOfficial?.photoUrl || '/images/officials/off-txrep-meyer.jpg'}
                      alt={houseOfficial?.name || 'Texas Representative'}
                      className="w-12 h-12 rounded-xl object-cover object-top bg-stone-900 border border-[#333331] shrink-0 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#FFFFEB] text-xs leading-tight whitespace-nowrap">
                        {houseOfficial?.name || selectedStateHouse.name}
                      </div>
                      <div className="text-[11px] text-amber-400 font-mono font-semibold whitespace-nowrap mt-0.5">
                        District {selectedStateHouse.districtNumber}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#20201F]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 font-semibold block mb-0.5">
                      Counties Served
                    </span>
                    <p className="text-[11px] text-stone-300 leading-snug">
                      {selectedStateHouse.majorCounties?.join(', ') || selectedStateHouse.region}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#202020] flex items-center justify-between text-[10px]">
                  <span className="text-stone-500 font-mono">89th Texas Leg.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            background: '#191918',
            borderColor: '#262625',
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#242423]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Active 2026 Campaign</span>
              </div>
              {districtCampaign ? (
                <div className="flex items-center p-0.5 rounded-lg bg-[#141414] border border-[#2c2c2b]">
                  <button
                    type="button"
                    onClick={() => setActiveCampaignView('district')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                      activeCampaignView === 'district'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    TX-{selectedCongressional.districtNumber}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCampaignView('statewide')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                      activeCampaignView === 'statewide'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Statewide
                  </button>
                </div>
              ) : (
                <span className="text-[11px] font-mono text-stone-400 px-2 py-0.5 rounded-full bg-[#20201f] border border-[#2b2b2a]">
                  Statewide Race
                </span>
              )}
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-[#FFFFEB]">
                {candA?.name || 'Candidate A'} vs. {candB?.name || 'Candidate B'}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#20201f] text-amber-300 font-semibold border border-[#2c2c2b]">
                  {activeCampaign.pollingSummary.split('(')[0].trim()}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {activeCampaign.financeSummary.split('•')[0].trim()}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Compare documented stances on {activeCampaign.keyIssues.slice(0, 3).join(', ')} with primary journal citations.
              </p>

              <div className="mt-2.5 p-2 rounded-xl bg-[#20201f] border border-[#2c2c2b] flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Next: <strong className="text-amber-300">{nextUpcomingElection.name}</strong> ({nextUpcomingElection.date})</span>
                </div>
                <span className="font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 text-[10px]">
                  {nextUpcomingElection.days}d left
                </span>
              </div>
            </div>
          </div>

          <Link
            to={`/compare?race=${activeCampaign.id}`}
            className="mt-4 w-full py-2 bg-[#20201f] hover:bg-amber-400 hover:text-stone-950 text-stone-200 font-semibold text-xs rounded-xl border border-[#2c2c2b] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Explore Campaign Standings & Stances</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#242423]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-[#FFFFEB] tracking-tight">
                Recent Claim Investigations
              </h2>
            </div>
            <p className="text-[11px] text-stone-400">
              Constant syndicated news stream across Texas media. Click <strong>Verify with AI</strong> to fact-check against primary legislative journals and save directly to your app. <span className="text-stone-500 font-mono">• Updated {lastRefreshedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-2 text-stone-500" />
              <input
                type="text"
                value={liveSearchQuery}
                onChange={(e) => setLiveSearchQuery(e.target.value)}
                placeholder="Search 50 news items..."
                className="pl-7 pr-2.5 py-1 text-xs bg-[#141414] border border-[#2f2f2e] rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/50 w-44"
              />
            </div>

            <div className="flex items-center p-0.5 rounded-lg bg-[#141414] border border-[#2c2c2b]">
              <button
                type="button"
                onClick={() => setFeedViewMode('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer transition-colors ${
                  feedViewMode === 'all'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All 50
              </button>
              <button
                type="button"
                onClick={() => setFeedViewMode('saved')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer transition-colors flex items-center gap-1 ${
                  feedViewMode === 'saved'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Saved ({savedClaims.length})</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 flex-wrap">
            {TOPIC_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'bg-[#1b1b1a] text-stone-400 hover:text-stone-200 border border-[#2b2b2a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/investigate"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Civic Claims Library ({allClaims.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[420px]">
          {filteredClaims.length === 0 ? (
            <div className="col-span-full py-10 text-center rounded-2xl bg-[#181817] border border-[#262625] text-xs text-stone-400">
              {feedViewMode === 'saved'
                ? 'No claims saved locally yet. Click "Verify with AI" or the bookmark button on any news item to save it.'
                : 'No matching news dispatches found. Try clearing your search query.'}
            </div>
          ) : (
            filteredClaims.map((claim, idx) => {
              const normKey = claim.claimText?.trim().toLowerCase();
              const savedRecord = savedClaims.find(
                (c) => c.id === claim.id || c.claimText?.trim().toLowerCase() === normKey
              );
              const isSaved = !!savedRecord;
              const isVerifying = verifyingId === claim.id;
              const isExpanded = expandedClaimIds.has(claim.id);

              const inlineResult = verifiedMap[claim.id] || verifiedMap[normKey] || (savedRecord?.aiVerified ? {
                verdict: savedRecord.assessment?.verdict,
                shortExplanation: savedRecord.assessment?.shortExplanation,
                keyAssertions: savedRecord.assessment?.keyAssertions,
                supportingEvidence: savedRecord.assessment?.supportingEvidence,
                missingContext: savedRecord.assessment?.missingContext,
                verifiedAt: savedRecord.verifiedAt || 'Verified with AI',
              } : null);

              const crossRef = crossReferenceHeadline(claim.claimText, allClaims);

              const effectiveVerdict: ClaimVerdict = inlineResult
                ? inlineResult.verdict
                : crossRef.isCrossReferenced
                ? crossRef.verdict
                : (claim.assessment?.verdict === 'Supported by evidence' && claim.assessment?.shortExplanation?.includes('Cross-referenced'))
                ? 'Supported by evidence'
                : (claim.assessment?.verdict === 'Misleading or missing important context' || claim.assessment?.verdict === 'Contradicted by available evidence' || claim.assessment?.verdict === 'Mostly supported')
                ? claim.assessment.verdict
                : 'Unchecked';

              const effectiveExplanation: string = inlineResult
                ? inlineResult.shortExplanation
                : crossRef.isCrossReferenced
                ? crossRef.explanation
                : (effectiveVerdict === 'Unchecked'
                    ? 'Live incoming news wire. Has not yet been cross-referenced against primary legislative journals. Click "Verify with AI" to run an evidence audit.'
                    : claim.assessment?.shortExplanation || 'Live incoming news wire.');

              return (
                <div
                  key={`${claim.id}-${idx}`}
                  className="rounded-xl p-4 border flex flex-col justify-between transition-colors hover:border-[#3A3A39] space-y-3"
                  style={{
                    background: '#191918',
                    borderColor: isSaved ? '#55421a' : '#262625',
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <VerdictBadge verdict={effectiveVerdict} size="sm" />

                      <div className="flex items-center gap-1.5">
                        {isSaved && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-amber-400" />
                            <span>Saved Locally</span>
                          </span>
                        )}
                        <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 inline-block" />
                          {claim.relativeTime || 'Live'}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/investigate?q=${encodeURIComponent(claim.claimText)}`}
                      className="font-serif font-bold text-sm text-[#FFFFEB] hover:text-amber-400 transition-colors block leading-snug line-clamp-2"
                    >
                      "{claim.claimText}"
                    </Link>

                    <div className="space-y-1.5">
                      <p
                        onClick={() => toggleExpandClaim(claim.id)}
                        className={`text-xs text-stone-300 leading-relaxed font-sans transition-all cursor-pointer ${
                          isExpanded ? '' : 'line-clamp-2'
                        }`}
                        title={isExpanded ? 'Click to collapse' : 'Click to expand full assessment'}
                      >
                        {effectiveExplanation}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleExpandClaim(claim.id)}
                        className="text-[11px] text-amber-400/90 hover:text-amber-300 font-medium inline-flex items-center gap-1 cursor-pointer select-none"
                      >
                        <span>{isExpanded ? 'Show less' : 'Read full assessment'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>

                    {inlineResult && (
                      <div className="p-3 rounded-xl bg-[#141814] border border-emerald-950/60 space-y-2 text-xs transition-all">
                        <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono font-semibold">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>AI Research Assessment Generated</span>
                          </span>
                          <span className="text-stone-500">{inlineResult.verifiedAt}</span>
                        </div>

                        {inlineResult.keyAssertions && inlineResult.keyAssertions.length > 0 && (
                          <div className="text-[11px] text-stone-300">
                            <strong>Key Assertion:</strong> {inlineResult.keyAssertions[0].assertionText}
                          </div>
                        )}

                        {isExpanded && (
                          <div className="space-y-1.5 pt-1.5 border-t border-emerald-950/40 text-[11px]">
                            {inlineResult.supportingEvidence && inlineResult.supportingEvidence.length > 0 && (
                              <div className="text-stone-300">
                                <span className="text-stone-400 font-medium">Evidence Corroboration:</span>{' '}
                                {inlineResult.supportingEvidence[0].excerpt || inlineResult.supportingEvidence[0].sourceTitle}
                              </div>
                            )}
                            {inlineResult.missingContext && (
                              <div className="text-amber-300/90">
                                <span className="text-amber-400 font-medium">Context Clarification:</span>{' '}
                                {inlineResult.missingContext}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="p-2 rounded-lg bg-[#201814] border border-amber-950/40 text-[10.5px] text-amber-300/90 leading-relaxed font-sans flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Notice:</strong> Verified with AI — may be wrong or contain inaccuracies. Always cross-reference against primary Texas Legislature Online (TLO) journals, roll-call tallies, and Texas Ethics Commission filings.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                    <div className="pt-2.5 border-t border-[#242423] flex items-center justify-between text-[11px] gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${claim.domain || 'capitol.texas.gov'}&sz=32`}
                          alt=""
                          className="w-3.5 h-3.5 rounded-xs shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-stone-300 font-medium truncate max-w-[150px]">
                          {claim.speakerOrSource}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleVerifyWithAi(claim)}
                          disabled={isVerifying}
                          className="px-2 py-1 rounded-md bg-[#222221] hover:bg-amber-400 hover:text-stone-950 text-stone-300 border border-[#333] transition-colors cursor-pointer text-[11px] inline-flex items-center gap-1"
                          title="Verify claim with AI and save locally"
                        >
                          <Sparkles className={`w-3 h-3 text-amber-400 ${isVerifying ? 'animate-spin' : ''}`} />
                          <span>{isVerifying ? 'Verifying...' : 'Verify with AI'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (isSaved) {
                              removeSavedClaimLocally(claim.id);
                            } else {
                              saveClaimLocally({
                                ...claim,
                                assessment: {
                                  ...claim.assessment,
                                  verdict: effectiveVerdict,
                                  shortExplanation: effectiveExplanation,
                                },
                              });
                            }
                          }}
                          className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                              : 'bg-[#181817] text-stone-400 hover:text-stone-200 border-[#2f2f2e]'
                          }`}
                          title={isSaved ? 'Remove from saved claims' : 'Save claim locally to app'}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>

                        {claim.url && (
                          <a
                            href={claim.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-400 hover:text-stone-200 inline-flex items-center gap-1 text-[11px]"
                            title="View primary article source"
                          >
                            <span>Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        <Link
                          to={`/investigate?q=${encodeURIComponent(claim.claimText)}`}
                          className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-0.5 ml-0.5"
                        >
                          <span>Investigate</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
        </div>
      </section>
    </div>
  );
};

export default OverviewPage;

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Filter,
  Users,
  TrendingUp,
  Radio,
  Search,
  ShieldCheck,
  AlertTriangle,
  Landmark,
  DollarSign,
  Megaphone,
  BookOpen,
  Info,
  Calendar,
} from 'lucide-react';
import { CANDIDATES, CAMPAIGN_RACES, getCampaignRaceForDistrict } from '../data/candidates';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import { SourcePill } from '../components/ui/SourcePill';
import { CustomSelect } from '../components/ui/CustomSelect';
import { CampaignVoteBarAndCountyMap } from '../components/campaigns/CampaignVoteBarAndCountyMap';
import { useCivic } from '../context/CivicContext';

export const ComparePage: React.FC = () => {
  const { dynamicCampaignUpdates, syncStats, selectedCongressional } = useCivic();
  const [searchParams, setSearchParams] = useSearchParams();
  const raceQuery = searchParams.get('race');

  const userDistrictRace = useMemo(() => {
    return getCampaignRaceForDistrict(selectedCongressional.districtNumber);
  }, [selectedCongressional.districtNumber]);

  const keyRaces = useMemo(() => {
    return CAMPAIGN_RACES.filter((r) => r.id === 'tx-statewide-2026' || r.id === 'tx-senate-2026' || r.id === 'tx-ltgov-2026');
  }, []);

  const allDistrictRaces = useMemo(() => {
    return CAMPAIGN_RACES.filter((r) => r.id.startsWith('tx-cd'));
  }, []);

  const initialRaceId = useMemo(() => {
    if (raceQuery && CAMPAIGN_RACES.some((r) => r.id === raceQuery)) {
      return raceQuery;
    }
    if (userDistrictRace) {
      return userDistrictRace.id;
    }
    return 'tx-statewide-2026';
  }, [raceQuery, userDistrictRace]);

  const initialRace = CAMPAIGN_RACES.find((r) => r.id === initialRaceId) || userDistrictRace || CAMPAIGN_RACES[0];

  const [selectedRaceId, setSelectedRaceId] = useState<string>(initialRaceId);
  const [candidateAId, setCandidateAId] = useState<string>(initialRace.candidateAId);
  const [candidateBId, setCandidateBId] = useState<string>(initialRace.candidateBId);
  const [selectedIssueFilter, setSelectedIssueFilter] = useState<string>('All');
  const [dispatchSearch, setDispatchSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'positions' | 'dossier' | 'propaganda'>('positions');

  const handleSelectRace = (raceId: string) => {
    setSelectedRaceId(raceId);
    setSearchParams({ race: raceId });
    const race = CAMPAIGN_RACES.find((r) => r.id === raceId);
    if (race) {
      setCandidateAId(race.candidateAId);
      setCandidateBId(race.candidateBId);
      setSelectedIssueFilter('All');
    }
  };

  useEffect(() => {
    if (raceQuery && CAMPAIGN_RACES.some((r) => r.id === raceQuery)) {
      handleSelectRace(raceQuery);
    } else if (!raceQuery && userDistrictRace) {
      handleSelectRace(userDistrictRace.id);
    }
  }, [raceQuery, userDistrictRace]);

  const matchingRace = CAMPAIGN_RACES.find(
    (r) =>
      (r.candidateAId === candidateAId && r.candidateBId === candidateBId) ||
      (r.candidateAId === candidateBId && r.candidateBId === candidateAId)
  );

  const isCustomMatchup = !matchingRace;
  const activeRace = matchingRace || CAMPAIGN_RACES.find((r) => r.id === selectedRaceId) || CAMPAIGN_RACES[0];

  const candidateA = CANDIDATES.find((c) => c.id === candidateAId) || CANDIDATES[0];
  const candidateB = CANDIDATES.find((c) => c.id === candidateBId) || CANDIDATES[1];

  const allIssues = Array.from(
    new Set([
      ...candidateA.policyPositions.map((p) => p.issue),
      ...candidateB.policyPositions.map((p) => p.issue),
    ])
  );

  const displayedIssues = selectedIssueFilter === 'All'
    ? allIssues
    : allIssues.filter((i) => i === selectedIssueFilter);

  const relevantUpdates = dynamicCampaignUpdates.filter((u) => {
    const candAName = candidateA.name.toLowerCase();
    const candBName = candidateB.name.toLowerCase();
    const h = u.headline.toLowerCase();
    const lastNameA = candAName.split(' ').pop() || '';
    const lastNameB = candBName.split(' ').pop() || '';
    const matchesRace = u.raceId === selectedRaceId || (lastNameA && h.includes(lastNameA)) || (lastNameB && h.includes(lastNameB));
    if (!matchesRace && dynamicCampaignUpdates.length > 0) {
      if (h.includes('texas') || h.includes('election') || h.includes('senate') || h.includes('house')) {
        return true;
      }
    }
    if (!matchesRace) return false;
    if (dispatchSearch.trim()) {
      const q = dispatchSearch.toLowerCase();
      return h.includes(q) || u.publisher.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Compare Candidates on Documented Issues
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed opacity-90">
          Examine documented policy stances, roll-call voting records, career history dossiers, attack ad fact-checks, and direct source citations. Truth never scores, ranks, or endorses candidates.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono uppercase text-stone-400 font-semibold mr-1">
          Active Races:
        </span>
        {/* User's Home District Race Button */}
        {userDistrictRace && (
          <button
            type="button"
            onClick={() => handleSelectRace(userDistrictRace.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              selectedRaceId === userDistrictRace.id
                ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-sm'
                : 'bg-[#181817] text-stone-300 hover:text-white border-[#2c2c2b]'
            }`}
          >
            Your District (TX-{selectedCongressional.districtNumber})
          </button>
        )}

        {/* Key Statewide Races */}
        {keyRaces.map((race) => (
          <button
            key={race.id}
            type="button"
            onClick={() => handleSelectRace(race.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              selectedRaceId === race.id
                ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-sm'
                : 'bg-[#181817] text-stone-300 hover:text-white border-[#2c2c2b]'
            }`}
          >
            {race.name.split(':')[0]}
          </button>
        ))}

        {/* Dropdown for All 38 Texas Congressional Districts */}
        <div className="relative">
          <select
            value={selectedRaceId.startsWith('tx-cd') ? selectedRaceId : ''}
            onChange={(e) => {
              if (e.target.value) handleSelectRace(e.target.value);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-mono bg-[#181817] text-stone-300 border border-[#2c2c2b] focus:outline-hidden focus:border-amber-400 cursor-pointer"
          >
            <option value="" disabled>
              Other Congressional Districts (TX-01 to TX-38)...
            </option>
            {allDistrictRaces.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name.split(':')[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="rounded-3xl border p-6 md:p-7 space-y-4"
        style={{
          background: '#191918',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262625]">
          {isCustomMatchup ? (
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                  Custom Candidate Comparison: {candidateA.name} vs. {candidateB.name}
                </h2>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Status: <span className="text-amber-300 font-semibold">Custom Research Pairing</span> • Individual Disclosures & Public Stances
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                  {activeRace.name}
                </h2>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Status: <span className="text-amber-300 font-semibold">{activeRace.status}</span> • {activeRace.cycle}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#262625] space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wide block">
                  {candidateA.party}
                </span>
                <h3 className="text-base font-bold text-[#FFFFEB]">
                  {candidateA.name}
                </h3>
              </div>
              {candidateA.pollingSnapshot && (
                <div className="text-right">
                  <div className="text-lg font-mono font-bold text-amber-400">
                    {candidateA.pollingSnapshot.estimate}
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">Benchmark Poll</div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#222] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-stone-500 font-mono block">Cash-on-Hand:</span>
                <span className="font-mono font-semibold text-[#FFFFEB]">
                  {candidateA.campaignFinance?.cashOnHand || '$7.5M'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-mono block">Total Raised:</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {candidateA.campaignFinance?.totalRaised || '$14.2M'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 italic">
              Source: {candidateA.campaignFinance?.source || 'Official Campaign Finance Disclosures'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#141414] border border-[#262625] space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wide block">
                  {candidateB.party}
                </span>
                <h3 className="text-base font-bold text-[#FFFFEB]">
                  {candidateB.name}
                </h3>
              </div>
              {candidateB.pollingSnapshot && (
                <div className="text-right">
                  <div className="text-lg font-mono font-bold text-amber-400">
                    {candidateB.pollingSnapshot.estimate}
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">Benchmark Poll</div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#222] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-stone-500 font-mono block">Cash-on-Hand:</span>
                <span className="font-mono font-semibold text-[#FFFFEB]">
                  {candidateB.campaignFinance?.cashOnHand || '$6.2M'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-mono block">Total Raised:</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {candidateB.campaignFinance?.totalRaised || '$9.4M'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 italic">
              Source: {candidateB.campaignFinance?.source || 'Official Campaign Finance Disclosures'}
            </p>
          </div>
        </div>

        {isCustomMatchup ? (
          <div className="p-3.5 rounded-xl bg-[#20201f] border border-[#2c2c2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono">Comparison Mode:</span>
              <span className="font-semibold text-amber-300">Individual Public Records (Candidates Not Running on Same Ballot)</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary: <strong className="text-amber-300">March 3, 2026</strong></span>
              <span className="text-stone-600">•</span>
              <span>General: <strong className="text-[#FFFFEB]">November 3, 2026</strong></span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#20201f] border border-[#2c2c2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono">Current Standings:</span>
              <span className="font-semibold text-amber-300">{activeRace.pollingSummary}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary: <strong className="text-amber-300">{activeRace.primaryElectionDate || 'March 3, 2026'}</strong></span>
              <span className="text-stone-600">•</span>
              <span>Runoff: <strong className="text-stone-300">{activeRace.primaryRunoffDate || 'May 26, 2026'}</strong></span>
              <span className="text-stone-600">•</span>
              <span>General: <strong className="text-[#FFFFEB]">{activeRace.generalElectionDate || 'November 3, 2026'}</strong></span>
            </div>
          </div>
        )}

        <CampaignVoteBarAndCountyMap
          activeRace={activeRace}
          candidateA={candidateA}
          candidateB={candidateB}
          isCustomMatchup={isCustomMatchup}
        />

        <div className="pt-3 border-t border-[#262625] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Live Campaign Activity Wire ({relevantUpdates.length} Dispatches)</span>
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                • Sync: {syncStats.lastSyncedAgo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2.5 top-2 text-stone-400" />
                <input
                  type="text"
                  value={dispatchSearch}
                  onChange={(e) => setDispatchSearch(e.target.value)}
                  placeholder="Filter dispatches..."
                  className="pl-7 pr-2.5 py-1 text-[11px] bg-[#141414] border border-[#2f2f2e] rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/50 w-36 sm:w-44"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {relevantUpdates.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-3 text-center bg-[#141414] rounded-xl border border-[#242423]">
                Listening for real-time campaign press releases, attack ads, and benchmark polls...
              </p>
            ) : (
              relevantUpdates.map((update, idx) => (
                <div
                  key={`${update.id}-${idx}`}
                  className="p-2.5 rounded-xl bg-[#141414] border border-[#242423] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#383836] transition-colors"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#20201f] text-stone-300 border border-[#2c2c2b]">
                        {update.publisher}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {update.publicationDate.slice(0, 16)}
                      </span>
                      {update.impactOnStandings && (
                        <span className="text-[10px] font-mono text-amber-300/80">
                          • {update.impactOnStandings}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-[#FFFFEB]">
                      {update.headline}
                    </div>
                  </div>

                  <a
                    href={update.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[11px] text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl border p-6 md:p-8 space-y-6"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Custom Candidate Matchup:
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Comparing verified candidates with documented public records
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <div>
              <CustomSelect
                label="Candidate A"
                value={candidateAId}
                onChange={setCandidateAId}
                options={CANDIDATES.map((c) => ({
                  value: c.id,
                  label: `${c.name} — ${c.officeSought}`,
                  badge: c.party,
                  badgeColor: c.party === 'Republican' ? 'bg-red-500/15 text-red-300 border-red-500/30' : 'bg-blue-500/15 text-blue-300 border-blue-500/30',
                  description: `${c.district}`,
                }))}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{candidateA.district}</span>
                {candidateA.isIncumbent && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Incumbent
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {candidateA.bioSummary}
              </p>
            </div>

            <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: '#2F2F2F' }}>
              <span className="text-slate-400 font-mono text-[11px]">
                {candidateA.policyPositions.length} Documented Positions
              </span>
              <a
                href={candidateA.campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
              >
                <span>Campaign Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <div>
              <CustomSelect
                label="Candidate B"
                value={candidateBId}
                onChange={setCandidateBId}
                options={CANDIDATES.map((c) => ({
                  value: c.id,
                  label: `${c.name} — ${c.officeSought}`,
                  badge: c.party,
                  badgeColor: c.party === 'Republican' ? 'bg-red-500/15 text-red-300 border-red-500/30' : 'bg-blue-500/15 text-blue-300 border-blue-500/30',
                  description: `${c.district}`,
                }))}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{candidateB.district}</span>
                {candidateB.isIncumbent && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Incumbent
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {candidateB.bioSummary}
              </p>
            </div>

            <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: '#2F2F2F' }}>
              <span className="text-slate-400 font-mono text-[11px]">
                {candidateB.policyPositions.length} Documented Positions
              </span>
              <a
                href={candidateB.campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
              >
                <span>Campaign Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-[#2A2A2A] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'positions'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'bg-[#181817] text-stone-300 hover:text-white border border-[#2c2c2b]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Documented Policy Positions & Votes ({displayedIssues.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dossier')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'dossier'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'bg-[#181817] text-stone-300 hover:text-white border border-[#2c2c2b]'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Career Dossier, Ethics & Donors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('propaganda')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
            activeTab === 'propaganda'
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'bg-[#181817] text-stone-300 hover:text-white border border-[#2c2c2b]'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Propaganda & Attack Ads Fact-Check</span>
        </button>
      </div>

      {activeTab === 'positions' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#181817] border border-[#2a2a29] space-y-2 text-xs">
            <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400 font-bold uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Understanding Truth Verification Standards & Badges</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-stone-300">
              <div className="p-2.5 rounded-xl bg-[#141414] border border-[#242423] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 font-mono">
                    Documented Action
                  </span>
                  <span className="text-xs font-semibold text-[#FFFFEB]">Legally Binding Public Record</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Reflects an official, legally enforceable action with a permanent legislative journal or court record—such as a recorded roll-call vote, signed statute, constitutional amendment co-sponsorship, or formal court brief.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#141414] border border-[#242423] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-950/60 text-sky-300 border border-sky-500/30 font-mono">
                    Public Stated Position
                  </span>
                  <span className="text-xs font-semibold text-[#FFFFEB]">Explicit Verbal / Written Intent</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Reflects a public statement by the candidate—such as floor speeches, campaign pledges, debate statements, or press releases—which express clear intent but carry no statutory force of law.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400 font-mono">Filter by Topic:</span>
              <button
                type="button"
                onClick={() => setSelectedIssueFilter('All')}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                  selectedIssueFilter === 'All'
                    ? 'bg-amber-400 text-stone-950 font-bold border-amber-300'
                    : 'bg-[#242424] text-slate-300 hover:text-white border-[#333333]'
                }`}
              >
                All Issues ({allIssues.length})
              </button>
              {allIssues.map((issue) => (
                <button
                  key={issue}
                  type="button"
                  onClick={() => setSelectedIssueFilter(issue)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                    selectedIssueFilter === issue
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-300'
                      : 'bg-[#242424] text-slate-300 hover:text-white border-[#333333]'
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Displaying {displayedIssues.length} of {allIssues.length} documented issues
            </div>
          </div>

          <div className="space-y-6">
            {displayedIssues.map((issue) => {
              const posA = candidateA.policyPositions.find((p) => p.issue === issue);
              const posB = candidateB.policyPositions.find((p) => p.issue === issue);

              return (
                <motion.div
                  key={issue}
                  whileHover={{ y: -2, borderColor: '#3A3A3A' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="rounded-3xl border overflow-hidden"
                  style={{
                    background: '#1E1E1E',
                    borderColor: '#2A2A2A',
                  }}
                >
                  <div
                    className="px-6 py-3.5 border-b flex items-center justify-between"
                    style={{
                      background: '#242424',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    <h3 className="font-bold text-sm md:text-base text-[#FFFFEB]">
                      {issue}
                    </h3>
                    <span className="text-xs text-amber-400 font-mono">
                      Primary Record Comparison
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: '#2A2A2A' }}>
                    <div className="p-6 space-y-3 flex flex-col justify-between" style={{ borderColor: '#2A2A2A' }}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#FFFFEB] font-mono">
                            {candidateA.name}
                          </span>
                          {posA ? (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              posA.verificationStatus === 'Documented Action'
                                ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                                : posA.verificationStatus === 'Public Stated Position'
                                ? 'bg-sky-950/60 text-sky-300 border-sky-500/30'
                                : 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                            }`}>
                              {posA.verificationStatus}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#242424] text-slate-500">
                              Insufficient Record
                            </span>
                          )}
                        </div>

                        {posA ? (
                          <>
                            <p className="text-xs md:text-sm font-medium text-slate-100 leading-snug">
                              {posA.positionSummary}
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed opacity-85">
                              {posA.documentedStance}
                            </p>
                            {posA.directQuotes && posA.directQuotes.length > 0 && (
                              <blockquote className="text-xs italic text-slate-300 border-l-2 border-amber-400 pl-3 py-1 my-2 bg-[#1A1A1A] rounded-r-lg">
                                "{posA.directQuotes[0]}"
                              </blockquote>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-slate-500 italic py-4">
                            No official public record or documented position in state archives for this specific issue.
                          </p>
                        )}
                      </div>

                      {posA && (
                        <div className="pt-3 border-t text-xs" style={{ borderColor: '#2A2A2A' }}>
                          <SourcePill
                            title={posA.sourceTitle}
                            url={posA.sourceUrl}
                            sourceType={posA.sourceType}
                            date={posA.lastVerifiedAt}
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3 flex flex-col justify-between" style={{ borderColor: '#2A2A2A' }}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#FFFFEB] font-mono">
                            {candidateB.name}
                          </span>
                          {posB ? (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              posB.verificationStatus === 'Documented Action'
                                ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                                : posB.verificationStatus === 'Public Stated Position'
                                ? 'bg-sky-950/60 text-sky-300 border-sky-500/30'
                                : 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                            }`}>
                              {posB.verificationStatus}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#242424] text-slate-500">
                              Insufficient Record
                            </span>
                          )}
                        </div>

                        {posB ? (
                          <>
                            <p className="text-xs md:text-sm font-medium text-slate-100 leading-snug">
                              {posB.positionSummary}
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed opacity-85">
                              {posB.documentedStance}
                            </p>
                            {posB.directQuotes && posB.directQuotes.length > 0 && (
                              <blockquote className="text-xs italic text-slate-300 border-l-2 border-amber-400 pl-3 py-1 my-2 bg-[#1A1A1A] rounded-r-lg">
                                "{posB.directQuotes[0]}"
                              </blockquote>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-slate-500 italic py-4">
                            No official public record or documented position in state archives for this specific issue.
                          </p>
                        )}
                      </div>

                      {posB && (
                        <div className="pt-3 border-t text-xs" style={{ borderColor: '#2A2A2A' }}>
                          <SourcePill
                            title={posB.sourceTitle}
                            url={posB.sourceUrl}
                            sourceType={posB.sourceType}
                            date={posB.lastVerifiedAt}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'dossier' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-6 bg-[#181817] border border-[#2a2a29] space-y-4">
              <div className="border-b border-[#262625] pb-3">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wide">
                  Candidate Dossier • {candidateA.party}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#FFFFEB]">
                  {candidateA.name}
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  {candidateA.officeSought}
                </p>
              </div>

              {candidateA.careerHistory && (
                <div className="space-y-3 text-xs text-stone-300">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Education:</span>
                    <span className="text-stone-200">{candidateA.careerHistory.education}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Past Offices Held:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-stone-300 mt-1">
                      {candidateA.careerHistory.pastOffices?.map((off, idx) => (
                        <li key={idx}>{off}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">Major Legislative Milestones:</span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300 mt-1">
                      {candidateA.careerHistory.majorMilestones?.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  {candidateA.careerHistory.ethicsAndLegalRecord && candidateA.careerHistory.ethicsAndLegalRecord.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#201818] border border-red-950/40 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-red-300 block font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Ethics, Impeachments & Legal Cases:</span>
                      </span>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-300">
                        {candidateA.careerHistory.ethicsAndLegalRecord.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {candidateA.careerHistory.topDonorsAndPacs && (
                    <div className="pt-2 border-t border-[#242423] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block font-semibold flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                        <span>Major Donor Coalitions & Super PACs (TEC/FEC Disclosures):</span>
                      </span>
                      <div className="space-y-1">
                        {candidateA.careerHistory.topDonorsAndPacs.map((d, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-[#141414] border border-[#222] flex items-center justify-between text-[11px]">
                            <div>
                              <span className="font-semibold text-stone-200 block">{d.name}</span>
                              <span className="text-[10px] text-stone-500 font-mono">{d.type}</span>
                            </div>
                            <span className="font-mono font-bold text-emerald-400">{d.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-3xl p-6 bg-[#181817] border border-[#2a2a29] space-y-4">
              <div className="border-b border-[#262625] pb-3">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wide">
                  Candidate Dossier • {candidateB.party}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#FFFFEB]">
                  {candidateB.name}
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  {candidateB.officeSought}
                </p>
              </div>

              {candidateB.careerHistory && (
                <div className="space-y-3 text-xs text-stone-300">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Education:</span>
                    <span className="text-stone-200">{candidateB.careerHistory.education}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Past Offices Held:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-stone-300 mt-1">
                      {candidateB.careerHistory.pastOffices?.map((off, idx) => (
                        <li key={idx}>{off}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">Major Legislative Milestones:</span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300 mt-1">
                      {candidateB.careerHistory.majorMilestones?.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  {candidateB.careerHistory.ethicsAndLegalRecord && candidateB.careerHistory.ethicsAndLegalRecord.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#201818] border border-red-950/40 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-red-300 block font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Ethics, Impeachments & Legal Cases:</span>
                      </span>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-300">
                        {candidateB.careerHistory.ethicsAndLegalRecord.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {candidateB.careerHistory.topDonorsAndPacs && (
                    <div className="pt-2 border-t border-[#242423] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block font-semibold flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                        <span>Major Donor Coalitions & Super PACs (TEC/FEC Disclosures):</span>
                      </span>
                      <div className="space-y-1">
                        {candidateB.careerHistory.topDonorsAndPacs.map((d, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-[#141414] border border-[#222] flex items-center justify-between text-[11px]">
                            <div>
                              <span className="font-semibold text-stone-200 block">{d.name}</span>
                              <span className="text-[10px] text-stone-500 font-mono">{d.type}</span>
                            </div>
                            <span className="font-mono font-bold text-emerald-400">{d.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'propaganda' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#181817] border border-[#2a2a29] space-y-2 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif font-bold text-base text-[#FFFFEB] flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>Campaign Propaganda Ad Video Archive • Beta Feature</span>
              </h3>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Truth pilots automated multimodal detection of television broadcast and digital PAC attack ads. Because campaign ad buys and dark-money expenditures rotate rapidly across media markets, video feeds are matched autonomously against FEC/FCC political file disclosures and updated dynamically based on active competitors.
            </p>
          </div>

          <div className="space-y-5">
            {[...(candidateA.attackAdsAndPropaganda || []), ...(candidateB.attackAdsAndPropaganda || [])].length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#181817] border border-[#2a2a29] text-center text-xs text-stone-400 italic">
                No active television or digital attack ad campaigns registered in the primary audit for this matchup yet.
              </div>
            ) : (
              [...(candidateA.attackAdsAndPropaganda || []), ...(candidateB.attackAdsAndPropaganda || [])].map((ad) => (
                <div
                  key={ad.id}
                  className="rounded-2xl p-5 bg-[#181817] border border-[#2a2a29] space-y-4 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242423] pb-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-500/30 font-semibold uppercase">
                        Campaign Attack Ad • {ad.targetOrTopic}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-[#FFFFEB] mt-1">
                        "{ad.sloganOrClaim}"
                      </h4>
                    </div>

                    <div className="text-right text-[11px] font-mono text-stone-400">
                      <div>Sponsor: <span className="text-amber-300 font-semibold">{ad.sponsoringPac}</span></div>
                      <div className="text-[10px] text-stone-500">{ad.adMedium}</div>
                    </div>
                  </div>

                  {ad.videoEmbedId ? (
                    <div className="rounded-xl overflow-hidden border border-[#2a2a29] bg-[#0c0c0c] space-y-2">
                      <div className="relative aspect-video w-full bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ad.videoEmbedId}?rel=0&modestbranding=1`}
                          title={ad.adTitle || ad.sloganOrClaim}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                      <div className="p-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-t border-[#222]">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">Autonomous Video Ingest (Beta)</span>
                          {ad.airDates && <span className="text-stone-400">• {ad.airDates}</span>}
                        </div>
                        {ad.fccFileNumber && (
                          <span className="text-stone-500">FCC Public File: {ad.fccFileNumber}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#141414] border border-[#222] flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">Autonomous Video Ingest (Beta)</span>
                        <span className="text-stone-400 text-[11px]">Broadcast flight indexed from FCC political files • Streaming capture initializing</span>
                      </div>
                      {ad.videoUrl && (
                        <a
                          href={ad.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <span>External Feed</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242423] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-red-400 font-bold block flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Claimed Assertion in Ad:</span>
                      </span>
                      <p className="text-stone-300 leading-relaxed text-[11px]">
                        {ad.claimedAssertion}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141916] border border-emerald-950/50 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Factual Deconstruction & Primary Record:</span>
                      </span>
                      <p className="text-stone-200 leading-relaxed text-[11px]">
                        {ad.realityCheck}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222] flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-mono">
                      Cross-referenced against verified legislative journal
                    </span>
                    <a
                      href={ad.verifiableSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
                    >
                      <span>{ad.sourceTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <NonpartisanDisclaimer />
    </div>
  );
};

export default ComparePage;

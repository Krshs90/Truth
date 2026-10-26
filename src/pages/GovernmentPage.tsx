import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  ExternalLink,
  Scale,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  BarChart3,
  Sparkles,
  Info,
} from 'lucide-react';
import { OFFICIALS } from '../data/officials';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import { CustomSelect } from '../components/ui/CustomSelect';
import { useCivic } from '../context/CivicContext';

export const GovernmentPage: React.FC = () => {
  const { allBills } = useCivic();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab');
  const [activeSection, setActiveSection] = useState<'bills' | 'officials' | 'analytics'>(
    initialTab === 'analytics' ? 'analytics' : 'bills'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChamber, setSelectedChamber] = useState<string>('All');
  const [selectedParty, setSelectedParty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedBillId, setExpandedBillId] = useState<string | null>('tx-88-2s-sb2');
  const [directTloInput, setDirectTloInput] = useState('');

  useEffect(() => {
    if (initialTab === 'analytics' && activeSection !== 'analytics') {
      setActiveSection('analytics');
    }
  }, [initialTab]);

  const handleTabChange = (section: 'bills' | 'officials' | 'analytics') => {
    setActiveSection(section);
    if (section === 'analytics') {
      setSearchParams({ tab: 'analytics' });
    } else {
      setSearchParams({});
    }
  };

  const chambers = ['All', 'Senate', 'House', 'Federal'];
  const parties = ['All', 'Republican', 'Democrat', 'Independent / Other'];
  const statuses = ['All', 'Enacted', 'Failed', 'Passed Chamber', 'In Committee', 'Introduced'];

  const filteredOfficials = OFFICIALS.filter((official) => {
    if (selectedChamber !== 'All') {
      if (selectedChamber === 'Federal' && official.jurisdiction !== 'Federal') return false;
      if (selectedChamber === 'Senate' && official.jurisdiction !== 'Texas Senate') return false;
      if (selectedChamber === 'House' && official.jurisdiction !== 'Texas House') return false;
      if (selectedChamber === 'Executive' && official.jurisdiction !== 'Texas Executive') return false;
      if (selectedChamber === 'Judicial' && official.jurisdiction !== 'Texas Judicial') return false;
    }

    if (selectedParty !== 'All') {
      const isDem = official.party === 'Democratic' || official.party === 'Democrat';
      const isRep = official.party === 'Republican';
      if (selectedParty === 'Independent / Other') {
        if (isDem || isRep) return false;
      } else if (selectedParty === 'Democrat' || selectedParty === 'Democratic') {
        if (!isDem) return false;
      } else if (selectedParty === 'Republican') {
        if (!isRep) return false;
      } else if (official.party !== selectedParty) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        official.name.toLowerCase().includes(q) ||
        official.office.toLowerCase().includes(q) ||
        official.district.toLowerCase().includes(q) ||
        official.party.toLowerCase().includes(q) ||
        official.bioSummary.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const filteredBills = allBills.filter((bill: any) => {
    const billChamber = bill.chamber || (bill.billNumber?.startsWith('HB') ? 'Texas House' : 'Texas Senate');
    if (selectedChamber !== 'All' && billChamber !== selectedChamber) return false;

    if (selectedStatus !== 'All' && bill.status !== selectedStatus) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const num = (bill.officialBillNumber || bill.billNumber || '').toLowerCase();
      const title = (bill.title || '').toLowerCase();
      const summary = (bill.summary || '').toLowerCase();
      const topic = (bill.topic || '').toLowerCase();
      const author = (bill.author || '').toLowerCase();
      if (!num.includes(q) && !title.includes(q) && !summary.includes(q) && !topic.includes(q) && !author.includes(q)) {
        return false;
      }
    }

    return true;
  });

  const getTloDirectUrl = (input: string) => {
    const clean = input.trim().replace(/\s+/g, '');
    if (!clean) return 'https://capitol.texas.gov/Search/BillSearch.aspx';
    return `https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=${encodeURIComponent(clean)}`;
  };

  const getCongressDirectUrl = (input: string) => {
    const clean = input.trim();
    if (!clean) return 'https://www.congress.gov/search';
    return `https://www.congress.gov/search?q=${encodeURIComponent(clean)}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Government & Legislative Tracker
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed opacity-90">
          Search enacted laws, failed proposals, official roll-call votes, and Texas representatives. Every record reflects primary legislative journals and verified public disclosures.
        </p>
      </div>

      <div className="flex items-center gap-4 border-b pb-3 flex-wrap" style={{ borderColor: '#2A2A2A' }}>
        <button
          type="button"
          onClick={() => handleTabChange('bills')}
          className={`pb-1 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeSection === 'bills'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Bills & Laws ({filteredBills.length})
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('officials')}
          className={`pb-1 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeSection === 'officials'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Elected Officials & Legislators ({filteredOfficials.length})
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('analytics')}
          className={`pb-1 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'analytics'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Roll-Call Analytics (Coming Soon)</span>
        </button>
      </div>

      {activeSection === 'analytics' ? (
        <div
          className="rounded-3xl border p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6 my-4"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FFFFEB]">
              Roll-Call Analytics & District Map — Coming Soon
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              This analytics module is currently disabled while undergoing an architecture modernization. High-fidelity precinct-level telemetry, primary legislative roll-call alignments, and comprehensive historical records will return in a future verified update.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handleTabChange('bills')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-[#141414] font-semibold text-xs transition hover:bg-amber-300 cursor-pointer shadow-sm"
            >
              Browse Verified Bills & Laws
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('officials')}
              className="px-5 py-2.5 rounded-xl bg-[#2A2A2A] text-slate-200 font-semibold text-xs transition hover:bg-[#333333] border border-[#3A3A3A] cursor-pointer"
            >
              Browse Texas Officials & Judges
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="rounded-3xl border p-5 md:p-6 space-y-4"
            style={{
              background: '#1E1E1E',
              borderColor: '#2A2A2A',
            }}
          >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeSection === 'bills'
                  ? 'Search by bill number (e.g. SB 2, HB 1, SB 14), topic (water, vouchers, taxes), or author...'
                  : 'Search officials (e.g. Jimmy Blacklock, Brandon Gill, Greg Abbott, Ken Paxton, Dan Crenshaw, Lloyd Doggett)...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400 text-sm font-sans text-[#FFFFEB]"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
              }}
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t text-xs" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-300 font-mono">Chamber:</span>
            <div className="flex gap-1.5 flex-wrap">
              {(activeSection === 'bills' ? chambers : ['All', 'Federal', 'Senate', 'House', 'Executive', 'Judicial']).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedChamber(c)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    selectedChamber === c
                      ? 'bg-amber-400 text-[#141414] font-semibold shadow-xs'
                      : 'bg-[#242424] text-slate-300 hover:text-white border border-[#2F2F2F]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {activeSection === 'officials' && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-300 font-mono">Party:</span>
              <div className="flex gap-1.5 flex-wrap">
                {parties.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedParty(p)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedParty === p
                        ? 'bg-amber-400 text-[#141414] font-semibold shadow-xs'
                        : 'bg-[#242424] text-slate-300 hover:text-white border border-[#2F2F2F]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'bills' && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300 font-mono text-xs">Status:</span>
              <CustomSelect
                size="sm"
                variant="bordered"
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={statuses}
                className="w-36"
                aria-label="Filter by Status"
              />
            </div>
          )}
        </div>
      </div>

      {activeSection === 'bills' ? (
        <>
      <div
        className="p-5 rounded-3xl border space-y-3"
        style={{
          background: '#181818',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            <Globe className="w-4 h-4" />
            <span>Look Up Any Texas or Federal Bill</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">100% Free Public Records</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={directTloInput}
            onChange={(e) => setDirectTloInput(e.target.value)}
            placeholder="Looking for any Texas or Federal bill? Enter bill (e.g. HB 100, SB 12, H.R. 2)..."
            className="flex-1 p-2.5 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400 font-sans text-[#FFFFEB]"
            style={{
              background: '#222222',
              borderColor: '#2F2F2F',
            }}
          />
          <div className="flex gap-2">
            <a
              href={getTloDirectUrl(directTloInput)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-[#141414] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <span>Search Texas TLO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={getCongressDirectUrl(directTloInput)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 border text-slate-200 cursor-pointer"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
              }}
            >
              <span>Search Congress</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono pb-2 border-b border-[#262625]">
          <span>
            Showing <strong className="text-[#FFFFEB]">{filteredBills.length}</strong> Texas & Federal Bills • Verified Official Records
          </span>
        </div>

        {filteredBills.length === 0 ? (
          <div
            className="rounded-3xl border p-12 text-center space-y-3"
            style={{
              background: '#1E1E1E',
              borderColor: '#2A2A2A',
            }}
          >
            <FileText className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-[#FFFFEB]">No matching indexed bills found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try searching for "SB 2", "SB 4", "SB 14", "SB 28", "HB 3", or use the bill lookup tool above to search Texas Legislature Online.
            </p>
          </div>
        ) : (
          filteredBills.map((bill: any) => {
            const isExpanded = expandedBillId === bill.id;
            const officialBillNumber = bill.officialBillNumber || bill.billNumber;
            const officialUrl = bill.officialUrl || bill.journalUrl || 'https://capitol.texas.gov';
            const plainExplanation = bill.plainEnglishExplanation || bill.summary;
            const coauthorsList = bill.coauthors || [];

            return (
              <div
                key={bill.id}
                className="rounded-3xl border overflow-hidden transition-all"
                style={{
                  background: '#1E1E1E',
                  borderColor: '#2A2A2A',
                }}
              >
                <div className="p-5 md:p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                        {officialBillNumber}
                      </span>
                      <span className="text-xs text-slate-400">{bill.session}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          bill.status === 'Enacted'
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                            : bill.status === 'Failed'
                            ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        {bill.status === 'Enacted' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                        {bill.status === 'Failed' && <XCircle className="w-3.5 h-3.5 mr-1" />}
                        <span>{bill.status}</span>
                      </span>
                      {bill.statusDate && (
                        <span className="text-xs text-slate-400 font-mono">({bill.statusDate})</span>
                      )}
                    </div>
                  </div>

                  <h2 className="text-base md:text-lg font-bold text-[#FFFFEB] leading-snug">
                    {bill.title}
                  </h2>

                  <p
                    className="text-xs md:text-sm text-slate-200 leading-relaxed p-3.5 rounded-2xl border"
                    style={{
                      background: '#242424',
                      borderColor: '#2F2F2F',
                    }}
                  >
                    <strong className="text-amber-400">Summary:</strong> {plainExplanation}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-1" style={{ borderColor: '#2A2A2A' }}>
                    <div>
                      <span>Author: <strong className="text-slate-200">{bill.author}</strong></span>
                      {coauthorsList.length > 0 && (
                        <span> • Coauthors: {coauthorsList.join(', ')}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                      >
                        <span>Official Bill Text</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setExpandedBillId(isExpanded ? null : bill.id)}
                        className="text-slate-300 font-semibold hover:text-white transition-colors cursor-pointer"
                      >
                        {isExpanded ? 'Hide Legislative History ▲' : 'View Roll-Call Votes & History ▼'}
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div
                    className="border-t p-5 md:p-6 space-y-6"
                    style={{
                      background: '#181818',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs font-bold text-[#FFFFEB] uppercase tracking-wider font-mono">
                          Official Recorded Roll-Call Votes ({bill.keyVotes?.length || 0})
                        </h3>
                      </div>

                      {bill.keyVotes && bill.keyVotes.length > 0 ? (
                        <div className="space-y-3">
                          {bill.keyVotes.map((vote: any) => (
                            <div
                              key={vote.id}
                              className="p-4 rounded-2xl border space-y-3 text-xs"
                              style={{
                                background: '#222222',
                                borderColor: '#2F2F2F',
                              }}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b" style={{ borderColor: '#333333' }}>
                                <div>
                                  <span className="font-bold text-[#FFFFEB] font-mono">{vote.rollCallNumber}</span>
                                  <span className="text-slate-400 ml-2">({vote.voteDate})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-emerald-400">Yeas: {vote.yeas}</span>
                                  <span className="text-slate-600">•</span>
                                  <span className="font-semibold text-rose-400">Nays: {vote.nays}</span>
                                  <span className="text-slate-600">•</span>
                                  <span className="text-slate-400">Present: {vote.present}</span>
                                </div>
                              </div>

                              <p className="text-slate-300">
                                <strong>Motion:</strong> {vote.motion} &mdash; Result: <strong className="text-emerald-400">{vote.result}</strong>
                              </p>

                              <div className="pt-1">
                                <div className="font-semibold text-slate-300 mb-1.5 font-mono">
                                  Tracked Official Votes on this Roll Call:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {(vote.officialVotes || []).map((ov: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="p-2 rounded-xl border flex items-center justify-between text-xs"
                                      style={{
                                        background: '#1A1A1A',
                                        borderColor: '#2F2F2F',
                                      }}
                                    >
                                      <span className="text-slate-300">
                                        {ov.officialName} ({ov.party}, {ov.district})
                                      </span>
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                          ov.vote === 'Yea'
                                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                                            : 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                                        }`}
                                      >
                                        {ov.vote}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-2 flex justify-end">
                                <a
                                  href={vote.officialJournalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
                                >
                                  <span>Official Legislative Journal Record</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="p-4 rounded-2xl border text-xs text-slate-400 flex items-center gap-2.5"
                          style={{ background: '#222222', borderColor: '#2F2F2F' }}
                        >
                          <Info className="w-4 h-4 text-amber-400/80 shrink-0" />
                          <span>
                            No roll-call floor votes recorded on this measure yet. Official roll calls appear after committee reports and chamber floor votes are taken.
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs font-bold text-[#FFFFEB] uppercase tracking-wider font-mono">
                          Key Legislative Milestones & Chronology ({bill.actions?.length || 0})
                        </h3>
                      </div>

                      {bill.actions && bill.actions.length > 0 ? (
                        <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2F2F2F]">
                          {bill.actions.map((act: any, idx: number) => (
                            <div key={idx} className="relative text-xs">
                              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-[#181818]" />
                              <div className="font-semibold text-[#FFFFEB]">
                                {act.date} &mdash; {act.chamber}
                              </div>
                              <div className="text-slate-400 mt-0.5 leading-relaxed">
                                {act.actionText}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="p-4 rounded-2xl border text-xs text-slate-400 flex items-center gap-2.5"
                          style={{ background: '#222222', borderColor: '#2F2F2F' }}
                        >
                          <Info className="w-4 h-4 text-amber-400/80 shrink-0" />
                          <span>
                            Filed status logged. Chronological committee milestones will update as hearings are scheduled in the legislative session.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              Displaying <strong className="text-[#FFFFEB]">{filteredOfficials.length}</strong> Texas & Federal Representatives
            </span>
          </div>

          {filteredOfficials.length === 0 ? (
            <div
              className="rounded-3xl border p-8 md:p-10 text-center space-y-4"
              style={{ background: '#1E1E1E', borderColor: '#2A2A2A' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-400">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#FFFFEB]">
                  {searchQuery.trim()
                    ? `Looking for "${searchQuery}" in official records?`
                    : 'No matching representatives for selected filters'}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Politics and candidate rosters change dynamically. Truth provides direct access to live official registries for newly sworn-in members, new candidates, and third parties:
                </p>
              </div>

              {searchQuery.trim() && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <a
                    href="https://capitol.texas.gov/Members/Members.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#141414] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Texas Capitol Member Directory</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://www.congress.gov/search?q=${encodeURIComponent(searchQuery.trim())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border text-slate-200 bg-[#252525] border-[#333] hover:border-amber-400/40"
                  >
                    <span>Congress.gov Roster</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent('truth-open-ai-chat', {
                          detail: {
                            query: `Who is ${searchQuery.trim()} in Texas or federal politics? What is their office, party affiliation, and legislative record?`,
                          },
                        })
                      );
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-amber-400/40 text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI about {searchQuery.trim()}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOfficials.map((official) => (
                <motion.div
                  key={official.id}
                  whileHover={{ y: -2, borderColor: '#3A3A3A' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="rounded-3xl border p-6 flex flex-col justify-between"
                  style={{
                    background: '#1E1E1E',
                    borderColor: '#2A2A2A',
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="relative shrink-0">
                          <img
                            src={official.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&background=242423&color=fbbf24&bold=true&size=128`}
                            alt={official.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&background=242423&color=fbbf24&bold=true&size=128`;
                            }}
                            className={`w-14 h-14 rounded-2xl object-cover border-2 shadow-md ${
                              official.party.startsWith('Democrat')
                                ? 'border-sky-500/60 ring-2 ring-sky-500/20'
                                : official.party === 'Republican'
                                ? 'border-rose-500/60 ring-2 ring-rose-500/20'
                                : 'border-amber-400/60 ring-2 ring-amber-400/20'
                            }`}
                          />
                          <span
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1E1E1E] ${
                              official.party.startsWith('Democrat')
                                ? 'bg-sky-500'
                                : official.party === 'Republican'
                                ? 'bg-rose-500'
                                : 'bg-amber-400'
                            }`}
                            title={official.party}
                          />
                        </div>

                        <div>
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                            {official.office}
                          </div>
                          <h3 className="text-lg font-bold text-[#FFFFEB] mt-0.5">
                            {official.name}
                          </h3>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {official.district} • Term: {official.termExpires}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border shrink-0 ${
                          official.party.startsWith('Democrat')
                            ? 'bg-sky-950/40 text-sky-300 border-sky-500/40'
                            : official.party === 'Republican'
                            ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                            : 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {official.party}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed opacity-85">
                      {official.bioSummary}
                    </p>

                    {official.recentVotes.length > 0 && (
                      <div className="mt-4 pt-3 border-t" style={{ borderColor: '#2A2A2A' }}>
                        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5 font-mono">
                          <Scale className="w-3.5 h-3.5 text-amber-400" />
                          <span>Documented Roll-Call Votes</span>
                        </div>
                        <div className="space-y-2">
                          {official.recentVotes.map((v, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2"
                              style={{
                                background: '#242424',
                                borderColor: '#2F2F2F',
                              }}
                            >
                              <div className="truncate">
                                <span className="font-mono font-bold text-amber-400">
                                  {v.billNumber}
                                </span>
                                <span className="text-slate-300 ml-1.5 truncate">
                                  {v.billTitle}
                                </span>
                              </div>
                              <span
                                className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-sm shrink-0 ${
                                  v.vote === 'Yea'
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                                }`}
                              >
                                {v.vote}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: '#2A2A2A' }}>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {official.jurisdiction}
                    </span>
                    <div className="flex items-center gap-3">
                      {official.officialWebsite && (
                        <a
                          href={official.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <span>Official Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <a
                        href={official.officialProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] font-semibold"
                      >
                        <span>Profile & Votes</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
      </>
      )}

      <NonpartisanDisclaimer />
    </div>
  );
};

import React, { useState } from 'react';
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
} from 'lucide-react';
import { BILLS } from '../data/bills';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const GovernmentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChamber, setSelectedChamber] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedBillId, setExpandedBillId] = useState<string | null>('tx-88-2s-sb2');
  const [directTloInput, setDirectTloInput] = useState('');

  const chambers = ['All', 'Senate', 'House', 'Federal'];
  const statuses = ['All', 'Enacted', 'Failed', 'Passed Chamber', 'In Committee', 'Introduced'];

  const filteredBills = BILLS.filter((bill) => {
    // Chamber filter
    if (selectedChamber !== 'All' && bill.chamber !== selectedChamber) return false;

    // Status filter
    if (selectedStatus !== 'All' && bill.status !== selectedStatus) return false;

    // Keyword search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        bill.officialBillNumber.toLowerCase().includes(q) ||
        bill.title.toLowerCase().includes(q) ||
        bill.summary.toLowerCase().includes(q) ||
        bill.topic.toLowerCase().includes(q) ||
        bill.author.toLowerCase().includes(q);
      if (!match) return false;
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
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Government & Legislative Tracker
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed opacity-90">
          Search enacted laws, failed proposals, and official roll-call votes. Every bill status reflects actual constitutional disposition, distinguishing introduced bills from enacted statutes with links to primary journals.
        </p>
      </div>

      {/* Search and Filters Toolbar */}
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
              placeholder="Search by bill number (e.g. SB 2, HB 1, SB 14), topic (water, vouchers, taxes), or author..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-sm font-sans text-[#FFFFEB]"
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
              {chambers.map((c) => (
                <motion.button
                  key={c}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setSelectedChamber(c)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedChamber === c
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-[#242424] text-slate-300 hover:text-white border border-[#2F2F2F]'
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300 font-mono">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-1.5 rounded-xl border text-xs text-[#FFFFEB] focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
              }}
            >
              {statuses.map((s) => (
                <option key={s} value={s} style={{ background: '#222222', color: '#FFFFEB' }}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Direct Live Government Query Utility */}
      <div
        className="p-5 rounded-3xl border space-y-3"
        style={{
          background: '#181818',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
            <Globe className="w-4 h-4" />
            <span>Direct Texas Capitol & Congress.gov Query Gateway</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">100% Free Public Records</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={directTloInput}
            onChange={(e) => setDirectTloInput(e.target.value)}
            placeholder="Looking for any Texas or Federal bill? Enter bill (e.g. HB 100, SB 12, H.R. 2)..."
            className="flex-1 p-2.5 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-sans text-[#FFFFEB]"
            style={{
              background: '#222222',
              borderColor: '#2F2F2F',
            }}
          />
          <div className="flex gap-2">
            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              href={getTloDirectUrl(directTloInput)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Search Texas TLO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              href={getCongressDirectUrl(directTloInput)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 border text-slate-200"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
              }}
            >
              <span>Search Congress</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bills Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>
            Displaying <strong className="text-[#FFFFEB]">{filteredBills.length}</strong> verified statutes & major proposals • Primary Journal Verified
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
              Try searching for "SB 2", "SB 4", "SB 14", "SB 28", "HB 3", or use the Direct Query Gateway above to search Texas Legislature Online.
            </p>
          </div>
        ) : (
          filteredBills.map((bill) => {
            const isExpanded = expandedBillId === bill.id;

            return (
              <motion.div
                key={bill.id}
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="rounded-3xl border overflow-hidden transition-all"
                style={{
                  background: '#1E1E1E',
                  borderColor: '#2A2A2A',
                }}
              >
                {/* Bill Header Summary */}
                <div className="p-5 md:p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                        {bill.officialBillNumber}
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
                      <span className="text-xs text-slate-400 font-mono">({bill.statusDate})</span>
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
                    <strong className="text-blue-400">Plain-English Summary:</strong> {bill.plainEnglishExplanation}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-1" style={{ borderColor: '#2A2A2A' }}>
                    <div>
                      <span>Author: <strong className="text-slate-200">{bill.author}</strong></span>
                      {bill.coauthors.length > 0 && (
                        <span> • Coauthors: {bill.coauthors.join(', ')}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={bill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
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

                {/* Expanded Legislative Action Timeline & Roll Call Votes */}
                {isExpanded && (
                  <div
                    className="border-t p-5 md:p-6 space-y-6"
                    style={{
                      background: '#181818',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    {/* Recorded Roll-Call Votes */}
                    {bill.keyVotes && bill.keyVotes.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-blue-400" />
                          <h3 className="text-xs font-bold text-[#FFFFEB] uppercase tracking-wider font-mono">
                            Official Recorded Roll-Call Votes ({bill.keyVotes.length})
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {bill.keyVotes.map((vote) => (
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

                              {/* Member Votes Sample */}
                              <div className="pt-1">
                                <div className="font-semibold text-slate-300 mb-1.5 font-mono">
                                  Tracked Official Votes on this Roll Call:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {vote.officialVotes.map((ov, idx) => (
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
                                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
                                >
                                  <span>Official Legislative Journal Record</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Legislative History Actions */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <h3 className="text-xs font-bold text-[#FFFFEB] uppercase tracking-wider font-mono">
                          Key Legislative Milestones & Chronology
                        </h3>
                      </div>

                      <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2F2F2F]">
                        {bill.actions.map((act, idx) => (
                          <div key={idx} className="relative text-xs">
                            <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#181818]" />
                            <div className="font-semibold text-[#FFFFEB]">
                              {act.date} &mdash; {act.chamber}
                            </div>
                            <div className="text-slate-400 mt-0.5 leading-relaxed">
                              {act.actionText}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

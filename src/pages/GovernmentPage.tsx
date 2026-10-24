import React, { useState } from 'react';
import {
  Building2,
  Search,
  ExternalLink,
  Scale,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { BILLS } from '../data/bills';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const GovernmentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChamber, setSelectedChamber] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedBillId, setExpandedBillId] = useState<string | null>('tx-88-2s-sb2');

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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-full font-medium mb-2">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>TEXAS & FEDERAL LEGISLATIVE TRACKER</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Government & Legislative Tracker
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Search enacted laws, failed proposals, and official roll-call votes. Every bill status reflects actual constitutional disposition, distinguishing introduced bills from enacted statutes.
        </p>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bill number (e.g. SB 2, HB 1), topic (vouchers, taxes), or author..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Chamber:</span>
            <div className="flex gap-1">
              {chambers.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedChamber(c)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedChamber === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bills Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Displaying <strong>{filteredBills.length}</strong> documented bills (Curated Texas Demonstration Collection • As-of Oct 2024)
          </span>
        </div>

        {filteredBills.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching bills found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching for "SB 2", "SB 4", "vouchers", "tax", or resetting your filters.
            </p>
          </div>
        ) : (
          filteredBills.map((bill) => {
            const isExpanded = expandedBillId === bill.id;

            return (
              <div
                key={bill.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Bill Header Summary */}
                <div className="p-5 md:p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-800 rounded border border-blue-200">
                        {bill.officialBillNumber}
                      </span>
                      <span className="text-xs text-slate-500">{bill.session}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          bill.status === 'Enacted'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : bill.status === 'Failed'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {bill.status === 'Enacted' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                        {bill.status === 'Failed' && <XCircle className="w-3.5 h-3.5 mr-1" />}
                        <span>{bill.status}</span>
                      </span>
                      <span className="text-xs text-slate-400">({bill.statusDate})</span>
                    </div>
                  </div>

                  <h2 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                    {bill.title}
                  </h2>

                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong>Plain-English Summary:</strong> {bill.plainEnglishExplanation}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
                    <div>
                      <span>Author: <strong>{bill.author}</strong></span>
                      {bill.coauthors.length > 0 && (
                        <span> • Coauthors: {bill.coauthors.join(', ')}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={bill.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>Official Bill Text</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setExpandedBillId(isExpanded ? null : bill.id)}
                        className="text-slate-800 font-semibold hover:text-blue-600 transition-colors"
                      >
                        {isExpanded ? 'Hide Legislative History ▲' : 'View Roll-Call Votes & History ▼'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Legislative Action Timeline & Roll Call Votes */}
                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-200 p-5 md:p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                    {/* Recorded Roll-Call Votes */}
                    {bill.keyVotes && bill.keyVotes.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-blue-700" />
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Official Recorded Roll-Call Votes ({bill.keyVotes.length})
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {bill.keyVotes.map((vote) => (
                            <div
                              key={vote.id}
                              className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3 text-xs"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                                <div>
                                  <span className="font-bold text-slate-900">{vote.rollCallNumber}</span>
                                  <span className="text-slate-500 ml-2">({vote.voteDate})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-emerald-700">Yeas: {vote.yeas}</span>
                                  <span>•</span>
                                  <span className="font-semibold text-rose-700">Nays: {vote.nays}</span>
                                  <span>•</span>
                                  <span className="text-slate-500">Present: {vote.present}</span>
                                </div>
                              </div>

                              <p className="text-slate-700">
                                <strong>Motion:</strong> {vote.motion} &mdash; Result: <strong className="text-slate-900">{vote.result}</strong>
                              </p>

                              {/* Member Votes Sample */}
                              <div className="pt-2">
                                <div className="font-semibold text-slate-700 mb-1.5">
                                  Tracked Official Votes on this Roll Call:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {vote.officialVotes.map((ov, idx) => (
                                    <div
                                      key={idx}
                                      className="p-2 bg-slate-50 rounded border border-slate-100 flex items-center justify-between"
                                    >
                                      <span>
                                        {ov.officialName} ({ov.party}, {ov.district})
                                      </span>
                                      <span
                                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                          ov.vote === 'Yea'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-rose-100 text-rose-800'
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
                                  className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
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
                        <Clock className="w-4 h-4 text-slate-600" />
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Key Legislative Milestones & Chronology
                        </h3>
                      </div>

                      <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {bill.actions.map((act, idx) => (
                          <div key={idx} className="relative text-xs">
                            <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-slate-50" />
                            <div className="font-semibold text-slate-800">
                              {act.date} &mdash; {act.chamber}
                            </div>
                            <div className="text-slate-600 mt-0.5 leading-relaxed">
                              {act.actionText}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

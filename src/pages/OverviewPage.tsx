import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Users,
  ExternalLink,
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { CLAIMS } from '../data/claims';
import { BILLS } from '../data/bills';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const OverviewPage: React.FC = () => {
  const { selectedCongressional, selectedStateSenate, selectedStateHouse } = useCivic();
  const [claimInput, setClaimInput] = useState('');
  const navigate = useNavigate();

  const handleInvestigateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimInput.trim()) {
      navigate(`/investigate?q=${encodeURIComponent(claimInput.trim())}`);
    }
  };

  const sampleRecentClaims = CLAIMS.slice(0, 4);
  const recentBills = BILLS.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Dashboard Hero */}
      <div className="bg-[#0B132B] text-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs rounded-full font-medium tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>NONPARTISAN TEXAS CIVIC INTELLIGENCE</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            See beyond the spin.
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Understand your candidates. Investigate political claims. Connect campaign statements directly to original Texas legislative journals, roll-call votes, and primary source documents.
          </p>

          {/* Quick Investigation Input Form */}
          <form onSubmit={handleInvestigateSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder="Paste a political claim, ad quote, or statement to investigate..."
                  className="w-full pl-11 pr-4 py-3 bg-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white/15 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <span>Investigate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Try an example:</span>
              <button
                type="button"
                onClick={() => setClaimInput('Texas passed an $18 billion property tax cut in 2023.')}
                className="hover:text-blue-300 underline underline-offset-2 transition-colors text-left"
              >
                $18B Texas property tax cut
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setClaimInput('Texas lawmakers passed universal private school vouchers into law.')}
                className="hover:text-blue-300 underline underline-offset-2 transition-colors text-left"
              >
                School vouchers in 88th Legislature
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Grid: Personalized District Banner + Candidate Comparison Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District Status Card */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-base">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Your Active Representation</span>
              </div>
              <Link
                to="/district"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                <span>Change District</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  U.S. House
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Texas District {selectedCongressional.districtNumber}
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">
                  {selectedCongressional.region}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Texas Senate
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Senate District {selectedStateSenate.districtNumber}
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">
                  {selectedStateSenate.region}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Texas House
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  House District {selectedStateHouse.districtNumber}
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">
                  {selectedStateHouse.region}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>District profiles verified against official Texas Secretary of State boundaries.</span>
            <Link to="/district" className="text-slate-800 font-medium hover:underline">
              View Representatives &rarr;
            </Link>
          </div>
        </div>

        {/* Candidate Compare Shortcut */}
        <div className="bg-gradient-to-br from-slate-900 to-[#1C2541] text-white rounded-xl p-5 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[11px] font-medium rounded-full mb-2">
              <Users className="w-3 h-3" />
              <span>CANDIDATE COMPARISON</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              Texas U.S. Senate Race
            </h3>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">
              Compare Ted Cruz and Colin Allred side-by-side across 6 verified policy categories with official voting records.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/60">
            <Link
              to="/compare"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Launch Side-by-Side Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Claim Investigations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Recent Claim Investigations
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Evaluated using our multi-stage evidential pipeline. Click any claim to inspect original primary sources.
            </p>
          </div>
          <Link
            to="/investigate"
            className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
          >
            <span>View All Research Library ({CLAIMS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleRecentClaims.map((claim) => (
            <Link
              key={claim.id}
              to={`/investigate/${claim.id}`}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    {claim.topic}
                  </span>
                  <VerdictBadge verdict={claim.assessment.verdict} size="sm" />
                </div>

                <h3 className="font-semibold text-slate-900 text-sm md:text-base group-hover:text-blue-700 transition-colors leading-snug">
                  "{claim.claimText}"
                </h3>

                <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {claim.assessment.shortExplanation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[200px]">Source: {claim.speakerOrSource}</span>
                <span className="text-blue-600 font-medium group-hover:underline flex items-center gap-1">
                  <span>Inspect Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Texas Government Activity Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Recent Legislative Activity
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Enacted laws and recorded roll-call votes from the Texas Legislature and U.S. Congress.
            </p>
          </div>
          <Link
            to="/government"
            className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
          >
            <span>Search All Bills</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {recentBills.map((bill) => (
            <div key={bill.id} className="p-5 hover:bg-slate-50/70 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200">
                    {bill.officialBillNumber}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {bill.session}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bill.status === 'Enacted'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : bill.status === 'Failed'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    Status: {bill.status}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-slate-900 text-sm md:text-base mt-2">
                {bill.title}
              </h3>

              <p className="text-slate-600 text-xs md:text-sm mt-1 leading-relaxed">
                {bill.plainEnglishExplanation}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100/80 text-xs">
                <span className="text-slate-500">Author: {bill.author}</span>
                <a
                  href={bill.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                >
                  <span>Texas Legislature Online Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nonpartisan Guarantee Banner */}
      <NonpartisanDisclaimer />
    </div>
  );
};

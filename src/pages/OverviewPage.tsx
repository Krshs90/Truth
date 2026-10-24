import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ArrowRight,
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
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Editorial Research Masthead (Authoritative, non-slop, no eyebrow pill) */}
      <section className="bg-[#0B132B] text-white rounded-2xl p-7 md:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            See beyond the spin.
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Understand your candidates. Investigate political claims. Connect campaign statements directly to original Texas legislative journals, recorded votes, and primary government records.
          </p>

          {/* Core Investigation Input Console */}
          <form onSubmit={handleInvestigateSubmit} className="pt-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder="Paste a political claim, ad quote, or statement to investigate..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder:text-slate-400 text-sm rounded-xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white/15 transition-colors font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shrink-0 font-sans cursor-pointer"
              >
                <span>Investigate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span className="text-slate-400">Examples from Texas politics:</span>
              <button
                type="button"
                onClick={() => setClaimInput('Texas passed an $18 billion property tax cut in 2023.')}
                className="hover:text-blue-300 underline underline-offset-4 decoration-slate-600 hover:decoration-blue-400 transition-colors text-left cursor-pointer"
              >
                $18B property tax relief (SB 2)
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setClaimInput('Texas lawmakers passed universal private school vouchers into law.')}
                className="hover:text-blue-300 underline underline-offset-4 decoration-slate-600 hover:decoration-blue-400 transition-colors text-left cursor-pointer"
              >
                School vouchers (88th Legislature)
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Asymmetric Overview: District Intelligence & Candidate Comparison */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Representation Overview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200/90 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-700" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Your Active Representation
                </h2>
              </div>
              <Link
                to="/district"
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
              >
                <span>Configure District</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200/70">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  U.S. House
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Texas District {selectedCongressional.districtNumber}
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">
                  {selectedCongressional.region}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200/70">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Texas Senate
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  District {selectedStateSenate.districtNumber}
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">
                  {selectedStateSenate.region}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200/70">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Texas House
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  District {selectedStateHouse.districtNumber}
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">
                  {selectedStateHouse.region}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Verified against official Texas Secretary of State boundaries.</span>
            <Link to="/district" className="text-slate-900 font-semibold hover:underline">
              Inspect Representatives &rarr;
            </Link>
          </div>
        </div>

        {/* Candidate Comparison Feature (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Comparative Policy Matrix</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white leading-snug">
              Texas U.S. Senate Race
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Compare Ted Cruz and Colin Allred side-by-side across 6 documented policy areas with primary roll-call voting citations. No rankings or endorsements.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link
              to="/compare"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <span>Open Side-by-Side Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Investigations Stream */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
              Recent Claim Investigations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tested against Texas Legislature Online and Congressional journals. Click to inspect primary records.
            </p>
          </div>
          <Link
            to="/investigate"
            className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
          >
            <span>Research Library ({CLAIMS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleRecentClaims.map((claim) => (
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
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[200px]">Speaker: {claim.speakerOrSource}</span>
                <span className="text-blue-700 font-semibold group-hover:underline flex items-center gap-1">
                  <span>Inspect Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Legislative Activity Section */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
              Documented Legislative Records
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enacted statutes and official roll-call votes from the Texas Legislature and U.S. Congress.
            </p>
          </div>
          <Link
            to="/government"
            className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
          >
            <span>Government Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {recentBills.map((bill) => (
            <div key={bill.id} className="p-5 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                    {bill.officialBillNumber}
                  </span>
                  <span className="text-xs text-slate-500">{bill.session}</span>
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

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Author: {bill.author}</span>
                <a
                  href={bill.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
                >
                  <span>Texas Legislature Online Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NonpartisanDisclaimer />
    </div>
  );
};

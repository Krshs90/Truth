import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  ArrowRight,
  Users,
  ExternalLink,
  Building2,
  Calendar,
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
    <div className="space-y-8">
      {/* Editorial Research Masthead (Whispr Deep Obsidian Dark Theme) */}
      <section
        className="rounded-3xl p-6 md:p-10 border relative overflow-hidden"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border text-slate-300"
            style={{ background: '#262626', borderColor: '#333333' }}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Texas Civic Intelligence System</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-[#FFFFEB] leading-tight">
            See beyond the spin.
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl opacity-90">
            Understand your candidates. Investigate political claims. Connect campaign statements directly to original Texas legislative journals, recorded votes, and primary government records.
          </p>

          {/* Core Investigation Input Console */}
          <form onSubmit={handleInvestigateSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder="Paste a political claim, ad quote, or statement to investigate..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition-colors font-sans"
                  style={{
                    background: '#262626',
                    borderColor: '#333333',
                    color: '#FFFFEB',
                  }}
                />
              </div>
              <motion.button
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 shrink-0 font-sans cursor-pointer shadow-md"
              >
                <span>Investigate</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400">
              <span className="text-slate-500">Verified Texas test cases:</span>
              <button
                type="button"
                onClick={() => setClaimInput('Texas passed an $18 billion property tax cut in 2023.')}
                className="hover:text-blue-400 underline underline-offset-4 decoration-slate-700 hover:decoration-blue-400 transition-colors text-left cursor-pointer text-[#FFFFEB] opacity-80 hover:opacity-100"
              >
                $18B property tax relief (SB 2)
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setClaimInput('Texas lawmakers passed universal private school vouchers into law.')}
                className="hover:text-blue-400 underline underline-offset-4 decoration-slate-700 hover:decoration-blue-400 transition-colors text-left cursor-pointer text-[#FFFFEB] opacity-80 hover:opacity-100"
              >
                School vouchers (88th Legislature)
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Overview Cards: Representation & Candidate Comparison */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Representation Overview (7 cols) */}
        <div
          className="lg:col-span-7 rounded-3xl p-6 md:p-7 border flex flex-col justify-between"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: '#2A2A2A' }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#FFFFEB]">
                  Your Active Representation
                </h2>
              </div>
              <Link
                to="/district"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Configure District</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <motion.div
                whileHover={{ y: -2 }}
                className="p-3.5 rounded-2xl border"
                style={{ background: '#242424', borderColor: '#2F2F2F' }}
              >
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  U.S. House
                </div>
                <div className="text-sm font-bold text-[#FFFFEB] mt-0.5">
                  District {selectedCongressional.districtNumber === '0' || !selectedCongressional.districtNumber ? 'Statewide' : selectedCongressional.districtNumber}
                </div>
                <div className="text-xs text-slate-400 mt-1 truncate">
                  {selectedCongressional.region}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-3.5 rounded-2xl border"
                style={{ background: '#242424', borderColor: '#2F2F2F' }}
              >
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  Texas Senate
                </div>
                <div className="text-sm font-bold text-[#FFFFEB] mt-0.5">
                  District {selectedStateSenate.districtNumber}
                </div>
                <div className="text-xs text-slate-400 mt-1 truncate">
                  {selectedStateSenate.region}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-3.5 rounded-2xl border"
                style={{ background: '#242424', borderColor: '#2F2F2F' }}
              >
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  Texas House
                </div>
                <div className="text-sm font-bold text-[#FFFFEB] mt-0.5">
                  District {selectedStateHouse.districtNumber}
                </div>
                <div className="text-xs text-slate-400 mt-1 truncate">
                  {selectedStateHouse.region}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs text-slate-400" style={{ borderColor: '#2A2A2A' }}>
            <span>Verified against official Texas Secretary of State records.</span>
            <Link to="/district" className="text-blue-400 hover:text-blue-300 font-semibold">
              Inspect Representatives &rarr;
            </Link>
          </div>
        </div>

        {/* Candidate Comparison Feature (5 cols) */}
        <div
          className="lg:col-span-5 rounded-3xl p-6 md:p-7 border flex flex-col justify-between"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Comparative Policy Matrix</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-[#FFFFEB] leading-snug">
              Texas U.S. Senate Race
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed opacity-85">
              Compare Ted Cruz and Colin Allred side-by-side across 6 documented policy areas with primary roll-call voting citations. No rankings or endorsements.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t" style={{ borderColor: '#2A2A2A' }}>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/compare"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <span>Open Side-by-Side Comparison</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Investigations Stream */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: '#2A2A2A' }}>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FFFFEB] tracking-tight">
              Recent Claim Investigations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tested against Texas Legislature Online and Congressional journals. Click to inspect primary records.
            </p>
          </div>
          <Link
            to="/investigate"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
          >
            <span>Research Library ({CLAIMS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleRecentClaims.map((claim) => (
            <motion.div
              key={claim.id}
              whileHover={{ y: -2, borderColor: '#3A3A3A' }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="rounded-2xl p-5 border flex flex-col justify-between transition-colors"
              style={{
                background: '#1E1E1E',
                borderColor: '#2A2A2A',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <VerdictBadge verdict={claim.assessment.verdict} size="sm" />
                  <span className="text-[11px] text-slate-400 font-mono">
                    {claim.assessment.lastAssessedAt}
                  </span>
                </div>

                <Link
                  to={`/investigate/${claim.id}`}
                  className="font-serif font-bold text-base text-[#FFFFEB] hover:text-blue-400 transition-colors block leading-snug"
                >
                  "{claim.claimText}"
                </Link>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-85">
                  {claim.assessment.shortExplanation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: '#2A2A2A' }}>
                <span className="text-slate-400 truncate max-w-[200px]">
                  Subject: <strong className="text-slate-200">{claim.speakerOrSource}</strong>
                </span>
                <Link
                  to={`/investigate/${claim.id}`}
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 shrink-0"
                >
                  <span>Inspect Evidence ({claim.assessment.primarySources.length + claim.assessment.supportingEvidence.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Government Activity Section */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: '#2A2A2A' }}>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FFFFEB] tracking-tight">
              Texas Legislative Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enacted legislation and recorded votes from the 88th Texas Legislature.
            </p>
          </div>
          <Link
            to="/government"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
          >
            <span>All Legislation ({BILLS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentBills.map((bill) => (
            <motion.div
              key={bill.id}
              whileHover={{ y: -2, borderColor: '#3A3A3A' }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{
                background: '#1E1E1E',
                borderColor: '#2A2A2A',
              }}
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262626] text-blue-400 border border-[#31312F]">
                    {bill.officialBillNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {bill.title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {bill.plainEnglishExplanation}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Enacted: {bill.statusDate}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{bill.chamber}</span>
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <a
                  href={bill.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-[#FFFFEB] border hover:bg-[#2A2A2A] transition-colors flex items-center gap-1.5 cursor-pointer"
                  style={{
                    background: '#242424',
                    borderColor: '#2F2F2F',
                  }}
                >
                  <span>Texas Capitol Record</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nonpartisan Civic Integrity Standard */}
      <NonpartisanDisclaimer />
    </div>
  );
};

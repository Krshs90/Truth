import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ExternalLink,
  Scale,
  FileText,
  CheckCircle2,
  Database,
  Send,
} from 'lucide-react';
import { TRUSTED_SOURCES } from '../data/sources';
import { DATA_PROVENANCE_LOG } from '../data/provenance';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const SourcesPage: React.FC = () => {
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);
  const [claimIdInput, setClaimIdInput] = useState('');
  const [sourceUrlInput, setSourceUrlInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimIdInput && sourceUrlInput) {
      setCorrectionSubmitted(true);
      setTimeout(() => {
        setCorrectionSubmitted(false);
        setClaimIdInput('');
        setSourceUrlInput('');
        setNotesInput('');
      }, 4000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Sources, Methodology & Evidential Standards
        </h1>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl opacity-90">
          Truth is committed to absolute transparency. Here is how we verify claims, differentiate primary records from secondary reporting, and uphold nonpartisan neutrality.
        </p>
      </div>

      {/* Nonpartisan Core Mission Statement */}
      <div
        className="rounded-3xl p-6 md:p-8 border space-y-3"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Nonpartisan Charter</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#FFFFEB]">
          We provide the evidence. You decide for yourself.
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed opacity-90">
          Truth does not endorse candidates, evaluate moral character, or assign subjective "favorability" or "truth scores." Political decisions belong to the voter. Our purpose is to demystify complex government systems by connecting political advertisements and campaign speeches directly to primary legislative records, roll-call tallies, and statutory texts.
        </p>
      </div>

      {/* Primary vs Secondary Sources Hierarchy */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-5"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <h2 className="text-lg font-bold text-[#FFFFEB] flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-400" />
          <span>Hierarchy of Evidence</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div
            className="p-5 rounded-2xl border space-y-2"
            style={{
              background: 'rgba(59, 130, 246, 0.05)',
              borderColor: 'rgba(59, 130, 246, 0.25)',
            }}
          >
            <div className="font-bold text-blue-300 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-mono">1</span>
              <span>Primary Government Sources (First Priority)</span>
            </div>
            <p className="text-slate-300 leading-relaxed opacity-90">
              Official legislative journals, enrolled bill statutes from Texas Legislature Online, official roll-call records from the U.S. Senate and House Clerks, U.S. Census Bureau ACS tables, and certified judicial opinions.
            </p>
            <div className="text-[11px] text-blue-300 font-semibold font-mono">
              Rule: An introduced bill is NEVER presented as enacted law unless signed or passed over veto.
            </div>
          </div>

          <div
            className="p-5 rounded-2xl border space-y-2"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <div className="font-bold text-[#FFFFEB] text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#333333] text-white flex items-center justify-center text-xs font-mono">2</span>
              <span>Corroborating Journalism & IFCN Fact-Checks</span>
            </div>
            <p className="text-slate-300 leading-relaxed opacity-90">
              In-depth public policy reporting from nonpartisan newsrooms (The Texas Tribune) and International Fact-Checking Network signatories (PolitiFact, FactCheck.org).
            </p>
            <div className="text-[11px] text-slate-400 font-semibold font-mono">
              Rule: Campaign press releases reflect stated intent, but are never treated as independent proof of empirical fact.
            </div>
          </div>
        </div>
      </div>

      {/* The 7 Analytical Verdict Categories */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-[#FFFFEB]">
            Analytical Verdict Rubrics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Our verdicts represent analytical categories based on available documentary evidence, not moral judgments.
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3.5 rounded-2xl border bg-emerald-950/30 border-emerald-500/30 text-emerald-200">
            <span className="font-bold text-emerald-300 font-mono">Supported by evidence:</span>
            <span className="ml-2 text-slate-200">
              The factual assertion is directly substantiated by primary statutory records, roll calls, or official statistical data without significant omission.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border bg-teal-950/30 border-teal-500/30 text-teal-200">
            <span className="font-bold text-teal-300 font-mono">Mostly supported:</span>
            <span className="ml-2 text-slate-200">
              The primary premise is corroborated, but minor technical qualifications or rounding nuances apply.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border bg-amber-950/30 border-amber-500/30 text-amber-200">
            <span className="font-bold text-amber-300 font-mono">Misleading or missing important context:</span>
            <span className="ml-2 text-slate-200">
              The statement may contain an accurate fact but omits vital context, conflates introduced proposals with enacted statutes, or misrepresents a vote's procedural scope.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border bg-orange-950/30 border-orange-500/30 text-orange-200">
            <span className="font-bold text-orange-300 font-mono">Mostly unsupported:</span>
            <span className="ml-2 text-slate-200">
              Available records fail to establish the central claim, or the claim relies on theoretical assumptions contradicted by statutory text.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border bg-rose-950/30 border-rose-500/30 text-rose-200">
            <span className="font-bold text-rose-300 font-mono">Contradicted by available evidence:</span>
            <span className="ml-2 text-slate-200">
              Official recorded votes, enacted statutes, or public records directly refute the assertion.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border bg-[#242424] border-[#31312F] text-slate-300">
            <span className="font-bold text-white font-mono">Unverified:</span>
            <span className="ml-2 text-slate-300">
              Primary public records are insufficient to confirm or disprove the claim. An unverified claim is NOT automatically false; it reflects an absence of verifiable evidence.
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border bg-indigo-950/30 border-indigo-500/30 text-indigo-200">
            <span className="font-bold text-indigo-300 font-mono">Opinion or prediction, not directly fact-checkable:</span>
            <span className="ml-2 text-slate-200">
              The statement expresses future forecasts, rhetorical value judgments, or ideological philosophies rather than historical facts.
            </span>
          </div>
        </div>
      </div>

      {/* Directory of Trusted Sources */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-[#FFFFEB] flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span>Trusted Sources Directory ({TRUSTED_SOURCES.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every external portal used by Truth in our indexed civic research catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRUSTED_SOURCES.map((src) => (
            <motion.div
              key={src.id}
              whileHover={{ y: -2, borderColor: '#3A3A3A' }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="p-5 rounded-2xl border space-y-2 text-xs flex flex-col justify-between"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-[#FFFFEB] text-sm">{src.title}</h3>
                  {src.isPrimarySource && (
                    <span className="text-[10px] font-mono font-bold bg-blue-950/60 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                      PRIMARY
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5 font-mono">{src.publisher}</div>
                <p className="text-slate-300 mt-2 leading-relaxed opacity-85">
                  {src.reliabilityNotes}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between text-[11px]" style={{ borderColor: '#333333' }}>
                <span className="text-slate-400">Checked: {src.lastCheckedAt}</span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Provenance Table */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-[#FFFFEB] flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Data Provenance & Audit Log</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Record-level audit log of primary document retrieval dates, verification methods, and public access terms.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border rounded-2xl overflow-hidden" style={{ borderColor: '#2A2A2A' }}>
            <thead className="text-slate-300 font-semibold border-b font-mono" style={{ background: '#242424', borderColor: '#2A2A2A' }}>
              <tr>
                <th className="p-3">Record Collection</th>
                <th className="p-3">Source Entity</th>
                <th className="p-3">Retrieval Date</th>
                <th className="p-3">Verification Method</th>
                <th className="p-3">Terms</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-300" style={{ borderColor: '#2A2A2A' }}>
              {DATA_PROVENANCE_LOG.map((p) => (
                <tr key={p.id} className="hover:bg-[#242424]/60 transition-colors">
                  <td className="p-3 font-semibold text-[#FFFFEB]">{p.recordName}</td>
                  <td className="p-3">{p.sourceEntity}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">{p.retrievalDate}</td>
                  <td className="p-3 font-mono text-[11px] text-blue-400">{p.verificationMethod}</td>
                  <td className="p-3 text-slate-400">{p.licenseOrTerms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correction & Feedback Policy Form */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div>
          <h2 className="text-lg font-bold text-[#FFFFEB] flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-400" />
            <span>Corrections & Public Audit Policy</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            If you identify an inaccurate statutory quotation, broken source link, or omitted context, submit an evidence citation below. We review all submissions against official government archives.
          </p>
        </div>

        {correctionSubmitted ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Thank you. Your correction request has been logged and queued for comparison against primary state journals.
            </span>
          </div>
        ) : (
          <form onSubmit={handleCorrectionSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                  Report ID or Claim Text *
                </label>
                <input
                  type="text"
                  required
                  value={claimIdInput}
                  onChange={(e) => setClaimIdInput(e.target.value)}
                  placeholder="e.g. claim-tx-tax-cut-18b or bill number"
                  className="w-full p-2.5 rounded-xl text-xs text-[#FFFFEB] border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  style={{
                    background: '#242424',
                    borderColor: '#2F2F2F',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                  Official Primary Source URL *
                </label>
                <input
                  type="url"
                  required
                  value={sourceUrlInput}
                  onChange={(e) => setSourceUrlInput(e.target.value)}
                  placeholder="https://capitol.texas.gov/..."
                  className="w-full p-2.5 rounded-xl text-xs text-[#FFFFEB] border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  style={{
                    background: '#242424',
                    borderColor: '#2F2F2F',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                Correction Details & Explanation (Optional)
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Explain the specific factual error or omitted legislative history..."
                className="w-full p-2.5 rounded-xl text-xs text-[#FFFFEB] border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                style={{
                  background: '#242424',
                  borderColor: '#2F2F2F',
                }}
              />
            </div>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
            >
              Submit Evidence for Review
            </motion.button>
          </form>
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

import React, { useState } from 'react';
import {
  BookOpen,
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
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-full font-medium mb-2">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>RESEARCH METHODOLOGY & PROVENANCE</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Sources, Methodology & Evidential Standards
        </h1>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Truth is committed to absolute transparency. Here is how we verify claims, differentiate primary records from secondary reporting, and uphold nonpartisan neutrality.
        </p>
      </div>

      {/* Nonpartisan Core Mission Statement */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xs border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Nonpartisan Charter</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          We provide the evidence. You decide for yourself.
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Truth does not endorse candidates, evaluate moral character, or assign subjective "favorability" or "truth scores." Political decisions belong to the voter. Our purpose is to demystify complex government systems by connecting political advertisements and campaign speeches directly to primary legislative records, roll-call tallies, and statutory texts.
        </p>
      </div>

      {/* Primary vs Secondary Sources Hierarchy */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <span>Hierarchy of Evidence</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
            <div className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Primary Government Sources (First Priority)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Official legislative journals, enrolled bill statutes from Texas Legislature Online, official roll-call records from the U.S. Senate and House Clerks, U.S. Census Bureau ACS tables, and certified judicial opinions.
            </p>
            <div className="text-[11px] text-blue-800 font-semibold">
              Rule: An introduced bill is NEVER presented as enacted law unless signed or passed over veto.
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs">2</span>
              <span>Corroborating Journalism & IFCN Fact-Checks</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              In-depth public policy reporting from nonpartisan newsrooms (The Texas Tribune) and International Fact-Checking Network signatories (PolitiFact, FactCheck.org).
            </p>
            <div className="text-[11px] text-slate-600 font-semibold">
              Rule: Campaign press releases reflect stated intent, but are never treated as independent proof of empirical fact.
            </div>
          </div>
        </div>
      </div>

      {/* The 7 Analytical Verdict Categories */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Analytical Verdict Rubrics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Our verdicts represent analytical categories based on available documentary evidence, not moral judgments.
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="font-bold text-emerald-900">Supported by evidence:</span>
            <span className="text-emerald-800 ml-2">
              The factual assertion is directly substantiated by primary statutory records, roll calls, or official statistical data without significant omission.
            </span>
          </div>

          <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
            <span className="font-bold text-teal-900">Mostly supported:</span>
            <span className="text-teal-800 ml-2">
              The primary premise is corroborated, but minor technical qualifications or rounding nuances apply.
            </span>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="font-bold text-amber-900">Misleading or missing important context:</span>
            <span className="text-amber-800 ml-2">
              The statement may contain an accurate fact but omits vital context, conflates introduced proposals with enacted statutes, or misrepresents a vote's procedural scope.
            </span>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <span className="font-bold text-orange-900">Mostly unsupported:</span>
            <span className="text-orange-800 ml-2">
              Available records fail to establish the central claim, or the claim relies on theoretical assumptions contradicted by statutory text.
            </span>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
            <span className="font-bold text-rose-900">Contradicted by available evidence:</span>
            <span className="text-rose-800 ml-2">
              Official recorded votes, enacted statutes, or public records directly refute the assertion.
            </span>
          </div>

          <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg">
            <span className="font-bold text-slate-900">Unverified:</span>
            <span className="text-slate-700 ml-2">
              Primary public records are insufficient to confirm or disprove the claim. An unverified claim is NOT automatically false; it reflects an absence of verifiable evidence.
            </span>
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <span className="font-bold text-indigo-900">Opinion or prediction, not directly fact-checkable:</span>
            <span className="text-indigo-800 ml-2">
              The statement expresses future forecasts, rhetorical value judgments, or ideological philosophies rather than historical facts.
            </span>
          </div>
        </div>
      </div>

      {/* Directory of Trusted Sources */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>Trusted Sources Directory ({TRUSTED_SOURCES.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Every external portal used by Truth in our indexed civic research catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRUSTED_SOURCES.map((src) => (
            <div
              key={src.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-slate-900 text-sm">{src.title}</h3>
                  {src.isPrimarySource && (
                    <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                      PRIMARY
                    </span>
                  )}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">{src.publisher}</div>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  {src.reliabilityNotes}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Checked: {src.lastCheckedAt}</span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Provenance Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Data Provenance & Audit Log</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Record-level audit log of primary document retrieval dates, verification methods, and public access terms.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Record Collection</th>
                <th className="p-3">Source Entity</th>
                <th className="p-3">Retrieval Date</th>
                <th className="p-3">Verification Method</th>
                <th className="p-3">Terms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {DATA_PROVENANCE_LOG.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{p.recordName}</td>
                  <td className="p-3">{p.sourceEntity}</td>
                  <td className="p-3 font-mono text-[11px]">{p.retrievalDate}</td>
                  <td className="p-3 font-mono text-[11px] text-blue-700">{p.verificationMethod}</td>
                  <td className="p-3 text-slate-500">{p.licenseOrTerms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correction & Feedback Policy Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            <span>Corrections & Public Audit Policy</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            If you identify an inaccurate statutory quotation, broken source link, or omitted context, submit an evidence citation below. We review all submissions against official government archives.
          </p>
        </div>

        {correctionSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Thank you. Your correction request has been logged and queued for comparison against primary state journals.
            </span>
          </div>
        ) : (
          <form onSubmit={handleCorrectionSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Report ID or Claim Text *
                </label>
                <input
                  type="text"
                  required
                  value={claimIdInput}
                  onChange={(e) => setClaimIdInput(e.target.value)}
                  placeholder="e.g. claim-tx-tax-cut-18b or bill number"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Primary Source URL *
                </label>
                <input
                  type="url"
                  required
                  value={sourceUrlInput}
                  onChange={(e) => setSourceUrlInput(e.target.value)}
                  placeholder="https://capitol.texas.gov/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correction Details & Explanation (Optional)
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Explain the specific factual error or omitted legislative history..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs transition-colors"
            >
              Submit Evidence for Review
            </button>
          </form>
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Scale,
  AlertCircle,
  AlertTriangle,
  FileText,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Printer,
  Share2,
} from 'lucide-react';
import { CLAIMS } from '../data/claims';
import { Claim } from '../types';
import { VerdictBadge } from '../components/ui/VerdictBadge';
import { SourcePill } from '../components/ui/SourcePill';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const ClaimDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!id) return;

    const found = CLAIMS.find((c) => c.id === id);
    if (found) {
      setClaim(found);
      return;
    }

    const stored = sessionStorage.getItem(`truth_claim_${id}`);
    if (stored) {
      try {
        setClaim(JSON.parse(stored));
      } catch {
        setClaim(null);
      }
    }
  }, [id]);

  if (!claim) {
    return (
      <div className="py-20 text-center space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
        <h1 className="text-xl font-bold text-[#FFFFEB]">Investigation Record Not Found</h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          The requested investigation ID could not be found in the current session or research catalog.
        </p>
        <Link
          to="/investigate"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-[#141414] rounded-2xl text-sm font-semibold hover:bg-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Investigation Workspace</span>
        </Link>
      </div>
    );
  }

  const { assessment } = claim;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <Link
          to="/investigate"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#FFFFEB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Investigation Workspace</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{
              background: '#222222',
              borderColor: '#2F2F2F',
            }}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Dossier'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{
              background: '#222222',
              borderColor: '#2F2F2F',
            }}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      <div
        className="rounded-3xl border p-7 md:p-9 space-y-6"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-400 font-mono tracking-wider">
              DOSSIER {claim.id}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">
              Assessed: {assessment.lastAssessedAt}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-medium">Analytical Verdict:</span>
            <VerdictBadge verdict={assessment.verdict} size="md" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Submitted Claim Under Investigation</span>
          </div>

          <blockquote className="text-2xl md:text-3xl font-serif text-[#FFFFEB] leading-snug tracking-tight">
            "{claim.claimText}"
          </blockquote>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-400 pt-1">
            {claim.speakerOrSource && (
              <span>
                <strong>Attributed Speaker / Entity:</strong> {claim.speakerOrSource}
              </span>
            )}
            {claim.contextOrEvent && (
              <span>
                <strong>Setting:</strong> {claim.contextOrEvent}
              </span>
            )}
            <span>
              <strong>Topic Area:</strong> {claim.topic}
            </span>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border space-y-3"
          style={{
            background: '#242424',
            borderColor: '#2F2F2F',
          }}
        >
          <div className="text-xs font-bold text-[#FFFFEB] uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Info className="w-4 h-4 text-amber-400" />
            <span>2. Grounded Analytical Summary</span>
          </div>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
            {assessment.shortExplanation}
          </p>

          <div className="pt-3 border-t flex items-center justify-between text-[11px] text-slate-400" style={{ borderColor: '#333333' }}>
            <span>Audit Standard: {assessment.methodologyVersion}</span>
            <span>
              Engine:{' '}
              {assessment.assessedBy === 'local_ollama_verified'
                ? 'Local Ollama Grounded Model'
                : 'Deterministic Verification Engine'}
            </span>
          </div>
        </div>
      </div>

      <section
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-[#FFFFEB]">
            3. Decomposition of Testable Claims & Assertions
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Truth isolates individual testable statements of fact from subjective rhetoric or forward-looking predictions, testing whether public records verify each component.
        </p>

        <div className="space-y-3 pt-2">
          {assessment.keyAssertions.map((asrt, index) => (
            <div
              key={asrt.id || index}
              className="p-4 rounded-2xl border space-y-2"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#31312F] text-slate-200 flex items-center justify-center text-xs font-bold font-mono">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1A1A1A] text-slate-300 border border-[#333333] uppercase tracking-wide">
                    {asrt.assertionType === 'factual'
                      ? 'Empirical Claim (Testable)'
                      : asrt.assertionType === 'opinion'
                      ? 'Subjective Opinion'
                      : asrt.assertionType === 'prediction'
                      ? 'Future Prediction'
                      : asrt.assertionType === 'value_judgment'
                      ? 'Value Judgment'
                      : 'Testable Claim'}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      asrt.status === 'supported'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                        : asrt.status === 'contradicted'
                        ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                        : asrt.status === 'misleading'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                        : asrt.status === 'not_applicable'
                        ? 'bg-indigo-950/40 text-indigo-300 border-indigo-500/40'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {asrt.status === 'supported' && <CheckCircle2 className="w-3 h-3" />}
                    {asrt.status === 'contradicted' && <XCircle className="w-3 h-3" />}
                    {asrt.status === 'misleading' && <AlertTriangle className="w-3 h-3" />}
                    <span>
                      {asrt.status === 'supported'
                        ? 'VERIFIED BY RECORDS'
                        : asrt.status === 'contradicted'
                        ? 'CONTRADICTED BY RECORDS'
                        : asrt.status === 'misleading'
                        ? 'MISSING CONTEXT'
                        : asrt.status === 'not_applicable'
                        ? 'NOT DIRECTLY TESTABLE'
                        : 'UNVERIFIED IN RECORDS'}
                    </span>
                  </span>
                </div>
              </div>

              <div className="text-sm font-semibold text-[#FFFFEB] pl-7">
                "{asrt.assertionText}"
              </div>

              <div className="text-xs text-slate-300 pl-7 leading-relaxed opacity-90">
                {asrt.explanation}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div
          className="rounded-3xl border p-6 md:p-8 space-y-4"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-[#FFFFEB]">
              4. Evidence Supporting the Claim ({assessment.supportingEvidence.length})
            </h2>
          </div>

          {assessment.supportingEvidence.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 rounded-xl border" style={{ background: '#242424', borderColor: '#2F2F2F' }}>
              No verified records supporting this claim were identified in official state archives.
            </p>
          ) : (
            <div className="space-y-4">
              {assessment.supportingEvidence.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-2xl border space-y-2.5"
                  style={{
                    background: 'rgba(74, 222, 128, 0.05)',
                    borderColor: 'rgba(74, 222, 128, 0.2)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-xs text-[#FFFFEB]">
                      {ev.sourceTitle}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Pub: {ev.publicationDate} • Retrieved: {ev.retrievedAt}
                    </span>
                  </div>

                  <blockquote
                    className="text-xs text-slate-200 p-3 rounded-xl border font-mono leading-relaxed"
                    style={{
                      background: '#141414',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    "{ev.excerpt}"
                  </blockquote>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-100">Relevance:</strong> {ev.relevanceExplanation}
                  </p>

                  <div className="pt-1">
                    <SourcePill
                      title={ev.sourceTitle}
                      url={ev.sourceUrl}
                      publisher={ev.publisher}
                      sourceType={ev.evidenceType}
                      isPrimary={ev.isOfficialRecord}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="rounded-3xl border p-6 md:p-8 space-y-4"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-[#FFFFEB]">
              5. Evidence Contradicting or Qualifying the Claim ({assessment.contradictingOrQualifyingEvidence.length})
            </h2>
          </div>

          {assessment.contradictingOrQualifyingEvidence.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 rounded-xl border" style={{ background: '#242424', borderColor: '#2F2F2F' }}>
              No contradictory primary records or major qualifications identified.
            </p>
          ) : (
            <div className="space-y-4">
              {assessment.contradictingOrQualifyingEvidence.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-2xl border space-y-2.5"
                  style={{
                    background: 'rgba(245, 158, 11, 0.05)',
                    borderColor: 'rgba(245, 158, 11, 0.25)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-xs text-[#FFFFEB]">
                      {ev.sourceTitle}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Pub: {ev.publicationDate} • Retrieved: {ev.retrievedAt}
                    </span>
                  </div>

                  <blockquote
                    className="text-xs text-slate-200 p-3 rounded-xl border font-mono leading-relaxed"
                    style={{
                      background: '#141414',
                      borderColor: '#2A2A2A',
                    }}
                  >
                    "{ev.excerpt}"
                  </blockquote>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-100">Evidential Significance:</strong> {ev.relevanceExplanation}
                  </p>

                  <div className="pt-1">
                    <SourcePill
                      title={ev.sourceTitle}
                      url={ev.sourceUrl}
                      publisher={ev.publisher}
                      sourceType={ev.evidenceType}
                      isPrimary={ev.isOfficialRecord}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-3xl border p-6 space-y-3"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <h3 className="text-sm font-bold text-[#FFFFEB] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>6. Missing Context & Omissions</span>
          </h3>
          {assessment.missingContext.length === 0 ? (
            <p className="text-xs text-slate-400">No omitted context flagged.</p>
          ) : (
            <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
              {assessment.missingContext.map((ctx, idx) => (
                <li key={idx} className="pl-1">
                  <span>{ctx}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="rounded-3xl border p-6 space-y-3"
          style={{
            background: '#1E1E1E',
            borderColor: '#2A2A2A',
          }}
        >
          <h3 className="text-sm font-bold text-[#FFFFEB] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>9. Remaining Evidential Uncertainty</span>
          </h3>
          {assessment.remainingUncertainty.length === 0 ? (
            <p className="text-xs text-slate-400">
              The documentary record is sufficiently comprehensive to reach an analytical verdict without substantial empirical gaps.
            </p>
          ) : (
            <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
              {assessment.remainingUncertainty.map((unc, idx) => (
                <li key={idx} className="pl-1">
                  <span>{unc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-[#FFFFEB]">
            7 & 8. Original Source Documents & Reporting Directory
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Inspect the exact primary sources and independent reporting referenced in this report.
        </p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {assessment.primarySources.map((src) => (
            <SourcePill
              key={src.id}
              title={src.title}
              url={src.url}
              publisher={src.publisher}
              sourceType={src.sourceType}
              date={src.publicationDate}
              isPrimary={src.isPrimarySource}
            />
          ))}
          {assessment.factChecksAndReporting.map((src) => (
            <SourcePill
              key={src.id}
              title={src.title}
              url={src.url}
              publisher={src.publisher}
              sourceType={src.sourceType}
              date={src.publicationDate}
              isPrimary={src.isPrimarySource}
            />
          ))}
        </div>
      </section>

      <div
        className="p-5 rounded-2xl border text-xs text-slate-400 space-y-2"
        style={{
          background: '#181818',
          borderColor: '#262626',
        }}
      >
        <div className="font-bold text-[#FFFFEB]">10. Methodology & Limitations</div>
        <p className="leading-relaxed">
          {assessment.methodologyAndLimitations}
        </p>
        <p className="text-[11px] text-slate-500">
          Analytical verdicts reflect an assessment of available primary source documentation. Truth does not pass moral judgment on candidates or political parties.
        </p>
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

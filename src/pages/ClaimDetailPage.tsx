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

    // Check predefined claims
    const found = CLAIMS.find((c) => c.id === id);
    if (found) {
      setClaim(found);
      return;
    }

    // Check user session storage for newly generated claim
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
      <div className="py-16 text-center space-y-4 animate-in fade-in">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h1 className="text-xl font-bold text-slate-800">Investigation Record Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested investigation ID could not be found in the current session or research catalog.
        </p>
        <Link
          to="/investigate"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors"
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
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* Back and Action Toolbar */}
      <div className="flex items-center justify-between">
        <Link
          to="/investigate"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Investigation Workspace</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Dossier'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Primary Dossier Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
              REPORT REF: {claim.id}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">
              Assessed: {assessment.lastAssessedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Verdict:</span>
            <VerdictBadge verdict={assessment.verdict} size="md" />
          </div>
        </div>

        {/* Section 1: Original Claim */}
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>1. Original Submitted Claim</span>
          </div>
          <blockquote className="text-xl md:text-2xl font-serif font-medium text-slate-900 border-l-4 border-blue-600 pl-4 py-1 leading-snug">
            "{claim.claimText}"
          </blockquote>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {claim.speakerOrSource && (
              <span>
                <strong>Speaker / Source:</strong> {claim.speakerOrSource}
              </span>
            )}
            {claim.contextOrEvent && (
              <span>
                <strong>Context:</strong> {claim.contextOrEvent}
              </span>
            )}
            <span>
              <strong>Topic:</strong> {claim.topic}
            </span>
          </div>
        </div>

        {/* Section 2: Executive Summary Explanation */}
        <div className="bg-slate-50 rounded-xl p-4 md:p-5 border border-slate-200">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-600" />
            <span>2. Analytical Summary</span>
          </div>
          <p className="text-sm md:text-base text-slate-800 leading-relaxed">
            {assessment.shortExplanation}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Methodology: {assessment.methodologyVersion}</span>
            <span>
              Engine:{' '}
              {assessment.assessedBy === 'local_ollama_verified'
                ? 'Local Ollama Grounded Model'
                : 'Deterministic Verification Engine'}
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: Key Factual Assertions Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            3. Decomposition of Factual Assertions
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Truth isolates each factual statement from subjective opinions or rhetoric to test whether evidence substantiates the specific premise.
        </p>

        <div className="space-y-3 pt-1">
          {assessment.keyAssertions.map((asrt, index) => (
            <div
              key={asrt.id || index}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 uppercase tracking-wide">
                    {asrt.assertionType.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      asrt.status === 'supported'
                        ? 'bg-emerald-100 text-emerald-800'
                        : asrt.status === 'contradicted'
                        ? 'bg-rose-100 text-rose-800'
                        : asrt.status === 'misleading'
                        ? 'bg-amber-100 text-amber-900'
                        : asrt.status === 'not_applicable'
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {asrt.status === 'supported' && <CheckCircle2 className="w-3 h-3" />}
                    {asrt.status === 'contradicted' && <XCircle className="w-3 h-3" />}
                    {asrt.status === 'misleading' && <AlertTriangle className="w-3 h-3" />}
                    <span>Status: {asrt.status.toUpperCase()}</span>
                  </span>
                </div>
              </div>

              <div className="text-sm font-medium text-slate-900 pl-7">
                "{asrt.assertionText}"
              </div>

              <div className="text-xs text-slate-600 pl-7 leading-relaxed">
                {asrt.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 & 5: Evidence Supporting vs Contradicting/Qualifying */}
      <div className="grid grid-cols-1 gap-6">
        {/* Supporting Evidence */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              4. Evidence Supporting the Claim ({assessment.supportingEvidence.length})
            </h2>
          </div>

          {assessment.supportingEvidence.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-lg">
              No verified records supporting this claim were identified in official state archives.
            </p>
          ) : (
            <div className="space-y-4">
              {assessment.supportingEvidence.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/80 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-xs text-slate-900">
                      {ev.sourceTitle}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Pub: {ev.publicationDate} • Retrieved: {ev.retrievedAt}
                    </span>
                  </div>

                  <blockquote className="text-xs text-slate-800 bg-white p-3 rounded border border-emerald-100 font-mono leading-relaxed">
                    "{ev.excerpt}"
                  </blockquote>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Relevance:</strong> {ev.relevanceExplanation}
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

        {/* Contradicting or Qualifying Evidence */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              5. Evidence Contradicting or Qualifying the Claim ({assessment.contradictingOrQualifyingEvidence.length})
            </h2>
          </div>

          {assessment.contradictingOrQualifyingEvidence.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-lg">
              No contradictory primary records or major qualifications identified.
            </p>
          ) : (
            <div className="space-y-4">
              {assessment.contradictingOrQualifyingEvidence.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-xs text-slate-900">
                      {ev.sourceTitle}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Pub: {ev.publicationDate} • Retrieved: {ev.retrievedAt}
                    </span>
                  </div>

                  <blockquote className="text-xs text-slate-800 bg-white p-3 rounded border border-amber-100 font-mono leading-relaxed">
                    "{ev.excerpt}"
                  </blockquote>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Evidential Significance:</strong> {ev.relevanceExplanation}
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
      </div>

      {/* Section 6 & 9: Missing Context & Remaining Uncertainty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span>6. Missing Context & Nuance</span>
          </h3>
          {assessment.missingContext.length === 0 ? (
            <p className="text-xs text-slate-500">No omitted context flagged.</p>
          ) : (
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              {assessment.missingContext.map((ctx, idx) => (
                <li key={idx} className="pl-1">
                  <span>{ctx}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>9. Remaining Evidential Uncertainty</span>
          </h3>
          {assessment.remainingUncertainty.length === 0 ? (
            <p className="text-xs text-slate-500">
              The documentary record is sufficiently comprehensive to reach an analytical verdict without substantial empirical gaps.
            </p>
          ) : (
            <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside leading-relaxed">
              {assessment.remainingUncertainty.map((unc, idx) => (
                <li key={idx} className="pl-1">
                  <span>{unc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Section 7 & 8: Primary Source Documents & Independent Fact-Checks */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            7 & 8. Original Source Documents & Reporting Directory
          </h2>
        </div>
        <p className="text-xs text-slate-500">
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
      </div>

      {/* Section 10: Methodology & Limitations */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <div className="font-semibold text-slate-800">10. Methodology & Limitations</div>
        <p className="leading-relaxed">
          {assessment.methodologyAndLimitations}
        </p>
        <p className="text-[11px] text-slate-500 pt-1">
          Analytical verdicts reflect an assessment of available primary source documentation. Truth does not pass moral judgment on candidates or political parties.
        </p>
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

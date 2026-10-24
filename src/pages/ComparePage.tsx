import React, { useState } from 'react';
import {
  ExternalLink,
  Filter,
} from 'lucide-react';
import { CANDIDATES } from '../data/candidates';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import { SourcePill } from '../components/ui/SourcePill';

export const ComparePage: React.FC = () => {
  const [candidateAId, setCandidateAId] = useState<string>('cand-cruz-2024');
  const [candidateBId, setCandidateBId] = useState<string>('cand-allred-2024');
  const [selectedIssueFilter, setSelectedIssueFilter] = useState<string>('All');

  const candidateA = CANDIDATES.find((c) => c.id === candidateAId) || CANDIDATES[0];
  const candidateB = CANDIDATES.find((c) => c.id === candidateBId) || CANDIDATES[1];

  // Compile list of unique issues across both candidates
  const allIssues = Array.from(
    new Set([
      ...candidateA.policyPositions.map((p) => p.issue),
      ...candidateB.policyPositions.map((p) => p.issue),
    ])
  );

  const displayedIssues = selectedIssueFilter === 'All'
    ? allIssues
    : allIssues.filter((i) => i === selectedIssueFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Compare Candidates on Documented Issues
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Examine documented policy stances, roll-call voting records, and direct source citations. Truth never scores, ranks, or endorses candidates.
        </p>
      </div>

      {/* Candidate Selectors Header Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Race & Candidates:
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Showing verified candidates with documented public records
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate A Selector & Profile Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Candidate A
              </label>
              <select
                value={candidateAId}
                onChange={(e) => setCandidateAId(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                {CANDIDATES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.party}) — {c.officeSought}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{candidateA.district}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {candidateA.party}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {candidateA.bioSummary}
              </p>
              <a
                href={candidateA.campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-medium pt-1"
              >
                <span>Campaign Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Candidate B Selector & Profile Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Candidate B
              </label>
              <select
                value={candidateBId}
                onChange={(e) => setCandidateBId(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                {CANDIDATES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.party}) — {c.officeSought}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{candidateB.district}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {candidateB.party}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {candidateB.bioSummary}
              </p>
              <a
                href={candidateB.campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-medium pt-1"
              >
                <span>Campaign Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Issue Filter Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">Filter Issues:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedIssueFilter('All')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedIssueFilter === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Issues ({allIssues.length})
              </button>
              {allIssues.map((issue) => (
                <button
                  key={issue}
                  type="button"
                  onClick={() => setSelectedIssueFilter(issue)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedIssueFilter === issue
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Issue Comparison Matrix */}
      <div className="space-y-6">
        {displayedIssues.map((issue) => {
          const posA = candidateA.policyPositions.find((p) => p.issue === issue);
          const posB = candidateB.policyPositions.find((p) => p.issue === issue);

          return (
            <div
              key={issue}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
            >
              <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-sm md:text-base text-slate-900">
                  {issue}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Comparative Policy Matrix
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                {/* Candidate A Stance */}
                <div className="p-6 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                        {candidateA.name}
                      </span>
                      {posA ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          {posA.verificationStatus}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          Insufficient Record
                        </span>
                      )}
                    </div>

                    {posA ? (
                      <>
                        <p className="text-xs md:text-sm font-medium text-slate-900 leading-snug">
                          {posA.positionSummary}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {posA.documentedStance}
                        </p>
                        {posA.directQuotes && posA.directQuotes.length > 0 && (
                          <blockquote className="text-xs italic text-slate-700 border-l-2 border-slate-300 pl-3 py-1 my-2">
                            "{posA.directQuotes[0]}"
                          </blockquote>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-500 italic py-4">
                        No official public record or documented position in state archives for this specific issue.
                      </p>
                    )}
                  </div>

                  {posA && (
                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <SourcePill
                        title={posA.sourceTitle}
                        url={posA.sourceUrl}
                        sourceType={posA.sourceType}
                        date={posA.lastVerifiedAt}
                      />
                    </div>
                  )}
                </div>

                {/* Candidate B Stance */}
                <div className="p-6 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                        {candidateB.name}
                      </span>
                      {posB ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          {posB.verificationStatus}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          Insufficient Record
                        </span>
                      )}
                    </div>

                    {posB ? (
                      <>
                        <p className="text-xs md:text-sm font-medium text-slate-900 leading-snug">
                          {posB.positionSummary}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {posB.documentedStance}
                        </p>
                        {posB.directQuotes && posB.directQuotes.length > 0 && (
                          <blockquote className="text-xs italic text-slate-700 border-l-2 border-slate-300 pl-3 py-1 my-2">
                            "{posB.directQuotes[0]}"
                          </blockquote>
                        )}
                      </>
                    ) : (
                      <p className="text-xs text-slate-500 italic py-4">
                        No official public record or documented position in state archives for this specific issue.
                      </p>
                    )}
                  </div>

                  {posB && (
                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <SourcePill
                        title={posB.sourceTitle}
                        url={posB.sourceUrl}
                        sourceType={posB.sourceType}
                        date={posB.lastVerifiedAt}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

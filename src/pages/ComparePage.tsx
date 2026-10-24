import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Filter,
  Users,
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          Compare Candidates on Documented Issues
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed opacity-90">
          Examine documented policy stances, roll-call voting records, and direct source citations. Truth never scores, ranks, or endorses candidates.
        </p>
      </div>

      {/* Candidate Selectors Header Panel */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-6"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Select Race & Candidates:
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Showing verified candidates with documented public records
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate A Selector & Profile Card */}
          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 font-mono">
                Candidate A
              </label>
              <select
                value={candidateAId}
                onChange={(e) => setCandidateAId(e.target.value)}
                className="w-full p-2.5 rounded-xl text-sm font-semibold border focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer text-[#FFFFEB]"
                style={{
                  background: '#1A1A1A',
                  borderColor: '#333333',
                }}
              >
                {CANDIDATES.map((c) => (
                  <option key={c.id} value={c.id} style={{ background: '#222222', color: '#FFFFEB' }}>
                    {c.name} ({c.party}) — {c.officeSought}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t space-y-2" style={{ borderColor: '#333333' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{candidateA.district}</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full border text-slate-300" style={{ background: '#2A2A2A', borderColor: '#383838' }}>
                  {candidateA.party}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed opacity-85">
                {candidateA.bioSummary}
              </p>
              <a
                href={candidateA.campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium pt-1"
              >
                <span>Campaign Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Candidate B Selector & Profile Card */}
          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{
              background: '#242424',
              borderColor: '#2F2F2F',
            }}
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 font-mono">
                Candidate B
              </label>
              <select
                value={candidateBId}
                onChange={(e) => setCandidateBId(e.target.value)}
                className="w-full p-2.5 rounded-xl text-sm font-semibold border focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer text-[#FFFFEB]"
                style={{
                  background: '#1A1A1A',
                  borderColor: '#333333',
                }}
              >
                {CANDIDATES.map((c) => (
                  <option key={c.id} value={c.id} style={{ background: '#222222', color: '#FFFFEB' }}>
                    {c.name} ({c.party}) — {c.officeSought}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t space-y-2" style={{ borderColor: '#333333' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{candidateB.district}</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full border text-slate-300" style={{ background: '#2A2A2A', borderColor: '#383838' }}>
                  {candidateB.party}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed opacity-85">
                {candidateB.bioSummary}
              </p>
              <a
                href={candidateB.campaignUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium pt-1"
              >
                <span>Campaign Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Issue Filter Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t flex-wrap gap-2 text-xs" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-slate-300 font-mono">Filter Issues:</span>
            <div className="flex flex-wrap gap-1.5">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setSelectedIssueFilter('All')}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedIssueFilter === 'All'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-[#242424] text-slate-300 hover:text-white border border-[#2F2F2F]'
                }`}
              >
                All Issues ({allIssues.length})
              </motion.button>
              {allIssues.map((issue) => (
                <motion.button
                  key={issue}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setSelectedIssueFilter(issue)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedIssueFilter === issue
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-[#242424] text-slate-300 hover:text-white border border-[#2F2F2F]'
                  }`}
                >
                  {issue}
                </motion.button>
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
            <motion.div
              key={issue}
              whileHover={{ y: -2, borderColor: '#3A3A3A' }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="rounded-3xl border overflow-hidden"
              style={{
                background: '#1E1E1E',
                borderColor: '#2A2A2A',
              }}
            >
              <div
                className="px-6 py-3.5 border-b flex items-center justify-between"
                style={{
                  background: '#242424',
                  borderColor: '#2A2A2A',
                }}
              >
                <h3 className="font-bold text-sm md:text-base text-[#FFFFEB]">
                  {issue}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Comparative Policy Matrix
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: '#2A2A2A' }}>
                {/* Candidate A Stance */}
                <div className="p-6 space-y-3 flex flex-col justify-between" style={{ borderColor: '#2A2A2A' }}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-[#FFFFEB] font-mono">
                        {candidateA.name}
                      </span>
                      {posA ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                          {posA.verificationStatus}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#242424] text-slate-500">
                          Insufficient Record
                        </span>
                      )}
                    </div>

                    {posA ? (
                      <>
                        <p className="text-xs md:text-sm font-medium text-slate-100 leading-snug">
                          {posA.positionSummary}
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed opacity-85">
                          {posA.documentedStance}
                        </p>
                        {posA.directQuotes && posA.directQuotes.length > 0 && (
                          <blockquote className="text-xs italic text-slate-300 border-l-2 border-blue-500 pl-3 py-1 my-2 bg-[#1A1A1A] rounded-r-lg">
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
                    <div className="pt-3 border-t text-xs" style={{ borderColor: '#2A2A2A' }}>
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
                <div className="p-6 space-y-3 flex flex-col justify-between" style={{ borderColor: '#2A2A2A' }}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-[#FFFFEB] font-mono">
                        {candidateB.name}
                      </span>
                      {posB ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                          {posB.verificationStatus}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#242424] text-slate-500">
                          Insufficient Record
                        </span>
                      )}
                    </div>

                    {posB ? (
                      <>
                        <p className="text-xs md:text-sm font-medium text-slate-100 leading-snug">
                          {posB.positionSummary}
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed opacity-85">
                          {posB.documentedStance}
                        </p>
                        {posB.directQuotes && posB.directQuotes.length > 0 && (
                          <blockquote className="text-xs italic text-slate-300 border-l-2 border-blue-500 pl-3 py-1 my-2 bg-[#1A1A1A] rounded-r-lg">
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
                    <div className="pt-3 border-t text-xs" style={{ borderColor: '#2A2A2A' }}>
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
            </motion.div>
          );
        })}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

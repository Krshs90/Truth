import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NonpartisanDisclaimer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs border"
        style={{
          background: '#1C1C1C',
          borderColor: '#2A2A2A',
          color: '#FFFFEB',
        }}
      >
        <span className="flex items-center gap-2 opacity-85">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-300">Nonpartisan civic research • All claims anchored in official government records</span>
        </span>
        <Link to="/sources" className="text-blue-400 hover:text-blue-300 font-medium ml-2">
          Methodology
        </Link>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-4 md:p-5 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border"
      style={{
        background: '#1C1C1C',
        borderColor: '#2A2A2A',
        color: '#FFFFEB',
      }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="p-2.5 rounded-xl shrink-0 mt-0.5 border"
          style={{
            background: 'rgba(74, 222, 128, 0.1)',
            borderColor: 'rgba(74, 222, 128, 0.25)',
            color: '#4ADE80',
          }}
        >
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-[#FFFFEB] text-sm">
            Truth Nonpartisan Evidence Standard
          </p>
          <p className="mt-1 text-slate-400 leading-relaxed text-xs">
            Truth never endorses candidates, takes partisan stances, or calculates subjective popularity scores. We link every assertion directly to original Texas legislative journals, statutory bills, and official roll-call records so you can inspect the evidence directly.
          </p>
        </div>
      </div>
      <Link
        to="/sources"
        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[#FFFFEB] font-medium transition-colors text-xs border cursor-pointer"
        style={{
          background: '#2A2A2A',
          borderColor: '#383838',
        }}
      >
        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
        <span>View Standards</span>
      </Link>
    </div>
  );
};

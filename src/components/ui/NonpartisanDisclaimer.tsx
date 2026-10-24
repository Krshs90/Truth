import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NonpartisanDisclaimer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center justify-between px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          <span>Nonpartisan civic intelligence • All claims linked to primary records</span>
        </span>
        <Link to="/sources" className="text-blue-700 hover:underline font-medium">
          Methodology
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 text-blue-800 rounded-md shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Truth Nonpartisan Evidence Standard
          </p>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Truth never endorses candidates, takes partisan stances, or calculates subjective popularity scores. We link every assertion directly to original legislative journals, statutory bills, and official roll-call records so you can verify the facts for yourself.
          </p>
        </div>
      </div>
      <Link
        to="/sources"
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 hover:bg-slate-100 font-medium transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        <span>View Standards</span>
      </Link>
    </div>
  );
};

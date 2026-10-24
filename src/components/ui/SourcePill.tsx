import React from 'react';
import { ExternalLink, ShieldCheck, BookOpen, Scale, FileText } from 'lucide-react';
import { SourceType } from '../../types';

interface SourcePillProps {
  title: string;
  url: string;
  publisher?: string;
  sourceType?: SourceType;
  date?: string;
  isPrimary?: boolean;
}

export const SourcePill: React.FC<SourcePillProps> = ({
  title,
  url,
  publisher,
  sourceType,
  date,
  isPrimary = true,
}) => {
  const getIcon = () => {
    switch (sourceType) {
      case 'primary_legislation':
        return BookOpen;
      case 'roll_call_vote':
        return Scale;
      case 'government':
      case 'official_record':
        return ShieldCheck;
      default:
        return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors group"
      title={`Open official source: ${title} (${url})`}
    >
      <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-700 transition-colors" />
      <span className="font-medium truncate max-w-[220px]">{title}</span>
      {publisher && (
        <span className="text-slate-500 hidden sm:inline">• {publisher}</span>
      )}
      {date && (
        <span className="text-slate-400 text-[11px] hidden md:inline">({date})</span>
      )}
      {isPrimary && (
        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono font-semibold">
          PRIMARY
        </span>
      )}
      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-700" />
    </a>
  );
};

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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border transition-colors group cursor-pointer"
      style={{
        background: '#222222',
        borderColor: '#31312F',
        color: '#FFFFEB',
      }}
      title={`Open official source: ${title} (${url})`}
    >
      <Icon className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors shrink-0" />
      <span className="font-medium truncate max-w-[220px] text-slate-200">{title}</span>
      {publisher && (
        <span className="text-slate-400 hidden sm:inline">• {publisher}</span>
      )}
      {date && (
        <span className="text-slate-500 text-[10px] hidden md:inline">({date})</span>
      )}
      {isPrimary && (
        <span className="text-[9px] bg-blue-950/60 text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-full font-mono font-semibold">
          PRIMARY
        </span>
      )}
      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white shrink-0" />
    </a>
  );
};

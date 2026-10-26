import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

export interface ChatSourceItem {
  title: string;
  url: string;
  domain: string;
  publisher?: string;
  date?: string;
}

interface FormattedChatMessageProps {
  content: string;
  sources?: ChatSourceItem[];
}

function renderInline(text: string): React.ReactNode[] {
  const tokenRegex = /(\*\*.*?\*\*|__.*?__|`.*?`|\[.*?\]\(https?:\/\/.*?\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-[#FFFFEB]">
          {renderInline(inner)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1 py-0.5 rounded bg-[#252524] border border-[#353534] text-amber-300 font-mono text-[11px]"
        >
          {inner}
        </code>
      );
    }

    const linkMatch = part.match(/^\[(.*?)\]\((https?:\/\/.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 underline font-medium inline-flex items-center gap-0.5"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink className="w-2.5 h-2.5 inline" />
        </a>
      );
    }

    const cleanText = part.replace(/\*\*/g, '').replace(/\*/g, '');
    return <span key={index}>{cleanText}</span>;
  });
}

export const FormattedChatMessage: React.FC<FormattedChatMessageProps> = ({ content, sources = [] }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      elements.push(<div key={`spacer-${i}`} className="h-2" />);
      continue;
    }

    if (trimmed.startsWith('#')) {
      const levelMatch = trimmed.match(/^(#+)\s*(.*)$/);
      if (levelMatch) {
        const headingText = levelMatch[2].replace(/\*\*/g, '');
        elements.push(
          <div key={`h-${i}`} className="text-xs font-bold text-amber-300 mt-2 mb-1 font-serif tracking-wide">
            {headingText}
          </div>
        );
        continue;
      }
    }

    if (trimmed.startsWith('**') && (trimmed.endsWith(':**') || trimmed.endsWith('**') || trimmed.endsWith(':'))) {
      const headerText = trimmed.replace(/\*\*/g, '').replace(/__/, '');
      elements.push(
        <div key={`bold-header-${i}`} className="text-xs font-bold text-[#FFFFEB] mt-2 mb-0.5 font-sans">
          {headerText}
        </div>
      );
      continue;
    }

    if (/^[\*\-]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[\*\-]\s+/, '');
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2 my-1 pl-1 text-stone-200">
          <span className="text-amber-400 font-bold text-xs leading-none mt-1 select-none">•</span>
          <div className="flex-1 leading-relaxed">{renderInline(itemText)}</div>
        </div>
      );
      continue;
    }

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={`num-${i}`} className="flex items-start gap-2 my-1 pl-1 text-stone-200">
          <span className="text-amber-400 font-mono text-[10px] font-semibold mt-0.5 select-none shrink-0">
            {numMatch[1]}.
          </span>
          <div className="flex-1 leading-relaxed">{renderInline(numMatch[2])}</div>
        </div>
      );
      continue;
    }

    elements.push(
      <p key={`p-${i}`} className="text-stone-200 leading-relaxed my-0.5">
        {renderInline(trimmed)}
      </p>
    );
  }

  return (
    <div className="space-y-1 font-sans text-xs">
      <div className="text-stone-200">{elements}</div>

      {sources && sources.length > 0 && (
        <div className="pt-2.5 mt-2.5 border-t border-[#282827] space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
            <Globe className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Verified Sources ({sources.length})</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-0.5">
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${src.title} — ${src.publisher || src.domain}`}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#2d2d2c] bg-[#1d1d1c] hover:bg-[#252524] hover:border-amber-400/50 transition-all shrink-0 max-w-[210px] group shadow-xs cursor-pointer"
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${src.domain}&sz=32`}
                  alt={src.domain}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.3';
                  }}
                  className="w-3.5 h-3.5 rounded-xs shrink-0 object-contain bg-white/10 p-0.5"
                />

                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-stone-200 group-hover:text-amber-300 truncate">
                    {src.publisher || src.domain}
                  </div>
                  <div className="text-[9px] text-stone-500 font-mono truncate">
                    {src.domain}
                  </div>
                </div>

                <ExternalLink className="w-2.5 h-2.5 text-stone-500 group-hover:text-amber-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormattedChatMessage;

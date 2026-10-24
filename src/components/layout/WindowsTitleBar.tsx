import React from 'react';
import { Minus, Square, X, Scale } from 'lucide-react';
import { OrbIndicator } from '../common/OrbIndicator';
import { useCivic } from '../../context/CivicContext';

interface WindowsTitleBarProps {
  title?: string;
  onOpenDistrictModal?: () => void;
}

export const WindowsTitleBar: React.FC<WindowsTitleBarProps> = ({ title = 'Overview' }) => {
  const isElectron = Boolean(window.electronAPI?.isElectron);
  const { ollamaStatus, selectedCongressional } = useCivic();

  const handleMinimize = () => {
    window.electronAPI?.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electronAPI?.maximizeWindow();
  };

  const handleClose = () => {
    window.electronAPI?.closeWindow();
  };

  return (
    <div
      className="w-full h-10 select-none flex items-center justify-between px-3 shrink-0 drag-region z-50 text-xs border-b"
      style={{
        background: '#141414',
        borderColor: '#2A2A2A',
        color: '#FFFFEB',
      }}
    >
      {/* Left: App Title and Live Indicator */}
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-600 text-white shrink-0">
          <Scale className="w-3 h-3" />
        </div>
        <span className="font-bold tracking-wider text-[11px] text-[#FFFFEB]">TRUTH</span>
        <span className="text-slate-500">•</span>
        <div className="flex items-center gap-1.5 opacity-80">
          <OrbIndicator status={ollamaStatus?.available ? 'verified' : 'ready'} size={8} />
          <span className="text-[11px] text-slate-400 font-medium">{title}</span>
        </div>
      </div>

      {/* Center: Active District Badge */}
      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
        <span className="px-2 py-0.5 rounded-full bg-[#1F1F1F] border border-[#2E2E2E] text-slate-300">
          TX-{selectedCongressional.districtNumber === '0' || !selectedCongressional.districtNumber ? 'STATE' : selectedCongressional.districtNumber}
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Primary Sources Verified
        </span>
      </div>

      {/* Right: Window Controls for Electron or subtle desktop indicator */}
      <div className="flex items-center gap-1 no-drag">
        {isElectron ? (
          <div className="flex items-center">
            <button
              onClick={handleMinimize}
              className="w-10 h-7 flex items-center justify-center text-slate-300 hover:bg-[#31312F] hover:text-[#FFFFEB] transition-colors rounded-sm cursor-pointer"
              title="Minimize"
              aria-label="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-10 h-7 flex items-center justify-center text-slate-300 hover:bg-[#31312F] hover:text-[#FFFFEB] transition-colors rounded-sm cursor-pointer"
              title="Maximize / Restore"
              aria-label="Maximize"
            >
              <Square className="w-3 h-3" />
            </button>
            <button
              onClick={handleClose}
              className="w-10 h-7 flex items-center justify-center text-slate-300 hover:bg-[#FF3B30] hover:text-white transition-colors rounded-sm cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-[#222] border border-[#333] text-slate-400 font-mono text-[10px]">
              WINDOWS DESKTOP APP READY
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Minus, Square, X } from 'lucide-react';

export const WindowsTitleBar: React.FC = () => {
  const isElectron = Boolean(window.electronAPI?.isElectron);

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
      className="w-full h-8 select-none flex items-center justify-between px-3 shrink-0 drag-region z-50 text-xs border-b"
      style={{
        background: '#121211',
        borderColor: '#222221',
        color: '#FFFFEB',
      }}
    >
      <div className="flex items-center gap-2 h-full drag-region">
        <img src="/logo.png" alt="Truth logo" className="w-4 h-4 object-contain pointer-events-none" />
        <span className="text-[11px] font-semibold tracking-wider text-[#FFFFEB]/90">Truth</span>
      </div>
      <div className="flex-1 h-full drag-region" />

      <div className="flex items-center gap-1 no-drag">
        {isElectron && (
          <div className="flex items-center">
            <button
              onClick={handleMinimize}
              className="w-10 h-6 flex items-center justify-center text-slate-400 hover:bg-[#2A2A28] hover:text-[#FFFFEB] transition-colors rounded-sm cursor-pointer"
              title="Minimize"
              aria-label="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-10 h-6 flex items-center justify-center text-slate-400 hover:bg-[#2A2A28] hover:text-[#FFFFEB] transition-colors rounded-sm cursor-pointer"
              title="Maximize / Restore"
              aria-label="Maximize"
            >
              <Square className="w-3 h-3" />
            </button>
            <button
              onClick={handleClose}
              className="w-10 h-6 flex items-center justify-center text-slate-400 hover:bg-[#FF3B30] hover:text-white transition-colors rounded-sm cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

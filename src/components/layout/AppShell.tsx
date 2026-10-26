import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, RotateCw } from 'lucide-react';
import { OnboardingModal } from '../onboarding/OnboardingModal';
import { WindowsTitleBar } from './WindowsTitleBar';
import { BottomPillNav } from './BottomPillNav';
import { SiriOllamaBar } from '../ai/SiriOllamaBar';
import { useCivic } from '../../context/CivicContext';

export const AppShell: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCongressional, syncStats, isSyncingFeeds, triggerLiveSync } = useCivic();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('truth_onboarded_v1');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }

    const handleOpenOnboarding = () => {
      setShowOnboarding(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('truth:open-onboarding', handleOpenOnboarding);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('truth:open-onboarding', handleOpenOnboarding);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/investigate?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans select-none overflow-hidden"
      style={{ background: '#121211', color: '#FFFFEB' }}
    >
      <WindowsTitleBar />

      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-32px)] overflow-hidden relative">
        <header
          className="px-5 py-2.5 sticky top-0 z-30 flex items-center justify-between gap-4 border-b shrink-0 backdrop-blur-md"
          style={{
            background: 'rgba(18, 18, 17, 0.88)',
            borderColor: '#222221',
          }}
        >
          <div className="flex items-center gap-2.5 shrink-0 z-20">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 pr-1.5 cursor-pointer group"
              title="Truth Home"
            >
              <img
                src="/logo.png"
                alt="Truth"
                className="w-6 h-6 object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-sm font-bold tracking-tight text-[#FFFFEB] hidden sm:inline">
                Truth
              </span>
            </button>
            <div
              className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full border shadow-xs"
              style={{ background: '#161615', borderColor: '#2A2A28', color: '#FFFFEB' }}
            >
              <span className="text-stone-400 font-sans">Texas</span>
              <span className="text-stone-600">•</span>
              <span className="text-amber-300 font-semibold font-mono">
                TX-{selectedCongressional.districtNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={() => triggerLiveSync()}
              disabled={isSyncingFeeds}
              title={`Autonomous Live Sync Active: Ingesting Texas Legislature & Campaign Wires (Last synced: ${syncStats.lastSyncedAgo}). Click to force update.`}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all cursor-pointer bg-[#161615] hover:bg-[#20201f] border-[#2A2A28] text-stone-300 hover:text-white"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSyncingFeeds ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>Live Sync: {isSyncingFeeds ? 'Updating...' : syncStats.lastSyncedAgo}</span>
              <RotateCw className={`w-2.5 h-2.5 text-stone-400 ${isSyncingFeeds ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            <SiriOllamaBar />
          </div>

          <div className="flex items-center shrink-0 z-20">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center group">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none group-focus-within:text-amber-400 transition-colors" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search claims & bills..."
                className="w-44 sm:w-52 md:w-60 focus:w-72 md:focus:w-80 pl-8 pr-11 py-1.5 rounded-full text-xs border focus:outline-hidden focus:border-amber-400/80 transition-all duration-300 placeholder:text-stone-500 font-sans"
                style={{
                  background: '#181817',
                  borderColor: '#2A2A28',
                  color: '#FFFFEB',
                }}
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#242423] text-stone-400 border border-[#333] leading-none flex items-center justify-center">
                  ⌘K
                </kbd>
              </div>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto pb-28 no-scrollbar">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>

        {!showOnboarding && <BottomPillNav />}
      </div>
    </div>
  );
};

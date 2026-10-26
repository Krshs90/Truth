import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, MapPin, X, ArrowUpRight, Cpu } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { OrbIndicator } from '../common/OrbIndicator';

export const DynamicCivicIsland: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickClaim, setQuickClaim] = useState('');
  const { selectedCongressional, selectedStateSenate, ollamaStatus } = useCivic();
  const navigate = useNavigate();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickClaim.trim()) {
      navigate(`/investigate?q=${encodeURIComponent(quickClaim.trim())}`);
      setQuickClaim('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="island-collapsed"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="flex items-center gap-3 px-3.5 py-2 rounded-full border shadow-2xl backdrop-blur-md"
            style={{
              background: 'rgba(26, 26, 26, 0.88)',
              borderColor: '#31312F',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.65)',
            }}
          >
            <div className="flex items-center gap-2 pl-1 cursor-pointer" onClick={() => setIsExpanded(true)}>
              <OrbIndicator status={ollamaStatus?.available ? 'verified' : 'ready'} size={12} />
              <span className="text-[11px] font-mono font-medium text-[#FFFFEB] tracking-wider uppercase opacity-90">
                Truth
              </span>
            </div>

            <div className="h-3 w-px bg-[#31312F]" />

            <button
              onClick={() => navigate('/district')}
              className="flex items-center gap-1.5 text-xs text-[#FFFFEB] opacity-80 hover:opacity-100 transition-opacity cursor-pointer px-1"
              title="View my district details"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium text-[12px]">
                {selectedCongressional.districtNumber === '0' || !selectedCongressional.districtNumber ? 'Texas (Statewide)' : `TX-${selectedCongressional.districtNumber}`}
              </span>
              <span className="text-[10px] text-slate-400">
                • SD-{selectedStateSenate.districtNumber}
              </span>
            </button>

            <div className="h-3 w-px bg-[#31312F]" />

            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors"
              style={{
                background: '#31312F',
                color: '#FFFFEB',
              }}
            >
              <Search className="w-3 h-3 text-amber-400" />
              <span>Verify Claim</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="island-expanded"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26, mass: 0.8 }}
            className="w-[92vw] max-w-xl rounded-2xl p-4 border shadow-2xl backdrop-blur-xl"
            style={{
              background: '#1A1A1A',
              borderColor: '#31312F',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.75)',
            }}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <OrbIndicator status="processing" size={12} />
                <span className="text-xs font-semibold text-[#FFFFEB] tracking-wide">
                  Instant Civic Investigation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#262626] text-emerald-400 border border-[#31312F] flex items-center gap-1 font-mono">
                  <Cpu className="w-2.5 h-2.5" />
                  {ollamaStatus?.available ? 'Ollama Local' : 'Deterministic Rule Engine'}
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#FFFFEB] opacity-60 hover:opacity-100 hover:bg-[#31312F] transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all"
                style={{
                  background: '#222222',
                  borderColor: '#2A2A2A',
                }}
              >
                <Search className="w-4 h-4 text-amber-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={quickClaim}
                  onChange={(e) => setQuickClaim(e.target.value)}
                  placeholder="Paste a political statement, advertisement claim, or bill (e.g. SB 2)..."
                  className="w-full bg-transparent border-none outline-hidden text-sm text-[#FFFFEB] placeholder:text-slate-500 font-sans"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!quickClaim.trim()}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#141414] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shrink-0"
                >
                  <span>Evaluate</span>
                  <ArrowUpRight className="w-3 h-3" />
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500">Quick tests:</span>
                {[
                  'Candidate voted to raise taxes',
                  'SB 2 school choice vouchers',
                  'Prop 1 water fund investment',
                ].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setQuickClaim(sample);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#262626] hover:bg-[#31312F] text-[#FFFFEB] opacity-80 hover:opacity-100 border border-[#2A2A2A] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    <span>{sample}</span>
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

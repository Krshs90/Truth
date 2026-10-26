import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface DistrictOption {
  id: string;
  districtNumber: string;
  name: string;
  region?: string;
}

interface CustomDistrictDropdownProps {
  label: string;
  badgePrefix: 'TX-' | 'SD-' | 'HD-';
  selectedId: string;
  options: DistrictOption[];
  onSelect: (id: string) => void;
  placeholder?: string;
}

export const CustomDistrictDropdown: React.FC<CustomDistrictDropdownProps> = ({
  label,
  badgePrefix,
  selectedId,
  options,
  onSelect,
  placeholder = 'Select district...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.id === selectedId);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      opt.districtNumber.toLowerCase().includes(q) ||
      opt.name.toLowerCase().includes(q) ||
      (opt.region && opt.region.toLowerCase().includes(q))
    );
  });

  return (
    <div ref={containerRef} className="w-full text-left font-sans select-none space-y-1.5">
      <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block font-medium">
        {label}
      </label>

      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setFilterQuery('');
        }}
        className={`w-full px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
          isOpen
            ? 'border-amber-400 bg-[#22221E] shadow-sm ring-1 ring-amber-400/30'
            : 'border-[#2D2D2D] bg-[#181818] hover:border-[#404040] hover:bg-[#1E1E1E]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-semibold shrink-0">
            {badgePrefix}
            {selectedOption?.districtNumber || '?'}
          </span>
          <span className="text-xs text-[#FFFFEB] font-medium truncate">
            {selectedOption?.name.replace(/Texas (Congressional|State Senate|State House) District /, '') || placeholder}
            {selectedOption?.region ? ` • ${selectedOption.region}` : ''}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="text-[#888888] shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
            className="rounded-xl border border-[#333333] bg-[#161616] overflow-hidden shadow-lg mt-1.5"
          >
            <div className="p-2 border-b border-[#262626] bg-[#121212]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#666666] pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()} or city...`}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border text-[#FFFFEB] placeholder:text-[#666666] bg-[#1C1C1C] border-[#2C2C2C] focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto p-1.5 space-y-1 overscroll-contain">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#777777] font-mono">
                  No matching {label.toLowerCase()} found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.id === selectedId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onSelect(opt.id);
                        setIsOpen(false);
                      }}
                      className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between gap-2 transition-colors cursor-pointer text-xs ${
                        isSelected
                          ? 'bg-amber-400/20 text-[#FFFFEB] font-semibold border border-amber-400/40'
                          : 'text-[#AAAAAA] hover:text-[#FFFFEB] hover:bg-[#222222]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-[#141414] font-bold'
                              : 'bg-[#262626] text-[#999999]'
                          }`}
                        >
                          {badgePrefix}
                          {opt.districtNumber}
                        </span>
                        <div className="truncate">
                          <span className="block truncate text-xs text-[#FFFFEB]">
                            {opt.name.replace(/Texas (Congressional|State Senate|State House) District /, '')}
                          </span>
                          {opt.region && (
                            <span className="block truncate text-[10px] text-[#777777] font-normal">
                              {opt.region}
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[] | string[];
  placeholder?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'minimal' | 'solid' | 'bordered';
  searchable?: boolean;
  className?: string;
  menuClassName?: string;
  disabled?: boolean;
  align?: 'left' | 'right';
  'aria-label'?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options: rawOptions,
  placeholder = 'Select an option...',
  label,
  size = 'md',
  variant = 'solid',
  searchable,
  className = '',
  menuClassName = '',
  disabled = false,
  align = 'left',
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectId = useId();

  const normalizedOptions: CustomSelectOption[] = rawOptions.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  const shouldSearch = searchable ?? (normalizedOptions.length > 7);

  const filteredOptions = normalizedOptions.filter((opt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      opt.label.toLowerCase().includes(q) ||
      (opt.badge && opt.badge.toLowerCase().includes(q)) ||
      (opt.description && opt.description.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      if (shouldSearch) {
        setTimeout(() => searchInputRef.current?.focus(), 60);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, shouldSearch]);

  const sizeClasses = {
    sm: 'text-xs py-1 px-2.5 min-h-[30px] rounded-lg gap-1.5',
    md: 'text-xs sm:text-sm py-2 px-3.5 min-h-[40px] rounded-xl gap-2',
    lg: 'text-sm py-2.5 px-4 min-h-[46px] rounded-2xl gap-2.5',
  }[size];

  const variantClasses = {
    minimal: isOpen
      ? 'bg-[#222221] border-[#383837] text-[#FFFFEB] shadow-xs'
      : 'bg-transparent hover:bg-[#20201f] border-transparent hover:border-[#2a2a28] text-stone-300 hover:text-[#FFFFEB]',
    solid: isOpen
      ? 'bg-[#222220] border-amber-400/80 ring-1 ring-amber-400/30 text-[#FFFFEB] shadow-md'
      : 'bg-[#181817] hover:bg-[#1f1f1e] border-[#2A2A28] hover:border-[#383836] text-[#FFFFEB]',
    bordered: isOpen
      ? 'bg-[#1b1b1a] border-amber-400 text-[#FFFFEB] ring-1 ring-amber-400/30'
      : 'bg-[#141413] hover:bg-[#1a1a19] border-[#30302e] hover:border-[#424240] text-[#FFFFEB]',
  }[variant];

  return (
    <div
      ref={containerRef}
      className={`relative select-none text-left font-sans ${className}`}
    >
      {label && (
        <label
          htmlFor={selectId}
          className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1 font-semibold"
        >
          {label}
        </label>
      )}

      <motion.button
        id={selectId}
        type="button"
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.985 }}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            setSearchQuery('');
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        className={`w-full border flex items-center justify-between transition-all duration-150 cursor-pointer ${sizeClasses} ${variantClasses} ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectedOption?.icon && (
            <span className="shrink-0 text-amber-400">{selectedOption.icon}</span>
          )}

          {selectedOption?.badge && (
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shrink-0 border ${
                selectedOption.badgeColor || 'bg-amber-400/10 border-amber-400/30 text-amber-300'
              }`}
            >
              {selectedOption.badge}
            </span>
          )}

          <span className="truncate font-medium">
            {selectedOption ? (
              selectedOption.badge && selectedOption.label.endsWith(':' + selectedOption.badge)
                ? selectedOption.label.replace(':' + selectedOption.badge, '')
                : selectedOption.label
            ) : (
              <span className="text-stone-500">{placeholder}</span>
            )}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="shrink-0 text-stone-400 ml-1.5"
        >
          <ChevronDown className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className={`absolute top-full mt-1.5 z-50 min-w-full rounded-xl border border-[#2e2e2d] bg-[#161615]/98 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col ${
              align === 'right' ? 'right-0' : 'left-0'
            } ${menuClassName}`}
            style={{
              maxHeight: '340px',
              minWidth: size === 'sm' ? '180px' : '220px',
            }}
          >
            {shouldSearch && (
              <div className="p-2 border-b border-[#242423] shrink-0 bg-[#141413]">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 text-stone-500 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-lg text-xs bg-[#1f1f1e] border border-[#2d2d2c] text-[#FFFFEB] placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400/80 font-sans"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-stone-500 hover:text-stone-300 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="overflow-y-auto p-1.5 space-y-0.5 overscroll-contain no-scrollbar max-h-[280px]">
              {filteredOptions.length === 0 ? (
                <div className="py-4 px-3 text-center text-xs text-stone-500 font-sans">
                  No matches found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <motion.button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.1 }}
                      onClick={() => {
                        onChange(opt.value);
                        setIsOpen(false);
                      }}
                      className={`w-full px-2.5 py-2 rounded-lg text-left text-xs transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/15 border border-amber-400/30 text-amber-200 font-semibold'
                          : 'text-stone-300 hover:text-[#FFFFEB] hover:bg-[#20201f] border border-transparent'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {opt.icon && (
                            <span className="shrink-0 text-amber-400">{opt.icon}</span>
                          )}

                          {opt.badge && (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-medium shrink-0 border ${
                                opt.badgeColor || (isSelected ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-[#222221] text-stone-400 border-[#2f2f2e]')
                              }`}
                            >
                              {opt.badge}
                            </span>
                          )}

                          <span className="truncate">{opt.label}</span>
                        </div>

                        {opt.description && (
                          <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1 font-sans">
                            {opt.description}
                          </p>
                        )}
                      </div>

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
                      )}
                    </motion.button>
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

export default CustomSelect;

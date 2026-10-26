import React from 'react';
import { ClaimVerdict } from '../../types';
import { CheckCircle2, AlertTriangle, XCircle, Info, Clock } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: ClaimVerdict;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({
  verdict,
  size = 'md',
  showIcon = true,
}) => {
  const getStyle = () => {
    switch (verdict) {
      case 'Supported by evidence':
        return {
          bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-xs',
          dot: 'bg-emerald-400',
          icon: CheckCircle2,
        };
      case 'Mostly supported':
        return {
          bg: 'bg-teal-950/40 border-teal-500/40 text-teal-300 shadow-xs',
          dot: 'bg-teal-400',
          icon: CheckCircle2,
        };
      case 'Misleading or missing important context':
        return {
          bg: 'bg-amber-950/40 border-amber-500/40 text-amber-300 shadow-xs',
          dot: 'bg-amber-400',
          icon: AlertTriangle,
        };
      case 'Mostly unsupported':
        return {
          bg: 'bg-orange-950/40 border-orange-500/40 text-orange-300 shadow-xs',
          dot: 'bg-orange-400',
          icon: AlertTriangle,
        };
      case 'Contradicted by available evidence':
        return {
          bg: 'bg-rose-950/40 border-rose-500/40 text-rose-300 shadow-xs',
          dot: 'bg-rose-400',
          icon: XCircle,
        };
      case 'Opinion or prediction, not directly fact-checkable':
        return {
          bg: 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300 shadow-xs',
          dot: 'bg-indigo-400',
          icon: Info,
        };
      case 'Unchecked':
        return {
          bg: 'bg-[#222221] border-[#383836] text-stone-300 shadow-xs',
          dot: 'bg-stone-400',
          icon: Clock,
          label: 'Unchecked',
        };
      case 'Unverified':
        return {
          bg: 'bg-[#222221] border-[#383836] text-stone-300 shadow-xs',
          dot: 'bg-stone-400',
          icon: Clock,
          label: 'Unverified',
        };
    }
  };

  const style = getStyle();
  const IconComponent = style.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-1 gap-1.5 font-medium',
    md: 'text-xs md:text-sm px-3 py-1.5 gap-2 font-medium',
    lg: 'text-sm md:text-base px-4 py-2 gap-2.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${style.bg} ${sizeClasses[size]} transition-all`}
      title={`Analytical Verdict: ${style.label || verdict}`}
    >
      {showIcon && (
        <IconComponent
          className={`shrink-0 ${
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
          }`}
        />
      )}
      <span>{style.label || verdict}</span>
    </span>
  );
};

import React from 'react';
import { ClaimVerdict } from '../../types';
import { CheckCircle2, AlertTriangle, XCircle, Info, FileQuestion } from 'lucide-react';

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
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          dot: 'bg-emerald-600',
          icon: CheckCircle2,
        };
      case 'Mostly supported':
        return {
          bg: 'bg-teal-50 border-teal-200 text-teal-800',
          dot: 'bg-teal-600',
          icon: CheckCircle2,
        };
      case 'Misleading or missing important context':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          dot: 'bg-amber-600',
          icon: AlertTriangle,
        };
      case 'Mostly unsupported':
        return {
          bg: 'bg-orange-50 border-orange-200 text-orange-900',
          dot: 'bg-orange-600',
          icon: AlertTriangle,
        };
      case 'Contradicted by available evidence':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          dot: 'bg-rose-600',
          icon: XCircle,
        };
      case 'Opinion or prediction, not directly fact-checkable':
        return {
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
          dot: 'bg-indigo-600',
          icon: Info,
        };
      case 'Unverified':
      default:
        return {
          bg: 'bg-slate-100 border-slate-300 text-slate-800',
          dot: 'bg-slate-500',
          icon: FileQuestion,
        };
    }
  };

  const style = getStyle();
  const IconComponent = style.icon;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs md:text-sm px-3 py-1.5 gap-2 font-medium',
    lg: 'text-sm md:text-base px-4 py-2 gap-2.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${style.bg} ${sizeClasses[size]} transition-colors`}
      title={`Analytical Verdict: ${verdict}`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{verdict}</span>
    </span>
  );
};

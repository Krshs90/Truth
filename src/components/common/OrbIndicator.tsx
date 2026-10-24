import React from 'react';
import { motion } from 'framer-motion';

interface OrbIndicatorProps {
  status?: 'ready' | 'processing' | 'verified' | 'offline';
  size?: number;
}

export const OrbIndicator: React.FC<OrbIndicatorProps> = ({ status = 'verified', size = 14 }) => {
  const getOrbColor = () => {
    switch (status) {
      case 'processing':
        return {
          bg: '#3B82F6',
          shadow: '0 0 16px 4px rgba(59, 130, 246, 0.7)',
        };
      case 'verified':
        return {
          bg: '#4ADE80',
          shadow: '0 0 16px 4px rgba(74, 222, 128, 0.65)',
        };
      case 'offline':
        return {
          bg: '#94A3B8',
          shadow: '0 0 12px 2px rgba(148, 163, 184, 0.4)',
        };
      case 'ready':
      default:
        return {
          bg: '#FFFFEB',
          shadow: '0 0 18px 5px rgba(255, 255, 235, 0.6)',
        };
    }
  };

  const { bg, shadow } = getOrbColor();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className="inline-flex items-center justify-center relative shrink-0"
      style={{ width: size + 8, height: size + 8 }}
    >
      <div
        className={status === 'processing' ? 'animate-whispr-pulse' : ''}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: bg,
          boxShadow: shadow,
          transition: 'all 0.3s ease',
        }}
      />
    </motion.div>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scale, Search, Users, Building2, Map, Settings } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Overview', icon: Scale },
  { to: '/investigate', label: 'Investigate', icon: Search },
  { to: '/compare', label: 'Compare', icon: Users },
  { to: '/government', label: 'Government', icon: Building2 },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const BottomPillNav: React.FC = () => {
  return (
    <nav
      aria-label="Primary Navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none"
    >
      <div
        className="flex items-center gap-1 p-1.5 rounded-full border shadow-2xl backdrop-blur-xl"
        style={{
          background: 'rgba(20, 20, 19, 0.94)',
          borderColor: '#2A2A28',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 235, 0.04)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-[#121212] font-bold shadow-sm'
                    : 'text-[#888888] hover:text-[#FFFFEB] hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#121212]' : 'text-[#888888]'}`} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

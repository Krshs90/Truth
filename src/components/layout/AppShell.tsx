import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  MapPin,
  Search,
  Users,
  Building2,
  BookOpen,
  Settings,
  Menu,
  X,
  ShieldCheck,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { OnboardingModal } from '../onboarding/OnboardingModal';
import { WindowsTitleBar } from './WindowsTitleBar';
import { DynamicCivicIsland } from '../island/DynamicCivicIsland';
import { OrbIndicator } from '../common/OrbIndicator';

export const AppShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { selectedCongressional, selectedStateSenate, selectedStateHouse, ollamaStatus } = useCivic();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('truth_onboarded_v1');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const navItems = [
    { to: '/', label: 'Overview', icon: Scale },
    { to: '/district', label: 'My District', icon: MapPin },
    { to: '/investigate', label: 'Investigate', icon: Search },
    { to: '/compare', label: 'Compare Candidates', icon: Users },
    { to: '/government', label: 'Government Tracker', icon: Building2 },
    { to: '/sources', label: 'Sources & Methodology', icon: BookOpen },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const currentNav = navItems.find((item) =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/investigate?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans select-none overflow-hidden" style={{ background: '#141414', color: '#FFFFEB' }}>
      {/* Frameless Windows Desktop Titlebar */}
      <WindowsTitleBar
        title={currentNav?.label || 'Civic Research'}
        onOpenDistrictModal={() => setShowOnboarding(true)}
      />

      {/* Onboarding Dialog for First-Time Users or Replay */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* Main Body Shell (Sidebar + Content View) */}
      <div className="flex-1 flex flex-col md:flex-row min-w-0 h-[calc(100vh-40px)] overflow-hidden relative">
        {/* Mobile Top Header */}
        <header
          className="md:hidden border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40 shrink-0"
          style={{ background: '#141414', borderColor: '#2A2A2A' }}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold tracking-tight text-base leading-none text-[#FFFFEB]">TRUTH</div>
              <div className="text-[10px] text-slate-400 font-medium">See beyond the spin.</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOnboarding(true)}
              className="p-1.5 text-blue-400 rounded-lg text-xs font-semibold flex items-center gap-1 border border-[#31312F] bg-[#222]"
              title="Configure district"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[11px]">District</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#2A2A2A] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </header>

        {/* Desktop Persistent Whispr-Style Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col border-r transition-transform duration-200 ease-out md:translate-x-0 md:static md:h-full shrink-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            background: '#141414',
            borderColor: '#2A2A2A',
          }}
        >
          {/* Brand Header */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#2A2A2A' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-500 transition-colors">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-base tracking-wider text-[#FFFFEB] block leading-tight">
                  TRUTH
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  Texas Civic Intelligence
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Global Navigation Items with Framer-Motion Hover Lifts */}
          <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-300 hover:text-[#FFFFEB] hover:bg-[#222222]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Selected District Summary Card */}
          <div
            className="p-3 mx-3 mb-3 rounded-xl border text-xs"
            style={{
              background: '#1C1C1C',
              borderColor: '#2A2A2A',
              color: '#FFFFEB',
            }}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1 font-medium text-[11px]">
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>MY TEXAS DISTRICT</span>
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowOnboarding(true);
                }}
                className="text-blue-400 hover:underline hover:text-blue-300 text-[11px] cursor-pointer"
              >
                Change
              </button>
            </div>
            <div className="font-semibold text-slate-200 truncate text-xs">
              {selectedCongressional.name.replace('Texas Congressional District', 'US CD-')}
            </div>
            <div className="text-slate-400 text-[10px] truncate mt-0.5">
              TX Senate {selectedStateSenate.districtNumber} • TX House {selectedStateHouse.districtNumber}
            </div>
          </div>

          {/* Sidebar System Status & Integrity Info */}
          <div
            className="p-3 border-t text-[11px] space-y-1.5"
            style={{
              background: '#111111',
              borderColor: '#2A2A2A',
              color: 'rgba(255, 255, 235, 0.6)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nonpartisan</span>
              </span>
              <span className="text-slate-500 font-mono text-[10px]">Primary Records</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Cpu className="w-3 h-3" />
                <span>Inference</span>
              </span>
              <div className="flex items-center gap-1.5">
                <OrbIndicator status={ollamaStatus?.available ? 'verified' : 'ready'} size={6} />
                <span className="font-mono text-[10px] text-slate-300">
                  {ollamaStatus?.available ? 'Ollama' : 'Deterministic'}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto relative"
          style={{ background: '#1A1A1A' }}
        >
          {/* Top Search Bar */}
          <header
            className="px-6 py-3 sticky top-0 z-30 shadow-xs flex items-center justify-between gap-4 border-b shrink-0 backdrop-blur-md"
            style={{
              background: 'rgba(26, 26, 26, 0.92)',
              borderColor: '#2A2A2A',
            }}
          >
            {/* Global Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search claims, bills (e.g. SB 2), candidates, or paste a quote..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500 font-sans"
                style={{
                  background: '#222222',
                  borderColor: '#2A2A2A',
                  color: '#FFFFEB',
                }}
              />
            </form>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5 text-xs">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setShowOnboarding(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer border shadow-xs"
                style={{
                  background: '#262626',
                  borderColor: '#383838',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>District Setup</span>
              </motion.button>

              <div
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px]"
                style={{
                  background: '#222222',
                  borderColor: '#2A2A2A',
                }}
              >
                <OrbIndicator status="verified" size={6} />
                <span className="font-medium text-slate-300">Verified: Texas Capitol</span>
              </div>
            </div>
          </header>

          {/* Dynamic Route View with Whispr Spring Transition */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Whispr-Style Dynamic Civic Island Floating Dock */}
          <DynamicCivicIsland />
        </div>
      </div>
    </div>
  );
};

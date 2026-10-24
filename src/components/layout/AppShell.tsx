import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
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
  ExternalLink,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { OnboardingModal } from '../onboarding/OnboardingModal';

export const AppShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { selectedCongressional, selectedStateSenate, selectedStateHouse, ollamaStatus } = useCivic();
  const navigate = useNavigate();

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/investigate?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Onboarding Dialog for First-Time Users or Replay */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#0B132B] text-white border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold tracking-tight text-base leading-none text-white">TRUTH</div>
            <div className="text-[10px] text-slate-400 font-medium">See beyond the spin.</div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOnboarding(true)}
            className="p-1.5 text-blue-400 hover:text-white rounded-md text-xs font-semibold flex items-center gap-1 bg-slate-800"
            title="Configure district"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[11px]">District</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </header>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B132B] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-500 transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider text-white block leading-tight">
                TRUTH
              </span>
              <span className="text-[11px] text-slate-400 font-medium block">
                See beyond the spin.
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

        {/* Global Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Selected District Quick Summary in Sidebar Footer */}
        <div className="p-3.5 mx-3 mb-3 bg-[#1C2541] rounded-lg border border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center justify-between text-slate-400 mb-1.5 font-medium text-[11px]">
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
          <div className="font-medium text-slate-200 truncate">
            {selectedCongressional.name.replace('Texas Congressional District', 'US CD-')}
          </div>
          <div className="text-slate-400 text-[11px] truncate">
            TX Senate {selectedStateSenate.districtNumber} • TX House {selectedStateHouse.districtNumber}
          </div>
        </div>

        {/* Sidebar System Status & Integrity Info */}
        <div className="p-3.5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 bg-[#070D1E]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nonpartisan & Cited</span>
            </span>
            <span className="text-slate-500 font-mono text-[10px]">v1.3-LIVE</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-slate-400" />
              <span>Inference</span>
            </span>
            <span className="font-mono text-[10px] text-slate-300">
              {ollamaStatus?.available ? 'Local Ollama' : 'Deterministic'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Bar for Desktop */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-30 shadow-xs flex items-center justify-between gap-4">
          {/* Global Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims, bills (e.g. SB 2), candidates, or paste a quote..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400 font-sans"
            />
          </form>

          {/* Right Header Controls & Badges */}
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <button
              type="button"
              onClick={() => setShowOnboarding(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>District Setup</span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-700">Verified: Primary Journals</span>
            </div>

            <a
              href="https://capitol.texas.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-slate-500 hover:text-blue-700 transition-colors"
            >
              <span>Texas Capitol</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Dynamic Route View */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

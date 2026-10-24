import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Search,
  Scale,
} from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { TEXAS_DISTRICTS } from '../../data/districts';
import { OrbIndicator } from '../common/OrbIndicator';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const {
    selectedCongressional,
    selectedStateSenate,
    selectedStateHouse,
    setCongressional,
    setStateSenate,
    setStateHouse,
    lookupByZip,
    activeZip,
    ollamaStatus,
    checkOllamaHealth,
    updateOllamaConfig,
    ollamaConfig,
  } = useCivic();

  const [step, setStep] = useState<number>(1);
  const [zipInput, setZipInput] = useState(activeZip || '78701');
  const [zipMessage, setZipMessage] = useState<string | null>(null);
  const [isPingingAi, setIsPingingAi] = useState(false);

  if (!isOpen) return null;

  const handleZipLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length === 5) {
      const res = lookupByZip(zipInput.trim());
      setZipMessage(res.notes);
    }
  };

  const selectMetroPreset = (cdId: string, sdId: string, hdId: string, zip: string) => {
    setCongressional(cdId);
    setStateSenate(sdId);
    setStateHouse(hdId);
    setZipInput(zip);
    lookupByZip(zip);
    setZipMessage(`Loaded metro delegation configuration (${zip}).`);
  };

  const handleTestAi = async () => {
    setIsPingingAi(true);
    await checkOllamaHealth();
    setIsPingingAi(false);
  };

  const handleComplete = () => {
    localStorage.setItem('truth_onboarded_v1', 'true');
    onClose();
  };

  const congressionalDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'congressional');
  const senateDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_senate');
  const houseDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_house');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26, mass: 0.8 }}
        className="w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] rounded-3xl border shadow-2xl"
        style={{
          background: '#1A1A1A',
          borderColor: '#2A2A2A',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
          color: '#FFFFEB',
        }}
      >
        {/* Top Header / Progress Ribbon */}
        <div
          className="p-5 md:px-8 border-b"
          style={{
            background: '#141414',
            borderColor: '#2A2A2A',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-bold text-[#FFFFEB] tracking-tight block">
                  TRUTH
                </span>
                <span className="text-xs text-blue-400 block -mt-0.5">
                  Texas Civic Intelligence Onboarding
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <OrbIndicator status="ready" size={8} />
              <span className="font-bold text-white">Step {step}</span>
              <span className="text-slate-500">of 4</span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t text-[11px] font-mono" style={{ borderColor: '#2A2A2A' }}>
            <div className={`pb-1 border-b-2 transition-colors ${step >= 1 ? 'border-blue-500 text-blue-400 font-bold' : 'border-[#2A2A2A] text-slate-500'}`}>
              01 Mission
            </div>
            <div className={`pb-1 border-b-2 transition-colors ${step >= 2 ? 'border-blue-500 text-blue-400 font-bold' : 'border-[#2A2A2A] text-slate-500'}`}>
              02 District
            </div>
            <div className={`pb-1 border-b-2 transition-colors ${step >= 3 ? 'border-blue-500 text-blue-400 font-bold' : 'border-[#2A2A2A] text-slate-500'}`}>
              03 Engine
            </div>
            <div className={`pb-1 border-b-2 transition-colors ${step >= 4 ? 'border-blue-500 text-blue-400 font-bold' : 'border-[#2A2A2A] text-slate-500'}`}>
              04 Launch
            </div>
          </div>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
          <AnimatePresence mode="wait">
            {/* STEP 1: Welcome & Mission */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                    Civic Mission & Ethics Charter
                  </span>
                  <h2 id="onboarding-dialog-title" className="text-2xl md:text-3xl font-serif font-bold text-[#FFFFEB] mt-1">
                    See beyond the political spin.
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed opacity-90">
                    Voters encounter thousands of campaign advertisements, political soundbites, and misleading claims each election cycle. Truth is built to connect every claim directly to original government records and official legislative journals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div
                    className="p-4 rounded-2xl border space-y-2"
                    style={{ background: '#222222', borderColor: '#2F2F2F' }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#FFFFEB]">Strictly Nonpartisan</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Truth never endorses candidates, never accepts campaign funds, and never tells you how to vote. We empower you to decide for yourself.
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-2xl border space-y-2"
                    style={{ background: '#222222', borderColor: '#2F2F2F' }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#FFFFEB]">Primary Sources First</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Every bill, recorded vote, and assertion links directly to Texas Legislature Online, the Congressional Record, or official agency records.
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-2xl border space-y-2"
                    style={{ background: '#222222', borderColor: '#2F2F2F' }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#FFFFEB]">100% Client-Side Privacy</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      No account required. Your district preferences and research sessions stay on your own device in LocalStorage.
                    </p>
                  </div>
                </div>

                <div
                  className="p-3.5 rounded-2xl border text-xs flex items-start gap-2.5"
                  style={{
                    background: 'rgba(59, 130, 246, 0.08)',
                    borderColor: 'rgba(59, 130, 246, 0.25)',
                    color: '#93C5FD',
                  }}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Congressional App Challenge Standard:</strong> Built with zero paid APIs, zero subscriptions, and complete algorithmic transparency.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: District & Location Setup */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                    Location & Representation
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#FFFFEB] mt-1">
                    Connect your Texas district.
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Enter any Texas 5-digit ZIP code or choose a Texas metropolitan region. You can fine-tune your exact legislative delegation at any time.
                  </p>
                </div>

                {/* ZIP Lookup Box */}
                <div
                  className="p-4 rounded-2xl border space-y-3"
                  style={{ background: '#222222', borderColor: '#2F2F2F' }}
                >
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Option A: Enter Texas ZIP Code
                  </label>
                  <form onSubmit={handleZipLookup} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={zipInput}
                        onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 78701, 75201, 77002, 78205, 79901"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono text-[#FFFFEB]"
                        style={{ background: '#1A1A1A', borderColor: '#333333' }}
                      />
                    </div>
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Match Districts
                    </motion.button>
                  </form>

                  {zipMessage && (
                    <div className="p-2.5 bg-blue-950/40 text-blue-300 rounded-xl text-xs border border-blue-500/30">
                      {zipMessage}
                    </div>
                  )}
                </div>

                {/* Option B: Metro 1-Click Presets */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Option B: Quick Texas Metro Presets
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => selectMetroPreset('tx-cd-37', 'tx-sd-14', 'tx-hd-49', '78701')}
                      className="p-3 rounded-2xl border text-left transition-colors cursor-pointer hover:border-blue-500"
                      style={{ background: '#222222', borderColor: '#2F2F2F' }}
                    >
                      <div className="font-bold text-[#FFFFEB]">Austin / Central TX</div>
                      <div className="text-[11px] text-slate-400 font-mono">TX-37 • SD-14 • HD-49</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectMetroPreset('tx-cd-30', 'tx-sd-23', 'tx-hd-100', '75201')}
                      className="p-3 rounded-2xl border text-left transition-colors cursor-pointer hover:border-blue-500"
                      style={{ background: '#222222', borderColor: '#2F2F2F' }}
                    >
                      <div className="font-bold text-[#FFFFEB]">Dallas / North TX</div>
                      <div className="text-[11px] text-slate-400 font-mono">TX-30 • SD-23 • HD-100</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectMetroPreset('tx-cd-18', 'tx-sd-15', 'tx-hd-147', '77002')}
                      className="p-3 rounded-2xl border text-left transition-colors cursor-pointer hover:border-blue-500"
                      style={{ background: '#222222', borderColor: '#2F2F2F' }}
                    >
                      <div className="font-bold text-[#FFFFEB]">Houston / Gulf Coast</div>
                      <div className="text-[11px] text-slate-400 font-mono">TX-18 • SD-15 • HD-147</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectMetroPreset('tx-cd-20', 'tx-sd-26', 'tx-hd-123', '78205')}
                      className="p-3 rounded-2xl border text-left transition-colors cursor-pointer hover:border-blue-500"
                      style={{ background: '#222222', borderColor: '#2F2F2F' }}
                    >
                      <div className="font-bold text-[#FFFFEB]">San Antonio / Alamo</div>
                      <div className="text-[11px] text-slate-400 font-mono">TX-20 • SD-26 • HD-123</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectMetroPreset('tx-cd-16', 'tx-sd-29', 'tx-hd-77', '79901')}
                      className="p-3 rounded-2xl border text-left transition-colors cursor-pointer hover:border-blue-500"
                      style={{ background: '#222222', borderColor: '#2F2F2F' }}
                    >
                      <div className="font-bold text-[#FFFFEB]">El Paso / West TX</div>
                      <div className="text-[11px] text-slate-400 font-mono">TX-16 • SD-29 • HD-77</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectMetroPreset('tx-cd-15', 'tx-sd-20', 'tx-hd-36', '78501')}
                      className="p-3 rounded-2xl border text-left transition-colors cursor-pointer hover:border-blue-500"
                      style={{ background: '#222222', borderColor: '#2F2F2F' }}
                    >
                      <div className="font-bold text-[#FFFFEB]">Rio Grande Valley</div>
                      <div className="text-[11px] text-slate-400 font-mono">TX-15 • SD-20 • HD-36</div>
                    </button>
                  </div>
                </div>

                {/* Option C: Manual District Selectors */}
                <div
                  className="p-4 rounded-2xl border space-y-3"
                  style={{ background: '#222222', borderColor: '#2F2F2F' }}
                >
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Option C: Configure Precise Districts
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">U.S. House</span>
                      <select
                        value={selectedCongressional.id}
                        onChange={(e) => setCongressional(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border text-[#FFFFEB]"
                        style={{ background: '#1A1A1A', borderColor: '#333333' }}
                      >
                        {congressionalDistricts.map((d) => (
                          <option key={d.id} value={d.id}>
                            TX-{d.districtNumber}: {d.name.replace('Texas Congressional District ', 'CD-')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">TX Senate</span>
                      <select
                        value={selectedStateSenate.id}
                        onChange={(e) => setStateSenate(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border text-[#FFFFEB]"
                        style={{ background: '#1A1A1A', borderColor: '#333333' }}
                      >
                        {senateDistricts.map((d) => (
                          <option key={d.id} value={d.id}>
                            Senate District {d.districtNumber}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">TX House</span>
                      <select
                        value={selectedStateHouse.id}
                        onChange={(e) => setStateHouse(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border text-[#FFFFEB]"
                        style={{ background: '#1A1A1A', borderColor: '#333333' }}
                      >
                        {houseDistricts.map((d) => (
                          <option key={d.id} value={d.id}>
                            House District {d.districtNumber}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Local Engine & AI Configuration */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                    Privacy & Computational Engine
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#FFFFEB] mt-1">
                    Free, local, zero-tracking AI.
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Truth is 100% free and never uses paid cloud AI APIs. All investigations use our deterministic primary-record engine, with optional local Ollama assistance.
                  </p>
                </div>

                {/* Local AI / Ollama Card */}
                <div
                  className="p-5 rounded-2xl border space-y-4"
                  style={{ background: '#222222', borderColor: '#2F2F2F' }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-5 h-5 text-blue-400" />
                      <div>
                        <h3 className="font-bold text-[#FFFFEB] text-sm">
                          Optional Local AI (Ollama)
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          Private on-device inference via local Ollama server
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleTestAi}
                      disabled={isPingingAi}
                      className="px-3.5 py-1.5 rounded-xl border text-slate-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                      style={{ background: '#1A1A1A', borderColor: '#333333' }}
                    >
                      {isPingingAi ? (
                        <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      )}
                      <span>Test Connection</span>
                    </motion.button>
                  </div>

                  <div
                    className="p-3.5 rounded-xl border text-xs space-y-1.5 font-mono"
                    style={{ background: '#1A1A1A', borderColor: '#2F2F2F' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Local Status:</span>
                      {ollamaStatus?.available ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <OrbIndicator status="verified" size={8} />
                          Online ({ollamaStatus.models?.length || 0} models found)
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium flex items-center gap-1.5">
                          <OrbIndicator status="offline" size={8} />
                          Deterministic Engine Ready (Ollama Offline)
                        </span>
                      )}
                    </div>
                    {ollamaStatus?.available && ollamaStatus.models?.length ? (
                      <div className="flex items-center justify-between pt-1 border-t border-[#2F2F2F]">
                        <span className="text-slate-400">Detected Models:</span>
                        <span className="font-mono text-[11px] text-slate-200">
                          {ollamaStatus.models.join(', ')}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableOllama"
                      checked={ollamaConfig.enabled}
                      onChange={(e) => updateOllamaConfig({ enabled: e.target.checked })}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <label htmlFor="enableOllama" className="text-xs font-medium text-slate-300 cursor-pointer">
                      Enable local AI synthesis when available (Always grounded in verified records)
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review & Launch */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Setup Complete
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#FFFFEB] mt-1">
                    Ready to investigate.
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Your personalized civic research environment has been configured. Here is a summary of your delegation:
                  </p>
                </div>

                {/* Summary Dossier Card */}
                <div
                  className="p-5 rounded-2xl border space-y-4"
                  style={{ background: '#222222', borderColor: '#2F2F2F' }}
                >
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: '#333333' }}>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 font-mono">
                      <MapPin className="w-4 h-4" />
                      <span>Configured Texas Delegation (ZIP: {activeZip})</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">Verified Primary Links Ready</span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between py-1 border-b" style={{ borderColor: '#2F2F2F' }}>
                      <span className="text-slate-400">Congressional:</span>
                      <span className="font-semibold text-[#FFFFEB]">{selectedCongressional.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b" style={{ borderColor: '#2F2F2F' }}>
                      <span className="text-slate-400">Texas Senate:</span>
                      <span className="font-semibold text-[#FFFFEB]">{selectedStateSenate.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b" style={{ borderColor: '#2F2F2F' }}>
                      <span className="text-slate-400">Texas House:</span>
                      <span className="font-semibold text-[#FFFFEB]">{selectedStateHouse.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-400">Counties Covered:</span>
                      <span className="font-semibold text-slate-300">
                        {Array.from(new Set([...selectedCongressional.majorCounties, ...selectedStateSenate.majorCounties])).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-2xl border text-xs text-slate-300 space-y-1.5"
                  style={{ background: '#1A1A1A', borderColor: '#2F2F2F' }}
                >
                  <div className="font-bold text-[#FFFFEB]">What you can do right now:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                    <li>Investigate any political ad quotation or speech claim in the Claim Workspace.</li>
                    <li>Compare candidates side-by-side using documented policy stances and roll calls.</li>
                    <li>Track live Texas bills from the 88th and 89th Legislature with direct journal tallies.</li>
                    <li>Revisit this setup wizard anytime from the top navigation bar or Settings.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer Controls */}
        <div
          className="p-4 md:px-8 border-t flex items-center justify-between"
          style={{ background: '#141414', borderColor: '#2A2A2A' }}
        >
          {step > 1 ? (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{ background: '#242424', borderColor: '#2F2F2F' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </motion.button>
          ) : (
            <span className="text-xs text-slate-500 font-mono">Truth Texas Civic Suite</span>
          )}

          {step < 4 ? (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleComplete}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Enter Truth Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

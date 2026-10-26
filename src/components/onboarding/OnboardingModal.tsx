import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Check,
  ArrowRight,
  ArrowLeft,
  Cpu,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Radio,
  SlidersHorizontal,
  ShieldCheck,
} from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { TEXAS_DISTRICTS } from '../../data/districts';
import { CustomDistrictDropdown } from '../ui/CustomDistrictDropdown';
import { SculptureHero } from './SculptureHero';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const heroFadeVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  },
};

const parallaxSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 240,
      damping: 28,
      mass: 0.85,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  }),
};

const backgroundParallaxVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '35%' : '-35%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 0.035,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-35%' : '35%',
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  }),
};

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
    autoStartOllama,
    setAutoStartOllama,
  } = useCivic();

  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [zipInput, setZipInput] = useState(activeZip || '78701');
  const [zipMessage, setZipMessage] = useState<string | null>(null);
  const [isOutOfState, setIsOutOfState] = useState<boolean>(false);

  const [isPingingAi, setIsPingingAi] = useState(false);
  const [lastPingLatency, setLastPingLatency] = useState<number | null>(null);
  const [showManualDropdowns, setShowManualDropdowns] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStage, setDownloadStage] = useState<string>('');
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setDirection(1);
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 3) {
      checkOllamaHealth();
    }
  }, [step]);

  if (!isOpen) return null;

  const goToStep = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  const handleZipLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = zipInput.trim();
    if (clean.length === 5) {
      const res = lookupByZip(clean);
      setZipMessage(res.notes);
      setIsOutOfState(res.notes.includes('is in '));
    }
  };

  const handleTestAi = async () => {
    setIsPingingAi(true);
    const start = performance.now();
    await checkOllamaHealth();
    const elapsed = Math.round(performance.now() - start);
    setLastPingLatency(elapsed);
    setIsPingingAi(false);
  };

  const handleStartDownload = async () => {
    if (isDownloading || downloadCompleted) return;
    setIsDownloading(true);
    setDownloadStage('Checking your local Ollama installation...');
    try {
      const res = await fetch('/api/ai/health');
      const data = res.ok ? await res.json() : null;
      const installed: string[] = data?.available ? data.models || [] : [];
      if (!data?.available) {
        setDownloadStage('Ollama is not running. Install/start Ollama, then try again.');
      } else if (installed.some((m) => m.toLowerCase().startsWith('llama3.2'))) {
        setDownloadCompleted(true);
        setDownloadStage('Llama 3.2 detected. Local inference enabled.');
        updateOllamaConfig({ enabled: true, model: 'llama3.2' });
      } else {
        setDownloadStage('Llama 3.2 is not installed. Run "ollama pull llama3.2" in a terminal, then click again.');
      }
    } catch {
      setDownloadStage('Could not reach the local API. Make sure the app server is running.');
    }
    await checkOllamaHealth();
    setIsDownloading(false);
  };

  const handleContinueFromStep2 = () => {
    if (zipInput.trim().length === 5) {
      lookupByZip(zipInput.trim());
    }
    goToStep(3);
  };

  const handleComplete = () => {
    localStorage.setItem('truth_onboarded_v1', 'true');
    onClose();
  };

  const congressionalDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'congressional');
  const senateDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_senate');
  const houseDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_house');

  const stepTitles = [
    'Civic Overview',
    'Mission & Principles',
    'District Selection',
    'Privacy & Inference',
    'Review & Begin',
  ];

  const hasLlama32 =
    downloadCompleted ||
    Boolean(ollamaStatus?.models?.some((m) => m.toLowerCase().includes('llama3.2')));

  return (
    <AnimatePresence mode="wait">
      {step === 0 ? (
        <motion.div
          key="hero-fullscreen"
          variants={heroFadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#111110]"
        >
          <SculptureHero
            onBegin={() => goToStep(1)}
            src="/texas_shape.png"
            darkSrc="/texas_shape.png"
            mobileSrc="/texas_shape.png"
            mobileDarkSrc="/texas_shape.png"
            imageBackground="#000000"
            primaryCta={{ label: 'Begin' }}
            backdropText="TRUTH"
            headline={'TRUTH\nSee beyond the spin.'}
            headlineAccent="the spin."
            body="Understand your candidates. Investigate the claims. Decide for yourself."
            eyebrow=""
          />
        </motion.div>
      ) : (
        <motion.div
          key="onboarding-fullscreen"
          custom={direction}
          variants={parallaxSlideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-phase-title"
          className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#0C0C0B] text-[#FFFFEB] flex flex-col justify-between select-none"
        >
          <div
            className="px-6 sm:px-10 py-4 border-b flex items-center justify-between shrink-0"
            style={{
              background: '#10100F',
              borderColor: '#20201F',
            }}
          >
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Truth" className="w-5 h-5 object-contain" />
              <span className="text-xs font-mono font-bold tracking-widest text-amber-400">
                TRUTH
              </span>
              <span className="text-[#333333]">•</span>
              <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase font-semibold">
                PHASE 0{step} / 04
              </span>
              <span className="text-[#333333]">•</span>
              <span className="text-xs font-medium text-[#CCCCCC] truncate">
                {stepTitles[step]}
              </span>
            </div>

            <div className="text-[11px] font-mono text-[#666666] tracking-wider uppercase hidden sm:block">
              Texas Civic Intelligence
            </div>
          </div>

          <div className="w-full h-[2px] bg-[#1A1A19] overflow-hidden shrink-0">
            <motion.div
              className="h-full bg-amber-400"
              initial={false}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            />
          </div>

          <div className="flex-1 relative w-full overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`watermark-${step}`}
                custom={direction}
                variants={backgroundParallaxVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute right-8 md:right-16 bottom-6 md:bottom-10 pointer-events-none select-none font-serif text-[18vw] leading-none text-white font-black z-0"
              >
                0{step}
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 py-6 overflow-y-auto no-scrollbar">
              <div className="w-full max-w-2xl my-auto">
                <AnimatePresence mode="wait" custom={direction}>
                  {step === 1 && (
                    <motion.div
                      key="phase-1"
                      custom={direction}
                      variants={parallaxSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6 sm:space-y-7 my-auto p-6 sm:p-8 rounded-2xl border bg-[#141413] border-[#242423] shadow-2xl"
                    >
                <div>
                  <h2
                    id="onboarding-phase-title"
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFEB] tracking-tight leading-snug"
                  >
                    See beyond the political spin.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#999999] mt-2.5 leading-relaxed">
                    Truth connects political advertisements, speeches, campaign promises, and contentious claims directly to primary statutory bills, roll-call records, and official journals.
                  </p>
                </div>

                <div className="space-y-3.5 sm:space-y-4 pt-1">
                  <div className="flex items-start gap-3.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-[#242424]">
                    <span className="text-xs font-mono text-amber-400 font-semibold pt-0.5 shrink-0">
                      01
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#FFFFEB]">
                        Strictly Nonpartisan by Architecture
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#888888] mt-1 leading-relaxed">
                        Truth never endorses candidates, never accepts campaign funding, and never prescribes how to vote. The platform exists solely to present verifiable evidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-[#242424]">
                    <span className="text-xs font-mono text-amber-400 font-semibold pt-0.5 shrink-0">
                      02
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#FFFFEB]">
                        Primary Government Sources First
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#888888] mt-1 leading-relaxed">
                        Every legislative action links straight to Texas Legislature Online (TLO) or the Congressional Record. Secondary articles provide context but never replace statutory text.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <span className="text-xs font-mono text-amber-400 font-semibold pt-0.5 shrink-0">
                      03
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#FFFFEB]">
                        Zero Tracking & Private by Default
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#888888] mt-1 leading-relaxed">
                        No user login, no tracking cookies, and no profiling. Your district selection and investigation history remain entirely on your own device.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="phase-2"
                custom={direction}
                variants={parallaxSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4 sm:space-y-5 my-auto p-6 sm:p-8 rounded-2xl border bg-[#141413] border-[#242423] shadow-2xl"
              >
                <div>
                  <h2
                    id="onboarding-phase-title"
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFEB] tracking-tight leading-snug"
                  >
                    Select your Texas delegation.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#999999] mt-1.5 leading-relaxed">
                    Enter your 5-digit Texas ZIP code. Your specific local code is directly preserved across all research and voting queries.
                  </p>
                </div>

                <motion.div
                  layout
                  className="p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  style={{ background: '#181818', borderColor: '#2B2B2B' }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px] text-[#888888] uppercase tracking-wider">
                      Selected Delegation (ZIP: {zipInput || activeZip || '78701'}):
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-1.5 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold">
                      TX-{selectedCongressional.districtNumber}
                    </span>
                    <span className="text-[#555]">•</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#242424] border border-[#333] text-[#CCC]">
                      SD-{selectedStateSenate.districtNumber}
                    </span>
                    <span className="text-[#555]">•</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#242424] border border-[#333] text-[#CCC]">
                      HD-{selectedStateHouse.districtNumber}
                    </span>
                  </div>
                </motion.div>

                <form onSubmit={handleZipLookup} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666] pointer-events-none" />
                      <input
                        type="text"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={zipInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setZipInput(val);
                          if (val.length === 5) {
                            const res = lookupByZip(val);
                            setZipMessage(res.notes);
                            setIsOutOfState(res.notes.includes('is in '));
                          }
                        }}
                        placeholder="Enter your 5-digit ZIP code (e.g. 78704, 75201, 77002)"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border font-mono text-[#FFFFEB] placeholder:text-[#555555] focus:outline-hidden focus:border-amber-400 transition-colors"
                        style={{ background: '#121212', borderColor: '#2B2B2B' }}
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#242424] hover:bg-[#2F2F2F] text-[#FFFFEB] border border-[#333333] transition-colors cursor-pointer shrink-0"
                    >
                      Lookup
                    </motion.button>
                  </div>

                  {zipMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[11px] font-mono px-2.5 py-1.5 rounded-lg border ${
                        isOutOfState
                          ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                          : 'bg-[#181818] border-[#2A2A2A] text-amber-300/90'
                      }`}
                    >
                      {zipMessage}
                    </motion.div>
                  )}
                </form>

                <div className="pt-1.5 border-t border-[#242424] space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setShowManualDropdowns(!showManualDropdowns)}
                    className="text-xs text-[#888888] hover:text-[#CCCCCC] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {showManualDropdowns ? 'Hide manual seat selectors' : 'Fine-tune individual seats with custom dropdowns'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showManualDropdowns && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2.5 pt-1"
                      >
                        <CustomDistrictDropdown
                          label="U.S. Congressional District"
                          badgePrefix="TX-"
                          selectedId={selectedCongressional.id}
                          options={congressionalDistricts}
                          onSelect={setCongressional}
                        />

                        <CustomDistrictDropdown
                          label="Texas State Senate District"
                          badgePrefix="SD-"
                          selectedId={selectedStateSenate.id}
                          options={senateDistricts}
                          onSelect={setStateSenate}
                        />

                        <CustomDistrictDropdown
                          label="Texas State House District"
                          badgePrefix="HD-"
                          selectedId={selectedStateHouse.id}
                          options={houseDistricts}
                          onSelect={setStateHouse}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="phase-3"
                custom={direction}
                variants={parallaxSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4 sm:space-y-5 my-auto p-6 sm:p-8 rounded-2xl border bg-[#141413] border-[#242423] shadow-2xl"
              >
                <div>
                  <h2
                    id="onboarding-phase-title"
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFEB] tracking-tight leading-snug"
                  >
                    100% Free, local engine.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#999999] mt-1.5 leading-relaxed">
                    Truth operates entirely on your machine. Claim extraction and statutory evidence matching run with zero cloud dependency.
                  </p>
                </div>

                <div
                  className="p-4 rounded-xl border space-y-3.5"
                  style={{ background: '#171717', borderColor: '#2A2A2A' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                        <Cpu className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#FFFFEB]">
                          Local Ollama Inference
                        </div>
                        <div className="text-[11px] text-[#777777]">
                          Private on-device AI model daemon
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={handleTestAi}
                      disabled={isPingingAi}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#FFFFEB] bg-[#222222] hover:bg-[#2A2A2A] border border-[#383838] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-xs"
                    >
                      {isPingingAi ? (
                        <>
                          <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                          <span>Pinging Daemon...</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>Test Ping</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#121212] border border-[#222222] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[#888888]">Daemon Ping:</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {ollamaStatus?.available ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online ({ollamaStatus.models?.length || 0} models detected
                          {lastPingLatency !== null ? ` • ${lastPingLatency}ms latency` : ''})
                        </span>
                      ) : (
                        <span className="text-[#888888] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Offline (Fallback: Deterministic Primary Record Search
                          {lastPingLatency !== null ? ` • ${lastPingLatency}ms check` : ''})
                        </span>
                      )}
                    </div>
                  </div>

                  {ollamaStatus?.models && ollamaStatus.models.length > 0 && (
                    <div className="space-y-1.5 pt-1 border-t border-[#242424]">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#888888]">
                        <span className="uppercase tracking-wider">Select Active Model ({ollamaStatus.models.length} installed):</span>
                        <span className="text-amber-300 font-semibold">{ollamaConfig.model || ollamaStatus.models[0]}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto no-scrollbar">
                        {ollamaStatus.models.map((m) => {
                          const isCur = (ollamaConfig.model || ollamaStatus.models[0]) === m;
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => updateOllamaConfig({ model: m, enabled: true })}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                isCur
                                  ? 'bg-amber-400 text-[#141414] font-bold border border-amber-300 shadow-xs'
                                  : 'bg-[#1F1F1F] text-[#CCCCCC] border border-[#2E2E2E] hover:border-[#444]'
                              }`}
                            >
                              {m}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#242424] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-[#FFFFEB]">
                        Auto-start & connect to Ollama engine
                      </div>
                      <div className="text-[11px] text-[#777777] leading-relaxed mt-0.5">
                        When Truth starts on Windows, automatically launch local daemon on port 11434.
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={autoStartOllama}
                      onClick={() => setAutoStartOllama(!autoStartOllama)}
                      className={`w-11 h-6 rounded-full px-0.5 transition-colors cursor-pointer relative shrink-0 border flex items-center ${
                        autoStartOllama
                          ? 'bg-amber-400 border-amber-300'
                          : 'bg-[#222222] border-[#383838]'
                      }`}
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className={`w-4.5 h-4.5 rounded-full shadow-md ${
                          autoStartOllama ? 'bg-[#141414] translate-x-5' : 'bg-[#777777] translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div
                  className="p-3.5 rounded-xl border space-y-2"
                  style={{ background: '#171717', borderColor: '#2A2A2A' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#FFFFEB]">
                        Recommended Model: Llama 3.2 3B
                      </div>
                      <div className="text-[10px] text-[#777777]">
                        Lightweight on-device instruction model for claim extraction
                      </div>
                    </div>

                    {hasLlama32 ? (
                      <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Llama 3.2 Installed & Ready
                      </span>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={handleStartDownload}
                        disabled={isDownloading}
                        className="px-3 py-1.5 text-xs font-semibold text-[#141414] bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isDownloading ? 'Checking...' : 'Detect Llama 3.2'}
                      </motion.button>
                    )}
                  </div>

                  {downloadStage && (
                    <div className="text-[10px] font-mono text-[#888888] pt-1">{downloadStage}</div>
                  )}

                  {!ollamaStatus?.available && (
                    <div className="pt-1.5 border-t border-[#242424] flex items-center justify-between text-[11px]">
                      <span className="text-[#777777]">Need Ollama for Windows?</span>
                      <a
                        href="https://ollama.com/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                      >
                        <span>Download Ollama</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="phase-4"
                custom={direction}
                variants={parallaxSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4 sm:space-y-5 my-auto p-6 sm:p-8 rounded-2xl border bg-[#141413] border-[#242423] shadow-2xl"
              >
                <div>
                  <h2
                    id="onboarding-phase-title"
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFEB] tracking-tight leading-snug"
                  >
                    Your research station is ready.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#999999] mt-1.5 leading-relaxed">
                    Here is your configured Texas civic dossier. You can adjust districts or inference settings at any time in the titlebar or settings.
                  </p>
                </div>

                <div
                  className="p-4 rounded-xl border space-y-2.5 font-mono text-xs"
                  style={{ background: '#171717', borderColor: '#282828' }}
                >
                  <div className="flex items-center gap-2 text-amber-400 pb-2 border-b border-[#262626]">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">Configured Delegation (ZIP: {activeZip})</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#222222] gap-1">
                    <span className="text-[#777777]">U.S. House:</span>
                    <span className="text-[#FFFFEB] font-medium truncate">{selectedCongressional.name}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#222222] gap-1">
                    <span className="text-[#777777]">Texas Senate:</span>
                    <span className="text-[#FFFFEB] font-medium truncate">{selectedStateSenate.name}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-1">
                    <span className="text-[#777777]">Texas House:</span>
                    <span className="text-[#FFFFEB] font-medium truncate">{selectedStateHouse.name}</span>
                  </div>
                </div>

                <div className="text-xs text-[#888888] space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-[#CCCCCC]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fact-check political claims using the bottom floating island or Investigate tab.</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#CCCCCC]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Compare candidate voting records side-by-side with statutory bill histories.</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#CCCCCC]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Primary legislative records link straight to Texas Legislature Online (TLO).</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>

    <div
      className="px-6 sm:px-10 py-4 border-t flex items-center justify-between shrink-0 relative z-20"
      style={{ background: '#10100F', borderColor: '#20201F' }}
    >
      {step >= 1 ? (
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => goToStep(step - 1)}
          className="px-4 py-2 text-xs font-medium text-[#888888] hover:text-[#FFFFEB] hover:bg-[#1A1A19] rounded-xl border border-[#242423] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Back to Intro' : 'Back'}</span>
        </motion.button>
      ) : (
        <div />
      )}

      {step === 2 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={handleContinueFromStep2}
          className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#141414] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      ) : step < 4 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => goToStep(step + 1)}
          className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#141414] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={handleComplete}
          className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#141414] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Launch Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </div>
  </motion.div>
)}
</AnimatePresence>
);
};

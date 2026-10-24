import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Search,
} from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { TEXAS_DISTRICTS } from '../../data/districts';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header / Progress Ribbon */}
        <div className="bg-slate-900 text-white p-5 md:px-8 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-serif font-black text-lg">
                T
              </div>
              <div>
                <span className="text-base font-serif font-bold text-white tracking-tight">
                  Truth
                </span>
                <span className="text-xs text-blue-300 block -mt-0.5">
                  Texas Civic Intelligence Onboarding
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span className="font-bold text-white">Step {step}</span> of 4
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px]">
            <div className={`pb-1 border-b-2 ${step >= 1 ? 'border-blue-500 text-blue-300 font-bold' : 'border-slate-700 text-slate-500'}`}>
              01 Mission
            </div>
            <div className={`pb-1 border-b-2 ${step >= 2 ? 'border-blue-500 text-blue-300 font-bold' : 'border-slate-700 text-slate-500'}`}>
              02 District
            </div>
            <div className={`pb-1 border-b-2 ${step >= 3 ? 'border-blue-500 text-blue-300 font-bold' : 'border-slate-700 text-slate-500'}`}>
              03 Engine
            </div>
            <div className={`pb-1 border-b-2 ${step >= 4 ? 'border-blue-500 text-blue-300 font-bold' : 'border-slate-700 text-slate-500'}`}>
              04 Launch
            </div>
          </div>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* STEP 1: Welcome & Mission */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Civic Mission & Ethics Charter
                </span>
                <h2 id="onboarding-dialog-title" className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mt-1">
                  See beyond the political spin.
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Voters encounter thousands of campaign advertisements, political soundbites, and misleading claims each election cycle. Truth is built to connect every claim directly to original government records and official legislative journals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Strictly Nonpartisan</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Truth never endorses candidates, never accepts campaign funds, and never tells you how to vote. We empower you to decide for yourself.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Primary Sources First</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Every bill, recorded vote, and assertion links directly to Texas Legislature Online, the Congressional Record, or official agency records.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">100% Client-Side Privacy</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    No account required. Your district preferences and research sessions stay on your own device in LocalStorage.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Congressional App Challenge Standard:</strong> Built with zero paid APIs, zero subscriptions, and complete algorithmic transparency.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: District & Location Setup */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Location & Representation
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                  Connect your Texas district.
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Enter any Texas 5-digit ZIP code or choose a Texas metropolitan region. You can fine-tune your exact legislative delegation at any time.
                </p>
              </div>

              {/* ZIP Lookup Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Option A: Enter Texas ZIP Code
                </label>
                <form onSubmit={handleZipLookup} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      value={zipInput}
                      onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 78701, 75201, 77002, 78205, 79901"
                      className="w-full pl-9 pr-3 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Match Districts
                  </button>
                </form>

                {zipMessage && (
                  <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg text-xs border border-blue-200">
                    {zipMessage}
                  </div>
                )}
              </div>

              {/* Option B: Metro 1-Click Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Option B: Quick Texas Metro Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => selectMetroPreset('tx-cd-37', 'tx-sd-14', 'tx-hd-49', '78701')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900">Austin / Central TX</div>
                    <div className="text-[11px] text-slate-500 font-mono">TX-37 • SD-14 • HD-49</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectMetroPreset('tx-cd-32', 'tx-sd-16', 'tx-hd-108', '75206')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900">Dallas / North TX</div>
                    <div className="text-[11px] text-slate-500 font-mono">TX-32 • SD-16 • HD-108</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectMetroPreset('tx-cd-07', 'tx-sd-15', 'tx-hd-134', '77005')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900">Houston Metro</div>
                    <div className="text-[11px] text-slate-500 font-mono">TX-07 • SD-15 • HD-134</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectMetroPreset('tx-cd-21', 'tx-sd-25', 'tx-hd-73', '78130')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900">San Antonio / Hill Country</div>
                    <div className="text-[11px] text-slate-500 font-mono">TX-21 • SD-25 • HD-73</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectMetroPreset('tx-cd-12', 'tx-sd-16', 'tx-hd-90', '76102')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900">Fort Worth / Tarrant</div>
                    <div className="text-[11px] text-slate-500 font-mono">TX-12 • SD-16 • HD-90</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectMetroPreset('tx-cd-16', 'tx-sd-29', 'tx-hd-77', '79901')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900">El Paso / West Texas</div>
                    <div className="text-[11px] text-slate-500 font-mono">TX-16 • SD-29 • HD-77</div>
                  </button>
                </div>
              </div>

              {/* Current Selection Preview */}
              <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                <div className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                  Active Selected Delegation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">U.S. Congressional:</span>
                    <strong className="text-slate-100 font-semibold">{selectedCongressional.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Texas State Senate:</span>
                    <strong className="text-slate-100 font-semibold">{selectedStateSenate.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Texas State House:</span>
                    <strong className="text-slate-100 font-semibold">{selectedStateHouse.name}</strong>
                  </div>
                </div>
              </div>

              {/* Manual Selection Dropdowns Accordion */}
              <details className="text-xs text-slate-600 border border-slate-200 rounded-lg p-3 bg-white">
                <summary className="font-semibold cursor-pointer text-slate-800">
                  Option C: Manual District Selection (Fine-tune individual seats)
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Congressional:
                    </label>
                    <select
                      value={selectedCongressional.id}
                      onChange={(e) => setCongressional(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs"
                    >
                      {congressionalDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                          TX-{d.districtNumber} ({d.region.split('(')[0].trim()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Texas Senate:
                    </label>
                    <select
                      value={selectedStateSenate.id}
                      onChange={(e) => setStateSenate(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs"
                    >
                      {senateDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                          SD-{d.districtNumber} ({d.region.split('(')[0].trim()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Texas House:
                    </label>
                    <select
                      value={selectedStateHouse.id}
                      onChange={(e) => setStateHouse(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs"
                    >
                      {houseDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                          HD-{d.districtNumber} ({d.region.split('(')[0].trim()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </details>
            </div>
          )}

          {/* STEP 3: Verification & Engine Setup */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Verification Systems
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                  Engine & Research Settings
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Truth utilizes a deterministic civic analysis engine grounded in original statutes. You can also connect a local, private Ollama model if running on your machine.
                </p>
              </div>

              {/* Core Engine Card */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm">
                      Deterministic Civic Verification Engine (Active)
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Grounded & Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluates political claims against official Texas House and Senate Journals, Texas Legislature Online bill filings, and Congressional roll-call tallies. 100% free, reproducible, and verifiable.
                </p>
              </div>

              {/* Local AI / Ollama Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-slate-700" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Optional Local AI (Ollama)
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        Private on-device inference via local Ollama server
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleTestAi}
                    disabled={isPingingAi}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {isPingingAi ? (
                      <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    <span>Test Connection</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Local Status:</span>
                    {ollamaStatus?.available ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        Online ({ollamaStatus.models?.length || 0} models found)
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">
                        Not running locally (Deterministic engine will handle all investigations)
                      </span>
                    )}
                  </div>
                  {ollamaStatus?.available && ollamaStatus.models?.length ? (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-600">Detected Models:</span>
                      <span className="font-mono text-[11px] text-slate-800">
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
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="enableOllama" className="text-xs font-medium text-slate-700 cursor-pointer">
                    Enable local AI synthesis when available (Always grounded in verified records)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Launch */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
                  Setup Complete
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                  Ready to investigate.
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Your personalized civic research environment has been configured. Here is a summary of your delegation:
                </p>
              </div>

              {/* Summary Dossier Card */}
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <MapPin className="w-4 h-4" />
                    <span>Configured Texas Delegation (ZIP: {activeZip})</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">Verified Primary Links Ready</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Congressional:</span>
                    <span className="font-semibold text-slate-100">{selectedCongressional.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Texas Senate:</span>
                    <span className="font-semibold text-slate-100">{selectedStateSenate.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Texas House:</span>
                    <span className="font-semibold text-slate-100">{selectedStateHouse.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Counties Covered:</span>
                    <span className="font-semibold text-slate-200">
                      {Array.from(new Set([...selectedCongressional.majorCounties, ...selectedStateSenate.majorCounties])).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">What you can do right now:</div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  <li>Investigate any political ad quotation or speech claim in the Claim Workspace.</li>
                  <li>Compare candidates side-by-side using documented policy stances and roll calls.</li>
                  <li>Track live Texas bills from the 88th and 89th Legislature with direct journal tallies.</li>
                  <li>Revisit this setup wizard anytime from the top navigation bar or Settings.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 p-4 md:px-8 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400">Nonpartisan Voter Tool</span>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Enter Truth Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

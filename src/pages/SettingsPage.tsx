import React, { useState } from 'react';
import {
  Cpu,
  RefreshCw,
  CheckCircle2,
  Lock,
  RotateCcw,
  MapPin,
  BookOpen,
  Search,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { TEXAS_DISTRICTS } from '../data/districts';
import { OFFICIALS } from '../data/officials';
import { CustomDistrictDropdown } from '../components/ui/CustomDistrictDropdown';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import { OrbIndicator } from '../components/common/OrbIndicator';

export const SettingsPage: React.FC = () => {
  const {
    ollamaConfig,
    updateOllamaConfig,
    ollamaStatus,
    checkOllamaHealth,
    resetAllData,
    selectedCongressional,
    selectedStateSenate,
    selectedStateHouse,
    setCongressional,
    setStateSenate,
    setStateHouse,
    lookupByZip,
    activeZip,
    autoStartOllama,
    setAutoStartOllama,
    aiMasterEnabled,
    setAiMasterEnabled,
  } = useCivic();

  const [zipInput, setZipInput] = useState(activeZip || '78701');
  const [zipMessage, setZipMessage] = useState<string | null>(null);

  const [baseUrlInput, setBaseUrlInput] = useState(ollamaConfig.baseUrl);
  const [modelInput, setModelInput] = useState(ollamaConfig.model);
  const [enabledInput, setEnabledInput] = useState(ollamaConfig.enabled);
  const [isTesting, setIsTesting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleZipLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = zipInput.trim();
    if (clean.length === 5) {
      const res = lookupByZip(clean);
      setZipMessage(res.notes);
    }
  };

  const handleSaveOllama = (e: React.FormEvent) => {
    e.preventDefault();
    updateOllamaConfig({
      baseUrl: baseUrlInput.trim(),
      model: modelInput.trim(),
      enabled: enabledInput,
    });
    setSaveMessage('Ollama configuration saved to local storage.');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    await checkOllamaHealth();
    setIsTesting(false);
  };

  const handleResetData = () => {
    resetAllData();
    setResetConfirm(false);
    setSaveMessage('All local preferences and cached investigations cleared.');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleRerunOnboarding = () => {
    localStorage.removeItem('truth_onboarded_v1');
    window.dispatchEvent(new CustomEvent('truth:open-onboarding'));
  };

  const congressionalDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'congressional');
  const senateDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_senate');
  const houseDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_house');

  const matchingOfficials = OFFICIALS.filter((o) => {
    if (o.jurisdiction === 'Federal' && o.district.includes('Statewide')) return true;
    if (o.district.includes(`District ${selectedCongressional.districtNumber}`)) return true;
    if (o.district.includes(`District ${selectedStateSenate.districtNumber}`)) return true;
    if (o.district.includes(`District ${selectedStateHouse.districtNumber}`)) return true;
    return false;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#FFFFEB] tracking-tight">
            Settings & Local Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
            Manage your Texas district delegation, review provenance methodology, configure on-device inference, or rerun onboarding.
          </p>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      <div
        className="p-6 rounded-2xl border space-y-4"
        style={{ background: '#161615', borderColor: '#262625' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-[#FFFFEB]">
              Texas Legislative Delegation & Districts
            </h2>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold">
              TX-{selectedCongressional.districtNumber}
            </span>
            <span className="text-[#555]">•</span>
            <span className="px-2 py-0.5 rounded-md bg-[#222] border border-[#333] text-[#CCC]">
              SD-{selectedStateSenate.districtNumber}
            </span>
            <span className="text-[#555]">•</span>
            <span className="px-2 py-0.5 rounded-md bg-[#222] border border-[#333] text-[#CCC]">
              HD-{selectedStateHouse.districtNumber}
            </span>
          </div>
        </div>

        <form onSubmit={handleZipLookup} className="space-y-2">
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
                  }
                }}
                placeholder="Enter 5-digit Texas ZIP code (e.g. 78704, 75201, 77002)"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border font-mono text-[#FFFFEB] placeholder:text-[#555555] focus:outline-hidden focus:border-amber-400"
                style={{ background: '#121211', borderColor: '#2A2A29' }}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#242423] hover:bg-[#2F2F2E] text-[#FFFFEB] border border-[#333332] transition-colors cursor-pointer shrink-0"
            >
              Lookup
            </button>
          </div>

          {zipMessage && (
            <div className="text-[11px] font-mono px-3 py-1.5 rounded-lg border bg-[#181817] border-[#2A2A29] text-amber-300/90">
              {zipMessage}
            </div>
          )}
        </form>

        <div className="pt-3 border-t border-[#242423] space-y-3">
          <div className="text-xs font-semibold text-[#CCCCCC]">
            Fine-Tune Individual District Seats:
          </div>

          <div className="space-y-2.5">
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
          </div>
        </div>

        <div className="pt-3 border-t border-[#242423] space-y-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <h3 className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider font-mono">
              Current Elected Officials in Delegation ({matchingOfficials.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {matchingOfficials.map((off) => (
              <div
                key={off.id}
                className="p-2.5 rounded-xl border flex items-center justify-between text-xs"
                style={{ background: '#181817', borderColor: '#262625' }}
              >
                <div>
                  <div className="font-semibold text-[#FFFFEB]">{off.name}</div>
                  <div className="text-[10px] text-[#888888]">{off.office} • {off.district}</div>
                </div>
                <a
                  href={off.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#666] hover:text-amber-400 transition-colors p-1"
                  title="Official Government Portal"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="p-6 rounded-2xl border space-y-4"
        style={{ background: '#161615', borderColor: '#262625' }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-[#FFFFEB]">
            Sources, Methodology & Evidential Standards
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Truth connects claims directly to original statutory bills, roll-call voting tallies, and government records. We never rely on campaign advertising or biased summaries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href="https://capitol.texas.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl border block hover:border-amber-400/40 transition-colors group"
            style={{ background: '#181817', borderColor: '#262625' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#FFFFEB] group-hover:text-amber-300">
                Texas Legislature Online (TLO)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#666] group-hover:text-amber-400" />
            </div>
            <p className="text-[11px] text-[#888888] mt-1 leading-relaxed">
              Official portal for Texas House & Senate bills, fiscal notes, witness lists, and journals.
            </p>
          </a>

          <a
            href="https://www.congress.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl border block hover:border-amber-400/40 transition-colors group"
            style={{ background: '#181817', borderColor: '#262625' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#FFFFEB] group-hover:text-amber-300">
                Congress.gov (Library of Congress)
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#666] group-hover:text-amber-400" />
            </div>
            <p className="text-[11px] text-[#888888] mt-1 leading-relaxed">
              U.S. federal statutory laws, roll-call voting tallies, and Congressional Record transcripts.
            </p>
          </a>
        </div>
      </div>

      <div
        className="p-6 rounded-2xl border space-y-4"
        style={{ background: '#161615', borderColor: '#262625' }}
      >
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-[#FFFFEB]">
            Privacy & Data Architecture Standards
          </h2>
        </div>
        <div
          className="text-xs text-slate-300 space-y-2 leading-relaxed p-4 rounded-xl border"
          style={{ background: '#181817', borderColor: '#262625' }}
        >
          <p>
            <strong className="text-[#FFFFEB]">No User Profiling:</strong> Truth never requires an account or email to browse district records, compare candidates, or investigate claims.
          </p>
          <p>
            <strong className="text-[#FFFFEB]">Zero Location Tracking:</strong> Your ZIP code and manual district preferences are stored exclusively on your device in HTML5 LocalStorage.
          </p>
          <p>
            <strong className="text-[#FFFFEB]">Zero Hosted Paid AI:</strong> We never transmit your submitted claims or research queries to commercial cloud AI vendors.
          </p>
        </div>
      </div>

      <div
        className="p-6 rounded-2xl border space-y-4"
        style={{ background: '#161615', borderColor: '#262625' }}
      >
        <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FFFFEB]">Master AI Device Control</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  aiMasterEnabled
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                    : 'bg-stone-900 text-stone-400 border-stone-800'
                }`}
              >
                {aiMasterEnabled ? 'AI Active' : 'AI Disabled'}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed max-w-lg">
              Toggle all artificial intelligence devices across Truth. When turned OFF, natural language chat, live news AI checks, and neural summaries are fully disabled. Truth continues running with 100% functionality in deterministic mode, cross-referencing primary statutory records and legislative roll-calls.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={aiMasterEnabled}
            onClick={() => setAiMasterEnabled(!aiMasterEnabled)}
            className={`w-12 h-6 rounded-full px-0.5 transition-colors cursor-pointer relative shrink-0 border flex items-center ${
              aiMasterEnabled ? 'bg-amber-400 border-amber-300' : 'bg-[#222221] border-[#383837]'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full shadow-md transition-transform duration-200 ${
                aiMasterEnabled ? 'bg-[#141414] translate-x-6' : 'bg-[#777777] translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-[#FFFFEB]">
                Optional Local AI Inference (Ollama)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Truth is 100% functional out of the box using our deterministic verification pipeline. You can optionally connect a local, self-hosted Ollama model for natural-language extraction.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{ background: '#181817', borderColor: '#262625', color: '#FFFFEB' }}
            >
              <OrbIndicator status={ollamaStatus?.available ? 'verified' : 'offline'} size={8} />
              <span>{ollamaStatus?.available ? 'Ollama Detected' : 'Ollama Offline'}</span>
            </span>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer border bg-[#181817] border-[#262625]"
              title="Refresh connection status"
            >
              <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div
          className="p-3.5 rounded-xl border text-xs font-mono"
          style={{ background: '#181817', borderColor: '#262625' }}
        >
          <div className="font-semibold text-slate-300">Connection Status:</div>
          <p className="text-slate-400 mt-0.5">
            {ollamaStatus?.available
              ? `Connected to ${ollamaStatus.host}. Models available: ${
                  ollamaStatus.models.length > 0 ? ollamaStatus.models.join(', ') : 'None pulled yet'
                }`
              : 'Local Ollama service was not detected on localhost:11434. The application is running in deterministic mode.'}
          </p>
        </div>

        <div className="pt-2 border-t border-[#242423] flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#FFFFEB]">
              Auto-start & connect to Ollama engine
            </div>
            <div className="text-[11px] text-[#777777] mt-0.5">
              Launch local daemon on port 11434 when truth starts on Windows.
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={autoStartOllama}
            onClick={() => setAutoStartOllama(!autoStartOllama)}
            className={`w-11 h-6 rounded-full px-0.5 transition-colors cursor-pointer relative shrink-0 border flex items-center ${
              autoStartOllama ? 'bg-amber-400 border-amber-300' : 'bg-[#222221] border-[#383837]'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full shadow-md transition-transform duration-200 ${
                autoStartOllama ? 'bg-[#141414] translate-x-5' : 'bg-[#777777] translate-x-0'
              }`}
            />
          </button>
        </div>

        <form onSubmit={handleSaveOllama} className="space-y-3.5 pt-2 border-t border-[#242423]">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enable-ollama-cb"
              checked={enabledInput}
              onChange={(e) => setEnabledInput(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded cursor-pointer"
            />
            <label htmlFor="enable-ollama-cb" className="text-xs font-semibold text-[#FFFFEB] cursor-pointer">
              Enable Local Ollama for grounded claim summaries
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 font-mono uppercase">
                Daemon Endpoint
              </label>
              <input
                type="text"
                value={baseUrlInput}
                onChange={(e) => setBaseUrlInput(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full p-2.5 rounded-xl text-xs font-mono text-[#FFFFEB] border focus:outline-hidden focus:border-amber-400"
                style={{ background: '#121211', borderColor: '#262625' }}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 font-mono uppercase">
                Model Identifier
              </label>
              <input
                type="text"
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                placeholder="llama3.2, mistral, llama3"
                className="w-full p-2.5 rounded-xl text-xs font-mono text-[#FFFFEB] border focus:outline-hidden focus:border-amber-400"
                style={{ background: '#121211', borderColor: '#262625' }}
              />
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">
              Settings persist locally.
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#141414] font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Save AI Configuration
            </button>
          </div>
        </form>
      </div>

      <div
        className="p-6 rounded-2xl border space-y-4"
        style={{ background: '#161615', borderColor: '#262625' }}
      >
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-[#FFFFEB]">
            App Reset & Onboarding Setup
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          If you want to re-run the interactive onboarding wizard or reset application data back to defaults, use the options below.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#242423]">
          <div>
            <div className="text-xs font-semibold text-[#FFFFEB]">
              Rerun Onboarding Wizard
            </div>
            <div className="text-[11px] text-slate-500">
              Relaunch the interactive 4-step setup and Texas particle intro.
            </div>
          </div>

          <button
            type="button"
            onClick={handleRerunOnboarding}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#141414] rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            Rerun Setup Wizard
          </button>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#242423]">
          <div>
            <div className="text-xs font-semibold text-rose-300">
              Clear Local Data & Cache
            </div>
            <div className="text-[11px] text-slate-500">
              Reset district preferences and clear cached investigations.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            Reset All Preferences
          </button>
        </div>

        {resetConfirm && (
          <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs space-y-2 mt-3">
            <div className="font-bold text-rose-300">Are you sure?</div>
            <p className="text-rose-200">
              This will reset your selected district to defaults, clear cached investigation queries, and reset onboarding.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleResetData}
                className="px-3.5 py-1.5 bg-rose-600 text-white font-semibold rounded-xl text-xs hover:bg-rose-500 cursor-pointer"
              >
                Yes, Reset Everything
              </button>
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="px-3.5 py-1.5 rounded-xl border text-slate-300 hover:text-white cursor-pointer bg-[#222] border-[#333]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

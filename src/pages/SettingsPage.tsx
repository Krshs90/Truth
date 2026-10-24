import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';
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
  } = useCivic();

  const [baseUrlInput, setBaseUrlInput] = useState(ollamaConfig.baseUrl);
  const [modelInput, setModelInput] = useState(ollamaConfig.model);
  const [enabledInput, setEnabledInput] = useState(ollamaConfig.enabled);
  const [isTesting, setIsTesting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

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

  const handleReset = () => {
    resetAllData();
    setResetConfirm(false);
    setSaveMessage('All local preferences and cached investigations cleared.');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
            Settings & Local Configuration
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed opacity-90">
            Manage your district preferences, local privacy controls, and optional local AI inference settings.
          </p>
        </div>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => setShowWizard(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch District Setup Wizard</span>
        </motion.button>
      </div>

      <OnboardingModal isOpen={showWizard} onClose={() => setShowWizard(false)} />

      {saveMessage && (
        <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Privacy Charter Card */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-4"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-[#FFFFEB]">
            Privacy & Data Architecture Standards
          </h2>
        </div>
        <div
          className="text-xs text-slate-300 space-y-2 leading-relaxed p-4 rounded-2xl border"
          style={{
            background: '#242424',
            borderColor: '#2F2F2F',
          }}
        >
          <p>
            <strong className="text-[#FFFFEB]">No User Profiling:</strong> Truth never requires an account or email to browse district records, compare candidates, or investigate claims.
          </p>
          <p>
            <strong className="text-[#FFFFEB]">Zero Location Tracking:</strong> Your ZIP code and manual district preferences are stored exclusively on your device in HTML5 LocalStorage. We do not maintain a server-side profile of your home address or political preferences.
          </p>
          <p>
            <strong className="text-[#FFFFEB]">Zero Hosted Paid AI:</strong> We do not transmit your submitted claims or research queries to commercial cloud AI vendors (OpenAI, Anthropic, etc.).
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 flex-wrap gap-2">
          <span className="text-slate-400 font-mono">
            Active Districts: TX CD-{selectedCongressional.districtNumber} • SD-{selectedStateSenate.districtNumber} • HD-{selectedStateHouse.districtNumber}
          </span>
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local Browser Storage</span>
          </button>
        </div>

        {resetConfirm && (
          <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl text-xs space-y-2">
            <div className="font-bold text-rose-300">Are you sure?</div>
            <p className="text-rose-200">
              This will reset your selected district to defaults and remove locally saved user investigation reports.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 bg-rose-600 text-white font-semibold rounded-xl text-xs hover:bg-rose-500 cursor-pointer"
              >
                Yes, Reset Everything
              </button>
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="px-3.5 py-1.5 rounded-xl border text-slate-300 hover:text-white cursor-pointer"
                style={{
                  background: '#242424',
                  borderColor: '#2F2F2F',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Optional Local Ollama AI Settings */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-5"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-[#FFFFEB]">
                Optional Local AI Inference (Ollama)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Truth is 100% functional out of the box using our deterministic verification pipeline. You can optionally connect a local, self-hosted Ollama model (e.g. Llama 3) for enhanced natural-language summaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
                color: '#FFFFEB',
              }}
            >
              <OrbIndicator status={ollamaStatus?.available ? 'verified' : 'offline'} size={8} />
              <span>{ollamaStatus?.available ? 'Ollama Detected' : 'Ollama Offline'}</span>
            </span>

            <motion.button
              whileTap={{ rotate: 180 }}
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer border"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
              }}
              title="Refresh connection status"
            >
              <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Status Message */}
        <div
          className="p-4 rounded-2xl border text-xs space-y-1 font-mono"
          style={{
            background: '#242424',
            borderColor: '#2F2F2F',
          }}
        >
          <div className="font-semibold text-slate-300">Connection Status:</div>
          <p className="text-slate-400">
            {ollamaStatus?.available
              ? `Connected to ${ollamaStatus.host}. Models available: ${
                  ollamaStatus.models.length > 0 ? ollamaStatus.models.join(', ') : 'None pulled yet'
                }`
              : 'Local Ollama service was not detected on localhost:11434. The application is running in deterministic mode.'}
          </p>
        </div>

        <form onSubmit={handleSaveOllama} className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enable-ollama"
              checked={enabledInput}
              onChange={(e) => setEnabledInput(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
            <label htmlFor="enable-ollama" className="text-xs font-semibold text-[#FFFFEB] cursor-pointer">
              Enable Local Ollama for grounded claim summaries
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                Ollama Endpoint URL
              </label>
              <input
                type="text"
                value={baseUrlInput}
                onChange={(e) => setBaseUrlInput(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full p-2.5 rounded-xl text-xs font-mono text-[#FFFFEB] border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                style={{
                  background: '#242424',
                  borderColor: '#2F2F2F',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                Model Name
              </label>
              <input
                type="text"
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                placeholder="llama3, mistral, llama3.2"
                className="w-full p-2.5 rounded-xl text-xs font-mono text-[#FFFFEB] border focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                style={{
                  background: '#242424',
                  borderColor: '#2F2F2F',
                }}
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Settings persist in browser LocalStorage.
            </span>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Save Ollama Settings
            </motion.button>
          </div>
        </form>
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

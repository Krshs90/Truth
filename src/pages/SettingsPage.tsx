import React, { useState } from 'react';
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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Settings & Local Configuration
          </h1>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Manage your district preferences, local privacy controls, and optional local AI inference settings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowWizard(true)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Launch District Setup Wizard</span>
        </button>
      </div>

      <OnboardingModal isOpen={showWizard} onClose={() => setShowWizard(false)} />

      {saveMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Privacy Charter Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            Privacy & Data Architecture Standards
          </h2>
        </div>
        <div className="text-xs text-slate-700 space-y-2 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p>
            <strong>No User Profiling:</strong> Truth never requires an account or email to browse district records, compare candidates, or investigate claims.
          </p>
          <p>
            <strong>Zero Location Tracking:</strong> Your ZIP code and manual district preferences are stored exclusively on your device in HTML5 LocalStorage. We do not maintain a server-side profile of your home address or political preferences.
          </p>
          <p>
            <strong>Zero Hosted Paid AI:</strong> We do not transmit your submitted claims or research queries to commercial cloud AI vendors (OpenAI, Anthropic, etc.).
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-2">
          <span className="text-slate-500">
            Active Districts: TX CD-{selectedCongressional.districtNumber} • SD-{selectedStateSenate.districtNumber} • HD-{selectedStateHouse.districtNumber}
          </span>
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local Browser Storage</span>
          </button>
        </div>

        {resetConfirm && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-2">
            <div className="font-bold text-rose-900">Are you sure?</div>
            <p className="text-rose-800">
              This will reset your selected district to defaults and remove locally saved user investigation reports.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded text-xs hover:bg-rose-700"
              >
                Yes, Reset Everything
              </button>
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Optional Local Ollama AI Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Optional Local AI Inference (Ollama)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Truth is 100% functional out of the box using our deterministic verification pipeline. You can optionally connect a local, self-hosted Ollama model (e.g. Llama 3) for enhanced natural-language summaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                ollamaStatus?.available
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  ollamaStatus?.available ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
              <span>{ollamaStatus?.available ? 'Ollama Detected' : 'Ollama Offline'}</span>
            </span>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Refresh connection status"
            >
              <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Status Message */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
          <div className="font-semibold text-slate-800">Connection Status:</div>
          <p className="text-slate-600">
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
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="enable-ollama" className="text-xs font-semibold text-slate-900 cursor-pointer">
              Enable Local Ollama for grounded claim summaries
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ollama Endpoint URL
              </label>
              <input
                type="text"
                value={baseUrlInput}
                onChange={(e) => setBaseUrlInput(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model Name
              </label>
              <input
                type="text"
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                placeholder="llama3, mistral, llama3.2"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Settings persist in browser LocalStorage.
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
            >
              Save Ollama Settings
            </button>
          </div>
        </form>
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

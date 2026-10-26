import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { OFFICIALS } from '../../data/officials';
import { BorderBeam } from '../ui/border-beam';
import { CustomSelect } from '../ui/CustomSelect';
import { FormattedChatMessage, ChatSourceItem } from './FormattedChatMessage';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: ChatSourceItem[];
}

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 12.6667V3.33333M12.6667 8L8 3.33333L3.33333 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const SiriOllamaBar: React.FC = () => {
  const {
    ollamaConfig,
    ollamaStatus,
    updateOllamaConfig,
    aiMasterEnabled,
    setAiMasterEnabled,
    selectedCongressional,
    selectedStateSenate,
    selectedStateHouse,
  } = useCivic();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('truth_siri_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isThinking, setIsThinking] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState<string>('Analyzing query...');
  const [isClearing, setIsClearing] = useState(false);
  const [clearNotice, setClearNotice] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(ollamaConfig.model || 'llama3.2:1b');

  const containerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableModels = useMemo(() => {
    if (ollamaStatus?.models && ollamaStatus.models.length > 0) {
      return ollamaStatus.models;
    }
    return ['llama3.2:1b', 'llama3:8b', 'llama3:latest', 'qwen2.5:14b', 'mistral:latest'];
  }, [ollamaStatus]);

  useEffect(() => {
    if (ollamaStatus?.models?.length && !ollamaStatus.models.includes(selectedModel)) {
      const preferred = ollamaStatus.models.find(
        (m) => m.includes('1b') || m.includes('3.2') || m.includes('llama3')
      );
      if (preferred) setSelectedModel(preferred);
    }
  }, [ollamaStatus, selectedModel]);

  useEffect(() => {
    try {
      localStorage.setItem('truth_siri_chat_history', JSON.stringify(messages.slice(-20)));
    } catch {
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isThinking, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleOpenAi = (e: Event) => {
      const custom = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      if (custom.detail?.query) {
        setInputMessage(custom.detail.query);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 120);
      }
    };

    window.addEventListener('truth-open-ai-chat', handleOpenAi);
    return () => window.removeEventListener('truth-open-ai-chat', handleOpenAi);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const userSpecificQuestions = useMemo(() => {
    const cdNum = selectedCongressional.districtNumber;
    const sdNum = selectedStateSenate.districtNumber;
    const hdNum = selectedStateHouse.districtNumber;

    const repOfficial = OFFICIALS.find((o) => o.district.includes(`District ${cdNum}`));
    const senOfficial = OFFICIALS.find((o) => o.district.includes(`District ${sdNum}`));
    const houseOfficial = OFFICIALS.find((o) => o.district.includes(`District ${hdNum}`));

    return [
      `What are Rep. ${repOfficial?.name || `TX-${cdNum} Representative`}'s key votes in Congress?`,
      `What bills has Sen. ${senOfficial?.name || `SD-${sdNum} Senator`} sponsored in Texas?`,
      `How does Texas House District ${hdNum} (${houseOfficial?.name || 'Representative'}) handle school funding?`,
      'What is the current status of Texas property tax relief under SB 2 in 2026?',
    ];
  }, [selectedCongressional, selectedStateSenate, selectedStateHouse]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isThinking || !aiMasterEnabled) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    const hasUrl = /https?:\/\/[^\s]+/i.test(text);
    const hasEntity = /paxton|abbott|patrick|cruz|allred|doggett|vouchers?|border|tax|propaganda|scandal|claim|lawsuit|investigation|statement|news|2026/i.test(text);

    let phases: string[];
    if (hasUrl) {
      phases = [
        'Retrieving live web article from URL...',
        'Parsing verified text & citations...',
        'Synthesizing nonpartisan intelligence...',
      ];
    } else if (hasEntity) {
      phases = [
        'Searching 2026 Texas public records & live news...',
        'Cross-referencing official statements & court records...',
        'Synthesizing evidence with Ollama...',
      ];
    } else {
      phases = [
        'Processing with local Ollama engine...',
        'Synthesizing on-device response...',
      ];
    }

    setThinkingPhase(phases[0]);
    let phaseIdx = 0;
    const phaseInterval = setInterval(() => {
      phaseIdx = (phaseIdx + 1) % phases.length;
      setThinkingPhase(phases[phaseIdx]);
    }, 1400);

    try {
      const resp = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          model: selectedModel,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok) {
        throw new Error(`Inference returned status ${resp.status}`);
      }

      const data = await resp.json();
      const replyText = data.reply || data.response || 'No response generated from local model.';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content: `Could not reach local model \`${selectedModel}\` (${err?.message || 'offline'}). Ensure Ollama is running on port 11434.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      clearInterval(phaseInterval);
      setIsThinking(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInvestigateClaim = (query: string) => {
    setIsOpen(false);
    navigate(`/investigate?q=${encodeURIComponent(query.slice(0, 140))}`);
  };

  const handleClearChat = () => {
    setIsClearing(true);
    setTimeout(() => {
      setMessages([]);
      localStorage.removeItem('truth_siri_chat_history');
      setIsClearing(false);
      setClearNotice(true);
      setTimeout(() => setClearNotice(false), 2200);
    }, 200);
  };

  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    updateOllamaConfig({ ...ollamaConfig, model });
  };

  return (
    <div ref={containerRef} className="relative select-none">
      <BorderBeam size="sm" colorVariant={aiMasterEnabled ? "colorful" : "mono"}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all select-none cursor-pointer ${
            !aiMasterEnabled
              ? 'bg-[#181817] text-stone-400 border border-[#2f2f2e]'
              : isOpen
              ? 'bg-[#222221] text-[#FFFFEB]'
              : 'bg-[#161615] text-stone-200 hover:text-white'
          }`}
          style={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 235, 0.06)',
          }}
          title={aiMasterEnabled ? "Talk with Ollama (Ctrl+J)" : "AI Disabled (Click to review or enable)"}
        >
          <Sparkles className={`w-3.5 h-3.5 shrink-0 ${aiMasterEnabled ? 'text-amber-400' : 'text-stone-500'}`} />
          <span className="font-medium tracking-tight">
            {aiMasterEnabled ? 'Talk with Ollama' : 'AI Disabled'}
          </span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#252524] text-stone-400 border border-[#333] leading-none">
            ⌘J
          </kbd>
        </button>
      </BorderBeam>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.94, scaleX: 0.98, y: -4 }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.94, scaleX: 0.98, y: -4 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            style={{
              transformOrigin: 'top center',
              background: '#161615',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] max-w-[94vw] z-50 rounded-2xl overflow-hidden flex flex-col max-h-[540px]"
          >
            <BorderBeam size="md" colorVariant="colorful">
              <div className="flex flex-col h-full w-full">
                <div className="px-4 py-2.5 border-b border-[#242423] flex items-center justify-between gap-3 bg-[#191918]">
                  <span className="text-xs font-serif font-bold text-[#FFFFEB] flex items-center gap-1.5">
                    <span>{aiMasterEnabled ? 'Ask Ollama' : 'Ask Ollama (Disabled)'}</span>
                    {!aiMasterEnabled && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        OFFLINE
                      </span>
                    )}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-300">
                      <span className="text-[11px] text-stone-400 font-mono">
                        Model:
                      </span>
                      <CustomSelect
                        size="sm"
                        variant="bordered"
                        value={selectedModel}
                        onChange={handleSelectModel}
                        disabled={!aiMasterEnabled}
                        options={availableModels.map((m) => ({
                          value: m,
                          label: m,
                          badge: m.includes(':') ? m.split(':')[1] : undefined,
                        }))}
                        className="w-40 sm:w-44"
                        menuClassName="w-56 right-0"
                        align="right"
                        aria-label="Select Ollama Model"
                      />
                    </div>

                    {messages.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearChat}
                        disabled={isClearing}
                        className="p-1 rounded text-stone-400 hover:text-stone-200 hover:bg-[#252524] transition-colors cursor-pointer"
                        title="Clear conversation"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 transition-transform duration-300 ${isClearing ? 'rotate-180 text-amber-400' : ''}`} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded text-stone-400 hover:text-stone-200 hover:bg-[#252524] transition-colors cursor-pointer"
                      title="Close (Esc)"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {!aiMasterEnabled && (
                  <div className="p-3 bg-amber-400/10 border-b border-amber-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>AI Inference Devices Disabled</span>
                      </div>
                      <p className="text-[11px] text-stone-400 max-w-md">
                        Neural text generation and chat are turned off. Truth continues running in 100% deterministic mode against primary legislative records.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiMasterEnabled(true)}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
                    >
                      Enable AI Devices
                    </button>
                  </div>
                )}

                <AnimatePresence>
                  {clearNotice && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-amber-400/10 border-b border-amber-400/20 py-1 px-4 text-center text-[11px] font-mono text-amber-300"
                    >
                      Conversation cleared
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  ref={chatContainerRef}
                  className="p-4 max-h-[340px] min-h-[180px] overflow-y-auto space-y-3 no-scrollbar"
                >
                  {messages.length === 0 ? (
                    <div className="space-y-3 py-2">
                      <p className="text-xs text-stone-400 text-center font-sans">
                        Ask about Texas bills, candidates, or your local delegation:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {userSpecificQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(q)}
                            className="p-2.5 rounded-xl border border-[#272726] bg-[#1a1a19] hover:bg-[#222221] hover:border-amber-400/40 text-left text-xs text-stone-300 hover:text-[#FFFFEB] transition-all flex items-start gap-2 group cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400/70 group-hover:text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{q}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[92%] rounded-xl p-3 text-xs leading-relaxed space-y-1.5 ${
                              msg.role === 'user'
                                ? 'bg-[#252524] border border-[#353534] text-stone-100 rounded-br-xs'
                                : 'bg-[#1a1a19] border border-[#272726] text-stone-200 rounded-bl-xs'
                            }`}
                          >
                            {msg.role === 'assistant' ? (
                              <FormattedChatMessage content={msg.content} sources={msg.sources} />
                            ) : (
                              <div className="whitespace-pre-wrap font-sans text-stone-100">
                                {msg.content}
                              </div>
                            )}

                            {msg.role === 'assistant' && (
                              <div className="flex items-center gap-2 pt-1 border-t border-[#252524] text-[10px]">
                                <button
                                  type="button"
                                  onClick={() => handleCopyMessage(msg.id, msg.content)}
                                  className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>

                                <span className="text-[#444]">•</span>

                                <button
                                  type="button"
                                  onClick={() => handleInvestigateClaim(msg.content)}
                                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                                >
                                  <span>Verify in Dossier</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>

                                <span className="ml-auto text-stone-500 font-mono">
                                  {msg.timestamp}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}

                  <AnimatePresence>
                    {isThinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1a1a19] border border-[#272726] max-w-md shadow-xs"
                      >
                        <div className="flex items-center gap-1 h-3.5 shrink-0">
                          <div className="w-1 bg-amber-400 rounded-full animate-[siriWaveBar_0.8s_ease-in-out_infinite]" />
                          <div className="w-1 bg-pink-500 rounded-full animate-[siriWaveBar_0.8s_ease-in-out_0.2s_infinite]" />
                          <div className="w-1 bg-purple-500 rounded-full animate-[siriWaveBar_0.8s_ease-in-out_0.4s_infinite]" />
                          <div className="w-1 bg-cyan-400 rounded-full animate-[siriWaveBar_0.8s_ease-in-out_0.6s_infinite]" />
                        </div>
                        <motion.span
                          key={thinkingPhase}
                          initial={{ opacity: 0, x: 4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.15 }}
                          className="text-xs text-amber-300/90 font-mono"
                        >
                          {thinkingPhase}
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-3 bg-[#131312] border-t border-[#242423]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="relative flex items-center"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={
                        aiMasterEnabled
                          ? 'Ask a question or paste a URL...'
                          : "AI inference is disabled. Click 'Enable AI Devices' above to chat."
                      }
                      disabled={!aiMasterEnabled || isThinking}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl text-xs text-[#FFFFEB] bg-[#1d1d1d] border border-[#2d2d2c] focus:border-amber-400/80 focus:outline-hidden placeholder:text-stone-500 font-sans disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={!aiMasterEnabled || !inputMessage.trim() || isThinking}
                      className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        aiMasterEnabled && inputMessage.trim() && !isThinking
                          ? 'bg-amber-400 text-stone-950 hover:bg-amber-300 cursor-pointer shadow-xs'
                          : 'text-stone-600 cursor-not-allowed'
                      }`}
                      title={aiMasterEnabled ? 'Send query' : 'AI devices are disabled'}
                    >
                      <ArrowUpIcon />
                    </button>
                  </form>
                </div>
              </div>
            </BorderBeam>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiriOllamaBar;

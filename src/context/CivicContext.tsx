import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { TexasDistrict, OllamaConfig, Claim, DynamicCampaignUpdate, DynamicLegislativeBill } from '../types';
import { TEXAS_DISTRICTS, findDistrictsByZip } from '../data/districts';
import { CLAIMS } from '../data/claims';
import { BILLS } from '../data/bills';
import { LIVE_CIVIC_SEED } from '../data/liveCivicSeed';

interface CivicContextType {
  selectedCongressional: TexasDistrict;
  selectedStateSenate: TexasDistrict;
  selectedStateHouse: TexasDistrict;
  setCongressional: (id: string) => void;
  setStateSenate: (id: string) => void;
  setStateHouse: (id: string) => void;
  lookupByZip: (zip: string) => { notes: string };
  isManualDistrict: boolean;
  activeZip: string;
  ollamaConfig: OllamaConfig;
  updateOllamaConfig: (updates: Partial<OllamaConfig>) => void;
  ollamaStatus: { available: boolean; models: string[]; host: string } | null;
  checkOllamaHealth: () => Promise<void>;
  autoStartOllama: boolean;
  setAutoStartOllama: (val: boolean) => void;
  aiMasterEnabled: boolean;
  setAiMasterEnabled: (val: boolean) => void;
  resetAllData: () => void;
  savedClaims: any[];
  saveClaimLocally: (claim: any) => void;
  removeSavedClaimLocally: (id: string) => void;
  isClaimSavedLocally: (id: string) => boolean;
  dynamicClaims: Claim[];
  dynamicBills: DynamicLegislativeBill[];
  dynamicCampaignUpdates: DynamicCampaignUpdate[];
  allClaims: Claim[];
  allBills: any[];
  isSyncingFeeds: boolean;
  lastSyncedTimestamp: string | null;
  triggerLiveSync: () => Promise<void>;
  syncStats: {
    totalClaims: number;
    dynamicItemsCount: number;
    lastSyncedAgo: string;
  };
}

const DEFAULT_CD = TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-37')!;
const DEFAULT_SD = TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-14')!;
const DEFAULT_HD = TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-49')!;

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeZip, setActiveZip] = useState<string>(() => {
    return localStorage.getItem('truth_active_zip') || '78701';
  });

  const [isManualDistrict, setIsManualDistrict] = useState<boolean>(() => {
    return localStorage.getItem('truth_is_manual_district') === 'true';
  });

  const [selectedCongressional, setSelectedCongressionalState] = useState<TexasDistrict>(() => {
    const savedId = localStorage.getItem('truth_selected_cd');
    return TEXAS_DISTRICTS.find((d) => d.id === savedId && d.type === 'congressional') || DEFAULT_CD;
  });

  const [selectedStateSenate, setSelectedStateSenateState] = useState<TexasDistrict>(() => {
    const savedId = localStorage.getItem('truth_selected_sd');
    return TEXAS_DISTRICTS.find((d) => d.id === savedId && d.type === 'state_senate') || DEFAULT_SD;
  });

  const [selectedStateHouse, setSelectedStateHouseState] = useState<TexasDistrict>(() => {
    const savedId = localStorage.getItem('truth_selected_hd');
    return TEXAS_DISTRICTS.find((d) => d.id === savedId && d.type === 'state_house') || DEFAULT_HD;
  });

  const [ollamaConfig, setOllamaConfig] = useState<OllamaConfig>(() => {
    const saved = localStorage.getItem('truth_ollama_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    return {
      baseUrl: 'http://localhost:11434',
      model: 'llama3',
      enabled: false,
    };
  });

  const [ollamaStatus, setOllamaStatus] = useState<{ available: boolean; models: string[]; host: string } | null>(null);

  const [aiMasterEnabled, setAiMasterEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('truth_ai_master_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const setAiMasterEnabled = (val: boolean) => {
    setAiMasterEnabledState(val);
    localStorage.setItem('truth_ai_master_enabled', val ? 'true' : 'false');
    updateOllamaConfig({ enabled: val });
  };

  const [autoStartOllama, setAutoStartOllamaState] = useState<boolean>(() => {
    return localStorage.getItem('truth_auto_start_ollama') === 'true';
  });

  const setAutoStartOllama = (val: boolean) => {
    setAutoStartOllamaState(val);
    localStorage.setItem('truth_auto_start_ollama', val ? 'true' : 'false');
    if (val && !ollamaConfig.enabled) {
      updateOllamaConfig({ enabled: true });
    }
  };

  const checkOllamaHealth = async () => {
    try {
      const res = await fetch('/api/ai/health');
      if (res.ok) {
        const data = await res.json();
        setOllamaStatus(data);
      } else {
        setOllamaStatus({ available: false, models: [], host: ollamaConfig.baseUrl });
      }
    } catch {
      setOllamaStatus({ available: false, models: [], host: ollamaConfig.baseUrl });
    }
  };

  const [savedClaims, setSavedClaims] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('truth_saved_claims');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const saveClaimLocally = (claim: any) => {
    setSavedClaims((prev) => {
      const filtered = prev.filter((c) => c.id !== claim.id && c.claimText !== claim.claimText);
      const updated = [claim, ...filtered];
      try {
        localStorage.setItem('truth_saved_claims', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeSavedClaimLocally = (id: string) => {
    setSavedClaims((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem('truth_saved_claims', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isClaimSavedLocally = (id: string) => {
    return savedClaims.some((c) => c.id === id);
  };

  const [dynamicClaims, setDynamicClaims] = useState<Claim[]>(() => {
    try {
      const saved = localStorage.getItem('truth_dynamic_claims_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((c: any) => c.assessment?.verdict === 'Unverified')) {
          return parsed;
        }
      }
    } catch {}
    return (LIVE_CIVIC_SEED?.claims as Claim[]) || [];
  });
  const [dynamicBills, setDynamicBills] = useState<DynamicLegislativeBill[]>(() => {
    try {
      const saved = localStorage.getItem('truth_dynamic_bills_cache');
      if (saved) return JSON.parse(saved);
    } catch {}
    return (LIVE_CIVIC_SEED?.bills as DynamicLegislativeBill[]) || [];
  });
  const [dynamicCampaignUpdates, setDynamicCampaignUpdates] = useState<DynamicCampaignUpdate[]>(() => {
    try {
      const saved = localStorage.getItem('truth_dynamic_campaign_cache');
      if (saved) return JSON.parse(saved);
    } catch {}
    return (LIVE_CIVIC_SEED?.campaignUpdates as DynamicCampaignUpdate[]) || [];
  });
  const [isSyncingFeeds, setIsSyncingFeeds] = useState<boolean>(false);
  const [lastSyncedTimestamp, setLastSyncedTimestamp] = useState<string | null>(() => {
    return LIVE_CIVIC_SEED?.lastSyncedAt || null;
  });

  const fetchDynamicFeed = async () => {
    try {
      const resp = await fetch('/api/civic/dynamic-feed');
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          if (Array.isArray(data.claims)) {
            setDynamicClaims(data.claims);
            try { localStorage.setItem('truth_dynamic_claims_cache', JSON.stringify(data.claims)); } catch {}
          }
          if (Array.isArray(data.bills)) {
            setDynamicBills(data.bills);
            try { localStorage.setItem('truth_dynamic_bills_cache', JSON.stringify(data.bills)); } catch {}
          }
          if (Array.isArray(data.campaignUpdates)) {
            setDynamicCampaignUpdates(data.campaignUpdates);
            try { localStorage.setItem('truth_dynamic_campaign_cache', JSON.stringify(data.campaignUpdates)); } catch {}
          }
          if (data.lastSyncedAt) setLastSyncedTimestamp(data.lastSyncedAt);
        }
      }
    } catch {
    }
  };

  const triggerLiveSync = async () => {
    setIsSyncingFeeds(true);
    try {
      const resp = await fetch('/api/civic/trigger-sync', { method: 'POST' });
      if (resp.ok) {
        await fetchDynamicFeed();
      }
    } catch {
    } finally {
      setIsSyncingFeeds(false);
    }
  };

  const allClaims = useMemo(() => {
    const claimMap = new Map<string, Claim>();
    for (const c of CLAIMS) {
      const key = c.claimText.trim().toLowerCase();
      if (c.assessment?.verdict && c.assessment.verdict !== 'Unchecked') {
        claimMap.set(key, c);
      }
    }
    for (const c of dynamicClaims) {
      const key = c.claimText.trim().toLowerCase();
      if (!claimMap.has(key) && c.assessment?.verdict && c.assessment.verdict !== 'Unchecked') {
        claimMap.set(key, c);
      }
    }
    return Array.from(claimMap.values());
  }, [dynamicClaims]);

  const allBills = useMemo(() => {
    const billMap = new Map<string, any>();
    for (const b of dynamicBills) {
      const key = b.billNumber.trim().toLowerCase();
      if (!billMap.has(key)) billMap.set(key, b);
    }
    for (const b of BILLS) {
      const key = b.officialBillNumber.trim().toLowerCase();
      if (!billMap.has(key)) billMap.set(key, b);
    }
    return Array.from(billMap.values());
  }, [dynamicBills]);

  const syncStats = useMemo(() => {
    const dynamicItemsCount = dynamicClaims.length + dynamicBills.length + dynamicCampaignUpdates.length;
    let lastSyncedAgo = 'Just now';
    if (lastSyncedTimestamp) {
      const diffSec = Math.floor((Date.now() - new Date(lastSyncedTimestamp).getTime()) / 1000);
      if (diffSec < 60) lastSyncedAgo = 'Just now';
      else if (diffSec < 3600) lastSyncedAgo = `${Math.floor(diffSec / 60)}m ago`;
      else lastSyncedAgo = `${Math.floor(diffSec / 3600)}h ago`;
    }
    return {
      totalClaims: allClaims.length,
      dynamicItemsCount,
      lastSyncedAgo,
    };
  }, [dynamicClaims, dynamicBills, dynamicCampaignUpdates, allClaims, lastSyncedTimestamp]);

  useEffect(() => {
    if (import.meta.env?.MODE === 'test') {
      return;
    }
    checkOllamaHealth();
    fetchDynamicFeed();
  }, []);

  const setCongressional = (id: string) => {
    const found = TEXAS_DISTRICTS.find((d) => d.id === id && d.type === 'congressional');
    if (found) {
      setSelectedCongressionalState(found);
      setIsManualDistrict(true);
      localStorage.setItem('truth_selected_cd', found.id);
      localStorage.setItem('truth_is_manual_district', 'true');
    }
  };

  const setStateSenate = (id: string) => {
    const found = TEXAS_DISTRICTS.find((d) => d.id === id && d.type === 'state_senate');
    if (found) {
      setSelectedStateSenateState(found);
      setIsManualDistrict(true);
      localStorage.setItem('truth_selected_sd', found.id);
      localStorage.setItem('truth_is_manual_district', 'true');
    }
  };

  const setStateHouse = (id: string) => {
    const found = TEXAS_DISTRICTS.find((d) => d.id === id && d.type === 'state_house');
    if (found) {
      setSelectedStateHouseState(found);
      setIsManualDistrict(true);
      localStorage.setItem('truth_selected_hd', found.id);
      localStorage.setItem('truth_is_manual_district', 'true');
    }
  };

  const lookupByZip = (zip: string) => {
    setActiveZip(zip);
    localStorage.setItem('truth_active_zip', zip);
    const result = findDistrictsByZip(zip);
    if (result.congressional) {
      setSelectedCongressionalState(result.congressional);
      localStorage.setItem('truth_selected_cd', result.congressional.id);
    }
    if (result.stateSenate) {
      setSelectedStateSenateState(result.stateSenate);
      localStorage.setItem('truth_selected_sd', result.stateSenate.id);
    }
    if (result.stateHouse) {
      setSelectedStateHouseState(result.stateHouse);
      localStorage.setItem('truth_selected_hd', result.stateHouse.id);
    }
    setIsManualDistrict(false);
    localStorage.setItem('truth_is_manual_district', 'false');
    return { notes: result.notes };
  };

  const updateOllamaConfig = (updates: Partial<OllamaConfig>) => {
    setOllamaConfig((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('truth_ollama_config', JSON.stringify(next));
      return next;
    });
  };

  const resetAllData = () => {
    localStorage.clear();
    setSelectedCongressionalState(DEFAULT_CD);
    setSelectedStateSenateState(DEFAULT_SD);
    setSelectedStateHouseState(DEFAULT_HD);
    setActiveZip('78701');
    setIsManualDistrict(false);
    setOllamaConfig({
      baseUrl: 'http://localhost:11434',
      model: 'llama3',
      enabled: false,
    });
    setAutoStartOllamaState(false);
    setAiMasterEnabledState(true);
  };

  return (
    <CivicContext.Provider
      value={{
        selectedCongressional,
        selectedStateSenate,
        selectedStateHouse,
        setCongressional,
        setStateSenate,
        setStateHouse,
        lookupByZip,
        isManualDistrict,
        activeZip,
        ollamaConfig,
        updateOllamaConfig,
        ollamaStatus,
        checkOllamaHealth,
        autoStartOllama,
        setAutoStartOllama,
        aiMasterEnabled,
        setAiMasterEnabled,
        resetAllData,
        savedClaims,
        saveClaimLocally,
        removeSavedClaimLocally,
        isClaimSavedLocally,
        dynamicClaims,
        dynamicBills,
        dynamicCampaignUpdates,
        allClaims,
        allBills,
        isSyncingFeeds,
        lastSyncedTimestamp,
        triggerLiveSync,
        syncStats,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = (): CivicContextType => {
  const ctx = useContext(CivicContext);
  if (!ctx) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return ctx;
};

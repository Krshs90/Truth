import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TexasDistrict, OllamaConfig } from '../types';
import { TEXAS_DISTRICTS, findDistrictsByZip } from '../data/districts';

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
  resetAllData: () => void;
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
        // fallback
      }
    }
    return {
      baseUrl: 'http://localhost:11434',
      model: 'llama3',
      enabled: false,
    };
  });

  const [ollamaStatus, setOllamaStatus] = useState<{ available: boolean; models: string[]; host: string } | null>(null);

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

  useEffect(() => {
    // In test environment, skip background automatic network fetch to prevent act() warnings
    if (import.meta.env?.MODE === 'test') {
      return;
    }
    checkOllamaHealth();
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
        resetAllData,
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

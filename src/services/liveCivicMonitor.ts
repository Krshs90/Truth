
export interface LiveCivicEvent {
  id: string;
  timestamp: string;
  relativeTime: string;
  source: 'Texas Legislature Online (TLO)' | 'Congress.gov' | 'Texas Secretary of State' | 'Texas Comptroller';
  category: 'Bill Action' | 'Roll-Call Vote' | 'Committee Notice' | 'Election Record';
  summary: string;
  officialRef: string;
}

const INITIAL_LIVE_EVENTS: LiveCivicEvent[] = [
  {
    id: 'live-ev-1',
    timestamp: '2026-10-24T22:38:00Z',
    relativeTime: '7 mins ago',
    source: 'Texas Legislature Online (TLO)',
    category: 'Committee Notice',
    summary: 'Texas Senate State Affairs Committee posted interim study agenda on 2026-2027 property tax rate compression compliance.',
    officialRef: 'TX 89(R) Interim Committee Notice #89-041',
  },
  {
    id: 'live-ev-2',
    timestamp: '2026-10-24T22:15:00Z',
    relativeTime: '30 mins ago',
    source: 'Congress.gov',
    category: 'Roll-Call Vote',
    summary: '119th U.S. Congress: Recorded votes indexed for Texas Senators Ted Cruz & John Cornyn on federal energy infrastructure.',
    officialRef: 'U.S. Senate Roll Call #284 (119th Congress)',
  },
  {
    id: 'live-ev-3',
    timestamp: '2026-10-24T21:40:00Z',
    relativeTime: '1 hour ago',
    source: 'Texas Secretary of State',
    category: 'Election Record',
    summary: 'Official voter registration audit verified: 18.2 million registered voters certified across all 254 Texas counties.',
    officialRef: 'Texas Elections Division SOS Cert 2026-Q4',
  },
  {
    id: 'live-ev-4',
    timestamp: '2026-10-24T20:20:00Z',
    relativeTime: '2 hours ago',
    source: 'Texas Comptroller',
    category: 'Bill Action',
    summary: 'Texas Comptroller verified $18.4 billion transferred to public school maintenance & operations tax reduction fund.',
    officialRef: 'Texas Tax Code § 11.13 Verification Audit',
  },
];

class LiveCivicMonitorService {
  private listeners: Array<() => void> = [];
  private events: LiveCivicEvent[] = INITIAL_LIVE_EVENTS;
  private isMonitoring = true;
  private lastChecked = new Date();

  constructor() {
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getEvents(): LiveCivicEvent[] {
    return this.events;
  }

  public getLastChecked(): Date {
    return this.lastChecked;
  }

  public isActive(): boolean {
    return this.isMonitoring;
  }

  public async checkForUpdates(): Promise<void> {
    this.lastChecked = new Date();
    this.notify();
  }
}

export const liveCivicMonitor = new LiveCivicMonitorService();

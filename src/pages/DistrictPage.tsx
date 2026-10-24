import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ExternalLink,
  Scale,
  FileText,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { TEXAS_DISTRICTS } from '../data/districts';
import { OFFICIALS } from '../data/officials';
import { CANDIDATES } from '../data/candidates';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';

export const DistrictPage: React.FC = () => {
  const {
    selectedCongressional,
    selectedStateSenate,
    selectedStateHouse,
    setCongressional,
    setStateSenate,
    setStateHouse,
    lookupByZip,
    isManualDistrict,
    activeZip,
  } = useCivic();

  const [zipInput, setZipInput] = useState(activeZip);
  const [zipNotes, setZipNotes] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'officials' | 'candidates'>('officials');

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length === 5) {
      const res = lookupByZip(zipInput.trim());
      setZipNotes(res.notes);
    }
  };

  const congressionalDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'congressional');
  const senateDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_senate');
  const houseDistricts = TEXAS_DISTRICTS.filter((d) => d.type === 'state_house');

  // Match officials for selected districts
  const currentOfficials = OFFICIALS.filter((o) => {
    if (o.jurisdiction === 'Federal' && o.district.includes('Statewide')) return true;
    if (o.district.includes(`District ${selectedCongressional.districtNumber}`)) return true;
    if (o.district.includes(`District ${selectedStateSenate.districtNumber}`)) return true;
    if (o.district.includes(`District ${selectedStateHouse.districtNumber}`)) return true;
    if (o.jurisdiction === 'Texas Executive') return true;
    return false;
  });

  // Match candidates for selected districts
  const districtCandidates = CANDIDATES.filter((c) => {
    if (c.district.includes('Statewide')) return true;
    if (c.district.includes(`District ${selectedStateSenate.districtNumber}`)) return true;
    return false;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FFFFEB] tracking-tight">
          My District & Representatives
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed opacity-90">
          Find your elected officials, official legislative profiles, and recorded votes. You can enter a Texas ZIP code or configure your exact districts manually below.
        </p>
      </div>

      {/* District Selection & Zip Lookup Panel */}
      <div
        className="rounded-3xl border p-6 md:p-8 space-y-6"
        style={{
          background: '#1E1E1E',
          borderColor: '#2A2A2A',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#FFFFEB] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>District Locator & Preferences</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Your preferences are stored entirely in your local browser storage. We never collect or store your address.
            </p>
          </div>
          <div>
            {isManualDistrict ? (
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border text-slate-300" style={{ background: '#262626', borderColor: '#333333' }}>
                Manual Selection Active
              </span>
            ) : (
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border text-blue-300" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                ZIP Mapped ({activeZip})
              </span>
            )}
          </div>
        </div>

        {/* ZIP Lookup Form with Explicit Electoral Disclaimer */}
        <div
          className="rounded-2xl p-4 md:p-5 border space-y-3"
          style={{
            background: '#242424',
            borderColor: '#2F2F2F',
          }}
        >
          <form onSubmit={handleZipSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                pattern="[0-9]{5}"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 5-digit Texas ZIP (e.g. 78701, 78666, 75206)"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono text-[#FFFFEB]"
                style={{
                  background: '#1A1A1A',
                  borderColor: '#333333',
                }}
              />
            </div>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer shadow-sm"
            >
              Update via ZIP
            </motion.button>
          </form>

          {zipNotes && (
            <div className="p-3 bg-blue-950/40 border border-blue-500/30 text-blue-200 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{zipNotes}</span>
            </div>
          )}

          <div className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-300">Civic Notice:</strong> A ZIP code does not uniquely identify a congressional or state legislative district. In Texas, many ZIP codes are split across multiple districts. Use the selectors below to confirm your precise districts.
            </span>
          </div>
        </div>

        {/* Manual District Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* US Congressional District */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              U.S. Congressional District
            </label>
            <select
              value={selectedCongressional.id}
              onChange={(e) => setCongressional(e.target.value)}
              className="w-full p-2.5 text-sm rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-[#FFFFEB] cursor-pointer"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
              }}
            >
              {congressionalDistricts.map((d) => (
                <option key={d.id} value={d.id} style={{ background: '#222222', color: '#FFFFEB' }}>
                  TX-{d.districtNumber}: {d.name.replace('Texas Congressional District ', 'CD-')} ({d.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Counties: {selectedCongressional.majorCounties.join(', ')}
            </p>
          </div>

          {/* Texas Senate District */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Texas Senate District
            </label>
            <select
              value={selectedStateSenate.id}
              onChange={(e) => setStateSenate(e.target.value)}
              className="w-full p-2.5 text-sm rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-[#FFFFEB] cursor-pointer"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
              }}
            >
              {senateDistricts.map((d) => (
                <option key={d.id} value={d.id} style={{ background: '#222222', color: '#FFFFEB' }}>
                  Senate District {d.districtNumber} ({d.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Counties: {selectedStateSenate.majorCounties.join(', ')}
            </p>
          </div>

          {/* Texas House District */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Texas House District
            </label>
            <select
              value={selectedStateHouse.id}
              onChange={(e) => setStateHouse(e.target.value)}
              className="w-full p-2.5 text-sm rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-[#FFFFEB] cursor-pointer"
              style={{
                background: '#222222',
                borderColor: '#2A2A2A',
              }}
            >
              {houseDistricts.map((d) => (
                <option key={d.id} value={d.id} style={{ background: '#222222', color: '#FFFFEB' }}>
                  House District {d.districtNumber} ({d.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Counties: {selectedStateHouse.majorCounties.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs: Elected Officials vs Verified Candidates */}
      <div className="space-y-4">
        <div className="border-b" style={{ borderColor: '#2A2A2A' }}>
          <nav className="flex gap-4 -mb-px">
            <button
              onClick={() => setActiveTab('officials')}
              className={`pb-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'officials'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Current Elected Officials ({currentOfficials.length})
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`pb-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'candidates'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Verified Candidates Running ({districtCandidates.length})
            </button>
          </nav>
        </div>

        {/* Tab 1: Current Elected Officials */}
        {activeTab === 'officials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentOfficials.map((official) => (
              <motion.div
                key={official.id}
                whileHover={{ y: -2, borderColor: '#3A3A3A' }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="rounded-3xl border p-6 flex flex-col justify-between"
                style={{
                  background: '#1E1E1E',
                  borderColor: '#2A2A2A',
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        {official.office}
                      </div>
                      <h3 className="text-lg font-bold text-[#FFFFEB] mt-0.5">
                        {official.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border text-slate-300" style={{ background: '#262626', borderColor: '#333333' }}>
                      {official.party}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 mt-1">
                    {official.district} • Term: {official.termExpires}
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed opacity-85">
                    {official.bioSummary}
                  </p>

                  {/* Recorded Votes Highlight */}
                  {official.recentVotes.length > 0 && (
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: '#2A2A2A' }}>
                      <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5 font-mono">
                        <Scale className="w-3.5 h-3.5 text-blue-400" />
                        <span>Documented Roll-Call Votes</span>
                      </div>
                      <div className="space-y-2">
                        {official.recentVotes.map((v, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2"
                            style={{
                              background: '#242424',
                              borderColor: '#2F2F2F',
                            }}
                          >
                            <div className="truncate">
                              <span className="font-mono font-bold text-blue-400">
                                {v.billNumber}
                              </span>
                              <span className="text-slate-300 ml-1.5 truncate">
                                {v.billTitle}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  v.vote === 'Yea'
                                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                                    : 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                                }`}
                              >
                                {v.vote}
                              </span>
                              <a
                                href={v.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white"
                                title="Inspect official roll-call journal"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sponsored Bills */}
                  {official.sponsoredBills.length > 0 && (
                    <div className="mt-3 text-xs">
                      <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5 font-mono">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Key Sponsored Legislation</span>
                      </div>
                      {official.sponsoredBills.map((b, idx) => (
                        <div key={idx} className="flex items-center justify-between text-slate-300 py-0.5">
                          <span>
                            <strong className="text-blue-400 font-mono">{b.billNumber}</strong>: {b.billTitle}
                          </span>
                          <a
                            href={b.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline shrink-0 ml-2"
                          >
                            View Bill &rarr;
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Official Links */}
                <div className="mt-5 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs" style={{ borderColor: '#2A2A2A' }}>
                  <div className="flex items-center gap-3">
                    <a
                      href={official.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                    >
                      <span>Official Office Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={official.officialProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#FFFFEB] inline-flex items-center gap-1"
                    >
                      <span>Official Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Verified: {official.lastVerifiedAt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Verified Candidates Running */}
        {activeTab === 'candidates' && (
          <div className="space-y-4">
            <div
              className="p-3.5 rounded-2xl text-xs border text-slate-300"
              style={{
                background: '#242424',
                borderColor: '#2F2F2F',
              }}
            >
              <strong className="text-[#FFFFEB]">Notice:</strong> Truth distinguishes current officeholders from candidates seeking office. Candidate profiles display only publicly documented policy positions and verified source links without endorsements.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {districtCandidates.map((cand) => (
                <motion.div
                  key={cand.id}
                  whileHover={{ y: -2, borderColor: '#3A3A3A' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="rounded-3xl border p-6 flex flex-col justify-between"
                  style={{
                    background: '#1E1E1E',
                    borderColor: '#2A2A2A',
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                          Candidate for {cand.officeSought}
                        </div>
                        <h3 className="text-lg font-bold text-[#FFFFEB] mt-0.5">
                          {cand.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {cand.isIncumbent && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-blue-950/60 text-blue-300 border border-blue-500/30 rounded">
                            Incumbent
                          </span>
                        )}
                        <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border text-slate-300" style={{ background: '#262626', borderColor: '#333333' }}>
                          {cand.party}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      {cand.electionName} ({cand.electionDate})
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed opacity-85">
                      {cand.bioSummary}
                    </p>

                    <div className="mt-4 pt-3 border-t" style={{ borderColor: '#2A2A2A' }}>
                      <div className="text-xs font-semibold text-slate-300 mb-2 font-mono">
                        Documented Policy Issues ({cand.policyPositions.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cand.policyPositions.map((p) => (
                          <span
                            key={p.id}
                            className="px-2.5 py-1 rounded-xl text-[11px] border"
                            style={{
                              background: '#242424',
                              borderColor: '#2F2F2F',
                              color: 'rgba(255, 255, 235, 0.8)',
                            }}
                          >
                            {p.issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: '#2A2A2A' }}>
                    <a
                      href={cand.campaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                    >
                      <span>Campaign Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="/compare"
                      className="text-slate-300 font-semibold hover:text-white"
                    >
                      Compare in Issue Matrix &rarr;
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

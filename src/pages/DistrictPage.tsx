import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ExternalLink,
  Scale,
  FileText,
  AlertCircle,
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
  const [activeTab, setActiveTab] = useState<'officials' | 'candidates' | 'activity'>('officials');

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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-full font-medium mb-2">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>TEXAS DISTRICT INTELLIGENCE</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          My District & Representatives
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Find your elected officials, official legislative profiles, and recorded votes. You can enter a Texas ZIP code or configure your exact districts manually below.
        </p>
      </div>

      {/* District Selection & Zip Lookup Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>District Locator & Preferences</span>
            {isManualDistrict ? (
              <span className="text-[11px] font-normal px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                Manual Selection Active
              </span>
            ) : (
              <span className="text-[11px] font-normal px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                ZIP Mapped ({activeZip})
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Your preferences are stored entirely in your local browser storage. We never collect or store your address.
          </p>
        </div>

        {/* ZIP Lookup Form with Explicit Electoral Disclaimer */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <form onSubmit={handleZipSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                pattern="[0-9]{5}"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 5-digit Texas ZIP (e.g. 78701, 78666, 75206)"
                className="w-full pl-9 pr-4 py-2 bg-white text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
            >
              Update via ZIP
            </button>
          </form>

          {zipNotes && (
            <div className="mt-3 p-2.5 bg-blue-50 text-blue-900 rounded border border-blue-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{zipNotes}</span>
            </div>
          )}

          {/* Crucial nonpartisan civic notice */}
          <div className="mt-2.5 text-[11px] text-slate-500 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Civic Notice:</strong> A ZIP code does not uniquely identify a congressional or state legislative district. In Texas, many ZIP codes are split across multiple districts. Use the selectors below to confirm your precise districts.
            </span>
          </div>
        </div>

        {/* Manual District Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* US Congressional District */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              U.S. Congressional District
            </label>
            <select
              value={selectedCongressional.id}
              onChange={(e) => setCongressional(e.target.value)}
              className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
            >
              {congressionalDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  TX-{d.districtNumber}: {d.name.replace('Texas Congressional District ', 'CD-')} ({d.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Counties: {selectedCongressional.majorCounties.join(', ')}
            </p>
          </div>

          {/* Texas Senate District */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Texas Senate District
            </label>
            <select
              value={selectedStateSenate.id}
              onChange={(e) => setStateSenate(e.target.value)}
              className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
            >
              {senateDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  Senate District {d.districtNumber} ({d.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Counties: {selectedStateSenate.majorCounties.join(', ')}
            </p>
          </div>

          {/* Texas House District */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Texas House District
            </label>
            <select
              value={selectedStateHouse.id}
              onChange={(e) => setStateHouse(e.target.value)}
              className="w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
            >
              {houseDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  House District {d.districtNumber} ({d.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Counties: {selectedStateHouse.majorCounties.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs: Elected Officials vs Verified Candidates vs Legislative Activity */}
      <div className="space-y-4">
        <div className="border-b border-slate-200">
          <nav className="flex gap-6 -mb-px">
            <button
              onClick={() => setActiveTab('officials')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'officials'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Current Elected Officials ({currentOfficials.length})
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'candidates'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
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
              <div
                key={official.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {official.office}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {official.name}
                      </h3>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      {official.party}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 mt-1">
                    {official.district} • Term: {official.termExpires}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {official.bioSummary}
                  </p>

                  {/* Recorded Votes Highlight */}
                  {official.recentVotes.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-blue-600" />
                        <span>Documented Roll-Call Votes</span>
                      </div>
                      <div className="space-y-2">
                        {official.recentVotes.map((v, i) => (
                          <div
                            key={i}
                            className="p-2 bg-slate-50 rounded border border-slate-100 text-xs flex items-center justify-between gap-2"
                          >
                            <div className="truncate">
                              <span className="font-mono font-bold text-slate-800">
                                {v.billNumber}
                              </span>
                              <span className="text-slate-600 ml-1.5 truncate">
                                {v.billTitle}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  v.vote === 'Yea'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {v.vote}
                              </span>
                              <a
                                href={v.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-700"
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
                      <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Key Sponsored Legislation</span>
                      </div>
                      {official.sponsoredBills.map((b, idx) => (
                        <div key={idx} className="flex items-center justify-between text-slate-600 py-0.5">
                          <span>
                            <strong className="text-slate-800">{b.billNumber}</strong>: {b.billTitle}
                          </span>
                          <a
                            href={b.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline shrink-0 ml-2"
                          >
                            View Bill &rarr;
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Official Links */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <a
                      href={official.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                    >
                      <span>Official Office Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span>•</span>
                    <a
                      href={official.officialProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <span>Official Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Verified: {official.lastVerifiedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Verified Candidates Running */}
        {activeTab === 'candidates' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-700 border border-slate-200">
              <strong>Notice:</strong> Truth distinguishes current officeholders from candidates seeking office. Candidate profiles display only publicly documented policy positions and verified source links without endorsements.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {districtCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Candidate for {cand.officeSought}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                          {cand.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {cand.isIncumbent && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                            Incumbent
                          </span>
                        )}
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          {cand.party}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {cand.electionName} ({cand.electionDate})
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {cand.bioSummary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="text-xs font-semibold text-slate-700 mb-2">
                        Documented Policy Issues ({cand.policyPositions.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cand.policyPositions.map((p) => (
                          <span
                            key={p.id}
                            className="px-2 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded text-[11px]"
                          >
                            {p.issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={cand.campaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>Campaign Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="/compare"
                      className="text-slate-800 font-semibold hover:underline"
                    >
                      Compare in Issue Matrix &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

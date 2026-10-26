import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ExternalLink,
  Users,
  Building2,
  Shield,
  Layers,
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import {
  TEXAS_MAP_DISTRICTS,
  TEXAS_MAP_COUNTIES,
  TEXAS_MAP_POLITICIANS,
} from '../data/texasMapData';
import {
  TEXAS_SENATE_DISTRICTS,
} from '../data/texasSenateData';
import { NonpartisanDisclaimer } from '../components/ui/NonpartisanDisclaimer';
import {
  TexasLeafletMap,
  MapDivisionMode,
  ActiveDataLayer,
} from '../components/map/TexasLeafletMap';

export const MapPage: React.FC = () => {
  const {
    selectedCongressional,
    selectedStateSenate,
    activeZip,
  } = useCivic();

  const [divisionMode, setDivisionMode] = useState<MapDivisionMode>('counties');

  const [activeDataLayer, setActiveDataLayer] = useState<ActiveDataLayer>('party');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(() => {
    const cdNum = selectedCongressional?.districtNumber;
    const found = TEXAS_MAP_DISTRICTS.find((d) => d.code === `TX-${cdNum}`);
    return found ? found.id : 'tx-cd-26';
  });
  const [selectedCountyId, setSelectedCountyId] = useState<string>('harris');
  const [selectedPoliticianId, setSelectedPoliticianId] = useState<string>('pol-abbott');
  const [selectedSenateId, setSelectedSenateId] = useState<string>(() => {
    const sdNum = selectedStateSenate?.districtNumber;
    const found = TEXAS_SENATE_DISTRICTS.find((sd) => sd.districtNumber === Number(sdNum));
    return found ? found.id : 'tx-sd-14';
  });

  const currentSelectedDistrict =
    TEXAS_MAP_DISTRICTS.find((d) => d.id === selectedDistrictId) || TEXAS_MAP_DISTRICTS[0];

  const currentSelectedCounty =
    TEXAS_MAP_COUNTIES.find((c) => c.id === selectedCountyId) || TEXAS_MAP_COUNTIES[0];

  const currentSelectedPolitician =
    TEXAS_MAP_POLITICIANS.find((p) => p.id === selectedPoliticianId) || TEXAS_MAP_POLITICIANS[0];

  const currentSelectedSenate =
    TEXAS_SENATE_DISTRICTS.find((sd) => sd.id === selectedSenateId) || TEXAS_SENATE_DISTRICTS[0];

  const handleCenterUserDistrict = () => {
    setDivisionMode('districts');
    const cdNum = selectedCongressional?.districtNumber;
    const found = TEXAS_MAP_DISTRICTS.find((d) => d.code === `TX-${cdNum}`);
    if (found) {
      setSelectedDistrictId(found.id);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#FFFFEB] tracking-tight">
            Texas Civic & Electoral Map
          </h1>
          <p className="text-xs md:text-sm text-stone-400 max-w-3xl leading-relaxed">
            Divide and analyze Texas across 38 Congressional Districts, all 254 counties, 31 State Senate districts, and official representatives.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#191918] border border-[#272726] shrink-0">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
              Active Alignment
            </span>
            <div className="text-sm font-serif font-bold text-[#FFFFEB] flex items-center gap-1.5">
              <span>TX-{selectedCongressional.districtNumber}</span>
              <span className="text-stone-500">•</span>
              <span className="text-amber-300 font-mono text-xs">{activeZip || '78701'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCenterUserDistrict}
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1 shadow-sm"
          >
            <MapPin className="w-3 h-3" />
            <span>Find My District</span>
          </button>
        </div>
      </div>

      <div
        className="p-4 md:p-5 rounded-3xl border space-y-4"
        style={{ background: '#191918', borderColor: '#262625' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-semibold text-stone-300 uppercase tracking-wider">
              Map Division:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setDivisionMode('counties')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                divisionMode === 'counties'
                  ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border-[#2b2b2a]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Counties (254)</span>
            </button>

            <button
              type="button"
              onClick={() => setDivisionMode('districts')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                divisionMode === 'districts'
                  ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border-[#2b2b2a]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Districts (38)</span>
            </button>

            <button
              type="button"
              onClick={() => setDivisionMode('politicians')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                divisionMode === 'politicians'
                  ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border-[#2b2b2a]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Politicians (12 Key)</span>
            </button>

            <button
              type="button"
              onClick={() => setDivisionMode('senate')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                divisionMode === 'senate'
                  ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border-[#2b2b2a]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>TX Senate (31)</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#262625] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-400">
              Active Data Layer:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveDataLayer('none')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeDataLayer === 'none'
                  ? 'bg-stone-200 text-stone-950 font-bold shadow-sm'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border border-[#262625]'
              }`}
            >
              None (Standard Map)
            </button>

            <button
              type="button"
              onClick={() => setActiveDataLayer('party')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeDataLayer === 'party'
                  ? 'bg-[#282827] text-amber-300 border border-amber-400/60 font-semibold'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border border-[#262625]'
              }`}
            >
              Party Majority (Dem vs GOP)
            </button>

            <button
              type="button"
              onClick={() => setActiveDataLayer('turnout')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeDataLayer === 'turnout'
                  ? 'bg-[#282827] text-amber-300 border border-amber-400/60 font-semibold'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border border-[#262625]'
              }`}
            >
              2024 Turnout Rate
            </button>

            <button
              type="button"
              onClick={() => setActiveDataLayer('vouchers')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeDataLayer === 'vouchers'
                  ? 'bg-[#282827] text-amber-300 border border-amber-400/60 font-semibold'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border border-[#262625]'
              }`}
            >
              School Vouchers (HB 1)
            </button>

            <button
              type="button"
              onClick={() => setActiveDataLayer('border')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeDataLayer === 'border'
                  ? 'bg-[#282827] text-amber-300 border border-amber-400/60 font-semibold'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border border-[#262625]'
              }`}
            >
              Border Security (SB 4)
            </button>

            <button
              type="button"
              onClick={() => setActiveDataLayer('propertyTax')}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeDataLayer === 'propertyTax'
                  ? 'bg-[#282827] text-amber-300 border border-amber-400/60 font-semibold'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-200 border border-[#262625]'
              }`}
            >
              Property Tax (SB 2)
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${divisionMode === 'counties' ? '254 counties (e.g. Harris, Loving, Travis, Dallas)...' : divisionMode === 'districts' ? '38 Congressional Districts (e.g. TX-10, TX-26)...' : divisionMode === 'senate' ? '31 Texas Senate districts (e.g. SD-14, SD-12, Hughes, Eckhardt)...' : '12 Texas politicians (e.g. Abbott, Gill, McCaul)...'}`}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#191918] border border-[#2b2b2a] rounded-2xl text-stone-200 placeholder-stone-500 focus:outline-hidden focus:border-amber-400/60 shadow-inner"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 space-y-3">
          <TexasLeafletMap
            divisionMode={divisionMode}
            activeDataLayer={activeDataLayer}
            selectedDistrictId={selectedDistrictId}
            selectedCountyId={selectedCountyId}
            selectedPoliticianId={selectedPoliticianId}
            selectedSenateId={selectedSenateId}
            onSelectDistrict={(id) => setSelectedDistrictId(id)}
            onSelectCounty={(id) => setSelectedCountyId(id)}
            onSelectPolitician={(id) => setSelectedPoliticianId(id)}
            onSelectSenate={(id) => setSelectedSenateId(id)}
            searchQuery={searchQuery}
          />

          {activeDataLayer !== 'none' && (
            <div
              className="p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-400"
              style={{ background: '#191918', borderColor: '#262625' }}
            >
              <span className="text-[11px] font-bold text-stone-300">Active Metric Legend:</span>
              <div className="flex flex-wrap items-center gap-3">
                {activeDataLayer === 'party' && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                      <span>Majority Democratic</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                      <span>Competitive / Swing</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                      <span>Majority Republican</span>
                    </span>
                  </>
                )}
                {activeDataLayer === 'vouchers' && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span>Anti-Voucher Coalition (Public Defense)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span>Pro-ESA Voucher (School Choice)</span>
                    </span>
                  </>
                )}
                {activeDataLayer === 'border' && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                      <span>Strong State Border Enforcement (SB 4)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                      <span>Constitutional & Federal Scrutiny</span>
                    </span>
                  </>
                )}
                {activeDataLayer === 'propertyTax' && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span>SB 2 Statewide Homestead Compression</span>
                    </span>
                  </>
                )}
                {activeDataLayer === 'turnout' && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                      <span>High Turnout (&ge; 65%)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span>Moderate Turnout (58-64%)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                      <span>Lower Turnout (&lt; 58%)</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          {divisionMode === 'districts' && currentSelectedDistrict && (
            <div
              className="rounded-3xl border p-5 md:p-6 space-y-5"
              style={{ background: '#191918', borderColor: '#262625' }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {currentSelectedDistrict.code}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      currentSelectedDistrict.party === 'Republican'
                        ? 'bg-red-950/70 text-red-300 border border-red-800/40'
                        : 'bg-blue-950/70 text-blue-300 border border-blue-800/40'
                    }`}
                  >
                    {currentSelectedDistrict.party}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FFFFEB]">
                  {currentSelectedDistrict.representative}
                </h3>
                <div className="text-xs text-stone-400">
                  {currentSelectedDistrict.name}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#242423] text-xs text-stone-300 leading-relaxed">
                {currentSelectedDistrict.bioExcerpt}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#141414] border border-[#262625] space-y-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                    District Population
                  </span>
                  <div className="text-sm font-bold text-[#FFFFEB]">
                    {currentSelectedDistrict.population.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#141414] border border-[#262625] space-y-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                    2024 Turnout
                  </span>
                  <div className="text-sm font-bold text-amber-300 font-mono">
                    {currentSelectedDistrict.turnoutRate2024}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Recorded Legislative Stance
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">HB 1 Vouchers:</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        currentSelectedDistrict.votes.hb1Vouchers === 'Nay'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-amber-950 text-amber-400'
                      }`}
                    >
                      {currentSelectedDistrict.votes.hb1Vouchers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">SB 4 Border:</span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[11px] bg-sky-950 text-sky-400">
                      {currentSelectedDistrict.votes.sb4Border}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">SB 2 Property Tax:</span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[11px] bg-emerald-950 text-emerald-400">
                      {currentSelectedDistrict.votes.sb2PropertyTax}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Counties in District:
                </span>
                <p className="text-stone-300 font-mono text-[11px] leading-relaxed">
                  {currentSelectedDistrict.counties.join(', ')}
                </p>
              </div>

              <div className="pt-2 border-t border-[#242423]">
                <a
                  href={currentSelectedDistrict.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#1c1c1b] hover:bg-[#282827] text-stone-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#2c2c2b]"
                >
                  <span>Official Congressional Office Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {divisionMode === 'counties' && currentSelectedCounty && (
            <div
              className="rounded-3xl border p-5 md:p-6 space-y-5"
              style={{ background: '#191918', borderColor: '#262625' }}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                      {currentSelectedCounty.region}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      currentSelectedCounty.majorityParty === 'Democratic'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800/40'
                        : currentSelectedCounty.majorityParty === 'Republican'
                        ? 'bg-red-950 text-red-300 border border-red-800/40'
                        : 'bg-purple-950 text-purple-300 border border-purple-800/40'
                    }`}
                  >
                    {currentSelectedCounty.majorityParty === 'Democratic'
                      ? 'Majority Democratic'
                      : currentSelectedCounty.majorityParty === 'Republican'
                      ? 'Majority Republican'
                      : 'Competitive / Swing'}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FFFFEB]">
                  {currentSelectedCounty.name}
                </h3>
                <div className="text-xs text-stone-400">
                  County Seat: <strong className="text-stone-200">{currentSelectedCounty.countySeat}</strong>
                  {currentSelectedCounty.fips && (
                    <span className="text-stone-500 ml-2 font-mono">(FIPS {currentSelectedCounty.fips})</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#141414] border border-[#262625] space-y-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                    Population
                  </span>
                  <div className="text-sm font-bold text-[#FFFFEB]">
                    {currentSelectedCounty.population.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#141414] border border-[#262625] space-y-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                    2024 Turnout
                  </span>
                  <div className="text-sm font-bold text-amber-300 font-mono">
                    {currentSelectedCounty.turnout2024}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#272726] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Electoral Margin:</span>
                  <span
                    className="font-mono font-bold px-2 py-0.5 rounded text-[11px]"
                    style={{
                      background: `${currentSelectedCounty.partyColor}22`,
                      color: currentSelectedCounty.partyColor,
                      border: `1px solid ${currentSelectedCounty.partyColor}44`,
                    }}
                  >
                    {currentSelectedCounty.margin2024 || currentSelectedCounty.politicalLean}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Demographic Density:</span>
                  <span className="font-mono font-semibold text-stone-300">
                    {currentSelectedCounty.densityType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Voucher Stance:</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {currentSelectedCounty.voucherStance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Border Stance:</span>
                  <span className="font-mono font-semibold text-sky-400">
                    {currentSelectedCounty.borderStance}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Key Electoral Analysis:
                </span>
                <p className="text-stone-300 leading-relaxed text-[11px] bg-[#141414] p-3 rounded-2xl border border-[#242423]">
                  {currentSelectedCounty.keyElectoralDriver}
                </p>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Congressional Districts Serving County:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentSelectedCounty.congressionalDistricts.map((cd) => (
                    <button
                      key={cd}
                      type="button"
                      onClick={() => {
                        setDivisionMode('districts');
                        const raw = cd.replace('TX-', '');
                        const target = TEXAS_MAP_DISTRICTS.find((d) => d.code === `TX-${raw}`);
                        if (target) setSelectedDistrictId(target.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#20201f] hover:bg-amber-400 hover:text-stone-950 text-stone-300 border border-[#2c2c2b] text-xs font-mono font-semibold cursor-pointer transition-colors"
                    >
                      {cd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {divisionMode === 'politicians' && currentSelectedPolitician && (
            <div
              className="rounded-3xl border p-5 md:p-6 space-y-5"
              style={{ background: '#191918', borderColor: '#262625' }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={currentSelectedPolitician.photoUrl}
                  alt={currentSelectedPolitician.name}
                  className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-[#333332] shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/officials/off-fed-gill.jpg';
                  }}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {currentSelectedPolitician.districtCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        currentSelectedPolitician.party === 'Republican'
                          ? 'bg-red-950/70 text-red-300 border border-red-800/40'
                          : 'bg-blue-950/70 text-blue-300 border border-blue-800/40'
                      }`}
                    >
                      {currentSelectedPolitician.party}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#FFFFEB]">
                    {currentSelectedPolitician.name}
                  </h3>
                  <div className="text-xs text-stone-400">
                    {currentSelectedPolitician.role}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#242423] text-xs text-stone-300 leading-relaxed">
                {currentSelectedPolitician.bioSummary}
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Recorded Legislative Stance
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">HB 1 School Vouchers:</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        currentSelectedPolitician.keyVotes.vouchers === 'Yea'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-emerald-950 text-emerald-400'
                      }`}
                    >
                      {currentSelectedPolitician.keyVotes.vouchers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">SB 4 Border Enforcement:</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        currentSelectedPolitician.keyVotes.border === 'Yea'
                          ? 'bg-sky-950 text-sky-400'
                          : 'bg-purple-950 text-purple-400'
                      }`}
                    >
                      {currentSelectedPolitician.keyVotes.border}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">SB 2 Property Tax Relief:</span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[11px] bg-emerald-950 text-emerald-400">
                      {currentSelectedPolitician.keyVotes.propertyTax}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Jurisdiction / Counties Served:
                </span>
                <p className="text-stone-300 font-mono text-[11px] leading-relaxed">
                  {currentSelectedPolitician.countiesServed.join(', ')}
                </p>
              </div>

              <div className="pt-2 border-t border-[#242423]">
                <a
                  href={currentSelectedPolitician.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#1c1c1b] hover:bg-[#282827] text-stone-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#2c2c2b]"
                >
                  <span>Official Government Office Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {divisionMode === 'senate' && currentSelectedSenate && (
            <div
              className="rounded-3xl border p-5 md:p-6 space-y-5"
              style={{ background: '#191918', borderColor: '#262625' }}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                      {currentSelectedSenate.code} • {currentSelectedSenate.region}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      currentSelectedSenate.party === 'Republican'
                        ? 'bg-red-950/70 text-red-300 border border-red-800/40'
                        : 'bg-blue-950/70 text-blue-300 border border-blue-800/40'
                    }`}
                  >
                    {currentSelectedSenate.party}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FFFFEB]">
                  Senator {currentSelectedSenate.senator}
                </h3>
                <div className="text-xs text-stone-400">
                  {currentSelectedSenate.name}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#242423] text-xs text-stone-300 leading-relaxed">
                {currentSelectedSenate.bioExcerpt}
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Recorded Senate Roll-Call Votes
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">HB 1 School Vouchers:</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        currentSelectedSenate.keyVotes.vouchers === 'Yea'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-emerald-950 text-emerald-400'
                      }`}
                    >
                      {currentSelectedSenate.keyVotes.vouchers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">SB 4 Border Enforcement:</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        currentSelectedSenate.keyVotes.border === 'Yea'
                          ? 'bg-sky-950 text-sky-400'
                          : 'bg-purple-950 text-purple-400'
                      }`}
                    >
                      {currentSelectedSenate.keyVotes.border}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#141414] border border-[#242423]">
                    <span className="text-stone-300">SB 2 Property Tax Relief:</span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-[11px] bg-emerald-950 text-emerald-400">
                      {currentSelectedSenate.keyVotes.propertyTax}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mb-1">
                    Major Counties in District:
                  </span>
                  <p className="text-stone-300 font-mono text-[11px] leading-relaxed bg-[#141414] p-2.5 rounded-xl border border-[#242423]">
                    {currentSelectedSenate.majorCounties.join(', ')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mb-1">
                    Key Municipalities:
                  </span>
                  <p className="text-stone-300 font-mono text-[11px] leading-relaxed bg-[#141414] p-2.5 rounded-xl border border-[#242423]">
                    {currentSelectedSenate.keyCities.join(', ')}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#242423]">
                <a
                  href={currentSelectedSenate.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-[#1c1c1b] hover:bg-[#282827] text-stone-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#2c2c2b]"
                >
                  <span>Official Texas Senate Member Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <NonpartisanDisclaimer />
    </div>
  );
};

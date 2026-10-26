import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ExternalLink,
  Users,
  Vote,
  TrendingUp,
} from 'lucide-react';
import {
  TEXAS_SVG_BOUNDARY_PATH,
  TEXAS_MAP_DISTRICTS,
  TEXAS_MAP_REGIONS,
  TexasMapDistrict,
  TexasMapRegion,
} from '../../data/texasMapData';

type MapViewMode = 'party' | 'vouchers' | 'turnout';

export const TexasInteractiveMap: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('tx-cd-26');
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<TexasMapRegion>('All Texas');
  const [viewMode, setMapViewMode] = useState<MapViewMode>('party');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedDistrict =
    TEXAS_MAP_DISTRICTS.find((d) => d.id === selectedDistrictId) || TEXAS_MAP_DISTRICTS[0];

  const hoveredDistrict = hoveredDistrictId
    ? TEXAS_MAP_DISTRICTS.find((d) => d.id === hoveredDistrictId) || null
    : null;

  const filteredDistricts = TEXAS_MAP_DISTRICTS.filter((d) => {
    if (selectedRegion !== 'All Texas' && d.region !== selectedRegion) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${d.code} ${d.name} ${d.representative} ${d.counties.join(' ')} ${d.majorCities.join(' ')} ${d.region}`.toLowerCase();
      return matchText.includes(q);
    }
    return true;
  });

  const getNodeColor = (district: TexasMapDistrict) => {
    if (viewMode === 'party') {
      return district.party === 'Republican' ? '#ef4444' : '#3b82f6';
    }
    if (viewMode === 'vouchers') {
      return district.votes.hb1Vouchers === 'Nay' ? '#10b981' : '#f59e0b';
    }
    if (viewMode === 'turnout') {
      const rate = parseFloat(district.turnoutRate2024);
      if (rate >= 65) return '#fbbf24';
      if (rate >= 55) return '#38bdf8';
      return '#a855f7';
    }
    return '#f59e0b';
  };

  const getRepresentativePhoto = (code: string) => {
    const photoMap: Record<string, string> = {
      'TX-26': '/images/officials/brandon-gill.jpg',
      'TX-37': '/images/officials/off-fed-doggett.jpg',
      'TX-21': '/images/officials/off-fed-roy.jpg',
      'TX-35': '/images/officials/off-fed-casar.jpg',
      'TX-10': '/images/officials/off-fed-mccaul.jpg',
      'TX-02': '/images/officials/off-fed-crenshaw.jpg',
      'TX-32': '/images/officials/off-fed-allred.jpg',
      'TX-12': '/images/officials/off-fed-granger.jpg',
      'TX-16': '/images/officials/off-fed-escobar.jpg',
      'TX-23': '/images/officials/off-fed-gonzales.jpg',
      'TX-15': '/images/officials/off-fed-delacruz.jpg',
      'TX-34': '/images/officials/off-fed-vicente.jpg',
      'TX-13': '/images/officials/off-fed-jackson.jpg',
      'TX-19': '/images/officials/off-fed-arrington.jpg',
      'TX-01': '/images/officials/off-fed-moran.jpg',
      'TX-18': '/images/officials/off-fed-turner.jpg',
      'TX-30': '/images/officials/off-fed-crockett.jpg',
      'TX-28': '/images/officials/off-fed-cuellar.jpg',
      'TX-07': '/images/officials/off-fed-fletcher.jpg',
    };
    return photoMap[code] || '/images/officials/off-txrep-johnson.svg';
  };

  return (
    <div
      className="rounded-3xl border p-5 md:p-7 space-y-5"
      style={{
        background: '#181817',
        borderColor: '#262625',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#262625]">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg md:text-xl font-serif font-bold text-[#FFFFEB]">
              Interactive Texas Congressional & Legislative Map
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Explore authentic Texas geographic districts, local representatives, voter turnout metrics, and recorded legislative roll-call votes.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#20201f] border border-[#2b2b2a] self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setMapViewMode('party')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'party'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Party (25R / 13D)</span>
          </button>
          <button
            type="button"
            onClick={() => setMapViewMode('vouchers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'vouchers'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Voucher Stance (HB 1)</span>
          </button>
          <button
            type="button"
            onClick={() => setMapViewMode('turnout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'turnout'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>2024 Turnout Rate</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district, representative, county, or city (e.g. Brandon Gill, Denton, El Paso)..."
            className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-[#20201f] text-[#FFFFEB] border border-[#2b2b2a] focus:outline-hidden focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400 self-center">
          {viewMode === 'party' && (
            <>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span>Republican</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span>Democratic</span>
              </span>
            </>
          )}
          {viewMode === 'vouchers' && (
            <>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Rural GOP/Dem Coalition (Anti-Voucher)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>Pro-ESA Voucher</span>
              </span>
            </>
          )}
          {viewMode === 'turnout' && (
            <>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>65%+ High</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                <span>55-65%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
                <span>&lt;55%</span>
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider shrink-0">
          Region:
        </span>
        {TEXAS_MAP_REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => setSelectedRegion(region)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
              selectedRegion === region
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-semibold'
                : 'bg-[#20201f] text-stone-400 hover:text-stone-200 border border-[#2c2c2b]'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div
          className="lg:col-span-7 rounded-2xl p-4 md:p-6 border relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]"
          style={{
            background: 'radial-gradient(ellipse at center, #212120 0%, #151514 100%)',
            borderColor: '#2b2b2a',
          }}
        >
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="text-[10px] font-mono text-stone-500 tracking-widest uppercase block">
              Official State Matrix
            </span>
            <span className="text-sm font-serif font-bold text-stone-300">
              State of Texas • 38 Congressional Districts
            </span>
          </div>

          <div className="relative w-full max-w-[540px] aspect-[240/226] my-auto">
            <svg
              viewBox="395 315 250 235"
              className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none"
            >
              <defs>
                <filter id="txGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="txFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#242422" />
                  <stop offset="50%" stopColor="#1e1e1d" />
                  <stop offset="100%" stopColor="#181817" />
                </linearGradient>
              </defs>

              <path
                d={TEXAS_SVG_BOUNDARY_PATH}
                fill="url(#txFillGrad)"
                stroke="#3f3f3c"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />

              <line x1="420" y1="400" x2="620" y2="400" stroke="#2c2c29" strokeWidth="0.5" strokeDasharray="2,3" />
              <line x1="420" y1="460" x2="600" y2="460" stroke="#2c2c29" strokeWidth="0.5" strokeDasharray="2,3" />
              <line x1="520" y1="330" x2="520" y2="530" stroke="#2c2c29" strokeWidth="0.5" strokeDasharray="2,3" />

              {TEXAS_MAP_DISTRICTS.map((district) => {
                const isSelected = selectedDistrictId === district.id;
                const isHovered = hoveredDistrictId === district.id;
                const isFiltered = filteredDistricts.some((d) => d.id === district.id);
                const color = getNodeColor(district);

                return (
                  <g
                    key={district.id}
                    onClick={() => setSelectedDistrictId(district.id)}
                    onMouseEnter={() => setHoveredDistrictId(district.id)}
                    onMouseLeave={() => setHoveredDistrictId(null)}
                    className="cursor-pointer transition-transform duration-200"
                    style={{
                      opacity: isFiltered ? 1 : 0.25,
                      pointerEvents: isFiltered ? 'auto' : 'none',
                    }}
                  >
                    {isSelected && (
                      <circle
                        cx={district.svgX}
                        cy={district.svgY}
                        r="9"
                        fill="none"
                        stroke={color}
                        strokeWidth="1.2"
                        className="animate-ping origin-center opacity-75"
                      />
                    )}

                    <circle
                      cx={district.svgX}
                      cy={district.svgY}
                      r={isSelected ? 6 : isHovered ? 5 : 3.8}
                      fill={isSelected ? '#FFFFEB' : color}
                      stroke={isSelected ? color : '#141414'}
                      strokeWidth={isSelected ? '2' : '1'}
                      className="transition-all duration-200"
                    />

                    {isSelected && (
                      <g className="pointer-events-none select-none">
                        <rect
                          x={district.svgX - 11}
                          y={district.svgY - 14}
                          width="22"
                          height="8.5"
                          rx="3"
                          fill="#181817"
                          stroke={color}
                          strokeWidth="0.8"
                        />
                        <text
                          x={district.svgX}
                          y={district.svgY - 8}
                          textAnchor="middle"
                          fontSize="4.8"
                          fontFamily="monospace"
                          fontWeight="bold"
                          fill="#FFFFEB"
                        >
                          {district.code}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {hoveredDistrict && (
              <div
                className="absolute z-30 pointer-events-none px-3 py-1.5 rounded-xl bg-stone-900/95 border border-amber-400/60 shadow-xl text-left"
                style={{
                  left: `${((hoveredDistrict.svgX - 395) / 250) * 100}%`,
                  top: `${((hoveredDistrict.svgY - 315) / 235) * 100 - 18}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {hoveredDistrict.code}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      hoveredDistrict.party === 'Republican' ? 'bg-rose-500' : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-xs font-bold text-[#FFFFEB]">
                    {hoveredDistrict.representative}
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 truncate max-w-[180px]">
                  {hoveredDistrict.region}
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-between pt-3 mt-auto text-[11px] text-stone-500 border-t border-[#242423]">
            <span>Click any node to inspect legislative roll-call records</span>
            <span className="font-mono">Showing {filteredDistricts.length} of {TEXAS_MAP_DISTRICTS.length} Texas Congressional Districts</span>
          </div>
        </div>

        <div
          className="lg:col-span-5 rounded-2xl p-5 border space-y-4"
          style={{
            background: '#1c1c1b',
            borderColor: '#2d2d2b',
          }}
        >
          <div className="space-y-2 pb-3 border-b border-[#282827]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-400 text-stone-950">
                  {selectedDistrict.code}
                </span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold border ${
                    selectedDistrict.party === 'Republican'
                      ? 'bg-rose-950/60 text-rose-300 border-rose-800/40'
                      : 'bg-sky-950/60 text-sky-300 border-sky-800/40'
                  }`}
                >
                  {selectedDistrict.party}
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                {selectedDistrict.region}
              </span>
            </div>

            <div className="flex items-start gap-3.5 pt-1">
              <img
                src={getRepresentativePhoto(selectedDistrict.code)}
                alt={selectedDistrict.representative}
                className="w-14 h-16 rounded-xl object-cover border border-[#333] shadow-md shrink-0 bg-[#121211]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/officials/brandon-gill.svg';
                }}
              />
              <div className="space-y-0.5">
                <h4 className="text-xl font-serif font-bold text-[#FFFFEB]">
                  {selectedDistrict.representative}
                </h4>
                <p className="text-xs text-amber-300/90 font-medium">
                  {selectedDistrict.officialRole}
                </p>
                <p className="text-[11px] text-stone-400 font-mono">
                  District Population: {selectedDistrict.population.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed pt-1">
              {selectedDistrict.bioExcerpt}
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-[#222221] border border-[#2b2b2a]">
                <span className="text-[10px] text-stone-400 font-mono block">2024 Turnout:</span>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {selectedDistrict.turnoutRate2024}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#222221] border border-[#2b2b2a]">
                <span className="text-[10px] text-stone-400 font-mono block">Registered Voters:</span>
                <span className="text-sm font-mono font-bold text-[#FFFFEB]">
                  {selectedDistrict.registeredVoters.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Major Counties Included:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDistrict.counties.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#232322] text-stone-300 border border-[#2e2e2d]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                Key Municipalities:
              </span>
              <div className="text-[11px] text-stone-300 leading-snug">
                {selectedDistrict.majorCities.join(', ')}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#282827]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Vote className="w-3.5 h-3.5" />
                <span>Documented Roll-Call Votes</span>
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                Primary Journals
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#222221] border border-[#2b2b2a] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-200">
                    HB 1 (School Vouchers Strike Amendment)
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    88(4C) Raney Amendment
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                    selectedDistrict.votes.hb1Vouchers === 'Nay'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  }`}
                >
                  {selectedDistrict.votes.hb1Vouchers === 'Nay' ? 'Strikes Vouchers' : 'Pro-Voucher'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#222221] border border-[#2b2b2a] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-200">
                    SB 2 ($18B Property Tax Relief)
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    88(2C) $100k Homestead Exemption
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  {selectedDistrict.votes.sb2PropertyTax}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#222221] border border-[#2b2b2a] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-200">
                    SB 4 (State Border Enforcement)
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    88(4C) State Illegal Entry Statute
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                    selectedDistrict.votes.sb4Border === 'Yea'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                  }`}
                >
                  {selectedDistrict.votes.sb4Border}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#222221] border border-[#2b2b2a] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-200">
                    H.R. 2 (Secure the Border Act)
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    118th/119th U.S. Congress (Clerk Roll 209)
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                    selectedDistrict.votes.hr2SecureBorder === 'Yea'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                  }`}
                >
                  {selectedDistrict.votes.hr2SecureBorder}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#282827]">
            <a
              href={selectedDistrict.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#242423] hover:bg-amber-400 hover:text-stone-950 text-stone-200 border border-[#333332] text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <span>Official Representative Portal ({selectedDistrict.representative})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

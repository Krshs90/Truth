import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import texasCountiesData from '../../data/texas_counties_web.json';
import {
  TEXAS_MAP_DISTRICTS,
  TEXAS_MAP_COUNTIES,
  TEXAS_MAP_POLITICIANS,
  TexasMapCounty,
} from '../../data/texasMapData';
import {
  TEXAS_SENATE_DISTRICTS,
} from '../../data/texasSenateData';

export type MapDivisionMode = 'districts' | 'counties' | 'politicians' | 'senate';
export type ActiveDataLayer = 'none' | 'party' | 'vouchers' | 'border' | 'propertyTax' | 'turnout';

interface TexasLeafletMapProps {
  divisionMode: MapDivisionMode;
  activeDataLayer: ActiveDataLayer;
  selectedDistrictId: string;
  selectedCountyId: string;
  selectedPoliticianId: string;
  selectedSenateId: string;
  onSelectDistrict: (id: string) => void;
  onSelectCounty: (id: string) => void;
  onSelectPolitician: (id: string) => void;
  onSelectSenate: (id: string) => void;
  searchQuery: string;
}

const POLITICIAN_COORDS: Record<string, [number, number]> = {
  'pol-abbott': [30.4000, -97.7200],
  'pol-patrick': [30.3400, -97.8300],
  'pol-paxton': [30.3400, -97.6200],
  'pol-blacklock': [30.2200, -97.7700],
  'pol-doggett': [30.2800, -97.7300],
  'pol-casar': [29.8833, -97.9414],
  'pol-gill': [33.2148, -97.1331],
  'pol-mccaul': [30.1667, -96.3977],
  'pol-roy': [29.9500, -98.9000],
  'pol-crenshaw': [30.0400, -95.1800],
  'pol-crockett': [32.7767, -96.7970],
  'pol-moran': [32.3513, -95.3011],
  'pol-parker': [33.0426, -97.0945],
};

const DISTRICT_GPS: Record<string, [number, number]> = {
  'tx-cd-01': [32.3513, -95.3011],
  'tx-cd-02': [29.9844, -95.3340],
  'tx-cd-03': [33.1972, -96.6398],
  'tx-cd-04': [33.6357, -96.6089],
  'tx-cd-05': [32.5500, -96.1500],
  'tx-cd-06': [32.3865, -96.8483],
  'tx-cd-07': [29.7499, -95.4619],
  'tx-cd-08': [30.3100, -95.4600],
  'tx-cd-09': [29.6186, -95.5377],
  'tx-cd-10': [30.1667, -96.3977],
  'tx-cd-11': [31.4638, -100.4370],
  'tx-cd-12': [32.7555, -97.3308],
  'tx-cd-13': [35.2220, -101.8313],
  'tx-cd-14': [29.3013, -94.7977],
  'tx-cd-15': [26.2034, -98.2300],
  'tx-cd-16': [31.7619, -106.4850],
  'tx-cd-17': [31.5493, -97.1467],
  'tx-cd-18': [29.7604, -95.3698],
  'tx-cd-19': [33.5779, -101.8552],
  'tx-cd-20': [29.4241, -98.4936],
  'tx-cd-21': [29.9500, -98.9000],
  'tx-cd-22': [29.5822, -95.7608],
  'tx-cd-23': [29.3627, -100.8968],
  'tx-cd-24': [32.8900, -97.0400],
  'tx-cd-25': [32.3476, -97.7500],
  'tx-cd-26': [33.2148, -97.1331],
  'tx-cd-27': [27.8006, -97.3964],
  'tx-cd-28': [27.5306, -99.4803],
  'tx-cd-29': [29.7355, -95.2100],
  'tx-cd-30': [32.7100, -96.7970],
  'tx-cd-31': [30.7000, -97.6789],
  'tx-cd-32': [32.9500, -96.8200],
  'tx-cd-33': [32.7300, -97.1000],
  'tx-cd-34': [25.9017, -97.4975],
  'tx-cd-35': [29.8833, -97.9414],
  'tx-cd-36': [30.0800, -94.1300],
  'tx-cd-37': [30.2672, -97.7431],
  'tx-cd-38': [29.8300, -95.6000],
};

export const TexasLeafletMap: React.FC<TexasLeafletMapProps> = ({
  divisionMode,
  activeDataLayer,
  selectedDistrictId,
  selectedCountyId,
  selectedPoliticianId,
  selectedSenateId,
  onSelectDistrict,
  onSelectCounty,
  onSelectPolitician,
  onSelectSenate,
  searchQuery,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [31.2, -99.2],
      zoom: 6,
      minZoom: 5,
      maxZoom: 14,
      zoomControl: false,
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      }
    ).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
      geoJsonLayerRef.current = null;
    }
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    const findCounty = (name: string, fips?: string): TexasMapCounty | undefined => {
      const q = name.toLowerCase();
      return TEXAS_MAP_COUNTIES.find(
        (c) =>
          (fips && c.fips === fips) ||
          (c.cleanName && c.cleanName.toLowerCase() === q) ||
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase() === q.replace(/[^a-z0-9]/g, '-')
      );
    };

    const styleFeature = (feature: any) => {
      const countyName = feature?.properties?.name || '';
      const fips = feature?.properties?.fips;
      const county = findCounty(countyName, fips);
      const isSelected = county && county.id === selectedCountyId && divisionMode === 'counties';

      if (activeDataLayer === 'none') {
        return {
          fillColor: isSelected ? '#f59e0b' : '#1b1b1a',
          fillOpacity: isSelected ? 0.65 : 0.45,
          color: isSelected ? '#fbbf24' : '#2f2f2e',
          weight: isSelected ? 2.5 : 0.7,
        };
      }

      if (activeDataLayer === 'party') {
        const fillColor = county
          ? county.politicalLean === 'Strong Dem'
            ? '#1d4ed8'
            : county.politicalLean === 'Lean Dem'
            ? '#3b82f6'
            : county.politicalLean === 'Competitive / Swing'
            ? '#8b5cf6'
            : county.politicalLean === 'Lean GOP'
            ? '#ef4444'
            : '#b91c1c'
          : '#b91c1c';

        return {
          fillColor,
          fillOpacity: isSelected ? 0.85 : 0.55,
          color: isSelected ? '#FFFFEB' : '#141414',
          weight: isSelected ? 2.5 : 0.6,
        };
      }

      if (activeDataLayer === 'turnout') {
        const rate = parseFloat(county?.turnout2024 || '64');
        const fillColor = rate >= 66 ? '#059669' : rate >= 62 ? '#10b981' : rate >= 58 ? '#f59e0b' : '#ef4444';
        return {
          fillColor,
          fillOpacity: isSelected ? 0.85 : 0.55,
          color: isSelected ? '#FFFFEB' : '#141414',
          weight: isSelected ? 2.5 : 0.6,
        };
      }

      if (activeDataLayer === 'vouchers') {
        const fillColor = county?.voucherStance === 'Anti-Voucher Coalition' ? '#10b981' : '#f59e0b';
        return {
          fillColor,
          fillOpacity: isSelected ? 0.85 : 0.55,
          color: isSelected ? '#FFFFEB' : '#141414',
          weight: isSelected ? 2.5 : 0.6,
        };
      }

      if (activeDataLayer === 'border') {
        const fillColor = county?.borderStance === 'Strong Border Enforcement' ? '#0284c7' : '#7c3aed';
        return {
          fillColor,
          fillOpacity: isSelected ? 0.85 : 0.55,
          color: isSelected ? '#FFFFEB' : '#141414',
          weight: isSelected ? 2.5 : 0.6,
        };
      }

      if (activeDataLayer === 'propertyTax') {
        return {
          fillColor: '#10b981',
          fillOpacity: isSelected ? 0.8 : 0.5,
          color: isSelected ? '#FFFFEB' : '#141414',
          weight: isSelected ? 2.5 : 0.6,
        };
      }

      return {
        fillColor: '#1b1b1a',
        fillOpacity: 0.45,
        color: '#2f2f2e',
        weight: 0.7,
      };
    };

    const geoLayer = L.geoJSON(texasCountiesData as any, {
      style: styleFeature,
      onEachFeature: (feature, layer) => {
        const countyName = feature.properties.name || '';
        const fips = feature.properties.fips;
        const matchingCounty = findCounty(countyName, fips);

        const majorityText = matchingCounty?.majorityParty === 'Democratic'
          ? `<span style="color:#60a5fa;font-weight:bold;">Majority Democratic (${matchingCounty.margin2024 || matchingCounty.politicalLean})</span>`
          : matchingCounty?.majorityParty === 'Republican'
          ? `<span style="color:#f87171;font-weight:bold;">Majority Republican (${matchingCounty.margin2024 || matchingCounty.politicalLean})</span>`
          : `<span style="color:#c084fc;font-weight:bold;">Competitive / Swing (${matchingCounty?.margin2024 || matchingCounty?.politicalLean})</span>`;

        const metricDisplay = matchingCounty
          ? activeDataLayer === 'vouchers'
            ? `<br/><span style="color:#10b981">Vouchers: ${matchingCounty.voucherStance}</span>`
            : activeDataLayer === 'turnout'
            ? `<br/><span style="color:#fbbf24">2024 Turnout: ${matchingCounty.turnout2024}</span>`
            : activeDataLayer === 'party'
            ? `<br/>${majorityText}`
            : activeDataLayer === 'border'
            ? `<br/><span style="color:#38bdf8">Border: ${matchingCounty.borderStance}</span>`
            : ''
          : '';

        layer.bindTooltip(
          `<div style="font-family:sans-serif;font-size:11px;color:#FFFFEB;background:#181817;padding:5px 9px;border-radius:6px;border:1px solid #333;box-shadow:0 4px 12px rgba(0,0,0,0.7);line-height:1.4;">
            <div style="font-weight:bold;font-size:12px;">${feature.properties.fullName || countyName + ' County'}</div>
            ${majorityText}
            ${metricDisplay && activeDataLayer !== 'party' ? metricDisplay : ''}
            <div style="font-size:10px;color:#94a3b8;margin-top:2px;">Turnout: ${matchingCounty?.turnout2024 || '64%'} • Seat: ${matchingCounty?.countySeat || countyName}</div>
          </div>`,
          { sticky: true, opacity: 0.98 }
        );

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 2.5,
              color: '#FFFFEB',
              fillOpacity: 0.75,
            });
            target.bringToFront();
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
          },
          click: () => {
            if (matchingCounty) {
              onSelectCounty(matchingCounty.id);
            }
          },
        });
      },
    }).addTo(map);

    geoJsonLayerRef.current = geoLayer;

    const markersGroup = markersLayerRef.current;
    if (!markersGroup) return;

    if (divisionMode === 'districts') {
      TEXAS_MAP_DISTRICTS.filter((d) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const haystack = `${d.code} ${d.name} ${d.representative} ${d.counties.join(' ')}`.toLowerCase();
          return haystack.includes(q);
        }
        return true;
      }).forEach((d) => {
        const coords = DISTRICT_GPS[d.id];
        if (!coords) return;

        const isSelected = d.id === selectedDistrictId;
        const color =
          activeDataLayer === 'party'
            ? d.party === 'Republican' ? '#ef4444' : '#3b82f6'
            : activeDataLayer === 'vouchers'
            ? d.votes.hb1Vouchers === 'Nay' ? '#10b981' : '#f59e0b'
            : activeDataLayer === 'turnout'
            ? parseFloat(d.turnoutRate2024) >= 65 ? '#fbbf24' : '#38bdf8'
            : '#f59e0b';

        const iconHtml = `
          <div data-testid="marker-district-${d.code}" style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            ${isSelected ? `<div style="position:absolute;width:28px;height:28px;border-radius:50%;border:2px solid ${color};box-shadow:0 0 10px ${color};"></div>` : ''}
            <div style="width:${isSelected ? '16px' : '11px'};height:${isSelected ? '16px' : '11px'};border-radius:50%;background:${color};border:2px solid #141414;box-shadow:0 2px 4px rgba(0,0,0,0.8);"></div>
            ${isSelected ? `<div style="position:absolute;top:-18px;background:#181817;border:1px solid ${color};color:#FFFFEB;font-size:10px;font-weight:bold;font-family:monospace;padding:1px 5px;border-radius:4px;white-space:nowrap;">${d.code}</div>` : ''}
          </div>
        `;

        const marker = L.marker(coords, {
          title: `${d.code}: ${d.representative}`,
          icon: L.divIcon({
            className: 'custom-district-marker',
            html: iconHtml,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          }),
        });

        marker.on('click', () => onSelectDistrict(d.id));
        marker.bindTooltip(`<b>${d.code}: ${d.representative}</b><br/>${d.name}`, { opacity: 0.95 });
        markersGroup.addLayer(marker);
      });
    }

    if (divisionMode === 'politicians') {
      TEXAS_MAP_POLITICIANS.filter((pol) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const haystack = `${pol.name} ${pol.role} ${pol.districtCode} ${pol.countiesServed.join(' ')}`.toLowerCase();
          return haystack.includes(q);
        }
        return true;
      }).forEach((pol) => {
        const coords = POLITICIAN_COORDS[pol.id];
        if (!coords) return;

        const isSelected = pol.id === selectedPoliticianId;
        const color = pol.party === 'Republican' ? '#ef4444' : pol.party === 'Democratic' ? '#3b82f6' : '#a855f7';

        const iconHtml = `
          <div data-testid="marker-politician-${pol.id}" style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            ${isSelected ? `<div style="position:absolute;width:32px;height:32px;border-radius:50%;border:2px dashed #FFFFEB;box-shadow:0 0 12px ${color};"></div>` : ''}
            <div style="width:${isSelected ? '20px' : '14px'};height:${isSelected ? '20px' : '14px'};border-radius:50%;background:${color};border:2px solid #FFFFEB;display:flex;align-items:center;justify-content:center;color:#FFFFEB;font-size:9px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.8);">
              ${pol.name.charAt(0)}
            </div>
            ${isSelected ? `<div style="position:absolute;top:-20px;background:#181817;border:1px solid #FFFFEB;color:#FFFFEB;font-size:10px;font-weight:bold;padding:1px 6px;border-radius:4px;white-space:nowrap;">${pol.name}</div>` : ''}
          </div>
        `;

        const marker = L.marker(coords, {
          title: pol.name,
          icon: L.divIcon({
            className: 'custom-pol-marker',
            html: iconHtml,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          }),
        });

        marker.on('click', () => onSelectPolitician(pol.id));
        marker.bindTooltip(`<b>${pol.name}</b><br/>${pol.role}`, { opacity: 0.95 });
        markersGroup.addLayer(marker);
      });
    }

    if (divisionMode === 'senate') {
      TEXAS_SENATE_DISTRICTS.filter((sd) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const haystack = `${sd.code} ${sd.name} ${sd.senator} ${sd.majorCounties.join(' ')} ${sd.keyCities.join(' ')}`.toLowerCase();
          return haystack.includes(q);
        }
        return true;
      }).forEach((sd) => {
        const isSelected = sd.id === selectedSenateId;
        const color = sd.party === 'Republican' ? '#ef4444' : '#3b82f6';

        const iconHtml = `
          <div data-testid="marker-senate-${sd.code}" style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            ${isSelected ? `<div style="position:absolute;width:30px;height:30px;border-radius:50%;border:2px solid ${color};box-shadow:0 0 10px ${color};"></div>` : ''}
            <div style="width:${isSelected ? '18px' : '12px'};height:${isSelected ? '18px' : '12px'};border-radius:50%;background:${color};border:2px solid #FFFFEB;box-shadow:0 2px 5px rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;color:#FFFFEB;">
              ${sd.districtNumber}
            </div>
            ${isSelected ? `<div style="position:absolute;top:-18px;background:#181817;border:1px solid ${color};color:#FFFFEB;font-size:10px;font-weight:bold;font-family:monospace;padding:1px 5px;border-radius:4px;white-space:nowrap;">${sd.code}</div>` : ''}
          </div>
        `;

        const marker = L.marker([sd.lat, sd.lng], {
          title: `${sd.code}: Sen. ${sd.senator}`,
          icon: L.divIcon({
            className: 'custom-senate-marker',
            html: iconHtml,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
        });

        marker.on('click', () => onSelectSenate(sd.id));
        marker.bindTooltip(
          `<b>${sd.name}</b><br/>Senator: ${sd.senator} (${sd.party})<br/>Cities: ${sd.keyCities.slice(0, 3).join(', ')}`,
          { opacity: 0.95 }
        );
        markersGroup.addLayer(marker);
      });
    }
  }, [
    divisionMode,
    activeDataLayer,
    selectedDistrictId,
    selectedCountyId,
    selectedPoliticianId,
    selectedSenateId,
    searchQuery,
  ]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => mapInstanceRef.current?.setView([31.2, -99.2], 6);

  return (
    <div className="relative w-full h-[540px] rounded-3xl overflow-hidden border border-[#262625] bg-[#141413]">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-1 p-1 rounded-xl bg-[#181817]/90 backdrop-blur-md border border-[#2b2b2a] shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-[#282827] cursor-pointer transition-colors"
        >
          <span className="text-base font-bold leading-none block">+</span>
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-[#282827] cursor-pointer transition-colors"
        >
          <span className="text-base font-bold leading-none block">−</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          title="Reset to Full Texas View"
          className="px-1.5 py-1 rounded-lg text-[10px] font-mono font-bold text-amber-400 hover:bg-[#282827] cursor-pointer transition-colors"
        >
          TX
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-[400] px-3 py-1.5 rounded-xl bg-[#181817]/90 backdrop-blur-md border border-[#2b2b2a] text-[11px] font-mono text-stone-300 shadow-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="capitalize">{divisionMode}:</span>
        <span className="font-bold text-white">
          {divisionMode === 'counties'
            ? '254 Counties'
            : divisionMode === 'districts'
            ? '38 Congressional'
            : divisionMode === 'senate'
            ? '31 Texas Senate'
            : '12 Featured Officials'}
        </span>
      </div>
    </div>
  );
};

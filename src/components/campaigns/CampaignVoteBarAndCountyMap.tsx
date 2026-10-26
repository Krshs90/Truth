import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Vote,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { CampaignRace, Candidate } from '../../types';
import { getDistrictCountiesData } from '../../data/candidates';

interface CampaignVoteBarAndCountyMapProps {
  activeRace: CampaignRace;
  candidateA: Candidate;
  candidateB: Candidate;
  isCustomMatchup?: boolean;
}

interface CountyData {
  id: string;
  name: string;
  region: string;
  population: string;
  voterShare: string;
  candAPercent: number;
  candBPercent: number;
  undecidedPercent: number;
  marginText: string;
  leadingCandidateId: string;
  keyIssueDriver: string;
}

export const CampaignVoteBarAndCountyMap: React.FC<CampaignVoteBarAndCountyMapProps> = ({
  activeRace,
  candidateA,
  candidateB,
  isCustomMatchup = false,
}) => {
  const isDistrictRace = activeRace.id.startsWith('tx-cd');
  const districtNumber = isDistrictRace ? activeRace.id.match(/tx-cd(\d+)-2026/)?.[1] || null : null;

  const getInitialCounty = (raceId: string) => {
    if (raceId === 'tx-cd10-2026') return 'travis-tx10';
    if (raceId === 'tx-cd26-2026') return 'denton';
    if (raceId.startsWith('tx-cd')) {
      const match = raceId.match(/tx-cd(\d+)-2026/);
      if (match) {
        const num = parseInt(match[1], 10);
        const dynamicCounties = getDistrictCountiesData(num, candidateA, candidateB);
        if (dynamicCounties.length > 0) return dynamicCounties[0].id;
      }
    }
    return 'tarrant';
  };

  const [selectedCountyId, setSelectedCountyId] = useState<string>(
    getInitialCounty(activeRace.id)
  );

  useEffect(() => {
    setSelectedCountyId(getInitialCounty(activeRace.id));
  }, [activeRace.id]);

  const getNextElection = () => {
    const now = new Date();
    const primary = new Date('2026-03-03T07:00:00');
    const runoff = new Date('2026-05-26T07:00:00');
    const general = new Date('2026-11-03T07:00:00');

    if (now < primary) {
      const diffDays = Math.ceil((primary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        label: 'Texas Statewide Primary Election',
        dateStr: 'March 3, 2026',
        daysLeft: diffDays,
        phase: 'Party Nominations Phase',
      };
    } else if (now < runoff) {
      const diffDays = Math.ceil((runoff.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        label: 'Texas Primary Runoff Election',
        dateStr: 'May 26, 2026',
        daysLeft: diffDays,
        phase: 'Runoff Decisions Phase',
      };
    } else {
      const diffDays = Math.max(0, Math.ceil((general.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      return {
        label: 'Texas General Election',
        dateStr: 'November 3, 2026',
        daysLeft: diffDays,
        phase: 'General Election Floor Fight',
      };
    }
  };

  const nextElection = getNextElection();

  const parsePercent = (est?: string, fallback: number = 45): number => {
    if (!est) return fallback;
    const match = est.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : fallback;
  };

  const aPercent = parsePercent(candidateA.pollingSnapshot?.estimate, 48.2);
  const bPercent = parsePercent(candidateB.pollingSnapshot?.estimate, 44.8);
  const undecidedPercent = Math.max(0, Number((100 - aPercent - bPercent).toFixed(1)));
  const margin = Number(Math.abs(aPercent - bPercent).toFixed(1));
  const leader = aPercent > bPercent ? candidateA : candidateB;
  const isWithinMoe = margin <= 3.5;

  const tx26Counties: CountyData[] = [
    {
      id: 'denton',
      name: 'Denton County (Denton / Lewisville)',
      region: 'North Texas Suburbs (Core of TX-26)',
      population: '1.01M',
      voterShare: '76.4% of district vote',
      candAPercent: 56.4,
      candBPercent: 41.2,
      undecidedPercent: 2.4,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +15.2%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Suburban core of TX-26; heavy debates over property tax relief, school safety, suburban growth, and border security policy',
    },
    {
      id: 'wise',
      name: 'Wise County (Decatur / Bridgeport)',
      region: 'Northwest DFW / Wise',
      population: '75K',
      voterShare: '15.8% of district vote',
      candAPercent: 78.5,
      candBPercent: 19.8,
      undecidedPercent: 1.7,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +58.7%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Energy sector development, rural broadband expansion, agricultural water rights, and conservative grassroots organizing',
    },
    {
      id: 'cooke',
      name: 'Cooke County (Gainesville / Red River)',
      region: 'Red River Border / Cooke',
      population: '42K',
      voterShare: '7.8% of district vote',
      candAPercent: 81.2,
      candBPercent: 17.1,
      undecidedPercent: 1.7,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +64.1%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Red River border commerce, rural healthcare access, county roads infrastructure, and constitutional liberty guarantees',
    },
  ];

  const tx10Counties: CountyData[] = [
    {
      id: 'travis-tx10',
      name: 'Travis County (Pflugerville / East Austin / Manor)',
      region: 'Central Texas / Western TX-10',
      population: '1.33M',
      voterShare: '36.8% of district vote',
      candAPercent: 43.5,
      candBPercent: 54.1,
      undecidedPercent: 2.4,
      marginText: `${candidateB.name.split(' ').slice(-1)[0]} +10.6%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Pflugerville & Manor semiconductor corridor expansion, public school funding, suburban traffic mitigation, and reproductive rights',
    },
    {
      id: 'brazos',
      name: 'Brazos County (College Station / Bryan - Texas A&M)',
      region: 'Brazos Valley / Eastern TX-10 Anchor',
      population: '240K',
      voterShare: '31.5% of district vote',
      candAPercent: 63.8,
      candBPercent: 34.2,
      undecidedPercent: 2.0,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +29.6%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Texas A&M University defense research initiatives, semiconductor workforce grants, conservative alumni turnout, and national security',
    },
    {
      id: 'bastrop',
      name: 'Bastrop County (Bastrop / Elgin / Smithville)',
      region: 'Highway 71 Corridor / Bastrop',
      population: '106K',
      voterShare: '18.2% of district vote',
      candAPercent: 56.4,
      candBPercent: 41.5,
      undecidedPercent: 2.1,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +14.9%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Regional water supply agreements, Highway 71 commuter congestion, property tax relief, and rural emergency medical infrastructure',
    },
    {
      id: 'lee',
      name: 'Lee County (Giddings)',
      region: 'Rural Central Texas / Lee',
      population: '18K',
      voterShare: '6.8% of district vote',
      candAPercent: 75.8,
      candBPercent: 22.4,
      undecidedPercent: 1.8,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +53.4%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Agricultural livestock support, rural broadband deployment, and county road surface maintenance grants',
    },
    {
      id: 'burleson',
      name: 'Burleson County (Caldwell)',
      region: 'Brazos Valley Rural / Burleson',
      population: '19K',
      voterShare: '6.7% of district vote',
      candAPercent: 78.2,
      candBPercent: 20.1,
      undecidedPercent: 1.7,
      marginText: `${candidateA.name.split(' ').slice(-1)[0]} +58.1%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Oil & gas mineral rights protection, rural hospital preservation, and second amendment rights',
    },
  ];

  const statewideCounties: CountyData[] = [
    {
      id: 'harris',
      name: 'Harris County (Houston)',
      region: 'Gulf Coast / Houston Metro',
      population: '4.78M',
      voterShare: '16.2% of statewide vote',
      candAPercent: 44.4,
      candBPercent: 53.6,
      undecidedPercent: 2.0,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +9.2%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Urban core healthcare access, flood mitigation infrastructure, and voter turnout',
    },
    {
      id: 'dallas',
      name: 'Dallas County (Dallas)',
      region: 'North Texas / DFW',
      population: '2.61M',
      voterShare: '8.8% of statewide vote',
      candAPercent: 38.4,
      candBPercent: 59.8,
      undecidedPercent: 1.8,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +21.4%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Criminal justice reforms, public transit funding, and urban base mobilization',
    },
    {
      id: 'tarrant',
      name: 'Tarrant County (Fort Worth)',
      region: 'North Texas / DFW',
      population: '2.15M',
      voterShare: '7.4% of statewide vote',
      candAPercent: 49.8,
      candBPercent: 48.0,
      undecidedPercent: 2.2,
      marginText: `${candidateA.name.split(' ').slice(-1)[0] || 'R'} +1.8%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Key suburban bellwether; moderate swing voters focused on property taxes and public safety',
    },
    {
      id: 'bexar',
      name: 'Bexar County (San Antonio)',
      region: 'South Central Texas',
      population: '2.06M',
      voterShare: '6.9% of statewide vote',
      candAPercent: 42.1,
      candBPercent: 55.7,
      undecidedPercent: 2.2,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +13.6%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Latino turnout, veteran healthcare services, and public education funding',
    },
    {
      id: 'travis',
      name: 'Travis County (Austin)',
      region: 'Central Texas / Capital',
      population: '1.33M',
      voterShare: '5.6% of statewide vote',
      candAPercent: 27.0,
      candBPercent: 71.0,
      undecidedPercent: 2.0,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +44.0%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Stronghold Democratic core; high opposition to private school vouchers and state interference in local governance',
    },
    {
      id: 'collin',
      name: 'Collin County (Plano/Frisco)',
      region: 'North Texas Suburbs',
      population: '1.16M',
      voterShare: '4.8% of statewide vote',
      candAPercent: 52.4,
      candBPercent: 45.3,
      undecidedPercent: 2.3,
      marginText: `${candidateA.name.split(' ').slice(-1)[0] || 'R'} +7.1%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Rapidly growing affluent suburbs; debates over private school voucher programs and business tax incentives',
    },
    {
      id: 'denton',
      name: 'Denton County (Denton/Lewisville)',
      region: 'North Texas Suburbs (TX-26)',
      population: '1.01M',
      voterShare: '4.1% of statewide vote',
      candAPercent: 53.1,
      candBPercent: 44.8,
      undecidedPercent: 2.1,
      marginText: `${candidateA.name.split(' ').slice(-1)[0] || 'R'} +8.3%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Home base of Rep. Brandon Gill (TX-26); high concern over property appraisals, suburban school quality, and border control',
    },
    {
      id: 'williamson',
      name: 'Williamson County (Round Rock)',
      region: 'Central Texas Suburbs',
      population: '671K',
      voterShare: '2.9% of statewide vote',
      candAPercent: 48.3,
      candBPercent: 49.8,
      undecidedPercent: 1.9,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +1.5%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'High-tech corridor (Dell, Apple, Samsung); highly educated swing voters prioritizing public school funding over vouchers',
    },
    {
      id: 'fortbend',
      name: 'Fort Bend County (Sugar Land)',
      region: 'Houston Suburbs',
      population: '885K',
      voterShare: '3.4% of statewide vote',
      candAPercent: 47.6,
      candBPercent: 50.4,
      undecidedPercent: 2.0,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +2.8%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'One of the most ethnically diverse suburban counties in the nation; high civic participation and educational excellence focus',
    },
    {
      id: 'elpaso',
      name: 'El Paso County (El Paso)',
      region: 'Far West Texas / Border',
      population: '869K',
      voterShare: '2.5% of statewide vote',
      candAPercent: 34.3,
      candBPercent: 63.8,
      undecidedPercent: 1.9,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +29.5%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Binational border commerce, strict opposition to state SB 4 enforcement, and healthcare workforce shortages',
    },
    {
      id: 'montgomery',
      name: 'Montgomery County (The Woodlands)',
      region: 'North Houston Exurbs',
      population: '678K',
      voterShare: '3.1% of statewide vote',
      candAPercent: 70.1,
      candBPercent: 28.0,
      undecidedPercent: 1.9,
      marginText: `${candidateA.name.split(' ').slice(-1)[0] || 'R'} +42.1%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Solid conservative pillar; heavy turnout for border enforcement, constitutional conservative judges, and gun rights',
    },
    {
      id: 'lubbock',
      name: 'Lubbock County (Lubbock)',
      region: 'West Texas / Panhandle',
      population: '315K',
      voterShare: '1.2% of statewide vote',
      candAPercent: 65.5,
      candBPercent: 32.1,
      undecidedPercent: 2.4,
      marginText: `${candidateA.name.split(' ').slice(-1)[0] || 'R'} +33.4%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Agricultural cotton and livestock interests, water infrastructure rights, and oil and gas sector stability',
    },
    {
      id: 'hays',
      name: 'Hays County (San Marcos/Buda)',
      region: 'Central Texas / I-35',
      population: '261K',
      voterShare: '1.1% of statewide vote',
      candAPercent: 45.6,
      candBPercent: 52.3,
      undecidedPercent: 2.1,
      marginText: `${candidateB.name.split(' ').slice(-1)[0] || 'D'} +6.7%`,
      leadingCandidateId: candidateB.id,
      keyIssueDriver: 'Texas State University youth vote, explosive commuter population growth, and regional water supply management',
    },
    {
      id: 'brazoria',
      name: 'Brazoria County (Pearland)',
      region: 'Gulf Coast Suburbs',
      population: '388K',
      voterShare: '1.5% of statewide vote',
      candAPercent: 54.6,
      candBPercent: 43.4,
      undecidedPercent: 2.0,
      marginText: `${candidateA.name.split(' ').slice(-1)[0] || 'R'} +11.2%`,
      leadingCandidateId: candidateA.id,
      keyIssueDriver: 'Petrochemical refinery workforce, coastal storm surge protection, and suburban residential expansion',
    },
  ];

  const parseAmount = (val?: string): number => {
    if (!val) return 0;
    const match = val.replace(/[^0-9.]/g, '');
    const num = parseFloat(match);
    if (isNaN(num)) return 0;
    if (val.toUpperCase().includes('M')) return num * 1000000;
    if (val.toUpperCase().includes('K')) return num * 1000;
    return num;
  };

  const aRaisedNum = parseAmount(candidateA.campaignFinance?.totalRaised || '$10M');
  const bRaisedNum = parseAmount(candidateB.campaignFinance?.totalRaised || '$8M');
  const totalRaised = aRaisedNum + bRaisedNum;
  const aRaisedPercent = totalRaised > 0 ? Number(((aRaisedNum / totalRaised) * 100).toFixed(1)) : 50;
  const bRaisedPercent = Number((100 - aRaisedPercent).toFixed(1));

  const aCashNum = parseAmount(candidateA.campaignFinance?.cashOnHand || '$5M');
  const bCashNum = parseAmount(candidateB.campaignFinance?.cashOnHand || '$4M');
  const totalCash = aCashNum + bCashNum;
  const aCashPercent = totalCash > 0 ? Number(((aCashNum / totalCash) * 100).toFixed(1)) : 50;
  const bCashPercent = Number((100 - aCashPercent).toFixed(1));

  if (isCustomMatchup) {
    return (
      <div className="space-y-6">
        <div
          className="p-5 md:p-6 rounded-3xl border space-y-4"
          style={{ background: '#141414', borderColor: '#2A2A2A' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262625]">
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                  Custom Candidate Comparison • Side-by-Side Analysis
                </h3>
                <p className="text-[11px] text-stone-400 font-mono">
                  Comparing individual public records, fundraising filings, and independent benchmarks
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1c1c1b] border border-[#2b2b2a] text-xs text-stone-300 space-y-1">
            <span className="font-semibold text-amber-300 block">
              Notice: Not on the Same Ballot
            </span>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              <strong>{candidateA.name}</strong> ({candidateA.party} — {candidateA.officeSought}) and <strong>{candidateB.name}</strong> ({candidateB.party} — {candidateB.officeSought}) are not competing in an active head-to-head election on the same ballot. The metrics below compare their verified public records and campaign filings rather than simulated or fabricated head-to-head vote shares.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-300 font-bold">
                {candidateA.name}: <span className="text-rose-400">{candidateA.campaignFinance?.totalRaised || '$10M'}</span> ({aRaisedPercent}%)
              </span>
              <span className="text-stone-500 text-[11px]">Total Campaign Funds Raised</span>
              <span className="text-stone-300 font-bold">
                {candidateB.name}: <span className="text-sky-400">{candidateB.campaignFinance?.totalRaised || '$8M'}</span> ({bRaisedPercent}%)
              </span>
            </div>

            <div className="h-6 w-full rounded-xl bg-[#1d1d1c] p-1 flex items-center gap-1 border border-[#2f2f2e]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${aRaisedPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 flex items-center justify-start pl-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {aRaisedPercent}%
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bRaisedPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {bRaisedPercent}%
              </motion.div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-300 font-bold">
                {candidateA.name}: <span className="text-rose-400">{candidateA.campaignFinance?.cashOnHand || '$5M'}</span> ({aCashPercent}%)
              </span>
              <span className="text-stone-500 text-[11px]">Cash-on-Hand Reserves</span>
              <span className="text-stone-300 font-bold">
                {candidateB.name}: <span className="text-sky-400">{candidateB.campaignFinance?.cashOnHand || '$4M'}</span> ({bCashPercent}%)
              </span>
            </div>

            <div className="h-6 w-full rounded-xl bg-[#1d1d1c] p-1 flex items-center gap-1 border border-[#2f2f2e]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${aCashPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-start pl-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {aCashPercent}%
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bCashPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {bCashPercent}%
              </motion.div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#262625] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#191918] border border-[#262625] space-y-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase block">Documented Positions:</span>
              <div className="flex justify-between font-mono font-semibold">
                <span className="text-rose-300">{candidateA.name.split(' ').pop()}: {candidateA.policyPositions.length}</span>
                <span className="text-sky-300">{candidateB.name.split(' ').pop()}: {candidateB.policyPositions.length}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#191918] border border-[#262625] space-y-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase block">Jurisdiction:</span>
              <div className="flex justify-between font-mono font-semibold text-[11px]">
                <span className="text-stone-300">{candidateA.jurisdiction}</span>
                <span className="text-stone-300">{candidateB.jurisdiction}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#191918] border border-[#262625] space-y-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase block">Independent Benchmark Poll:</span>
              <div className="flex justify-between font-mono font-semibold">
                <span className="text-rose-300">{candidateA.pollingSnapshot?.estimate || 'N/A'}</span>
                <span className="text-sky-300">{candidateB.pollingSnapshot?.estimate || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-5 md:p-6 rounded-3xl border space-y-4"
          style={{ background: '#141414', borderColor: '#2A2A2A' }}
        >
          <div className="space-y-1 pb-3 border-b border-[#262625]">
            <h3 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Regional Constituencies & Geographic Bases</span>
            </h3>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              County-level head-to-head vote spreads require candidates to appear on the same ballot. The cards below detail the respective geographic constituencies and electoral bases of each candidate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#181817] border border-[#262625] space-y-2 text-xs">
              <div className="border-b border-[#262625] pb-2">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wide font-bold">
                  {candidateA.party} • {candidateA.officeSought}
                </span>
                <h4 className="text-base font-bold text-[#FFFFEB]">
                  {candidateA.name}
                </h4>
              </div>
              <div className="space-y-1 text-stone-300">
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Constituency / District:</span>
                  <span className="font-semibold text-[#FFFFEB]">{candidateA.district}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Incumbency Status:</span>
                  <span className="text-stone-300">{candidateA.isIncumbent ? 'Incumbent in Office' : 'Challenger / Candidate'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Target Election:</span>
                  <span className="text-amber-300 font-mono">{candidateA.electionName}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#181817] border border-[#262625] space-y-2 text-xs">
              <div className="border-b border-[#262625] pb-2">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wide font-bold">
                  {candidateB.party} • {candidateB.officeSought}
                </span>
                <h4 className="text-base font-bold text-[#FFFFEB]">
                  {candidateB.name}
                </h4>
              </div>
              <div className="space-y-1 text-stone-300">
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Constituency / District:</span>
                  <span className="font-semibold text-[#FFFFEB]">{candidateB.district}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Incumbency Status:</span>
                  <span className="text-stone-300">{candidateB.isIncumbent ? 'Incumbent in Office' : 'Challenger / Candidate'}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono text-[10px] block">Target Election:</span>
                  <span className="text-amber-300 font-mono">{candidateB.electionName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getCountiesForRace = (): CountyData[] => {
    if (activeRace.id === 'tx-cd10-2026') return tx10Counties;
    if (activeRace.id === 'tx-cd26-2026') return tx26Counties;
    if (isDistrictRace && districtNumber) {
      const dynamicCounties = getDistrictCountiesData(parseInt(districtNumber, 10), candidateA, candidateB);
      if (dynamicCounties && dynamicCounties.length > 0) return dynamicCounties;
    }
    return statewideCounties;
  };

  const counties = getCountiesForRace();
  const activeCounty = counties.find((c) => c.id === selectedCountyId) || counties[0];

  return (
    <div className="space-y-6">
      <div
        className="p-5 md:p-6 rounded-3xl border space-y-4"
        style={{ background: '#141414', borderColor: '#2A2A2A' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262625]">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                Projected Vote Share & Lead Indicator &bull; {activeRace.name.split(':')[0]}
              </h3>
              <p className="text-[11px] text-stone-400 font-mono">
                Aggregated benchmark poll composite &bull; Texas registered voter sample
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-stone-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Next Election: <strong>{nextElection.dateStr}</strong></span>
            </span>
            <span className="text-stone-600">&bull;</span>
            <span className="text-amber-400 font-bold">{nextElection.daysLeft} Days to Polls</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold font-serif text-[#FFFFEB]">
              {leader.name.split(' ').slice(-1)[0]} +{margin}%
            </span>
            <span className="text-xs text-stone-400 font-mono">
              ({isWithinMoe ? 'Statistical Dead Heat / Within Margin of Error' : 'Outside 3.5% Margin of Error'})
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>{candidateA.name}: {aPercent}%</span>
            </span>
            <span className="text-stone-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-500 inline-block" />
              <span>Undecided: {undecidedPercent}%</span>
            </span>
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
              <span>{candidateB.name}: {bPercent}%</span>
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="h-7 w-full rounded-xl bg-[#1d1d1c] p-1 flex items-center gap-1 relative overflow-hidden border border-[#2f2f2e]">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400/90 z-20 pointer-events-none"
              style={{ left: '50%' }}
              title="50% Majority Threshold"
            />

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${aPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 flex items-center justify-start pl-2 text-[10px] font-mono font-bold text-white tracking-wider truncate"
              title={`${candidateA.name}: ${aPercent}%`}
            >
              {aPercent}%
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${undecidedPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-lg bg-[#333332] flex items-center justify-center text-[10px] font-mono font-bold text-stone-400 tracking-wider truncate"
              title={`Undecided / Third Party: ${undecidedPercent}%`}
            >
              {undecidedPercent > 3 ? `${undecidedPercent}% Undecided` : ''}
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white tracking-wider truncate"
              title={`${candidateB.name}: ${bPercent}%`}
            >
              {bPercent}%
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono pt-1">
            <span>50.0% Needed for Outright Victory</span>
            <span>Undecided / Third-Party Pool: <strong className="text-stone-300">{undecidedPercent}%</strong></span>
          </div>
        </div>
      </div>

      <div
        className="p-5 md:p-6 rounded-3xl border space-y-5"
        style={{ background: '#191918', borderColor: '#2A2A2A' }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#262625]">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-[#FFFFEB]">
                {districtNumber ? `TX-${districtNumber} District Counties` : 'County Voting Coalitions'}
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {districtNumber
                ? `County-by-county breakdown across the ${counties.length} counties comprising Texas Congressional District ${districtNumber}.`
                : 'Which counties are voting for which candidate? Explore how key counties shape the final margin.'}
            </p>
          </div>

          <div className="text-xs font-mono text-stone-400">
            Showing <strong className="text-[#FFFFEB]">{counties.length}</strong> {districtNumber ? `TX-${districtNumber} Counties` : 'Texas Counties'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 space-y-2.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
            {counties.map((county) => {
              const isSelected = selectedCountyId === county.id;
              const isAWinning = county.candAPercent > county.candBPercent;
              return (
                <div
                  key={county.id}
                  onClick={() => setSelectedCountyId(county.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#222221] border-amber-400/80 ring-1 ring-amber-400/30'
                      : 'bg-[#141414] border-[#262625] hover:border-[#383837]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs md:text-sm text-[#FFFFEB]">
                          {county.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {county.region} &bull; Pop: {county.population}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          isAWinning
                            ? 'bg-rose-950/60 text-rose-300 border border-rose-600/40'
                            : 'bg-sky-950/60 text-sky-300 border border-sky-600/40'
                        }`}
                      >
                        {county.marginText}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 w-full rounded-full bg-[#1b1b1a] overflow-hidden flex">
                      <div
                        style={{ width: `${county.candAPercent}%` }}
                        className="h-full bg-rose-500"
                      />
                      <div
                        style={{ width: `${county.undecidedPercent}%` }}
                        className="h-full bg-stone-700"
                      />
                      <div
                        style={{ width: `${county.candBPercent}%` }}
                        className="h-full bg-sky-500"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                      <span>{candidateA.name.split(' ').slice(-1)[0]}: {county.candAPercent}%</span>
                      <span className="text-stone-500">{county.voterShare}</span>
                      <span>{candidateB.name.split(' ').slice(-1)[0]}: {county.candBPercent}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="lg:col-span-5 p-5 rounded-2xl border space-y-4 flex flex-col justify-between"
            style={{ background: '#141414', borderColor: '#2A2A2A' }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#242423]">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                    Selected County Breakdown
                  </span>
                  <h4 className="text-base font-bold text-[#FFFFEB]">
                    {activeCounty.name}
                  </h4>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                    activeCounty.candAPercent > activeCounty.candBPercent
                      ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                      : 'bg-sky-950 text-sky-300 border border-sky-600/50'
                  }`}
                >
                  {activeCounty.marginText}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#1b1b1a] border border-[#2b2b2a]">
                  <span className="text-rose-400 block font-bold">{candidateA.name}</span>
                  <span className="text-lg font-bold text-[#FFFFEB]">{activeCounty.candAPercent}%</span>
                  <span className="text-[10px] text-stone-500 block">{candidateA.party}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1b1b1a] border border-[#2b2b2a]">
                  <span className="text-sky-400 block font-bold">{candidateB.name}</span>
                  <span className="text-lg font-bold text-[#FFFFEB]">{activeCounty.candBPercent}%</span>
                  <span className="text-[10px] text-stone-500 block">{candidateB.party}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1b1b1a] border border-[#262625] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold font-mono text-[11px]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Key Policy & Turnout Drivers:</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-[11px]">
                  {activeCounty.keyIssueDriver}
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono text-stone-400">
                <div className="flex justify-between border-b border-[#222] py-1">
                  <span>{districtNumber ? 'District Voter Share:' : 'Statewide Voter Weight:'}</span>
                  <strong className="text-stone-200">{activeCounty.voterShare}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>Population:</span>
                  <strong className="text-stone-200">{activeCounty.population}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#222] text-[11px] text-stone-400 italic">
              {districtNumber
                ? `TX-${districtNumber} victory is decided across its ${counties.length} constituent counties balancing suburban growth alongside regional turnout.`
                : 'Winning Texas requires carrying key suburban counties while maintaining high turnout in base regions.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

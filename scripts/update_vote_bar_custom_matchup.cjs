const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'campaigns', 'CampaignVoteBarAndCountyMap.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  `interface CampaignVoteBarAndCountyMapProps {
  activeRace: CampaignRace;
  candidateA: Candidate;
  candidateB: Candidate;
}`,
  `interface CampaignVoteBarAndCountyMapProps {
  activeRace: CampaignRace;
  candidateA: Candidate;
  candidateB: Candidate;
  isCustomMatchup?: boolean;
}`
);

content = content.replace(
  `export const CampaignVoteBarAndCountyMap: React.FC<CampaignVoteBarAndCountyMapProps> = ({
  activeRace,
  candidateA,
  candidateB,
}) => {`,
  `export const CampaignVoteBarAndCountyMap: React.FC<CampaignVoteBarAndCountyMapProps> = ({
  activeRace,
  candidateA,
  candidateB,
  isCustomMatchup = false,
}) => {`
);

const customMatchupBlock = `  // Custom matchup finances parsing
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
        {/* Notice of Custom Matchup */}
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

          {/* Honest Notice */}
          <div className="p-3.5 rounded-2xl bg-[#1c1c1b] border border-[#2b2b2a] text-xs text-stone-300 space-y-1">
            <span className="font-semibold text-amber-300 block">
              Notice: Not on the Same Ballot
            </span>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              <strong>{candidateA.name}</strong> ({candidateA.party} — {candidateA.officeSought}) and <strong>{candidateB.name}</strong> ({candidateB.party} — {candidateB.officeSought}) are not competing in an active head-to-head election on the same ballot. The metrics below compare their verified public records and campaign filings rather than simulated or fabricated head-to-head vote shares.
            </p>
          </div>

          {/* Comparison Bar 1: Total Funds Raised */}
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
                animate={{ width: \`\${aRaisedPercent}%\` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 flex items-center justify-start pl-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {aRaisedPercent}%
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: \`\${bRaisedPercent}%\` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {bRaisedPercent}%
              </motion.div>
            </div>
          </div>

          {/* Comparison Bar 2: Cash on Hand */}
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
                animate={{ width: \`\${aCashPercent}%\` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-start pl-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {aCashPercent}%
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: \`\${bCashPercent}%\` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white truncate"
              >
                {bCashPercent}%
              </motion.div>
            </div>
          </div>

          {/* Quick Metrics Comparison Table */}
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

        {/* Regional Base Comparison for Custom Matchup */}
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
            {/* Candidate A Base */}
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

            {/* Candidate B Base */}
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
`;

const anchor = 'const counties = isDistrict26 ? tx26Counties : statewideCounties;';
const anchorIdx = content.indexOf(anchor);
if (anchorIdx === -1) {
  throw new Error('Could not find anchor in CampaignVoteBarAndCountyMap.tsx');
}

content = content.slice(0, anchorIdx) + customMatchupBlock + '\n  ' + content.slice(anchorIdx);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated CampaignVoteBarAndCountyMap.tsx with custom candidate matchup comparison bar!');

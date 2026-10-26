import React, { useState } from 'react';
import {
  ExternalLink,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { TexasInteractiveMap } from './TexasInteractiveMap';

interface VoteRecord {
  id: string;
  chamber: 'Texas Senate' | 'Texas House' | 'U.S. Congress';
  billNumber: string;
  billTitle: string;
  session: string;
  date: string;
  topic: string;
  outcome: 'Passed' | 'Failed';
  yeas: number;
  nays: number;
  present: number;
  absent: number;
  gopYeas: number;
  gopNays: number;
  demYeas: number;
  demNays: number;
  journalUrl: string;
  keyTakeaway: string;
  texasDelegationHighlights?: Array<{
    name: string;
    office: string;
    vote: 'Yea' | 'Nay';
    party: 'Republican' | 'Democratic';
  }>;
}

const LANDMARK_VOTES: VoteRecord[] = [
  {
    id: 'vote-tx-sb2',
    chamber: 'Texas Senate',
    billNumber: 'TX 88(2C) SB 2',
    billTitle: 'Property Tax Relief Act ($100k Homestead Exemption & Rate Compression)',
    session: '88th Legislature (2nd Called Session)',
    date: 'July 12, 2023',
    topic: 'Property Taxes',
    outcome: 'Passed',
    yeas: 31,
    nays: 0,
    present: 0,
    absent: 0,
    gopYeas: 19,
    gopNays: 0,
    demYeas: 12,
    demNays: 0,
    journalUrl: 'https://journals.senate.texas.gov/sjrnl/882/pdf/88S2SJ07-12-F.PDF',
    keyTakeaway: 'Unanimous 31-0 bipartisan passage in the Texas Senate to provide $12.7B in compression and increase homestead exemption to $100,000.',
    texasDelegationHighlights: [
      { name: 'Sarah Eckhardt', office: 'SD-14 (Austin)', vote: 'Yea', party: 'Democratic' },
      { name: 'Tan Parker', office: 'SD-12 (Denton/Wise)', vote: 'Yea', party: 'Republican' },
      { name: 'Donna Campbell', office: 'SD-25 (New Braunfels)', vote: 'Yea', party: 'Republican' },
      { name: 'Royce West', office: 'SD-23 (Dallas)', vote: 'Yea', party: 'Democratic' },
    ],
  },
  {
    id: 'vote-tx-sb4',
    chamber: 'Texas House',
    billNumber: 'TX 88(3C) SB 4',
    billTitle: 'State Illegal Entry & Local Removal Offenses (Border Enforcement)',
    session: '88th Legislature (3rd Called Session)',
    date: 'November 14, 2023',
    topic: 'Border Security',
    outcome: 'Passed',
    yeas: 84,
    nays: 63,
    present: 0,
    absent: 3,
    gopYeas: 83,
    gopNays: 0,
    demYeas: 1,
    demNays: 63,
    journalUrl: 'https://journals.house.texas.gov/hjrnl/883/pdf/88S3HJ11-14-F.PDF',
    keyTakeaway: 'Strictly party-line passage authorizing state magistrates to order undocumented individuals returned to Mexico upon conviction.',
    texasDelegationHighlights: [
      { name: 'Gina Hinojosa', office: 'HD-49 (Austin)', vote: 'Nay', party: 'Democratic' },
      { name: 'Dade Phelan', office: 'HD-21 (Beaumont)', vote: 'Yea', party: 'Republican' },
      { name: 'Dustin Burrows', office: 'HD-83 (Lubbock)', vote: 'Yea', party: 'Republican' },
      { name: 'Sheryl Cole', office: 'HD-46 (Austin)', vote: 'Nay', party: 'Democratic' },
    ],
  },
  {
    id: 'vote-tx-hb1-voucher',
    chamber: 'Texas House',
    billNumber: 'TX 88(4C) HB 1 (Raney Amendment)',
    billTitle: 'Amendment Striking Universal Education Savings Accounts (School Vouchers)',
    session: '88th Legislature (4th Called Session)',
    date: 'November 17, 2023',
    topic: 'Education',
    outcome: 'Passed',
    yeas: 84,
    nays: 63,
    present: 0,
    absent: 3,
    gopYeas: 21,
    gopNays: 63,
    demYeas: 63,
    demNays: 0,
    journalUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
    keyTakeaway: 'Historic bipartisan coalition: 21 rural Republicans joined all 63 Democrats to strike school vouchers from the state education package.',
    texasDelegationHighlights: [
      { name: 'John Bucy III', office: 'HD-136 (Round Rock)', vote: 'Yea', party: 'Democratic' },
      { name: 'Ramon Romero Jr.', office: 'HD-90 (Fort Worth)', vote: 'Yea', party: 'Democratic' },
      { name: 'Morgan Meyer', office: 'HD-108 (Dallas)', vote: 'Nay', party: 'Republican' },
      { name: 'Carrie Isaac', office: 'HD-73 (Comal/Hays)', vote: 'Nay', party: 'Republican' },
    ],
  },
  {
    id: 'vote-tx-sb2627',
    chamber: 'Texas Senate',
    billNumber: 'TX 88(R) SB 2627',
    billTitle: 'Texas Energy Fund ($10 Billion Dispatchable Power Grid Infrastructure)',
    session: '88th Regular Session',
    date: 'May 23, 2023',
    topic: 'Energy & Grid',
    outcome: 'Passed',
    yeas: 30,
    nays: 1,
    present: 0,
    absent: 0,
    gopYeas: 19,
    gopNays: 0,
    demYeas: 11,
    demNays: 1,
    journalUrl: 'https://journals.senate.texas.gov/sjrnl/88r/pdf/88RSJ05-23-F.PDF',
    keyTakeaway: 'Broad bipartisan support to create low-interest state loans for dispatchable natural gas power plants to stabilize the ERCOT electric grid.',
    texasDelegationHighlights: [
      { name: 'Charles Schwertner', office: 'SD-5 (Round Rock/College Station)', vote: 'Yea', party: 'Republican' },
      { name: 'Paul Bettencourt', office: 'SD-7 (Houston)', vote: 'Yea', party: 'Republican' },
      { name: 'Sarah Eckhardt', office: 'SD-14 (Austin)', vote: 'Yea', party: 'Democratic' },
    ],
  },
  {
    id: 'vote-us-hr2',
    chamber: 'U.S. Congress',
    billNumber: 'U.S. House H.R. 2',
    billTitle: 'Secure the Border Act (Physical Infrastructure & Title 8 Enforcement)',
    session: '118th / 119th U.S. Congress',
    date: 'May 11, 2023 (119th Follow-up Jan 2025)',
    topic: 'Border Security',
    outcome: 'Passed',
    yeas: 219,
    nays: 213,
    present: 0,
    absent: 3,
    gopYeas: 219,
    gopNays: 0,
    demYeas: 0,
    demNays: 211,
    journalUrl: 'https://clerk.house.gov/Votes/2023209',
    keyTakeaway: 'Party-line federal passage to mandate physical border wall construction, resume Remain in Mexico, and overhaul asylum adjudication.',
    texasDelegationHighlights: [
      { name: 'Brandon Gill', office: 'TX-26 (Denton/Wise)', vote: 'Yea', party: 'Republican' },
      { name: 'Chip Roy', office: 'TX-21 (Hill Country)', vote: 'Yea', party: 'Republican' },
      { name: 'Dan Crenshaw', office: 'TX-02 (Houston)', vote: 'Yea', party: 'Republican' },
      { name: 'Lloyd Doggett', office: 'TX-37 (Austin)', vote: 'Nay', party: 'Democratic' },
      { name: 'Greg Casar', office: 'TX-35 (Austin/San Antonio)', vote: 'Nay', party: 'Democratic' },
    ],
  },
  {
    id: 'vote-us-hr1',
    chamber: 'U.S. Congress',
    billNumber: 'U.S. House H.R. 1',
    billTitle: 'Lower Energy Costs Act (Permitting Reform & Federal Leases)',
    session: '118th / 119th U.S. Congress',
    date: 'March 30, 2023 (119th Standing Res 2025)',
    topic: 'Energy & Economy',
    outcome: 'Passed',
    yeas: 225,
    nays: 204,
    present: 0,
    absent: 6,
    gopYeas: 221,
    gopNays: 1,
    demYeas: 4,
    demNays: 203,
    journalUrl: 'https://clerk.house.gov/Votes/2023182',
    keyTakeaway: 'Reauthorizes federal oil and gas leasing, streamlines NEPA environmental reviews, and repeals natural gas tax provisions.',
    texasDelegationHighlights: [
      { name: 'Brandon Gill', office: 'TX-26 (Denton/Wise)', vote: 'Yea', party: 'Republican' },
      { name: 'Michael McCaul', office: 'TX-10 (Brazos Valley)', vote: 'Yea', party: 'Republican' },
      { name: 'Colin Allred', office: 'TX-32 (Dallas)', vote: 'Nay', party: 'Democratic' },
      { name: 'Lizzie Fletcher', office: 'TX-07 (Houston)', vote: 'Nay', party: 'Democratic' },
    ],
  },
];

export const VotingAnalyticsAndMap: React.FC = () => {
  const [selectedChamber, setSelectedChamber] = useState<string>('All');
  const [activeVoteId, setActiveVoteId] = useState<string>(LANDMARK_VOTES[0].id);

  const filteredVotes = LANDMARK_VOTES.filter((v) => {
    if (selectedChamber === 'All') return true;
    return v.chamber === selectedChamber;
  });

  const activeVote = LANDMARK_VOTES.find((v) => v.id === activeVoteId) || LANDMARK_VOTES[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: '#2A2A28' }}>
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-[#FFFFEB]">
              Texas Legislative Maps & Roll-Call Analytics
            </h2>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Detailed roll-call breakdowns, party-split distribution charts, and interactive regional delegation mapping.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto" style={{ background: '#1c1c1b', borderColor: '#2e2e2c' }}>
          {['All', 'Texas Senate', 'Texas House', 'U.S. Congress'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedChamber(c)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                selectedChamber === c
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <TexasInteractiveMap />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold mb-2">
            Select Recorded Landmark Vote ({filteredVotes.length})
          </div>

          <div className="space-y-2">
            {filteredVotes.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVoteId(v.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeVoteId === v.id
                    ? 'border-amber-400 bg-[#222221] shadow-sm'
                    : 'bg-[#191918] border-[#282827] hover:border-stone-500'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {v.billNumber}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {v.chamber}
                  </span>
                </div>

                <div className="text-xs font-medium text-[#FFFFEB] mt-1 line-clamp-1">
                  {v.billTitle}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{v.yeas} YEA</span>
                    <span>•</span>
                    <span className="text-rose-400 font-bold">{v.nays} NAY</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          className="lg:col-span-7 rounded-2xl p-5 border flex flex-col justify-between"
          style={{ background: '#191918', borderColor: '#262625' }}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-[#242423] pb-3">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#20201f] text-amber-400 border border-[#2c2c2b] font-bold">
                  {activeVote.session}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#FFFFEB] mt-1.5 leading-snug">
                  {activeVote.billNumber}
                </h3>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {activeVote.billTitle}
                </div>
              </div>

              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                  activeVote.outcome === 'Passed'
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                    : 'bg-rose-950/60 text-rose-400 border-rose-500/40'
                }`}
              >
                {activeVote.outcome} ({activeVote.yeas}-{activeVote.nays})
              </span>
            </div>

            <div
              className="p-3 rounded-xl border text-xs text-stone-300 leading-relaxed font-sans"
              style={{ background: '#20201f', borderColor: '#2c2c2b' }}
            >
              <strong className="text-amber-400 font-mono text-[11px] block mb-1">
                CIVIC ANALYSIS:
              </strong>
              {activeVote.keyTakeaway}
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-300">
                  Yea vs Nay Chamber Distribution:
                </span>
                <span className="text-stone-400">
                  Total Votes: {activeVote.yeas + activeVote.nays}
                </span>
              </div>

              {(() => {
                const total = activeVote.yeas + activeVote.nays || 1;
                const yeaPct = Math.round((activeVote.yeas / total) * 100);
                const nayPct = 100 - yeaPct;

                return (
                  <div className="space-y-1.5">
                    <div className="h-4 w-full bg-[#121211] rounded-full overflow-hidden flex border border-[#2b2b2a]">
                      <div
                        style={{ width: `${yeaPct}%` }}
                        className="bg-emerald-500 h-full flex items-center justify-center text-[9px] font-mono font-bold text-stone-950"
                      >
                        {yeaPct > 10 ? `${yeaPct}%` : ''}
                      </div>
                      <div
                        style={{ width: `${nayPct}%` }}
                        className="bg-rose-500 h-full flex items-center justify-center text-[9px] font-mono font-bold text-stone-950"
                      >
                        {nayPct > 10 ? `${nayPct}%` : ''}
                      </div>
                    </div>

                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-emerald-400 font-bold">
                        {activeVote.yeas} Yeas ({yeaPct}%)
                      </span>
                      <span className="text-rose-400 font-bold">
                        {activeVote.nays} Nays ({nayPct}%)
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                className="p-3 rounded-xl border space-y-1.5"
                style={{ background: '#20201f', borderColor: '#2b2b2a' }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold">Republican Caucus</span>
                  <span className="text-[10px] text-stone-400">
                    {activeVote.gopYeas + activeVote.gopNays} Members
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300">Yeas: <strong>{activeVote.gopYeas}</strong></span>
                  <span className="text-stone-300">Nays: <strong>{activeVote.gopNays}</strong></span>
                </div>
              </div>

              <div
                className="p-3 rounded-xl border space-y-1.5"
                style={{ background: '#20201f', borderColor: '#2b2b2a' }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-400 font-bold">Democratic Caucus</span>
                  <span className="text-[10px] text-stone-400">
                    {activeVote.demYeas + activeVote.demNays} Members
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300">Yeas: <strong>{activeVote.demYeas}</strong></span>
                  <span className="text-stone-300">Nays: <strong>{activeVote.demNays}</strong></span>
                </div>
              </div>
            </div>

            {activeVote.texasDelegationHighlights && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-stone-400 font-semibold">
                  Recorded Votes for Key Texas Representatives:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeVote.texasDelegationHighlights.map((rep, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-[#222221] border border-[#2d2d2b] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-[#FFFFEB]">{rep.name}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{rep.office}</div>
                      </div>
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-sm ${
                          rep.vote === 'Yea'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {rep.vote}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-[#242423] flex items-center justify-between text-xs">
            <span className="text-stone-500 font-mono text-[11px]">
              Roll-call vote recorded in official legislative journal.
            </span>
            <a
              href={activeVote.journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
            >
              <span>View Official Journal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

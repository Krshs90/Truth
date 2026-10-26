const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'ComparePage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldRaceLogic = `  const activeRace = CAMPAIGN_RACES.find((r) => r.id === selectedRaceId) || CAMPAIGN_RACES[0];

  const handleSelectRace = (raceId: string) => {
    setSelectedRaceId(raceId);
    const race = CAMPAIGN_RACES.find((r) => r.id === raceId);
    if (race) {
      setCandidateAId(race.candidateAId);
      setCandidateBId(race.candidateBId);
      setSelectedIssueFilter('All');
    }
  };`;

const newRaceLogic = `  // Check if current pair matches an active official race
  const matchingRace = CAMPAIGN_RACES.find(
    (r) =>
      (r.candidateAId === candidateAId && r.candidateBId === candidateBId) ||
      (r.candidateAId === candidateBId && r.candidateBId === candidateAId)
  );

  const isCustomMatchup = !matchingRace;
  const activeRace = matchingRace || CAMPAIGN_RACES.find((r) => r.id === selectedRaceId) || CAMPAIGN_RACES[0];

  const handleSelectRace = (raceId: string) => {
    setSelectedRaceId(raceId);
    const race = CAMPAIGN_RACES.find((r) => r.id === raceId);
    if (race) {
      setCandidateAId(race.candidateAId);
      setCandidateBId(race.candidateBId);
      setSelectedIssueFilter('All');
    }
  };`;

content = content.replace(oldRaceLogic, newRaceLogic);

const oldHeaderTitle = `        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262625]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                {activeRace.name}
              </h2>
            </div>
            <p className="text-xs text-stone-400 font-mono">
              Status: <span className="text-amber-300 font-semibold">{activeRace.status}</span> • {activeRace.cycle}
            </p>
          </div>
        </div>`;

const newHeaderTitle = `        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#262625]">
          {isCustomMatchup ? (
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                  Custom Candidate Comparison: {candidateA.name} vs. {candidateB.name}
                </h2>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Status: <span className="text-amber-300 font-semibold">Custom Research Pairing</span> • Individual Disclosures & Public Stances
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm md:text-base font-serif font-bold text-[#FFFFEB]">
                  {activeRace.name}
                </h2>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Status: <span className="text-amber-300 font-semibold">{activeRace.status}</span> • {activeRace.cycle}
              </p>
            </div>
          )}
        </div>`;

content = content.replace(oldHeaderTitle, newHeaderTitle);

const oldSpreadBanner = `        {/* Polling Spread & Accurate Election Dates Banner */}
        <div className="p-3.5 rounded-xl bg-[#20201f] border border-[#2c2c2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono">Current Standings:</span>
            <span className="font-semibold text-amber-300">{activeRace.pollingSummary}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-stone-300">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Primary: <strong className="text-amber-300">{activeRace.primaryElectionDate || 'March 3, 2026'}</strong></span>
            <span className="text-stone-600">•</span>
            <span>Runoff: <strong className="text-stone-300">{activeRace.primaryRunoffDate || 'May 26, 2026'}</strong></span>
            <span className="text-stone-600">•</span>
            <span>General: <strong className="text-[#FFFFEB]">{activeRace.generalElectionDate || 'November 3, 2026'}</strong></span>
          </div>
        </div>`;

const newSpreadBanner = `        {/* Polling Spread & Accurate Election Dates Banner */}
        {isCustomMatchup ? (
          <div className="p-3.5 rounded-xl bg-[#20201f] border border-[#2c2c2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono">Comparison Mode:</span>
              <span className="font-semibold text-amber-300">Individual Public Records (Candidates Not Running on Same Ballot)</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary: <strong className="text-amber-300">March 3, 2026</strong></span>
              <span className="text-stone-600">•</span>
              <span>General: <strong className="text-[#FFFFEB]">November 3, 2026</strong></span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#20201f] border border-[#2c2c2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-mono">Current Standings:</span>
              <span className="font-semibold text-amber-300">{activeRace.pollingSummary}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary: <strong className="text-amber-300">{activeRace.primaryElectionDate || 'March 3, 2026'}</strong></span>
              <span className="text-stone-600">•</span>
              <span>Runoff: <strong className="text-stone-300">{activeRace.primaryRunoffDate || 'May 26, 2026'}</strong></span>
              <span className="text-stone-600">•</span>
              <span>General: <strong className="text-[#FFFFEB]">{activeRace.generalElectionDate || 'November 3, 2026'}</strong></span>
            </div>
          </div>
        )}`;

content = content.replace(oldSpreadBanner, newSpreadBanner);

const oldVoteBarCall = `        <CampaignVoteBarAndCountyMap
          activeRace={activeRace}
          candidateA={candidateA}
          candidateB={candidateB}
        />`;

const newVoteBarCall = `        <CampaignVoteBarAndCountyMap
          activeRace={activeRace}
          candidateA={candidateA}
          candidateB={candidateB}
          isCustomMatchup={isCustomMatchup}
        />`;

content = content.replace(oldVoteBarCall, newVoteBarCall);

const oldPropagandaSection = `      {/* ───────────────────────────────────────────────────────────────────
          TAB 3: PROPAGANDA & ATTACK ADS FACT-CHECK DESK
          ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'propaganda' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#181817] border border-[#2a2a29] space-y-1 text-xs">
            <h3 className="font-serif font-bold text-sm text-[#FFFFEB] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Propaganda & Attack Ads Deconstruction Desk</span>
            </h3>
            <p className="text-stone-400 leading-relaxed">
              Exposing active political campaign attack ads, PAC funding origins, and deconstructing inflammatory claims against verified roll-call tallies, legislative committee journals, and Texas statutory codes.
            </p>
          </div>

          {/* Attack Ads List for Candidate A & Candidate B */}
          <div className="space-y-4">
            {[...(candidateA.attackAdsAndPropaganda || []), ...(candidateB.attackAdsAndPropaganda || [])].length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#181817] border border-[#2a2a29] text-center text-xs text-stone-400 italic">
                No active television or digital attack ad campaigns registered in the primary audit for this matchup yet.
              </div>
            ) : (
              [...(candidateA.attackAdsAndPropaganda || []), ...(candidateB.attackAdsAndPropaganda || [])].map((ad) => (
                <div
                  key={ad.id}
                  className="rounded-2xl p-5 bg-[#181817] border border-[#2a2a29] space-y-3 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242423] pb-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-500/30 font-semibold uppercase">
                        Campaign Attack Ad • {ad.targetOrTopic}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-[#FFFFEB] mt-1">
                        "{ad.sloganOrClaim}"
                      </h4>
                    </div>

                    <div className="text-right text-[11px] font-mono text-stone-400">
                      <div>Sponsor: <span className="text-amber-300 font-semibold">{ad.sponsoringPac}</span></div>
                      <div className="text-[10px] text-stone-500">{ad.adMedium}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* What the Ad Claims */}
                    <div className="p-3 rounded-xl bg-[#141414] border border-[#242423] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-red-400 font-bold block flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Claimed Assertion in Ad:</span>
                      </span>
                      <p className="text-stone-300 leading-relaxed text-[11px]">
                        {ad.claimedAssertion}
                      </p>
                    </div>

                    {/* Reality Check Against Public Records */}
                    <div className="p-3 rounded-xl bg-[#141916] border border-emerald-950/50 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Factual Deconstruction & Primary Record:</span>
                      </span>
                      <p className="text-stone-200 leading-relaxed text-[11px]">
                        {ad.realityCheck}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222] flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-mono">
                      Cross-referenced against verified legislative journal
                    </span>
                    <a
                      href={ad.verifiableSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
                    >
                      <span>{ad.sourceTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}`;

const newPropagandaSection = `      {/* ───────────────────────────────────────────────────────────────────
          TAB 3: PROPAGANDA & ATTACK ADS FACT-CHECK DESK
          ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'propaganda' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#181817] border border-[#2a2a29] space-y-2 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif font-bold text-base text-[#FFFFEB] flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>Campaign Propaganda Ad Video Archive • Beta Feature</span>
              </h3>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Truth pilots automated multimodal detection of television broadcast and digital PAC attack ads. Because campaign ad buys and dark-money expenditures rotate rapidly across media markets, video feeds are matched autonomously against FEC/FCC political file disclosures and updated dynamically based on active competitors.
            </p>
          </div>

          {/* Attack Ads List for Candidate A & Candidate B */}
          <div className="space-y-5">
            {[...(candidateA.attackAdsAndPropaganda || []), ...(candidateB.attackAdsAndPropaganda || [])].length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#181817] border border-[#2a2a29] text-center text-xs text-stone-400 italic">
                No active television or digital attack ad campaigns registered in the primary audit for this matchup yet.
              </div>
            ) : (
              [...(candidateA.attackAdsAndPropaganda || []), ...(candidateB.attackAdsAndPropaganda || [])].map((ad) => (
                <div
                  key={ad.id}
                  className="rounded-2xl p-5 bg-[#181817] border border-[#2a2a29] space-y-4 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242423] pb-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-500/30 font-semibold uppercase">
                        Campaign Attack Ad • {ad.targetOrTopic}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-[#FFFFEB] mt-1">
                        "{ad.sloganOrClaim}"
                      </h4>
                    </div>

                    <div className="text-right text-[11px] font-mono text-stone-400">
                      <div>Sponsor: <span className="text-amber-300 font-semibold">{ad.sponsoringPac}</span></div>
                      <div className="text-[10px] text-stone-500">{ad.adMedium}</div>
                    </div>
                  </div>

                  {/* Video Embed Player (Beta Feature) */}
                  {ad.videoEmbedId ? (
                    <div className="rounded-xl overflow-hidden border border-[#2a2a29] bg-[#0c0c0c] space-y-2">
                      <div className="relative aspect-video w-full bg-black">
                        <iframe
                          src={\`https://www.youtube-nocookie.com/embed/\${ad.videoEmbedId}?rel=0&modestbranding=1\`}
                          title={ad.adTitle || ad.sloganOrClaim}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                      <div className="p-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-t border-[#222]">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">Autonomous Video Ingest (Beta)</span>
                          {ad.airDates && <span className="text-stone-400">• {ad.airDates}</span>}
                        </div>
                        {ad.fccFileNumber && (
                          <span className="text-stone-500">FCC Public File: {ad.fccFileNumber}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#141414] border border-[#222] flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">Autonomous Video Ingest (Beta)</span>
                        <span className="text-stone-400 text-[11px]">Broadcast flight indexed from FCC political files • Streaming capture initializing</span>
                      </div>
                      {ad.videoUrl && (
                        <a
                          href={ad.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <span>External Feed</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* What the Ad Claims */}
                    <div className="p-3.5 rounded-xl bg-[#141414] border border-[#242423] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-red-400 font-bold block flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        <span>Claimed Assertion in Ad:</span>
                      </span>
                      <p className="text-stone-300 leading-relaxed text-[11px]">
                        {ad.claimedAssertion}
                      </p>
                    </div>

                    {/* Reality Check Against Public Records */}
                    <div className="p-3.5 rounded-xl bg-[#141916] border border-emerald-950/50 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Factual Deconstruction & Primary Record:</span>
                      </span>
                      <p className="text-stone-200 leading-relaxed text-[11px]">
                        {ad.realityCheck}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222] flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-mono">
                      Cross-referenced against verified legislative journal
                    </span>
                    <a
                      href={ad.verifiableSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium"
                    >
                      <span>{ad.sourceTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}`;

content = content.replace(oldPropagandaSection, newPropagandaSection);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated ComparePage.tsx with custom matchup recognition and propaganda video player!');

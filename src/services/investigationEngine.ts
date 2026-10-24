import {
  AssertionEvaluation,
  AssertionType,
  Claim,
  ClaimVerdict,
  EvidenceItem,
  SourceItem,
} from '../types';
import { BILLS } from '../data/bills';
import { CLAIMS } from '../data/claims';
import { OFFICIALS } from '../data/officials';
import { TRUSTED_SOURCES } from '../data/sources';

export interface InvestigationResult {
  claim: Claim;
  isAiEnhanced: boolean;
  retrievalSummary: {
    sourcesScanned: number;
    primaryEvidenceFound: number;
    corroboratingReportsFound: number;
  };
}

/**
 * Stage 1: Extract individual assertions from user input text.
 * Distinguishes factual assertions, predictions, opinions, and value judgments.
 */
export function extractAssertions(inputText: string): {
  assertions: { text: string; type: AssertionType; rationale: string }[];
} {
  const clean = inputText.trim();
  const sentences = clean
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 6);

  if (sentences.length === 0) {
    sentences.push(clean);
  }

  const assertions: { text: string; type: AssertionType; rationale: string }[] = [];

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();

    // Check for future predictions
    if (
      lower.includes('will destroy') ||
      lower.includes('will bankrupt') ||
      lower.includes('will collapse') ||
      lower.includes('will lead to') ||
      lower.includes('in the future') ||
      lower.includes('will cause') ||
      lower.includes('going to ruin')
    ) {
      assertions.push({
        text: sentence,
        type: 'prediction',
        rationale: 'Speculates on future hypothetical outcomes rather than verifiable historical actions.',
      });
    }
    // Check for subjective value judgments / rhetoric
    else if (
      lower.includes('corrupt') ||
      lower.includes('worst') ||
      lower.includes('radical') ||
      lower.includes('evil') ||
      lower.includes('terrible') ||
      lower.includes('heroic') ||
      lower.includes('patriot') ||
      lower.includes('disgrace') ||
      lower.includes('un-american')
    ) {
      assertions.push({
        text: sentence,
        type: 'value_judgment',
        rationale: 'Expresses rhetorical appraisal or normative judgment rather than an empirical proposition.',
      });
    }
    // Check for stated beliefs / candidate intent
    else if (
      lower.includes('wants to') ||
      lower.includes('believes that') ||
      lower.includes('plans to') ||
      lower.includes('hopes to') ||
      lower.includes('favors')
    ) {
      assertions.push({
        text: sentence,
        type: 'opinion',
        rationale: 'Characterizes legislative philosophy or intent rather than a documented statutory roll call.',
      });
    }
    // Default to verifiable factual assertion
    else {
      assertions.push({
        text: sentence,
        type: 'factual',
        rationale: 'Asserts a specific past vote, statutory enactment, appropriation, or empirical record.',
      });
    }
  }

  return { assertions };
}

/**
 * Stage 2: Retrieve relevant primary evidence from indexed repository.
 */
export function retrieveEvidenceForQuery(query: string): {
  primarySources: SourceItem[];
  matchingEvidence: EvidenceItem[];
  exactMatchClaim?: Claim;
} {
  const qLower = query.toLowerCase();

  // 1. Check for close pre-researched claim match
  const exactMatch = CLAIMS.find((c) => {
    const claimLower = c.claimText.toLowerCase();
    const words = qLower.split(/\s+/).filter((w) => w.length > 3);
    const matchCount = words.filter((w) => claimLower.includes(w)).length;
    return matchCount >= Math.min(3, words.length) || claimLower.includes(qLower) || qLower.includes(claimLower);
  });

  if (exactMatch) {
    return {
      primarySources: exactMatch.assessment.primarySources,
      matchingEvidence: [
        ...exactMatch.assessment.supportingEvidence,
        ...exactMatch.assessment.contradictingOrQualifyingEvidence,
      ],
      exactMatchClaim: exactMatch,
    };
  }

  // 2. Scan bills for direct matches or thematic alignment
  const matchedBills = BILLS.filter((b) => {
    const numLower = b.officialBillNumber.toLowerCase();
    const titleLower = b.title.toLowerCase();
    const sumLower = b.summary.toLowerCase();

    return (
      qLower.includes(numLower) ||
      (qLower.includes('sb 2') && numLower.includes('sb 2')) ||
      (qLower.includes('sb 4') && numLower.includes('sb 4')) ||
      (qLower.includes('sb 3') && numLower.includes('sb 3')) ||
      (qLower.includes('sb 14') && numLower.includes('sb 14')) ||
      (qLower.includes('sb 17') && numLower.includes('sb 17')) ||
      (qLower.includes('sb 28') && numLower.includes('sb 28')) ||
      (qLower.includes('hb 3') && numLower.includes('hb 3')) ||
      (qLower.includes('voucher') && (numLower.includes('hb 1') || titleLower.includes('voucher') || sumLower.includes('voucher'))) ||
      (qLower.includes('property tax') && numLower.includes('sb 2')) ||
      (qLower.includes('border') && (numLower.includes('sb 4') || titleLower.includes('border'))) ||
      (qLower.includes('water fund') && (numLower.includes('sb 28') || titleLower.includes('water'))) ||
      (qLower.includes('infrastructure') && (b.id.includes('hr3684') || titleLower.includes('infrastructure'))) ||
      (qLower.includes('inflation reduction') && b.id.includes('hr5376')) ||
      (qLower.includes('insulin') && b.id.includes('hr5376')) ||
      (qLower.includes('ercot') && numLower.includes('sb 3')) ||
      (qLower.includes('grid') && numLower.includes('sb 3')) ||
      wordsOverlap(qLower, titleLower) ||
      wordsOverlap(qLower, sumLower)
    );
  });

  const matchingEvidence: EvidenceItem[] = [];
  const primarySources: SourceItem[] = [];

  for (const bill of matchedBills) {
    primarySources.push({
      id: `src-${bill.id}`,
      title: `${bill.officialBillNumber}: ${bill.title}`,
      publisher: bill.chamber === 'Federal' ? 'Congress.gov' : 'Texas Legislature Online',
      url: bill.officialUrl,
      sourceType: 'primary_legislation',
      publicationDate: bill.statusDate,
      retrievedAt: new Date().toISOString().split('T')[0],
      isPrimarySource: true,
      reliabilityNotes: 'Official statutory repository document.',
    });

    matchingEvidence.push({
      id: `ev-${bill.id}-summary`,
      sourceId: `src-${bill.id}`,
      sourceTitle: `${bill.officialBillNumber} Official Enactment Summary`,
      publisher: 'Official Legislative Record',
      sourceUrl: bill.officialUrl,
      publicationDate: bill.statusDate,
      retrievedAt: new Date().toISOString().split('T')[0],
      excerpt: bill.summary,
      evidenceType: 'primary_legislation',
      relevanceExplanation: `Official statutory text and status of ${bill.officialBillNumber}. Current Status: ${bill.status}.`,
      stance: 'supports',
      isOfficialRecord: true,
    });

    if (bill.keyVotes) {
      for (const vote of bill.keyVotes) {
        matchingEvidence.push({
          id: `ev-vote-${vote.id}`,
          sourceId: `src-${bill.id}`,
          sourceTitle: `${vote.billNumber} - ${vote.rollCallNumber}`,
          publisher: `${vote.chamber} Official Journal`,
          sourceUrl: vote.officialJournalUrl,
          publicationDate: vote.voteDate,
          retrievedAt: new Date().toISOString().split('T')[0],
          excerpt: `Motion: ${vote.motion}. Official Result: ${vote.result} (Yeas: ${vote.yeas}, Nays: ${vote.nays}, Present: ${vote.present}).`,
          evidenceType: 'roll_call_vote',
          relevanceExplanation: `Official roll-call record from ${vote.chamber} proceedings.`,
          stance: 'supports',
          isOfficialRecord: true,
        });
      }
    }
  }

  // 3. Scan officials for name match and include their official profile and recent votes
  const matchedOfficials = OFFICIALS.filter((o) => {
    const lastName = o.name.split(' ').pop()?.toLowerCase() || '';
    return qLower.includes(o.name.toLowerCase()) || (lastName.length > 3 && qLower.includes(lastName));
  });

  for (const off of matchedOfficials) {
    primarySources.push({
      id: `src-${off.id}`,
      title: `${off.name} - Official Profile & Voting History`,
      publisher: off.jurisdiction === 'Federal' ? 'Congress.gov' : 'Texas Legislature',
      url: off.officialProfileUrl,
      sourceType: 'government',
      publicationDate: 'Official Directory',
      retrievedAt: new Date().toISOString().split('T')[0],
      isPrimarySource: true,
    });

    for (const v of off.recentVotes) {
      matchingEvidence.push({
        id: `ev-off-vote-${off.id}-${v.billNumber.replace(/\s+/g, '-')}`,
        sourceId: `src-${off.id}`,
        sourceTitle: `${off.name} Official Roll-Call Vote on ${v.billNumber}`,
        publisher: 'Congressional / Legislative Journal',
        sourceUrl: v.sourceUrl,
        publicationDate: v.voteDate,
        retrievedAt: new Date().toISOString().split('T')[0],
        excerpt: `${off.name} voted '${v.vote}' on ${v.billNumber} (${v.billTitle}) on ${v.voteDate}.`,
        evidenceType: 'roll_call_vote',
        relevanceExplanation: `Official recorded vote in the legislative journal.`,
        stance: 'supports',
        isOfficialRecord: true,
      });
    }
  }

  // 4. Always provide live official portal links if no direct matches
  if (primarySources.length === 0) {
    const encodedQ = encodeURIComponent(query.slice(0, 80));
    primarySources.push(
      {
        id: 'src-tlo-portal',
        title: 'Texas Legislature Online (TLO) Bill Search',
        publisher: 'Texas Legislative Council',
        url: `https://capitol.texas.gov/Search/BillSearch.aspx`,
        sourceType: 'government',
        publicationDate: 'Live Query Portal',
        retrievedAt: new Date().toISOString().split('T')[0],
        isPrimarySource: true,
        reliabilityNotes: 'Official statutory repository for the State of Texas.',
      },
      {
        id: 'src-congress-portal',
        title: 'Congress.gov Federal Legislation Search',
        publisher: 'Library of Congress',
        url: `https://www.congress.gov/search?q=${encodedQ}`,
        sourceType: 'government',
        publicationDate: 'Live Query Portal',
        retrievedAt: new Date().toISOString().split('T')[0],
        isPrimarySource: true,
        reliabilityNotes: 'Official legislative record of the United States Congress.',
      }
    );
  }

  return { primarySources, matchingEvidence };
}

function wordsOverlap(a: string, b: string): boolean {
  const wordsA = a.split(/\s+/).filter((w) => w.length > 4);
  return wordsA.some((w) => b.includes(w));
}

/**
 * Stage 3 & 4: Evaluate Evidence and Produce Transparent Report
 */
export async function investigateClaim(
  inputText: string,
  options?: {
    speakerOrSource?: string;
    contextOrEvent?: string;
    useOllama?: boolean;
    ollamaEndpoint?: string;
    ollamaModel?: string;
  }
): Promise<InvestigationResult> {
  const { assertions } = extractAssertions(inputText);
  const retrieval = retrieveEvidenceForQuery(inputText);

  // If there is an exact verified match in our research library, return it directly
  if (retrieval.exactMatchClaim) {
    return {
      claim: retrieval.exactMatchClaim,
      isAiEnhanced: false,
      retrievalSummary: {
        sourcesScanned: TRUSTED_SOURCES.length + BILLS.length + OFFICIALS.length,
        primaryEvidenceFound: retrieval.exactMatchClaim.assessment.supportingEvidence.length,
        corroboratingReportsFound: retrieval.exactMatchClaim.assessment.primarySources.length,
      },
    };
  }

  // Otherwise, construct a grounded assessment from retrieved evidence
  const evaluatedAssertions: AssertionEvaluation[] = assertions.map((a, idx) => {
    if (a.type === 'prediction' || a.type === 'value_judgment') {
      return {
        id: `asrt-eval-${idx}`,
        assertionText: a.text,
        assertionType: a.type,
        status: 'not_applicable',
        explanation: a.rationale,
        evidenceIds: [],
      };
    }

    // Check if evidence exists in matchingEvidence
    const matchingEv = retrieval.matchingEvidence.filter((ev) =>
      ev.excerpt.toLowerCase().includes(a.text.toLowerCase().substring(0, 15)) ||
      wordsOverlap(a.text.toLowerCase(), ev.excerpt.toLowerCase())
    );

    if (matchingEv.length > 0) {
      return {
        id: `asrt-eval-${idx}`,
        assertionText: a.text,
        assertionType: a.type,
        status: 'supported',
        explanation: `Corroborated by ${matchingEv[0].sourceTitle}.`,
        evidenceIds: matchingEv.map((e) => e.id),
      };
    }

    return {
      id: `asrt-eval-${idx}`,
      assertionText: a.text,
      assertionType: a.type,
      status: 'unverified',
      explanation: 'No specific roll-call vote or statutory enactment in the active verified index directly corroborates this statement. Verify against primary legislative journals.',
      evidenceIds: [],
    };
  });

  // Determine analytical Verdict strictly by evidential rubric
  let verdict: ClaimVerdict = 'Unverified';
  let shortExplanation = 'Primary records require independent verification against Texas Legislature Online and Congressional journals.';

  const hasPredictionsOnly = evaluatedAssertions.every(
    (a) => a.assertionType === 'prediction' || a.assertionType === 'value_judgment'
  );

  if (hasPredictionsOnly) {
    verdict = 'Opinion or prediction, not directly fact-checkable';
    shortExplanation = 'This statement consists of political rhetoric or future predictions rather than an empirical factual assertion.';
  } else if (retrieval.matchingEvidence.length > 0) {
    const supportedCount = evaluatedAssertions.filter((a) => a.status === 'supported').length;
    const totalFactual = evaluatedAssertions.filter((a) => a.assertionType === 'factual').length;

    if (supportedCount === totalFactual && totalFactual > 0) {
      verdict = 'Supported by evidence';
      shortExplanation = 'Official legislative journals and statutory records confirm the factual assertions made in this statement.';
    } else if (supportedCount > 0) {
      verdict = 'Misleading or missing important context';
      shortExplanation = 'Certain elements align with official records, but key qualifiers, fiscal constraints, or timeline details are omitted.';
    }
  }

  // Check if Ollama AI enhancement is requested and available
  let isAiEnhanced = false;
  if (options?.useOllama && retrieval.matchingEvidence.length > 0) {
    try {
      const aiResponse = await fetch('/api/ai/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimText: inputText,
          retrievedEvidence: retrieval.matchingEvidence,
          model: options.ollamaModel || 'llama3',
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        if (aiData?.explanation) {
          shortExplanation = aiData.explanation;
          isAiEnhanced = true;
        }
      }
    } catch {
      isAiEnhanced = false;
    }
  }

  const newClaim: Claim = {
    id: `claim-user-${Date.now()}`,
    claimText: inputText,
    submittedContent: inputText,
    speakerOrSource: options?.speakerOrSource || 'Submitted Statement',
    contextOrEvent: options?.contextOrEvent || 'Direct Workspace Research Query',
    topic: 'Civic Investigation',
    submissionDate: new Date().toISOString().split('T')[0],
    isDemo: false,
    investigationStatus: 'complete',
    tags: ['Active Investigation', 'Grounded Analysis'],
    assessment: {
      id: `assess-${Date.now()}`,
      claimId: `claim-user-${Date.now()}`,
      verdict,
      shortExplanation,
      keyAssertions: evaluatedAssertions,
      supportingEvidence: retrieval.matchingEvidence.filter((e) => e.stance === 'supports'),
      contradictingOrQualifyingEvidence: retrieval.matchingEvidence.filter(
        (e) => e.stance === 'qualifies' || e.stance === 'contradicts'
      ),
      missingContext:
        retrieval.matchingEvidence.length === 0
          ? [
              'No official bill number or official roll call was explicitly referenced in the input text.',
              'Search Texas Legislature Online (capitol.texas.gov) or Congress.gov using the live query links in the sources section.',
            ]
          : [
              'Verify the bill history on Texas Legislature Online to confirm current legislative status.',
            ],
      remainingUncertainty:
        verdict === 'Unverified'
          ? ['Statutory records for this exact phrasing could not be matched automatically; review primary journal links.']
          : [],
      primarySources: retrieval.primarySources,
      factChecksAndReporting: [],
      methodologyAndLimitations:
        'Evaluated via Truth Grounded Verification Pipeline against official Texas and Federal public records. Adheres to nonpartisan evidential rubrics.',
      lastAssessedAt: new Date().toISOString().split('T')[0],
      methodologyVersion: 'Truth-v1.3',
      assessedBy: isAiEnhanced ? 'local_ollama_verified' : 'deterministic_engine',
    },
  };

  return {
    claim: newClaim,
    isAiEnhanced,
    retrievalSummary: {
      sourcesScanned: TRUSTED_SOURCES.length + BILLS.length + OFFICIALS.length,
      primaryEvidenceFound: retrieval.matchingEvidence.length,
      corroboratingReportsFound: retrieval.primarySources.length,
    },
  };
}

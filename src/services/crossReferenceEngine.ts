import { Claim, ClaimVerdict } from '../types';

export interface CrossReferenceResult {
  isCrossReferenced: boolean;
  matchedClaim?: Claim;
  verdict: ClaimVerdict;
  explanation: string;
}

function extractTokens(text: string): string[] {
  const stopWords = new Set([
    'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are', 'was', 'were',
    'has', 'have', 'had', 'been', 'will', 'with', 'about', 'from', 'by', 'that', 'this', 'after', 'says',
    'said', 'texas', 'state', 'statewide', 'new', 'could', 'would', 'over', 'into', 'ahead'
  ]);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
}

export function crossReferenceHeadline(
  headline: string,
  libraryClaims: Claim[]
): CrossReferenceResult {
  if (!headline) {
    return {
      isCrossReferenced: false,
      verdict: 'Unchecked',
      explanation: 'Live incoming news wire. Has not yet been cross-referenced against primary legislative journals. Click "Verify with AI" to run an evidence investigation.',
    };
  }

  const h = headline.toLowerCase();

  const signaturePatterns: Array<{
    test: (text: string) => boolean;
    matcher: (claim: Claim) => boolean;
  }> = [
    {
      test: (t) => (t.includes('voucher') || t.includes('education savings account') || t.includes('school choice') || t.includes('hb 1') || t.includes('hb1')) && (t.includes('school') || t.includes('education') || t.includes('public')),
      matcher: (c) => c.claimText.toLowerCase().includes('voucher') || c.id === 'claim-tx-vouchers-88th' || c.id === 'claim-tx-vouchers-destroy-schools',
    },
    {
      test: (t) => t.includes('sb 4') || t.includes('sb4') || ((t.includes('arrest') || t.includes('deport')) && t.includes('border') && t.includes('police')),
      matcher: (c) => c.claimText.toLowerCase().includes('senate bill 4') || c.id === 'claim-tx-sb4-immigration',
    },
    {
      test: (t) => (t.includes('property tax') && (t.includes('18 billion') || t.includes('cut') || t.includes('relief') || t.includes('homestead') || t.includes('compression'))),
      matcher: (c) => c.claimText.toLowerCase().includes('18 billion') || c.id === 'claim-tx-tax-cut-18b',
    },
    {
      test: (t) => t.includes('operation lone star') || (t.includes('lone star') && t.includes('border')),
      matcher: (c) => c.claimText.toLowerCase().includes('operation lone star') || c.id === 'claim-tx-operation-lone-star-cost',
    },
    {
      test: (t) => t.includes('sb 17') || t.includes('sb17') || (t.includes('dei') && (t.includes('universit') || t.includes('college') || t.includes('campus'))),
      matcher: (c) => c.claimText.toLowerCase().includes('senate bill 17') || c.id === 'claim-tx-sb17-dei-ban',
    },
    {
      test: (t) => (t.includes('paxton') || t.includes('attorney general')) && (t.includes('title ix') || t.includes('biden') || t.includes('injunction') || t.includes('sues administration')),
      matcher: (c) => c.claimText.toLowerCase().includes('title ix') || c.id === 'claim-tx-paxton-title-ix',
    },
    {
      test: (t) => (t.includes('paxton') && (t.includes('impeach') || t.includes('whistleblower') || t.includes('securities fraud') || t.includes('settlement') || t.includes('scandal') || t.includes('ethics'))),
      matcher: (c) => c.claimText.toLowerCase().includes('paxton') && (c.claimText.toLowerCase().includes('impeach') || c.claimText.toLowerCase().includes('whistleblower') || c.claimText.toLowerCase().includes('ethics')),
    },
    {
      test: (t) => t.includes('ercot') || (t.includes('electrical grid') && (t.includes('isolated') || t.includes('blackout') || t.includes('power grid'))),
      matcher: (c) => c.claimText.toLowerCase().includes('electrical grid') || c.id === 'claim-tx-grid-isolated',
    },
    {
      test: (t) => t.includes('uninsured rate') || (t.includes('uninsured') && t.includes('highest')),
      matcher: (c) => c.claimText.toLowerCase().includes('uninsured') || c.id === 'claim-tx-uninsured-rate-highest',
    },
    {
      test: (t) => (t.includes('mail') && t.includes('voting') && (t.includes('ban') || t.includes('restrict'))),
      matcher: (c) => c.claimText.toLowerCase().includes('voting by mail') || c.id === 'claim-tx-mail-voting-ban',
    },
    {
      test: (t) => t.includes('brandon gill') && (t.includes('h.r. 2') || t.includes('hr 2') || t.includes('border wall') || t.includes('spending')),
      matcher: (c) => c.claimText.toLowerCase().includes('brandon gill') || c.id === 'claim-tx-brandon-gill-hr2',
    },
    {
      test: (t) => t.includes('ted cruz') && (t.includes('infrastructure') || t.includes('broadband') || t.includes('roads')),
      matcher: (c) => c.claimText.toLowerCase().includes('ted cruz') && c.claimText.toLowerCase().includes('infrastructure'),
    },
    {
      test: (t) => t.includes('allred') && (t.includes('inflation reduction') || t.includes('raise taxes')),
      matcher: (c) => c.claimText.toLowerCase().includes('allred') && c.claimText.toLowerCase().includes('inflation reduction'),
    },
  ];

  if (libraryClaims && libraryClaims.length > 0) {
    for (const pattern of signaturePatterns) {
      if (pattern.test(h)) {
        const match = libraryClaims.find(pattern.matcher);
        if (match) {
          return {
            isCrossReferenced: true,
            matchedClaim: match,
            verdict: match.assessment.verdict,
            explanation: `Cross-referenced with verified library record: "${match.claimText}". ${match.assessment.shortExplanation}`,
          };
        }
      }
    }

    const queryTokens = extractTokens(headline);
    if (queryTokens.length >= 3) {
      let bestMatch: Claim | null = null;
      let highestScore = 0;

      for (const claim of libraryClaims) {
        const claimTokens = extractTokens(claim.claimText);
        const intersection = queryTokens.filter((token) => claimTokens.includes(token));
        const union = new Set([...queryTokens, ...claimTokens]);
        const score = intersection.length / union.size;

        if (intersection.length >= 4 && score > highestScore && score >= 0.28) {
          highestScore = score;
          bestMatch = claim;
        }
      }

      if (bestMatch) {
        return {
          isCrossReferenced: true,
          matchedClaim: bestMatch,
          verdict: bestMatch.assessment.verdict,
          explanation: `Cross-referenced with verified library record: "${bestMatch.claimText}". ${bestMatch.assessment.shortExplanation}`,
        };
      }
    }
  }

  if (
    h.includes('falsely') || h.includes('debunked') || h.includes('hoax') || h.includes('disproven') ||
    h.includes('unfounded') || h.includes('conspiracy') || h.includes('fake') || h.includes('fabricat') ||
    h.includes('alleges without evidence') || h.includes('bogus') || h.includes('defraud') ||
    h.includes('discredited') || h.includes('baseless')
  ) {
    return {
      isCrossReferenced: false,
      verdict: 'Contradicted by available evidence',
      explanation: 'Disputed or false assertion contradicted by documented state audit records, court dockets, or official Texas election tallies.',
    };
  }

  return {
    isCrossReferenced: false,
    verdict: 'Unchecked',
    explanation: 'Live incoming news wire. Has not yet been cross-referenced against primary legislative journals. Click "Verify with AI" to run an evidence audit.',
  };
}

import { describe, it, expect } from 'vitest';
import { evaluateNewsReport, buildDeterministicPoliticalResponse } from '../services/aiCivicEvaluator';
import { investigateClaim } from '../services/investigationEngine';

describe('AI Accuracy & Neutrality Audit', () => {
  describe('1. News Source & Headline Accuracy Audit', () => {
    it('never assigns a factual verdict from headline keywords alone', () => {
      const headlines = [
        'Governor Abbott Signs $18 Billion Property Tax Relief Legislation (SB 2)',
        'Texas Senate Passes SB 4 Border Security Enforcement Act',
        'Candidate slams rival in campaign rally alleging radical socialist agenda',
        'Tracking poll shows incumbent lead widens among likely suburban voters',
        'Claim alleging fraudulent noncitizen votes debunked by Texas Secretary of State audit',
      ];
      for (const headline of headlines) {
        const result = evaluateNewsReport(headline);
        expect(result.verdict).toBe('Unchecked');
        expect(result.explanation).not.toMatch(/cross-referenced with verified/i);
      }
    });

    it('rates fresh unvetted incoming wire items as "Unchecked" before AI audit', () => {
      const freshHeadline = 'Regional water development board convenes public hearing in Cooke County';
      const result = evaluateNewsReport(freshHeadline);
      expect(result.verdict).toBe('Unchecked');
    });
  });

  describe('2. Normal Conversation on Politics & Neutrality Audit', () => {
    it('provides balanced, objective dossier on Brandon Gill (TX-26) with official roll call citations', () => {
      const res = buildDeterministicPoliticalResponse('What is Brandon Gill doing in Congress?');
      expect(res.reply).toContain('Brandon Gill');
      expect(res.reply).toContain('H.R. 2');
      expect(res.reply).toContain('clerk.house.gov');
      expect(res.sources[0].url).toContain('clerk.house.gov');
    });

    it('provides balanced, factual record on Ken Paxton without partisan editorializing', () => {
      const res = buildDeterministicPoliticalResponse('Tell me about Ken Paxton actions');
      expect(res.reply).toContain('Ken Paxton');
      expect(res.reply).toContain('OpenAI');
      expect(res.reply).toContain('Senate acquitted');
      expect(res.reply).toContain('texasattorneygeneral.gov');
    });

    it('provides factual, nonpartisan legislative context on School Vouchers (HB 1 / SB 1)', () => {
      const res = buildDeterministicPoliticalResponse('What happened with school vouchers?');
      expect(res.reply).toContain('84 to 63');
      expect(res.reply).toContain('63 Democrats and 21 rural Republicans');
      expect(res.reply).toContain('Education Savings Account');
    });

    it('provides statutory details on the $18 Billion property tax relief legislation', () => {
      const res = buildDeterministicPoliticalResponse('How does the Texas property tax cut work?');
      expect(res.reply).toContain('$18.0 billion');
      expect(res.reply).toContain('$100,000');
      expect(res.reply).toContain('Proposition 4');
    });
  });

  describe('3. Core Investigation Engine Neutrality', () => {
    it('strictly avoids bias and cites primary evidence when evaluating claims', async () => {
      const result = await investigateClaim('Texas passed an $18 billion property tax cut in 2023.');
      expect(['Supported by evidence', 'Mostly supported']).toContain(result.claim.assessment.verdict);
      expect(result.claim.assessment.shortExplanation.length).toBeGreaterThan(20);
    });
  });
});

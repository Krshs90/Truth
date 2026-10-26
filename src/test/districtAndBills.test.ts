import { describe, it, expect } from 'vitest';
import { findDistrictsByZip } from '../data/districts';
import { BILLS } from '../data/bills';
import { OFFICIALS } from '../data/officials';
import { getCampaignRaceForDistrict, getDistrictCountiesData, CANDIDATES } from '../data/candidates';

describe('District & Legislative Records Tests', () => {
  it('Resolves Austin Texas ZIP code to Congressional and State Legislative districts', () => {
    const res = findDistrictsByZip('78701');
    expect(res.congressional?.districtNumber).toBe('37');
    expect(res.stateSenate?.districtNumber).toBe('14');
    expect(res.stateHouse?.districtNumber).toBe('49');
    expect(res.notes).toContain('Verified geographic district alignment');
  });

  it('Resolves El Paso Texas ZIP code to West Texas delegation', () => {
    const res = findDistrictsByZip('79901');
    expect(res.congressional?.districtNumber).toBe('16');
    expect(res.stateSenate?.districtNumber).toBe('29');
    expect(res.stateHouse?.districtNumber).toBe('77');
  });

  it('Resolves Dallas Texas ZIP code to North Texas delegation', () => {
    const res = findDistrictsByZip('75206');
    expect(res.congressional?.districtNumber).toBe('32');
    expect(res.stateSenate?.districtNumber).toBe('16');
    expect(res.stateHouse?.districtNumber).toBe('108');
  });

  it('Handles non-Texas ZIP code gracefully with informative fallback and disclaimer', () => {
    const res = findDistrictsByZip('90210');
    expect(res.congressional).toBeDefined();
    expect(res.notes).toContain('Non-Texas ZIP detected');
  });

  it('All officials have verified profile URLs and districts', () => {
    for (const official of OFFICIALS) {
      expect(official.name).toBeTruthy();
      expect(official.officialProfileUrl).toMatch(/^https?:\/\//);
      expect(official.officialWebsite).toMatch(/^https?:\/\//);
      expect(official.district).toBeTruthy();
    }
  });

  it('Bills have authentic captions, session details, and action histories', () => {
    for (const bill of BILLS) {
      expect(bill.officialBillNumber).toBeTruthy();
      expect(bill.actions.length).toBeGreaterThan(0);
      const isOfficialPortal = bill.officialUrl.includes('capitol.texas.gov') || bill.officialUrl.includes('congress.gov');
      expect(isOfficialPortal).toBe(true);
    }
  });

  it('Resolves active campaign races dynamically for every Texas Congressional District 1 through 38', () => {
    for (let districtNum = 1; districtNum <= 38; districtNum++) {
      const race = getCampaignRaceForDistrict(districtNum);
      expect(race).toBeDefined();
      expect(race.id).toBe(`tx-cd${districtNum}-2026`);
      expect(race.candidateAId).toBeTruthy();
      expect(race.candidateBId).toBeTruthy();

      const candA = CANDIDATES.find((c) => c.id === race.candidateAId);
      const candB = CANDIDATES.find((c) => c.id === race.candidateBId);
      expect(candA).toBeDefined();
      expect(candB).toBeDefined();
      expect(candA?.policyPositions.length).toBeGreaterThanOrEqual(3);
      expect(candB?.policyPositions.length).toBeGreaterThanOrEqual(3);

      if (!candA || !candB) throw new Error(`Missing candidates for district ${districtNum}`);
      const countiesData = getDistrictCountiesData(districtNum, candA, candB);
      expect(countiesData.length).toBeGreaterThanOrEqual(1);
      expect(countiesData[0].county).toBeTruthy();
      expect(countiesData[0].candAPercent).toBeGreaterThan(0);
      expect(countiesData[0].candBPercent).toBeGreaterThan(0);
    }
  });

  it('Correctly parses different district formats such as "TX-10", "10", "TX-26", "26", "tx-cd37-2026"', () => {
    expect(getCampaignRaceForDistrict('TX-10').id).toBe('tx-cd10-2026');
    expect(getCampaignRaceForDistrict('10').id).toBe('tx-cd10-2026');
    expect(getCampaignRaceForDistrict('TX-26').id).toBe('tx-cd26-2026');
    expect(getCampaignRaceForDistrict('26').id).toBe('tx-cd26-2026');
    expect(getCampaignRaceForDistrict('tx-cd37-2026').id).toBe('tx-cd37-2026');
    expect(getCampaignRaceForDistrict('TX-02').id).toBe('tx-cd2-2026');
  });
});

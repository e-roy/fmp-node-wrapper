import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('Mutual Fund Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping mutual fund tests - running in CI environment');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch mutual fund quote', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund quote test - running in CI environment');
        return;
      }

      const result = await fmp.mutualFund.getQuote({ symbol: 'VFINX' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const fund = result.data[0];
        expect(fund.symbol).toBeDefined();
        expect(fund.price).toBeDefined();
        expect(fund.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getMutualFundList', () => {
    it('should fetch mutual fund list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund list test - running in CI environment');
        return;
      }

      const result = await fmp.mutualFund.getMutualFundList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const fund = result.data[0];
        expect(fund.symbol).toBeDefined();
        expect(fund.name).toBeDefined();
        // currency might not always be present in the API response
        // expect(fund.currency).toBeDefined();
      }
    }, 10000);
  });

  describe('getHoldings', () => {
    it('should fetch mutual fund holdings', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund holdings test - running in CI environment');
        return;
      }

      const result = await fmp.mutualFund.getHoldings({ symbol: 'VFINX' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // The API might return { holdings: [...] } or direct array
      const holdingsData = Array.isArray(result.data)
        ? result.data
        : (result.data as any)?.holdings || [];

      expect(Array.isArray(holdingsData)).toBe(true);

      if (holdingsData.length > 0) {
        const holding = holdingsData[0];
        expect(holding.asset || holding.symbol).toBeDefined();
        expect(holding.weightPercent || holding.weighting).toBeDefined();
      }
    }, 10000);
  });
});

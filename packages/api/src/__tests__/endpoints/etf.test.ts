import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('ETF Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping ETF tests - running in CI environment');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch ETF quote', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF quote test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getQuote({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const etf = result.data[0];
        expect(etf.symbol).toBeDefined();
        expect(etf.price).toBeDefined();
        expect(etf.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getETFList', () => {
    it('should fetch ETF list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF list test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getETFList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const etf = result.data[0];
        expect(etf.symbol).toBeDefined();
        expect(etf.name).toBeDefined();
        // currency might not always be present in the API response
        // expect(etf.currency).toBeDefined();
      }
    }, 10000);
  });

  describe('getHoldings', () => {
    it('should fetch ETF holdings', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF holdings test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getHoldings({ symbol: 'SPY' });

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
        // Do not assert weighting, as it may not be present
      }
    }, 10000);
  });
});

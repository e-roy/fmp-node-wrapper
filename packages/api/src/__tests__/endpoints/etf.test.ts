import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

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
      if (
        result.data &&
        ((Array.isArray(result.data) && result.data.length > 0) ||
          (!Array.isArray(result.data) && result.data))
      ) {
        const etf = getFirstItem(result.data);
        expect(etf.symbol).toBeDefined();
        expect(etf.price).toBeDefined();
        expect(etf.changesPercentage).toBeDefined();
      } else {
        // Accept empty result as valid for this test
        expect(result.data).toBeDefined();
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
      }
    }, 10000);
  });
});

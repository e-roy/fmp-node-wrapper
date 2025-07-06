import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Mutual Fund Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping mutual fund tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch mutual fund quote', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund quote test - no API key available');
        return;
      }

      const result = await fmp.mutualFund.getQuote({ symbol: 'VFINX' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (
        result.data &&
        ((Array.isArray(result.data) && result.data.length > 0) ||
          (!Array.isArray(result.data) && result.data))
      ) {
        const fund = getFirstItem(result.data);
        expect(fund.symbol).toBeDefined();
        expect((fund as any).name).toBeDefined();
      } else {
        // Accept empty result as valid for this test
        expect(result.data).toBeDefined();
      }
    }, 10000);
  });

  describe('getHoldings', () => {
    it('should fetch mutual fund holdings', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund holdings test - no API key available');
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

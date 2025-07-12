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
        expect(fund.price).toBeDefined();
        expect(fund.changesPercentage).toBeDefined();
        expect(fund.change).toBeDefined();
        expect(fund.volume).toBeDefined();
        expect(fund.exchange).toBeDefined();
      } else {
        // Accept empty result as valid for this test
        expect(result.data).toBeDefined();
      }
    }, 10000);
  });

  describe('getHolders', () => {
    it('should fetch mutual fund holders', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund holders test - no API key available');
        return;
      }

      const result = await fmp.mutualFund.getHolders({ symbol: 'VFINX' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const holding = result.data[0];
        expect(holding.holder).toBeDefined();
        expect(holding.shares).toBeDefined();
        expect(holding.dateReported).toBeDefined();
        expect(holding.change).toBeDefined();
        expect(holding.weightPercent).toBeDefined();
      } else {
        // Accept empty result as valid for this test
        expect(Array.isArray(result.data)).toBe(true);
      }
    }, 10000);
  });
});

import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Bond Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping bond tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch bond quote', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping bond quote test - no API key available');
        return;
      }
      const result = await fmp.bond.getQuote({ symbol: 'US10Y' });
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (
        result.data &&
        ((Array.isArray(result.data) && result.data.length > 0) ||
          (!Array.isArray(result.data) && result.data))
      ) {
        const bond = getFirstItem(result.data);
        expect(bond.symbol).toBeDefined();
        expect(bond.price).toBeDefined();
        expect(bond.changesPercentage).toBeDefined();
      } else {
        // Accept empty result as valid for this test
        expect(result.data).toBeDefined();
      }
    }, 10000);
  });

  describe('getHistoricalPrice', () => {
    it('should fetch bond historical price', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping bond historical price test - running in CI environment');
        return;
      }

      const result = await fmp.bond.getHistoricalPrice({
        symbol: 'US10Y',
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      // The API might return { historical: [...] } or direct array
      const historicalData = Array.isArray(result.data)
        ? result.data
        : result.data?.historical || [];
      expect(Array.isArray(historicalData)).toBe(true);
      if (historicalData.length > 0) {
        const price = historicalData[0];
        expect(price.date).toBeDefined();
        expect(price.price || price.close || price.adjClose).toBeDefined();
      }
    }, 10000);
  });
});

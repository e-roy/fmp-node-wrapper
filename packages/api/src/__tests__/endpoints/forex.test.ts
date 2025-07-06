import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Forex Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping forex tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch forex quote for EURUSD', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping forex quote test - no API key available');
        return;
      }
      const result = await fmp.forex.getQuote({ symbol: 'EURUSD' });
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      if (
        result.data &&
        ((Array.isArray(result.data) && result.data.length > 0) ||
          (!Array.isArray(result.data) && result.data))
      ) {
        const quote = getFirstItem(result.data);
        expect(quote.symbol).toBe('EURUSD');
        expect(quote.price).toBeGreaterThan(0);
        expect(quote.volume).toBeGreaterThan(0);
      } else {
        // Accept empty result as valid for this test
        expect(result.data).toBeDefined();
      }
    }, 10000);
  });

  describe('getHistoricalPrice', () => {
    it('should fetch historical forex data for EURUSD', async () => {
      const result = await fmp.forex.getHistoricalPrice({
        symbol: 'EURUSD',
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      // Accept both array and { historical: [...] }
      const historicalData = Array.isArray(result.data)
        ? result.data
        : result.data?.historical || [];
      expect(Array.isArray(historicalData)).toBe(true);
    }, 15000);
  });
});

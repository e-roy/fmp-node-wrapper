import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('Crypto Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping crypto tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch crypto quote', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping crypto quote test - no API key available');
        return;
      }

      const result = await fmp.crypto.getQuote({ symbol: 'BTCUSD' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const crypto = result.data[0];
        expect(crypto.symbol).toBeDefined();
        expect(crypto.price).toBeDefined();
        expect(crypto.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getHistoricalPrice', () => {
    it('should fetch crypto historical price', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping crypto historical price test - no API key available');
        return;
      }

      const result = await fmp.crypto.getHistoricalPrice({
        symbol: 'BTCUSD',
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
        // price might be named differently in the API response
        expect(price.price || price.close || price.adjClose).toBeDefined();
      }
    }, 10000);
  });
});

import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('Bond Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping bond tests - running in CI environment');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch bond quote', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping bond quote test - running in CI environment');
        return;
      }

      const result = await fmp.bond.getQuote({ symbol: 'US10Y' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const bond = result.data[0];
        expect(bond.symbol).toBeDefined();
        expect(bond.price).toBeDefined();
        expect(bond.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getBondList', () => {
    it('should fetch bond list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping bond list test - running in CI environment');
        return;
      }

      const result = await fmp.bond.getBondList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const bond = result.data[0];
        expect(bond.symbol).toBeDefined();
        expect(bond.name).toBeDefined();
        expect(bond.currency).toBeDefined();
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
        // price might be named differently in the API response
        expect(price.price || price.close || price.adjClose).toBeDefined();
      }
    }, 10000);
  });
});

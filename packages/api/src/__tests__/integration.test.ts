import { FMP } from '../fmp';

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../../.env') });

// Skip tests if no API key is provided or if running in CI
const API_KEY = process.env.FMP_API_KEY;
const isCI = process.env.CI === 'true';

describe('FMP API Integration Tests', () => {
  if (!API_KEY || isCI) {
    it('should skip tests when no API key is provided or running in CI', () => {
      if (isCI) {
        console.log('Skipping integration tests - running in CI environment');
      } else {
        console.log('Skipping integration tests - no FMP_API_KEY found in environment');
      }
      expect(true).toBe(true);
    });
    return;
  }

  let fmp: FMP;

  beforeAll(() => {
    fmp = new FMP({
      apiKey: API_KEY,
    });
  });

  describe('Stock Quote', () => {
    it('should fetch stock quote for AAPL', async () => {
      const result = await fmp.stock.getQuote({ symbol: 'AAPL' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const quote = result.data[0];
        expect(quote.symbol).toBe('AAPL');
        expect(quote.price).toBeGreaterThan(0);
        expect(quote.marketCap).toBeGreaterThan(0);
      }
    }, 10000);

    it('should handle invalid symbol gracefully', async () => {
      const result = await fmp.stock.getQuote({
        symbol: 'INVALID_SYMBOL_12345',
      });

      // Accept either an empty array or a failed response
      expect(
        (Array.isArray(result.data) && result.data.length === 0) || result.success === false,
      ).toBe(true);
    }, 10000);
  });

  describe('Company Profile', () => {
    it('should fetch company profile for AAPL', async () => {
      const result = await fmp.stock.getCompanyProfile({ symbol: 'AAPL' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const profile = result.data[0];
        expect(profile.symbol).toBe('AAPL');
        expect(profile.companyName).toBeDefined();
        expect(profile.industry).toBeDefined();
        expect(profile.sector).toBeDefined();
      }
    }, 10000);
  });

  describe('Financial Statements', () => {
    it('should fetch income statement for AAPL', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const statement = result.data[0];
        expect(statement.symbol).toBe('AAPL');
        expect(statement.date).toBeDefined();
        expect(['annual', 'FY']).toContain(statement.period);
      }
    }, 15000);
  });

  describe('Market Data', () => {
    it('should fetch market hours', async () => {
      const result = await fmp.market.getMarketHours();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.isTheStockMarketOpen).toBeDefined();
    }, 10000);
  });
});

import { FMP } from '../fmp';
import { API_KEY, isCI } from './utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

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
    if (!API_KEY) {
      throw new Error('FMP_API_KEY is required for testing');
    }
    fmp = new FMP({
      apiKey: API_KEY,
    });
  });

  describe('Company Profile', () => {
    it('should fetch company profile for AAPL', async () => {
      const result = await fmp.company.getCompanyProfile('AAPL');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Object.keys(result.data || {}).length).toBeGreaterThan(0);

      if (result.data) {
        const profile = result.data;
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

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const statement = getFirstItem(result.data);
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

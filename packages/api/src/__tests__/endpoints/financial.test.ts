import { FMP } from '../../fmp';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../../../.env') });

const API_KEY = process.env.FMP_API_KEY;
const isCI = process.env.CI === 'true';

describe('Financial Endpoints', () => {
  if (!API_KEY || isCI) {
    it('should skip tests when no API key is provided or running in CI', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let fmp: FMP;

  beforeAll(() => {
    fmp = new FMP({ apiKey: API_KEY });
  });

  describe('getIncomeStatement', () => {
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
        expect(statement.revenue).toBeGreaterThan(0);
        expect(statement.netIncome).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly income statement for AAPL', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    }, 15000);
  });

  describe('getBalanceSheet', () => {
    it('should fetch balance sheet for AAPL', async () => {
      const result = await fmp.financial.getBalanceSheet({
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
        expect(statement.totalAssets).toBeGreaterThan(0);
        expect(statement.totalLiabilities).toBeDefined();
      }
    }, 15000);
  });

  describe('getCashFlowStatement', () => {
    it('should fetch cash flow statement for AAPL', async () => {
      const result = await fmp.financial.getCashFlowStatement({
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
        expect(statement.netIncome).toBeDefined();
        expect(statement.operatingCashFlow).toBeDefined();
      }
    }, 15000);
  });

  describe('getKeyMetrics', () => {
    it('should fetch key metrics for AAPL', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const metrics = result.data[0];
        expect(metrics.symbol).toBe('AAPL');
        expect(metrics.date).toBeDefined();
        expect(metrics.marketCap).toBeGreaterThan(0);
        expect(metrics.peRatio).toBeDefined();
      }
    }, 15000);
  });

  describe('getFinancialRatios', () => {
    it('should fetch financial ratios for AAPL', async () => {
      const result = await fmp.financial.getFinancialRatios({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const ratios = result.data[0];
        expect(ratios.symbol).toBe('AAPL');
        expect(ratios.date).toBeDefined();
        expect(ratios.currentRatio).toBeDefined();
        expect(ratios.debtEquityRatio).toBeDefined();
      }
    }, 15000);
  });

  describe('getEnterpriseValue', () => {
    it('should fetch enterprise value for AAPL', async () => {
      const result = await fmp.financial.getEnterpriseValue({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const ev = result.data[0];
        expect(ev.symbol).toBe('AAPL');
        expect(ev.date).toBeDefined();
        expect(ev.enterpriseValue).toBeGreaterThan(0);
        expect(ev.marketCapitalization).toBeGreaterThan(0);
      }
    }, 15000);
  });
});

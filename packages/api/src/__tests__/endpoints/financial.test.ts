import { FMP } from '../../fmp';
import { API_KEY, isCI } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Financial Endpoints', () => {
  if (!API_KEY || isCI) {
    it('should skip tests when no API key is provided or running in CI', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let fmp: FMP;

  beforeAll(() => {
    if (!API_KEY) {
      throw new Error('FMP_API_KEY is required for testing');
    }
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

      if (result.data) {
        const statement = getFirstItem(result.data);
        expect(statement.symbol).toBe('AAPL');
        expect(statement.date).toBeDefined();
        expect(statement.revenue).toBeGreaterThan(0);
        expect(statement.netIncome).toBeDefined();
        expect(statement.reportedCurrency).toBeDefined();
        expect(statement.calendarYear).toBeDefined();
        expect(statement.period).toBeDefined();
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

      if (result.data) {
        const statement = getFirstItem(result.data);
        expect(statement.symbol).toBe('AAPL');
        expect(statement.period).toMatch(/^Q\d+$/);
      }
    }, 15000);

    it('should handle different limit values', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      // When limit is 1, we still get an array with one item
      expect(Array.isArray(result.data)).toBe(true);
      if (result.data && result.data.length > 0) {
        expect(result.data[0]).toHaveProperty('symbol');
        expect(result.data[0]).toHaveProperty('date');
      }
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

      if (result.data) {
        const statement = getFirstItem(result.data);
        expect(statement.symbol).toBe('AAPL');
        expect(statement.date).toBeDefined();
        expect(statement.totalAssets).toBeGreaterThan(0);
        expect(statement.totalLiabilities).toBeDefined();
        expect(statement.totalStockholdersEquity).toBeDefined();
        expect(statement.cashAndCashEquivalents).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly balance sheet for AAPL', async () => {
      const result = await fmp.financial.getBalanceSheet({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const statement = getFirstItem(result.data);
        expect(statement.symbol).toBe('AAPL');
        expect(statement.period).toMatch(/^Q\d+$/);
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

      if (result.data) {
        const statement = getFirstItem(result.data);
        expect(statement.symbol).toBe('AAPL');
        expect(statement.date).toBeDefined();
        expect(statement.netIncome).toBeDefined();
        expect(statement.operatingCashFlow).toBeDefined();
        expect(statement.freeCashFlow).toBeDefined();
        expect(statement.capitalExpenditure).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly cash flow statement for AAPL', async () => {
      const result = await fmp.financial.getCashFlowStatement({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const statement = getFirstItem(result.data);
        expect(statement.symbol).toBe('AAPL');
        expect(statement.period).toMatch(/^Q\d+$/);
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

      if (result.data) {
        const metrics = getFirstItem(result.data);
        expect(metrics.symbol).toBe('AAPL');
        expect(metrics.date).toBeDefined();
        expect(metrics.marketCap).toBeGreaterThan(0);
        expect(metrics.peRatio).toBeDefined();
        expect(metrics.enterpriseValue).toBeDefined();
        expect(metrics.revenuePerShare).toBeDefined();
        expect(metrics.bookValuePerShare).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly key metrics for AAPL', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const metrics = getFirstItem(result.data);
        expect(metrics.symbol).toBe('AAPL');
        expect(metrics.period).toMatch(/^Q\d+$/);
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

      if (result.data) {
        const ratios = getFirstItem(result.data);
        expect(ratios.symbol).toBe('AAPL');
        expect(ratios.date).toBeDefined();
        expect(ratios.currentRatio).toBeDefined();
        expect(ratios.debtEquityRatio).toBeDefined();
        expect(ratios.returnOnEquity).toBeDefined();
        expect(ratios.returnOnAssets).toBeDefined();
        expect(ratios.grossProfitMargin).toBeDefined();
        expect(ratios.netProfitMargin).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly financial ratios for AAPL', async () => {
      const result = await fmp.financial.getFinancialRatios({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const ratios = getFirstItem(result.data);
        expect(ratios.symbol).toBe('AAPL');
        expect(ratios.period).toMatch(/^Q\d+$/);
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

      if (result.data) {
        const ev = getFirstItem(result.data);
        expect(ev.symbol).toBe('AAPL');
        expect(ev.date).toBeDefined();
        expect(ev.enterpriseValue).toBeGreaterThan(0);
        expect(ev.marketCapitalization).toBeGreaterThan(0);
        expect(ev.stockPrice).toBeGreaterThan(0);
        expect(ev.numberOfShares).toBeGreaterThan(0);
      }
    }, 15000);

    it('should fetch quarterly enterprise value for AAPL', async () => {
      const result = await fmp.financial.getEnterpriseValue({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const ev = getFirstItem(result.data);
        expect(ev.symbol).toBe('AAPL');
        expect(ev.date).toBeDefined();
        expect(ev.enterpriseValue).toBeGreaterThan(0);
        expect(ev.marketCapitalization).toBeGreaterThan(0);
      }
    }, 15000);
  });

  describe('getCashflowGrowth', () => {
    it('should fetch cashflow growth for AAPL', async () => {
      const result = await fmp.financial.getCashflowGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.date).toBeDefined();
        expect(growth.calendarYear).toBeDefined();
        expect(growth.period).toBeDefined();
        expect(growth.growthNetIncome).toBeDefined();
        expect(growth.growthOperatingCashFlow).toBeDefined();
        expect(growth.growthFreeCashFlow).toBeDefined();
        expect(growth.growthDepreciationAndAmortization).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly cashflow growth for AAPL', async () => {
      const result = await fmp.financial.getCashflowGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.period).toMatch(/^Q\d+$/);
      }
    }, 15000);
  });

  describe('getIncomeGrowth', () => {
    it('should fetch income growth for AAPL', async () => {
      const result = await fmp.financial.getIncomeGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.date).toBeDefined();
        expect(growth.calendarYear).toBeDefined();
        expect(growth.period).toBeDefined();
        expect(growth.growthRevenue).toBeDefined();
        expect(growth.growthNetIncome).toBeDefined();
        expect(growth.growthEPS).toBeDefined();
        expect(growth.growthGrossProfit).toBeDefined();
        expect(growth.growthOperatingIncome).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly income growth for AAPL', async () => {
      const result = await fmp.financial.getIncomeGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.period).toMatch(/^Q\d+$/);
      }
    }, 15000);
  });

  describe('getBalanceSheetGrowth', () => {
    it('should fetch balance sheet growth for AAPL', async () => {
      const result = await fmp.financial.getBalanceSheetGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.date).toBeDefined();
        expect(growth.calendarYear).toBeDefined();
        expect(growth.period).toBeDefined();
        expect(growth.growthTotalAssets).toBeDefined();
        expect(growth.growthTotalLiabilities).toBeDefined();
        expect(growth.growthTotalStockholdersEquity).toBeDefined();
        expect(growth.growthCashAndCashEquivalents).toBeDefined();
        expect(growth.growthTotalDebt).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly balance sheet growth for AAPL', async () => {
      const result = await fmp.financial.getBalanceSheetGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.period).toMatch(/^Q\d+$/);
      }
    }, 15000);
  });

  describe('getFinancialGrowth', () => {
    it('should fetch financial growth for AAPL', async () => {
      const result = await fmp.financial.getFinancialGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.date).toBeDefined();
        expect(growth.calendarYear).toBeDefined();
        expect(growth.period).toBeDefined();
        expect(growth.revenueGrowth).toBeDefined();
        expect(growth.netIncomeGrowth).toBeDefined();
        expect(growth.epsgrowth).toBeDefined();
        expect(growth.operatingCashFlowGrowth).toBeDefined();
        expect(growth.freeCashFlowGrowth).toBeDefined();
        expect(growth.assetGrowth).toBeDefined();
        expect(growth.debtGrowth).toBeDefined();
      }
    }, 15000);

    it('should fetch quarterly financial growth for AAPL', async () => {
      const result = await fmp.financial.getFinancialGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        const growth = getFirstItem(result.data);
        expect(growth.symbol).toBe('AAPL');
        expect(growth.period).toMatch(/^Q\d+$/);
      }
    }, 15000);
  });

  describe('Error handling', () => {
    it('should handle invalid symbol gracefully', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'INVALID_SYMBOL_12345',
        period: 'annual',
        limit: 1,
      });

      // The API might return an empty array or an error response
      expect(result.success).toBeDefined();
      // If it's successful but with no data, that's also acceptable
      if (result.success && result.data) {
        expect(Array.isArray(result.data)).toBe(true);
      }
    }, 15000);

    it('should handle different limit values correctly', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AAPL',
        period: 'annual',
        limit: 10,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      if (Array.isArray(result.data)) {
        expect(result.data.length).toBeLessThanOrEqual(10);
      }
    }, 15000);
  });
});

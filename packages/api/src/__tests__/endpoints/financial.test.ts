import { FMP } from '../../fmp';
import { API_KEY, isCI } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

// Helper function to validate financial statement base fields
function validateFinancialStatementBase(statement: any, symbol: string) {
  expect(statement.symbol).toBe(symbol);
  expect(statement.date).toBeDefined();
  expect(typeof statement.date).toBe('string');
  expect(statement.reportedCurrency).toBeDefined();
  expect(typeof statement.reportedCurrency).toBe('string');
  expect(statement.cik).toBeDefined();
  expect(typeof statement.cik).toBe('string');
  expect(statement.fillingDate).toBeDefined();
  expect(statement.acceptedDate).toBeDefined();
  expect(statement.calendarYear).toBeDefined();
  expect(statement.period).toBeDefined();
  expect(statement.link).toBeDefined();
  expect(statement.finalLink).toBeDefined();
}

// Helper function to validate growth statement base fields
function validateGrowthStatementBase(statement: any, symbol: string) {
  expect(statement.symbol).toBe(symbol);
  expect(statement.date).toBeDefined();
  expect(typeof statement.date).toBe('string');
  expect(statement.calendarYear).toBeDefined();
  expect(statement.period).toBeDefined();
}

// Helper function to validate numeric fields are numbers (not null/undefined)
function validateNumericField(value: any, _fieldName: string) {
  expect(value).toBeDefined();
  expect(typeof value).toBe('number');
  expect(isNaN(value)).toBe(false);
}

// Helper function to validate optional numeric fields
function validateOptionalNumericField(value: any, _fieldName: string) {
  if (value !== null && value !== undefined) {
    expect(typeof value).toBe('number');
    expect(isNaN(value)).toBe(false);
  }
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
    it('should fetch annual income statement for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'AAPL');
      expect(statement.period).toBe('FY');

      // Validate key financial metrics
      validateNumericField(statement.revenue, 'revenue');
      validateNumericField(statement.grossProfit, 'grossProfit');
      validateNumericField(statement.operatingIncome, 'operatingIncome');
      validateNumericField(statement.netIncome, 'netIncome');
      validateNumericField(statement.eps, 'eps');
      validateNumericField(statement.epsdiluted, 'epsdiluted');

      // Validate ratios
      validateOptionalNumericField(statement.grossProfitRatio, 'grossProfitRatio');
      validateOptionalNumericField(statement.operatingIncomeRatio, 'operatingIncomeRatio');
      validateOptionalNumericField(statement.netIncomeRatio, 'netIncomeRatio');

      // Validate expenses
      validateOptionalNumericField(statement.costOfRevenue, 'costOfRevenue');
      validateOptionalNumericField(statement.operatingExpenses, 'operatingExpenses');
      validateOptionalNumericField(
        statement.researchAndDevelopmentExpenses,
        'researchAndDevelopmentExpenses',
      );
      validateOptionalNumericField(
        statement.generalAndAdministrativeExpenses,
        'generalAndAdministrativeExpenses',
      );

      // Validate shares
      validateNumericField(statement.weightedAverageShsOut, 'weightedAverageShsOut');
      validateNumericField(statement.weightedAverageShsOutDil, 'weightedAverageShsOutDil');
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
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'AAPL');
      expect(statement.period).toMatch(/^Q\d+$/);
    }, 15000);

    it('should fetch income statement for MSFT', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'MSFT',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'MSFT');
      expect(statement.revenue).toBeGreaterThan(0);
      expect(statement.netIncome).toBeDefined();
    }, 15000);

    it('should handle different limit values correctly', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 5,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeLessThanOrEqual(5);
      expect(result.data!.length).toBeGreaterThan(0);
    }, 15000);

    it('should handle limit of 1 correctly', async () => {
      const result = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeLessThanOrEqual(1);
      expect(result.data!.length).toBeGreaterThan(0);
    }, 15000);
  });

  describe('getBalanceSheet', () => {
    it('should fetch annual balance sheet for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getBalanceSheet({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'AAPL');
      expect(statement.period).toBe('FY');

      // Validate key balance sheet items
      validateNumericField(statement.totalAssets, 'totalAssets');
      validateNumericField(statement.totalLiabilities, 'totalLiabilities');
      validateNumericField(statement.totalStockholdersEquity, 'totalStockholdersEquity');
      validateNumericField(statement.totalEquity, 'totalEquity');

      // Validate current assets
      validateOptionalNumericField(statement.cashAndCashEquivalents, 'cashAndCashEquivalents');
      validateOptionalNumericField(statement.totalCurrentAssets, 'totalCurrentAssets');
      validateOptionalNumericField(statement.inventory, 'inventory');
      validateOptionalNumericField(statement.netReceivables, 'netReceivables');

      // Validate current liabilities
      validateOptionalNumericField(statement.totalCurrentLiabilities, 'totalCurrentLiabilities');
      validateOptionalNumericField(statement.accountPayables, 'accountPayables');
      validateOptionalNumericField(statement.shortTermDebt, 'shortTermDebt');

      // Validate debt
      validateOptionalNumericField(statement.totalDebt, 'totalDebt');
      validateOptionalNumericField(statement.longTermDebt, 'longTermDebt');
      validateOptionalNumericField(statement.netDebt, 'netDebt');

      // Validate equity components
      validateOptionalNumericField(statement.commonStock, 'commonStock');
      validateOptionalNumericField(statement.retainedEarnings, 'retainedEarnings');
    }, 15000);

    it('should fetch quarterly balance sheet for AAPL', async () => {
      const result = await fmp.financial.getBalanceSheet({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'AAPL');
      expect(statement.period).toMatch(/^Q\d+$/);
    }, 15000);

    it('should fetch balance sheet for GOOGL', async () => {
      const result = await fmp.financial.getBalanceSheet({
        symbol: 'GOOGL',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'GOOGL');
      expect(statement.totalAssets).toBeGreaterThan(0);
      expect(statement.totalLiabilities).toBeDefined();
    }, 15000);
  });

  describe('getCashFlowStatement', () => {
    it('should fetch annual cash flow statement for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getCashFlowStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'AAPL');
      expect(statement.period).toBe('FY');

      // Validate key cash flow metrics
      validateNumericField(statement.netIncome, 'netIncome');
      validateOptionalNumericField(statement.operatingCashFlow, 'operatingCashFlow');
      validateOptionalNumericField(statement.freeCashFlow, 'freeCashFlow');
      validateOptionalNumericField(statement.capitalExpenditure, 'capitalExpenditure');

      // Validate operating activities
      validateOptionalNumericField(
        statement.netCashProvidedByOperatingActivities,
        'netCashProvidedByOperatingActivities',
      );
      validateOptionalNumericField(
        statement.depreciationAndAmortization,
        'depreciationAndAmortization',
      );
      validateOptionalNumericField(statement.stockBasedCompensation, 'stockBasedCompensation');
      validateOptionalNumericField(statement.changeInWorkingCapital, 'changeInWorkingCapital');

      // Validate investing activities
      validateOptionalNumericField(
        statement.netCashUsedForInvestingActivites,
        'netCashUsedForInvestingActivites',
      );
      validateOptionalNumericField(
        statement.investmentsInPropertyPlantAndEquipment,
        'investmentsInPropertyPlantAndEquipment',
      );
      validateOptionalNumericField(statement.acquisitionsNet, 'acquisitionsNet');

      // Validate financing activities
      validateOptionalNumericField(
        statement.netCashUsedProvidedByFinancingActivities,
        'netCashUsedProvidedByFinancingActivities',
      );
      validateOptionalNumericField(statement.debtRepayment, 'debtRepayment');
      validateOptionalNumericField(statement.commonStockRepurchased, 'commonStockRepurchased');
      validateOptionalNumericField(statement.dividendsPaid, 'dividendsPaid');

      // Validate cash position
      validateOptionalNumericField(statement.cashAtEndOfPeriod, 'cashAtEndOfPeriod');
      validateOptionalNumericField(statement.cashAtBeginningOfPeriod, 'cashAtBeginningOfPeriod');
      validateOptionalNumericField(statement.netChangeInCash, 'netChangeInCash');
    }, 15000);

    it('should fetch quarterly cash flow statement for AAPL', async () => {
      const result = await fmp.financial.getCashFlowStatement({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'AAPL');
      expect(statement.period).toMatch(/^Q\d+$/);
    }, 15000);

    it('should fetch cash flow statement for TSLA', async () => {
      const result = await fmp.financial.getCashFlowStatement({
        symbol: 'TSLA',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const statement = getFirstItem(result.data!);
      validateFinancialStatementBase(statement, 'TSLA');
      expect(statement.netIncome).toBeDefined();
      expect(statement.operatingCashFlow).toBeDefined();
    }, 15000);
  });

  describe('getKeyMetrics', () => {
    it('should fetch annual key metrics for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const metrics = getFirstItem(result.data!);
      expect(metrics.symbol).toBe('AAPL');
      expect(metrics.date).toBeDefined();
      expect(metrics.period).toBe('FY');

      // Validate valuation metrics
      validateNumericField(metrics.marketCap, 'marketCap');
      validateOptionalNumericField(metrics.enterpriseValue, 'enterpriseValue');
      validateOptionalNumericField(metrics.peRatio, 'peRatio');
      validateOptionalNumericField(metrics.priceToSalesRatio, 'priceToSalesRatio');
      validateOptionalNumericField(metrics.pbRatio, 'pbRatio');

      // Validate per-share metrics
      validateOptionalNumericField(metrics.revenuePerShare, 'revenuePerShare');
      validateOptionalNumericField(metrics.netIncomePerShare, 'netIncomePerShare');
      validateOptionalNumericField(metrics.bookValuePerShare, 'bookValuePerShare');
      validateOptionalNumericField(metrics.cashPerShare, 'cashPerShare');
      validateOptionalNumericField(metrics.freeCashFlowPerShare, 'freeCashFlowPerShare');

      // Validate ratios
      validateOptionalNumericField(metrics.debtToEquity, 'debtToEquity');
      validateOptionalNumericField(metrics.currentRatio, 'currentRatio');
      validateOptionalNumericField(metrics.roe, 'roe');
      validateOptionalNumericField(metrics.roic, 'roic');
      validateOptionalNumericField(metrics.dividendYield, 'dividendYield');
    }, 15000);

    it('should fetch quarterly key metrics for AAPL', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const metrics = getFirstItem(result.data!);
      expect(metrics.symbol).toBe('AAPL');
      expect(metrics.period).toMatch(/^Q\d+$/);
    }, 15000);

    it('should fetch key metrics for AMZN', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AMZN',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const metrics = getFirstItem(result.data!);
      expect(metrics.symbol).toBe('AMZN');
      expect(metrics.marketCap).toBeGreaterThan(0);
      expect(metrics.peRatio).toBeDefined();
    }, 15000);
  });

  describe('getFinancialRatios', () => {
    it('should fetch annual financial ratios for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getFinancialRatios({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const ratios = getFirstItem(result.data!);
      expect(ratios.symbol).toBe('AAPL');
      expect(ratios.date).toBeDefined();
      expect(ratios.period).toBe('FY');

      // Validate liquidity ratios
      validateOptionalNumericField(ratios.currentRatio, 'currentRatio');
      validateOptionalNumericField(ratios.quickRatio, 'quickRatio');
      validateOptionalNumericField(ratios.cashRatio, 'cashRatio');

      // Validate profitability ratios
      validateOptionalNumericField(ratios.grossProfitMargin, 'grossProfitMargin');
      validateOptionalNumericField(ratios.operatingProfitMargin, 'operatingProfitMargin');
      validateOptionalNumericField(ratios.netProfitMargin, 'netProfitMargin');
      validateOptionalNumericField(ratios.returnOnAssets, 'returnOnAssets');
      validateOptionalNumericField(ratios.returnOnEquity, 'returnOnEquity');

      // Validate leverage ratios
      validateOptionalNumericField(ratios.debtRatio, 'debtRatio');
      validateOptionalNumericField(ratios.debtEquityRatio, 'debtEquityRatio');
      validateOptionalNumericField(ratios.interestCoverage, 'interestCoverage');

      // Validate efficiency ratios
      validateOptionalNumericField(ratios.assetTurnover, 'assetTurnover');
      validateOptionalNumericField(ratios.inventoryTurnover, 'inventoryTurnover');
      validateOptionalNumericField(ratios.receivablesTurnover, 'receivablesTurnover');

      // Validate valuation ratios
      validateOptionalNumericField(ratios.priceEarningsRatio, 'priceEarningsRatio');
      validateOptionalNumericField(ratios.priceToBookRatio, 'priceToBookRatio');
      validateOptionalNumericField(ratios.priceToSalesRatio, 'priceToSalesRatio');
      validateOptionalNumericField(ratios.dividendYield, 'dividendYield');
    }, 15000);

    it('should fetch quarterly financial ratios for AAPL', async () => {
      const result = await fmp.financial.getFinancialRatios({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const ratios = getFirstItem(result.data!);
      expect(ratios.symbol).toBe('AAPL');
      expect(ratios.period).toMatch(/^Q\d+$/);
    }, 15000);

    it('should fetch financial ratios for NVDA', async () => {
      const result = await fmp.financial.getFinancialRatios({
        symbol: 'NVDA',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const ratios = getFirstItem(result.data!);
      expect(ratios.symbol).toBe('NVDA');
      expect(ratios.currentRatio).toBeDefined();
      expect(ratios.returnOnEquity).toBeDefined();
    }, 15000);
  });

  describe('getEnterpriseValue', () => {
    it('should fetch annual enterprise value for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getEnterpriseValue({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const ev = getFirstItem(result.data!);
      expect(ev.symbol).toBe('AAPL');
      expect(ev.date).toBeDefined();

      // Validate enterprise value components
      validateNumericField(ev.enterpriseValue, 'enterpriseValue');
      validateNumericField(ev.marketCapitalization, 'marketCapitalization');
      validateNumericField(ev.stockPrice, 'stockPrice');
      validateNumericField(ev.numberOfShares, 'numberOfShares');

      // Validate enterprise value calculation components
      validateOptionalNumericField(ev.minusCashAndCashEquivalents, 'minusCashAndCashEquivalents');
      validateOptionalNumericField(ev.addTotalDebt, 'addTotalDebt');

      // Validate enterprise value calculation
      if (ev.minusCashAndCashEquivalents !== null && ev.addTotalDebt !== null) {
        const calculatedEV =
          ev.marketCapitalization - ev.minusCashAndCashEquivalents + ev.addTotalDebt;
        expect(Math.abs(ev.enterpriseValue - calculatedEV)).toBeLessThan(1000000); // Allow for rounding differences
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
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const ev = getFirstItem(result.data!);
      expect(ev.symbol).toBe('AAPL');
      expect(ev.enterpriseValue).toBeGreaterThan(0);
      expect(ev.marketCapitalization).toBeGreaterThan(0);
    }, 15000);

    it('should fetch enterprise value for META', async () => {
      const result = await fmp.financial.getEnterpriseValue({
        symbol: 'META',
        period: 'annual',
        limit: 1,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const ev = getFirstItem(result.data!);
      expect(ev.symbol).toBe('META');
      expect(ev.enterpriseValue).toBeGreaterThan(0);
      expect(ev.stockPrice).toBeGreaterThan(0);
    }, 15000);
  });

  describe('getCashflowGrowth', () => {
    it('should fetch annual cashflow growth for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getCashflowGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toBe('FY');

      // Validate key growth metrics
      validateOptionalNumericField(growth.growthNetIncome, 'growthNetIncome');
      validateOptionalNumericField(growth.growthOperatingCashFlow, 'growthOperatingCashFlow');
      validateOptionalNumericField(growth.growthFreeCashFlow, 'growthFreeCashFlow');
      validateOptionalNumericField(
        growth.growthDepreciationAndAmortization,
        'growthDepreciationAndAmortization',
      );

      // Validate operating activities growth
      validateOptionalNumericField(
        growth.growthNetCashProvidedByOperatingActivites,
        'growthNetCashProvidedByOperatingActivites',
      );
      validateOptionalNumericField(
        growth.growthChangeInWorkingCapital,
        'growthChangeInWorkingCapital',
      );
      validateOptionalNumericField(
        growth.growthStockBasedCompensation,
        'growthStockBasedCompensation',
      );

      // Validate investing activities growth
      validateOptionalNumericField(
        growth.growthNetCashUsedForInvestingActivites,
        'growthNetCashUsedForInvestingActivites',
      );
      validateOptionalNumericField(
        growth.growthInvestmentsInPropertyPlantAndEquipment,
        'growthInvestmentsInPropertyPlantAndEquipment',
      );
      validateOptionalNumericField(growth.growthAcquisitionsNet, 'growthAcquisitionsNet');

      // Validate financing activities growth
      validateOptionalNumericField(
        growth.growthNetCashUsedProvidedByFinancingActivities,
        'growthNetCashUsedProvidedByFinancingActivities',
      );
      validateOptionalNumericField(growth.growthDebtRepayment, 'growthDebtRepayment');
      validateOptionalNumericField(growth.growthDividendsPaid, 'growthDividendsPaid');
    }, 15000);

    it('should fetch quarterly cashflow growth for AAPL', async () => {
      const result = await fmp.financial.getCashflowGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toMatch(/^Q\d+$/);
    }, 15000);
  });

  describe('getIncomeGrowth', () => {
    it('should fetch annual income growth for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getIncomeGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toBe('FY');

      // Validate key growth metrics
      validateOptionalNumericField(growth.growthRevenue, 'growthRevenue');
      validateOptionalNumericField(growth.growthNetIncome, 'growthNetIncome');
      validateOptionalNumericField(growth.growthEPS, 'growthEPS');
      validateOptionalNumericField(growth.growthGrossProfit, 'growthGrossProfit');
      validateOptionalNumericField(growth.growthOperatingIncome, 'growthOperatingIncome');

      // Validate expense growth
      validateOptionalNumericField(growth.growthCostOfRevenue, 'growthCostOfRevenue');
      validateOptionalNumericField(growth.growthOperatingExpenses, 'growthOperatingExpenses');
      validateOptionalNumericField(
        growth.growthResearchAndDevelopmentExpenses,
        'growthResearchAndDevelopmentExpenses',
      );
      validateOptionalNumericField(
        growth.growthGeneralAndAdministrativeExpenses,
        'growthGeneralAndAdministrativeExpenses',
      );

      // Validate profitability ratios growth
      validateOptionalNumericField(growth.growthGrossProfitRatio, 'growthGrossProfitRatio');
      validateOptionalNumericField(growth.growthOperatingIncomeRatio, 'growthOperatingIncomeRatio');
      validateOptionalNumericField(growth.growthNetIncomeRatio, 'growthNetIncomeRatio');
    }, 15000);

    it('should fetch quarterly income growth for AAPL', async () => {
      const result = await fmp.financial.getIncomeGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toMatch(/^Q\d+$/);
    }, 15000);
  });

  describe('getBalanceSheetGrowth', () => {
    it('should fetch annual balance sheet growth for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getBalanceSheetGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toBe('FY');

      // Validate key growth metrics
      validateOptionalNumericField(growth.growthTotalAssets, 'growthTotalAssets');
      validateOptionalNumericField(growth.growthTotalLiabilities, 'growthTotalLiabilities');
      validateOptionalNumericField(
        growth.growthTotalStockholdersEquity,
        'growthTotalStockholdersEquity',
      );
      validateOptionalNumericField(
        growth.growthCashAndCashEquivalents,
        'growthCashAndCashEquivalents',
      );
      validateOptionalNumericField(growth.growthTotalDebt, 'growthTotalDebt');

      // Validate current assets growth
      validateOptionalNumericField(growth.growthTotalCurrentAssets, 'growthTotalCurrentAssets');
      validateOptionalNumericField(growth.growthInventory, 'growthInventory');
      validateOptionalNumericField(growth.growthNetReceivables, 'growthNetReceivables');

      // Validate current liabilities growth
      validateOptionalNumericField(
        growth.growthTotalCurrentLiabilities,
        'growthTotalCurrentLiabilities',
      );
      validateOptionalNumericField(growth.growthAccountPayables, 'growthAccountPayables');
      validateOptionalNumericField(growth.growthShortTermDebt, 'growthShortTermDebt');

      // Validate equity components growth
      validateOptionalNumericField(growth.growthCommonStock, 'growthCommonStock');
      validateOptionalNumericField(growth.growthRetainedEarnings, 'growthRetainedEarnings');
    }, 15000);

    it('should fetch quarterly balance sheet growth for AAPL', async () => {
      const result = await fmp.financial.getBalanceSheetGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toMatch(/^Q\d+$/);
    }, 15000);
  });

  describe('getFinancialGrowth', () => {
    it('should fetch annual financial growth for AAPL with comprehensive validation', async () => {
      const result = await fmp.financial.getFinancialGrowth({
        symbol: 'AAPL',
        period: 'annual',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toBe('FY');

      // Validate key growth metrics
      validateOptionalNumericField(growth.revenueGrowth, 'revenueGrowth');
      validateOptionalNumericField(growth.netIncomeGrowth, 'netIncomeGrowth');
      validateOptionalNumericField(growth.epsgrowth, 'epsgrowth');
      validateOptionalNumericField(growth.operatingCashFlowGrowth, 'operatingCashFlowGrowth');
      validateOptionalNumericField(growth.freeCashFlowGrowth, 'freeCashFlowGrowth');
      validateOptionalNumericField(growth.assetGrowth, 'assetGrowth');
      validateOptionalNumericField(growth.debtGrowth, 'debtGrowth');

      // Validate profitability growth
      validateOptionalNumericField(growth.grossProfitGrowth, 'grossProfitGrowth');
      validateOptionalNumericField(growth.operatingIncomeGrowth, 'operatingIncomeGrowth');

      // Validate per-share growth
      validateOptionalNumericField(growth.epsdilutedGrowth, 'epsdilutedGrowth');
      validateOptionalNumericField(
        growth.weightedAverageSharesGrowth,
        'weightedAverageSharesGrowth',
      );
      validateOptionalNumericField(growth.dividendsperShareGrowth, 'dividendsperShareGrowth');

      // Validate long-term growth rates
      validateOptionalNumericField(growth.tenYRevenueGrowthPerShare, 'tenYRevenueGrowthPerShare');
      validateOptionalNumericField(growth.fiveYRevenueGrowthPerShare, 'fiveYRevenueGrowthPerShare');
      validateOptionalNumericField(
        growth.threeYRevenueGrowthPerShare,
        'threeYRevenueGrowthPerShare',
      );
    }, 15000);

    it('should fetch quarterly financial growth for AAPL', async () => {
      const result = await fmp.financial.getFinancialGrowth({
        symbol: 'AAPL',
        period: 'quarter',
        limit: 2,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const growth = getFirstItem(result.data!);
      validateGrowthStatementBase(growth, 'AAPL');
      expect(growth.period).toMatch(/^Q\d+$/);
    }, 15000);
  });

  describe('getEarningsHistorical', () => {
    it('should fetch earnings historical for AAPL', async () => {
      const result = await fmp.financial.getEarningsHistorical({
        symbol: 'AAPL',
        limit: 5,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);

      const earnings = getFirstItem(result.data!);
      expect(earnings.symbol).toBe('AAPL');
      expect(earnings.date).toBeDefined();
      expect(typeof earnings.date).toBe('string');
      expect(earnings.eps).toBeDefined();
      expect(earnings.epsEstimated).toBeDefined();
      expect(earnings.epsEstimated).toBeDefined();
      expect(earnings.time).toBeDefined();
      expect(typeof earnings.time).toBe('string');
      expect(earnings.revenue).toBeDefined();
      expect(earnings.revenueEstimated).toBeDefined();
      expect(earnings.fiscalDateEnding).toBeDefined();
      expect(typeof earnings.fiscalDateEnding).toBe('string');
    }, 15000);

    it('should fetch earnings historical for MSFT', async () => {
      const result = await fmp.financial.getEarningsHistorical({
        symbol: 'MSFT',
        limit: 3,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);
      expect(result.data!.length).toBeLessThanOrEqual(3);

      const earnings = getFirstItem(result.data!);
      expect(earnings.symbol).toBe('MSFT');
      expect(earnings.eps).toBeDefined();
      expect(earnings.revenue).toBeDefined();
    }, 15000);
  });

  describe('getEarningsSurprises', () => {
    it('should fetch earnings surprises for AAPL', async () => {
      const result = await fmp.financial.getEarningsSurprises('AAPL');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data!.length > 0) {
        const surprise = getFirstItem(result.data!);
        expect(surprise.symbol).toBe('AAPL');
        expect(surprise.date).toBeDefined();
        expect(typeof surprise.date).toBe('string');
        expect(surprise.actualEarningResult).toBeDefined();
        expect(typeof surprise.actualEarningResult).toBe('number');
        expect(surprise.estimatedEarning).toBeDefined();
        expect(typeof surprise.estimatedEarning).toBe('number');
      }
    }, 15000);

    it('should fetch earnings surprises for TSLA', async () => {
      const result = await fmp.financial.getEarningsSurprises('TSLA');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data!.length > 0) {
        const surprise = getFirstItem(result.data!);
        expect(surprise.symbol).toBe('TSLA');
        expect(surprise.actualEarningResult).toBeDefined();
        expect(surprise.estimatedEarning).toBeDefined();
      }
    }, 15000);
  });

  describe('Error handling and edge cases', () => {
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

    it('should handle very large limit values', async () => {
      const result = await fmp.financial.getKeyMetrics({
        symbol: 'AAPL',
        period: 'annual',
        limit: 50,
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeLessThanOrEqual(50);
      expect(result.data!.length).toBeGreaterThan(0);
    }, 15000);

    it('should handle different symbols consistently', async () => {
      const symbols = ['AAPL', 'MSFT', 'GOOGL'];
      const results = await Promise.all(
        symbols.map(symbol =>
          fmp.financial.getIncomeStatement({
            symbol,
            period: 'annual',
            limit: 1,
          }),
        ),
      );

      results.forEach((result, index) => {
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        if (result.data!.length > 0) {
          expect(result.data![0].symbol).toBe(symbols[index]);
        }
      });
    }, 20000);

    it('should handle both annual and quarterly periods consistently', async () => {
      const periods = ['annual', 'quarter'] as const;
      const results = await Promise.all(
        periods.map(period =>
          fmp.financial.getBalanceSheet({
            symbol: 'AAPL',
            period,
            limit: 1,
          }),
        ),
      );

      results.forEach((result, index) => {
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        if (result.data!.length > 0) {
          const statement = result.data![0];
          expect(statement.symbol).toBe('AAPL');
          if (periods[index] === 'annual') {
            expect(statement.period).toBe('FY');
          } else {
            expect(statement.period).toMatch(/^Q\d+$/);
          }
        }
      });
    }, 20000);

    it('should validate data consistency across multiple calls', async () => {
      const result1 = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 1,
      });

      const result2 = await fmp.financial.getIncomeStatement({
        symbol: 'AAPL',
        period: 'annual',
        limit: 1,
      });

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.data).toBeDefined();
      expect(result2.data).toBeDefined();

      if (result1.data!.length > 0 && result2.data!.length > 0) {
        const statement1 = result1.data![0];
        const statement2 = result2.data![0];

        // Same symbol and period should return consistent data structure
        expect(statement1.symbol).toBe(statement2.symbol);
        expect(statement1.period).toBe(statement2.period);
        expect(statement1.reportedCurrency).toBe(statement2.reportedCurrency);
      }
    }, 20000);
  });
});

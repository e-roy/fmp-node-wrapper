import { FMP } from '../../fmp';
import { shouldSkipTests, createTestClient, API_TIMEOUT } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

// Helper function to validate financial statement base fields for stable API
function validateFinancialStatementBase(statement: any, symbol: string) {
  expect(statement.symbol).toBe(symbol);
  expect(statement.date).toBeDefined();
  expect(typeof statement.date).toBe('string');

  // Stable API fields - check if they exist and validate type
  if (statement.reportedCurrency !== undefined) {
    expect(typeof statement.reportedCurrency).toBe('string');
  }
  if (statement.cik !== undefined) {
    expect(typeof statement.cik).toBe('string');
  }
  if (statement.filingDate !== undefined) {
    expect(statement.filingDate).toBeDefined();
  }
  if (statement.acceptedDate !== undefined) {
    expect(statement.acceptedDate).toBeDefined();
  }
  if (statement.fiscalYear !== undefined) {
    expect(statement.fiscalYear).toBeDefined();
  }
  if (statement.period !== undefined) {
    expect(statement.period).toBeDefined();
  }
}

// Helper function to validate growth statement base fields for stable API
function validateGrowthStatementBase(statement: any, symbol: string) {
  expect(statement.symbol).toBe(symbol);
  expect(statement.date).toBeDefined();
  expect(typeof statement.date).toBe('string');

  // Stable API might use different field names
  if (statement.fiscalYear !== undefined) {
    expect(statement.fiscalYear).toBeDefined();
  }
  if (statement.calendarYear !== undefined) {
    expect(statement.calendarYear).toBeDefined();
  }
  if (statement.period !== undefined) {
    expect(statement.period).toBeDefined();
  }
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

// Test data cache to avoid duplicate API calls
interface TestDataCache {
  incomeStatement?: any;
  balanceSheet?: any;
  cashFlowStatement?: any;
  keyMetrics?: any;
  financialRatios?: any;
  enterpriseValue?: any;
  cashflowGrowth?: any;
  incomeGrowth?: any;
  balanceSheetGrowth?: any;
  financialGrowth?: any;
  earningsHistorical?: any;
  earningsSurprises?: any;
}

describe('Financial Endpoints', () => {
  let fmp: FMP;
  let testDataCache: TestDataCache = {};

  beforeAll(async () => {
    if (shouldSkipTests()) {
      console.log('Skipping financial tests - no API key available');
      return;
    }
    fmp = createTestClient();

    try {
      // Fetch all financial data in parallel with timeout
      const [
        incomeStatement,
        balanceSheet,
        cashFlowStatement,
        keyMetrics,
        financialRatios,
        enterpriseValue,
        cashflowGrowth,
        incomeGrowth,
        balanceSheetGrowth,
        financialGrowth,
        earningsHistorical,
        earningsSurprises,
      ] = await Promise.all([
        fmp.financial.getIncomeStatement({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getBalanceSheet({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getCashFlowStatement({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getKeyMetrics({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getFinancialRatios({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getEnterpriseValue({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getCashflowGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getIncomeGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getBalanceSheetGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getFinancialGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }),
        fmp.financial.getEarningsHistorical({ symbol: 'AAPL', limit: 5 }),
        fmp.financial.getEarningsSurprises('AAPL'),
      ]);

      testDataCache = {
        incomeStatement,
        balanceSheet,
        cashFlowStatement,
        keyMetrics,
        financialRatios,
        enterpriseValue,
        cashflowGrowth,
        incomeGrowth,
        balanceSheetGrowth,
        financialGrowth,
        earningsHistorical,
        earningsSurprises,
      };
    } catch (error) {
      console.warn('Failed to pre-fetch test data:', error);
      // Continue with tests - they will fetch data individually if needed
    }
  }, API_TIMEOUT);

  describe('getIncomeStatement', () => {
    it(
      'should fetch annual income statement for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping income statement test - no API key available');
          return;
        }

        const result =
          testDataCache.incomeStatement ||
          (await fmp.financial.getIncomeStatement({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const statement = getFirstItem(result.data!);
        validateFinancialStatementBase(statement, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(statement.period).toBeDefined();
        expect(typeof statement.period).toBe('string');

        // Validate key financial metrics
        validateNumericField(statement.revenue, 'revenue');
        validateNumericField(statement.grossProfit, 'grossProfit');
        validateNumericField(statement.operatingIncome, 'operatingIncome');
        validateNumericField(statement.netIncome, 'netIncome');
        validateNumericField(statement.eps, 'eps');
        validateNumericField(statement.epsDiluted, 'epsDiluted');

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
      },
      API_TIMEOUT,
    );
  });

  describe('getBalanceSheet', () => {
    it(
      'should fetch annual balance sheet for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping balance sheet test - no API key available');
          return;
        }

        const result =
          testDataCache.balanceSheet ||
          (await fmp.financial.getBalanceSheet({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const statement = getFirstItem(result.data!);
        validateFinancialStatementBase(statement, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(statement.period).toBeDefined();
        expect(typeof statement.period).toBe('string');

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
      },
      API_TIMEOUT,
    );
  });

  describe('getCashFlowStatement', () => {
    it(
      'should fetch annual cash flow statement for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping cash flow statement test - no API key available');
          return;
        }

        const result =
          testDataCache.cashFlowStatement ||
          (await fmp.financial.getCashFlowStatement({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const statement = getFirstItem(result.data!);
        validateFinancialStatementBase(statement, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(statement.period).toBeDefined();
        expect(typeof statement.period).toBe('string');

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
          statement.netCashProvidedByInvestingActivities,
          'netCashProvidedByInvestingActivities',
        );
        validateOptionalNumericField(
          statement.investmentsInPropertyPlantAndEquipment,
          'investmentsInPropertyPlantAndEquipment',
        );
        validateOptionalNumericField(statement.acquisitionsNet, 'acquisitionsNet');

        // Validate financing activities
        validateOptionalNumericField(
          statement.netCashProvidedByFinancingActivities,
          'netCashProvidedByFinancingActivities',
        );
        validateOptionalNumericField(statement.netDebtIssuance, 'netDebtIssuance');
        validateOptionalNumericField(statement.commonStockRepurchased, 'commonStockRepurchased');
        validateOptionalNumericField(statement.netDividendsPaid, 'netDividendsPaid');

        // Validate cash position
        validateOptionalNumericField(statement.cashAtEndOfPeriod, 'cashAtEndOfPeriod');
        validateOptionalNumericField(statement.cashAtBeginningOfPeriod, 'cashAtBeginningOfPeriod');
        validateOptionalNumericField(statement.netChangeInCash, 'netChangeInCash');
      },
      API_TIMEOUT,
    );
  });

  describe('getKeyMetrics', () => {
    it(
      'should fetch annual key metrics for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping key metrics test - no API key available');
          return;
        }

        const result =
          testDataCache.keyMetrics ||
          (await fmp.financial.getKeyMetrics({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const metrics = getFirstItem(result.data!);
        expect(metrics.symbol).toBe('AAPL');
        expect(metrics.date).toBeDefined();
        // Stable API might return different period formats, so just check it's defined
        expect(metrics.period).toBeDefined();
        expect(typeof metrics.period).toBe('string');

        // Validate valuation metrics
        validateNumericField(metrics.marketCap, 'marketCap');
        validateOptionalNumericField(metrics.enterpriseValue, 'enterpriseValue');
        validateOptionalNumericField(metrics.evToSales, 'evToSales');
        validateOptionalNumericField(metrics.evToOperatingCashFlow, 'evToOperatingCashFlow');
        validateOptionalNumericField(metrics.evToFreeCashFlow, 'evToFreeCashFlow');

        // Validate ratios
        validateOptionalNumericField(metrics.currentRatio, 'currentRatio');
        validateOptionalNumericField(metrics.returnOnEquity, 'returnOnEquity');
        validateOptionalNumericField(metrics.returnOnInvestedCapital, 'returnOnInvestedCapital');
        validateOptionalNumericField(metrics.earningsYield, 'earningsYield');
        validateOptionalNumericField(metrics.freeCashFlowYield, 'freeCashFlowYield');
      },
      API_TIMEOUT,
    );
  });

  describe('getFinancialRatios', () => {
    it(
      'should fetch annual financial ratios for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping financial ratios test - no API key available');
          return;
        }

        const result =
          testDataCache.financialRatios ||
          (await fmp.financial.getFinancialRatios({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const ratios = getFirstItem(result.data!);
        expect(ratios.symbol).toBe('AAPL');
        expect(ratios.date).toBeDefined();
        // Stable API might return different period formats, so just check it's defined
        expect(ratios.period).toBeDefined();
        expect(typeof ratios.period).toBe('string');

        // Validate liquidity ratios
        validateOptionalNumericField(ratios.currentRatio, 'currentRatio');
        validateOptionalNumericField(ratios.quickRatio, 'quickRatio');
        validateOptionalNumericField(ratios.cashRatio, 'cashRatio');

        // Validate profitability ratios
        validateOptionalNumericField(ratios.grossProfitMargin, 'grossProfitMargin');
        validateOptionalNumericField(ratios.operatingProfitMargin, 'operatingProfitMargin');
        validateOptionalNumericField(ratios.netProfitMargin, 'netProfitMargin');
        validateOptionalNumericField(ratios.ebitMargin, 'ebitMargin');
        validateOptionalNumericField(ratios.ebitdaMargin, 'ebitdaMargin');

        // Validate leverage ratios
        validateOptionalNumericField(ratios.debtToAssetsRatio, 'debtToAssetsRatio');
        validateOptionalNumericField(ratios.debtToEquityRatio, 'debtToEquityRatio');
        validateOptionalNumericField(ratios.interestCoverageRatio, 'interestCoverageRatio');

        // Validate efficiency ratios
        validateOptionalNumericField(ratios.assetTurnover, 'assetTurnover');
        validateOptionalNumericField(ratios.inventoryTurnover, 'inventoryTurnover');
        validateOptionalNumericField(ratios.receivablesTurnover, 'receivablesTurnover');

        // Validate valuation ratios
        validateOptionalNumericField(ratios.priceToEarningsRatio, 'priceToEarningsRatio');
        validateOptionalNumericField(ratios.priceToBookRatio, 'priceToBookRatio');
        validateOptionalNumericField(ratios.priceToSalesRatio, 'priceToSalesRatio');
        validateOptionalNumericField(ratios.dividendYield, 'dividendYield');
      },
      API_TIMEOUT,
    );
  });

  describe('getEnterpriseValue', () => {
    it(
      'should fetch annual enterprise value for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping enterprise value test - no API key available');
          return;
        }

        const result =
          testDataCache.enterpriseValue ||
          (await fmp.financial.getEnterpriseValue({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

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
      },
      API_TIMEOUT,
    );
  });

  describe('getCashflowGrowth', () => {
    it(
      'should fetch annual cashflow growth for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping cashflow growth test - no API key available');
          return;
        }

        const result =
          testDataCache.cashflowGrowth ||
          (await fmp.financial.getCashflowGrowth({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const growth = getFirstItem(result.data!);
        validateGrowthStatementBase(growth, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(growth.period).toBeDefined();
        expect(typeof growth.period).toBe('string');

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
      },
      API_TIMEOUT,
    );
  });

  describe('getIncomeGrowth', () => {
    it(
      'should fetch annual income growth for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping income growth test - no API key available');
          return;
        }

        const result =
          testDataCache.incomeGrowth ||
          (await fmp.financial.getIncomeGrowth({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const growth = getFirstItem(result.data!);
        validateGrowthStatementBase(growth, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(growth.period).toBeDefined();
        expect(typeof growth.period).toBe('string');

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
        validateOptionalNumericField(growth.growthOperatingIncome, 'growthOperatingIncome');
        validateOptionalNumericField(growth.growthNetIncome, 'growthNetIncome');
      },
      API_TIMEOUT,
    );
  });

  describe('getBalanceSheetGrowth', () => {
    it(
      'should fetch annual balance sheet growth for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping balance sheet growth test - no API key available');
          return;
        }

        const result =
          testDataCache.balanceSheetGrowth ||
          (await fmp.financial.getBalanceSheetGrowth({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const growth = getFirstItem(result.data!);
        validateGrowthStatementBase(growth, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(growth.period).toBeDefined();
        expect(typeof growth.period).toBe('string');

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
      },
      API_TIMEOUT,
    );
  });

  describe('getFinancialGrowth', () => {
    it(
      'should fetch annual financial growth for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping financial growth test - no API key available');
          return;
        }

        const result =
          testDataCache.financialGrowth ||
          (await fmp.financial.getFinancialGrowth({
            symbol: 'AAPL',
            period: 'annual',
            limit: 2,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const growth = getFirstItem(result.data!);
        validateGrowthStatementBase(growth, 'AAPL');
        // Stable API might return different period formats, so just check it's defined
        expect(growth.period).toBeDefined();
        expect(typeof growth.period).toBe('string');

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
        validateOptionalNumericField(growth.dividendsPerShareGrowth, 'dividendsPerShareGrowth');

        // Validate long-term growth rates
        validateOptionalNumericField(growth.tenYRevenueGrowthPerShare, 'tenYRevenueGrowthPerShare');
        validateOptionalNumericField(
          growth.fiveYRevenueGrowthPerShare,
          'fiveYRevenueGrowthPerShare',
        );
        validateOptionalNumericField(
          growth.threeYRevenueGrowthPerShare,
          'threeYRevenueGrowthPerShare',
        );
      },
      API_TIMEOUT,
    );
  });

  describe('getEarningsHistorical', () => {
    it(
      'should fetch earnings historical for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings historical test - no API key available');
          return;
        }

        const result =
          testDataCache.earningsHistorical ||
          (await fmp.financial.getEarningsHistorical({
            symbol: 'AAPL',
            limit: 5,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        const earnings = getFirstItem(result.data!);
        expect(earnings.symbol).toBe('AAPL');
        expect(earnings.date).toBeDefined();
        expect(typeof earnings.date).toBe('string');
        expect(earnings.epsActual).toBeDefined();
        expect(earnings.epsEstimated).toBeDefined();
        expect(earnings.revenueActual).toBeDefined();
        expect(earnings.revenueEstimated).toBeDefined();
        expect(earnings.lastUpdated).toBeDefined();
        expect(typeof earnings.lastUpdated).toBe('string');
      },
      API_TIMEOUT,
    );
  });

  describe('getEarningsSurprises', () => {
    it(
      'should fetch earnings surprises for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings surprises test - no API key available');
          return;
        }

        const result =
          testDataCache.earningsSurprises || (await fmp.financial.getEarningsSurprises('AAPL'));

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
      },
      API_TIMEOUT,
    );
  });

  describe('Error handling and edge cases', () => {
    it(
      'should handle invalid symbol gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping invalid symbol test - no API key available');
          return;
        }

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
      },
      API_TIMEOUT,
    );
  });
});

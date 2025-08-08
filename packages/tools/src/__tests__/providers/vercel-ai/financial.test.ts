import { financialTools } from '@/providers/vercel-ai/financial';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    financial: {
      getBalanceSheet: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2023-12-31',
            symbol: 'AAPL',
            reportedCurrency: 'USD',
            fillingDate: '2024-02-01',
            acceptedDate: '2024-02-01 18:00:00',
            period: 'FY',
            link: 'https://www.sec.gov/Archives/edgar/data/320193/000032019324000006/aapl-20231230.htm',
            finalLink:
              'https://www.sec.gov/Archives/edgar/data/320193/000032019324000006/aapl-20231230.htm',
            cashAndCashEquivalents: 48000000000,
            shortTermInvestments: 30000000000,
            cashAndShortTermInvestments: 78000000000,
            netReceivables: 30000000000,
            inventory: 7000000000,
            totalCurrentAssets: 143000000000,
            propertyPlantEquipmentNet: 45000000000,
            goodwill: 0,
            intangibleAssets: 0,
            goodwillAndIntangibleAssets: 0,
            longTermInvestments: 100000000000,
            taxAssets: 0,
            otherNonCurrentAssets: 5000000000,
            totalNonCurrentAssets: 150000000000,
            otherAssets: 0,
            totalAssets: 293000000000,
            accountPayables: 50000000000,
            shortTermDebt: 0,
            taxPayables: 0,
            deferredRevenue: 8000000000,
            otherCurrentLiabilities: 20000000000,
            totalCurrentLiabilities: 78000000000,
            longTermDebt: 95000000000,
            deferredRevenueNonCurrent: 0,
            deferredTaxLiabilitiesNonCurrent: 0,
            otherNonCurrentLiabilities: 5000000000,
            totalNonCurrentLiabilities: 100000000000,
            otherLiabilities: 0,
            capitalLeaseObligations: 0,
            totalLiabilities: 178000000000,
            preferredStock: 0,
            commonStock: 65000000000,
            retainedEarnings: 50000000000,
            accumulatedOtherComprehensiveIncomeLoss: 0,
            othertotalStockholdersEquity: 0,
            totalStockholdersEquity: 115000000000,
            totalEquity: 115000000000,
            totalLiabilitiesAndStockholdersEquity: 293000000000,
            minorityInterest: 0,
            totalLiabilitiesAndTotalEquity: 293000000000,
            totalInvestments: 130000000000,
            totalDebt: 95000000000,
            netDebt: 47000000000,
          },
        ],
      }),
      getIncomeStatement: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2023-12-31',
            symbol: 'AAPL',
            reportedCurrency: 'USD',
            fillingDate: '2024-02-01',
            acceptedDate: '2024-02-01 18:00:00',
            period: 'FY',
            link: 'https://www.sec.gov/Archives/edgar/data/320193/000032019324000006/aapl-20231230.htm',
            finalLink:
              'https://www.sec.gov/Archives/edgar/data/320193/000032019324000006/aapl-20231230.htm',
            revenue: 383000000000,
            costOfRevenue: 214000000000,
            grossProfit: 169000000000,
            grossProfitRatio: 0.441,
            researchAndDevelopmentExpenses: 30000000000,
            generalAndAdministrativeExpenses: 25000000000,
            sellingAndMarketingExpenses: 0,
            sellingGeneralAndAdministrativeExpenses: 25000000000,
            otherExpenses: 0,
            operatingExpenses: 55000000000,
            costAndExpenses: 269000000000,
            interestExpense: 0,
            depreciationAndAmortization: 12000000000,
            ebitda: 181000000000,
            ebitdaratio: 0.473,
            operatingIncome: 114000000000,
            operatingIncomeRatio: 0.298,
            totalOtherIncomeExpensesNet: 1000000000,
            incomeBeforeTax: 115000000000,
            incomeBeforeTaxRatio: 0.3,
            incomeTaxExpense: 20000000000,
            netIncome: 95000000000,
            netIncomeRatio: 0.248,
            eps: 6.16,
            epsDiluted: 6.13,
            weightedAverageShsOut: 15400000000,
            weightedAverageShsOutDil: 15500000000,
            ebit: 114000000000,
            ebitRatio: 0.298,
            ebitdaRatio: 0.473,
          },
        ],
      }),
      getCashFlowStatement: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2023-12-31',
            symbol: 'AAPL',
            reportedCurrency: 'USD',
            fillingDate: '2024-02-01',
            acceptedDate: '2024-02-01 18:00:00',
            period: 'FY',
            link: 'https://www.sec.gov/Archives/edgar/data/320193/000032019324000006/aapl-20231230.htm',
            finalLink:
              'https://www.sec.gov/Archives/edgar/data/320193/000032019324000006/aapl-20231230.htm',
            netIncome: 95000000000,
            depreciationAndAmortization: 12000000000,
            deferredIncomeTax: 0,
            stockBasedCompensation: 8000000000,
            changeInWorkingCapital: -5000000000,
            accountsReceivables: -3000000000,
            inventory: -1000000000,
            accountsPayables: 2000000000,
            otherWorkingCapital: -3000000000,
            otherNonCashItems: 0,
            netCashProvidedByOperatingActivities: 110000000000,
            investmentsInPropertyPlantAndEquipment: -10000000000,
            acquisitionsNet: 0,
            purchasesOfInvestments: -50000000000,
            salesMaturitiesOfInvestments: 45000000000,
            otherInvestingActivites: 0,
            netCashUsedForInvestingActivites: -15000000000,
            debtRepayment: -10000000000,
            commonStockIssued: 0,
            commonStockRepurchased: -80000000000,
            dividendsPaid: -15000000000,
            otherFinancingActivites: 0,
            netCashUsedProvidedByFinancingActivities: -105000000000,
            effectOfForexChangesOnCash: 0,
            netChangeInCash: -10000000000,
            cashAtEndOfPeriod: 48000000000,
            cashAtBeginningOfPeriod: 58000000000,
            operatingCashFlow: 110000000000,
            capitalExpenditure: -10000000000,
            freeCashFlow: 100000000000,
          },
        ],
      }),
      getFinancialRatios: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2023-12-31',
            symbol: 'AAPL',
            period: 'FY',
            currentRatio: 1.83,
            quickRatio: 1.67,
            cashRatio: 0.62,
            daysOfSalesOutstanding: 28.6,
            daysOfInventoryOutstanding: 11.9,
            operatingCycle: 40.5,
            daysOfPayablesOutstanding: 85.2,
            cashConversionCycle: -44.7,
            grossProfitMargin: 0.441,
            operatingProfitMargin: 0.298,
            pretaxProfitMargin: 0.3,
            netProfitMargin: 0.248,
            effectiveTaxRate: 0.174,
            returnOnAssets: 0.324,
            returnOnEquity: 0.826,
            returnOnCapitalEmployed: 0.162,
            netIncomePerEBT: 0.826,
            ebtPerEbit: 1.009,
            ebitPerRevenue: 0.298,
            debtRatio: 0.607,
            debtEquityRatio: 1.548,
            longTermDebtToCapitalization: 0.452,
            totalDebtToCapitalization: 0.452,
            interestCoverage: 0,
            cashFlowToDebtRatio: 1.158,
            companyEquityMultiplier: 2.548,
            receivablesTurnover: 12.78,
            payablesTurnover: 4.28,
            inventoryTurnover: 30.57,
            fixedAssetTurnover: 8.51,
            assetTurnover: 1.31,
            operatingCashFlowPerShare: 7.14,
            freeCashFlowPerShare: 6.49,
            cashPerShare: 3.12,
            payoutRatio: 0.158,
            operatingCashFlowSalesRatio: 0.287,
            freeCashFlowOperatingCashFlowRatio: 0.909,
            cashFlowCoverageRatios: 1.158,
            shortTermCoverageRatios: 1.158,
            capitalExpenditureCoverageRatio: 11,
            dividendPaidAndCapexCoverageRatio: 0.909,
            dividendPayoutRatio: 0.158,
            priceBookValueRatio: 35.71,
            priceToBookRatio: 35.71,
            priceToSalesRatio: 8.86,
            priceEarningsRatio: 35.71,
            priceToFreeCashFlowsRatio: 54.78,
            priceToOperatingCashFlowsRatio: 49.93,
            priceCashFlowRatio: 49.93,
            priceEarningsToGrowthRatio: 2.38,
            priceSalesRatio: 8.86,
            dividendYield: 0.004,
            enterpriseValueMultiple: 28.57,
            priceFairValue: 35.71,
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Financial Tools', () => {
  describe('getBalanceSheet', () => {
    it('should be defined', () => {
      expect(financialTools.getBalanceSheet).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = financialTools.getBalanceSheet;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(financialTools.getBalanceSheet.description).toBe('Get balance sheet for a company');
    });

    it('should have correct input schema', () => {
      const tool = financialTools.getBalanceSheet;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getBalanceSheet tool', async () => {
      const tool = financialTools.getBalanceSheet;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'annual' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('totalAssets', 293000000000);
      expect(parsedResult[0]).toHaveProperty('totalLiabilities', 178000000000);
    });

    it('should execute with quarter period', async () => {
      const tool = financialTools.getBalanceSheet;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'quarter' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getIncomeStatement', () => {
    it('should be defined', () => {
      expect(financialTools.getIncomeStatement).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = financialTools.getIncomeStatement;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(financialTools.getIncomeStatement.description).toBe(
        'Get income statement for a company',
      );
    });

    it('should have correct input schema', () => {
      const tool = financialTools.getIncomeStatement;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getIncomeStatement tool', async () => {
      const tool = financialTools.getIncomeStatement;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'annual' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('revenue', 383000000000);
      expect(parsedResult[0]).toHaveProperty('netIncome', 95000000000);
    });

    it('should execute with quarter period', async () => {
      const tool = financialTools.getIncomeStatement;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'quarter' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getCashFlowStatement', () => {
    it('should be defined', () => {
      expect(financialTools.getCashFlowStatement).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = financialTools.getCashFlowStatement;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(financialTools.getCashFlowStatement.description).toBe(
        'Get cash flow statement for a company',
      );
    });

    it('should have correct input schema', () => {
      const tool = financialTools.getCashFlowStatement;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getCashFlowStatement tool', async () => {
      const tool = financialTools.getCashFlowStatement;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'annual' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('operatingCashFlow', 110000000000);
      expect(parsedResult[0]).toHaveProperty('freeCashFlow', 100000000000);
    });

    it('should execute with quarter period', async () => {
      const tool = financialTools.getCashFlowStatement;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'quarter' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getFinancialRatios', () => {
    it('should be defined', () => {
      expect(financialTools.getFinancialRatios).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = financialTools.getFinancialRatios;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(financialTools.getFinancialRatios.description).toBe(
        'Get financial ratios for a company',
      );
    });

    it('should have correct input schema', () => {
      const tool = financialTools.getFinancialRatios;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getFinancialRatios tool', async () => {
      const tool = financialTools.getFinancialRatios;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'annual' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('currentRatio', 1.83);
      expect(parsedResult[0]).toHaveProperty('returnOnEquity', 0.826);
      expect(parsedResult[0]).toHaveProperty('priceEarningsRatio', 35.71);
    });

    it('should execute with quarter period', async () => {
      const tool = financialTools.getFinancialRatios;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', period: 'quarter' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

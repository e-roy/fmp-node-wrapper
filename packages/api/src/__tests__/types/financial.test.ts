import {
  FinancialStatement,
  IncomeStatement,
  BalanceSheet,
  CashFlowStatement,
  KeyMetrics,
  FinancialRatios,
  EnterpriseValue,
  FinancialStatementsParams,
  IncomeStatementParams,
  BalanceSheetParams,
  CashFlowParams,
  KeyMetricsParams,
  FinancialRatiosParams,
  EnterpriseValueParams,
} from '../../types/financial';

describe('Financial Types', () => {
  describe('FinancialStatement Base Interface', () => {
    it('should validate base financial statement structure', () => {
      const statement: FinancialStatement = {
        date: '2024-01-15',
        symbol: 'AAPL',
        reportedCurrency: 'USD',
        cik: '0000320193',
        fillingDate: '2024-01-15',
        acceptedDate: '2024-01-15T10:00:00Z',
        calendarYear: '2024',
        period: 'Q1',
        link: 'https://example.com/filing',
        finalLink: 'https://example.com/final',
        // Dynamic properties should be string, number, or boolean
        additionalMetric: 1000000,
        customField: 'custom value',
        isAudited: true,
      };

      expect(statement.date).toBe('2024-01-15');
      expect(statement.symbol).toBe('AAPL');
      expect(statement.reportedCurrency).toBe('USD');
      expect(statement.additionalMetric).toBe(1000000);
      expect(statement.customField).toBe('custom value');
      expect(statement.isAudited).toBe(true);
    });
  });

  describe('IncomeStatement Interface', () => {
    it('should validate income statement structure', () => {
      const incomeStatement: IncomeStatement = {
        date: '2024-01-15',
        symbol: 'AAPL',
        reportedCurrency: 'USD',
        cik: '0000320193',
        fillingDate: '2024-01-15',
        acceptedDate: '2024-01-15T10:00:00Z',
        calendarYear: '2024',
        period: 'Q1',
        link: 'https://example.com/filing',
        finalLink: 'https://example.com/final',
        revenue: 1000000000,
        costOfRevenue: 600000000,
        grossProfit: 400000000,
        grossProfitRatio: 0.4,
        researchAndDevelopmentExpenses: 50000000,
        generalAndAdministrativeExpenses: 30000000,
        sellingAndMarketingExpenses: 20000000,
        sellingGeneralAndAdministrativeExpenses: 50000000,
        otherExpenses: 10000000,
        operatingExpenses: 110000000,
        costAndExpenses: 710000000,
        interestExpense: 5000000,
        depreciationAndAmortization: 15000000,
        ebitda: 420000000,
        ebitdaratio: 0.42,
        operatingIncome: 290000000,
        operatingIncomeRatio: 0.29,
        totalOtherIncomeExpensesNet: 10000000,
        incomeBeforeTax: 300000000,
        incomeBeforeTaxRatio: 0.3,
        incomeTaxExpense: 75000000,
        netIncome: 225000000,
        netIncomeRatio: 0.225,
        eps: 1.35,
        epsDiluted: 1.32,
        ebit: 305000000,
        ebitRatio: 0.305,
      };

      expect(incomeStatement.revenue).toBe(1000000000);
      expect(incomeStatement.grossProfit).toBe(400000000);
      expect(incomeStatement.netIncome).toBe(225000000);
      expect(incomeStatement.eps).toBe(1.35);
    });
  });

  describe('BalanceSheet Interface', () => {
    it('should validate balance sheet structure', () => {
      const balanceSheet: BalanceSheet = {
        date: '2024-01-15',
        symbol: 'AAPL',
        reportedCurrency: 'USD',
        cik: '0000320193',
        fillingDate: '2024-01-15',
        acceptedDate: '2024-01-15T10:00:00Z',
        calendarYear: '2024',
        period: 'Q1',
        link: 'https://example.com/filing',
        finalLink: 'https://example.com/final',
        cashAndCashEquivalents: 50000000,
        shortTermInvestments: 100000000,
        cashAndShortTermInvestments: 150000000,
        netReceivables: 80000000,
        inventory: 60000000,
        totalCurrentAssets: 290000000,
        propertyPlantEquipmentNet: 40000000,
        goodwill: 0,
        intangibleAssets: 0,
        goodwillAndIntangibleAssets: 0,
        longTermInvestments: 200000000,
        taxAssets: 0,
        otherNonCurrentAssets: 10000000,
        totalNonCurrentAssets: 250000000,
        otherAssets: 0,
        totalAssets: 540000000,
        accountPayables: 40000000,
        shortTermDebt: 0,
        taxPayables: 10000000,
        deferredRevenue: 20000000,
        otherCurrentLiabilities: 10000000,
        totalCurrentLiabilities: 80000000,
        longTermDebt: 100000000,
        deferredRevenueNonCurrent: 0,
        deferredTaxLiabilitiesNonCurrent: 0,
        otherNonCurrentLiabilities: 0,
        totalNonCurrentLiabilities: 100000000,
        otherLiabilities: 0,
        capitalLeaseObligations: 0,
        totalLiabilities: 180000000,
        preferredStock: 0,
        commonStock: 10000000,
        retainedEarnings: 300000000,
        accumulatedOtherComprehensiveIncomeLoss: 0,
        othertotalStockholdersEquity: 0,
        totalStockholdersEquity: 310000000,
        totalEquity: 310000000,
        totalLiabilitiesAndStockholdersEquity: 490000000,
        minorityInterest: 0,
        totalLiabilitiesAndTotalEquity: 490000000,
        totalInvestments: 300000000,
        totalDebt: 100000000,
        netDebt: 50000000,
      };

      expect(balanceSheet.totalAssets).toBe(540000000);
      expect(balanceSheet.totalLiabilities).toBe(180000000);
      expect(balanceSheet.totalStockholdersEquity).toBe(310000000);
      expect(balanceSheet.totalDebt).toBe(100000000);
    });
  });

  describe('CashFlowStatement Interface', () => {
    it('should validate cash flow statement structure', () => {
      const cashFlowStatement: CashFlowStatement = {
        date: '2024-01-15',
        symbol: 'AAPL',
        reportedCurrency: 'USD',
        cik: '0000320193',
        fillingDate: '2024-01-15',
        acceptedDate: '2024-01-15T10:00:00Z',
        calendarYear: '2024',
        period: 'Q1',
        link: 'https://example.com/filing',
        finalLink: 'https://example.com/final',
        netIncome: 225000000,
        depreciationAndAmortization: 15000000,
        deferredIncomeTax: 0,
        changeInWorkingCapital: -10000000,
        accountsReceivables: -5000000,
        inventory: -2000000,
        accountsPayables: 3000000,
        otherWorkingCapital: 0,
        otherNonCashItems: 0,
        netCashProvidedByOperatingActivities: 230000000,
        investmentsInPropertyPlantAndEquipment: -20000000,
        acquisitionsNet: 0,
        purchasesOfInvestments: -50000000,
        salesMaturitiesOfInvestments: 30000000,
        otherInvestingActivites: 0,
        netCashUsedForInvestingActivites: -40000000,
        debtRepayment: 0,
        commonStockIssued: 0,
        commonStockRepurchased: -100000000,
        dividendsPaid: -50000000,
        otherFinancingActivites: 0,
        netCashUsedProvidedByFinancingActivities: -150000000,
        effectOfForexChangesOnCash: 0,
        netChangeInCash: 40000000,
        cashAtEndOfPeriod: 90000000,
        cashAtBeginningOfPeriod: 50000000,
        operatingCashFlow: 230000000,
        capitalExpenditure: -20000000,
        freeCashFlow: 210000000,
      };

      expect(cashFlowStatement.netIncome).toBe(225000000);
      expect(cashFlowStatement.operatingCashFlow).toBe(230000000);
      expect(cashFlowStatement.freeCashFlow).toBe(210000000);
      expect(cashFlowStatement.netChangeInCash).toBe(40000000);
    });
  });

  describe('KeyMetrics Interface', () => {
    it('should validate key metrics structure', () => {
      const keyMetrics: KeyMetrics = {
        symbol: 'AAPL',
        date: '2024-01-15',
        period: 'Q1',
        revenuePerShare: 6.37,
        netIncomePerShare: 1.43,
        operatingCashFlowPerShare: 1.46,
        freeCashFlowPerShare: 1.34,
        cashPerShare: 0.57,
        bookValuePerShare: 3.94,
        tangibleBookValuePerShare: 3.94,
        shareholdersEquityPerShare: 3.94,
        interestDebtPerShare: 0.64,
        marketCap: 2500000000000,
        enterpriseValue: 2600000000000,
        peRatio: 24.43,
        priceToSalesRatio: 6.25,
        pocfratio: 25.7,
        pfcfRatio: 28.0,
        pbRatio: 9.5,
        ptbRatio: 9.5,
        evToSales: 6.5,
        enterpriseValueOverEBITDA: 20.8,
        evToOperatingCashFlow: 26.8,
        evToFreeCashFlow: 29.2,
        earningsYield: 0.041,
        freeCashFlowYield: 0.036,
        debtToEquity: 0.32,
        debtToAssets: 0.24,
        netDebtToEBITDA: 0.12,
        currentRatio: 3.63,
        interestCoverage: 58.0,
        incomeQuality: 1.02,
        dividendYield: 0.005,
        payoutRatio: 0.16,
        salesGeneralAndAdministrativeToRevenue: 0.05,
        researchAndDevelopmentToRevenue: 0.05,
        intangiblesToTotalAssets: 0.0,
        capexToOperatingCashFlow: 0.087,
        capexToRevenue: 0.02,
        capexToDepreciation: 1.33,
        stockBasedCompensationToRevenue: 0.02,
        grahamNumber: 19.8,
        roic: 0.147,
        returnOnTangibleAssets: 0.417,
        grahamNetNet: 2.67,
        workingCapital: 210000000,
        tangibleAssetValue: 540000000,
        netCurrentAssetValue: 210000000,
        investedCapital: 410000000,
        averageReceivables: 75000000,
        averagePayables: 35000000,
        averageInventory: 55000000,
        daysSalesOutstanding: 27.0,
        daysPayablesOutstanding: 21.3,
        daysOfInventoryOnHand: 33.5,
        receivablesTurnover: 13.5,
        payablesTurnover: 17.1,
        inventoryTurnover: 10.9,
        roe: 0.726,
        capexPerShare: 0.13,
      };

      expect(keyMetrics.symbol).toBe('AAPL');
      expect(keyMetrics.peRatio).toBe(24.43);
      expect(keyMetrics.marketCap).toBe(2500000000000);
      expect(keyMetrics.roe).toBe(0.726);
    });
  });

  describe('FinancialRatios Interface', () => {
    it('should validate financial ratios structure', () => {
      const ratios: FinancialRatios = {
        symbol: 'AAPL',
        date: '2024-01-15',
        period: 'Q1',
        currentRatio: 3.63,
        quickRatio: 2.88,
        cashRatio: 1.88,
        daysOfSalesOutstanding: 27.0,
        daysOfInventoryOutstanding: 33.5,
        operatingCycle: 60.5,
        daysOfPayablesOutstanding: 21.3,
        cashConversionCycle: 39.2,
        grossProfitMargin: 0.4,
        operatingProfitMargin: 0.29,
        pretaxProfitMargin: 0.3,
        netProfitMargin: 0.225,
        effectiveTaxRate: 0.25,
        returnOnAssets: 0.417,
        returnOnEquity: 0.726,
        returnOnCapitalEmployed: 0.147,
        netIncomePerEBT: 0.75,
        ebtPerEbit: 1.03,
        ebitPerRevenue: 0.305,
        debtRatio: 0.33,
        debtEquityRatio: 0.32,
        longTermDebtToCapitalization: 0.24,
        totalDebtToCapitalization: 0.24,
        interestCoverage: 58.0,
        cashFlowToDebtRatio: 2.3,
        companyEquityMultiplier: 1.74,
        receivablesTurnover: 13.5,
        payablesTurnover: 17.1,
        inventoryTurnover: 10.9,
        fixedAssetTurnover: 25.0,
        assetTurnover: 1.85,
        operatingCashFlowPerShare: 1.46,
        freeCashFlowPerShare: 1.34,
        cashPerShare: 0.57,
        payoutRatio: 0.16,
        operatingCashFlowSalesRatio: 0.23,
        freeCashFlowOperatingCashFlowRatio: 0.91,
        cashFlowCoverageRatios: 2.3,
        shortTermCoverageRatios: 3.63,
        capitalExpenditureCoverageRatio: 11.5,
        dividendPaidAndCapexCoverageRatio: 4.2,
        dividendPayoutRatio: 0.16,
        priceBookValueRatio: 9.5,
        priceToBookRatio: 9.5,
        priceToSalesRatio: 6.25,
        priceEarningsRatio: 24.43,
        priceToFreeCashFlowsRatio: 28.0,
        priceToOperatingCashFlowsRatio: 25.7,
        priceCashFlowRatio: 25.7,
        priceEarningsToGrowthRatio: 1.2,
        priceSalesRatio: 6.25,
        dividendYield: 0.005,
        enterpriseValueMultiple: 20.8,
        priceFairValue: 155.5,
      };

      expect(ratios.symbol).toBe('AAPL');
      expect(ratios.currentRatio).toBe(3.63);
      expect(ratios.returnOnEquity).toBe(0.726);
      expect(ratios.priceEarningsRatio).toBe(24.43);
    });
  });

  describe('EnterpriseValue Interface', () => {
    it('should validate enterprise value structure', () => {
      const enterpriseValue: EnterpriseValue = {
        symbol: 'AAPL',
        date: '2024-01-15',
        stockPrice: 150.25,
        numberOfShares: 15700000000,
        marketCapitalization: 2500000000000,
        minusCashAndCashEquivalents: 150000000,
        addTotalDebt: 100000000,
        enterpriseValue: 2600000000000,
      };

      expect(enterpriseValue.symbol).toBe('AAPL');
      expect(enterpriseValue.stockPrice).toBe(150.25);
      expect(enterpriseValue.marketCapitalization).toBe(2500000000000);
      expect(enterpriseValue.enterpriseValue).toBe(2600000000000);
    });
  });

  describe('Parameter Interfaces', () => {
    it('should validate FinancialStatementsParams', () => {
      const params: FinancialStatementsParams = {
        symbol: 'AAPL',
        period: 'annual',
        limit: 10,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('annual');
      expect(params.limit).toBe(10);
    });

    it('should validate IncomeStatementParams', () => {
      const params: IncomeStatementParams = {
        symbol: 'AAPL',
        period: 'quarter',
        limit: 5,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('quarter');
      expect(params.limit).toBe(5);
    });

    it('should validate BalanceSheetParams', () => {
      const params: BalanceSheetParams = {
        symbol: 'AAPL',
        period: 'annual',
        limit: 10,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('annual');
      expect(params.limit).toBe(10);
    });

    it('should validate CashFlowParams', () => {
      const params: CashFlowParams = {
        symbol: 'AAPL',
        period: 'quarter',
        limit: 5,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('quarter');
      expect(params.limit).toBe(5);
    });

    it('should validate KeyMetricsParams', () => {
      const params: KeyMetricsParams = {
        symbol: 'AAPL',
        period: 'annual',
        limit: 10,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('annual');
      expect(params.limit).toBe(10);
    });

    it('should validate FinancialRatiosParams', () => {
      const params: FinancialRatiosParams = {
        symbol: 'AAPL',
        period: 'quarter',
        limit: 5,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('quarter');
      expect(params.limit).toBe(5);
    });

    it('should validate EnterpriseValueParams', () => {
      const params: EnterpriseValueParams = {
        symbol: 'AAPL',
        period: 'annual',
        limit: 10,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.period).toBe('annual');
      expect(params.limit).toBe(10);
    });
  });
});

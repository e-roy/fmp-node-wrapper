import type { Tool } from '@openai/agents';

// Mock the version check to prevent it from running during import
jest.mock('@/utils/version-check', () => ({
  checkOpenAIAgentsVersion: jest.fn(),
}));

import * as OpenAIProviders from '@/providers/openai';

describe('OpenAI providers index exports', () => {
  it('exports individual tools', () => {
    const keys = [
      'getCompanyProfile',
      'getEarningsCalendar',
      'getEconomicCalendar',
      'getTreasuryRates',
      'getEconomicIndicators',
      'getETFHoldings',
      'getETFProfile',
      'getBalanceSheet',
      'getIncomeStatement',
      'getCashFlowStatement',
      'getKeyMetrics',
      'getFinancialRatios',
      'getEnterpriseValue',
      'getCashflowGrowth',
      'getIncomeGrowth',
      'getBalanceSheetGrowth',
      'getFinancialGrowth',
      'getEarningsHistorical',
      'getInsiderTrading',
      'getInstitutionalHolders',
      'getMarketPerformance',
      'getSectorPerformance',
      'getGainers',
      'getLosers',
      'getMostActive',
      'getStockQuote',
      'getSenateTrading',
      'getHouseTrading',
      'getSenateTradingByName',
      'getHouseTradingByName',
      'getSenateTradingRSSFeed',
      'getHouseTradingRSSFeed',
      'getMarketCap',
      'getStockSplits',
      'getDividendHistory',
    ];

    keys.forEach(k => expect(OpenAIProviders).toHaveProperty(k));
  });

  it('exports grouped arrays of tools and combined fmpTools', () => {
    const groupKeys = [
      'companyTools',
      'calendarTools',
      'economicTools',
      'etfTools',
      'financialTools',
      'insiderTools',
      'institutionalTools',
      'marketTools',
      'quoteTools',
      'senateHouseTools',
      'stockTools',
      'fmpTools',
    ];

    groupKeys.forEach(k => expect(OpenAIProviders).toHaveProperty(k));

    const allTools: Tool[] = (OpenAIProviders as any).fmpTools;
    expect(Array.isArray(allTools)).toBe(true);
    expect(allTools.length).toBeGreaterThan(10);
    allTools.forEach(t => {
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('description');
      expect(t).toHaveProperty('parameters');
      expect(t).toHaveProperty('execute');
    });
  });
});

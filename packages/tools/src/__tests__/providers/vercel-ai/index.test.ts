import { fmpTools } from '../../../providers/vercel-ai';

const mockClient = {
  quote: { getQuote: jest.fn().mockResolvedValue({ data: {} }) },
  company: { getCompanyProfile: jest.fn().mockResolvedValue({ data: {} }) },
  financial: {
    getBalanceSheet: jest.fn().mockResolvedValue({ data: [] }),
    getIncomeStatement: jest.fn().mockResolvedValue({ data: [] }),
    getCashFlowStatement: jest.fn().mockResolvedValue({ data: [] }),
    getFinancialRatios: jest.fn().mockResolvedValue({ data: [] }),
  },
  calendar: {
    getEarningsCalendar: jest.fn().mockResolvedValue({ data: [] }),
    getEconomicsCalendar: jest.fn().mockResolvedValue({ data: [] }),
  },
  economic: {
    getTreasuryRates: jest.fn().mockResolvedValue({ data: [] }),
    getEconomicIndicators: jest.fn().mockResolvedValue({ data: [] }),
  },
  etf: {
    getHoldings: jest.fn().mockResolvedValue({ data: [] }),
    getProfile: jest.fn().mockResolvedValue({ data: {} }),
  },
  insider: { getInsiderTradesBySymbol: jest.fn().mockResolvedValue({ data: [] }) },
  institutional: { getInstitutionalHolders: jest.fn().mockResolvedValue({ data: [] }) },
  market: {
    getMarketPerformance: jest.fn().mockResolvedValue({ data: [] }),
    getSectorPerformance: jest.fn().mockResolvedValue({ data: [] }),
    getGainers: jest.fn().mockResolvedValue({ data: [] }),
    getLosers: jest.fn().mockResolvedValue({ data: [] }),
    getMostActive: jest.fn().mockResolvedValue({ data: [] }),
  },
  senateHouse: {
    getSenateTrading: jest.fn().mockResolvedValue({ data: [] }),
    getHouseTrading: jest.fn().mockResolvedValue({ data: [] }),
    getSenateTradingByName: jest.fn().mockResolvedValue({ data: [] }),
    getHouseTradingByName: jest.fn().mockResolvedValue({ data: [] }),
    getSenateTradingRSSFeed: jest.fn().mockResolvedValue({ data: [] }),
    getHouseTradingRSSFeed: jest.fn().mockResolvedValue({ data: [] }),
  },
  stock: {
    getMarketCap: jest.fn().mockResolvedValue({ data: [] }),
    getStockSplits: jest.fn().mockResolvedValue({ data: [] }),
    getDividendHistory: jest.fn().mockResolvedValue({ data: [] }),
  },
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => mockClient),
}));

describe('Vercel AI Provider Index (minimal)', () => {
  it('exports an object of tools', () => {
    expect(fmpTools).toBeDefined();
    expect(typeof fmpTools).toBe('object');
  });

  it('includes a few known tool keys', () => {
    const keys = Object.keys(fmpTools);
    const expectedSome = [
      'getStockQuote',
      'getCompanyProfile',
      'getBalanceSheet',
      'getEarningsCalendar',
      'getTreasuryRates',
      'getETFHoldings',
      'getInsiderTrading',
    ];
    expectedSome.forEach(k => expect(keys).toContain(k));
  });

  it('each tool has required structure', () => {
    Object.values(fmpTools).forEach(tool => {
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });
  });

  it('executes all tools with minimal valid args', async () => {
    const minimalArgs: Record<string, any> = {
      getStockQuote: { symbol: 'AAPL' },
      getCompanyProfile: { symbol: 'AAPL' },
      getBalanceSheet: { symbol: 'AAPL', period: 'annual' },
      getIncomeStatement: { symbol: 'AAPL', period: 'annual' },
      getCashFlowStatement: { symbol: 'AAPL', period: 'annual' },
      getFinancialRatios: { symbol: 'AAPL', period: 'annual' },
      getEarningsCalendar: { from: '2024-01-01', to: '2024-01-31' },
      getEconomicCalendar: { from: '2024-01-01', to: '2024-01-31' },
      getTreasuryRates: { from: '2024-01-01', to: '2024-01-31' },
      getEconomicIndicators: { name: 'GDP', from: '2024-01-01', to: '2024-01-31' },
      getETFHoldings: { symbol: 'SPY', date: '2024-01-15' },
      getETFProfile: { symbol: 'SPY' },
      getInsiderTrading: { symbol: 'AAPL', page: 0 },
      getInstitutionalHolders: { symbol: 'AAPL' },
      getMarketPerformance: {},
      getSectorPerformance: {},
      getGainers: {},
      getLosers: {},
      getMostActive: {},
      getSenateTrading: { symbol: 'AAPL' },
      getHouseTrading: { symbol: 'AAPL' },
      getSenateTradingByName: { name: 'John Doe' },
      getHouseTradingByName: { name: 'Jane Roe' },
      getSenateTradingRSSFeed: { page: 0 },
      getHouseTradingRSSFeed: { page: 0 },
      getMarketCap: { symbol: 'AAPL' },
      getStockSplits: { symbol: 'AAPL' },
      getDividendHistory: { symbol: 'AAPL' },
    };

    for (const [name, tool] of Object.entries(fmpTools)) {
      const args = minimalArgs[name] ?? {};
      const result = await (tool.execute as any)(args);
      expect(result).toBeDefined();
    }
  });
});

import {
  fmpTools,
  quoteTools,
  companyTools,
  financialTools,
  calendarTools,
  economicTools,
  etfTools,
  insiderTools,
  institutionalTools,
  marketTools,
  senateHouseTools,
  stockTools,
} from '../../../providers/vercel-ai';

// Mock the FMP client
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    quote: { getQuote: jest.fn() },
    company: { getCompanyProfile: jest.fn() },
    financial: {
      getBalanceSheet: jest.fn(),
      getIncomeStatement: jest.fn(),
      getCashFlowStatement: jest.fn(),
      getFinancialRatios: jest.fn(),
    },
    calendar: { getEarningsCalendar: jest.fn(), getEconomicsCalendar: jest.fn() },
    economic: { getTreasuryRates: jest.fn(), getEconomicIndicators: jest.fn() },
    etf: { getHoldings: jest.fn(), getProfile: jest.fn() },
    insider: { getInsiderTradesBySymbol: jest.fn() },
    institutional: { getInstitutionalHolders: jest.fn() },
    market: {
      getMarketPerformance: jest.fn(),
      getSectorPerformance: jest.fn(),
      getGainers: jest.fn(),
      getLosers: jest.fn(),
      getMostActive: jest.fn(),
    },
    senateHouse: {
      getSenateTrading: jest.fn(),
      getHouseTrading: jest.fn(),
      getSenateTradingByName: jest.fn(),
      getHouseTradingByName: jest.fn(),
      getSenateTradingRSSFeed: jest.fn(),
      getHouseTradingRSSFeed: jest.fn(),
    },
    stock: {
      getMarketCap: jest.fn(),
      getStockSplits: jest.fn(),
      getDividendHistory: jest.fn(),
    },
  })),
}));

describe('Vercel AI Provider Index', () => {
  describe('fmpTools', () => {
    it('should be defined and be an object', () => {
      expect(fmpTools).toBeDefined();
      expect(typeof fmpTools).toBe('object');
    });

    it('should contain all tool categories', () => {
      // Check that all tool categories are included
      expect(Object.keys(fmpTools)).toContain('getStockQuote');
      expect(Object.keys(fmpTools)).toContain('getCompanyProfile');
      expect(Object.keys(fmpTools)).toContain('getBalanceSheet');
      expect(Object.keys(fmpTools)).toContain('getIncomeStatement');
      expect(Object.keys(fmpTools)).toContain('getCashFlowStatement');
      expect(Object.keys(fmpTools)).toContain('getFinancialRatios');
      expect(Object.keys(fmpTools)).toContain('getEarningsCalendar');
      expect(Object.keys(fmpTools)).toContain('getEconomicCalendar');
      expect(Object.keys(fmpTools)).toContain('getTreasuryRates');
      expect(Object.keys(fmpTools)).toContain('getEconomicIndicators');
      expect(Object.keys(fmpTools)).toContain('getETFHoldings');
      expect(Object.keys(fmpTools)).toContain('getETFProfile');
      expect(Object.keys(fmpTools)).toContain('getInsiderTrading');
      expect(Object.keys(fmpTools)).toContain('getInstitutionalHolders');
      expect(Object.keys(fmpTools)).toContain('getMarketPerformance');
      expect(Object.keys(fmpTools)).toContain('getSectorPerformance');
      expect(Object.keys(fmpTools)).toContain('getGainers');
      expect(Object.keys(fmpTools)).toContain('getLosers');
      expect(Object.keys(fmpTools)).toContain('getMostActive');
      expect(Object.keys(fmpTools)).toContain('getSenateTrading');
      expect(Object.keys(fmpTools)).toContain('getHouseTrading');
      expect(Object.keys(fmpTools)).toContain('getSenateTradingByName');
      expect(Object.keys(fmpTools)).toContain('getHouseTradingByName');
      expect(Object.keys(fmpTools)).toContain('getSenateTradingRSSFeed');
      expect(Object.keys(fmpTools)).toContain('getHouseTradingRSSFeed');
      expect(Object.keys(fmpTools)).toContain('getMarketCap');
      expect(Object.keys(fmpTools)).toContain('getStockSplits');
      expect(Object.keys(fmpTools)).toContain('getDividendHistory');
    });

    it('should have correct total number of tools', () => {
      const totalTools =
        Object.keys(quoteTools).length +
        Object.keys(companyTools).length +
        Object.keys(financialTools).length +
        Object.keys(calendarTools).length +
        Object.keys(economicTools).length +
        Object.keys(etfTools).length +
        Object.keys(insiderTools).length +
        Object.keys(institutionalTools).length +
        Object.keys(marketTools).length +
        Object.keys(senateHouseTools).length +
        Object.keys(stockTools).length;
      expect(Object.keys(fmpTools)).toHaveLength(totalTools);
    });

    it('should have correct Tool structure for all tools', () => {
      Object.values(fmpTools).forEach(tool => {
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('inputSchema');
        expect(tool).toHaveProperty('execute');
        expect(typeof tool.execute).toBe('function');
      });
    });
  });

  describe('Individual Tool Category Exports', () => {
    it('should export quoteTools', () => {
      expect(quoteTools).toBeDefined();
      expect(typeof quoteTools).toBe('object');
      expect(Object.keys(quoteTools)).toContain('getStockQuote');
    });

    it('should export companyTools', () => {
      expect(companyTools).toBeDefined();
      expect(typeof companyTools).toBe('object');
      expect(Object.keys(companyTools)).toContain('getCompanyProfile');
    });

    it('should export financialTools', () => {
      expect(financialTools).toBeDefined();
      expect(typeof financialTools).toBe('object');
      expect(Object.keys(financialTools)).toContain('getBalanceSheet');
      expect(Object.keys(financialTools)).toContain('getIncomeStatement');
      expect(Object.keys(financialTools)).toContain('getCashFlowStatement');
      expect(Object.keys(financialTools)).toContain('getFinancialRatios');
    });

    it('should export calendarTools', () => {
      expect(calendarTools).toBeDefined();
      expect(typeof calendarTools).toBe('object');
      expect(Object.keys(calendarTools)).toContain('getEarningsCalendar');
      expect(Object.keys(calendarTools)).toContain('getEconomicCalendar');
    });

    it('should export economicTools', () => {
      expect(economicTools).toBeDefined();
      expect(typeof economicTools).toBe('object');
      expect(Object.keys(economicTools)).toContain('getTreasuryRates');
      expect(Object.keys(economicTools)).toContain('getEconomicIndicators');
    });

    it('should export etfTools', () => {
      expect(etfTools).toBeDefined();
      expect(typeof etfTools).toBe('object');
      expect(Object.keys(etfTools)).toContain('getETFHoldings');
      expect(Object.keys(etfTools)).toContain('getETFProfile');
    });

    it('should export insiderTools', () => {
      expect(insiderTools).toBeDefined();
      expect(typeof insiderTools).toBe('object');
      expect(Object.keys(insiderTools)).toContain('getInsiderTrading');
    });

    it('should export institutionalTools', () => {
      expect(institutionalTools).toBeDefined();
      expect(typeof institutionalTools).toBe('object');
      expect(Object.keys(institutionalTools)).toContain('getInstitutionalHolders');
    });

    it('should export marketTools', () => {
      expect(marketTools).toBeDefined();
      expect(typeof marketTools).toBe('object');
      expect(Object.keys(marketTools)).toContain('getMarketPerformance');
      expect(Object.keys(marketTools)).toContain('getSectorPerformance');
      expect(Object.keys(marketTools)).toContain('getGainers');
      expect(Object.keys(marketTools)).toContain('getLosers');
      expect(Object.keys(marketTools)).toContain('getMostActive');
    });

    it('should export senateHouseTools', () => {
      expect(senateHouseTools).toBeDefined();
      expect(typeof senateHouseTools).toBe('object');
      expect(Object.keys(senateHouseTools)).toContain('getSenateTrading');
      expect(Object.keys(senateHouseTools)).toContain('getHouseTrading');
      expect(Object.keys(senateHouseTools)).toContain('getSenateTradingByName');
      expect(Object.keys(senateHouseTools)).toContain('getHouseTradingByName');
      expect(Object.keys(senateHouseTools)).toContain('getSenateTradingRSSFeed');
      expect(Object.keys(senateHouseTools)).toContain('getHouseTradingRSSFeed');
    });

    it('should export stockTools', () => {
      expect(stockTools).toBeDefined();
      expect(typeof stockTools).toBe('object');
      expect(Object.keys(stockTools)).toContain('getMarketCap');
      expect(Object.keys(stockTools)).toContain('getStockSplits');
      expect(Object.keys(stockTools)).toContain('getDividendHistory');
    });
  });

  describe('Tool Integration', () => {
    it('should have unique tool names across all categories', () => {
      const allToolNames = Object.keys(fmpTools);
      const uniqueToolNames = new Set(allToolNames);

      // All tool names should be unique
      expect(allToolNames.length).toBe(uniqueToolNames.size);
    });

    it('should have consistent tool structure across all categories', () => {
      Object.values(fmpTools).forEach(tool => {
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('inputSchema');
        expect(tool).toHaveProperty('execute');
        expect(typeof tool.execute).toBe('function');
      });
    });

    it('should have proper zod schemas for all tools', () => {
      Object.values(fmpTools).forEach(tool => {
        expect(tool.inputSchema).toBeDefined();
        expect(typeof tool.inputSchema).toBe('object');
        // Check that it's a zod schema
        const schema = tool.inputSchema as any;
        expect(schema['~standard']).toBeDefined();
        expect(schema['~standard'].vendor).toBe('zod');
      });
    });

    it('should have meaningful descriptions for all tools', () => {
      Object.values(fmpTools).forEach(tool => {
        expect(tool.description).toBeDefined();
        expect(typeof tool.description).toBe('string');
        expect(tool.description?.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Tool Execution', () => {
    it('should have executable functions for all tools', () => {
      Object.values(fmpTools).forEach(tool => {
        expect(typeof tool.execute).toBe('function');
        const executeFn = tool.execute as any;
        // Some tools have no parameters (like market tools), so length can be 0
        expect(executeFn.length).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

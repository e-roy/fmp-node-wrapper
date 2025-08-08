import { marketTools } from '@/providers/vercel-ai/market';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    market: {
      getMarketPerformance: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: '^DJI',
            name: 'Dow Jones Industrial Average',
            change: 150.25,
            changePercent: 0.45,
            price: 33500.5,
            dayLow: 33350.25,
            dayHigh: 33600.75,
            yearLow: 28660.94,
            yearHigh: 37895.02,
            marketCap: null,
            priceAvg50: 34000.25,
            priceAvg200: 32500.5,
            volume: 350000000,
            avgVolume: 400000000,
            exchange: 'INDEX',
            open: 33450.0,
            previousClose: 33350.25,
            eps: null,
            pe: null,
            earningsAnnouncement: null,
            sharesOutstanding: null,
            timestamp: 1705123200,
          },
        ],
      }),
      getSectorPerformance: jest.fn().mockResolvedValue({
        data: [
          {
            sector: 'Technology',
            changesPercentage: 2.5,
            changes: 150.25,
          },
          {
            sector: 'Healthcare',
            changesPercentage: -1.2,
            changes: -45.75,
          },
          {
            sector: 'Financial Services',
            changesPercentage: 0.8,
            changes: 25.5,
          },
        ],
      }),
      getGainers: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            change: 5.25,
            changePercent: 2.8,
            price: 192.5,
            dayLow: 187.25,
            dayHigh: 193.75,
            yearLow: 124.17,
            yearHigh: 198.23,
            marketCap: 3000000000000,
            priceAvg50: 185.5,
            priceAvg200: 175.25,
            volume: 50000000,
            avgVolume: 55000000,
            exchange: 'NASDAQ',
            open: 188.0,
            previousClose: 187.25,
            eps: 6.16,
            pe: 31.25,
            earningsAnnouncement: '2024-01-25T21:00:00.000+0000',
            sharesOutstanding: 15500000000,
            timestamp: 1705123200,
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            change: 4.75,
            changePercent: 1.9,
            price: 255.25,
            dayLow: 250.5,
            dayHigh: 256.0,
            yearLow: 213.43,
            yearHigh: 384.3,
            marketCap: 2800000000000,
            priceAvg50: 245.75,
            priceAvg200: 235.5,
            volume: 35000000,
            avgVolume: 40000000,
            exchange: 'NASDAQ',
            open: 251.0,
            previousClose: 250.5,
            eps: 10.33,
            pe: 24.71,
            earningsAnnouncement: '2024-01-23T21:00:00.000+0000',
            sharesOutstanding: 11000000000,
            timestamp: 1705123200,
          },
        ],
      }),
      getLosers: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'TSLA',
            name: 'Tesla, Inc.',
            change: -8.5,
            changePercent: -3.2,
            price: 257.75,
            dayLow: 255.0,
            dayHigh: 268.25,
            yearLow: 138.8,
            yearHigh: 299.29,
            marketCap: 800000000000,
            priceAvg50: 265.25,
            priceAvg200: 245.75,
            volume: 80000000,
            avgVolume: 85000000,
            exchange: 'NASDAQ',
            open: 266.25,
            previousClose: 266.25,
            eps: 3.12,
            pe: 82.61,
            earningsAnnouncement: '2024-01-24T21:00:00.000+0000',
            sharesOutstanding: 3100000000,
            timestamp: 1705123200,
          },
        ],
      }),
      getMostActive: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'SPY',
            name: 'SPDR S&P 500 ETF Trust',
            change: 1.25,
            changePercent: 0.3,
            price: 415.75,
            dayLow: 414.5,
            dayHigh: 416.25,
            yearLow: 374.77,
            yearHigh: 476.09,
            marketCap: 380000000000,
            priceAvg50: 410.25,
            priceAvg200: 395.5,
            volume: 150000000,
            avgVolume: 120000000,
            exchange: 'NYSE Arca',
            open: 414.75,
            previousClose: 414.5,
            eps: null,
            pe: null,
            earningsAnnouncement: null,
            sharesOutstanding: 915000000,
            timestamp: 1705123200,
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Market Tools', () => {
  describe('getMarketPerformance', () => {
    it('should be defined', () => {
      expect(marketTools.getMarketPerformance).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = marketTools.getMarketPerformance;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(marketTools.getMarketPerformance.description).toBe(
        'Get overall market performance data',
      );
    });

    it('should have correct input schema', () => {
      const tool = marketTools.getMarketPerformance;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getMarketPerformance tool', async () => {
      const tool = marketTools.getMarketPerformance;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', '^DJI');
      expect(parsedResult[0]).toHaveProperty('name', 'Dow Jones Industrial Average');
      expect(parsedResult[0]).toHaveProperty('change', 150.25);
      expect(parsedResult[0]).toHaveProperty('changePercent', 0.45);
    });
  });

  describe('getSectorPerformance', () => {
    it('should be defined', () => {
      expect(marketTools.getSectorPerformance).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = marketTools.getSectorPerformance;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(marketTools.getSectorPerformance.description).toBe('Get sector performance data');
    });

    it('should have correct input schema', () => {
      const tool = marketTools.getSectorPerformance;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getSectorPerformance tool', async () => {
      const tool = marketTools.getSectorPerformance;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('sector', 'Technology');
      expect(parsedResult[0]).toHaveProperty('changesPercentage', 2.5);
      expect(parsedResult[0]).toHaveProperty('changes', 150.25);
    });
  });

  describe('getGainers', () => {
    it('should be defined', () => {
      expect(marketTools.getGainers).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = marketTools.getGainers;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(marketTools.getGainers.description).toBe('Get top gaining stocks');
    });

    it('should have correct input schema', () => {
      const tool = marketTools.getGainers;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getGainers tool', async () => {
      const tool = marketTools.getGainers;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('name', 'Apple Inc.');
      expect(parsedResult[0]).toHaveProperty('change', 5.25);
      expect(parsedResult[0]).toHaveProperty('changePercent', 2.8);
    });
  });

  describe('getLosers', () => {
    it('should be defined', () => {
      expect(marketTools.getLosers).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = marketTools.getLosers;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(marketTools.getLosers.description).toBe('Get top losing stocks');
    });

    it('should have correct input schema', () => {
      const tool = marketTools.getLosers;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getLosers tool', async () => {
      const tool = marketTools.getLosers;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'TSLA');
      expect(parsedResult[0]).toHaveProperty('name', 'Tesla, Inc.');
      expect(parsedResult[0]).toHaveProperty('change', -8.5);
      expect(parsedResult[0]).toHaveProperty('changePercent', -3.2);
    });
  });

  describe('getMostActive', () => {
    it('should be defined', () => {
      expect(marketTools.getMostActive).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = marketTools.getMostActive;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(marketTools.getMostActive.description).toBe('Get most active stocks');
    });

    it('should have correct input schema', () => {
      const tool = marketTools.getMostActive;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getMostActive tool', async () => {
      const tool = marketTools.getMostActive;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'SPY');
      expect(parsedResult[0]).toHaveProperty('name', 'SPDR S&P 500 ETF Trust');
      expect(parsedResult[0]).toHaveProperty('change', 1.25);
      expect(parsedResult[0]).toHaveProperty('changePercent', 0.3);
    });
  });
});

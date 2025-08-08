import { stockTools } from '@/providers/vercel-ai/stock';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    stock: {
      getMarketCap: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            marketCap: 3000000000000,
            date: '2024-01-15',
            price: 192.5,
            volume: 50000000,
            avgVolume: 55000000,
            open: 188.0,
            previousClose: 187.25,
            change: 5.25,
            changePercent: 2.8,
            dayLow: 187.25,
            dayHigh: 193.75,
            yearLow: 124.17,
            yearHigh: 198.23,
            marketCapAvg50: 2950000000000,
            marketCapAvg200: 2850000000000,
            exchange: 'NASDAQ',
            timestamp: 1705123200,
          },
        ],
      }),
      getStockSplits: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            date: '2020-08-31',
            label: '4:1 Split',
            numerator: 4,
            denominator: 1,
            ratio: '4:1',
            priceBeforeSplit: 499.23,
            priceAfterSplit: 124.81,
            adjustedPrice: 124.81,
            splitFactor: 4,
          },
          {
            symbol: 'AAPL',
            date: '2014-06-09',
            label: '7:1 Split',
            numerator: 7,
            denominator: 1,
            ratio: '7:1',
            priceBeforeSplit: 645.57,
            priceAfterSplit: 92.22,
            adjustedPrice: 92.22,
            splitFactor: 7,
          },
        ],
      }),
      getDividendHistory: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            date: '2024-01-15',
            label: 'Dividend',
            adjDividend: 0.24,
            dividend: 0.24,
            recordDate: '2024-01-08',
            paymentDate: '2024-01-15',
            declarationDate: '2024-01-02',
            ratio: null,
          },
          {
            symbol: 'AAPL',
            date: '2023-11-16',
            label: 'Dividend',
            adjDividend: 0.24,
            dividend: 0.24,
            recordDate: '2023-11-08',
            paymentDate: '2023-11-16',
            declarationDate: '2023-11-02',
            ratio: null,
          },
          {
            symbol: 'AAPL',
            date: '2023-08-17',
            label: 'Dividend',
            adjDividend: 0.24,
            dividend: 0.24,
            recordDate: '2023-08-08',
            paymentDate: '2023-08-17',
            declarationDate: '2023-08-02',
            ratio: null,
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Stock Tools', () => {
  describe('getMarketCap', () => {
    it('should be defined', () => {
      expect(stockTools.getMarketCap).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = stockTools.getMarketCap;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(stockTools.getMarketCap.description).toBe('Get market capitalization for a company');
    });

    it('should have correct input schema', () => {
      const tool = stockTools.getMarketCap;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getMarketCap tool', async () => {
      const tool = stockTools.getMarketCap;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('marketCap', 3000000000000);
      expect(parsedResult[0]).toHaveProperty('price', 192.5);
      expect(parsedResult[0]).toHaveProperty('change', 5.25);
      expect(parsedResult[0]).toHaveProperty('changePercent', 2.8);
    });

    it('should include market cap averages', async () => {
      const tool = stockTools.getMarketCap;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('marketCapAvg50', 2950000000000);
      expect(parsedResult[0]).toHaveProperty('marketCapAvg200', 2850000000000);
    });
  });

  describe('getStockSplits', () => {
    it('should be defined', () => {
      expect(stockTools.getStockSplits).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = stockTools.getStockSplits;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(stockTools.getStockSplits.description).toBe('Get stock splits history for a company');
    });

    it('should have correct input schema', () => {
      const tool = stockTools.getStockSplits;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getStockSplits tool', async () => {
      const tool = stockTools.getStockSplits;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('date', '2020-08-31');
      expect(parsedResult[0]).toHaveProperty('label', '4:1 Split');
      expect(parsedResult[0]).toHaveProperty('ratio', '4:1');
      expect(parsedResult[0]).toHaveProperty('splitFactor', 4);
    });

    it('should include price information for splits', async () => {
      const tool = stockTools.getStockSplits;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('priceBeforeSplit', 499.23);
      expect(parsedResult[0]).toHaveProperty('priceAfterSplit', 124.81);
      expect(parsedResult[0]).toHaveProperty('adjustedPrice', 124.81);
    });

    it('should handle multiple splits', async () => {
      const tool = stockTools.getStockSplits;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult).toHaveLength(2);
      expect(parsedResult[1]).toHaveProperty('date', '2014-06-09');
      expect(parsedResult[1]).toHaveProperty('label', '7:1 Split');
      expect(parsedResult[1]).toHaveProperty('splitFactor', 7);
    });
  });

  describe('getDividendHistory', () => {
    it('should be defined', () => {
      expect(stockTools.getDividendHistory).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = stockTools.getDividendHistory;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(stockTools.getDividendHistory.description).toBe('Get dividend history for a company');
    });

    it('should have correct input schema', () => {
      const tool = stockTools.getDividendHistory;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getDividendHistory tool', async () => {
      const tool = stockTools.getDividendHistory;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('date', '2024-01-15');
      expect(parsedResult[0]).toHaveProperty('label', 'Dividend');
      expect(parsedResult[0]).toHaveProperty('dividend', 0.24);
      expect(parsedResult[0]).toHaveProperty('adjDividend', 0.24);
    });

    it('should include dividend dates', async () => {
      const tool = stockTools.getDividendHistory;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('recordDate', '2024-01-08');
      expect(parsedResult[0]).toHaveProperty('paymentDate', '2024-01-15');
      expect(parsedResult[0]).toHaveProperty('declarationDate', '2024-01-02');
    });

    it('should handle multiple dividend payments', async () => {
      const tool = stockTools.getDividendHistory;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult).toHaveLength(3);
      expect(parsedResult[1]).toHaveProperty('date', '2023-11-16');
      expect(parsedResult[1]).toHaveProperty('dividend', 0.24);
      expect(parsedResult[2]).toHaveProperty('date', '2023-08-17');
      expect(parsedResult[2]).toHaveProperty('dividend', 0.24);
    });
  });
});

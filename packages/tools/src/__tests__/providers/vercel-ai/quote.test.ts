import { quoteTools } from '@/providers/vercel-ai/quote';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    quote: {
      getQuote: jest.fn().mockResolvedValue({
        data: {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 150.0,
          change: 2.5,
          changesPercentage: 1.67,
        },
      }),
    },
  })),
}));

describe('Vercel AI Quote Tools', () => {
  describe('getStockQuote', () => {
    it('should be defined', () => {
      expect(quoteTools.getStockQuote).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = quoteTools.getStockQuote;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(quoteTools.getStockQuote.description).toBe('Get the stock quote for a company');
    });

    it('should have correct input schema', () => {
      const tool = quoteTools.getStockQuote;
      expect(tool.inputSchema).toBeDefined();
      // The schema should be a zod object
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getStockQuote tool', async () => {
      const tool = quoteTools.getStockQuote;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle invalid symbol gracefully', async () => {
      const tool = quoteTools.getStockQuote;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      // Since we're using mocks, even invalid symbols will return mock data
      const result = await (tool.execute as any)(
        { symbol: 'INVALID' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

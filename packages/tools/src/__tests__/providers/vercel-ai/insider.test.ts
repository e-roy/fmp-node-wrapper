import { insiderTools } from '@/providers/vercel-ai/insider';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    insider: {
      getInsiderTradesBySymbol: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            filingDate: '2024-01-15',
            transactionDate: '2024-01-10',
            reportingCik: '0000320193',
            transactionType: 'P-Purchase',
            securitiesOwned: 1000000,
            companyCik: '0000320193',
            reportingName: 'Tim Cook',
            typeOfOwner: 'direct',
            acquistionOrDisposition: 'A',
            formType: '4',
            securitiesTransacted: 5000,
            price: 150.25,
            securityName: 'Common Stock',
            link: 'https://www.sec.gov/Archives/edgar/data/320193/000032019324000001/0000320193-24-000001-index.htm',
          },
          {
            symbol: 'AAPL',
            filingDate: '2024-01-14',
            transactionDate: '2024-01-09',
            reportingCik: '0000320193',
            transactionType: 'S-Sale',
            securitiesOwned: 995000,
            companyCik: '0000320193',
            reportingName: 'Tim Cook',
            typeOfOwner: 'direct',
            acquistionOrDisposition: 'D',
            formType: '4',
            securitiesTransacted: 5000,
            price: 149.75,
            securityName: 'Common Stock',
            link: 'https://www.sec.gov/Archives/edgar/data/320193/000032019324000002/0000320193-24-000002-index.htm',
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Insider Tools', () => {
  describe('getInsiderTrading', () => {
    it('should be defined', () => {
      expect(insiderTools.getInsiderTrading).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = insiderTools.getInsiderTrading;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(insiderTools.getInsiderTrading.description).toBe(
        'Get insider trading data for a specific stock symbol',
      );
    });

    it('should have correct input schema', () => {
      const tool = insiderTools.getInsiderTrading;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getInsiderTrading tool', async () => {
      const tool = insiderTools.getInsiderTrading;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', page: 0 },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('reportingName', 'Tim Cook');
      expect(parsedResult[0]).toHaveProperty('transactionType', 'P-Purchase');
      expect(parsedResult[0]).toHaveProperty('price', 150.25);
    });

    it('should execute with default page parameter', async () => {
      const tool = insiderTools.getInsiderTrading;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should execute with custom page parameter', async () => {
      const tool = insiderTools.getInsiderTrading;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL', page: 1 },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

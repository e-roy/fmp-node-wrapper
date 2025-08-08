import { etfTools } from '@/providers/vercel-ai/etf';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    etf: {
      getHoldings: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            shares: 1000000,
            weight: 5.2,
            marketValue: 150000000,
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            shares: 800000,
            weight: 4.1,
            marketValue: 120000000,
          },
        ],
      }),
      getProfile: jest.fn().mockResolvedValue({
        data: {
          symbol: 'SPY',
          name: 'SPDR S&P 500 ETF Trust',
          assetClass: 'Equity',
          assetClassSize: 'Large Cap',
          assetClassStyle: 'Blend',
          expenseRatio: 0.0945,
          isin: 'US78462F1030',
          cusip: '78462F103',
          exchange: 'NYSE Arca',
          exchangeCode: 'PCX',
          isActive: true,
          etfCompany: 'State Street Global Advisors',
          domicile: 'US',
          inceptionDate: '1993-01-29',
          website: 'https://www.ssga.com/us/en/individual/etfs/funds/spdr-sp-500-etf-trust-spy',
          description:
            'The SPDR S&P 500 ETF Trust tracks the S&P 500 Index, which comprises 500 large-cap U.S. stocks.',
        },
      }),
    },
  })),
}));

describe('Vercel AI ETF Tools', () => {
  describe('getETFHoldings', () => {
    it('should be defined', () => {
      expect(etfTools.getETFHoldings).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = etfTools.getETFHoldings;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(etfTools.getETFHoldings.description).toBe(
        'Get ETF holdings for a specific ETF symbol',
      );
    });

    it('should have correct input schema', () => {
      const tool = etfTools.getETFHoldings;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getETFHoldings tool', async () => {
      const tool = etfTools.getETFHoldings;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'SPY', date: '2024-01-15' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('name', 'Apple Inc.');
      expect(parsedResult[0]).toHaveProperty('shares', 1000000);
    });

    it('should execute without date parameter', async () => {
      const tool = etfTools.getETFHoldings;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'SPY' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getETFProfile', () => {
    it('should be defined', () => {
      expect(etfTools.getETFProfile).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = etfTools.getETFProfile;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(etfTools.getETFProfile.description).toBe('Get ETF profile information');
    });

    it('should have correct input schema', () => {
      const tool = etfTools.getETFProfile;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getETFProfile tool', async () => {
      const tool = etfTools.getETFProfile;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'SPY' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(parsedResult).toHaveProperty('symbol', 'SPY');
      expect(parsedResult).toHaveProperty('name', 'SPDR S&P 500 ETF Trust');
      expect(parsedResult).toHaveProperty('assetClass', 'Equity');
      expect(parsedResult).toHaveProperty('expenseRatio', 0.0945);
    });
  });
});

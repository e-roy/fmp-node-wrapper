import { economicTools } from '@/providers/vercel-ai/economic';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    economic: {
      getTreasuryRates: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2024-01-15',
            '1M': 5.25,
            '2M': 5.3,
            '3M': 5.35,
            '6M': 5.4,
            '1Y': 5.45,
            '2Y': 5.5,
            '3Y': 5.55,
            '5Y': 5.6,
            '7Y': 5.65,
            '10Y': 5.7,
            '20Y': 5.75,
            '30Y': 5.8,
          },
        ],
      }),
      getEconomicIndicators: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2024-01-15',
            value: 3.2,
            indicator: 'GDP',
            unit: 'Percent',
            frequency: 'Quarterly',
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Economic Tools', () => {
  describe('getTreasuryRates', () => {
    it('should be defined', () => {
      expect(economicTools.getTreasuryRates).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = economicTools.getTreasuryRates;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(economicTools.getTreasuryRates.description).toBe('Get treasury rates');
    });

    it('should have correct input schema', () => {
      const tool = economicTools.getTreasuryRates;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getTreasuryRates tool', async () => {
      const tool = economicTools.getTreasuryRates;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { from: '2024-01-01', to: '2024-01-31' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('date', '2024-01-15');
      expect(parsedResult[0]).toHaveProperty('1M', 5.25);
      expect(parsedResult[0]).toHaveProperty('10Y', 5.7);
    });

    it('should execute without date parameters', async () => {
      const tool = economicTools.getTreasuryRates;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getEconomicIndicators', () => {
    it('should be defined', () => {
      expect(economicTools.getEconomicIndicators).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = economicTools.getEconomicIndicators;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(economicTools.getEconomicIndicators.description).toBe('Get economic indicators');
    });

    it('should have correct input schema', () => {
      const tool = economicTools.getEconomicIndicators;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getEconomicIndicators tool', async () => {
      const tool = economicTools.getEconomicIndicators;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { name: 'GDP', from: '2024-01-01', to: '2024-01-31' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('date', '2024-01-15');
      expect(parsedResult[0]).toHaveProperty('value', 3.2);
      expect(parsedResult[0]).toHaveProperty('indicator', 'GDP');
    });

    it('should execute with only required name parameter', async () => {
      const tool = economicTools.getEconomicIndicators;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { name: 'CPI' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

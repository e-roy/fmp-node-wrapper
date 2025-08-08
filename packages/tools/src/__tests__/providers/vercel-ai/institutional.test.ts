import { institutionalTools } from '@/providers/vercel-ai/institutional';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    institutional: {
      getInstitutionalHolders: jest.fn().mockResolvedValue({
        data: [
          {
            holder: 'Vanguard Group Inc',
            shares: 1000000000,
            dateReported: '2024-01-15',
            change: 5000000,
            weightPercent: 5.2,
            marketValue: 150000000000,
          },
          {
            holder: 'BlackRock Inc',
            shares: 800000000,
            dateReported: '2024-01-15',
            change: -2000000,
            weightPercent: 4.1,
            marketValue: 120000000000,
          },
          {
            holder: 'State Street Corp',
            shares: 600000000,
            dateReported: '2024-01-15',
            change: 1000000,
            weightPercent: 3.1,
            marketValue: 90000000000,
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Institutional Tools', () => {
  describe('getInstitutionalHolders', () => {
    it('should be defined', () => {
      expect(institutionalTools.getInstitutionalHolders).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = institutionalTools.getInstitutionalHolders;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(institutionalTools.getInstitutionalHolders.description).toBe(
        'Get institutional holders for a specific stock symbol',
      );
    });

    it('should have correct input schema', () => {
      const tool = institutionalTools.getInstitutionalHolders;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getInstitutionalHolders tool', async () => {
      const tool = institutionalTools.getInstitutionalHolders;
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
      expect(parsedResult[0]).toHaveProperty('holder', 'Vanguard Group Inc');
      expect(parsedResult[0]).toHaveProperty('shares', 1000000000);
      expect(parsedResult[0]).toHaveProperty('weightPercent', 5.2);
      expect(parsedResult[0]).toHaveProperty('marketValue', 150000000000);
    });

    it('should handle multiple institutional holders', async () => {
      const tool = institutionalTools.getInstitutionalHolders;
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
      expect(parsedResult[1]).toHaveProperty('holder', 'BlackRock Inc');
      expect(parsedResult[2]).toHaveProperty('holder', 'State Street Corp');
    });

    it('should include change and date information', async () => {
      const tool = institutionalTools.getInstitutionalHolders;
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
      expect(parsedResult[0]).toHaveProperty('change', 5000000);
      expect(parsedResult[0]).toHaveProperty('dateReported', '2024-01-15');
      expect(parsedResult[1]).toHaveProperty('change', -2000000);
    });
  });
});

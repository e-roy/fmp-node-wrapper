import { calendarTools } from '@/providers/vercel-ai/calendar';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    calendar: {
      getEarningsCalendar: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2024-01-15',
            symbol: 'AAPL',
            companyName: 'Apple Inc.',
            earningsDate: '2024-01-15',
            time: 'AMC',
            epsEstimate: 2.1,
            reportedEPS: 2.18,
            surprise: 0.08,
            surprisePercentage: 3.81,
          },
        ],
      }),
      getEconomicsCalendar: jest.fn().mockResolvedValue({
        data: [
          {
            date: '2024-01-15',
            event: 'CPI m/m',
            country: 'US',
            currency: 'USD',
            impact: 'High',
            actual: '0.3%',
            forecast: '0.2%',
            previous: '0.1%',
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Calendar Tools', () => {
  describe('getEarningsCalendar', () => {
    it('should be defined', () => {
      expect(calendarTools.getEarningsCalendar).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = calendarTools.getEarningsCalendar;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(calendarTools.getEarningsCalendar.description).toBe('Get earnings calendar');
    });

    it('should have correct input schema', () => {
      const tool = calendarTools.getEarningsCalendar;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getEarningsCalendar tool', async () => {
      const tool = calendarTools.getEarningsCalendar;
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
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('companyName', 'Apple Inc.');
    });

    it('should execute without date parameters', async () => {
      const tool = calendarTools.getEarningsCalendar;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getEconomicCalendar', () => {
    it('should be defined', () => {
      expect(calendarTools.getEconomicCalendar).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = calendarTools.getEconomicCalendar;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(calendarTools.getEconomicCalendar.description).toBe('Get economic calendar');
    });

    it('should have correct input schema', () => {
      const tool = calendarTools.getEconomicCalendar;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getEconomicCalendar tool', async () => {
      const tool = calendarTools.getEconomicCalendar;
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
      expect(parsedResult[0]).toHaveProperty('event', 'CPI m/m');
      expect(parsedResult[0]).toHaveProperty('country', 'US');
    });

    it('should execute without date parameters', async () => {
      const tool = calendarTools.getEconomicCalendar;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

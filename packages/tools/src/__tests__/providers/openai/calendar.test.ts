import { getEarningsCalendar, getEconomicCalendar } from '@/providers/openai/calendar';

const mockCalendar = {
  getEarningsCalendar: jest.fn(),
  getEconomicsCalendar: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    calendar: mockCalendar,
  })),
}));

describe('OpenAI Calendar Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getEarningsCalendar executes and returns data', async () => {
    mockCalendar.getEarningsCalendar.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const params = { from: '2024-01-01', to: '2024-01-31' };

    const result = await (getEarningsCalendar as any).execute(params);

    expect(mockCalendar.getEarningsCalendar).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getEconomicCalendar executes and returns data', async () => {
    mockCalendar.getEconomicsCalendar.mockResolvedValueOnce({ data: [{ event: 'CPI m/m' }] });
    const params = { from: '2024-02-01', to: '2024-02-29' };

    const result = await (getEconomicCalendar as any).execute(params);

    expect(mockCalendar.getEconomicsCalendar).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ event: 'CPI m/m' }]);
  });
});

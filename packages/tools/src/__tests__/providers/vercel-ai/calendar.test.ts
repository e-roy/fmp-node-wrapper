import { calendarTools } from '@/providers/vercel-ai';

const mockCalendar = {
  getEarningsCalendar: jest.fn(),
  getEconomicsCalendar: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    calendar: mockCalendar,
  })),
}));

describe('Vercel AI Calendar Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getEarningsCalendar executes and returns data', async () => {
    mockCalendar.getEarningsCalendar.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const params = { from: '2024-01-01', to: '2024-01-31' };
    const result = await (calendarTools.getEarningsCalendar.execute as any)(params);

    expect(mockCalendar.getEarningsCalendar).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getEconomicCalendar executes and returns data', async () => {
    mockCalendar.getEconomicsCalendar.mockResolvedValueOnce({ data: [{ event: 'CPI m/m' }] });

    const params = { from: '2024-02-01', to: '2024-02-29' };
    const result = await (calendarTools.getEconomicCalendar.execute as any)(params);

    expect(mockCalendar.getEconomicsCalendar).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ event: 'CPI m/m' }]);
  });

  it('getEarningsCalendar filters to the requested symbols', async () => {
    mockCalendar.getEarningsCalendar.mockResolvedValueOnce({
      success: true,
      data: [{ symbol: 'ANY' }, { symbol: 'NVDA' }, { symbol: 'aapl' }, { symbol: 'XPEV' }],
    });

    const result = await (calendarTools.getEarningsCalendar.execute as any)({
      from: '2026-11-16',
      to: '2026-11-22',
      symbols: ['AAPL', 'nvda'],
    });

    expect(JSON.parse(result)).toEqual([{ symbol: 'NVDA' }, { symbol: 'aapl' }]);
  });

  it('getEarningsCalendar cuts ranges past 90 days to the first 90 and says so', async () => {
    mockCalendar.getEarningsCalendar.mockResolvedValueOnce({ success: true, data: [{ symbol: 'NVDA' }] });

    const result = JSON.parse(
      await (calendarTools.getEarningsCalendar.execute as any)({
        from: '2026-10-20',
        to: '2027-02-20',
        symbols: ['NVDA'],
      }),
    );

    expect(mockCalendar.getEarningsCalendar).toHaveBeenCalledWith({ from: '2026-10-20', to: '2027-01-17' });
    expect(result).toMatchObject({ data: [{ symbol: 'NVDA' }], truncated: false, total: 1, returned: 1 });
    expect(result.note).toContain('from=2027-01-18');
  });

  it('getEarningsCalendar turns a lone `from` into an explicit 90-day window', async () => {
    mockCalendar.getEarningsCalendar.mockResolvedValueOnce({ success: true, data: [{ symbol: 'NVDA' }] });

    const result = JSON.parse(
      await (calendarTools.getEarningsCalendar.execute as any)({ from: '2026-11-16', symbols: ['NVDA'] }),
    );

    expect(mockCalendar.getEarningsCalendar).toHaveBeenCalledWith({ from: '2026-11-16', to: '2027-02-13' });
    expect(result.note).toContain('No end date given');
  });

  it('getEarningsCalendar flags truncation instead of silently dropping rows', async () => {
    mockCalendar.getEarningsCalendar.mockResolvedValueOnce({
      success: true,
      data: [{ symbol: 'A' }, { symbol: 'B' }, { symbol: 'C' }],
    });

    const result = JSON.parse(
      await (calendarTools.getEarningsCalendar.execute as any)({ limit: 2 }),
    );

    expect(result.data).toEqual([{ symbol: 'A' }, { symbol: 'B' }]);
    expect(result.truncated).toBe(true);
    expect(result.note).toContain('Showing 2 of 3 rows');
    expect(result.note).toContain('symbols');
  });
});

import { getETFHoldings, getETFProfile } from '@/providers/openai';

const mockETF = {
  getHoldings: jest.fn(),
  getHoldingDates: jest.fn(),
  getProfile: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    etf: mockETF,
  })),
}));

describe('OpenAI ETF Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getETFHoldings defaults to the latest holdings date when none is given', async () => {
    mockETF.getHoldingDates.mockResolvedValueOnce({
      data: [{ date: '2026-03-31' }, { date: '2026-06-30' }],
    });
    mockETF.getHoldings.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (getETFHoldings as any).execute({ symbol: 'SPY' });

    expect(mockETF.getHoldingDates).toHaveBeenCalledWith('SPY');
    expect(mockETF.getHoldings).toHaveBeenCalledWith({ symbol: 'SPY', date: '2026-06-30' });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getETFHoldings includes date when provided', async () => {
    mockETF.getHoldings.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (getETFHoldings as any).execute({ symbol: 'SPY', date: '2024-01-15' });

    expect(mockETF.getHoldings).toHaveBeenCalledWith({ symbol: 'SPY', date: '2024-01-15' });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getETFProfile executes and returns data', async () => {
    mockETF.getProfile.mockResolvedValueOnce({ data: [{ symbol: 'SPY' }] });

    const result = await (getETFProfile as any).execute({ symbol: 'SPY' });

    expect(mockETF.getProfile).toHaveBeenCalledWith('SPY');
    expect(JSON.parse(result)).toEqual([{ symbol: 'SPY' }]);
  });
});

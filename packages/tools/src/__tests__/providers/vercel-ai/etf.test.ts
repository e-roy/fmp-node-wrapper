import { etfTools } from '@/providers/vercel-ai/etf';

const mockETF = {
  getHoldings: jest.fn(),
  getProfile: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    etf: mockETF,
  })),
}));

describe('Vercel AI ETF Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getETFHoldings executes and returns data with date', async () => {
    mockETF.getHoldings.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const params = { symbol: 'SPY', date: '2024-01-15' };
    const result = await (etfTools.getETFHoldings.execute as any)(params);

    expect(mockETF.getHoldings).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getETFProfile executes and returns data', async () => {
    mockETF.getProfile.mockResolvedValueOnce({ data: { symbol: 'SPY' } });

    const result = await (etfTools.getETFProfile.execute as any)({ symbol: 'SPY' });

    expect(mockETF.getProfile).toHaveBeenCalledWith('SPY');
    expect(JSON.parse(result)).toEqual({ symbol: 'SPY' });
  });
});

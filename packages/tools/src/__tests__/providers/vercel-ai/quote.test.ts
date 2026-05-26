import { quoteTools } from '@/providers/vercel-ai';

const mockQuote = {
  getQuote: jest.fn(),
  getHistoricalPrice: jest.fn(),
  getIntraday: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    quote: mockQuote,
  })),
}));

describe('Vercel AI Quote Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getStockQuote executes and returns data', async () => {
    mockQuote.getQuote.mockResolvedValueOnce({ data: { symbol: 'AAPL' } });

    const result = await (quoteTools.getStockQuote.execute as any)({ symbol: 'AAPL' });

    expect(mockQuote.getQuote).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL' });
  });

  it('getHistoricalPrice caps the historical array to the limit', async () => {
    const historical = Array.from({ length: 100 }, (_, i) => ({ date: `d${i}`, close: i }));
    mockQuote.getHistoricalPrice.mockResolvedValueOnce({
      success: true,
      data: { symbol: 'AAPL', historical },
      error: null,
      status: 200,
    });

    const result = await (quoteTools.getHistoricalPrice.execute as any)({ symbol: 'AAPL', limit: 5 });

    expect(mockQuote.getHistoricalPrice).toHaveBeenCalledWith({
      symbol: 'AAPL',
      from: undefined,
      to: undefined,
    });
    expect(JSON.parse(result).historical).toHaveLength(5);
  });

  it('getIntraday caps the array to the limit', async () => {
    const bars = Array.from({ length: 100 }, (_, i) => ({ date: `d${i}`, close: i }));
    mockQuote.getIntraday.mockResolvedValueOnce({
      success: true,
      data: bars,
      error: null,
      status: 200,
    });

    const result = await (quoteTools.getIntraday.execute as any)({
      symbol: 'AAPL',
      interval: '5min',
      limit: 10,
    });

    expect(mockQuote.getIntraday).toHaveBeenCalledWith({
      symbol: 'AAPL',
      interval: '5min',
      from: undefined,
      to: undefined,
    });
    expect(JSON.parse(result)).toHaveLength(10);
  });
});

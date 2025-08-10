import { quoteTools } from '@/providers/vercel-ai/quote';

const mockQuote = {
  getQuote: jest.fn(),
};

jest.mock('@/types', () => ({
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
});

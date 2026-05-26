import { getStockQuote } from '@/providers/openai/quote';

const mockQuote = {
  getQuote: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    quote: mockQuote,
  })),
}));

describe('getStockQuote (minimal coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('executes and returns data (happy path)', async () => {
    mockQuote.getQuote.mockResolvedValueOnce({ data: [{ symbol: 'AAPL', price: 123.45 }] });

    const result = await (getStockQuote as any).execute({ symbol: 'AAPL' });

    expect(mockQuote.getQuote).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL', price: 123.45 }]);
  });

  it('surfaces a plan-restricted error instead of null', async () => {
    mockQuote.getQuote.mockResolvedValueOnce({
      success: false,
      data: null,
      error: 'This endpoint is not available on your current FMP plan. (403: ...)',
      errorType: 'plan-restricted',
      status: 403,
    });

    const result = await (getStockQuote as any).execute({ symbol: 'AAPL' });
    const parsed = JSON.parse(result);

    expect(parsed.error).toBe(true);
    expect(parsed.type).toBe('plan-restricted');
    expect(parsed.status).toBe(403);
  });
});

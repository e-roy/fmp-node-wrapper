import { getStockQuote } from '@/providers/openai/quote';

const mockQuote = {
  getQuote: jest.fn(),
};

jest.mock('@/types', () => ({
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
});

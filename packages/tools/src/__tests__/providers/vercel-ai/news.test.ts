import { newsTools } from '@/providers/vercel-ai';

const mockNews = {
  getStockNews: jest.fn(),
  getStockNewsBySymbol: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    news: mockNews,
  })),
}));

describe('Vercel AI News Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getStockNews passes the default limit and returns data', async () => {
    mockNews.getStockNews.mockResolvedValueOnce({ data: [{ title: 'x' }] });

    const result = await (newsTools.getStockNews.execute as any)({});

    expect(mockNews.getStockNews).toHaveBeenCalledWith({
      from: undefined,
      to: undefined,
      limit: 20,
    });
    expect(JSON.parse(result)).toEqual([{ title: 'x' }]);
  });

  it('getStockNewsBySymbol forwards symbols', async () => {
    mockNews.getStockNewsBySymbol.mockResolvedValueOnce({ data: [{ title: 'y' }] });

    const result = await (newsTools.getStockNewsBySymbol.execute as any)({ symbols: ['AAPL'] });

    expect(mockNews.getStockNewsBySymbol).toHaveBeenCalledWith({
      symbols: ['AAPL'],
      from: undefined,
      to: undefined,
      limit: 20,
    });
    expect(JSON.parse(result)).toEqual([{ title: 'y' }]);
  });
});

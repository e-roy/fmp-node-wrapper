import { screenerTools } from '@/providers/vercel-ai';

const mockScreener = {
  getScreener: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    screener: mockScreener,
  })),
}));

describe('Vercel AI Screener Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('screenStocks drops null/undefined filters and applies the default limit', async () => {
    mockScreener.getScreener.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (screenerTools.screenStocks.execute as any)({
      sector: 'Technology',
      marketCapMoreThan: 1000000000,
      industry: null,
    });

    expect(mockScreener.getScreener).toHaveBeenCalledWith({
      limit: 50,
      sector: 'Technology',
      marketCapMoreThan: 1000000000,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

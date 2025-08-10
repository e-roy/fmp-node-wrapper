import { insiderTools } from '@/providers/vercel-ai/insider';

const mockInsider = {
  getInsiderTradesBySymbol: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    insider: mockInsider,
  })),
}));

describe('Vercel AI Insider Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getInsiderTrading executes and returns data (page=0)', async () => {
    mockInsider.getInsiderTradesBySymbol.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (insiderTools.getInsiderTrading.execute as any)({
      symbol: 'AAPL',
      page: 0,
    });

    expect(mockInsider.getInsiderTradesBySymbol).toHaveBeenCalledWith('AAPL', 0);
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

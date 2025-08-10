import { marketTools } from '@/providers/vercel-ai/market';

const mockMarket = {
  getMarketPerformance: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    market: mockMarket,
  })),
}));

describe('Vercel AI Market Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getMarketPerformance executes and returns data', async () => {
    mockMarket.getMarketPerformance.mockResolvedValueOnce({ data: [{ symbol: '^DJI' }] });

    const result = await (marketTools.getMarketPerformance.execute as any)({});

    expect(mockMarket.getMarketPerformance).toHaveBeenCalled();
    expect(JSON.parse(result)).toEqual([{ symbol: '^DJI' }]);
  });
});

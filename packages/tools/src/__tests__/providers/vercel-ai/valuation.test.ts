import { valuationTools } from '@/providers/vercel-ai';

const mockValuation = {
  getDiscountedCashFlow: jest.fn(),
  getRatingSnapshot: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    valuation: mockValuation,
  })),
}));

describe('Vercel AI Valuation Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getDiscountedCashFlow forwards the symbol', async () => {
    mockValuation.getDiscountedCashFlow.mockResolvedValueOnce({ data: { symbol: 'AAPL', dcf: 200 } });

    const result = await (valuationTools.getDiscountedCashFlow.execute as any)({ symbol: 'AAPL' });

    expect(mockValuation.getDiscountedCashFlow).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL', dcf: 200 });
  });

  it('getCompanyRating calls the rating snapshot', async () => {
    mockValuation.getRatingSnapshot.mockResolvedValueOnce({ data: { symbol: 'AAPL', rating: 'A' } });

    const result = await (valuationTools.getCompanyRating.execute as any)({ symbol: 'AAPL' });

    expect(mockValuation.getRatingSnapshot).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL', rating: 'A' });
  });
});

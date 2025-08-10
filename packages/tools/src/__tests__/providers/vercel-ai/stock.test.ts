import { stockTools } from '@/providers/vercel-ai/stock';

const mockStock = {
  getMarketCap: jest.fn(),
  getStockSplits: jest.fn(),
  getDividendHistory: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    stock: mockStock,
  })),
}));

describe('Vercel AI Stock Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getMarketCap executes and returns data', async () => {
    mockStock.getMarketCap.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (stockTools.getMarketCap.execute as any)({ symbol: 'AAPL' });

    expect(mockStock.getMarketCap).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getStockSplits executes and returns data', async () => {
    mockStock.getStockSplits.mockResolvedValueOnce({ data: [{ date: '2020-08-31' }] });

    const result = await (stockTools.getStockSplits.execute as any)({ symbol: 'AAPL' });

    expect(mockStock.getStockSplits).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ date: '2020-08-31' }]);
  });

  it('getDividendHistory executes and returns data', async () => {
    mockStock.getDividendHistory.mockResolvedValueOnce({ data: [{ date: '2024-01-15' }] });

    const result = await (stockTools.getDividendHistory.execute as any)({ symbol: 'AAPL' });

    expect(mockStock.getDividendHistory).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ date: '2024-01-15' }]);
  });
});

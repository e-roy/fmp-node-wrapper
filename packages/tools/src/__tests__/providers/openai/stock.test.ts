import { getMarketCap, getStockSplits, getDividendHistory } from '@/providers/openai/stock';

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

describe('OpenAI Stock Tools (minimal coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getMarketCap executes and returns data', async () => {
    mockStock.getMarketCap.mockResolvedValueOnce({
      data: [{ symbol: 'AAPL', marketCap: 3000000000000 }],
    });
    const result = await (getMarketCap as any).execute({ symbol: 'AAPL' });
    expect(mockStock.getMarketCap).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL', marketCap: 3000000000000 }]);
  });

  it('getStockSplits executes and returns data', async () => {
    mockStock.getStockSplits.mockResolvedValueOnce({
      data: [{ date: '2020-08-31', ratio: '4:1' }],
    });
    const result = await (getStockSplits as any).execute({ symbol: 'AAPL' });
    expect(mockStock.getStockSplits).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ date: '2020-08-31', ratio: '4:1' }]);
  });

  it('getDividendHistory executes and returns data', async () => {
    mockStock.getDividendHistory.mockResolvedValueOnce({
      data: [{ date: '2024-02-15', dividend: 0.24 }],
    });
    const result = await (getDividendHistory as any).execute({ symbol: 'AAPL' });
    expect(mockStock.getDividendHistory).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ date: '2024-02-15', dividend: 0.24 }]);
  });
});

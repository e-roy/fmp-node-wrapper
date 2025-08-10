import {
  getMarketPerformance,
  getSectorPerformance,
  getGainers,
  getLosers,
  getMostActive,
} from '@/providers/openai/market';

const mockMarket = {
  getMarketPerformance: jest.fn(),
  getSectorPerformance: jest.fn(),
  getGainers: jest.fn(),
  getLosers: jest.fn(),
  getMostActive: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    market: mockMarket,
  })),
}));

describe('OpenAI Market Tools (minimal coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getMarketPerformance executes and returns data', async () => {
    mockMarket.getMarketPerformance.mockResolvedValueOnce({ data: [{ index: 'S&P 500' }] });
    const result = await (getMarketPerformance as any).execute({});
    expect(mockMarket.getMarketPerformance).toHaveBeenCalled();
    expect(JSON.parse(result)).toEqual([{ index: 'S&P 500' }]);
  });

  it('getSectorPerformance executes and returns data', async () => {
    mockMarket.getSectorPerformance.mockResolvedValueOnce({ data: [{ sector: 'Technology' }] });
    const result = await (getSectorPerformance as any).execute({});
    expect(mockMarket.getSectorPerformance).toHaveBeenCalled();
    expect(JSON.parse(result)).toEqual([{ sector: 'Technology' }]);
  });

  it('getGainers executes and returns data', async () => {
    mockMarket.getGainers.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getGainers as any).execute({});
    expect(mockMarket.getGainers).toHaveBeenCalled();
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getLosers executes and returns data', async () => {
    mockMarket.getLosers.mockResolvedValueOnce({ data: [{ symbol: 'TSLA' }] });
    const result = await (getLosers as any).execute({});
    expect(mockMarket.getLosers).toHaveBeenCalled();
    expect(JSON.parse(result)).toEqual([{ symbol: 'TSLA' }]);
  });

  it('getMostActive executes and returns data', async () => {
    mockMarket.getMostActive.mockResolvedValueOnce({ data: [{ symbol: 'NVDA' }] });
    const result = await (getMostActive as any).execute({});
    expect(mockMarket.getMostActive).toHaveBeenCalled();
    expect(JSON.parse(result)).toEqual([{ symbol: 'NVDA' }]);
  });
});

import { senateHouseTools } from '@/providers/vercel-ai/senate-house';

const mockSenateHouse = {
  getSenateTrading: jest.fn(),
  getSenateTradingByName: jest.fn(),
  getSenateTradingRSSFeed: jest.fn(),
  getHouseTradingRSSFeed: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    senateHouse: mockSenateHouse,
  })),
}));

describe('Vercel AI Senate House Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getSenateTrading executes and returns data', async () => {
    mockSenateHouse.getSenateTrading.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (senateHouseTools.getSenateTrading.execute as any)({ symbol: 'AAPL' });

    expect(mockSenateHouse.getSenateTrading).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getSenateTradingByName executes and returns data', async () => {
    mockSenateHouse.getSenateTradingByName.mockResolvedValueOnce({ data: [{ name: 'John' }] });

    const result = await (senateHouseTools.getSenateTradingByName.execute as any)({ name: 'John' });

    expect(mockSenateHouse.getSenateTradingByName).toHaveBeenCalledWith({ name: 'John' });
    expect(JSON.parse(result)).toEqual([{ name: 'John' }]);
  });

  it('getSenateTradingRSSFeed executes and returns data (default page)', async () => {
    mockSenateHouse.getSenateTradingRSSFeed.mockResolvedValueOnce({ data: [{ id: 1 }] });

    const result = await (senateHouseTools.getSenateTradingRSSFeed.execute as any)({});

    expect(mockSenateHouse.getSenateTradingRSSFeed).toHaveBeenCalledWith({ page: 0 });
    expect(JSON.parse(result)).toEqual([{ id: 1 }]);
  });

  it('getHouseTradingRSSFeed executes and returns data (default page)', async () => {
    mockSenateHouse.getHouseTradingRSSFeed.mockResolvedValueOnce({ data: [{ id: 2 }] });

    const result = await (senateHouseTools.getHouseTradingRSSFeed.execute as any)({});

    expect(mockSenateHouse.getHouseTradingRSSFeed).toHaveBeenCalledWith({ page: 0 });
    expect(JSON.parse(result)).toEqual([{ id: 2 }]);
  });
});

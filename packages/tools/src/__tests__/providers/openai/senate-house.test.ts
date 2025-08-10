import {
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
} from '@/providers/openai/senate-house';

const mockSenateHouse = {
  getSenateTrading: jest.fn(),
  getHouseTrading: jest.fn(),
  getSenateTradingByName: jest.fn(),
  getHouseTradingByName: jest.fn(),
  getSenateTradingRSSFeed: jest.fn(),
  getHouseTradingRSSFeed: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    senateHouse: mockSenateHouse,
  })),
}));

describe('OpenAI Senate/House Tools (minimal coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getSenateTrading executes and returns data', async () => {
    mockSenateHouse.getSenateTrading.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getSenateTrading as any).execute({ symbol: 'AAPL' });
    expect(mockSenateHouse.getSenateTrading).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getHouseTrading executes and returns data', async () => {
    mockSenateHouse.getHouseTrading.mockResolvedValueOnce({ data: [{ symbol: 'MSFT' }] });
    const result = await (getHouseTrading as any).execute({ symbol: 'MSFT' });
    expect(mockSenateHouse.getHouseTrading).toHaveBeenCalledWith({ symbol: 'MSFT' });
    expect(JSON.parse(result)).toEqual([{ symbol: 'MSFT' }]);
  });

  it('getSenateTradingByName executes and returns data', async () => {
    mockSenateHouse.getSenateTradingByName.mockResolvedValueOnce({ data: [{ name: 'John Doe' }] });
    const result = await (getSenateTradingByName as any).execute({ name: 'John Doe' });
    expect(mockSenateHouse.getSenateTradingByName).toHaveBeenCalledWith({ name: 'John Doe' });
    expect(JSON.parse(result)).toEqual([{ name: 'John Doe' }]);
  });

  it('getHouseTradingByName executes and returns data', async () => {
    mockSenateHouse.getHouseTradingByName.mockResolvedValueOnce({ data: [{ name: 'Jane Roe' }] });
    const result = await (getHouseTradingByName as any).execute({ name: 'Jane Roe' });
    expect(mockSenateHouse.getHouseTradingByName).toHaveBeenCalledWith({ name: 'Jane Roe' });
    expect(JSON.parse(result)).toEqual([{ name: 'Jane Roe' }]);
  });

  it('getSenateTradingRSSFeed executes and returns data', async () => {
    mockSenateHouse.getSenateTradingRSSFeed.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const result = await (getSenateTradingRSSFeed as any).execute({ page: 0 });
    expect(mockSenateHouse.getSenateTradingRSSFeed).toHaveBeenCalledWith({ page: 0 });
    expect(JSON.parse(result)).toEqual([{ id: 1 }]);
  });

  it('getHouseTradingRSSFeed executes and returns data', async () => {
    mockSenateHouse.getHouseTradingRSSFeed.mockResolvedValueOnce({ data: [{ id: 2 }] });
    const result = await (getHouseTradingRSSFeed as any).execute({ page: 1 });
    expect(mockSenateHouse.getHouseTradingRSSFeed).toHaveBeenCalledWith({ page: 1 });
    expect(JSON.parse(result)).toEqual([{ id: 2 }]);
  });
});

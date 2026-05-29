import { searchTools } from '@/providers/vercel-ai';

const mockSearch = {
  search: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    search: mockSearch,
  })),
}));

describe('Vercel AI Search Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searchSymbol forwards the query with the default limit', async () => {
    mockSearch.search.mockResolvedValueOnce({ data: [{ symbol: 'AAPL', name: 'Apple Inc.' }] });

    const result = await (searchTools.searchSymbol.execute as any)({ query: 'Apple' });

    expect(mockSearch.search).toHaveBeenCalledWith({
      query: 'Apple',
      limit: 10,
      exchange: undefined,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL', name: 'Apple Inc.' }]);
  });
});

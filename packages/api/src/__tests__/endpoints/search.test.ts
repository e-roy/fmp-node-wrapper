import { SearchEndpoints } from '../../endpoints/search';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('SearchEndpoints', () => {
  let searchEndpoints: SearchEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    searchEndpoints = new SearchEndpoints(mockClient);
  });

  describe('search', () => {
    it('should search using the /search endpoint (v3) with query params', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            currency: 'USD',
            stockExchange: 'NASDAQ Global Select',
            exchangeShortName: 'NASDAQ',
          },
        ],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await searchEndpoints.search({ query: 'Apple', limit: 5, exchange: 'NASDAQ' });

      expect(mockClient.get).toHaveBeenCalledWith('/search', 'v3', {
        query: 'Apple',
        limit: 5,
        exchange: 'NASDAQ',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should pass undefined for optional params when omitted', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      await searchEndpoints.search({ query: 'TSLA' });

      expect(mockClient.get).toHaveBeenCalledWith('/search', 'v3', {
        query: 'TSLA',
        limit: undefined,
        exchange: undefined,
      });
    });
  });
});

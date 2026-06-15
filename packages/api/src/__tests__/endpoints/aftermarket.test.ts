import { AftermarketEndpoints } from '../../endpoints/aftermarket';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('AftermarketEndpoints', () => {
  let aftermarketEndpoints: AftermarketEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    aftermarketEndpoints = new AftermarketEndpoints(mockClient);
  });

  describe('getTrade', () => {
    it('should get aftermarket trade using /aftermarket-trade stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', price: 296.28, tradeSize: 1, timestamp: 1781268145000 },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await aftermarketEndpoints.getTrade('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/aftermarket-trade', 'stable', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getQuote', () => {
    it('should get aftermarket quote using /aftermarket-quote stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: {
          symbol: 'AAPL',
          bidSize: 9,
          bidPrice: 296.24,
          askSize: 202,
          askPrice: 296.29,
          volume: 220963.66,
          timestamp: 1781268138000,
        },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await aftermarketEndpoints.getQuote('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/aftermarket-quote', 'stable', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

import { MarketEndpoints } from '../../endpoints/market';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('MarketEndpoints', () => {
  let marketEndpoints: MarketEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    marketEndpoints = new MarketEndpoints(mockClient);
  });

  describe('getMarketHours', () => {
    it('should get market hours using /market-hours endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ isTheStockMarketOpen: true }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getMarketHours();

      expect(mockClient.get).toHaveBeenCalledWith('/market-hours', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMarketPerformance', () => {
    it('should get market performance using /quotes/index endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: '^GSPC', price: 4500 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getMarketPerformance();

      expect(mockClient.get).toHaveBeenCalledWith('/quotes/index', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getGainers', () => {
    it('should get gainers using /biggest-gainers stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', changesPercentage: 5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getGainers();

      expect(mockClient.get).toHaveBeenCalledWith('/biggest-gainers', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getLosers', () => {
    it('should get losers using /biggest-losers stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'XYZ', changesPercentage: -5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getLosers();

      expect(mockClient.get).toHaveBeenCalledWith('/biggest-losers', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMostActive', () => {
    it('should get most active using /most-actives stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', volume: 1000000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getMostActive();

      expect(mockClient.get).toHaveBeenCalledWith('/most-actives', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSectorPerformance', () => {
    it('should get sector performance using /sector-performance endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ sector: 'Technology', changesPercentage: 1.5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getSectorPerformance();

      expect(mockClient.get).toHaveBeenCalledWith('/sector-performance', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMarketIndex', () => {
    it('should get market index using /quotes/index endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: '^GSPC', price: 4500 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await marketEndpoints.getMarketIndex();

      expect(mockClient.get).toHaveBeenCalledWith('/quotes/index', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });
});

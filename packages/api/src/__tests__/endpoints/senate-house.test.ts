import { SenateHouseEndpoints } from '../../endpoints/senate-house';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('SenateHouseEndpoints', () => {
  let endpoints: SenateHouseEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    endpoints = new SenateHouseEndpoints(mockClient);
  });

  describe('getSenateTrading', () => {
    it('should get senate trading by symbol (stable)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', firstName: 'Jane', lastName: 'Doe' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getSenateTrading({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/senate-trades', 'stable', { symbol: 'AAPL' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSenateTradingRSSFeed', () => {
    it('should get senate RSS feed with default limit of 100', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getSenateTradingRSSFeed({ page: 0 });

      expect(mockClient.get).toHaveBeenCalledWith('/senate-latest', 'stable', {
        page: 0,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should pass through explicit limit', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getSenateTradingRSSFeed({ page: 1, limit: 5 });

      expect(mockClient.get).toHaveBeenCalledWith('/senate-latest', 'stable', {
        page: 1,
        limit: 5,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSenateTradingByName', () => {
    it('should get senate trading by name (stable)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', firstName: 'Jerry' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getSenateTradingByName({ name: 'Jerry' });

      expect(mockClient.get).toHaveBeenCalledWith('/senate-trades-by-name', 'stable', {
        name: 'Jerry',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHouseTrading', () => {
    it('should get house trading by symbol (stable)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', district: 'CA-12' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getHouseTrading({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/house-trades', 'stable', { symbol: 'AAPL' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHouseTradingRSSFeed', () => {
    it('should get house RSS feed with default limit of 100', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getHouseTradingRSSFeed({ page: 0 });

      expect(mockClient.get).toHaveBeenCalledWith('/house-latest', 'stable', {
        page: 0,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should pass through explicit limit', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getHouseTradingRSSFeed({ page: 2, limit: 5 });

      expect(mockClient.get).toHaveBeenCalledWith('/house-latest', 'stable', {
        page: 2,
        limit: 5,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHouseTradingByName', () => {
    it('should get house trading by name (stable)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', firstName: 'Nancy' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getHouseTradingByName({ name: 'Nancy' });

      expect(mockClient.get).toHaveBeenCalledWith('/house-trades-by-name', 'stable', {
        name: 'Nancy',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

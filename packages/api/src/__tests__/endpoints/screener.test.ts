import { ScreenerEndpoints } from '../../endpoints/screener';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('ScreenerEndpoints', () => {
  let endpoints: ScreenerEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    endpoints = new ScreenerEndpoints(mockClient);
  });

  describe('getScreener', () => {
    it('should screen companies passing params through directly', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', companyName: 'Apple Inc.', marketCap: 3000000000000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = {
        marketCapMoreThan: 1000000000,
        isActivelyTrading: true,
        sector: 'Technology',
        limit: 10,
      };
      const result = await endpoints.getScreener(params);

      expect(mockClient.get).toHaveBeenCalledWith('/company-screener', 'stable', params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAvailableExchanges', () => {
    it('should get available exchanges', async () => {
      const mockResponse = {
        success: true,
        data: [{ exchange: 'NASDAQ', name: 'Nasdaq' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getAvailableExchanges();

      expect(mockClient.get).toHaveBeenCalledWith('/available-exchanges', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAvailableSectors', () => {
    it('should get available sectors', async () => {
      const mockResponse = {
        success: true,
        data: [{ sector: 'Technology' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getAvailableSectors();

      expect(mockClient.get).toHaveBeenCalledWith('/available-sectors', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAvailableIndustries', () => {
    it('should get available industries', async () => {
      const mockResponse = {
        success: true,
        data: [{ industry: 'Software—Application' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getAvailableIndustries();

      expect(mockClient.get).toHaveBeenCalledWith('/available-industries', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAvailableCountries', () => {
    it('should get available countries', async () => {
      const mockResponse = {
        success: true,
        data: [{ country: 'US' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getAvailableCountries();

      expect(mockClient.get).toHaveBeenCalledWith('/available-countries', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });
});

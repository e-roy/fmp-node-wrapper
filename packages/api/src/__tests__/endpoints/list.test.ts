import { ListEndpoints } from '../../endpoints/list';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('ListEndpoints', () => {
  let listEndpoints: ListEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    listEndpoints = new ListEndpoints(mockClient);
  });

  describe('getStockList', () => {
    it('should get stock list using /stock/list endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await listEndpoints.getStockList();

      expect(mockClient.get).toHaveBeenCalledWith('/stock/list');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getETFList', () => {
    it('should get ETF list using /etf/list endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', exchange: 'NYSE' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await listEndpoints.getETFList();

      expect(mockClient.get).toHaveBeenCalledWith('/etf/list');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCryptoList', () => {
    it('should get crypto list using /symbol/available-cryptocurrencies endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'BTCUSD', name: 'Bitcoin', currency: 'USD' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await listEndpoints.getCryptoList();

      expect(mockClient.get).toHaveBeenCalledWith('/symbol/available-cryptocurrencies');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getForexList', () => {
    it('should get forex list using /symbol/available-forex-currency-pairs endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'EURUSD', name: 'EUR/USD', currency: 'USD' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await listEndpoints.getForexList();

      expect(mockClient.get).toHaveBeenCalledWith('/symbol/available-forex-currency-pairs');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAvailableIndexes', () => {
    it('should get available indexes using /symbol/available-indexes endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: '^GSPC', name: 'S&P 500', currency: 'USD' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await listEndpoints.getAvailableIndexes();

      expect(mockClient.get).toHaveBeenCalledWith('/symbol/available-indexes');
      expect(result).toEqual(mockResponse);
    });
  });
});

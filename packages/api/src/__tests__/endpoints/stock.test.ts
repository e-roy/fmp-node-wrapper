import { StockEndpoints } from '../../endpoints/stock';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('StockEndpoints', () => {
  let stockEndpoints: StockEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    stockEndpoints = new StockEndpoints(mockClient);
  });

  describe('getMarketCap', () => {
    it('should get market cap using /market-capitalization/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', marketCap: 3000000000000 },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await stockEndpoints.getMarketCap('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/market-capitalization/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStockSplits', () => {
    it('should get stock splits using /historical-price-full/stock_split/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', historical: [] }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await stockEndpoints.getStockSplits('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/historical-price-full/stock_split/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDividendHistory', () => {
    it('should get dividend history using /historical-price-full/stock_dividend/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'KO', historical: [] },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await stockEndpoints.getDividendHistory('KO');

      expect(mockClient.getSingle).toHaveBeenCalledWith(
        '/historical-price-full/stock_dividend/KO',
        'v3',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRealTimePrice', () => {
    it('should get real-time prices using stock/real-time-price/{symbols} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', price: 150 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await stockEndpoints.getRealTimePrice(['AAPL', 'MSFT']);

      expect(mockClient.get).toHaveBeenCalledWith('stock/real-time-price/AAPL,MSFT', 'v3');
      // Method filters the array data; with a valid symbol it is returned unchanged
      expect(result).toEqual({ ...mockResponse, data: [{ symbol: 'AAPL', price: 150 }] });
    });
  });

  describe('getRealTimePriceForMultipleStocks', () => {
    it('should get full real-time prices using stock/full/real-time-price/{symbols} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', bidPrice: 149, askPrice: 151 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await stockEndpoints.getRealTimePriceForMultipleStocks(['AAPL', 'MSFT']);

      expect(mockClient.get).toHaveBeenCalledWith('stock/full/real-time-price/AAPL,MSFT', 'v3');
      expect(result).toEqual({
        ...mockResponse,
        data: [{ symbol: 'AAPL', bidPrice: 149, askPrice: 151 }],
      });
    });
  });
});

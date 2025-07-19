import { QuoteEndpoints } from '../../endpoints/quote';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('QuoteEndpoints', () => {
  let quoteEndpoints: QuoteEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    quoteEndpoints = new QuoteEndpoints(mockClient);
  });

  describe('getQuote', () => {
    it('should get stock quote using /quote/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', price: 150, exchange: 'NASDAQ' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getQuote('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/quote/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });

    it('should get crypto quote using /quote/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'BTCUSD', price: 50000, exchange: 'CRYPTO' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getQuote('BTCUSD');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/quote/BTCUSD', 'v3');
      expect(result).toEqual(mockResponse);
    });

    it('should get forex quote using /quote/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'EURUSD', price: 1.1, exchange: 'FOREX' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getQuote('EURUSD');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/quote/EURUSD', 'v3');
      expect(result).toEqual(mockResponse);
    });

    it('should get commodity quote using /quote/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'ZOUSX', price: 379.75, exchange: 'COMMODITY' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getQuote('ZOUSX');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/quote/ZOUSX', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHistoricalPrice', () => {
    it('should get historical prices for any asset type', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', historical: [] },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getHistoricalPrice({
        symbol: 'AAPL',
        from: '2023-01-01',
        to: '2023-12-31',
      });

      expect(mockClient.getSingle).toHaveBeenCalledWith('/historical-price-full/AAPL', 'v3', {
        from: '2023-01-01',
        to: '2023-12-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get historical prices without date range', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', historical: [] },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getHistoricalPrice({ symbol: 'AAPL' });

      expect(mockClient.getSingle).toHaveBeenCalledWith('/historical-price-full/AAPL', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getQuotes', () => {
    it('should get multiple quotes for any asset type', async () => {
      const mockResponse = {
        success: true,
        data: [
          { symbol: 'AAPL', exchange: 'NASDAQ' },
          { symbol: 'BTCUSD', exchange: 'CRYPTO' },
        ],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getQuotes(['AAPL', 'BTCUSD']);

      expect(mockClient.get).toHaveBeenCalledWith('/quote/AAPL,BTCUSD', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getIntraday', () => {
    it('should get intraday data with 5min interval', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            date: '2023-08-10 09:30:00',
            open: 150.0,
            high: 151.0,
            low: 149.0,
            close: 150.5,
            volume: 1000,
          },
        ],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getIntraday({
        symbol: 'BTCUSD',
        interval: '5min',
        from: '2023-08-10',
        to: '2023-09-10',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/historical-chart/5min/BTCUSD', 'v3', {
        from: '2023-08-10',
        to: '2023-09-10',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get intraday data without date range', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await quoteEndpoints.getIntraday({
        symbol: 'AAPL',
        interval: '1hour',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/historical-chart/1hour/AAPL', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });
});

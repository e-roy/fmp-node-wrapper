import { NewsEndpoints } from '../../endpoints/news';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('NewsEndpoints', () => {
  let newsEndpoints: NewsEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    newsEndpoints = new NewsEndpoints(mockClient);
  });

  describe('getArticles', () => {
    it('should get articles using /fmp-articles endpoint with provided page and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ title: 'Market Update', content: 'Lorem ipsum' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getArticles({ page: 2, limit: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/fmp-articles', 'stable', {
        page: 2,
        limit: 10,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when called with no args', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getArticles();

      expect(mockClient.get).toHaveBeenCalledWith('/fmp-articles', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStockNews', () => {
    it('should get stock news with from and to using /news/stock-latest endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', title: 'Apple news' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getStockNews({
        from: '2024-01-01',
        to: '2024-01-15',
        limit: 50,
      });

      expect(mockClient.get).toHaveBeenCalledWith('/news/stock-latest', 'stable', {
        page: 1,
        limit: 50,
        from: '2024-01-01',
        to: '2024-01-15',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when called with no args', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getStockNews();

      expect(mockClient.get).toHaveBeenCalledWith('/news/stock-latest', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCryptoNews', () => {
    it('should get crypto news with date range using /news/crypto-latest endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'BTCUSD', title: 'Bitcoin news' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getCryptoNews({ from: '2024-01-08', to: '2024-01-15' });

      expect(mockClient.get).toHaveBeenCalledWith('/news/crypto-latest', 'stable', {
        page: 1,
        limit: 100,
        from: '2024-01-08',
        to: '2024-01-15',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when called with no args', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getCryptoNews();

      expect(mockClient.get).toHaveBeenCalledWith('/news/crypto-latest', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getForexNews', () => {
    it('should get forex news using /news/forex-latest endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'EURUSD', title: 'Forex news' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getForexNews({ from: '2024-01-10', limit: 30 });

      expect(mockClient.get).toHaveBeenCalledWith('/news/forex-latest', 'stable', {
        page: 1,
        limit: 30,
        from: '2024-01-10',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when called with no args', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getForexNews();

      expect(mockClient.get).toHaveBeenCalledWith('/news/forex-latest', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStockNewsBySymbol', () => {
    it('should get stock news by symbol using /news/stock?symbols= endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', title: 'Apple news' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getStockNewsBySymbol({
        symbols: ['AAPL', 'MSFT'],
        from: '2024-01-01',
        limit: 20,
      });

      expect(mockClient.get).toHaveBeenCalledWith('/news/stock?symbols=AAPL,MSFT', 'stable', {
        page: 1,
        limit: 20,
        from: '2024-01-01',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when only symbols provided', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getStockNewsBySymbol({ symbols: ['AAPL'] });

      expect(mockClient.get).toHaveBeenCalledWith('/news/stock?symbols=AAPL', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCryptoNewsBySymbol', () => {
    it('should get crypto news by symbol using /news/crypto?symbols= endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'BTCUSD', title: 'Bitcoin news' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getCryptoNewsBySymbol({
        symbols: ['BTCUSD', 'ETHUSD'],
        from: '2024-01-01',
        limit: 25,
      });

      expect(mockClient.get).toHaveBeenCalledWith('/news/crypto?symbols=BTCUSD,ETHUSD', 'stable', {
        page: 1,
        limit: 25,
        from: '2024-01-01',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when only symbols provided', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getCryptoNewsBySymbol({ symbols: ['BTCUSD'] });

      expect(mockClient.get).toHaveBeenCalledWith('/news/crypto?symbols=BTCUSD', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getForexNewsBySymbol', () => {
    it('should get forex news by symbol using /news/forex?symbols= endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'EURUSD', title: 'Forex news' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getForexNewsBySymbol({
        symbols: ['EURUSD', 'GBPUSD'],
        from: '2024-01-01',
        limit: 20,
      });

      expect(mockClient.get).toHaveBeenCalledWith('/news/forex?symbols=EURUSD,GBPUSD', 'stable', {
        page: 1,
        limit: 20,
        from: '2024-01-01',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page and limit when only symbols provided', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await newsEndpoints.getForexNewsBySymbol({ symbols: ['EURUSD'] });

      expect(mockClient.get).toHaveBeenCalledWith('/news/forex?symbols=EURUSD', 'stable', {
        page: 1,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

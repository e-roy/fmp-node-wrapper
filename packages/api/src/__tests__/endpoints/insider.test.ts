import { InsiderEndpoints } from '../../endpoints/insider';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('InsiderEndpoints', () => {
  let endpoints: InsiderEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    endpoints = new InsiderEndpoints(mockClient);
  });

  describe('getInsiderTradingRSS', () => {
    it('should get RSS feed with default page and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', reportingName: 'John Doe' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradingRSS({});

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/latest', 'stable', {
        page: 0,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should pass through explicit page and limit', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradingRSS({ page: 2, limit: 5 });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/latest', 'stable', {
        page: 2,
        limit: 5,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('searchInsiderTrading', () => {
    it('should search with only defaults when no filters provided', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.searchInsiderTrading({});

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 0,
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should include all provided filters in query params', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.searchInsiderTrading({
        symbol: 'AAPL',
        reportingCik: '0000111111',
        companyCik: '0000320193',
        transactionType: 'P-Purchase',
        page: 1,
        limit: 25,
      });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 1,
        limit: 25,
        symbol: 'AAPL',
        reportingCik: '0000111111',
        companyCik: '0000320193',
        transactionType: 'P-Purchase',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransactionTypes', () => {
    it('should get transaction types', async () => {
      const mockResponse = {
        success: true,
        data: ['P-Purchase', 'S-Sale'],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getTransactionTypes();

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading-transaction-type', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsidersBySymbol', () => {
    it('should get insiders roster by symbol (v4)', async () => {
      const mockResponse = {
        success: true,
        data: [{ owner: 'John Doe', typeOfOwner: 'officer' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsidersBySymbol({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-roaster', 'v4', { symbol: 'AAPL' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsiderTradeStatistics', () => {
    it('should get insider trade statistics by symbol', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', totalPurchases: 10 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradeStatistics({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/statistics', 'stable', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCikMapper', () => {
    it('should get CIK mapper with default page (v4)', async () => {
      const mockResponse = {
        success: true,
        data: [{ reportingCik: '0000320193', reportingName: 'Apple Inc.' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getCikMapper({});

      expect(mockClient.get).toHaveBeenCalledWith('/mapper-cik-name', 'v4', { page: 0 });
      expect(result).toEqual(mockResponse);
    });

    it('should pass through explicit page', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getCikMapper({ page: 3 });

      expect(mockClient.get).toHaveBeenCalledWith('/mapper-cik-name', 'v4', { page: 3 });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCikMapperByName', () => {
    it('should get CIK mapper by name with default page (v4)', async () => {
      const mockResponse = {
        success: true,
        data: [{ reportingCik: '0000320193', reportingName: 'Apple Inc.' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getCikMapperByName({ name: 'Apple' });

      expect(mockClient.get).toHaveBeenCalledWith('/mapper-cik-name', 'v4', {
        name: 'Apple',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCikMapperBySymbol', () => {
    it('should get CIK mapper by symbol via getSingle (v4)', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', companyCik: '0000320193' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await endpoints.getCikMapperBySymbol({ symbol: 'AAPL' });

      expect(mockClient.getSingle).toHaveBeenCalledWith('/mapper-cik-company/AAPL', 'v4');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBeneficialOwnership', () => {
    it('should get beneficial ownership with default limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', cik: '0000320193' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getBeneficialOwnership({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/acquisition-of-beneficial-ownership', 'stable', {
        symbol: 'AAPL',
        limit: 100,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should pass through explicit limit', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getBeneficialOwnership({ symbol: 'MSFT', limit: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/acquisition-of-beneficial-ownership', 'stable', {
        symbol: 'MSFT',
        limit: 10,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getFailToDeliver', () => {
    it('should get fail to deliver data with default page (v4)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', quantity: 500 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getFailToDeliver({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/fail_to_deliver', 'v4', {
        symbol: 'AAPL',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsiderTradesBySymbol', () => {
    it('should delegate to searchInsiderTrading with symbol and explicit page', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradesBySymbol('AAPL', 1);

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 1,
        limit: 100,
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should default page to 0', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      await endpoints.getInsiderTradesBySymbol('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 0,
        limit: 100,
        symbol: 'AAPL',
      });
    });
  });

  describe('getInsiderTradesByType', () => {
    it('should delegate to searchInsiderTrading with transactionType and page', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradesByType('P-Purchase', 2);

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 2,
        limit: 100,
        transactionType: 'P-Purchase',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsiderTradesByReportingCik', () => {
    it('should delegate to searchInsiderTrading with reportingCik and page', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradesByReportingCik('0000111111', 1);

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 1,
        limit: 100,
        reportingCik: '0000111111',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsiderTradesByCompanyCik', () => {
    it('should delegate to searchInsiderTrading with companyCik and page', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInsiderTradesByCompanyCik('0000320193', 0);

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading/search', 'stable', {
        page: 0,
        limit: 100,
        companyCik: '0000320193',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

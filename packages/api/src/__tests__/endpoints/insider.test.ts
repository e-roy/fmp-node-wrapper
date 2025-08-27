import { FMP } from '../../fmp';
import { TransactionType } from 'fmp-node-types';

// Mock the client to avoid actual API calls during testing
jest.mock('../../client');

describe('InsiderEndpoints', () => {
  let fmp: FMP;
  let mockClient: any;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create a new FMP instance for each test
    fmp = new FMP({ apiKey: 'testapikey123456789012345678901234567890' });
    mockClient = fmp.getClient();
  });

  describe('getInsiderTradingRSS', () => {
    it('should call the correct endpoint with page parameter', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getInsiderTradingRSS({ page: 0 });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading-rss-feed', 'v4', { page: 0 });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('searchInsiderTrading', () => {
    it('should call the correct endpoint with all parameters', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = {
        symbol: 'AAPL',
        reportingCik: '0001767094',
        companyCik: '0000320193',
        transactionType: TransactionType.SALE,
        page: 0,
      };

      const result = await fmp.insider.searchInsiderTrading(params);

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call the correct endpoint with only required parameters', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = { page: 0 };

      const result = await fmp.insider.searchInsiderTrading(params);

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransactionTypes', () => {
    it('should call the correct endpoint', async () => {
      const mockResponse = { success: true, data: ['P-Purchase', 'S-Sale'] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getTransactionTypes();

      expect(mockClient.get).toHaveBeenCalledWith('/insider-trading-transaction-type', 'v4');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsidersBySymbol', () => {
    it('should call the correct endpoint with symbol parameter', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getInsidersBySymbol({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-roaster', 'v4', { symbol: 'AAPL' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInsiderTradeStatistics', () => {
    it('should call the correct endpoint with symbol parameter', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getInsiderTradeStatistics({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/insider-roaster-statistic', 'v4', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCikMapper', () => {
    it('should call the correct endpoint with page parameter', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getCikMapper({ page: 0 });

      expect(mockClient.get).toHaveBeenCalledWith('/mapper-cik-name', 'v4', { page: 0 });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCikMapperByName', () => {
    it('should call the correct endpoint with name and page parameters', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getCikMapperByName({ name: 'zuckerberg', page: 0 });

      expect(mockClient.get).toHaveBeenCalledWith('/mapper-cik-name', 'v4', {
        name: 'zuckerberg',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should use default page value when not provided', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getCikMapperByName({ name: 'zuckerberg' });

      expect(mockClient.get).toHaveBeenCalledWith('/mapper-cik-name', 'v4', {
        name: 'zuckerberg',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCikMapperBySymbol', () => {
    it('should call the correct endpoint with symbol parameter', async () => {
      const mockResponse = { success: true, data: {} };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getCikMapperBySymbol({ symbol: 'MSFT' });

      expect(mockClient.getSingle).toHaveBeenCalledWith('/mapper-cik-company/MSFT', 'v4');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBeneficialOwnership', () => {
    it('should call the correct endpoint with symbol parameter', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getBeneficialOwnership({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/insider/ownership/acquisition_of_beneficial_ownership',
        'v4',
        { symbol: 'AAPL' },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getFailToDeliver', () => {
    it('should call the correct endpoint with symbol and page parameters', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getFailToDeliver({ symbol: 'GE', page: 0 });

      expect(mockClient.get).toHaveBeenCalledWith('/fail_to_deliver', 'v4', {
        symbol: 'GE',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should use default page value when not provided', async () => {
      const mockResponse = { success: true, data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await fmp.insider.getFailToDeliver({ symbol: 'GE' });

      expect(mockClient.get).toHaveBeenCalledWith('/fail_to_deliver', 'v4', {
        symbol: 'GE',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('convenience methods', () => {
    describe('getInsiderTradesBySymbol', () => {
      it('should call searchInsiderTrading with symbol parameter', async () => {
        const mockResponse = { success: true, data: [] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await fmp.insider.getInsiderTradesBySymbol('AAPL', 1);

        expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', {
          symbol: 'AAPL',
          page: 1,
        });
        expect(result).toEqual(mockResponse);
      });

      it('should use default page value when not provided', async () => {
        const mockResponse = { success: true, data: [] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await fmp.insider.getInsiderTradesBySymbol('AAPL');

        expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', {
          symbol: 'AAPL',
          page: 0,
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getInsiderTradesByType', () => {
      it('should call searchInsiderTrading with transaction type parameter', async () => {
        const mockResponse = { success: true, data: [] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await fmp.insider.getInsiderTradesByType(TransactionType.SALE, 1);

        expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', {
          transactionType: TransactionType.SALE,
          page: 1,
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getInsiderTradesByReportingCik', () => {
      it('should call searchInsiderTrading with reporting CIK parameter', async () => {
        const mockResponse = { success: true, data: [] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await fmp.insider.getInsiderTradesByReportingCik('0001767094', 1);

        expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', {
          reportingCik: '0001767094',
          page: 1,
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getInsiderTradesByCompanyCik', () => {
      it('should call searchInsiderTrading with company CIK parameter', async () => {
        const mockResponse = { success: true, data: [] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await fmp.insider.getInsiderTradesByCompanyCik('0000320193', 1);

        expect(mockClient.get).toHaveBeenCalledWith('/insider-trading', 'v4', {
          companyCik: '0000320193',
          page: 1,
        });
        expect(result).toEqual(mockResponse);
      });
    });
  });
});

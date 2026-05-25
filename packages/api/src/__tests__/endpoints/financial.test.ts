import { FinancialEndpoints } from '../../endpoints/financial';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('FinancialEndpoints', () => {
  let financialEndpoints: FinancialEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    financialEndpoints = new FinancialEndpoints(mockClient);
  });

  describe('getIncomeStatement', () => {
    it('should get income statement with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', revenue: 1000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getIncomeStatement({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/income-statement?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get income statement with explicit period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'MSFT', revenue: 2000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getIncomeStatement({
        symbol: 'MSFT',
        period: 'quarter',
        limit: 8,
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/income-statement?symbol=MSFT&period=quarter&limit=8',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBalanceSheet', () => {
    it('should get balance sheet with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', totalAssets: 1000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getBalanceSheet({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/balance-sheet-statement?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCashFlowStatement', () => {
    it('should get cash flow statement with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', operatingCashFlow: 1000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getCashFlowStatement({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/cash-flow-statement?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getKeyMetrics', () => {
    it('should get key metrics with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', peRatio: 25 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getKeyMetrics({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/key-metrics?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getFinancialRatios', () => {
    it('should get financial ratios with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', priceToBookRatio: 5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getFinancialRatios({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/ratios?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEnterpriseValue', () => {
    it('should get enterprise value with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', enterpriseValue: 1000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getEnterpriseValue({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/enterprise-values?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCashflowGrowth', () => {
    it('should get cash flow growth with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', operatingCashFlowGrowth: 0.1 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getCashflowGrowth({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/cash-flow-statement-growth?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getIncomeGrowth', () => {
    it('should get income growth with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', revenueGrowth: 0.1 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getIncomeGrowth({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/income-statement-growth?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBalanceSheetGrowth', () => {
    it('should get balance sheet growth with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', totalAssetsGrowth: 0.1 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getBalanceSheetGrowth({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/balance-sheet-statement-growth?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getFinancialGrowth', () => {
    it('should get financial growth with default period and limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', epsGrowth: 0.1 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getFinancialGrowth({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith(
        '/financial-growth?symbol=AAPL&period=annual&limit=5',
        'stable',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEarningsHistorical', () => {
    it('should get earnings historical with default limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', epsActual: 1.5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getEarningsHistorical({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/earnings?symbol=AAPL&limit=5', 'stable');
      expect(result).toEqual(mockResponse);
    });

    it('should get earnings historical with explicit limit', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'MSFT', epsActual: 2.5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getEarningsHistorical({ symbol: 'MSFT', limit: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/earnings?symbol=MSFT&limit=10', 'stable');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEarningsSurprises', () => {
    it('should get earnings surprises using /earnings-surprises/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', actualEarningResult: 1.5 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await financialEndpoints.getEarningsSurprises('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/earnings-surprises/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });
});

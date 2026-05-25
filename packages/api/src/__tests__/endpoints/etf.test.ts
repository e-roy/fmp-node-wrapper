import { ETFEndpoints } from '../../endpoints/etf';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('ETFEndpoints', () => {
  let etfEndpoints: ETFEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    etfEndpoints = new ETFEndpoints(mockClient);
  });

  describe('getHoldingDates', () => {
    it('should get holding dates using /etf-holdings/portfolio-date endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getHoldingDates('SPY');

      expect(mockClient.get).toHaveBeenCalledWith('/etf-holdings/portfolio-date', 'v4', {
        symbol: 'SPY',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHoldings', () => {
    it('should get holdings using /etf-holdings endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', name: 'Apple Inc.', cik: '0000320193', balance: 1000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getHoldings({ symbol: 'SPY', date: '2024-01-15' });

      expect(mockClient.get).toHaveBeenCalledWith('/etf-holdings', 'v4', {
        symbol: 'SPY',
        date: '2024-01-15',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHolder', () => {
    it('should get holder using /etf-holder/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ asset: 'AAPL', sharesNumber: 1000, weightPercentage: 7.1 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getHolder('SPY');

      expect(mockClient.get).toHaveBeenCalledWith('/etf-holder/SPY', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProfile', () => {
    it('should get profile using /etf/info endpoint via getSingle', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', expenseRatio: 0.0945 },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getProfile('SPY');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/etf/info', 'stable', { symbol: 'SPY' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSectorWeighting', () => {
    it('should get sector weighting using /etf/sector-weightings endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ sector: 'Technology', weightPercentage: 30 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getSectorWeighting('SPY');

      expect(mockClient.get).toHaveBeenCalledWith('/etf/sector-weightings', 'stable', {
        symbol: 'SPY',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCountryWeighting', () => {
    it('should get country weighting using /etf/country-weightings endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ country: 'United States', weightPercentage: 98 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getCountryWeighting('SPY');

      expect(mockClient.get).toHaveBeenCalledWith('/etf/country-weightings', 'stable', {
        symbol: 'SPY',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStockExposure', () => {
    it('should get stock exposure using /etf-stock-exposure/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [
          { etfSymbol: 'SPY', assetExposure: 'AAPL', sharesNumber: 1000, weightPercentage: 7.1 },
        ],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await etfEndpoints.getStockExposure('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/etf-stock-exposure/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });
});

import { EconomicEndpoints } from '../../endpoints/economic';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('EconomicEndpoints', () => {
  let economicEndpoints: EconomicEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    economicEndpoints = new EconomicEndpoints(mockClient);
  });

  describe('getTreasuryRates', () => {
    it('should get treasury rates with from and to using /treasury-rates endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ date: '2023-12-31', month1: 5.4, year1: 4.8, year10: 3.88 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await economicEndpoints.getTreasuryRates({
        from: '2023-01-01',
        to: '2023-12-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/treasury-rates', 'stable', {
        from: '2023-01-01',
        to: '2023-12-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get treasury rates without date range', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await economicEndpoints.getTreasuryRates({});

      expect(mockClient.get).toHaveBeenCalledWith('/treasury-rates', 'stable', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEconomicIndicators', () => {
    it('should get economic indicators with name, from, and to using /economic-indicators endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ date: '2023-12-31', value: 27000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await economicEndpoints.getEconomicIndicators({
        name: 'GDP',
        from: '2023-01-01',
        to: '2023-12-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/economic-indicators', 'stable', {
        name: 'GDP',
        from: '2023-01-01',
        to: '2023-12-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get economic indicators with only name', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await economicEndpoints.getEconomicIndicators({
        name: 'unemploymentRate',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/economic-indicators', 'stable', {
        name: 'unemploymentRate',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

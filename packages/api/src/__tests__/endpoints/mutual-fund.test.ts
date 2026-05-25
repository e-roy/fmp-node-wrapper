import { MutualFundEndpoints } from '../../endpoints/mutual-fund';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('MutualFundEndpoints', () => {
  let mutualFundEndpoints: MutualFundEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    mutualFundEndpoints = new MutualFundEndpoints(mockClient);
  });

  describe('getHolders', () => {
    it('should get mutual fund holders using /mutual-fund-holder/{symbol} endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            holder: 'Vanguard Total Stock Market Index Fund',
            shares: 1000000,
            dateReported: '2024-01-15',
            change: 5000,
            weightPercent: 5.2,
          },
        ],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await mutualFundEndpoints.getHolders('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/mutual-fund-holder/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });
});

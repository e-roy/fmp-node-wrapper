import { InstitutionalEndpoints } from '../../endpoints/institutional';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('InstitutionalEndpoints', () => {
  let endpoints: InstitutionalEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    endpoints = new InstitutionalEndpoints(mockClient);
  });

  describe('getForm13F', () => {
    it('should get Form 13F data without a date (empty params)', async () => {
      const mockResponse = {
        success: true,
        data: [{ nameOfIssuer: 'Apple Inc.', cusip: '037833100' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getForm13F({ cik: '0001067983' });

      expect(mockClient.get).toHaveBeenCalledWith('/form-thirteen/0001067983', 'v3', {});
      expect(result).toEqual(mockResponse);
    });

    it('should include date in query params when provided', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getForm13F({ cik: '0001388838', date: '2021-09-30' });

      expect(mockClient.get).toHaveBeenCalledWith('/form-thirteen/0001388838', 'v3', {
        date: '2021-09-30',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getForm13FDates', () => {
    it('should get Form 13F filing dates for a CIK', async () => {
      const mockResponse = {
        success: true,
        data: ['2023-12-31', '2023-09-30'],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getForm13FDates({ cik: '0001067983' });

      expect(mockClient.get).toHaveBeenCalledWith('/form-thirteen-date/0001067983', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInstitutionalHolders', () => {
    it('should get institutional holders for a symbol', async () => {
      const mockResponse = {
        success: true,
        data: [{ holder: 'Vanguard', shares: 1000000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getInstitutionalHolders({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/institutional-holder/AAPL', 'v3');
      expect(result).toEqual(mockResponse);
    });
  });
});

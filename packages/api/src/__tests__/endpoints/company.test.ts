import { CompanyEndpoints } from '../../endpoints/company';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('CompanyEndpoints', () => {
  let companyEndpoints: CompanyEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    companyEndpoints = new CompanyEndpoints(mockClient);
  });

  describe('getCompanyProfile', () => {
    it('should get company profile using /profile stable endpoint with symbol param', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', companyName: 'Apple Inc.' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getCompanyProfile('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/profile', 'stable', { symbol: 'AAPL' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getExecutiveCompensation', () => {
    it('should get executive compensation using /governance-executive-compensation stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', nameAndPosition: 'Tim Cook' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getExecutiveCompensation('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/governance-executive-compensation', 'stable', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCompanyNotes', () => {
    it('should get company notes using /company-notes stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', title: 'Note' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getCompanyNotes('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/company-notes', 'stable', { symbol: 'AAPL' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHistoricalEmployeeCount', () => {
    it('should get historical employee count using /historical-employee-count stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', employeeCount: 150000 }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getHistoricalEmployeeCount('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/historical-employee-count', 'stable', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSharesFloat', () => {
    it('should get shares float using /shares-float stable endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', floatShares: 1000000 },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getSharesFloat('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/shares-float', 'stable', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHistoricalSharesFloat', () => {
    it('should get historical shares float using /historical/shares_float v4 endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', date: '2024-01-01', floatShares: '1000000' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getHistoricalSharesFloat('AAPL');

      expect(mockClient.get).toHaveBeenCalledWith('/historical/shares_float', 'v4', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEarningsCallTranscript', () => {
    it('should get earnings call transcript using /earning_call_transcript/{symbol} v3 endpoint', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', content: 'transcript' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getEarningsCallTranscript({
        symbol: 'AAPL',
        year: 2024,
        quarter: 1,
      });

      expect(mockClient.getSingle).toHaveBeenCalledWith('/earning_call_transcript/AAPL', 'v3', {
        year: 2024,
        quarter: 1,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCompanyTranscriptData', () => {
    it('should get transcript data using /earning_call_transcript v4 endpoint with symbol param', async () => {
      const mockResponse = {
        success: true,
        data: { quarter: 1, year: 2024 },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const result = await companyEndpoints.getCompanyTranscriptData('AAPL');

      expect(mockClient.getSingle).toHaveBeenCalledWith('/earning_call_transcript', 'v4', {
        symbol: 'AAPL',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

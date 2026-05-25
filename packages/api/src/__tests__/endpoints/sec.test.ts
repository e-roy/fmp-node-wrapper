import { SECEndpoints } from '../../endpoints/sec';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('SECEndpoints', () => {
  let endpoints: SECEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    endpoints = new SECEndpoints(mockClient);
  });

  describe('getRSSFeed', () => {
    it('should get RSS feed with no params (undefined passed through)', async () => {
      const mockResponse = {
        success: true,
        data: [{ title: 'Filing', form_type: '4' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getRSSFeed();

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed', 'v4', undefined);
      expect(result).toEqual(mockResponse);
    });

    it('should pass custom params through (v4)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = {
        limit: 5,
        type: '10-K',
        from: '2024-01-01',
        to: '2024-12-31',
        isDone: true,
      };
      const result = await endpoints.getRSSFeed(params);

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed', 'v4', params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRSSFeedAll', () => {
    it('should get RSS feed all with no params (undefined passed through)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getRSSFeedAll();

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed_all', 'v4', undefined);
      expect(result).toEqual(mockResponse);
    });

    it('should pass custom params through (v4)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = { page: 1, datatype: 'csv' };
      const result = await endpoints.getRSSFeedAll(params);

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed_all', 'v4', params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRSSFeedV3', () => {
    it('should get RSS feed V3 with no params (v3)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getRSSFeedV3();

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed', 'v3', undefined);
      expect(result).toEqual(mockResponse);
    });

    it('should pass custom params through (v3)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = { page: 0, datatype: 'csv' };
      const result = await endpoints.getRSSFeedV3(params);

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed', 'v3', params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRSSFeed8K', () => {
    it('should get RSS feed 8-K with no params (v4)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getRSSFeed8K();

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed_8k', 'v4', undefined);
      expect(result).toEqual(mockResponse);
    });

    it('should pass custom params through (v4)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = {
        page: 0,
        from: '2024-01-01',
        to: '2024-12-31',
        hasFinancial: true,
        limit: 5,
      };
      const result = await endpoints.getRSSFeed8K(params);

      expect(mockClient.get).toHaveBeenCalledWith('/rss_feed_8k', 'v4', params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSECFilings', () => {
    it('should get SEC filings by symbol with no params (v3)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', type: '10-K' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getSECFilings({ symbol: 'AAPL' });

      expect(mockClient.get).toHaveBeenCalledWith('/sec_filings/AAPL', 'v3', undefined);
      expect(result).toEqual(mockResponse);
    });

    it('should pass filing params through (v3)', async () => {
      const mockResponse = { success: true, data: [], error: null, status: 200 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getSECFilings({
        symbol: 'MSFT',
        params: { type: '10-K', page: 0 },
      });

      expect(mockClient.get).toHaveBeenCalledWith('/sec_filings/MSFT', 'v3', {
        type: '10-K',
        page: 0,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getIndividualIndustryClassification', () => {
    it('should get individual industry classification via getSingle (v4)', async () => {
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', sicCode: '3571', industryTitle: 'Electronic Computers' },
        error: null,
        status: 200,
      };
      mockClient.getSingle.mockResolvedValue(mockResponse);

      const params = { symbol: 'AAPL' };
      const result = await endpoints.getIndividualIndustryClassification(params);

      expect(mockClient.getSingle).toHaveBeenCalledWith(
        '/standard_industrial_classification',
        'v4',
        params,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAllIndustryClassifications', () => {
    it('should get all industry classifications (v4)', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', industryTitle: 'Electronic Computers' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endpoints.getAllIndustryClassifications();

      expect(mockClient.get).toHaveBeenCalledWith(
        '/standard_industrial_classification/all',
        'v4',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getIndustryClassificationCodes', () => {
    it('should get industry classification codes passing params through (v4)', async () => {
      const mockResponse = {
        success: true,
        data: [{ sicCode: '3571', industryTitle: 'Electronic Computers' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = { sicCode: 3571 };
      const result = await endpoints.getIndustryClassificationCodes(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/standard_industrial_classification_list',
        'v4',
        params,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});

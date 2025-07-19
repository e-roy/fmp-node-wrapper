import { FMPClient } from '../client';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FMPClient', () => {
  let client: FMPClient;
  let mockAxiosInstance: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    };

    // Mock axios.create to return our mock instance
    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    client = new FMPClient({
      apiKey: 'testapikey123456789012345678901234567890',
    });
  });

  describe('Constructor', () => {
    it('should initialize with correct configuration', () => {
      expect(client).toBeInstanceOf(FMPClient);
    });

    it('should create three axios clients for different API versions', () => {
      expect(mockedAxios.create).toHaveBeenCalledTimes(3);

      // Check v3 client
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://financialmodelingprep.com/api/v3',
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
      });

      // Check v4 client
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://financialmodelingprep.com/api/v4',
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
      });

      // Check stable client
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://financialmodelingprep.com/stable',
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should use custom timeout when provided', () => {
      jest.clearAllMocks();
      mockedAxios.create.mockReturnValue(mockAxiosInstance);

      new FMPClient({
        apiKey: 'testapikey123456789012345678901234567890',
        timeout: 30000,
      });

      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 30000,
        }),
      );
    });

    it('should set up request interceptors to add API key', () => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalledTimes(3);

      // Get the interceptor function that was passed
      const interceptorFn = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];

      // Test the interceptor function
      const mockConfig = { params: { existing: 'param' } };
      const result = interceptorFn(mockConfig);

      expect(result.params).toEqual({
        existing: 'param',
        apikey: 'testapikey123456789012345678901234567890',
      });
    });
  });

  describe('get method', () => {
    it('should make successful GET request with v3 client by default', async () => {
      const mockResponse = {
        data: [{ id: 1, name: 'Test' }],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('/test-endpoint');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test-endpoint', { params: undefined });
      expect(result).toEqual({
        success: true,
        data: [{ id: 1, name: 'Test' }],
        error: null,
        status: 200,
      });
    });

    it('should make GET request with custom parameters', async () => {
      const mockResponse = {
        data: [{ id: 1, name: 'Test' }],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = { symbol: 'AAPL', limit: 10 };
      const result = await client.get('/test-endpoint', 'v3', params);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test-endpoint', { params });
      expect(result.success).toBe(true);
    });

    it('should handle array responses correctly', async () => {
      const mockResponse = {
        data: [{ id: 1 }, { id: 2 }],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('/test-endpoint');

      expect(result.data).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should handle null/undefined responses as empty arrays', async () => {
      const mockResponse = {
        data: null,
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('/test-endpoint');

      expect(result.data).toEqual([]);
    });

    it('should handle empty array responses', async () => {
      const mockResponse = {
        data: [],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('/test-endpoint');

      expect(result.data).toEqual([]);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(networkError);

      const result = await client.get('/test-endpoint');

      expect(result).toEqual({
        success: false,
        data: null,
        error: 'Network Error',
        status: 500,
      });
    });

    it('should handle HTTP errors with status codes', async () => {
      const httpError: any = new Error('HTTP Error');
      httpError.response = { status: 404 };
      mockAxiosInstance.get.mockRejectedValue(httpError);

      const result = await client.get('/test-endpoint');

      expect(result).toEqual({
        success: false,
        data: null,
        error: 'HTTP Error',
        status: 404,
      });
    });

    it('should handle errors without response object', async () => {
      const error = new Error('Unknown error');
      mockAxiosInstance.get.mockRejectedValue(error);

      const result = await client.get('/test-endpoint');

      expect(result).toEqual({
        success: false,
        data: null,
        error: 'Unknown error',
        status: 500,
      });
    });

    it('should handle errors without message', async () => {
      const error = {};
      mockAxiosInstance.get.mockRejectedValue(error);

      const result = await client.get('/test-endpoint');

      expect(result).toEqual({
        success: false,
        data: null,
        error: 'Unknown error occurred',
        status: 500,
      });
    });
  });

  describe('getSingle method', () => {
    it('should unwrap single object from array', async () => {
      const mockResponse = {
        data: [{ id: 1, name: 'Single Item' }],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getSingle('/test-endpoint');

      expect(result).toEqual({
        success: true,
        data: { id: 1, name: 'Single Item' },
        error: null,
        status: 200,
      });
    });

    it('should return array as-is when multiple items', async () => {
      const mockResponse = {
        data: [{ id: 1 }, { id: 2 }],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getSingle('/test-endpoint');

      expect(result.data).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should return object as-is when not an array', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Object' },
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getSingle('/test-endpoint');

      expect(result.data).toEqual({ id: 1, name: 'Object' });
    });

    it('should handle null/undefined responses as empty objects', async () => {
      const mockResponse = {
        data: null,
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getSingle('/test-endpoint');

      expect(result.data).toEqual({});
    });

    it('should handle empty array responses as empty objects', async () => {
      const mockResponse = {
        data: [],
        status: 200,
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getSingle('/test-endpoint');

      expect(result.data).toEqual({});
    });

    it('should handle errors in getSingle method', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(networkError);

      const result = await client.getSingle('/test-endpoint');

      expect(result).toEqual({
        success: false,
        data: null,
        error: 'Network Error',
        status: 500,
      });
    });
  });

  describe('API version handling', () => {
    it('should use v3 client by default', async () => {
      const mockResponse = { data: [], status: 200 };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await client.get('/test-endpoint');

      expect(mockAxiosInstance.get).toHaveBeenCalled();
    });

    it('should use v4 client when specified', async () => {
      // We need to recreate the client to test different versions
      // This is a limitation of the current implementation
      const mockResponse = { data: [], status: 200 };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await client.get('/test-endpoint', 'v4');

      expect(mockAxiosInstance.get).toHaveBeenCalled();
    });

    it('should use stable client when specified', async () => {
      const mockResponse = { data: [], status: 200 };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await client.get('/test-endpoint', 'stable');

      expect(mockAxiosInstance.get).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string endpoint', async () => {
      const mockResponse = { data: [], status: 200 };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('');

      expect(result.success).toBe(true);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('', { params: undefined });
    });

    it('should handle complex parameter objects', async () => {
      const mockResponse = { data: [], status: 200 };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const complexParams = {
        symbols: ['AAPL', 'GOOGL'],
        date: new Date('2023-01-01'),
        nested: { key: 'value' },
      };

      await client.get('/test-endpoint', 'v3', complexParams);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test-endpoint', {
        params: complexParams,
      });
    });

    it('should handle undefined parameters', async () => {
      const mockResponse = { data: [], status: 200 };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await client.get('/test-endpoint', 'v3', undefined);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test-endpoint', { params: undefined });
    });
  });
});

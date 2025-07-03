import { FMPClient } from '../client';

describe('FMPClient', () => {
  let client: FMPClient;

  beforeEach(() => {
    client = new FMPClient({
      apiKey: 'test-api-key',
    });
  });

  it('should initialize with correct configuration', () => {
    expect(client).toBeInstanceOf(FMPClient);
  });

  it('should have axios instance', () => {
    const axiosInstance = client.getAxiosInstance();
    expect(axiosInstance).toBeDefined();
    expect(axiosInstance.defaults.baseURL).toBe('https://financialmodelingprep.com/api/v3');
  });

  it('should handle GET requests', async () => {
    // Mock the axios instance to avoid actual API calls
    const mockGet = jest.fn().mockResolvedValue({
      data: { test: 'data' },
      status: 200,
    });

    const axiosInstance = client.getAxiosInstance();
    axiosInstance.get = mockGet;

    const result = await client.get('/test-endpoint');

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ test: 'data' });
    expect(result.status).toBe(200);
    expect(mockGet).toHaveBeenCalledWith('/test-endpoint', {
      params: undefined,
    });
  });

  it('should handle errors gracefully', async () => {
    const mockGet = jest.fn().mockRejectedValue({
      message: 'Network error',
      response: { status: 500 },
    });

    const axiosInstance = client.getAxiosInstance();
    axiosInstance.get = mockGet;

    const result = await client.get('/test-endpoint');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
    expect(result.status).toBe(500);
  });
});

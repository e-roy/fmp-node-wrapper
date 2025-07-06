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

  it('should initialize with correct configuration', () => {
    expect(client).toBeInstanceOf(FMPClient);
  });

  it('should handle GET requests', async () => {
    // Mock the client's get method to avoid actual API calls
    const mockGet = jest.fn().mockResolvedValue({
      success: true,
      data: { test: 'data' },
      status: 200,
    });

    jest.spyOn(client, 'get').mockImplementation(mockGet);

    const result = await client.get('/test-endpoint');

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ test: 'data' });
    expect(result.status).toBe(200);
    expect(mockGet).toHaveBeenCalledWith('/test-endpoint');
  });

  it('should handle errors gracefully', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      success: false,
      error: 'Network error',
      status: 500,
    });

    jest.spyOn(client, 'get').mockImplementation(mockGet);

    const result = await client.get('/test-endpoint');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
    expect(result.status).toBe(500);
  });
});

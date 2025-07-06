import axios, { AxiosInstance } from 'axios';
import { FMPConfig, UnwrappedAPIResponse } from './types';

/**
 * Utility function to unwrap single objects from arrays
 * If the response is an array with only one item, return just that item
 * Otherwise, return the original response
 */
function unwrapSingleObject<T>(data: T): T {
  if (Array.isArray(data) && data.length === 1) {
    return data[0];
  }
  return data;
}

export class FMPClient {
  private v3Client: AxiosInstance;
  private v4Client: AxiosInstance;
  private stableClient: AxiosInstance;
  private apiKey: string;

  constructor(config: FMPConfig) {
    this.apiKey = config.apiKey;

    // Create separate clients for each version
    this.v3Client = this.createClient('https://financialmodelingprep.com/api/v3', config.timeout);
    this.v4Client = this.createClient('https://financialmodelingprep.com/api/v4', config.timeout);
    this.stableClient = this.createClient(
      'https://financialmodelingprep.com/api/stable',
      config.timeout,
    );
  }

  private createClient(baseURL: string, timeout?: number): AxiosInstance {
    const client = axios.create({
      baseURL,
      timeout: timeout || 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    client.interceptors.request.use(config => {
      config.params = { ...config.params, apikey: this.apiKey };
      return config;
    });

    return client;
  }

  // Smart routing method
  async get<T>(
    endpoint: string,
    version: 'v3' | 'v4' | 'stable' = 'v3',
    params?: Record<string, any>,
  ): Promise<UnwrappedAPIResponse<T>> {
    const client = this.getClientForVersion(version);

    try {
      const response = await client.get(endpoint, { params });
      return {
        success: true,
        data: unwrapSingleObject(response.data),
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Unknown error occurred',
        status: error.response?.status || 500,
      };
    }
  }

  private getClientForVersion(version: 'v3' | 'v4' | 'stable'): AxiosInstance {
    switch (version) {
      case 'v3':
        return this.v3Client;
      case 'v4':
        return this.v4Client;
      case 'stable':
        return this.stableClient;
      default:
        return this.v3Client; // Default to v3
    }
  }
}

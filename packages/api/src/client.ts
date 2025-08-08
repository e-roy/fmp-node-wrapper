import axios, { AxiosInstance } from 'axios';
import { FMPConfig, APIResponse } from '@fmp/types';

/**
 * Utility function to unwrap single objects from arrays
 * Only unwraps if the response is an array with exactly one item
 * Otherwise, returns the original response
 */
function unwrapSingleObject<T>(data: T): T {
  if (Array.isArray(data) && data.length === 1) {
    return data[0];
  }
  return data;
}

/**
 * Utility to normalize array responses: always returns an array (possibly empty)
 */
function normalizeArrayResponse<T>(data: T | undefined | null): T {
  if (Array.isArray(data)) return data;
  if (data == null) return [] as unknown as T;
  return data;
}

/**
 * Utility to normalize object responses: always returns an object (possibly empty)
 */
function normalizeObjectResponse<T>(data: T | undefined | null): T {
  if (data == null) return {} as unknown as T;
  if (Array.isArray(data) && data.length === 0) return {} as unknown as T;
  return data;
}

export class FMPClient {
  private v3Client: AxiosInstance;
  private v4Client: AxiosInstance;
  private stableClient: AxiosInstance;
  private apiKey: string;

  constructor(config: FMPConfig) {
    // API key should be validated by the FMP class before calling this constructor
    if (!config.apiKey) {
      throw new Error('API key is required for FMPClient');
    }
    this.apiKey = config.apiKey;

    // Create separate clients for each version
    this.v3Client = axios.create({
      baseURL: 'https://financialmodelingprep.com/api/v3',
      timeout: config.timeout || 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.v4Client = axios.create({
      baseURL: 'https://financialmodelingprep.com/api/v4',
      timeout: config.timeout || 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.stableClient = axios.create({
      baseURL: 'https://financialmodelingprep.com/stable',
      timeout: config.timeout || 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    // Add API key to all requests
    [this.v3Client, this.v4Client, this.stableClient].forEach(client => {
      client.interceptors.request.use(config => {
        config.params = { ...config.params, apikey: this.apiKey };
        return config;
      });
    });
  }

  /**
   * Standard get method - returns raw API response
   *
   * For endpoints that return arrays, this will always return an array (possibly empty) for `data` when success is true.
   * For endpoints that return objects, data is returned as-is.
   */
  async get<T>(
    endpoint: string,
    version: 'v3' | 'v4' | 'stable' = 'v3',
    params?: Record<string, any>,
  ): Promise<APIResponse<T>> {
    const client = this.getClientForVersion(version);

    try {
      const response = await client.get(endpoint, { params });
      let data = response.data;
      // If T is an array type, always return an array (never undefined/null)
      if (Array.isArray(data) || data == null) {
        data = normalizeArrayResponse<T>(data);
      }
      return {
        success: true,
        data,
        error: null,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Unknown error occurred',
        status: error.response?.status || 500,
      };
    }
  }

  /**
   * Get method for single-object endpoints - unwraps single-item arrays
   *
   * For endpoints that return single objects, this will always return an object (possibly empty) for `data` when success is true.
   */
  async getSingle<T>(
    endpoint: string,
    version: 'v3' | 'v4' | 'stable' = 'v3',
    params?: Record<string, any>,
  ): Promise<APIResponse<T>> {
    const client = this.getClientForVersion(version);

    try {
      const response = await client.get(endpoint, { params });
      const data = normalizeObjectResponse<T>(unwrapSingleObject(response.data));
      return {
        success: true,
        data,
        error: null,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
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

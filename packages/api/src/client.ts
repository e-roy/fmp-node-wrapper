import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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
  private client: AxiosInstance;
  private apiKey: string;
  private baseURL: string;

  constructor(config: FMPConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://financialmodelingprep.com/api/v3';

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add API key to all requests
    this.client.interceptors.request.use(config => {
      config.params = {
        ...config.params,
        apikey: this.apiKey,
      };
      return config;
    });
  }

  /**
   * Make a GET request to the API
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<UnwrappedAPIResponse<T>> {
    try {
      const response = await this.client.get(endpoint, { params });
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

  /**
   * Make a POST request to the API
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<UnwrappedAPIResponse<T>> {
    try {
      const response = await this.client.post(endpoint, data, config);
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

  /**
   * Get the underlying axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

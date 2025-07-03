import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { FMPConfig, APIResponse } from './types';

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
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<APIResponse<T>> {
    try {
      const response = await this.client.get(endpoint, { params });
      return {
        success: true,
        data: response.data,
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
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.client.post(endpoint, data, config);
      return {
        success: true,
        data: response.data,
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

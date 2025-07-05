import { BondList, CryptoList, ETFList, ForexList, MutualFundList, StockList } from '@/types/list';
import { FMPClient } from '../client';
import { APIResponse } from '../types';

export class ListEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get list of all stocks
   */
  async getStockList(): Promise<APIResponse<StockList[]>> {
    return this.client.get('/stock/list');
  }

  /**
   * Get list of all ETFs
   */
  async getETFList(): Promise<APIResponse<ETFList[]>> {
    return this.client.get('/etf/list');
  }

  /**
   * Get list of all mutual funds
   */
  async getMutualFundList(): Promise<APIResponse<MutualFundList[]>> {
    return this.client.get('/mutual-fund/list');
  }

  /**
   * Get list of all cryptocurrencies
   */
  async getCryptoList(): Promise<APIResponse<CryptoList[]>> {
    return this.client.get('/cryptocurrency');
  }

  /**
   * Get list of all forex pairs
   * Using the forex-specific endpoint
   */
  async getForexList(): Promise<APIResponse<ForexList[]>> {
    try {
      // Try the forex list endpoint first
      const response = await this.client.get('/forex-list');

      // If that doesn't work, try the general forex endpoint
      if (!response.success || !response.data) {
        const fallbackResponse = await this.client.get('/forex');
        return {
          ...fallbackResponse,
          data: Array.isArray(fallbackResponse.data)
            ? fallbackResponse.data
            : Array.isArray(fallbackResponse.data?.forexList)
              ? fallbackResponse.data.forexList
              : [],
        };
      }

      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.forexList)
            ? response.data.forexList
            : [],
      };
    } catch (error) {
      // If both endpoints fail, return empty array
      return {
        success: false,
        error: 'Failed to fetch forex pairs',
        status: 500,
        data: [],
      };
    }
  }

  /**
   * Get list of all bonds
   */
  async getBondList(): Promise<APIResponse<BondList[]>> {
    return this.client.get('/bond/list');
  }
}

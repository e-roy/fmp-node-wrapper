// Market endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  MarketHours,
  MarketPerformance,
  MarketSectorPerformance,
  MarketIndex,
  MarketIndexParams,
} from '../types/market';

export class MarketEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get market hours
   */
  async getMarketHours(): Promise<APIResponse<MarketHours>> {
    return this.client.get('/market-hours', 'v3');
  }

  /**
   * Get market performance
   */
  async getMarketPerformance(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/market-performance', 'v3');
  }

  /**
   * Get top gainers
   */
  async getGainers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/gainers', 'v3');
  }

  /**
   * Get top losers
   */
  async getLosers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/losers', 'v3');
  }

  /**
   * Get most active stocks
   */
  async getMostActive(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/most-active', 'v3');
  }

  /**
   * Get sector performance
   */
  async getSectorPerformance(): Promise<APIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance', 'v3');
  }

  /**
   * Get market indices
   */
  async getMarketIndex(params: MarketIndexParams = {}): Promise<APIResponse<MarketIndex[]>> {
    return this.client.get('/market-index', 'v3', params);
  }
}

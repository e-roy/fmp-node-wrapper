// Market endpoints for FMP API

import { FMPClient } from '../client';
import { APIResponse, QueryParams } from '../types/common';
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
    return this.client.get('/market-hours');
  }

  /**
   * Get market performance
   */
  async getMarketPerformance(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/market-performance');
  }

  /**
   * Get market gainers
   */
  async getGainers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/gainers');
  }

  /**
   * Get market losers
   */
  async getLosers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/losers');
  }

  /**
   * Get most active stocks
   */
  async getMostActive(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/most-active');
  }

  /**
   * Get sector performance
   */
  async getSectorPerformance(): Promise<APIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance');
  }

  /**
   * Get market index data
   */
  async getMarketIndex(params: MarketIndexParams = {}): Promise<APIResponse<MarketIndex[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;

    return this.client.get('/market-index', queryParams);
  }
}

// Market endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '../types/common';
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
  async getMarketHours(): Promise<UnwrappedAPIResponse<MarketHours>> {
    return this.client.get('/market-hours');
  }

  /**
   * Get market performance
   */
  async getMarketPerformance(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/market-performance');
  }

  /**
   * Get top gainers
   */
  async getGainers(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/gainers');
  }

  /**
   * Get top losers
   */
  async getLosers(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/losers');
  }

  /**
   * Get most active stocks
   */
  async getMostActive(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/most-active');
  }

  /**
   * Get sector performance
   */
  async getSectorPerformance(): Promise<UnwrappedAPIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance');
  }

  /**
   * Get market indices
   */
  async getMarketIndex(
    params: MarketIndexParams = {},
  ): Promise<UnwrappedAPIResponse<MarketIndex[]>> {
    return this.client.get('/market-index', params);
  }
}

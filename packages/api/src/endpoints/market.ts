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
    return this.client.get('/market-hours', 'v3');
  }

  /**
   * Get market performance
   */
  async getMarketPerformance(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/market-performance', 'v3');
  }

  /**
   * Get top gainers
   */
  async getGainers(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/gainers', 'v3');
  }

  /**
   * Get top losers
   */
  async getLosers(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/losers', 'v3');
  }

  /**
   * Get most active stocks
   */
  async getMostActive(): Promise<UnwrappedAPIResponse<MarketPerformance[]>> {
    return this.client.get('/most-active', 'v3');
  }

  /**
   * Get sector performance
   */
  async getSectorPerformance(): Promise<UnwrappedAPIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance', 'v3');
  }

  /**
   * Get market indices
   */
  async getMarketIndex(
    params: MarketIndexParams = {},
  ): Promise<UnwrappedAPIResponse<MarketIndex[]>> {
    return this.client.get('/market-index', 'v3', params);
  }
}

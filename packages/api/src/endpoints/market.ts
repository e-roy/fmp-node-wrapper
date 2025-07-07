// Market endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  MarketHours,
  MarketPerformance,
  MarketSectorPerformance,
  MarketIndex,
} from '@/types/market';

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
   * https://site.financialmodelingprep.com/developer/docs#market-biggest-gainers-market-overview
   * @returns The FMP Market Biggest Gainers endpoint provides a list of the stocks that have gained the most value on a given day. This information can be used by investors to identify stocks that are momentum and to potential investment opportunities.
   */
  async getGainers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/stock_market/gainers', 'v3');
  }

  /**
   * Get top losers
   * https://site.financialmodelingprep.com/developer/docs#market-biggest-losers-market-overview
   * @returns The FMP Market Biggest Losers endpoint provides a list of the stocks that have lost the most value on a given day. This information can be used by investors to identify stocks that are underperforming and to potential trading opportunities.
   */
  async getLosers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/stock_market/losers', 'v3');
  }

  /**
   * Get most active stocks
   */
  async getMostActive(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/stock_market/actives', 'v3');
  }

  /**
   * Get sector performance
   * https://site.financialmodelingprep.com/developer/docs#sector-performance-market-overview
   * @returns The FMP Sector Performance endpoint provides the performance of each sector of the stock market over a specified period of time. This information can be used by investors to identify sectors that are outperforming or underperforming the market.
   */
  async getSectorPerformance(): Promise<APIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance', 'v3');
  }

  /**
   * Get market indices
   * https://site.financialmodelingprep.com/developer/docs#market-index-market-overview
   * @returns The FMP Market Index endpoint provides a list of all the major stock market indices, such as the S&P 500, the Dow Jones Industrial Average, and the Nasdaq Composite Index. This information can be used by investors to track the performance of the overall stock market and to identify sectors and industries that are outperforming or underperforming the market.
   */
  async getMarketIndex(): Promise<APIResponse<MarketIndex[]>> {
    return this.client.get('/quotes/index', 'v3');
  }
}

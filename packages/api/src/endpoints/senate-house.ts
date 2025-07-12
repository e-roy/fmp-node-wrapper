// Senate and House trading endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  HouseTradingResponse,
  SenateHouseTradingParams,
  SenateHouseTradingRSSFeedParams,
  SenateHouseTradingByNameParams,
  SenateTradingResponse,
  SenateHouseTradingByNameResponse,
} from '@/types/senate-house';

export class SenateHouseEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get senate trading data only
   * https://site.financialmodelingprep.com/developer/docs#senate-trading
   * @param symbol - The stock symbol to get the senate trading data for
   * @returns Senate trading data only
   */
  async getSenateTrading(
    params: SenateHouseTradingParams,
  ): Promise<APIResponse<SenateTradingResponse[]>> {
    const { symbol } = params;
    return this.client.get(`/senate-trading`, 'v4', { symbol });
  }

  /** Get senate trading RSS feed
   * https://site.financialmodelingprep.com/developer/docs#senate-trading-rss-feed-senate
   * @param page - The page number to get
   * @returns Senate trading RSS feed
   */
  async getSenateTradingRSSFeed(
    params: SenateHouseTradingRSSFeedParams,
  ): Promise<APIResponse<SenateTradingResponse[]>> {
    const { page } = params;
    return this.client.get('/senate-trading-rss-feed', 'v4', { page });
  }

  /** Get Senate trades by name
   * https://site.financialmodelingprep.com/developer/docs/stable#senate-trading-by-name
   * @param name - The name of the senator to get the trades for
   * @returns Senate trades by name
   */
  async getSenateTradingByName(
    params: SenateHouseTradingByNameParams,
  ): Promise<APIResponse<SenateHouseTradingByNameResponse[]>> {
    const { name } = params;
    return this.client.get('/senate-trades-by-name', 'stable', { name });
  }

  /**
   * Get house trading data only
   * https://site.financialmodelingprep.com/developer/docs#house-disclosure
   * @param symbol - The stock symbol to get the house trading data for
   * @returns House trading data only
   */
  async getHouseTrading(
    params: SenateHouseTradingParams,
  ): Promise<APIResponse<HouseTradingResponse[]>> {
    const { symbol } = params;

    return this.client.get('/senate-disclosure', 'v4', { symbol });
  }

  /** Get house trading RSS feed
   * https://site.financialmodelingprep.com/developer/docs#house-disclosure-rss-feed-senate
   * @param page - The page number to get
   * @returns House trading RSS feed
   */
  async getHouseTradingRSSFeed(
    params: SenateHouseTradingRSSFeedParams,
  ): Promise<APIResponse<HouseTradingResponse[]>> {
    const { page } = params;
    return this.client.get('/senate-disclosure-rss-feed', 'v4', { page });
  }

  /** Get house trading by name
   * https://site.financialmodelingprep.com/developer/docs/stable#house-trading-by-name
   * @param name - The name of the representative to get the trades for
   * @returns House trading by name
   */
  async getHouseTradingByName(
    params: SenateHouseTradingByNameParams,
  ): Promise<APIResponse<SenateHouseTradingByNameResponse[]>> {
    const { name } = params;
    return this.client.get('/house-trades-by-name', 'stable', { name });
  }
}

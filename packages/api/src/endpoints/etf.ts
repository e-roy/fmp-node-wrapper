// ETF endpoints for FMP API

import { FMPClient } from '../client';
import { APIResponse, QueryParams } from '../types/common';
import {
  ETFQuote,
  ETFProfile,
  ETFHolding,
  ETFList,
  ETFQuoteParams,
  ETFProfileParams,
  ETFHoldersParams,
} from '../types/etf';

export class ETFEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time ETF quote
   */
  async getQuote(params: ETFQuoteParams): Promise<APIResponse<ETFQuote[]>> {
    return this.client.get(`/quote/${params.symbol}`);
  }

  /**
   * Get ETF profile
   */
  async getProfile(params: ETFProfileParams): Promise<APIResponse<ETFProfile[]>> {
    return this.client.get(`/profile/${params.symbol}`);
  }

  /**
   * Get ETF holdings
   */
  async getHoldings(params: ETFHoldersParams): Promise<APIResponse<ETFHolding[]>> {
    const queryParams: QueryParams = {};
    if (params.limit) queryParams.limit = params.limit;
    if (params.page) queryParams.page = params.page;

    return this.client.get(`/etf-holder/${params.symbol}`, queryParams);
  }

  /**
   * Get list of all ETFs
   */
  async getETFList(): Promise<APIResponse<ETFList[]>> {
    return this.client.get('/etf/list');
  }
}

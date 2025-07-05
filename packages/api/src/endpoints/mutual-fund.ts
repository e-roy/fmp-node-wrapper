// Mutual fund endpoints for FMP API

import { FMPClient } from '../client';
import { APIResponse, QueryParams } from '../types/common';
import {
  MutualFundQuote,
  MutualFundProfile,
  MutualFundHolding,
  MutualFundQuoteParams,
  MutualFundProfileParams,
  MutualFundHoldersParams,
} from '../types/mutual-fund';

export class MutualFundEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time mutual fund quote
   */
  async getQuote(params: MutualFundQuoteParams): Promise<APIResponse<MutualFundQuote[]>> {
    return this.client.get(`/quote/${params.symbol}`);
  }

  /**
   * Get mutual fund profile
   */
  async getProfile(params: MutualFundProfileParams): Promise<APIResponse<MutualFundProfile[]>> {
    return this.client.get(`/profile/${params.symbol}`);
  }

  /**
   * Get mutual fund holdings
   */
  async getHoldings(params: MutualFundHoldersParams): Promise<APIResponse<MutualFundHolding[]>> {
    const queryParams: QueryParams = {};
    if (params.limit) queryParams.limit = params.limit;
    if (params.page) queryParams.page = params.page;

    return this.client.get(`/mutual-fund-holder/${params.symbol}`, queryParams);
  }
}

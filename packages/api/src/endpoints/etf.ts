// ETF endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  ETFQuote,
  ETFProfile,
  ETFHolding,
  ETFQuoteParams,
  ETFProfileParams,
  ETFHoldersParams,
} from '@/types/etf';

export class ETFEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get ETF quote
   * @param params - Parameters for the ETF quote request
   * @returns ETF quote data
   */
  async getQuote(params: ETFQuoteParams): Promise<APIResponse<ETFQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get ETF profile
   * @param params - Parameters for the ETF profile request
   * @returns ETF profile data
   */
  async getProfile(params: ETFProfileParams): Promise<APIResponse<ETFProfile[]>> {
    return this.client.get('/profile', 'v3', params);
  }

  /**
   * Get ETF holdings
   */
  async getHoldings(params: ETFHoldersParams): Promise<APIResponse<ETFHolding[]>> {
    return this.client.get('/holdings', 'v3', params);
  }
}

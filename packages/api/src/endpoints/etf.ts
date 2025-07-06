// ETF endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '../types/common';
import {
  ETFQuote,
  ETFProfile,
  ETFHolding,
  ETFQuoteParams,
  ETFProfileParams,
  ETFHoldersParams,
} from '../types/etf';

export class ETFEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get ETF quote
   */
  async getQuote(params: ETFQuoteParams): Promise<UnwrappedAPIResponse<ETFQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get ETF profile
   */
  async getProfile(params: ETFProfileParams): Promise<UnwrappedAPIResponse<ETFProfile[]>> {
    return this.client.get('/profile', 'v3', params);
  }

  /**
   * Get ETF holdings
   */
  async getHoldings(params: ETFHoldersParams): Promise<UnwrappedAPIResponse<ETFHolding[]>> {
    return this.client.get('/holdings', 'v3', params);
  }
}

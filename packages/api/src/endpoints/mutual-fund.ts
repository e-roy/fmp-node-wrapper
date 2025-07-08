// Mutual fund endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '../types/common';
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
   * Get mutual fund quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in a future release.
   * @param params - Parameters for the mutual fund quote request
   * @returns Mutual fund quote data
   */
  async getQuote(params: MutualFundQuoteParams): Promise<APIResponse<MutualFundQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get mutual fund profile
   */
  async getProfile(params: MutualFundProfileParams): Promise<APIResponse<MutualFundProfile[]>> {
    return this.client.get('/profile', 'v3', params);
  }

  /**
   * Get mutual fund holdings
   */
  async getHoldings(params: MutualFundHoldersParams): Promise<APIResponse<MutualFundHolding[]>> {
    return this.client.get('/holdings', 'v3', params);
  }
}

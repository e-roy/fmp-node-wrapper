// Mutual fund endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '../types/common';
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
   */
  async getQuote(params: MutualFundQuoteParams): Promise<UnwrappedAPIResponse<MutualFundQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get mutual fund profile
   */
  async getProfile(
    params: MutualFundProfileParams,
  ): Promise<UnwrappedAPIResponse<MutualFundProfile[]>> {
    return this.client.get('/profile', 'v3', params);
  }

  /**
   * Get mutual fund holdings
   */
  async getHoldings(
    params: MutualFundHoldersParams,
  ): Promise<UnwrappedAPIResponse<MutualFundHolding[]>> {
    return this.client.get('/holdings', 'v3', params);
  }
}

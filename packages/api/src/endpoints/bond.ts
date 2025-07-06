// Bond endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse, HistoricalPriceResponse } from '../types/common';
import { BondQuote, BondQuoteParams } from '../types/bond';

export class BondEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get bond quote
   */
  async getQuote(params: BondQuoteParams): Promise<UnwrappedAPIResponse<BondQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get historical bond prices
   */
  async getHistoricalPrice({
    symbol,
    from,
    to,
  }: {
    symbol: string;
    from?: string;
    to?: string;
  }): Promise<UnwrappedAPIResponse<HistoricalPriceResponse>> {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, 'v3', params);
  }
}

// Bond endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import { BondQuote, BondQuoteParams } from '@/types/bond';
import { HistoricalPriceResponse } from '@/types/quote';

export class BondEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get bond quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in a future release.
   * @param params - Parameters for the bond quote request
   * @returns Bond quote data
   */
  async getQuote(params: BondQuoteParams): Promise<APIResponse<BondQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get historical bond prices
   * @deprecated Use `fmp.quote.getHistoricalPrice()` instead. This method will be removed in a future release.
   * @param symbol - The bond symbol to get the historical prices for
   * @param from - The start date to get the historical prices for
   * @param to - The end date to get the historical prices for
   * @returns Historical bond price data
   */
  async getHistoricalPrice({
    symbol,
    from,
    to,
  }: {
    symbol: string;
    from?: string;
    to?: string;
  }): Promise<APIResponse<HistoricalPriceResponse>> {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, 'v3', params);
  }
}

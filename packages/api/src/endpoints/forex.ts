// Forex endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, QueryParams, SymbolParams } from '@/types/common';
import { HistoricalPriceResponse } from '@/types/quote';
import { ForexQuote } from '@/types/forex';

export class ForexEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get forex quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in version 0.1.0.
   * @param params - Parameters for the forex quote request
   * @returns Forex quote data
   */
  async getQuote(params: SymbolParams): Promise<APIResponse<ForexQuote[]>> {
    console.warn(
      '⚠️  ForexEndpoints.getQuote() is deprecated. Use fmp.quote.getQuote() instead. This method will be removed in version 0.1.0.',
    );
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get historical forex prices
   * @deprecated Use `fmp.quote.getHistoricalPrice()` instead. This method will be removed in version 0.1.0.
   * @param symbol - The forex symbol to get the historical prices for
   * @param from - The start date to get the historical prices for
   * @param to - The end date to get the historical prices for
   * @returns Historical forex price data
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
    console.warn(
      '⚠️  ForexEndpoints.getHistoricalPrice() is deprecated. Use fmp.quote.getHistoricalPrice() instead. This method will be removed in version 0.1.0.',
    );
    const params: QueryParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, 'v3', params);
  }
}

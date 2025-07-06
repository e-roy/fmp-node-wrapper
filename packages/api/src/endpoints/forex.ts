// Forex endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse, HistoricalPriceResponse, QueryParams } from '../types/common';
import { ForexQuote, ForexQuoteParams } from '../types/forex';

export class ForexEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get forex quote
   */
  async getQuote(params: ForexQuoteParams): Promise<UnwrappedAPIResponse<ForexQuote[]>> {
    return this.client.get('/quote', params);
  }

  /**
   * Get historical forex prices
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
    const params: QueryParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, params);
  }

  /**
   * Get forex rates for a specific base currency
   */
  async getForexRates(
    baseCurrency: string = 'USD',
  ): Promise<UnwrappedAPIResponse<Record<string, number>>> {
    return this.client.get(`/forex/${baseCurrency}`);
  }

  /**
   * Get all forex rates
   */
  async getAllForexRates(): Promise<UnwrappedAPIResponse<Record<string, Record<string, number>>>> {
    return this.client.get('/forex');
  }
}

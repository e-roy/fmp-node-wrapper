// Forex endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, HistoricalPriceResponse, QueryParams } from '@/types/common';
import { ForexQuote, ForexQuoteParams } from '@/types/forex';

export class ForexEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get forex quote
   * @param params - Parameters for the forex quote request
   * @returns Forex quote data
   */
  async getQuote(params: ForexQuoteParams): Promise<APIResponse<ForexQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get historical forex prices
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
    const params: QueryParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, 'v3', params);
  }

  /**
   * Get forex rates for a specific base currency
   * @param baseCurrency - The base currency to get forex rates for
   * @returns Forex rates data
   */
  async getForexRates(baseCurrency: string = 'USD'): Promise<APIResponse<Record<string, number>>> {
    return this.client.get(`/forex/${baseCurrency}`, 'v3');
  }

  /**
   * Get all forex rates
   * @returns All forex rates data
   */
  async getAllForexRates(): Promise<APIResponse<Record<string, Record<string, number>>>> {
    return this.client.get('/forex', 'v3');
  }
}

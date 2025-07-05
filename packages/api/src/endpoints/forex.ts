// Forex endpoints for FMP API

import { FMPClient } from '../client';
import { APIResponse, HistoricalPriceResponse, QueryParams } from '../types/common';
import { ForexQuote, ForexQuoteParams, ForexHistoricalParams } from '../types/forex';

export class ForexEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time forex quote
   */
  async getQuote(params: ForexQuoteParams): Promise<APIResponse<ForexQuote[]>> {
    return this.client.get(`/quote/${params.symbol}`);
  }

  /**
   * Get historical forex data
   */
  async getHistoricalPrice(
    params: ForexHistoricalParams,
  ): Promise<APIResponse<HistoricalPriceResponse>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.timeseries) queryParams.timeseries = params.timeseries;

    return this.client.get(`/historical-price-full/${params.symbol}`, queryParams);
  }

  /**
   * Get forex rates for a specific currency
   */
  async getForexRates(baseCurrency: string = 'USD'): Promise<APIResponse<Record<string, number>>> {
    return this.client.get(`/forex/${baseCurrency}`);
  }

  /**
   * Get forex rates for all currencies
   */
  async getAllForexRates(): Promise<APIResponse<Record<string, Record<string, number>>>> {
    return this.client.get('/forex');
  }
}

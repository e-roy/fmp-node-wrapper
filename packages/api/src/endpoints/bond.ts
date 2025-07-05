// Bond endpoints for FMP API

import { FMPClient } from '../client';
import { APIResponse, HistoricalPriceResponse, QueryParams } from '../types/common';
import { BondQuote, BondQuoteParams, BondHistoricalParams } from '../types/bond';

export class BondEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time bond quote
   */
  async getQuote(params: BondQuoteParams): Promise<APIResponse<BondQuote[]>> {
    return this.client.get(`/quote/${params.symbol}`);
  }

  /**
   * Get historical bond data
   */
  async getHistoricalPrice(
    params: BondHistoricalParams,
  ): Promise<APIResponse<HistoricalPriceResponse>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.timeseries) queryParams.timeseries = params.timeseries;

    return this.client.get(`/historical-price-full/${params.symbol}`, queryParams);
  }
}

// Cryptocurrency endpoints for FMP API

import { FMPClient } from '../client';
import {
  APIResponse,
  HistoricalPriceResponse,
  QueryParams,
} from '../types/common';
import {
  CryptoQuote,
  CryptoCurrency,
  CryptoQuoteParams,
  CryptoHistoricalParams,
} from '../types/crypto';

export class CryptoEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time crypto quote
   */
  async getQuote(
    params: CryptoQuoteParams
  ): Promise<APIResponse<CryptoQuote[]>> {
    return this.client.get(`/quote/${params.symbol}`);
  }

  /**
   * Get historical crypto data
   */
  async getHistoricalPrice(
    params: CryptoHistoricalParams
  ): Promise<APIResponse<HistoricalPriceResponse>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.timeseries) queryParams.timeseries = params.timeseries;

    return this.client.get(
      `/historical-price-full/${params.symbol}`,
      queryParams
    );
  }

  /**
   * Get list of all cryptocurrencies
   */
  async getCryptoList(): Promise<APIResponse<CryptoCurrency[]>> {
    return this.client.get('/cryptocurrency');
  }
}

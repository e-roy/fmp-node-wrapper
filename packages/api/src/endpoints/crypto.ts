// Cryptocurrency endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, HistoricalPriceResponse } from '@/types/common';
import { CryptoQuote, CryptoQuoteParams } from '@/types/crypto';

export class CryptoEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get crypto quote
   * @param params - Parameters for the crypto quote request
   * @returns Crypto quote data
   */
  async getQuote(params: CryptoQuoteParams): Promise<APIResponse<CryptoQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get historical crypto prices
   * @param symbol - The crypto symbol to get the historical prices for
   * @param from - The start date to get the historical prices for
   * @param to - The end date to get the historical prices for
   * @returns Historical crypto price data
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

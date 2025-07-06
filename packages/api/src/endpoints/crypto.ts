// Cryptocurrency endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse, HistoricalPriceResponse } from '../types/common';
import { CryptoQuote, CryptoQuoteParams } from '../types/crypto';

export class CryptoEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get crypto quote
   */
  async getQuote(params: CryptoQuoteParams): Promise<UnwrappedAPIResponse<CryptoQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get historical crypto prices
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

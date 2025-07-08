// Cryptocurrency endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, DateRangeParams } from '@/types/common';
import { HistoricalPriceResponse } from '@/types/quote';
import { CryptoQuote } from '@/types/crypto';

export class CryptoEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get crypto quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in version 0.1.0.
   * @param symbol - The crypto symbol to get the quote for
   * @returns Crypto quote data
   */
  async getQuote({ symbol }: { symbol: string }): Promise<APIResponse<CryptoQuote | null>> {
    console.warn(
      '⚠️  CryptoEndpoints.getQuote() is deprecated. Use fmp.quote.getQuote() instead. This method will be removed in version 0.1.0.',
    );
    return this.client.getSingle(`/quote/${symbol}`, 'v3');
  }

  /**
   * Get historical crypto prices
   * @deprecated Use `fmp.quote.getHistoricalPrice()` instead. This method will be removed in version 0.1.0.
   * @param symbol - The crypto symbol to get the historical prices for
   * @param from - The start date to get the historical prices for
   * @param to - The end date to get the historical prices for
   * @returns Provides daily price data for all cryptocurrencies that are traded on exchanges around the world.
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
      '⚠️  CryptoEndpoints.getHistoricalPrice() is deprecated. Use fmp.quote.getHistoricalPrice() instead. This method will be removed in version 0.1.0.',
    );
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.getSingle(`/historical-price-full/${symbol}`, 'v3', params);
  }
}

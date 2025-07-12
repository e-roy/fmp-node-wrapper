// Unified quote endpoints for FMP API - handles stocks, crypto, forex, commodities, and ETFs

import { FMPClient } from '@/client';
import { APIResponse, DateRangeParams } from '@/types/common';
import {
  Quote,
  QuoteParams,
  HistoricalPriceParams,
  HistoricalPriceResponse,
  HistoricalPriceData,
  IntradayParams,
} from '@/types/quote';

export class QuoteEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get quote for any asset type (stock, crypto, forex, commodity, ETF)
   * @param params - Parameters for the quote request
   * @returns Quote data for the specified asset
   */
  async getQuote(params: QuoteParams): Promise<APIResponse<Quote>> {
    const { symbol } = params;

    // All asset types use the same /quote/{symbol} endpoint
    return this.client.getSingle(`/quote/${symbol}`, 'v3');
  }

  /**
   * Get historical prices for any asset type
   * @param params - Parameters for the historical price request
   * @returns Historical price data for the specified asset
   */
  async getHistoricalPrice(
    params: HistoricalPriceParams,
  ): Promise<APIResponse<HistoricalPriceResponse>> {
    const { symbol, from, to } = params;

    const queryParams: DateRangeParams = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this.client.getSingle(`/historical-price-full/${symbol}`, 'v3', queryParams);
  }

  /**
   * Get multiple quotes for any asset type
   * @param symbols - Array of symbols to get quotes for
   * @returns Array of quote data
   */
  async getQuotes(symbols: string[]): Promise<APIResponse<Quote[]>> {
    const symbolsParam = symbols.join(',');
    return this.client.get(`/quote/${symbolsParam}`, 'v3');
  }

  /**
   * Get intraday data for any asset type
   * @param params - Parameters for the intraday request
   * @returns Intraday price data for the specified asset
   */
  async getIntraday(params: IntradayParams): Promise<APIResponse<HistoricalPriceData[]>> {
    const { symbol, interval, from, to } = params;

    const queryParams: DateRangeParams = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this.client.get(`/historical-chart/${interval}/${symbol}`, 'v3', queryParams);
  }
}

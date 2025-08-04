// Unified quote endpoints for FMP API - handles stocks, crypto, forex, commodities, and ETFs

import { FMPClient } from '@/client';
import { APIResponse, Quote, HistoricalPriceResponse, HistoricalPriceData } from '@fmp/types';

export class QuoteEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time quote data for any asset type (stocks, crypto, forex, commodities, ETFs)
   *
   * This endpoint provides current market data including price, volume, market cap, and key metrics.
   * Works with any valid symbol across all supported asset classes.
   *
   * @param symbol - The trading symbol (e.g., 'AAPL', 'BTCUSD', 'EURUSD', 'GCUSD', 'SPY')
   *
   * @returns Promise resolving to quote data with current price, volume, market cap, and performance metrics
   *
   * @example
   * ```typescript
   * // Get stock quote
   * const aaplQuote = await fmp.quote.getQuote('AAPL');
   *
   * // Get crypto quote
   * const btcQuote = await fmp.quote.getQuote('BTCUSD');
   *
   * // Get forex quote
   * const eurQuote = await fmp.quote.getQuote('EURUSD');
   * ```
   */
  async getQuote(symbol: string): Promise<APIResponse<Quote>> {
    // All asset types use the same /quote/{symbol} endpoint
    return this.client.getSingle(`/quote/${symbol}`, 'v3');
  }

  /**
   * Get historical price data for any asset type with customizable date range
   *
   * Retrieves daily OHLCV (Open, High, Low, Close, Volume) data for the specified symbol.
   * Data includes adjusted close prices, volume, and percentage changes.
   *
   * @param params - Historical price request parameters
   * @param params.symbol - The trading symbol to get historical data for
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to 1 year ago)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to today)
   *
   * @returns Promise resolving to historical price data with daily OHLCV information
   *
   * @example
   * ```typescript
   * // Get last year's data
   * const history = await fmp.quote.getHistoricalPrice({
   *   symbol: 'AAPL',
   *   from: '2023-01-01',
   *   to: '2023-12-31'
   * });
   *
   * // Get recent data (last 30 days)
   * const recent = await fmp.quote.getHistoricalPrice({
   *   symbol: 'BTCUSD',
   *   from: '2024-01-01'
   * });
   * ```
   */
  async getHistoricalPrice(params: {
    symbol: string;
    from?: string;
    to?: string;
  }): Promise<APIResponse<HistoricalPriceResponse>> {
    const { symbol, from, to } = params;

    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this.client.getSingle(`/historical-price-full/${symbol}`, 'v3', queryParams);
  }

  /**
   * Get real-time quotes for multiple symbols in a single request
   *
   * Efficiently retrieve quote data for multiple assets across different asset classes.
   * Useful for portfolio tracking, market monitoring, or batch data collection.
   *
   * @param symbols - Array of trading symbols to get quotes for
   *
   * @returns Promise resolving to an array of quote data for all requested symbols
   *
   * @example
   * ```typescript
   * // Get quotes for a mixed portfolio
   * const quotes = await fmp.quote.getQuotes([
   *   'AAPL',    // Stock
   *   'BTCUSD',  // Crypto
   *   'EURUSD',  // Forex
   *   'SPY'      // ETF
   * ]);
   *
   * // Get quotes for tech stocks
   * const techQuotes = await fmp.quote.getQuotes([
   *   'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'
   * ]);
   * ```
   */
  async getQuotes(symbols: string[]): Promise<APIResponse<Quote[]>> {
    const symbolsParam = symbols.join(',');
    return this.client.get(`/quote/${symbolsParam}`, 'v3');
  }

  /**
   * Get intraday price data with customizable time intervals
   *
   * Retrieves intraday OHLCV data at specified intervals (1min to 4hour).
   * Perfect for technical analysis, day trading, or short-term price monitoring.
   *
   * @param params - Intraday request parameters
   * @param params.symbol - The trading symbol to get intraday data for
   * @param params.interval - Time interval: '1min', '5min', '15min', '30min', '1hour', or '4hour'
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   *
   * @returns Promise resolving to intraday price data with OHLCV information at specified intervals
   *
   * @example
   * ```typescript
   * // Get 5-minute intraday data for today
   * const intraday = await fmp.quote.getIntraday({
   *   symbol: 'AAPL',
   *   interval: '5min',
   *   from: '2024-01-15'
   * });
   *
   * // Get 1-hour data for crypto
   * const cryptoIntraday = await fmp.quote.getIntraday({
   *   symbol: 'BTCUSD',
   *   interval: '1hour',
   *   from: '2024-01-10',
   *   to: '2024-01-15'
   * });
   * ```
   */
  async getIntraday(params: {
    symbol: string;
    interval: '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';
    from?: string;
    to?: string;
  }): Promise<APIResponse<HistoricalPriceData[]>> {
    const { symbol, interval, from, to } = params;

    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this.client.get(`/historical-chart/${interval}/${symbol}`, 'v3', queryParams);
  }
}

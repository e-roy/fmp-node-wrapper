// Aftermarket (extended-hours) endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, AftermarketTrade, AftermarketQuote } from 'fmp-node-types';

export class AftermarketEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get the latest extended-hours (pre/post-market) trade for a symbol
   *
   * Returns the most recent aftermarket trade including price, trade size, and
   * timestamp. Useful for tracking price action outside regular trading hours.
   *
   * @param symbol - The stock symbol (e.g., 'AAPL')
   *
   * @returns Promise resolving to the latest aftermarket trade
   *
   * @example
   * ```typescript
   * const trade = await fmp.aftermarket.getTrade('AAPL');
   * console.log(`Last aftermarket trade: $${trade.data.price} x ${trade.data.tradeSize}`);
   * ```
   */
  async getTrade(symbol: string): Promise<APIResponse<AftermarketTrade>> {
    return this.client.getSingle('/aftermarket-trade', 'stable', { symbol });
  }

  /**
   * Get the latest extended-hours (pre/post-market) bid/ask quote for a symbol
   *
   * Returns the most recent aftermarket quote including bid/ask prices and sizes,
   * volume, and timestamp. Useful for monitoring extended-hours liquidity.
   *
   * @param symbol - The stock symbol (e.g., 'AAPL')
   *
   * @returns Promise resolving to the latest aftermarket quote
   *
   * @example
   * ```typescript
   * const quote = await fmp.aftermarket.getQuote('AAPL');
   * console.log(`Bid ${quote.data.bidPrice} / Ask ${quote.data.askPrice}`);
   * ```
   */
  async getQuote(symbol: string): Promise<APIResponse<AftermarketQuote>> {
    return this.client.getSingle('/aftermarket-quote', 'stable', { symbol });
  }
}

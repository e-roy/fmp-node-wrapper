// Mutual fund endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, MutualFundHolding } from 'fmp-node-types';

export class MutualFundEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get mutual fund holders of a specific stock
   *
   * Provides data on mutual funds that hold shares in a specific stock.
   * Essential for understanding mutual fund ownership patterns and
   * which mutual funds are invested in particular companies.
   *
   * @param symbol - The stock symbol to get mutual fund holders for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   *
   * @returns Promise resolving to array of mutual fund holders with position details
   *
   * @example
   * ```typescript
   * // Get mutual funds that hold Apple stock
   * const appleHolders = await fmp.mutualFund.getHolders('AAPL');
   * console.log(`${appleHolders.data.length} mutual funds hold AAPL`);
   *
   * appleHolders.data.forEach((holder, index) => {
   *   console.log(`${index + 1}. ${holder.holder}`);
   *   console.log(`   Shares: ${holder.shares?.toLocaleString() || 'N/A'}`);
   *   console.log(`   Weight: ${holder.weightPercent}% | Change: ${holder.change}`);
   * });
   *
   * // Get mutual funds that hold Microsoft stock
   * const msftHolders = await fmp.mutualFund.getHolders('MSFT');
   *
   * // Find top mutual fund holders by shares
   * const topHolders = msftHolders.data
   *   .sort((a, b) => (b.shares || 0) - (a.shares || 0))
   *   .slice(0, 10);
   * console.log('Top 10 mutual fund holders by shares:');
   * topHolders.forEach((holder, index) => {
   *   console.log(`${index + 1}. ${holder.holder}: ${holder.shares.toLocaleString()} shares`);
   * });
   *
   * // Get mutual funds that hold Google stock
   * const googlHolders = await fmp.mutualFund.getHolders('GOOGL');
   *
   * // Analyze mutual fund concentration
   * const totalShares = googlHolders.data.reduce((sum, holder) => sum + (holder.shares || 0), 0);
   * console.log(`Total shares held by mutual funds: ${totalShares.toLocaleString()}`);
   *
   * googlHolders.data.forEach(holder => {
   *   const percentage = ((holder.shares || 0) / totalShares * 100).toFixed(2);
   *   console.log(`${holder.holder}: ${percentage}% of total mutual fund holdings`);
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#mutual-fund-holder-mutual-funds-holdings|FMP Mutual Fund Holders Documentation}
   */
  async getHolders(symbol: string): Promise<APIResponse<MutualFundHolding[]>> {
    return this.client.get(`/mutual-fund-holder/${symbol}`, 'v3');
  }
}

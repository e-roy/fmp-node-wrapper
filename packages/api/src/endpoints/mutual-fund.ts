// Mutual fund endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import { MutualFundHolding } from '@/types/mutual-fund';

export class MutualFundEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get mutual fund holdings and portfolio composition
   *
   * Provides detailed information about a mutual fund's holdings including
   * individual stocks, bonds, and other securities in the fund's portfolio.
   * Essential for understanding fund composition, sector allocation, and
   * individual security exposure within mutual funds.
   *
   * @param symbol - The mutual fund symbol to get holdings for (e.g., 'VFINX', 'VTSMX', 'FAGIX')
   *
   * @returns Promise resolving to array of mutual fund holdings with security details and weights
   *
   * @example
   * ```typescript
   * // Get Vanguard 500 Index Fund holdings
   * const vfinxHoldings = await fmp.mutualFund.getHolders('VFINX');
   * console.log(`VFINX has ${vfinxHoldings.data.length} holdings`);
   *
   * vfinxHoldings.data.forEach((holding, index) => {
   *   console.log(`${index + 1}. ${holding.asset} (${holding.symbol})`);
   *   console.log(`   Weight: ${holding.weight}% | Shares: ${holding.shares?.toLocaleString() || 'N/A'}`);
   *   console.log(`   Market Value: $${holding.marketValue?.toLocaleString() || 'N/A'}`);
   * });
   *
   * // Get Vanguard Total Stock Market Fund holdings
   * const vtsmxHoldings = await fmp.mutualFund.getHolders('VTSMX');
   *
   * // Find top holdings by weight
   * const topHoldings = vtsmxHoldings.data
   *   .sort((a, b) => (b.weight || 0) - (a.weight || 0))
   *   .slice(0, 10);
   * console.log('Top 10 holdings by weight:');
   * topHoldings.forEach((holding, index) => {
   *   console.log(`${index + 1}. ${holding.asset}: ${holding.weight}%`);
   * });
   *
   * // Get Fidelity Growth Fund holdings
   * const fagixHoldings = await fmp.mutualFund.getHolders('FAGIX');
   *
   * // Analyze sector exposure
   * const sectorBreakdown = fagixHoldings.data.reduce((acc, holding) => {
   *   const sector = holding.sector || 'Unknown';
   *   acc[sector] = (acc[sector] || 0) + (holding.weight || 0);
   *   return acc;
   * }, {} as Record<string, number>);
   *
   * console.log('Sector breakdown:');
   * Object.entries(sectorBreakdown)
   *   .sort(([,a], [,b]) => b - a)
   *   .forEach(([sector, weight]) => {
   *     console.log(`${sector}: ${weight.toFixed(2)}%`);
   *   });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#mutual-fund-holder-mutual-funds-holdings|FMP Mutual Fund Holdings Documentation}
   */
  async getHolders(symbol: string): Promise<APIResponse<MutualFundHolding[]>> {
    return this.client.get(`/mutual-fund-holder/${symbol}`, 'v3');
  }
}

// Valuation endpoints for FMP API (discounted cash flow + company ratings)

import { FMPClient } from '@/client';
import { APIResponse, DCFValuation, CompanyRating } from 'fmp-node-types';

export class ValuationEndpoints {
  constructor(private client: FMPClient) {}

  /** Get the discounted-cash-flow (DCF) fair-value estimate for a company. */
  async getDiscountedCashFlow(params: { symbol: string }): Promise<APIResponse<DCFValuation>> {
    return this.client.getSingle('/discounted-cash-flow', 'stable', { symbol: params.symbol });
  }

  /** Get FMP's current rating/score snapshot for a company. */
  async getRatingSnapshot(params: { symbol: string }): Promise<APIResponse<CompanyRating>> {
    return this.client.getSingle('/ratings-snapshot', 'stable', { symbol: params.symbol });
  }

  /** Get FMP's historical ratings for a company. */
  async getHistoricalRating(params: {
    symbol: string;
    limit?: number;
  }): Promise<APIResponse<CompanyRating[]>> {
    const { symbol, limit } = params;
    return this.client.get('/ratings-historical', 'stable', { symbol, limit });
  }
}

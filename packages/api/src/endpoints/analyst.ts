// Analyst endpoints for FMP API

import { FMPClient } from '@/client';
import {
  APIResponse,
  AnalystEstimate,
  PriceTargetConsensus,
  PriceTargetSummary,
  StockGrade,
  GradesConsensus,
} from 'fmp-node-types';

export class AnalystEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get analyst estimates (revenue, EBITDA, net income, EPS) for a company.
   *
   * @param params.symbol - Stock symbol
   * @param params.period - 'annual' or 'quarter' (optional)
   * @param params.limit - Max number of periods (optional)
   */
  async getEstimates(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<AnalystEstimate[]>> {
    // `stable` /analyst-estimates returns 400 without a period, so default it.
    const { symbol, period = 'annual', limit } = params;
    return this.client.get('/analyst-estimates', 'stable', { symbol, period, limit });
  }

  /** Get the analyst price-target consensus (high/low/consensus/median) for a company. */
  async getPriceTargetConsensus(params: {
    symbol: string;
  }): Promise<APIResponse<PriceTargetConsensus>> {
    return this.client.getSingle('/price-target-consensus', 'stable', { symbol: params.symbol });
  }

  /** Get a summary of analyst price targets over recent periods for a company. */
  async getPriceTargetSummary(params: {
    symbol: string;
  }): Promise<APIResponse<PriceTargetSummary>> {
    return this.client.getSingle('/price-target-summary', 'stable', { symbol: params.symbol });
  }

  /** Get analyst grades (upgrades/downgrades) for a company. */
  async getGrades(params: { symbol: string }): Promise<APIResponse<StockGrade[]>> {
    return this.client.get('/grades', 'stable', { symbol: params.symbol });
  }

  /**
   * Get the analyst rating consensus for a company: the count of analysts at each
   * rating (strongBuy/buy/hold/sell/strongSell) plus the overall consensus label.
   */
  async getGradesConsensus(params: { symbol: string }): Promise<APIResponse<GradesConsensus>> {
    return this.client.getSingle('/grades-consensus', 'stable', { symbol: params.symbol });
  }
}

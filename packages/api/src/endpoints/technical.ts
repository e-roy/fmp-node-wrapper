// Technical indicator endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, TechnicalIndicator } from 'fmp-node-types';

export type TechnicalIndicatorType =
  | 'sma'
  | 'ema'
  | 'wma'
  | 'dema'
  | 'tema'
  | 'rsi'
  | 'standardDeviation'
  | 'williams'
  | 'adx';

export type TechnicalTimeframe =
  | '1min'
  | '5min'
  | '15min'
  | '30min'
  | '1hour'
  | '4hour'
  | '1day'
  | '1week'
  | '1month';

export class TechnicalEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get a technical indicator series for a symbol.
   *
   * @param params.symbol - Stock/ETF symbol
   * @param params.type - Indicator type (sma, ema, rsi, ...)
   * @param params.periodLength - Lookback period for the indicator (e.g. 10)
   * @param params.timeframe - Bar timeframe (e.g. '1day')
   */
  async getTechnicalIndicator(params: {
    symbol: string;
    type: TechnicalIndicatorType;
    periodLength: number;
    timeframe: TechnicalTimeframe;
  }): Promise<APIResponse<TechnicalIndicator[]>> {
    const { symbol, type, periodLength, timeframe } = params;
    return this.client.get(`/technical-indicators/${type}`, 'stable', {
      symbol,
      periodLength,
      timeframe,
    });
  }
}

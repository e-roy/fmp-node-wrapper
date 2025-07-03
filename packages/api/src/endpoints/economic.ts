// Economic endpoints for FMP API

import { FMPClient } from '../client';
import { APIResponse, QueryParams } from '../types/common';
import {
  TreasuryRate,
  FederalFundsRate,
  CPI,
  GDP,
  Unemployment,
  TreasuryRateParams,
  FederalFundsRateParams,
  CPIParams,
  GDPParams,
  UnemploymentParams,
} from '../types/economic';

export class EconomicEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get treasury rates
   */
  async getTreasuryRates(params: TreasuryRateParams = {}): Promise<APIResponse<TreasuryRate[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;

    return this.client.get('/treasury-rates', queryParams);
  }

  /**
   * Get federal funds rate
   */
  async getFederalFundsRate(
    params: FederalFundsRateParams = {},
  ): Promise<APIResponse<FederalFundsRate[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;

    return this.client.get('/federal-funds-rate', queryParams);
  }

  /**
   * Get CPI data
   */
  async getCPI(params: CPIParams = {}): Promise<APIResponse<CPI[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;

    return this.client.get('/economic-indicator/cpi', queryParams);
  }

  /**
   * Get GDP data
   */
  async getGDP(params: GDPParams = {}): Promise<APIResponse<GDP[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;

    return this.client.get('/economic-indicator/gdp', queryParams);
  }

  /**
   * Get unemployment data
   */
  async getUnemployment(params: UnemploymentParams = {}): Promise<APIResponse<Unemployment[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;

    return this.client.get('/economic-indicator/unemployment', queryParams);
  }
}

// Economic endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  TreasuryRate,
  TreasuryRateParams,
  FederalFundsRate,
  FederalFundsRateParams,
  CPI,
  CPIParams,
  GDP,
  GDPParams,
  Unemployment,
  UnemploymentParams,
} from '@/types/economic';

export class EconomicEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get treasury rates
   */
  async getTreasuryRates(params: TreasuryRateParams = {}): Promise<APIResponse<TreasuryRate[]>> {
    return this.client.get('/treasury-rates', 'v3', params);
  }

  /**
   * Get federal funds rate
   */
  async getFederalFundsRate(
    params: FederalFundsRateParams = {},
  ): Promise<APIResponse<FederalFundsRate[]>> {
    return this.client.get('/federal-funds-rate', 'v3', params);
  }

  /**
   * Get CPI data
   */
  async getCPI(params: CPIParams = {}): Promise<APIResponse<CPI[]>> {
    return this.client.get('/economic/cpi', 'v3', params);
  }

  /**
   * Get GDP data
   */
  async getGDP(params: GDPParams = {}): Promise<APIResponse<GDP[]>> {
    return this.client.get('/economic/gdp', 'v3', params);
  }

  /**
   * Get unemployment data
   */
  async getUnemployment(params: UnemploymentParams = {}): Promise<APIResponse<Unemployment[]>> {
    return this.client.get('/economic/unemployment', 'v3', params);
  }
}

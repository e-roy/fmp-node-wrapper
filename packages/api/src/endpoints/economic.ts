// Economic endpoints for FMP API

import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '../types/common';
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
} from '../types/economic';

export class EconomicEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get treasury rates
   */
  async getTreasuryRates(
    params: TreasuryRateParams = {},
  ): Promise<UnwrappedAPIResponse<TreasuryRate[]>> {
    return this.client.get('/treasury-rates', params);
  }

  /**
   * Get federal funds rate
   */
  async getFederalFundsRate(
    params: FederalFundsRateParams = {},
  ): Promise<UnwrappedAPIResponse<FederalFundsRate[]>> {
    return this.client.get('/federal-funds-rate', params);
  }

  /**
   * Get CPI data
   */
  async getCPI(params: CPIParams = {}): Promise<UnwrappedAPIResponse<CPI[]>> {
    return this.client.get('/economic/cpi', params);
  }

  /**
   * Get GDP data
   */
  async getGDP(params: GDPParams = {}): Promise<UnwrappedAPIResponse<GDP[]>> {
    return this.client.get('/economic/gdp', params);
  }

  /**
   * Get unemployment data
   */
  async getUnemployment(
    params: UnemploymentParams = {},
  ): Promise<UnwrappedAPIResponse<Unemployment[]>> {
    return this.client.get('/economic/unemployment', params);
  }
}

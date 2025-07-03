import { FMPClient } from '../client';
import {
  APIResponse,
  FinancialStatement,
  FinancialStatementsParams,
  KeyMetrics,
  FinancialRatios,
  EnterpriseValue,
  KeyMetricsParams,
  FinancialRatiosParams,
  EnterpriseValueParams,
} from '../types';

export class FinancialEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get income statement
   */
  async getIncomeStatement({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<FinancialStatement[]>> {
    return this.client.get(`/income-statement/${symbol}?period=${period}&limit=${limit}`);
  }

  /**
   * Get balance sheet
   */
  async getBalanceSheet({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<FinancialStatement[]>> {
    return this.client.get(`/balance-sheet-statement/${symbol}?period=${period}&limit=${limit}`);
  }

  /**
   * Get cash flow statement
   */
  async getCashFlowStatement({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<FinancialStatement[]>> {
    return this.client.get(`/cash-flow-statement/${symbol}?period=${period}&limit=${limit}`);
  }

  /**
   * Get key metrics
   */
  async getKeyMetrics({
    symbol,
    period = 'annual',
    limit = 5,
  }: KeyMetricsParams): Promise<APIResponse<KeyMetrics[]>> {
    return this.client.get(`/key-metrics/${symbol}?period=${period}&limit=${limit}`);
  }

  /**
   * Get financial ratios
   */
  async getFinancialRatios({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialRatiosParams): Promise<APIResponse<FinancialRatios[]>> {
    return this.client.get(`/ratios/${symbol}?period=${period}&limit=${limit}`);
  }

  /**
   * Get enterprise value
   */
  async getEnterpriseValue({
    symbol,
    period = 'annual',
    limit = 5,
  }: EnterpriseValueParams): Promise<APIResponse<EnterpriseValue[]>> {
    return this.client.get(`/enterprise-value/${symbol}?period=${period}&limit=${limit}`);
  }
}

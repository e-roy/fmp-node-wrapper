import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '@/types';
import {
  FinancialStatement,
  FinancialStatementsParams,
  KeyMetrics,
  FinancialRatios,
  EnterpriseValue,
  KeyMetricsParams,
  FinancialRatiosParams,
  EnterpriseValueParams,
  CashflowGrowthParams,
  CashflowGrowth,
  IncomeGrowthParams,
  IncomeGrowth,
  BalanceSheetGrowthParams,
  BalanceSheetGrowth,
  FinancialGrowthParams,
  FinancialGrowth,
} from '@/types/financial';

export class FinancialEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get income statement
   */
  async getIncomeStatement({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<UnwrappedAPIResponse<FinancialStatement[]>> {
    return this.client.get(`/income-statement/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get balance sheet
   */
  async getBalanceSheet({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<UnwrappedAPIResponse<FinancialStatement[]>> {
    return this.client.get(
      `/balance-sheet-statement/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get cash flow statement
   */
  async getCashFlowStatement({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<UnwrappedAPIResponse<FinancialStatement[]>> {
    return this.client.get(`/cash-flow-statement/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get key metrics
   */
  async getKeyMetrics({
    symbol,
    period = 'annual',
    limit = 5,
  }: KeyMetricsParams): Promise<UnwrappedAPIResponse<KeyMetrics[]>> {
    return this.client.get(`/key-metrics/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get financial ratios
   */
  async getFinancialRatios({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialRatiosParams): Promise<UnwrappedAPIResponse<FinancialRatios[]>> {
    return this.client.get(`/ratios/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get enterprise value
   */
  async getEnterpriseValue({
    symbol,
    period = 'annual',
    limit = 5,
  }: EnterpriseValueParams): Promise<UnwrappedAPIResponse<EnterpriseValue[]>> {
    return this.client.get(`/enterprise-value/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get cashflow growth
   */
  async getCashflowGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: CashflowGrowthParams): Promise<UnwrappedAPIResponse<CashflowGrowth[]>> {
    return this.client.get(
      `/cash-flow-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   *  Get income growth
   */
  async getIncomeGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: IncomeGrowthParams): Promise<UnwrappedAPIResponse<IncomeGrowth[]>> {
    return this.client.get(
      `/income-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get balance sheet growth
   */
  async getBalanceSheetGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: BalanceSheetGrowthParams): Promise<UnwrappedAPIResponse<BalanceSheetGrowth[]>> {
    return this.client.get(
      `/balance-sheet-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get financial growth
   */
  async getFinancialGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialGrowthParams): Promise<UnwrappedAPIResponse<FinancialGrowth[]>> {
    return this.client.get(`/financial-growth/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }
}

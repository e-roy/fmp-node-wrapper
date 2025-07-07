import { APIResponse } from '@/types';
import { FMPClient } from '@/client';
import {
  FinancialStatementsParams,
  KeyMetrics,
  FinancialRatios,
  EnterpriseValue,
  CashflowGrowth,
  IncomeGrowth,
  BalanceSheetGrowth,
  FinancialGrowth,
  IncomeStatement,
  BalanceSheet,
  CashFlowStatement,
  EarningsSurprises,
  EarningsHistorical,
} from '@/types/financial';

export class FinancialEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get income statement
   * https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements
   * @param symbol - The stock symbol to get the income statement for
   * @param period - The period to get the income statement for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns FMP's Income Statement API provides access to real-time income statement data for a wide range of companies, including public companies, private companies, and ETFs. This data can be used to track a company's profitability over time, to compare a company to its competitors, and to identify trends in a company's business.
   */
  async getIncomeStatement({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<IncomeStatement[]>> {
    return this.client.get(`/income-statement/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get balance sheet
   * https://site.financialmodelingprep.com/developer/docs#balance-sheet-statements-financial-statements
   * @param symbol - The stock symbol to get the balance sheet for
   * @param period - The period to get the balance sheet for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns The balance sheet is a financial statement that displays a company's total assets, liabilities, and shareholder equity over a specific timeframe (quarterly or yearly). Investors can use this statement to determine if the company can fund its operations, meet its debt obligations, and pay a dividend.
   */
  async getBalanceSheet({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<BalanceSheet[]>> {
    return this.client.get(
      `/balance-sheet-statement/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get cash flow statement
   * https://site.financialmodelingprep.com/developer/docs#cashflow-statements-financial-statements
   * @param symbol - The stock symbol to get the cash flow statement for
   * @param period - The period to get the cash flow statement for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns The cash flow statement is a financial statement that highlights how cash moves through the company, including both cash inflows and outflows. This statement shows the cash flows in 3 main categories "Operating Cash Flows", "Investing Cash Flows", and "Financing Cash Flows", which help investors to understand if the company is making money or losing money by conducting business.
   */
  async getCashFlowStatement({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<CashFlowStatement[]>> {
    return this.client.get(`/cash-flow-statement/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get key metrics
   * https://site.financialmodelingprep.com/developer/docs#key-metrics-statement-analysis
   * @param symbol - The stock symbol to get the key metrics for
   * @param period - The period to get the key metrics for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Get key financial metrics for a company, including revenue, net income, and price-to-earnings ratio (P/E ratio). Assess a company's financial performance and compare it to its competitors.
   */
  async getKeyMetrics({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<KeyMetrics[]>> {
    return this.client.get(`/key-metrics/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get financial ratios
   * https://site.financialmodelingprep.com/developer/docs#ratios-statement-analysis
   * @param symbol - The stock symbol to get the financial ratios for
   * @param period - The period to get the financial ratios for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Get financial ratios for a company, such as the P/B ratio and the ROE. Assess a company's financial health and compare it to its competitors.
   */
  async getFinancialRatios({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<FinancialRatios[]>> {
    return this.client.get(`/ratios/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get enterprise value
   * https://site.financialmodelingprep.com/developer/docs#enterprise-values-statement-analysis
   * @param symbol - The stock symbol to get the enterprise value for
   * @param period - The period to get the enterprise value for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Get the enterprise value of a company, which is the total value of a company, including its equity and debt. Assess a company's overall value and compare it to its peers.
   */
  async getEnterpriseValue({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<EnterpriseValue[]>> {
    return this.client.get(`/enterprise-value/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get cashflow growth
   * https://site.financialmodelingprep.com/developer/docs#cashflow-growth-statement-analysis
   * @param symbol - The stock symbol to get the cashflow growth for
   * @param period - The period to get the cashflow growth for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Get the cash flow growth rate for a company. Measure how quickly a company's cash flow is growing.
   */
  async getCashflowGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<CashflowGrowth[]>> {
    return this.client.get(
      `/cash-flow-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   *  Get income growth
   * https://site.financialmodelingprep.com/developer/docs#income-growth-statement-analysis
   * @param symbol - The stock symbol to get the income growth for
   * @param period - The period to get the income growth for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Get the income growth rate for a company. Measure how quickly a company's income is growing.
   */
  async getIncomeGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<IncomeGrowth[]>> {
    return this.client.get(
      `/income-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get balance sheet growth
   * https://site.financialmodelingprep.com/developer/docs#balance-sheet-growth-statement-analysis
   * @param symbol - The stock symbol to get the balance sheet growth for
   * @param period - The period to get the balance sheet growth for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Get the balance sheet growth rate for a company. Measure how quickly a company's assets and liabilities are growing.
   */
  async getBalanceSheetGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<BalanceSheetGrowth[]>> {
    return this.client.get(
      `/balance-sheet-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get financial growth
   * https://site.financialmodelingprep.com/developer/docs#financial-growth-statement-analysis
   * @param symbol - The stock symbol to get the financial growth for
   * @param period - The period to get the financial growth for (annual or quarter)
   * @param limit - The number of periods to get
   * @returns Financial Growth Get the financial growth rate for a company. Measure how quickly a company's overall financial performance is improving.
   */
  async getFinancialGrowth({
    symbol,
    period = 'annual',
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<FinancialGrowth[]>> {
    return this.client.get(`/financial-growth/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get earnings historical
   * https://site.financialmodelingprep.com/developer/docs#earnings-historical-earnings
   * @param symbol - The stock symbol to get the earnings historical for
   * @param limit - The number of periods to get
   * @returns A list of historical & upcoming earnings announcements for a specific company, including the date, estimated EPS, and actual EPS.
   */
  async getEarningsHistorical({
    symbol,
    limit = 5,
  }: FinancialStatementsParams): Promise<APIResponse<EarningsHistorical[]>> {
    return this.client.get(`/historical/earning_calendar/${symbol}?limit=${limit}`, 'v3');
  }

  /**
   * Get earnings surprises
   * https://site.financialmodelingprep.com/developer/docs#earnings-surprises-earnings
   * @param symbol - The stock symbol to get the earnings surprises for
   * @param limit - The number of periods to get
   * @returns A list of earnings announcements for publicly traded companies that were either positive or negative surprises. This endpoint includes the date of the earnings announcement, the estimated EPS, the actual EPS, and the earnings surprise.
   */
  async getEarningsSurprises({
    symbol,
  }: FinancialStatementsParams): Promise<APIResponse<EarningsSurprises[]>> {
    return this.client.get(`/earnings-surprises/${symbol}`, 'v3');
  }
}

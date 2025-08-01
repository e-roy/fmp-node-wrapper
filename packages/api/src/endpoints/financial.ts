import { APIResponse } from '@/types/common';
import { FMPClient } from '@/client';
import {
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
   * Get income statement data
   *
   * Provides comprehensive income statement data including revenue, expenses,
   * net income, and earnings per share. Essential for analyzing company
   * profitability, revenue trends, and financial performance over time.
   *
   * @param params - Income statement request parameters
   * @param params.symbol - The stock symbol to get income statement for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of income statement data with financial metrics
   *
   * @example
   * ```typescript
   * // Get annual income statements for Apple
   * const incomeStatements = await fmp.financial.getIncomeStatement({ symbol: 'AAPL' });
   * incomeStatements.data.forEach(statement => {
   *   console.log(`${statement.date}: Revenue $${statement.revenue.toLocaleString()}, Net Income $${statement.netIncome.toLocaleString()}`);
   * });
   *
   * // Get quarterly income statements for Microsoft
   * const quarterlyIncome = await fmp.financial.getIncomeStatement({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements|FMP Income Statement Documentation}
   */
  async getIncomeStatement(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<IncomeStatement[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(`/income-statement/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get balance sheet data
   *
   * Provides comprehensive balance sheet data including assets, liabilities,
   * and shareholder equity. Essential for analyzing company financial position,
   * liquidity, and capital structure.
   *
   * @param params - Balance sheet request parameters
   * @param params.symbol - The stock symbol to get balance sheet for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of balance sheet data with financial position metrics
   *
   * @example
   * ```typescript
   * // Get annual balance sheets for Apple
   * const balanceSheets = await fmp.financial.getBalanceSheet({ symbol: 'AAPL' });
   * balanceSheets.data.forEach(sheet => {
   *   console.log(`${sheet.date}: Assets $${sheet.totalAssets.toLocaleString()}, Equity $${sheet.totalStockholdersEquity.toLocaleString()}`);
   * });
   *
   * // Get quarterly balance sheets for Microsoft
   * const quarterlyBalance = await fmp.financial.getBalanceSheet({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#balance-sheet-statements-financial-statements|FMP Balance Sheet Documentation}
   */
  async getBalanceSheet(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<BalanceSheet[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(
      `/balance-sheet-statement/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get cash flow statement data
   *
   * Provides comprehensive cash flow data including operating, investing,
   * and financing cash flows. Essential for analyzing company cash generation,
   * capital allocation, and financial sustainability.
   *
   * @param params - Cash flow statement request parameters
   * @param params.symbol - The stock symbol to get cash flow statement for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of cash flow statement data with cash flow metrics
   *
   * @example
   * ```typescript
   * // Get annual cash flow statements for Apple
   * const cashFlows = await fmp.financial.getCashFlowStatement({ symbol: 'AAPL' });
   * cashFlows.data.forEach(flow => {
   *   console.log(`${flow.date}: Operating CF $${flow.operatingCashFlow.toLocaleString()}, Free CF $${flow.freeCashFlow.toLocaleString()}`);
   * });
   *
   * // Get quarterly cash flow statements for Microsoft
   * const quarterlyCashFlow = await fmp.financial.getCashFlowStatement({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#cashflow-statements-financial-statements|FMP Cash Flow Statement Documentation}
   */
  async getCashFlowStatement(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<CashFlowStatement[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(`/cash-flow-statement/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get key financial metrics
   *
   * Provides essential financial metrics including revenue, net income,
   * P/E ratio, and other key performance indicators. Essential for
   * fundamental analysis and company valuation.
   *
   * @param params - Key metrics request parameters
   * @param params.symbol - The stock symbol to get key metrics for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of key metrics data with financial indicators
   *
   * @example
   * ```typescript
   * // Get key metrics for Apple
   * const keyMetrics = await fmp.financial.getKeyMetrics({ symbol: 'AAPL' });
   * keyMetrics.data.forEach(metric => {
   *   console.log(`${metric.date}: P/E ${metric.peRatio}, ROE ${metric.roe}%`);
   * });
   *
   * // Get quarterly key metrics for Microsoft
   * const quarterlyMetrics = await fmp.financial.getKeyMetrics({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#key-metrics-statement-analysis|FMP Key Metrics Documentation}
   */
  async getKeyMetrics(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<KeyMetrics[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(`/key-metrics/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get financial ratios
   *
   * Provides comprehensive financial ratios including P/B ratio, ROE,
   * debt-to-equity, and other important ratios. Essential for analyzing
   * company financial health and comparing with peers.
   *
   * @param params - Financial ratios request parameters
   * @param params.symbol - The stock symbol to get financial ratios for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of financial ratios data with ratio metrics
   *
   * @example
   * ```typescript
   * // Get financial ratios for Apple
   * const ratios = await fmp.financial.getFinancialRatios({ symbol: 'AAPL' });
   * ratios.data.forEach(ratio => {
   *   console.log(`${ratio.date}: P/B ${ratio.priceToBookRatio}, Debt/Equity ${ratio.debtToEquity}`);
   * });
   *
   * // Get quarterly ratios for Microsoft
   * const quarterlyRatios = await fmp.financial.getFinancialRatios({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#ratios-statement-analysis|FMP Financial Ratios Documentation}
   */
  async getFinancialRatios(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<FinancialRatios[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(`/ratios/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get enterprise value data
   *
   * Provides enterprise value metrics including total enterprise value,
   * market cap, and debt information. Essential for company valuation
   * and comparing companies with different capital structures.
   *
   * @param params - Enterprise value request parameters
   * @param params.symbol - The stock symbol to get enterprise value for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of enterprise value data with valuation metrics
   *
   * @example
   * ```typescript
   * // Get enterprise value for Apple
   * const enterpriseValue = await fmp.financial.getEnterpriseValue({ symbol: 'AAPL' });
   * enterpriseValue.data.forEach(ev => {
   *   console.log(`${ev.date}: EV $${ev.enterpriseValue.toLocaleString()}, Market Cap $${ev.marketCapitalization.toLocaleString()}`);
   * });
   *
   * // Get quarterly enterprise value for Microsoft
   * const quarterlyEV = await fmp.financial.getEnterpriseValue({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#enterprise-values-statement-analysis|FMP Enterprise Value Documentation}
   */
  async getEnterpriseValue(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<EnterpriseValue[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(`/enterprise-value/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get cash flow growth data
   *
   * Provides cash flow growth rates showing how quickly a company's
   * cash flows are growing over time. Essential for analyzing cash
   * generation trends and financial sustainability.
   *
   * @param params - Cash flow growth request parameters
   * @param params.symbol - The stock symbol to get cash flow growth for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of cash flow growth data with growth metrics
   *
   * @example
   * ```typescript
   * // Get cash flow growth for Apple
   * const cashFlowGrowth = await fmp.financial.getCashflowGrowth({ symbol: 'AAPL' });
   * cashFlowGrowth.data.forEach(growth => {
   *   console.log(`${growth.date}: Operating CF Growth ${growth.operatingCashFlowGrowth}%`);
   * });
   *
   * // Get quarterly cash flow growth for Microsoft
   * const quarterlyGrowth = await fmp.financial.getCashflowGrowth({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#cashflow-growth-statement-analysis|FMP Cash Flow Growth Documentation}
   */
  async getCashflowGrowth(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<CashflowGrowth[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(
      `/cash-flow-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get income growth data
   *
   * Provides income growth rates showing how quickly a company's
   * revenue and net income are growing over time. Essential for
   * analyzing profitability trends and business momentum.
   *
   * @param params - Income growth request parameters
   * @param params.symbol - The stock symbol to get income growth for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of income growth data with growth metrics
   *
   * @example
   * ```typescript
   * // Get income growth for Apple
   * const incomeGrowth = await fmp.financial.getIncomeGrowth({ symbol: 'AAPL' });
   * incomeGrowth.data.forEach(growth => {
   *   console.log(`${growth.date}: Revenue Growth ${growth.revenueGrowth}%, Net Income Growth ${growth.netIncomeGrowth}%`);
   * });
   *
   * // Get quarterly income growth for Microsoft
   * const quarterlyGrowth = await fmp.financial.getIncomeGrowth({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#income-growth-statement-analysis|FMP Income Growth Documentation}
   */
  async getIncomeGrowth(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<IncomeGrowth[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(
      `/income-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get balance sheet growth data
   *
   * Provides balance sheet growth rates showing how quickly a company's
   * assets, liabilities, and equity are growing over time. Essential for
   * analyzing capital structure trends and financial position changes.
   *
   * @param params - Balance sheet growth request parameters
   * @param params.symbol - The stock symbol to get balance sheet growth for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of balance sheet growth data with growth metrics
   *
   * @example
   * ```typescript
   * // Get balance sheet growth for Apple
   * const balanceSheetGrowth = await fmp.financial.getBalanceSheetGrowth({ symbol: 'AAPL' });
   * balanceSheetGrowth.data.forEach(growth => {
   *   console.log(`${growth.date}: Assets Growth ${growth.totalAssetsGrowth}%, Equity Growth ${growth.totalStockholdersEquityGrowth}%`);
   * });
   *
   * // Get quarterly balance sheet growth for Microsoft
   * const quarterlyGrowth = await fmp.financial.getBalanceSheetGrowth({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#balance-sheet-growth-statement-analysis|FMP Balance Sheet Growth Documentation}
   */
  async getBalanceSheetGrowth(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<BalanceSheetGrowth[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(
      `/balance-sheet-statement-growth/${symbol}?period=${period}&limit=${limit}`,
      'v3',
    );
  }

  /**
   * Get financial growth data
   *
   * Provides comprehensive financial growth rates across all key
   * financial metrics. Essential for analyzing overall financial
   * performance trends and business momentum.
   *
   * @param params - Financial growth request parameters
   * @param params.symbol - The stock symbol to get financial growth for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.period - The reporting period: 'annual' or 'quarter' (default: 'annual')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of financial growth data with comprehensive growth metrics
   *
   * @example
   * ```typescript
   * // Get financial growth for Apple
   * const financialGrowth = await fmp.financial.getFinancialGrowth({ symbol: 'AAPL' });
   * financialGrowth.data.forEach(growth => {
   *   console.log(`${growth.date}: Revenue Growth ${growth.revenueGrowth}%, EPS Growth ${growth.epsGrowth}%`);
   * });
   *
   * // Get quarterly financial growth for Microsoft
   * const quarterlyGrowth = await fmp.financial.getFinancialGrowth({ symbol: 'MSFT', period: 'quarter', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#financial-growth-statement-analysis|FMP Financial Growth Documentation}
   */
  async getFinancialGrowth(params: {
    symbol: string;
    period?: 'annual' | 'quarter';
    limit?: number;
  }): Promise<APIResponse<FinancialGrowth[]>> {
    const { symbol, period = 'annual', limit = 5 } = params;
    return this.client.get(`/financial-growth/${symbol}?period=${period}&limit=${limit}`, 'v3');
  }

  /**
   * Get historical earnings data
   *
   * Provides historical and upcoming earnings announcements including
   * dates, estimated EPS, and actual EPS. Essential for analyzing
   * earnings trends and tracking company performance.
   *
   * @param params - Earnings historical request parameters
   * @param params.symbol - The stock symbol to get earnings history for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params.limit - Number of periods to retrieve (default: 5)
   *
   * @returns Promise resolving to array of historical earnings data with announcement details
   *
   * @example
   * ```typescript
   * // Get earnings history for Apple
   * const earningsHistory = await fmp.financial.getEarningsHistorical({ symbol: 'AAPL', limit: 10 });
   * earningsHistory.data.forEach(earning => {
   *   console.log(`${earning.date}: Est. ${earning.estimatedEps}, Actual ${earning.actualEps}`);
   * });
   *
   * // Get earnings history for Microsoft
   * const msftEarnings = await fmp.financial.getEarningsHistorical({ symbol: 'MSFT', limit: 8 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#earnings-historical-earnings|FMP Earnings Historical Documentation}
   */
  async getEarningsHistorical(params: {
    symbol: string;
    limit?: number;
  }): Promise<APIResponse<EarningsHistorical[]>> {
    const { symbol, limit = 5 } = params;
    return this.client.get(`/historical/earning_calendar/${symbol}?limit=${limit}`, 'v3');
  }

  /**
   * Get earnings surprises data
   *
   * Provides earnings announcements that exceeded or fell short of
   * analyst estimates. Essential for analyzing earnings quality and
   * market reactions to earnings releases.
   *
   * @param symbol - The stock symbol to get earnings surprises for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   *
   * @returns Promise resolving to array of earnings surprises data with surprise details
   *
   * @example
   * ```typescript
   * // Get earnings surprises for Apple
   * const earningsSurprises = await fmp.financial.getEarningsSurprises('AAPL');
   * earningsSurprises.data.forEach(surprise => {
   *   console.log(`${surprise.date}: Est. ${surprise.estimatedEps}, Actual ${surprise.actualEps}, Surprise ${surprise.surprisePercentage}%`);
   * });
   *
   * // Get earnings surprises for Microsoft
   * const msftSurprises = await fmp.financial.getEarningsSurprises('MSFT');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#earnings-surprises-earnings|FMP Earnings Surprises Documentation}
   */
  async getEarningsSurprises(symbol: string): Promise<APIResponse<EarningsSurprises[]>> {
    return this.client.get(`/earnings-surprises/${symbol}`, 'v3');
  }
}

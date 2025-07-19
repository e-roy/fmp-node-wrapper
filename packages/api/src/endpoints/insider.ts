import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  InsiderTradingRSSResponse,
  InsiderTradingSearchResponse,
  TransactionTypesResponse,
  InsidersBySymbolResponse,
  InsiderTradeStatisticsResponse,
  CikMapperResponse,
  CikMapperBySymbolResponse,
  BeneficialOwnershipResponse,
  FailToDeliverResponse,
  TransactionType,
} from '@/types/insider';

export class InsiderEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get insider trading RSS feed data
   *
   * Provides real-time RSS feed of insider trading activities across all
   * publicly traded companies. Essential for monitoring insider trading
   * patterns, corporate governance, and potential market-moving events.
   *
   * @param params - RSS feed request parameters
   * @param params.page - Page number for pagination (default: 0)
   *
   * @returns Promise resolving to array of insider trading RSS feed data
   *
   * @example
   * ```typescript
   * // Get first page of insider trading RSS feed
   * const rssFeed = await fmp.insider.getInsiderTradingRSS({ page: 0 });
   * rssFeed.data.forEach(trade => {
   *   console.log(`${trade.date}: ${trade.symbol} - ${trade.insiderName} ${trade.transactionType}`);
   * });
   *
   * // Get second page of RSS feed
   * const nextPage = await fmp.insider.getInsiderTradingRSS({ page: 1 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#insider-trades-rss-insider-trading|FMP Insider Trading RSS Documentation}
   */
  async getInsiderTradingRSS(params: {
    page?: number;
  }): Promise<APIResponse<InsiderTradingRSSResponse[]>> {
    const { page = 0 } = params;
    return this.client.get(`/insider-trading-rss-feed`, 'v4', { page });
  }

  /**
   * Search for insider trades with advanced filtering
   *
   * Provides comprehensive insider trading data with multiple filtering options
   * including symbol, CIK numbers, and transaction types. Essential for detailed
   * analysis of insider trading patterns and corporate governance.
   *
   * @param params - Insider trading search parameters
   * @param params.symbol - Stock symbol to filter by (optional)
   * @param params.reportingCik - Reporting CIK to filter by (optional)
   * @param params.companyCik - Company CIK to filter by (optional)
   * @param params.transactionType - Transaction type to filter by (optional)
   * @param params.page - Page number for pagination (default: 0)
   *
   * @returns Promise resolving to array of insider trading search results
   *
   * @example
   * ```typescript
   * // Search for Apple insider trades
   * const appleTrades = await fmp.insider.searchInsiderTrading({
   *   symbol: 'AAPL',
   *   page: 0
   * });
   * appleTrades.data.forEach(trade => {
   *   console.log(`${trade.date}: ${trade.insiderName} - ${trade.transactionType} ${trade.sharesTraded} shares`);
   * });
   *
   * // Search by transaction type
   * const purchases = await fmp.insider.searchInsiderTrading({
   *   transactionType: 'P-Purchase',
   *   page: 0
   * });
   *
   * // Search by CIK
   * const cikTrades = await fmp.insider.searchInsiderTrading({
   *   companyCik: '0000320193',
   *   page: 0
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#insider-trades-search-insider-trading|FMP Insider Trading Search Documentation}
   */
  async searchInsiderTrading(params: {
    symbol?: string;
    reportingCik?: string;
    companyCik?: string;
    transactionType?: string;
    page?: number;
  }): Promise<APIResponse<InsiderTradingSearchResponse[]>> {
    const { symbol, reportingCik, companyCik, transactionType, page = 0 } = params;
    const queryParams: Record<string, string | number> = { page };

    if (symbol) queryParams.symbol = symbol;
    if (reportingCik) queryParams.reportingCik = reportingCik;
    if (companyCik) queryParams.companyCik = companyCik;
    if (transactionType) queryParams.transactionType = transactionType;

    return this.client.get(`/insider-trading`, 'v4', queryParams);
  }

  /**
   * Get all available transaction types
   *
   * Provides a comprehensive list of all insider trading transaction types
   * used in SEC filings. Essential for understanding different types of
   * insider trading activities and filtering search results.
   *
   * @returns Promise resolving to array of transaction types with descriptions
   *
   * @example
   * ```typescript
   * // Get all transaction types
   * const transactionTypes = await fmp.insider.getTransactionTypes();
   * transactionTypes.data.forEach(type => {
   *   console.log(`${type.code}: ${type.description}`);
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#transaction-types-insider-trading|FMP Transaction Types Documentation}
   */
  async getTransactionTypes(): Promise<APIResponse<TransactionTypesResponse>> {
    return this.client.get(`/insider-trading-transaction-type`, 'v4');
  }

  /**
   * Get insiders roster for a specific company
   *
   * Provides a list of all insiders (officers, directors, and beneficial owners)
   * for a specific company. Essential for understanding corporate governance
   * structure and identifying key personnel.
   *
   * @param params - Insiders request parameters
   * @param params.symbol - Stock symbol to get insiders for
   *
   * @returns Promise resolving to array of insiders data for the company
   *
   * @example
   * ```typescript
   * // Get Apple's insiders roster
   * const appleInsiders = await fmp.insider.getInsidersBySymbol({ symbol: 'AAPL' });
   * appleInsiders.data.forEach(insider => {
   *   console.log(`${insider.name} - ${insider.title} (${insider.cik})`);
   * });
   *
   * // Get Microsoft's insiders
   * const msftInsiders = await fmp.insider.getInsidersBySymbol({ symbol: 'MSFT' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#insiders-by-symbol-insider-trading|FMP Insiders by Symbol Documentation}
   */
  async getInsidersBySymbol(params: {
    symbol: string;
  }): Promise<APIResponse<InsidersBySymbolResponse[]>> {
    const { symbol } = params;
    return this.client.get(`/insider-roaster`, 'v4', { symbol });
  }

  /**
   * Get insider trade statistics for a company
   *
   * Provides comprehensive statistics on insider trading activity for a
   * specific company including total trades, volume, and value metrics.
   * Essential for analyzing insider trading patterns and sentiment.
   *
   * @param params - Statistics request parameters
   * @param params.symbol - Stock symbol to get statistics for
   *
   * @returns Promise resolving to array of insider trade statistics data
   *
   * @example
   * ```typescript
   * // Get Apple's insider trade statistics
   * const appleStats = await fmp.insider.getInsiderTradeStatistics({ symbol: 'AAPL' });
   * appleStats.data.forEach(stat => {
   *   console.log(`${stat.insiderName}: ${stat.totalTrades} trades, ${stat.totalShares} shares`);
   * });
   *
   * // Get Microsoft's statistics
   * const msftStats = await fmp.insider.getInsiderTradeStatistics({ symbol: 'MSFT' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#insider-trade-statistics-insider-trading|FMP Insider Trade Statistics Documentation}
   */
  async getInsiderTradeStatistics(params: {
    symbol: string;
  }): Promise<APIResponse<InsiderTradeStatisticsResponse[]>> {
    const { symbol } = params;
    return this.client.get(`/insider-roaster-statistic`, 'v4', { symbol });
  }

  /**
   * Get CIK mapper data
   *
   * Provides a mapping between CIK (Central Index Key) numbers and company
   * names. Essential for converting between CIK numbers and company
   * identifiers in insider trading analysis.
   *
   * @param params - CIK mapper request parameters
   * @param params.page - Page number for pagination (default: 0)
   *
   * @returns Promise resolving to array of CIK mapper data
   *
   * @example
   * ```typescript
   * // Get first page of CIK mapper
   * const cikMapper = await fmp.insider.getCikMapper({ page: 0 });
   * cikMapper.data.forEach(mapping => {
   *   console.log(`CIK: ${mapping.cik} - Company: ${mapping.name}`);
   * });
   *
   * // Get second page
   * const nextPage = await fmp.insider.getCikMapper({ page: 1 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#cik-mapper-insider-trading|FMP CIK Mapper Documentation}
   */
  async getCikMapper(params: { page?: number }): Promise<APIResponse<CikMapperResponse[]>> {
    const { page = 0 } = params;
    return this.client.get(`/mapper-cik-name`, 'v4', { page });
  }

  /**
   * Get CIK mapper by name search
   *
   * Provides CIK numbers and company names matching a search term.
   * Useful for finding companies by partial name matches and
   * converting company names to CIK numbers.
   *
   * @param params - CIK mapper by name request parameters
   * @param params.name - Company name or partial name to search for
   * @param params.page - Page number for pagination (default: 0)
   *
   * @returns Promise resolving to array of CIK mapper data matching the search
   *
   * @example
   * ```typescript
   * // Search for Apple by name
   * const appleCik = await fmp.insider.getCikMapperByName({
   *   name: 'Apple',
   *   page: 0
   * });
   * appleCik.data.forEach(mapping => {
   *   console.log(`CIK: ${mapping.cik} - Company: ${mapping.name}`);
   * });
   *
   * // Search for Microsoft
   * const msftCik = await fmp.insider.getCikMapperByName({
   *   name: 'Microsoft',
   *   page: 0
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#cik-mapper-by-name-insider-trading|FMP CIK Mapper by Name Documentation}
   */
  async getCikMapperByName(params: {
    name: string;
    page?: number;
  }): Promise<APIResponse<CikMapperResponse[]>> {
    const { name, page = 0 } = params;
    return this.client.get(`/mapper-cik-name`, 'v4', { name, page });
  }

  /**
   * Get CIK mapper by symbol
   *
   * Provides CIK number and company name for a specific stock symbol.
   * Essential for converting stock symbols to CIK numbers for use
   * in insider trading searches and analysis.
   *
   * @param params - CIK mapper by symbol request parameters
   * @param params.symbol - Stock symbol to get CIK for
   *
   * @returns Promise resolving to CIK mapper data for the symbol
   *
   * @example
   * ```typescript
   * // Get Apple's CIK by symbol
   * const appleCik = await fmp.insider.getCikMapperBySymbol({ symbol: 'AAPL' });
   * console.log(`Apple CIK: ${appleCik.data.cik} - ${appleCik.data.name}`);
   *
   * // Get Microsoft's CIK
   * const msftCik = await fmp.insider.getCikMapperBySymbol({ symbol: 'MSFT' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#cik-mapper-company-insider-trading|FMP CIK Mapper by Symbol Documentation}
   */
  async getCikMapperBySymbol(params: {
    symbol: string;
  }): Promise<APIResponse<CikMapperBySymbolResponse>> {
    const { symbol } = params;
    return this.client.getSingle(`/mapper-cik-company/${symbol}`, 'v4');
  }

  /**
   * Get beneficial ownership acquisitions
   *
   * Provides data on acquisitions of beneficial ownership for a specific
   * company. Essential for tracking significant ownership changes and
   * corporate governance events.
   *
   * @param params - Beneficial ownership request parameters
   * @param params.symbol - Stock symbol to get beneficial ownership data for
   *
   * @returns Promise resolving to array of beneficial ownership acquisition data
   *
   * @example
   * ```typescript
   * // Get Apple's beneficial ownership acquisitions
   * const appleOwnership = await fmp.insider.getBeneficialOwnership({ symbol: 'AAPL' });
   * appleOwnership.data.forEach(acquisition => {
   *   console.log(`${acquisition.date}: ${acquisition.insiderName} acquired ${acquisition.sharesAcquired} shares`);
   * });
   *
   * // Get Microsoft's beneficial ownership
   * const msftOwnership = await fmp.insider.getBeneficialOwnership({ symbol: 'MSFT' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#acquisition-of-beneficial-ownership|FMP Beneficial Ownership Documentation}
   */
  async getBeneficialOwnership(params: {
    symbol: string;
  }): Promise<APIResponse<BeneficialOwnershipResponse[]>> {
    const { symbol } = params;
    return this.client.get(`/insider/ownership/acquisition_of_beneficial_ownership`, 'v4', {
      symbol,
    });
  }

  /**
   * Get fail to deliver data
   *
   * Provides fail to deliver data for a specific company, which indicates
   * when market participants fail to deliver securities on settlement date.
   * Important for understanding market mechanics and potential short interest.
   *
   * @param params - Fail to deliver request parameters
   * @param params.symbol - Stock symbol to get fail to deliver data for
   * @param params.page - Page number for pagination (default: 0)
   *
   * @returns Promise resolving to array of fail to deliver data
   *
   * @example
   * ```typescript
   * // Get Apple's fail to deliver data
   * const appleFailToDeliver = await fmp.insider.getFailToDeliver({
   *   symbol: 'AAPL',
   *   page: 0
   * });
   * appleFailToDeliver.data.forEach(entry => {
   *   console.log(`${entry.date}: ${entry.shares} shares failed to deliver`);
   * });
   *
   * // Get Microsoft's fail to deliver data
   * const msftFailToDeliver = await fmp.insider.getFailToDeliver({
   *   symbol: 'MSFT',
   *   page: 0
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#fail-to-deliver|FMP Fail to Deliver Documentation}
   */
  async getFailToDeliver(params: {
    symbol: string;
    page?: number;
  }): Promise<APIResponse<FailToDeliverResponse[]>> {
    const { symbol, page = 0 } = params;
    return this.client.get(`/fail_to_deliver`, 'v4', { symbol, page });
  }

  /**
   * Get all insider trades for a symbol (convenience method)
   * @param symbol - The stock symbol to get insider trades for
   * @param page - Page number for pagination (default: 0)
   * @returns A list of insider trades for the specified symbol
   */
  async getInsiderTradesBySymbol(
    symbol: string,
    page: number = 0,
  ): Promise<APIResponse<InsiderTradingSearchResponse[]>> {
    return this.searchInsiderTrading({ symbol, page });
  }

  /**
   * Get insider trades by transaction type (convenience method)
   * @param transactionType - The transaction type to filter by
   * @param page - Page number for pagination (default: 0)
   * @returns A list of insider trades filtered by transaction type
   */
  async getInsiderTradesByType(
    transactionType: TransactionType | string,
    page: number = 0,
  ): Promise<APIResponse<InsiderTradingSearchResponse[]>> {
    return this.searchInsiderTrading({ transactionType, page });
  }

  /**
   * Get insider trades by reporting CIK (convenience method)
   * @param reportingCik - The reporting CIK to filter by
   * @param page - Page number for pagination (default: 0)
   * @returns A list of insider trades filtered by reporting CIK
   */
  async getInsiderTradesByReportingCik(
    reportingCik: string,
    page: number = 0,
  ): Promise<APIResponse<InsiderTradingSearchResponse[]>> {
    return this.searchInsiderTrading({ reportingCik, page });
  }

  /**
   * Get insider trades by company CIK (convenience method)
   * @param companyCik - The company CIK to filter by
   * @param page - Page number for pagination (default: 0)
   * @returns A list of insider trades filtered by company CIK
   */
  async getInsiderTradesByCompanyCik(
    companyCik: string,
    page: number = 0,
  ): Promise<APIResponse<InsiderTradingSearchResponse[]>> {
    return this.searchInsiderTrading({ companyCik, page });
  }
}

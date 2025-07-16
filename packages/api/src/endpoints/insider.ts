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
  InsiderTradingRSSParams,
  InsiderTradingSearchParams,
  InsidersBySymbolParams,
  InsiderTradeStatisticsParams,
  CikMapperParams,
  CikMapperByNameParams,
  CikMapperBySymbolParams,
  BeneficialOwnershipParams,
  FailToDeliverParams,
  TransactionType,
} from '@/types/insider';

export class InsiderEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get insider trading RSS feed
   * https://site.financialmodelingprep.com/developer/docs#insider-trades-rss-insider-trading
   * @param params - Parameters for the RSS feed request
   * @returns An RSS feed of insider trades, updated in real time
   */
  async getInsiderTradingRSS({
    page,
  }: InsiderTradingRSSParams): Promise<APIResponse<InsiderTradingRSSResponse[]>> {
    return this.client.get(`/insider-trading-rss-feed`, 'v4', { page });
  }

  /**
   * Search for insider trades
   * https://site.financialmodelingprep.com/developer/docs#insider-trades-search-insider-trading
   * @param params - Parameters for the insider trading search
   * @returns A list of insider trades filtered by the provided parameters
   */
  async searchInsiderTrading({
    symbol,
    reportingCik,
    companyCik,
    transactionType,
    page,
  }: InsiderTradingSearchParams): Promise<APIResponse<InsiderTradingSearchResponse[]>> {
    const params: Record<string, string | number> = { page };

    if (symbol) params.symbol = symbol;
    if (reportingCik) params.reportingCik = reportingCik;
    if (companyCik) params.companyCik = companyCik;
    if (transactionType) params.transactionType = transactionType;

    return this.client.get(`/insider-trading`, 'v4', params);
  }

  /**
   * Get transaction types
   * https://site.financialmodelingprep.com/developer/docs#transaction-types-insider-trading
   * @returns A list of all insider transaction types
   */
  async getTransactionTypes(): Promise<APIResponse<TransactionTypesResponse>> {
    return this.client.get(`/insider-trading-transaction-type`, 'v4');
  }

  /**
   * Get insiders by symbol
   * https://site.financialmodelingprep.com/developer/docs#insiders-by-symbol-insider-trading
   * @param params - Parameters for the insiders request
   * @returns A list of insiders for a specific company
   */
  async getInsidersBySymbol({
    symbol,
  }: InsidersBySymbolParams): Promise<APIResponse<InsidersBySymbolResponse[]>> {
    return this.client.get(`/insider-roaster`, 'v4', { symbol });
  }

  /**
   * Get insider trade statistics
   * https://site.financialmodelingprep.com/developer/docs#insider-trade-statistics-insider-trading
   * @param params - Parameters for the statistics request
   * @returns Statistics on insider trading activity for a specific company
   */
  async getInsiderTradeStatistics({
    symbol,
  }: InsiderTradeStatisticsParams): Promise<APIResponse<InsiderTradeStatisticsResponse[]>> {
    return this.client.get(`/insider-roaster-statistic`, 'v4', { symbol });
  }

  /**
   * Get CIK mapper
   * https://site.financialmodelingprep.com/developer/docs#cik-mapper-insider-trading
   * @param params - Parameters for the CIK mapper request
   * @returns A list of CIK numbers and corresponding company names
   */
  async getCikMapper({ page }: CikMapperParams): Promise<APIResponse<CikMapperResponse[]>> {
    return this.client.get(`/mapper-cik-name`, 'v4', { page });
  }

  /**
   * Get CIK mapper by name
   * https://site.financialmodelingprep.com/developer/docs#cik-mapper-by-name-insider-trading
   * @param params - Parameters for the CIK mapper by name request
   * @returns A list of CIK numbers and corresponding names matching the search term
   */
  async getCikMapperByName({
    name,
    page = 0,
  }: CikMapperByNameParams): Promise<APIResponse<CikMapperResponse[]>> {
    return this.client.get(`/mapper-cik-name`, 'v4', { name, page });
  }

  /**
   * Get CIK mapper by symbol
   * https://site.financialmodelingprep.com/developer/docs#cik-mapper-company-insider-trading
   * @param params - Parameters for the CIK mapper by symbol request
   * @returns CIK number and corresponding company name for a specific symbol
   */
  async getCikMapperBySymbol({
    symbol,
  }: CikMapperBySymbolParams): Promise<APIResponse<CikMapperBySymbolResponse>> {
    return this.client.getSingle(`/mapper-cik-company/${symbol}`, 'v4');
  }

  /**
   * Get beneficial ownership acquisitions
   * https://site.financialmodelingprep.com/developer/docs#acquisition-of-beneficial-ownership
   * @param params - Parameters for the beneficial ownership request
   * @returns A list of acquisitions of beneficial ownership for a specific company
   */
  async getBeneficialOwnership({
    symbol,
  }: BeneficialOwnershipParams): Promise<APIResponse<BeneficialOwnershipResponse[]>> {
    return this.client.get(`/insider/ownership/acquisition_of_beneficial_ownership`, 'v4', {
      symbol,
    });
  }

  /**
   * Get fail to deliver data
   * https://site.financialmodelingprep.com/developer/docs#fail-to-deliver
   * @param params - Parameters for the fail to deliver request
   * @returns A list of fail to deliver data for a specific company
   */
  async getFailToDeliver({
    symbol,
    page = 0,
  }: FailToDeliverParams): Promise<APIResponse<FailToDeliverResponse[]>> {
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

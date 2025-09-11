// Screener endpoints for FMP API

import { FMPClient } from '@/client';
import {
  APIResponse,
  Screener,
  ScreenerParams,
  AvailableExchanges,
  AvailableSectors,
  AvailableIndustries,
  AvailableCountries,
} from 'fmp-node-types';

export class ScreenerEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Screen companies based on customizable financial criteria
   *
   * This endpoint allows you to filter and search for companies based on various financial metrics,
   * market data, and company characteristics. Perfect for finding investment opportunities,
   * conducting market research, or building custom stock filters.
   *
   * @param params - Screening criteria and filters
   * @param params.marketCapMoreThan - Minimum market capitalization
   * @param params.marketCapLowerThan - Maximum market capitalization
   * @param params.priceMoreThan - Minimum stock price
   * @param params.priceLowerThan - Maximum stock price
   * @param params.betaMoreThan - Minimum beta value
   * @param params.betaLowerThan - Maximum beta value
   * @param params.volumeMoreThan - Minimum trading volume
   * @param params.volumeLowerThan - Maximum trading volume
   * @param params.dividendMoreThan - Minimum dividend yield
   * @param params.dividendLowerThan - Maximum dividend yield
   * @param params.isEtf - Filter for ETFs only
   * @param params.isActivelyTrading - Filter for actively trading stocks
   * @param params.sector - Filter by specific sector
   * @param params.industry - Filter by specific industry
   * @param params.country - Filter by specific country
   * @param params.exchange - Filter by specific exchange
   * @param params.limit - Maximum number of results to return
   *
   * @returns Promise resolving to an array of companies matching the screening criteria
   *
   * @example
   * ```typescript
   * // Find large-cap tech stocks
   * const techStocks = await fmp.screener.getScreener({
   *   marketCapMoreThan: 10000000000, // $10B+
   *   sector: 'Technology',
   *   isActivelyTrading: true,
   *   limit: 50
   * });
   *
   * // Find dividend-paying stocks
   * const dividendStocks = await fmp.screener.getScreener({
   *   dividendMoreThan: 0.03, // 3%+ dividend yield
   *   marketCapMoreThan: 1000000000, // $1B+ market cap
   *   isActivelyTrading: true
   * });
   *
   * // Find small-cap value stocks
   * const smallCapValue = await fmp.screener.getScreener({
   *   marketCapLowerThan: 2000000000, // Under $2B
   *   priceMoreThan: 5, // Above $5
   *   betaLowerThan: 1.2, // Lower volatility
   *   limit: 100
   * });
   * ```
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#search-company-screener|FMP Income Statement Documentation}
   */
  async getScreener(params: ScreenerParams): Promise<APIResponse<Screener[]>> {
    return this.client.get(`/company-screener`, 'stable', params);
  }

  /**
   * Get list of available stock exchanges for screening
   *
   * Retrieves all supported stock exchanges that can be used as filters
   * in the company screener. Useful for building dynamic filter options
   * or validating exchange parameters.
   *
   * @returns Promise resolving to an array of available exchanges with their details
   *
   * @example
   * ```typescript
   * // Get all available exchanges
   * const exchanges = await fmp.screener.getAvailableExchanges();
   *
   * // Use in screener filter
   * const nasdaqStocks = await fmp.screener.getScreener({
   *   exchange: 'NASDAQ',
   *   marketCapMoreThan: 1000000000
   * });
   * ```
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#available-exchanges|FMP Income Statement Documentation}
   */
  async getAvailableExchanges(): Promise<APIResponse<AvailableExchanges[]>> {
    return this.client.get(`/available-exchanges`, 'stable');
  }

  /**
   * Get list of available sectors for screening
   *
   * Retrieves all supported business sectors that can be used as filters
   * in the company screener. Essential for sector-based analysis and
   * building comprehensive screening tools.
   *
   * @returns Promise resolving to an array of available sectors with their details
   *
   * @example
   * ```typescript
   * // Get all available sectors
   * const sectors = await fmp.screener.getAvailableSectors();
   *
   * // Screen by specific sector
   * const healthcareStocks = await fmp.screener.getScreener({
   *   sector: 'Healthcare',
   *   marketCapMoreThan: 5000000000
   * });
   * ```
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#available-sectors|FMP Income Statement Documentation}
   */
  async getAvailableSectors(): Promise<APIResponse<AvailableSectors[]>> {
    return this.client.get(`/available-sectors`, 'stable');
  }

  /**
   * Get list of available industries for screening
   *
   * Retrieves all supported industries that can be used as filters
   * in the company screener. Provides more granular filtering than
   * sectors for detailed industry analysis.
   *
   * @returns Promise resolving to an array of available industries with their details
   *
   * @example
   * ```typescript
   * // Get all available industries
   * const industries = await fmp.screener.getAvailableIndustries();
   *
   * // Screen by specific industry
   * const softwareStocks = await fmp.screener.getScreener({
   *   industry: 'Software—Application',
   *   isActivelyTrading: true,
   *   limit: 25
   * });
   * ```
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#available-industries|FMP Income Statement Documentation}
   */
  async getAvailableIndustries(): Promise<APIResponse<AvailableIndustries[]>> {
    return this.client.get(`/available-industries`, 'stable');
  }

  /**
   * Get list of available countries for screening
   *
   * Retrieves all supported countries that can be used as filters
   * in the company screener. Useful for geographic analysis and
   * international market screening.
   *
   * @returns Promise resolving to an array of available countries with their details
   *
   * @example
   * ```typescript
   * // Get all available countries
   * const countries = await fmp.screener.getAvailableCountries();
   *
   * // Screen by specific country
   * const usStocks = await fmp.screener.getScreener({
   *   country: 'US',
   *   marketCapMoreThan: 1000000000,
   *   isActivelyTrading: true
   * });
   * ```
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#available-countries|FMP Income Statement Documentation}
   */
  async getAvailableCountries(): Promise<APIResponse<AvailableCountries[]>> {
    return this.client.get(`/available-countries`, 'stable');
  }
}

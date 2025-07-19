// Institutional trading endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import { Form13FResponse, InstitutionalHolderResponse } from '@/types/institutional';

export class InstitutionalEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get Form 13F institutional stock ownership data
   *
   * Provides Form 13F institutional stock ownership data for investment
   * managers with over $100 million in assets under management. Essential
   * for analyzing institutional investment patterns and holdings.
   *
   * @param params - Form 13F request parameters
   * @param params.cik - Central Index Key (CIK) of the investment manager
   * @param params.date - Specific date in YYYY-MM-DD format (optional, defaults to most recent filing)
   *
   * @returns Promise resolving to array of Form 13F institutional ownership data
   *
   * @example
   * ```typescript
   * // Get Berkshire Hathaway's Form 13F data
   * const berkshire13F = await fmp.institutional.getForm13F({
   *   cik: '0001067983'
   * });
   * berkshire13F.data.forEach(holding => {
   *   console.log(`${holding.issuerName}: ${holding.value.toLocaleString()} shares, $${holding.value.toLocaleString()}`);
   * });
   *
   * // Get Form 13F data for specific date
   * const historical13F = await fmp.institutional.getForm13F({
   *   cik: '0001067983',
   *   date: '2023-12-31'
   * });
   *
   * // Get BlackRock's Form 13F data
   * const blackrock13F = await fmp.institutional.getForm13F({
   *   cik: '0001364742'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#form-13f-13f---institutional-stock-ownership|FMP Form 13F Documentation}
   */
  async getForm13F(params: {
    cik: string;
    date?: string;
  }): Promise<APIResponse<Form13FResponse[]>> {
    const { cik, date } = params;
    const queryParams: Record<string, any> = {};

    if (date) queryParams.date = date;

    return this.client.get(`/form-thirteen/${cik}`, 'v3', queryParams);
  }

  /**
   * Get Form 13F filing dates for an investment manager
   *
   * Provides available filing dates for Form 13F submissions by a specific
   * investment manager. Essential for discovering historical filing dates
   * before requesting detailed Form 13F data.
   *
   * @param params - Form 13F dates request parameters
   * @param params.cik - Central Index Key (CIK) of the investment manager
   *
   * @returns Promise resolving to array of available Form 13F filing dates
   *
   * @example
   * ```typescript
   * // Get Berkshire Hathaway's Form 13F filing dates
   * const berkshireDates = await fmp.institutional.getForm13FDates({
   *   cik: '0001067983'
   * });
   * berkshireDates.data.forEach(date => {
   *   console.log(`Filing date: ${date}`);
   * });
   *
   * // Get BlackRock's filing dates
   * const blackrockDates = await fmp.institutional.getForm13FDates({
   *   cik: '0001364742'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#form-13f-dates-13f---institutional-stock-ownership|FMP Form 13F Dates Documentation}
   */
  async getForm13FDates(params: { cik: string }): Promise<APIResponse<string[]>> {
    const { cik } = params;
    return this.client.get(`/form-thirteen-date/${cik}`, 'v3');
  }

  /**
   * Get institutional holders for a company
   *
   * Provides data on institutional investors holding shares in a specific
   * company. Essential for understanding institutional ownership patterns,
   * major shareholders, and investment sentiment.
   *
   * @param params - Institutional holders request parameters
   * @param params.symbol - Stock symbol to get institutional holders for
   *
   * @returns Promise resolving to array of institutional holders data
   *
   * @example
   * ```typescript
   * // Get Apple's institutional holders
   * const appleHolders = await fmp.institutional.getInstitutionalHolders({
   *   symbol: 'AAPL'
   * });
   * appleHolders.data.forEach(holder => {
   *   console.log(`${holder.holder}: ${holder.shares.toLocaleString()} shares (${holder.weight}%)`);
   * });
   *
   * // Get Microsoft's institutional holders
   * const msftHolders = await fmp.institutional.getInstitutionalHolders({
   *   symbol: 'MSFT'
   * });
   *
   * // Get Tesla's institutional holders
   * const teslaHolders = await fmp.institutional.getInstitutionalHolders({
   *   symbol: 'TSLA'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#institutional-holder-13f---institutional-stock-ownership|FMP Institutional Holders Documentation}
   */
  async getInstitutionalHolders(params: {
    symbol: string;
  }): Promise<APIResponse<InstitutionalHolderResponse[]>> {
    const { symbol } = params;
    return this.client.get(`/institutional-holder/${symbol}`, 'v3');
  }
}

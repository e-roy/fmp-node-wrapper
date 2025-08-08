import { FMPClient } from '@/client';
import {
  APIResponse,
  RSSFeedItem,
  RSSFeedV3Item,
  RSSFeed8KItem,
  SECFiling,
  IndustryClassification,
  IndustryClassificationCode,
  RSSFeedAllItem,
} from '@fmp/types';

export class SECEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get RSS feed of SEC filings
   *
   * Provides a real-time feed of SEC filings from publicly traded companies,
   * including filing types, links to SEC pages, and direct links to filings.
   * Essential for staying up-to-date on the latest SEC filings for all companies
   * or for monitoring specific companies' regulatory activities.
   *
   * @param params - RSS feed parameters (optional)
   * @returns Promise resolving to array of RSS feed items with SEC filing information
   *
   * @example
   * ```typescript
   * // Get all recent SEC filings
   * const allFilings = await fmp.sec.getRSSFeed();
   * console.log(`Recent SEC filings: ${allFilings.data.length}`);
   *
   * // Get specific filing type
   * const form4Filings = await fmp.sec.getRSSFeed({ type: '4' });
   * console.log(`Form 4 filings: ${form4Filings.data.length}`);
   *
   * // Get filings with date range
   * const recentFilings = await fmp.sec.getRSSFeed({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * console.log(`Recent filings: ${recentFilings.data.length}`);
   *
   * // Get limited results
   * const limitedFilings = await fmp.sec.getRSSFeed({ limit: 10 });
   * console.log(`Limited filings: ${limitedFilings.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#rss-feed-securities-and-exchange-commission-(s.e.c)|FMP RSS Feed Documentation}
   */
  async getRSSFeed(params?: {
    limit?: number;
    type?: string;
    from?: string;
    to?: string;
    isDone?: boolean;
  }): Promise<APIResponse<RSSFeedItem[]>> {
    return this.client.get('/rss_feed', 'v4', params);
  }

  /**
   * Get comprehensive RSS feed of all SEC filings
   *
   * Provides a comprehensive real-time feed of all SEC filings from publicly
   * traded companies in the latest RSS feed format. This endpoint offers the
   * most complete overview of SEC filings with enhanced metadata and formatting.
   *
   * @param params - RSS feed all parameters (optional)
   * @returns Promise resolving to array of comprehensive RSS feed items with enhanced SEC filing information
   *
   * @example
   * ```typescript
   * // Get all comprehensive SEC filings
   * const allFilings = await fmp.sec.getRSSFeedAll();
   * console.log(`Comprehensive SEC filings: ${allFilings.data.length}`);
   *
   * // Get paginated results
   * const page2Filings = await fmp.sec.getRSSFeedAll({ page: 1 });
   * console.log(`Page 2 filings: ${page2Filings.data.length}`);
   *
   * // Get specific data type
   * const specificData = await fmp.sec.getRSSFeedAll({ datatype: 'json' });
   * console.log(`Specific data type filings: ${specificData.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#rss-feed-all-securities-and-exchange-commission-(s.e.c)|FMP RSS Feed All Documentation}
   */
  async getRSSFeedAll(params?: {
    page?: number;
    datatype?: string;
  }): Promise<APIResponse<RSSFeedAllItem[]>> {
    return this.client.get('/rss_feed_all', 'v4', params);
  }

  /**
   * Get RSS feed V3 of SEC filings
   *
   * Provides a real-time feed of SEC filings from publicly traded companies
   * in the V3 RSS feed format. This version offers enhanced metadata and
   * improved structure for better parsing and analysis of SEC filings.
   *
   * @param params - RSS feed V3 parameters (optional)
   * @returns Promise resolving to array of V3 RSS feed items with enhanced SEC filing information
   *
   * @example
   * ```typescript
   * // Get V3 format SEC filings
   * const v3Filings = await fmp.sec.getRSSFeedV3();
   * console.log(`V3 SEC filings: ${v3Filings.data.length}`);
   *
   * // Get paginated V3 results
   * const page2V3 = await fmp.sec.getRSSFeedV3({ page: 1 });
   * console.log(`Page 2 V3 filings: ${page2V3.data.length}`);
   *
   * // Get specific data type
   * const specificV3 = await fmp.sec.getRSSFeedV3({ datatype: 'json' });
   * console.log(`Specific V3 data type: ${specificV3.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#rss-feed-v3-securities-and-exchange-commission-(s.e.c)|FMP RSS Feed V3 Documentation}
   */
  async getRSSFeedV3(params?: {
    page?: number;
    datatype?: string;
  }): Promise<APIResponse<RSSFeedV3Item[]>> {
    return this.client.get('/rss_feed', 'v3', params);
  }

  /**
   * Get RSS feed of 8-K SEC filings
   *
   * Provides a real-time feed specifically for 8-K SEC filings from publicly
   * traded companies. 8-K filings are used to announce major events that
   * shareholders should know about, such as earnings releases, mergers,
   * acquisitions, and other material events.
   *
   * @param params - RSS feed 8-K parameters (optional)
   * @returns Promise resolving to array of 8-K RSS feed items with material event information
   *
   * @example
   * ```typescript
   * // Get all 8-K filings
   * const form8KFilings = await fmp.sec.getRSSFeed8K();
   * console.log(`8-K filings: ${form8KFilings.data.length}`);
   *
   * // Get 8-K filings with date range
   * const recent8K = await fmp.sec.getRSSFeed8K({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * console.log(`Recent 8-K filings: ${recent8K.data.length}`);
   *
   * // Get 8-K filings with financials
   * const financial8K = await fmp.sec.getRSSFeed8K({ hasFinancial: true });
   * console.log(`8-K filings with financials: ${financial8K.data.length}`);
   *
   * // Get limited 8-K results
   * const limited8K = await fmp.sec.getRSSFeed8K({ limit: 10 });
   * console.log(`Limited 8-K filings: ${limited8K.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#rss-feed-8-k-securities-and-exchange-commission-(s.e.c)|FMP RSS Feed 8-K Documentation}
   */
  async getRSSFeed8K(params?: {
    page?: number;
    from?: string;
    to?: string;
    hasFinancial?: boolean;
    limit?: number;
  }): Promise<APIResponse<RSSFeed8KItem[]>> {
    return this.client.get('/rss_feed_8k', 'v4', params);
  }

  /**
   * Get SEC filings for a specific company
   *
   * Provides direct access to SEC filings for a specific company, including
   * filing types, links to SEC pages, and direct links to specific filings.
   * Essential for monitoring a company's regulatory compliance and staying
   * informed about important corporate events and disclosures.
   *
   * @param symbol - The stock symbol to get SEC filings for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   * @param params - SEC filings parameters (optional)
   * @returns Promise resolving to array of SEC filings with detailed filing information
   *
   * @example
   * ```typescript
   * // Get all SEC filings for Apple
   * const appleFilings = await fmp.sec.getSECFilings({ symbol: 'AAPL' });
   * console.log(`Apple SEC filings: ${appleFilings.data.length}`);
   *
   * // Get specific filing type for Microsoft
   * const msftForm4 = await fmp.sec.getSECFilings({
   *   symbol: 'MSFT',
   *   params: { type: '4' }
   * });
   * console.log(`Microsoft Form 4 filings: ${msftForm4.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#sec-filings-securities-and-exchange-commission-(s.e.c)|FMP SEC Filings Documentation}
   */
  async getSECFilings({
    symbol,
    params,
  }: {
    symbol: string;
    params?: {
      type?: string;
      page?: number;
    };
  }): Promise<APIResponse<SECFiling[]>> {
    return this.client.get(`/sec_filings/${symbol}`, 'v3', params);
  }

  /**
   * Get individual industry classification for a company
   *
   * Provides the industry classification for a specific company based on the
   * Standard Industrial Classification (SIC) system. Essential for understanding
   * a company's business sector, industry peers, and market positioning.
   *
   * @param params - Industry classification parameters
   * @returns Promise resolving to industry classification data with SIC code and description
   *
   * @example
   * ```typescript
   * // Get Apple's industry classification by symbol
   * const appleIndustry = await fmp.sec.getIndividualIndustryClassification({ symbol: 'AAPL' });
   * console.log(`Apple Industry: ${appleIndustry.data.industryTitle}`);
   * console.log(`SIC Code: ${appleIndustry.data.sicCode}`);
   *
   * // Get industry classification by CIK
   * const cikIndustry = await fmp.sec.getIndividualIndustryClassification({ cik: 320193 });
   * console.log(`CIK Industry: ${cikIndustry.data.industryTitle}`);
   *
   * // Get industry classification by SIC code
   * const sicIndustry = await fmp.sec.getIndividualIndustryClassification({ sicCode: 3571 });
   * console.log(`SIC Industry: ${sicIndustry.data.industryTitle}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#individual-industry-classification-standard-industrial-classification|FMP Individual Industry Classification Documentation}
   */
  async getIndividualIndustryClassification(params: {
    symbol?: string;
    cik?: string;
    sicCode?: number;
  }): Promise<APIResponse<IndustryClassification>> {
    return this.client.getSingle('/standard_industrial_classification', 'v4', params);
  }

  /**
   * Get all industry classifications
   *
   * Provides a comprehensive overview of all industries classified according
   * to the Standard Industrial Classification (SIC) system. Essential for
   * understanding industry categories, sector analysis, and market research.
   *
   * @returns Promise resolving to array of all industry classifications with SIC codes and descriptions
   *
   * @example
   * ```typescript
   * // Get all industry classifications
   * const allIndustries = await fmp.sec.getAllIndustryClassifications();
   * console.log(`Total industries: ${allIndustries.data.length}`);
   *
   * allIndustries.data.forEach((industry, index) => {
   *   console.log(`${index + 1}. ${industry.industryTitle}`);
   *   console.log(`   SIC Code: ${industry.sicCode}`);
   * });
   *
   * // Find specific industry
   * const techIndustry = allIndustries.data.find(industry =>
   *   industry.industryTitle.toLowerCase().includes('computer')
   * );
   * console.log(`Tech Industry: ${techIndustry?.industryTitle}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#all-industry-classification-standard-industrial-classification|FMP All Industry Classifications Documentation}
   */
  async getAllIndustryClassifications(): Promise<APIResponse<IndustryClassification[]>> {
    return this.client.get('/standard_industrial_classification/all', 'v4');
  }

  /**
   * Get industry classification codes
   *
   * Provides detailed information about the Standard Industrial Classification
   * (SIC) system and helps identify SIC codes for specific industries.
   * Essential for understanding industry categorization and sector analysis.
   *
   * @param params - Industry classification codes parameters
   * @returns Promise resolving to array of industry classification codes with detailed information
   *
   * @example
   * ```typescript
   * // Get all industry classification codes
   * const allCodes = await fmp.sec.getIndustryClassificationCodes({});
   * console.log(`Total SIC codes: ${allCodes.data.length}`);
   *
   * // Search for specific SIC code
   * const code3571 = await fmp.sec.getIndustryClassificationCodes({ sicCode: 3571 });
   * console.log(`SIC 3571: ${code3571.data[0]?.industryTitle}`);
   *
   * // Search for industry by title
   * const computerIndustry = await fmp.sec.getIndustryClassificationCodes({ industryTitle: 'Computer' });
   * console.log(`Computer-related industries: ${computerIndustry.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#industry-classification-codes-standard-industrial-classification|FMP Industry Classification Codes Documentation}
   */
  async getIndustryClassificationCodes(params: {
    industryTitle?: string;
    sicCode?: number;
  }): Promise<APIResponse<IndustryClassificationCode[]>> {
    return this.client.get('/standard_industrial_classification_list', 'v4', params);
  }
}

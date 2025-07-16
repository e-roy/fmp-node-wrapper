import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  RSSFeedItem,
  RSSFeedV3Item,
  RSSFeed8KItem,
  SECFiling,
  IndustryClassification,
  IndustryClassificationCode,
  RSSFeedParams,
  RSSFeedV3Params,
  RSSFeed8KParams,
  SECFilingsParams,
  IndividualIndustryClassificationParams,
  IndustryClassificationCodesParams,
  RSSFeedAllItem,
} from '@/types/sec';

export class SECEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get RSS feed of SEC filings
   * https://site.financialmodelingprep.com/developer/docs#rss-feed-securities-and-exchange-commission-(s.e.c)
   * @param params - RSS feed parameters
   * @returns A real-time feed of SEC filings from publicly traded companies, including the filing type, link to SEC page, and direct link to the filing. This endpoint can be used to stay up-to-date on the latest SEC filings for all companies or for a specific set of companies.
   */
  async getRSSFeed(params?: RSSFeedParams): Promise<APIResponse<RSSFeedItem[]>> {
    return this.client.get('/rss_feed', 'v4', params);
  }

  /**
   * Get RSS feed of all SEC filings
   * https://site.financialmodelingprep.com/developer/docs#rss-feed-all-securities-and-exchange-commission-(s.e.c)
   * @param params - RSS feed all parameters
   * @returns A real-time feed of all SEC filings from publicly traded companies in the latest RSS feed format. This endpoint provides a comprehensive overview of all SEC filings, including the filing type, link to SEC page, and direct link to the filing.
   */
  async getRSSFeedAll(params?: RSSFeedV3Params): Promise<APIResponse<RSSFeedAllItem[]>> {
    return this.client.get('/rss_feed_all', 'v4', params);
  }

  /**
   * Get RSS feed V3 of SEC filings
   * https://site.financialmodelingprep.com/developer/docs#rss-feed-v3-securities-and-exchange-commission-(s.e.c)
   * @param params - RSS feed V3 parameters
   * @returns A real-time feed of SEC filings from publicly traded companies in the latest RSS feed format (V3)
   */
  async getRSSFeedV3(params?: RSSFeedV3Params): Promise<APIResponse<RSSFeedV3Item[]>> {
    return this.client.get('/rss_feed', 'v3', params);
  }

  /**
   * Get RSS feed of 8-K SEC filings
   * https://site.financialmodelingprep.com/developer/docs#rss-feed-8-k-securities-and-exchange-commission-(s.e.c)
   * @param params - RSS feed 8-K parameters
   * @returns A real-time feed of 8-K SEC filings from publicly traded companies
   */
  async getRSSFeed8K(params?: RSSFeed8KParams): Promise<APIResponse<RSSFeed8KItem[]>> {
    return this.client.get('/rss_feed_8k', 'v4', params);
  }

  /**
   * Get SEC filings for a specific company
   * https://site.financialmodelingprep.com/developer/docs#sec-filings-securities-and-exchange-commission-(s.e.c)
   * @param symbol - The stock symbol to get SEC filings for
   * @param params - SEC filings parameters
   * @returns Access direct links to SEC filings, including the filing type, link to the SEC page, and direct link to the specific filing
   */
  async getSECFilings({
    symbol,
    params,
  }: {
    symbol: string;
    params?: SECFilingsParams;
  }): Promise<APIResponse<SECFiling[]>> {
    return this.client.get(`/sec_filings/${symbol}`, 'v3', params);
  }

  /**
   * Get individual industry classification
   * https://site.financialmodelingprep.com/developer/docs#individual-industry-classification-standard-industrial-classification
   * @param params - Industry classification parameters
   * @returns Identify the industry in which a particular company operates, based on the Standard Industrial Classification (SIC) system
   */
  async getIndividualIndustryClassification(
    params: IndividualIndustryClassificationParams,
  ): Promise<APIResponse<IndustryClassification>> {
    return this.client.getSingle('/standard_industrial_classification', 'v4', params);
  }

  /**
   * Get all industry classifications
   * https://site.financialmodelingprep.com/developer/docs#all-industry-classification-standard-industrial-classification
   * @returns Get a comprehensive overview of all industries, classified according to the SIC system
   */
  async getAllIndustryClassifications(): Promise<APIResponse<IndustryClassification[]>> {
    return this.client.get('/standard_industrial_classification/all', 'v4');
  }

  /**
   * Get industry classification codes
   * https://site.financialmodelingprep.com/developer/docs#industry-classification-codes-standard-industrial-classification
   * @param params - Industry classification codes parameters
   * @returns Learn more about the SIC system and identify the SIC code for a particular industry
   */
  async getIndustryClassificationCodes(
    params: IndustryClassificationCodesParams,
  ): Promise<APIResponse<IndustryClassificationCode[]>> {
    return this.client.get('/standard_industrial_classification_list', 'v4', params);
  }
}

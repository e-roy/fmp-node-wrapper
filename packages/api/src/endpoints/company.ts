import { APIResponse } from '@/types';
import { FMPClient } from '@/client';
import {
  CompanyNotes,
  CompanyProfile,
  EarningsCallTranscript,
  ExecutiveCompensation,
  HistoricalEmployeeCount,
  HistoricalSharesFloat,
  SharesFloat,
} from '@/types/company';

export class CompanyEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get company profile
   * https://site.financialmodelingprep.com/developer/docs#company-profile-company-information
   * @param symbol - The stock symbol to get the profile for
   * @returns Get a comprehensive overview of a company with our Company Profile endpoint. This endpoint provides key information such as price, beta, market capitalization, description, headquarters, and more.
   */
  async getCompanyProfile({
    symbol,
  }: {
    symbol: string;
  }): Promise<APIResponse<CompanyProfile | null>> {
    return this.client.getSingle(`/profile/${symbol}`, 'v3');
  }

  /**
   * Get executive compensation
   * https://site.financialmodelingprep.com/developer/docs#executive-compensation-company-information
   * @param symbol - The stock symbol to get the executive compensation for
   * @returns Understand how a company compensates its executives with our Executive Compensation endpoint. This endpoint provides information such as salary, bonus, and stock options for each executive.
   */
  async getExecutiveCompensation({
    symbol,
  }: {
    symbol: string;
  }): Promise<APIResponse<ExecutiveCompensation[] | null>> {
    const params: { symbol: string } = { symbol };

    return this.client.get(`/governance/executive_compensation`, 'v4', params);
  }

  /**
   * Get company notes
   * https://site.financialmodelingprep.com/developer/docs#company-notes-company-information
   * @param symbol - The stock symbol to get the notes for
   * @returns Stay up-to-date on a company's financial condition, operations, and risks with our Company Notes endpoint. This endpoint provides information about notes reported by a company in their financial statements.
   */
  async getCompanyNotes({
    symbol,
  }: {
    symbol: string;
  }): Promise<APIResponse<CompanyNotes[] | null>> {
    const params: { symbol: string } = { symbol };

    return this.client.get(`/company-notes`, 'v4', params);
  }

  /**
   * Get historical employee count
   * https://site.financialmodelingprep.com/developer/docs#historical-employee-company-information
   * @param symbol - The stock symbol to get the historical employee count for
   * @returns Track a company's employee count over time with our Historical Employee Count endpoint. This endpoint provides information about the number of employees a company has had each year.
   */
  async getHistoricalEmployeeCount({
    symbol,
  }: {
    symbol: string;
  }): Promise<APIResponse<HistoricalEmployeeCount[] | null>> {
    const params: { symbol: string } = { symbol };

    return this.client.get(`/historical/employee_count`, 'v4', params);
  }

  /**
   * Get shares float
   * https://site.financialmodelingprep.com/developer/docs#company-share-float-share-float
   * @param symbol - The stock symbol to get the shares float for
   * @returns The FMP Company Share Float endpoint provides the total number of shares that are publicly traded for a given company. This is also known as the company's float. The float is calculated by subtracting the number of restricted shares from the total number of outstanding shares.
   */
  async getSharesFloat({ symbol }: { symbol: string }): Promise<APIResponse<SharesFloat | null>> {
    const params: { symbol: string } = { symbol };

    return this.client.getSingle(`/shares_float`, 'v4', params);
  }

  /**
   * Get historical shares float
   * https://site.financialmodelingprep.com/developer/docs#company-historical-share-float
   * @param symbol - The stock symbol to get the historical shares float for
   * @returns The FMP Historical Share Float endpoint provides historical data on the number of shares that are publicly traded for a given company. This is also known as the company's float. The float is calculated by subtracting the number of restricted shares from the total number of outstanding shares.
   */
  async getHistoricalSharesFloat({
    symbol,
  }: {
    symbol: string;
  }): Promise<APIResponse<HistoricalSharesFloat[] | null>> {
    const params: { symbol: string } = { symbol };

    return this.client.get(`/historical/shares_float`, 'v4', params);
  }

  /**
   * Get earnings call transcript
   * https://site.financialmodelingprep.com/developer/docs#earnings-transcript-earnings-transcripts
   * @param symbol - The stock symbol to get the earnings call transcript for
   * @param year - The year of the earnings call
   * @param quarter - The quarter of the earnings call
   * @returns The FMP Earnings Call Transcript endpoint provides the transcript of a company's earnings call.
   */
  async getEarningsCallTranscript({
    symbol,
    year,
    quarter,
  }: {
    symbol: string;
    year: number;
    quarter: number;
  }): Promise<APIResponse<EarningsCallTranscript[] | null>> {
    const params: { year: number; quarter: number } = { year, quarter };
    return this.client.getSingle(`/earning_call_transcript/${symbol}`, 'v3', params);
  }
}

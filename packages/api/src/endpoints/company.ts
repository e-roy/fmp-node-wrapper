import {
  APIResponse,
  CompanyNotes,
  CompanyProfile,
  CompanyTranscriptData,
  EarningsCallTranscript,
  ExecutiveCompensation,
  HistoricalEmployeeCount,
  HistoricalSharesFloat,
  SharesFloat,
} from 'fmp-node-types';
import { FMPClient } from '@/client';

export class CompanyEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get comprehensive company profile and information
   *
   * Provides detailed company information including financial metrics, business description,
   * headquarters location, and key performance indicators. Essential for fundamental analysis
   * and understanding a company's business model and market position.
   *
   * @param symbol - The stock symbol to get the profile for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   *
   * @returns Promise resolving to comprehensive company profile with financial and business information
   *
   * @example
   * ```typescript
   * // Get Apple's company profile
   * const profile = await fmp.company.getCompanyProfile('AAPL');
   * console.log(`Company: ${profile.data.companyName}`);
   * console.log(`Industry: ${profile.data.industry}`);
   * console.log(`Market Cap: $${profile.data.mktCap.toLocaleString()}`);
   * console.log(`Description: ${profile.data.description.substring(0, 100)}...`);
   *
   * // Get Microsoft's profile
   * const msftProfile = await fmp.company.getCompanyProfile('MSFT');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#profile-symbol|FMP Company Profile Documentation}
   */
  async getCompanyProfile(symbol: string): Promise<APIResponse<CompanyProfile>> {
    return this.client.getSingle(`/profile`, 'stable', { symbol });
  }

  /**
   * Get executive compensation and governance information
   *
   * Provides detailed compensation data for company executives including salary, bonuses,
   * stock options, and other benefits. Essential for governance analysis and understanding
   * executive pay structures and alignment with shareholder interests.
   *
   * @param symbol - The stock symbol to get executive compensation for (e.g., 'AAPL', 'MSFT', 'TSLA')
   *
   * @returns Promise resolving to array of executive compensation data with detailed pay information
   *
   * @example
   * ```typescript
   * // Get Apple's executive compensation
   * const compensation = await fmp.company.getExecutiveCompensation('AAPL');
   * compensation.data.forEach(exec => {
   *   console.log(`${exec.name} (${exec.title}):`);
   *   console.log(`  Salary: $${exec.salary.toLocaleString()}`);
   *   console.log(`  Bonus: $${exec.bonus.toLocaleString()}`);
   *   console.log(`  Stock Options: $${exec.stockAwards.toLocaleString()}`);
   * });
   *
   * // Get Tesla's executive compensation
   * const teslaComp = await fmp.company.getExecutiveCompensation('TSLA');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#executive-compensation|FMP Executive Compensation Documentation}
   */
  async getExecutiveCompensation(symbol: string): Promise<APIResponse<ExecutiveCompensation[]>> {
    return this.client.get(`/governance-executive-compensation`, 'stable', { symbol });
  }

  /**
   * Get company notes and financial disclosures
   *
   * Provides important notes and disclosures from company financial statements.
   * These notes contain critical information about accounting policies, risks,
   * contingencies, and other material information that affects financial analysis.
   *
   * @param symbol - The stock symbol to get notes for (e.g., 'AAPL', 'MSFT', 'JPM')
   *
   * @returns Promise resolving to array of company notes with detailed disclosure information
   *
   * @example
   * ```typescript
   * // Get Apple's company notes
   * const notes = await fmp.company.getCompanyNotes('AAPL');
   * notes.data.forEach(note => {
   *   console.log(`Note ${note.noteNumber}: ${note.noteTitle}`);
   *   console.log(`  Content: ${note.noteContent.substring(0, 100)}...`);
   * });
   *
   * // Get JPMorgan's notes
   * const jpmNotes = await fmp.company.getCompanyNotes('JPM');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#company-notes|FMP Company Notes Documentation}
   */
  async getCompanyNotes(symbol: string): Promise<APIResponse<CompanyNotes[]>> {
    return this.client.get(`/company-notes`, 'stable', { symbol });
  }

  /**
   * Get historical employee count data
   *
   * Provides historical data on company employee counts over time.
   * Useful for analyzing company growth, operational efficiency, and workforce trends.
   * Employee count is often a key indicator of company expansion or contraction.
   *
   * @param symbol - The stock symbol to get historical employee count for (e.g., 'AAPL', 'MSFT', 'AMZN')
   *
   * @returns Promise resolving to array of historical employee count data with year-by-year information
   *
   * @example
   * ```typescript
   * // Get Apple's employee count history
   * const employees = await fmp.company.getHistoricalEmployeeCount('AAPL');
   * employees.data.forEach(year => {
   *   console.log(`${year.year}: ${year.employeeCount.toLocaleString()} employees`);
   * });
   *
   * // Get Amazon's employee growth
   * const amazonEmployees = await fmp.company.getHistoricalEmployeeCount('AMZN');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#historical-employee-count|FMP Historical Employee Count Documentation}
   */
  async getHistoricalEmployeeCount(
    symbol: string,
  ): Promise<APIResponse<HistoricalEmployeeCount[]>> {
    return this.client.get(`/historical-employee-count`, 'stable', { symbol });
  }

  /**
   * Get current shares float information
   *
   * Provides the total number of shares that are publicly traded (float) for a company.
   * The float is calculated by subtracting restricted shares from total outstanding shares.
   * Important for understanding liquidity, volatility, and trading dynamics.
   *
   * @param symbol - The stock symbol to get shares float for (e.g., 'AAPL', 'TSLA', 'NVDA')
   *
   * @returns Promise resolving to shares float data with current float information
   *
   * @example
   * ```typescript
   * // Get Apple's shares float
   * const float = await fmp.company.getSharesFloat('AAPL');
   * console.log(`Float: ${float.data.sharesFloat.toLocaleString()} shares`);
   * console.log(`Outstanding: ${float.data.sharesOutstanding.toLocaleString()} shares`);
   * console.log(`Restricted: ${float.data.restrictedShares.toLocaleString()} shares`);
   *
   * // Get Tesla's float
   * const teslaFloat = await fmp.company.getSharesFloat('TSLA');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#shares-float|FMP Shares Float Documentation}
   */
  async getSharesFloat(symbol: string): Promise<APIResponse<SharesFloat>> {
    return this.client.getSingle(`/shares-float`, 'stable', { symbol });
  }

  /**
   * Get historical shares float data
   *
   * Provides historical data on company shares float over time.
   * Useful for analyzing changes in liquidity, share issuance, and corporate actions
   * that affect the number of publicly traded shares.
   *
   * @param symbol - The stock symbol to get historical shares float for (e.g., 'AAPL', 'TSLA', 'NVDA')
   *
   * @returns Promise resolving to array of historical shares float data with date-by-date information
   *
   * @example
   * ```typescript
   * // Get Apple's historical float
   * const historicalFloat = await fmp.company.getHistoricalSharesFloat('AAPL');
   * historicalFloat.data.forEach(entry => {
   *   console.log(`${entry.date}: ${entry.sharesFloat.toLocaleString()} shares`);
   * });
   *
   * // Get Tesla's float history
   * const teslaHistory = await fmp.company.getHistoricalSharesFloat('TSLA');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#company-historical-share-float|FMP Historical Shares Float Documentation}
   */
  async getHistoricalSharesFloat(symbol: string): Promise<APIResponse<HistoricalSharesFloat[]>> {
    return this.client.get(`/historical/shares_float`, 'v4', { symbol });
  }

  /**
   * Get earnings call transcript for specific quarter
   *
   * Provides the full transcript of a company's earnings conference call.
   * Contains detailed Q&A sessions, management commentary, and insights into
   * company performance, strategy, and future outlook.
   *
   * @param params - Earnings call transcript request parameters
   * @param params.symbol - The stock symbol to get transcript for (e.g., 'AAPL', 'MSFT', 'TSLA')
   * @param params.year - The year of the earnings call (e.g., 2024)
   * @param params.quarter - The quarter of the earnings call (1, 2, 3, or 4)
   *
   * @returns Promise resolving to earnings call transcript with full text content
   *
   * @example
   * ```typescript
   * // Get Apple's Q1 2024 earnings call
   * const transcript = await fmp.company.getEarningsCallTranscript({
   *   symbol: 'AAPL',
   *   year: 2024,
   *   quarter: 1
   * });
   * console.log(`Transcript: ${transcript.data[0].content.substring(0, 200)}...`);
   *
   * // Get Tesla's Q4 2023 earnings call
   * const teslaTranscript = await fmp.company.getEarningsCallTranscript({
   *   symbol: 'TSLA',
   *   year: 2023,
   *   quarter: 4
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#earnings-transcript-earnings-transcripts|FMP Earnings Call Transcript Documentation}
   */
  async getEarningsCallTranscript(params: {
    symbol: string;
    year: number;
    quarter: number;
  }): Promise<APIResponse<EarningsCallTranscript>> {
    const { symbol, year, quarter } = params;
    return this.client.getSingle(`/earning_call_transcript/${symbol}`, 'v3', { year, quarter });
  }

  /**
   * Get available earnings call transcript dates
   *
   * Provides a list of all available earnings call transcript dates for a company.
   * Useful for discovering which quarters have transcripts available before
   * requesting the full transcript content.
   *
   * @param symbol - The stock symbol to get transcript dates for (e.g., 'AAPL', 'MSFT', 'TSLA')
   *
   * @returns Promise resolving to array of available transcript dates with quarter information
   *
   * @example
   * ```typescript
   * // Get Apple's available transcript dates
   * const transcriptDates = await fmp.company.getCompanyTranscriptData('AAPL');
   * transcriptDates.data.forEach(date => {
   *   console.log(`Q${date.quarter} ${date.year}: ${date.date}`);
   * });
   *
   * // Get Microsoft's transcript availability
   * const msftDates = await fmp.company.getCompanyTranscriptData('MSFT');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#transcript-dates-earnings-transcripts|FMP Company Transcript Data Documentation}
   */
  async getCompanyTranscriptData(symbol: string): Promise<APIResponse<CompanyTranscriptData[]>> {
    return this.client.getSingle(`/earning_call_transcript`, 'v4', { symbol });
  }
}

import {
  APIResponse,
  EarningsCalendar,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
  EarningsConfirmed,
} from 'fmp-node-types';
import { FMPClient } from '@/client';

export class CalendarEndpoints {
  constructor(private _client: FMPClient) {}

  /**
   * Get earnings calendar data
   *
   * Provides upcoming earnings announcements for all publicly traded companies
   * within a specified date range. Essential for tracking earnings season,
   * market events, and investment timing decisions.
   *
   * @param params - Earnings calendar request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to today)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to 30 days from today)
   *
   * @returns Promise resolving to array of earnings calendar data with announcement details
   *
   * @example
   * ```typescript
   * // Get earnings calendar for next week
   * const earningsCalendar = await fmp.calendar.getEarningsCalendar({
   *   from: '2024-01-15',
   *   to: '2024-01-22'
   * });
   * earningsCalendar.data.forEach(earning => {
   *   console.log(`${earning.date}: ${earning.symbol} - Est. EPS: ${earning.estimatedEps}`);
   * });
   *
   * // Get earnings calendar for current month
   * const monthlyEarnings = await fmp.calendar.getEarningsCalendar({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#earnings-calendar-earnings|FMP Earnings Calendar Documentation}
   */
  async getEarningsCalendar(
    params: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<APIResponse<EarningsCalendar[]>> {
    const { from, to } = params;
    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this._client.get('/earning_calendar', 'v3', queryParams);
  }

  /**
   * Get confirmed earnings calendar data
   *
   * Provides confirmed earnings announcements with verified dates and times.
   * These are earnings announcements that have been officially confirmed
   * by companies, providing more reliable scheduling information.
   *
   * @param params - Confirmed earnings calendar request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to today)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to 30 days from today)
   *
   * @returns Promise resolving to array of confirmed earnings calendar data
   *
   * @example
   * ```typescript
   * // Get confirmed earnings for next week
   * const confirmedEarnings = await fmp.calendar.getEarningsConfirmed({
   *   from: '2024-01-15',
   *   to: '2024-01-22'
   * });
   * confirmedEarnings.data.forEach(earning => {
   *   console.log(`${earning.date}: ${earning.symbol} - Confirmed: ${earning.time}`);
   * });
   *
   * // Get confirmed earnings for current month
   * const monthlyConfirmed = await fmp.calendar.getEarningsConfirmed({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#earnings-confirmed-earnings|FMP Earnings Confirmed Documentation}
   */
  async getEarningsConfirmed(
    params: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<APIResponse<EarningsConfirmed[]>> {
    const { from, to } = params;
    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this._client.get('/earning-calendar-confirmed', 'v4', queryParams);
  }

  /**
   * Get dividends calendar data
   *
   * Provides upcoming dividend payments and ex-dividend dates for all
   * publicly traded companies within a specified date range. Essential
   * for dividend investors and income-focused strategies.
   *
   * @param params - Dividends calendar request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to today)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to 30 days from today)
   *
   * @returns Promise resolving to array of dividends calendar data with payment details
   *
   * @example
   * ```typescript
   * // Get dividends calendar for next week
   * const dividendsCalendar = await fmp.calendar.getDividendsCalendar({
   *   from: '2024-01-15',
   *   to: '2024-01-22'
   * });
   * dividendsCalendar.data.forEach(dividend => {
   *   console.log(`${dividend.date}: ${dividend.symbol} - Amount: $${dividend.amount}`);
   * });
   *
   * // Get dividends calendar for current month
   * const monthlyDividends = await fmp.calendar.getDividendsCalendar({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#dividends-calendar-dividends|FMP Dividends Calendar Documentation}
   */
  async getDividendsCalendar(
    params: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<APIResponse<DividendsCalendar[]>> {
    const { from, to } = params;
    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this._client.get('/stock_dividend_calendar', 'v3', queryParams);
  }

  /**
   * Get economic calendar data
   *
   * Provides upcoming economic events, indicators, and data releases
   * that can impact financial markets. Essential for understanding
   * market-moving events and economic trends.
   *
   * @param params - Economic calendar request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to today)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to 30 days from today)
   *
   * @returns Promise resolving to array of economic calendar data with event details
   *
   * @example
   * ```typescript
   * // Get economic calendar for next week
   * const economicCalendar = await fmp.calendar.getEconomicsCalendar({
   *   from: '2024-01-15',
   *   to: '2024-01-22'
   * });
   * economicCalendar.data.forEach(event => {
   *   console.log(`${event.date}: ${event.event} - Country: ${event.country}`);
   * });
   *
   * // Get economic calendar for current month
   * const monthlyEconomic = await fmp.calendar.getEconomicsCalendar({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#economics-calendar-economics-data|FMP Economic Calendar Documentation}
   */
  async getEconomicsCalendar(
    params: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<APIResponse<EconomicsCalendar[]>> {
    const { from, to } = params;
    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this._client.get('/economic_calendar', 'v3', queryParams);
  }

  /**
   * Get IPO calendar data
   *
   * Provides upcoming initial public offerings (IPOs) and their details
   * within a specified date range. Essential for tracking new market
   * entrants and investment opportunities in newly public companies.
   *
   * @param params - IPO calendar request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to today)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to 30 days from today)
   *
   * @returns Promise resolving to array of IPO calendar data with offering details
   *
   * @example
   * ```typescript
   * // Get IPO calendar for next week
   * const ipoCalendar = await fmp.calendar.getIPOCalendar({
   *   from: '2024-01-15',
   *   to: '2024-01-22'
   * });
   * ipoCalendar.data.forEach(ipo => {
   *   console.log(`${ipo.date}: ${ipo.symbol} - Price: $${ipo.price}, Shares: ${ipo.shares.toLocaleString()}`);
   * });
   *
   * // Get IPO calendar for current month
   * const monthlyIPOs = await fmp.calendar.getIPOCalendar({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#ipo-calender-by-ipo-calendar|FMP IPO Calendar Documentation}
   */
  async getIPOCalendar(
    params: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<APIResponse<IPOCalendar[]>> {
    const { from, to } = params;
    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this._client.get('/ipo_calendar', 'v3', queryParams);
  }

  /**
   * Get stock splits calendar data
   *
   * Provides upcoming stock splits for publicly traded companies within
   * a specified date range. Essential for understanding corporate actions
   * that affect share prices and trading dynamics.
   *
   * @param params - Stock splits calendar request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to today)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to 30 days from today)
   *
   * @returns Promise resolving to array of stock splits calendar data with split details
   *
   * @example
   * ```typescript
   * // Get stock splits calendar for next week
   * const splitsCalendar = await fmp.calendar.getSplitsCalendar({
   *   from: '2024-01-15',
   *   to: '2024-01-22'
   * });
   * splitsCalendar.data.forEach(split => {
   *   console.log(`${split.date}: ${split.symbol} - Ratio: ${split.numerator}:${split.denominator}`);
   * });
   *
   * // Get stock splits calendar for current month
   * const monthlySplits = await fmp.calendar.getSplitsCalendar({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#splits-calendar-splits|FMP Stock Splits Calendar Documentation}
   */
  async getSplitsCalendar(
    params: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<APIResponse<SplitsCalendar[]>> {
    const { from, to } = params;
    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this._client.get('/stock_split_calendar', 'v3', queryParams);
  }
}

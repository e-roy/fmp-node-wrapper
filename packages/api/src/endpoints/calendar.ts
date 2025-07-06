import { FMPClient } from '@/client';
import { UnwrappedAPIResponse, DateRangeParams } from '@/types';
import {
  EarningsCalendar,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
} from '@/types/calendar';

export class CalendarEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get earnings calendar
   * https://site.financialmodelingprep.com/developer/docs#earnings-calendar-earnings
   * @param from - The start date to get the earnings calendar for
   * @param to - The end date to get the earnings calendar for
   * @returns The earnings calendar
   */
  async getEarningsCalendar({ from, to }: DateRangeParams = {}): Promise<
    UnwrappedAPIResponse<EarningsCalendar[]>
  > {
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/earning_calendar', 'v3', params);
  }

  /**
   * Get dividends calendar
   * https://site.financialmodelingprep.com/developer/docs#dividends-calendar-dividends
   * @param from - The start date to get the dividends calendar for
   * @param to - The end date to get the dividends calendar for
   * @returns The dividends calendar
   */
  async getDividendsCalendar({ from, to }: DateRangeParams = {}): Promise<
    UnwrappedAPIResponse<DividendsCalendar[]>
  > {
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/stock_dividend_calendar', 'v3', params);
  }

  /**
   * Get economics calendar
   * https://site.financialmodelingprep.com/developer/docs#economics-calendar-economics-data
   * @param from - The start date to get the economics calendar for
   * @param to - The end date to get the economics calendar for
   * @returns The economics calendar
   */
  async getEconomicsCalendar({ from, to }: DateRangeParams = {}): Promise<
    UnwrappedAPIResponse<EconomicsCalendar[]>
  > {
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/economic_calendar', 'v3', params);
  }

  /**
   * Get IPO calendar
   * https://site.financialmodelingprep.com/developer/docs#ipo-calender-by-ipo-calendar
   * @param from - The start date to get the IPO calendar for
   * @param to - The end date to get the IPO calendar for
   * @returns The IPO calendar
   */
  async getIPOCalendar({ from, to }: DateRangeParams = {}): Promise<
    UnwrappedAPIResponse<IPOCalendar[]>
  > {
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/ipo_calendar', 'v3', params);
  }

  /**
   * Get stock splits calendar
   * https://site.financialmodelingprep.com/developer/docs#splits-calendar-splits
   * @param from - The start date to get the stock splits calendar for
   * @param to - The end date to get the stock splits calendar for
   * @returns The stock splits calendar
   */
  async getSplitsCalendar({ from, to }: DateRangeParams = {}): Promise<
    UnwrappedAPIResponse<SplitsCalendar[]>
  > {
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/stock_split_calendar', 'v3', params);
  }
}

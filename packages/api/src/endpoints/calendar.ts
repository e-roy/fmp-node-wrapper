import { FMPClient } from '@/client';
import { APIResponse } from '@/types';
import {
  EarningsCalendar,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
} from '@/types/calendar';
import { QueryParams } from '@/types/common';

export class CalendarEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get earnings calendar
   */
  async getEarningsCalendar(params: {
    from?: string;
    to?: string;
  }): Promise<APIResponse<EarningsCalendar[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    return this.client.get('/earning_calendar', queryParams);
  }

  /**
   * Get dividends calendar
   */
  async getDividendsCalendar(params: {
    from?: string;
    to?: string;
  }): Promise<APIResponse<DividendsCalendar[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    return this.client.get('/stock_dividend_calendar', queryParams);
  }

  /**
   * Get Economics Calendar
   */
  async getEconomicsCalendar(params: {
    from?: string;
    to?: string;
  }): Promise<APIResponse<EconomicsCalendar[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    return this.client.get('/economic_calendar', queryParams);
  }

  /**
   * Get IPO Calendar
   */
  async getIPOCalendar(params: {
    from?: string;
    to?: string;
  }): Promise<APIResponse<IPOCalendar[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    return this.client.get('/ipo_calendar', queryParams);
  }

  /**
   * Get Splits Calendar
   */
  async getSplitsCalendar(params: {
    from?: string;
    to?: string;
  }): Promise<APIResponse<SplitsCalendar[]>> {
    const queryParams: QueryParams = {};
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    return this.client.get('/stock_split_calendar', queryParams);
  }
}

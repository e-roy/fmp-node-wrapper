import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '@/types';
import {
  EarningsCalendar,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
} from '@/types/calendar';

interface CalendarParams {
  from?: string;
  to?: string;
}

export class CalendarEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get earnings calendar
   */
  async getEarningsCalendar({ from, to }: CalendarParams = {}): Promise<
    UnwrappedAPIResponse<EarningsCalendar[]>
  > {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/earnings-calendar', params);
  }

  /**
   * Get dividends calendar
   */
  async getDividendsCalendar({ from, to }: CalendarParams = {}): Promise<
    UnwrappedAPIResponse<DividendsCalendar[]>
  > {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/dividend-calendar', params);
  }

  /**
   * Get economics calendar
   */
  async getEconomicsCalendar({ from, to }: CalendarParams = {}): Promise<
    UnwrappedAPIResponse<EconomicsCalendar[]>
  > {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/economic-calendar', params);
  }

  /**
   * Get IPO calendar
   */
  async getIPOCalendar({ from, to }: CalendarParams = {}): Promise<
    UnwrappedAPIResponse<IPOCalendar[]>
  > {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/ipo-calendar', params);
  }

  /**
   * Get stock splits calendar
   */
  async getSplitsCalendar({ from, to }: CalendarParams = {}): Promise<
    UnwrappedAPIResponse<SplitsCalendar[]>
  > {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get('/stock-split-calendar', params);
  }
}

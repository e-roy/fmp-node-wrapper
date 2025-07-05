import { FMPClient } from '../client';
import { APIResponse, StockQuote, CompanyProfile } from '../types';
import {
  StockHistoricalPriceResponse,
  EarningsCalendar,
  MarketCap,
  StockSplit,
  StockDividend,
} from '../types/stock';
import { QueryParams } from '../types/common';

export class StockEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time stock quote
   */
  async getQuote({ symbol }: { symbol: string }): Promise<APIResponse<StockQuote | null>> {
    const response = await this.client.get(`/quote/${symbol}`);
    return {
      ...response,
      data: response.success && response.data && response.data.length > 0 ? response.data[0] : null,
    };
  }

  /**
   * Get company profile
   */
  async getCompanyProfile({
    symbol,
  }: {
    symbol: string;
  }): Promise<APIResponse<CompanyProfile | null>> {
    const response = await this.client.get(`/profile/${symbol}`);
    return {
      ...response,
      data: response.success && response.data && response.data.length > 0 ? response.data[0] : null,
    };
  }

  /**
   * Get historical stock prices
   */
  async getHistoricalPrice({
    symbol,
    from,
    to,
  }: {
    symbol: string;
    from?: string;
    to?: string;
  }): Promise<APIResponse<StockHistoricalPriceResponse>> {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    return this.client.get(
      `/historical-price-full/${symbol}${queryString ? `?${queryString}` : ''}`,
    );
  }

  /**
   * Get market capitalization
   */
  async getMarketCap({ symbol }: { symbol: string }): Promise<APIResponse<MarketCap | null>> {
    // return this.client.get(`/market-capitalization/${symbol}`);
    const response = await this.client.get(`/market-capitalization/${symbol}`);
    return {
      ...response,
      data: response.success && response.data && response.data.length > 0 ? response.data[0] : null,
    };
  }

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
   * Get stock splits
   */
  async getStockSplits({ symbol }: { symbol: string }): Promise<APIResponse<StockSplit[]>> {
    return this.client.get(`/stock_split_calendar/${symbol}`);
  }

  /**
   * Get dividend history
   */
  async getDividendHistory({ symbol }: { symbol: string }): Promise<APIResponse<StockDividend[]>> {
    const response = await this.client.get(`/historical-price-full/stock_dividend/${symbol}`);
    // The API returns { symbol, historical: [...] }
    return {
      ...response,
      data:
        response.success && response.data && Array.isArray(response.data.historical)
          ? response.data.historical
          : [],
    };
  }
}

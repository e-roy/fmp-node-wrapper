import { FMPClient } from '@/client';
import { UnwrappedAPIResponse, CompanyProfile, DateRangeParams } from '@/types';
import {
  StockHistoricalPriceResponse,
  MarketCap,
  StockSplit,
  StockDividend,
  StockQuote,
} from '@/types/stock';

export class StockEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time stock quote
   * https://site.financialmodelingprep.com/developer/docs#full-quote-quote
   * @param symbol - The stock symbol to get the quote for
   * @returns This endpoint gives you the latest bid and ask prices for a stock, as well as the volume and last trade price in real time.
   */
  async getQuote({ symbol }: { symbol: string }): Promise<UnwrappedAPIResponse<StockQuote | null>> {
    return this.client.get(`/quote/${symbol}`, 'v3');
  }

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
  }): Promise<UnwrappedAPIResponse<CompanyProfile | null>> {
    return this.client.get(`/profile/${symbol}`, 'v3');
  }

  /**
   * Get historical stock prices
   * https://site.financialmodelingprep.com/developer/docs#daily-chart-charts
   * @param symbol - The stock symbol to get the historical prices for
   * @param from - The start date to get the historical prices for
   * @param to - The end date to get the historical prices for
   * @returns The FMP Daily Chart endpoint provides daily stock data for a specified company, including opening, high, low, and closing prices, with a default limit of 5 years of historical data. To access data beyond this limit, use the from and to parameters for custom date ranges, each with a 5-year limit
   */
  async getHistoricalPrice({
    symbol,
    from,
    to,
  }: {
    symbol: string;
    from?: string;
    to?: string;
  }): Promise<UnwrappedAPIResponse<StockHistoricalPriceResponse>> {
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, 'v3', params);
  }

  /**
   * Get market cap
   * https://site.financialmodelingprep.com/developer/docs#market-cap-company-information
   * @param symbol - The stock symbol to get the market cap for
   * @returns The FMP Market Cap endpoint provides the current market capitalization of a company. Market cap is a measure of the size and relative importance of a company in the stock market. It is calculated by multiplying the current share price by the number of outstanding shares.
   */
  async getMarketCap({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<MarketCap | null>> {
    return this.client.get(`/market-capitalization/${symbol}`, 'v3');
  }

  /**
   * Get stock splits
   * https://site.financialmodelingprep.com/developer/docs#splits-historical-splits
   * @param symbol - The stock symbol to get the splits for
   * @returns A list of historical stock splits for publicly traded companies, including the date of the stock split, the split ratio, and the type of stock split.
   */
  async getStockSplits({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<StockSplit[]>> {
    return this.client.get(`/stock-split-calendar/${symbol}`, 'v3');
  }

  /**
   * Get dividend history
   * https://site.financialmodelingprep.com/developer/docs#dividends-historical-dividends
   * @param symbol - The stock symbol to get the dividend history for
   * @returns A list of historical dividend payments for publicly traded companies, including the date of the dividend payment, the ex-dividend date, and the dividend per share.
   */
  async getDividendHistory({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<StockDividend[]>> {
    return this.client.get(`/historical-price-full/stock_dividend/${symbol}`, 'v3');
  }
}

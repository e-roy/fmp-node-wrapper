import { FMPClient } from '@/client';
import { APIResponse, DateRangeParams } from '@/types/common';
import { HistoricalPriceResponse } from '@/types/quote';
import { MarketCap, StockSplitResponse, StockQuote, StockDividendResponse } from '@/types/stock';

export class StockEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time stock quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in version 0.1.0.
   * @param symbol - The stock symbol to get the quote for
   * @returns This endpoint gives you the latest bid and ask prices for a stock, as well as the volume and last trade price in real time.
   */
  async getQuote({ symbol }: { symbol: string }): Promise<APIResponse<StockQuote | null>> {
    console.warn(
      '⚠️  StockEndpoints.getQuote() is deprecated. Use fmp.quote.getQuote() instead. This method will be removed in version 0.1.0.',
    );
    return this.client.getSingle(`/quote/${symbol}`, 'v3');
  }

  /**
   * Get historical stock prices
   * @deprecated Use `fmp.quote.getHistoricalPrice()` instead. This method will be removed in version 0.1.0.
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
  }): Promise<APIResponse<HistoricalPriceResponse>> {
    console.warn(
      '⚠️  StockEndpoints.getHistoricalPrice() is deprecated. Use fmp.quote.getHistoricalPrice() instead. This method will be removed in version 0.1.0.',
    );
    const params: DateRangeParams = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.getSingle(`/historical-price-full/${symbol}`, 'v3', params);
  }

  /**
   * Get market cap
   * https://site.financialmodelingprep.com/developer/docs#market-cap-company-information
   * @param symbol - The stock symbol to get the market cap for
   * @returns The FMP Market Cap endpoint provides the current market capitalization of a company. Market cap is a measure of the size and relative importance of a company in the stock market. It is calculated by multiplying the current share price by the number of outstanding shares.
   */
  async getMarketCap({ symbol }: { symbol: string }): Promise<APIResponse<MarketCap | null>> {
    return this.client.getSingle(`/market-capitalization/${symbol}`, 'v3');
  }

  /**
   * Get stock splits
   * https://site.financialmodelingprep.com/developer/docs#splits-historical-splits
   * @param symbol - The stock symbol to get the splits for
   * @returns A list of historical stock splits for publicly traded companies, including the date of the stock split, the split ratio, and the type of stock split.
   */
  async getStockSplits({ symbol }: { symbol: string }): Promise<APIResponse<StockSplitResponse>> {
    return this.client.get(`/historical-price-full/stock_split/${symbol}`, 'v3');
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
  }): Promise<APIResponse<StockDividendResponse>> {
    return this.client.getSingle(`/historical-price-full/stock_dividend/${symbol}`, 'v3');
  }
}

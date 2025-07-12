import { FMPClient } from '@/client';
import { APIResponse, DateRangeParams } from '@/types/common';
import { HistoricalPriceResponse } from '@/types/quote';
import {
  MarketCap,
  StockSplitResponse,
  StockQuote,
  StockDividendResponse,
  StockRealTimePrice,
  StockRealTimePriceFull,
  StockListResponse,
  CompaniesPriceListResponse,
} from '@/types/stock';

export class StockEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time stock quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in version 0.1.0.
   * @param symbol - The stock symbol to get the quote for
   * @returns This endpoint gives you the latest bid and ask prices for a stock, as well as the volume and last trade price in real time.
   */
  async getQuote({ symbol }: { symbol: string }): Promise<APIResponse<StockQuote>> {
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
  async getMarketCap({ symbol }: { symbol: string }): Promise<APIResponse<MarketCap>> {
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

  /**
   * Get stock real time price
   * @param symbol - The stock symbol to get the real time price for
   * @returns The real time price for the stock
   */
  async getRealTimePrice({
    symbols,
  }: {
    symbols: string[];
  }): Promise<APIResponse<StockRealTimePrice[]>> {
    const url = `stock/real-time-price/${symbols.join(',')}`;
    const result = await this.client.get(url, 'v3');
    if (result.success && result.data && !Array.isArray(result.data)) {
      const data = result.data as
        | StockListResponse<StockRealTimePrice>
        | CompaniesPriceListResponse<StockRealTimePrice>
        | StockRealTimePrice;

      // Check for companiesPriceList (when symbols are provided)
      if (
        typeof data === 'object' &&
        data !== null &&
        'companiesPriceList' in data &&
        Array.isArray(data.companiesPriceList)
      ) {
        const filteredData = data.companiesPriceList.filter(item => item && item.symbol);
        if (filteredData.length > 0) {
          return { ...result, data: filteredData };
        }
      }

      // Check for stockList (when no symbols are provided - all stocks)
      if (
        typeof data === 'object' &&
        data !== null &&
        'stockList' in data &&
        Array.isArray(data.stockList)
      ) {
        const filteredData = data.stockList.filter(item => item && item.symbol);
        if (filteredData.length > 0) {
          return { ...result, data: filteredData };
        }
      }

      // fallback: wrap single object in array if it has a symbol
      if ((data as StockRealTimePrice).symbol) {
        return { ...result, data: [data as StockRealTimePrice] };
      }

      if (symbols.length === 1) {
        console.warn(`No real-time price data found for symbol: ${symbols[0]}`);
      }
      return { ...result, data: [] };
    }
    const filteredData = (result.data as StockRealTimePrice[]).filter(item => item && item.symbol);
    return { ...result, data: filteredData };
  }

  /**
   * Get stock real time price full
   * https://site.financialmodelingprep.com/developer/docs#real-time-full-price-quote
   * @param symbols - The stock symbols to get the real time price for
   * @returns The real time price for the stocks
   */
  async getRealTimePriceForMultipleStocks({
    symbols,
  }: {
    symbols: string[];
  }): Promise<APIResponse<StockRealTimePriceFull[]>> {
    const url = `stock/full/real-time-price/${symbols.join(',')}`;
    const result = await this.client.get(url, 'v3');
    if (result.success && result.data && !Array.isArray(result.data)) {
      const data = result.data as
        | StockListResponse<StockRealTimePriceFull>
        | CompaniesPriceListResponse<StockRealTimePriceFull>
        | StockRealTimePriceFull;

      // Check for companiesPriceList (when symbols are provided)
      if (
        typeof data === 'object' &&
        data !== null &&
        'companiesPriceList' in data &&
        Array.isArray(data.companiesPriceList)
      ) {
        const filteredData = data.companiesPriceList.filter(item => item && item.symbol);
        if (filteredData.length > 0) {
          return { ...result, data: filteredData };
        }
      }

      // Check for stockList (when no symbols are provided - all stocks)
      if (
        typeof data === 'object' &&
        data !== null &&
        'stockList' in data &&
        Array.isArray(data.stockList)
      ) {
        const filteredData = data.stockList.filter(item => item && item.symbol);
        if (filteredData.length > 0) {
          return { ...result, data: filteredData };
        }
      }

      if ((data as StockRealTimePriceFull).symbol) {
        return { ...result, data: [data as StockRealTimePriceFull] };
      }

      if (symbols.length === 1) {
        console.warn(`No full real-time price data found for symbol: ${symbols[0]}`);
      }
      return { ...result, data: [] };
    }
    const filteredData = (result.data as StockRealTimePriceFull[]).filter(
      item => item && item.symbol,
    );
    return { ...result, data: filteredData };
  }
}

import { FMPClient } from '@/client';
import {
  APIResponse,
  MarketCap,
  StockSplitResponse,
  StockDividendResponse,
  StockRealTimePrice,
  StockRealTimePriceFull,
  StockListResponse,
  CompaniesPriceListResponse,
} from 'fmp-node-types';

export class StockEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get current market capitalization for a stock
   *
   * Market capitalization represents the total value of a company's outstanding shares.
   * Calculated by multiplying the current share price by the number of outstanding shares.
   * This metric is crucial for understanding a company's size and market position.
   *
   * @param symbol - The stock symbol to get market cap for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   *
   * @returns Promise resolving to market cap data including symbol, date, and market cap value
   *
   * @example
   * ```typescript
   * // Get market cap for Apple
   * const marketCap = await fmp.stock.getMarketCap('AAPL');
   * console.log(`Apple's market cap: $${marketCap.data.marketCap.toLocaleString()}`);
   *
   * // Get market cap for Microsoft
   * const msftCap = await fmp.stock.getMarketCap('MSFT');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#market-cap-company-information|FMP Market Cap Documentation}
   */
  async getMarketCap(symbol: string): Promise<APIResponse<MarketCap>> {
    return this.client.getSingle(`/market-capitalization/${symbol}`, 'v3');
  }

  /**
   * Get historical stock splits for a company
   *
   * Stock splits occur when a company increases the number of shares by dividing existing shares.
   * This endpoint provides the complete history of stock splits including dates, ratios, and split types.
   * Useful for adjusting historical price data and understanding corporate actions.
   *
   * @param symbol - The stock symbol to get split history for (e.g., 'AAPL', 'TSLA', 'NVDA')
   *
   * @returns Promise resolving to historical stock splits with dates, labels, and split ratios
   *
   * @example
   * ```typescript
   * // Get Apple's split history
   * const splits = await fmp.stock.getStockSplits('AAPL');
   * splits.data.historical.forEach(split => {
   *   console.log(`${split.date}: ${split.numerator}:${split.denominator} split`);
   * });
   *
   * // Get Tesla's split history
   * const teslaSplits = await fmp.stock.getStockSplits('TSLA');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#splits-historical-splits|FMP Stock Splits Documentation}
   */
  async getStockSplits(symbol: string): Promise<APIResponse<StockSplitResponse>> {
    return this.client.get(`/historical-price-full/stock_split/${symbol}`, 'v3');
  }

  /**
   * Get historical dividend payments for a stock
   *
   * Dividends are periodic payments made by companies to shareholders from profits.
   * This endpoint provides the complete dividend history including payment dates, amounts,
   * and important dates like ex-dividend, record, and declaration dates.
   *
   * @param symbol - The stock symbol to get dividend history for (e.g., 'KO', 'JNJ', 'PG')
   *
   * @returns Promise resolving to dividend history with payment details and important dates
   *
   * @example
   * ```typescript
   * // Get Coca-Cola's dividend history
   * const dividends = await fmp.stock.getDividendHistory('KO');
   * dividends.data.historical.forEach(dividend => {
   *   console.log(`${dividend.date}: $${dividend.dividend} per share`);
   * });
   *
   * // Get Johnson & Johnson's dividend history
   * const jnjDividends = await fmp.stock.getDividendHistory('JNJ');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#dividends-historical-dividends|FMP Dividends Documentation}
   */
  async getDividendHistory(symbol: string): Promise<APIResponse<StockDividendResponse>> {
    return this.client.getSingle(`/historical-price-full/stock_dividend/${symbol}`, 'v3');
  }

  /**
   * Get real-time stock prices for multiple symbols
   *
   * Provides current market prices for stocks with minimal data overhead.
   * Returns basic price information including symbol and current price.
   * Ideal for quick price checks and portfolio monitoring.
   *
   * @param symbols - Array of stock symbols to get real-time prices for
   *
   * @returns Promise resolving to array of real-time price data with symbol and price
   *
   * @example
   * ```typescript
   * // Get prices for multiple tech stocks
   * const prices = await fmp.stock.getRealTimePrice([
   *   'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'
   * ]);
   *
   * prices.data.forEach(stock => {
   *   console.log(`${stock.symbol}: $${stock.price}`);
   * });
   *
   * // Get price for single stock
   * const aaplPrice = await fmp.stock.getRealTimePrice(['AAPL']);
   * ```
   */
  async getRealTimePrice(symbols: string[]): Promise<APIResponse<StockRealTimePrice[]>> {
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
   * Get comprehensive real-time stock data for multiple symbols
   *
   * Provides detailed real-time market data including bid/ask prices, volume, trade sizes,
   * and timestamps. This endpoint offers much more information than the basic real-time price.
   * Perfect for trading applications, market analysis, and detailed price monitoring.
   *
   * @param symbols - Array of stock symbols to get detailed real-time data for
   *
   * @returns Promise resolving to array of detailed real-time data including bid/ask, volume, and timestamps
   *
   * @example
   * ```typescript
   * // Get detailed data for multiple stocks
   * const detailedData = await fmp.stock.getRealTimePriceForMultipleStocks([
   *   'AAPL', 'MSFT', 'GOOGL'
   * ]);
   *
   * detailedData.data.forEach(stock => {
   *   console.log(`${stock.symbol}:`);
   *   console.log(`  Bid: $${stock.bidPrice} (${stock.bidSize} shares)`);
   *   console.log(`  Ask: $${stock.askPrice} (${stock.askSize} shares)`);
   *   console.log(`  Last: $${stock.lastSalePrice} (${stock.lastSaleSize} shares)`);
   *   console.log(`  Volume: ${stock.volume.toLocaleString()}`);
   * });
   *
   * // Get detailed data for single stock
   * const aaplDetailed = await fmp.stock.getRealTimePriceForMultipleStocks(['AAPL']);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#real-time-full-price-quote|FMP Real-Time Full Price Documentation}
   */
  async getRealTimePriceForMultipleStocks(
    symbols: string[],
  ): Promise<APIResponse<StockRealTimePriceFull[]>> {
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

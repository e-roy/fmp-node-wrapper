// Senate and House trading endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  HouseTradingResponse,
  SenateTradingResponse,
  SenateHouseTradingByNameResponse,
} from '@/types/senate-house';

export class SenateHouseEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get senate trading data for a specific stock symbol
   *
   * Provides detailed information about senate members' trading activities for a specific stock.
   * Includes transaction details, amounts, dates, and ownership information for transparency
   * and compliance with the STOCK Act (Stop Trading on Congressional Knowledge).
   *
   * @param params - Senate trading request parameters
   * @param params.symbol - The stock symbol to get senate trading data for (e.g., 'AAPL', 'MSFT', 'TSLA')
   *
   * @returns Promise resolving to array of senate trading data with transaction details
   *
   * @example
   * ```typescript
   * // Get senate trading data for Apple
   * const appleSenateTrading = await fmp.senateHouse.getSenateTrading({ symbol: 'AAPL' });
   * appleSenateTrading.data.forEach(trade => {
   *   console.log(`${trade.firstName} ${trade.lastName} (${trade.office}):`);
   *   console.log(`  ${trade.type} ${trade.amount} of ${trade.assetDescription}`);
   *   console.log(`  Transaction Date: ${trade.transactionDate}`);
   * });
   *
   * // Get senate trading data for Tesla
   * const teslaSenateTrading = await fmp.senateHouse.getSenateTrading({ symbol: 'TSLA' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#senate-trading|FMP Senate Trading Documentation}
   */
  async getSenateTrading(params: {
    symbol: string;
  }): Promise<APIResponse<SenateTradingResponse[]>> {
    const { symbol } = params;
    return this.client.get(`/senate-trading`, 'v4', { symbol });
  }

  /**
   * Get senate trading RSS feed with pagination
   *
   * Provides a paginated RSS feed of all senate trading activities across all stocks.
   * Useful for monitoring congressional trading activities, compliance tracking,
   * and transparency reporting. Returns recent trading disclosures from senate members.
   *
   * @param params - Senate trading RSS feed request parameters
   * @param params.page - The page number to retrieve (starts from 0)
   *
   * @returns Promise resolving to array of senate trading data from RSS feed
   *
   * @example
   * ```typescript
   * // Get first page of senate trading RSS feed
   * const firstPage = await fmp.senateHouse.getSenateTradingRSSFeed({ page: 0 });
   * console.log(`First page: ${firstPage.data.length} trading activities`);
   *
   * // Get second page of senate trading RSS feed
   * const secondPage = await fmp.senateHouse.getSenateTradingRSSFeed({ page: 1 });
   * console.log(`Second page: ${secondPage.data.length} trading activities`);
   *
   * // Get recent senate trading activities
   * const recentTrades = await fmp.senateHouse.getSenateTradingRSSFeed({ page: 0 });
   * recentTrades.data.forEach(trade => {
   *   console.log(`${trade.firstName} ${trade.lastName}: ${trade.type} ${trade.amount}`);
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#senate-trading-rss-feed-senate|FMP Senate Trading RSS Feed Documentation}
   */
  async getSenateTradingRSSFeed(params: {
    page: number;
  }): Promise<APIResponse<SenateTradingResponse[]>> {
    const { page } = params;
    return this.client.get('/senate-trading-rss-feed', 'v4', { page });
  }

  /**
   * Get senate trading data for a specific senator by name
   *
   * Provides detailed trading activities for a specific senate member across all stocks.
   * Useful for tracking individual senator's trading patterns, compliance monitoring,
   * and transparency reporting. Returns all trading disclosures for the specified senator.
   *
   * @param params - Senate trading by name request parameters
   * @param params.name - The name of the senator to get trading data for (e.g., 'John Smith', 'Jane Doe')
   *
   * @returns Promise resolving to array of senate trading data for the specified senator
   *
   * @example
   * ```typescript
   * // Get trading data for Senator John Smith
   * const johnSmithTrades = await fmp.senateHouse.getSenateTradingByName({ name: 'John Smith' });
   * johnSmithTrades.data.forEach(trade => {
   *   console.log(`${trade.symbol}: ${trade.type} ${trade.amount}`);
   *   console.log(`  Transaction Date: ${trade.transactionDate}`);
   *   console.log(`  Asset: ${trade.assetDescription}`);
   * });
   *
   * // Get trading data for Senator Jane Doe
   * const janeDoeTrades = await fmp.senateHouse.getSenateTradingByName({ name: 'Jane Doe' });
   * console.log(`Jane Doe has ${janeDoeTrades.data.length} trading activities`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#senate-trading-by-name|FMP Senate Trading by Name Documentation}
   */
  async getSenateTradingByName(params: {
    name: string;
  }): Promise<APIResponse<SenateHouseTradingByNameResponse[]>> {
    const { name } = params;
    return this.client.get('/senate-trades-by-name', 'stable', { name });
  }

  /**
   * Get house trading data for a specific stock symbol
   *
   * Provides detailed information about house representatives' trading activities for a specific stock.
   * Includes transaction details, amounts, dates, and district information for transparency
   * and compliance with the STOCK Act (Stop Trading on Congressional Knowledge).
   *
   * @param params - House trading request parameters
   * @param params.symbol - The stock symbol to get house trading data for (e.g., 'AAPL', 'MSFT', 'TSLA')
   *
   * @returns Promise resolving to array of house trading data with transaction details
   *
   * @example
   * ```typescript
   * // Get house trading data for Apple
   * const appleHouseTrading = await fmp.senateHouse.getHouseTrading({ symbol: 'AAPL' });
   * appleHouseTrading.data.forEach(trade => {
   *   console.log(`${trade.representative} (District ${trade.district}):`);
   *   console.log(`  ${trade.type} ${trade.amount} of ${trade.assetDescription}`);
   *   console.log(`  Transaction Date: ${trade.transactionDate}`);
   * });
   *
   * // Get house trading data for Microsoft
   * const msftHouseTrading = await fmp.senateHouse.getHouseTrading({ symbol: 'MSFT' });
   * console.log(`Microsoft house trading activities: ${msftHouseTrading.data.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#house-disclosure|FMP House Trading Documentation}
   */
  async getHouseTrading(params: { symbol: string }): Promise<APIResponse<HouseTradingResponse[]>> {
    const { symbol } = params;

    return this.client.get('/senate-disclosure', 'v4', { symbol });
  }

  /**
   * Get house trading RSS feed with pagination
   *
   * Provides a paginated RSS feed of all house trading activities across all stocks.
   * Useful for monitoring congressional trading activities, compliance tracking,
   * and transparency reporting. Returns recent trading disclosures from house representatives.
   *
   * @param params - House trading RSS feed request parameters
   * @param params.page - The page number to retrieve (starts from 0)
   *
   * @returns Promise resolving to array of house trading data from RSS feed
   *
   * @example
   * ```typescript
   * // Get first page of house trading RSS feed
   * const firstPage = await fmp.senateHouse.getHouseTradingRSSFeed({ page: 0 });
   * console.log(`First page: ${firstPage.data.length} trading activities`);
   *
   * // Get second page of house trading RSS feed
   * const secondPage = await fmp.senateHouse.getHouseTradingRSSFeed({ page: 1 });
   * console.log(`Second page: ${secondPage.data.length} trading activities`);
   *
   * // Get recent house trading activities
   * const recentTrades = await fmp.senateHouse.getHouseTradingRSSFeed({ page: 0 });
   * recentTrades.data.forEach(trade => {
   *   console.log(`${trade.representative} (District ${trade.district}): ${trade.type} ${trade.amount}`);
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#house-disclosure-rss-feed-senate|FMP House Trading RSS Feed Documentation}
   */
  async getHouseTradingRSSFeed(params: {
    page: number;
  }): Promise<APIResponse<HouseTradingResponse[]>> {
    const { page } = params;
    return this.client.get('/senate-disclosure-rss-feed', 'v4', { page });
  }

  /**
   * Get house trading data for a specific representative by name
   *
   * Provides detailed trading activities for a specific house representative across all stocks.
   * Useful for tracking individual representative's trading patterns, compliance monitoring,
   * and transparency reporting. Returns all trading disclosures for the specified representative.
   *
   * @param params - House trading by name request parameters
   * @param params.name - The name of the representative to get trading data for (e.g., 'John Smith', 'Jane Doe')
   *
   * @returns Promise resolving to array of house trading data for the specified representative
   *
   * @example
   * ```typescript
   * // Get trading data for Representative John Smith
   * const johnSmithTrades = await fmp.senateHouse.getHouseTradingByName({ name: 'John Smith' });
   * johnSmithTrades.data.forEach(trade => {
   *   console.log(`${trade.symbol}: ${trade.type} ${trade.amount}`);
   *   console.log(`  Transaction Date: ${trade.transactionDate}`);
   *   console.log(`  Asset: ${trade.assetDescription}`);
   *   console.log(`  District: ${trade.district}`);
   * });
   *
   * // Get trading data for Representative Jane Doe
   * const janeDoeTrades = await fmp.senateHouse.getHouseTradingByName({ name: 'Jane Doe' });
   * console.log(`Jane Doe has ${janeDoeTrades.data.length} trading activities`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#house-trading-by-name|FMP House Trading by Name Documentation}
   */
  async getHouseTradingByName(params: {
    name: string;
  }): Promise<APIResponse<SenateHouseTradingByNameResponse[]>> {
    const { name } = params;
    return this.client.get('/house-trades-by-name', 'stable', { name });
  }
}

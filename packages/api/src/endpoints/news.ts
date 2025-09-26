// News endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, Article, News } from 'fmp-node-types';

export class NewsEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get FMP's curated financial articles and market insights
   *
   * Retrieves Financial Modeling Prep's own articles covering market analysis,
   * financial insights, and educational content. These articles provide valuable
   * context and analysis beyond raw market data.
   *
   * @param params - Article request parameters
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of FMP articles with content and metadata
   *
   * @example
   * ```typescript
   * // Get latest FMP articles
   * const articles = await fmp.news.getArticles({
   *   page: 1,
   *   limit: 10
   * });
   *
   * // Get first page with default limit
   * const latestArticles = await fmp.news.getArticles({ page: 1 });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#fmp-articles|FMP Articles Documentation}
   */
  async getArticles(
    params: { page?: number; limit?: number } = {},
  ): Promise<APIResponse<Article[]>> {
    const { page = 1, limit = 100 } = params;
    return this.client.get('/fmp-articles', 'stable', { page, limit });
  }

  /**
   * Get latest stock market news from various financial sources
   *
   * Retrieves the most recent stock market news articles from multiple financial
   * news sources. Perfect for staying updated on market movements, earnings
   * announcements, and corporate developments.
   *
   * @param params - Stock news request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of stock news articles with timestamps and sources
   *
   * @example
   * ```typescript
   * // Get latest stock news
   * const stockNews = await fmp.news.getStockNews({
   *   limit: 20
   * });
   *
   * // Get stock news from specific date range
   * const recentNews = await fmp.news.getStockNews({
   *   from: '2024-01-01',
   *   to: '2024-01-15',
   *   limit: 50
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#stock-news|Stock News Documentation}
   */
  async getStockNews(
    params: {
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
    } = {},
  ): Promise<APIResponse<News[]>> {
    const { from, to, page = 1, limit = 100 } = params;
    const queryParams: { from?: string; to?: string; page: number; limit: number } = {
      page,
      limit,
    };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get('/news/stock-latest', 'stable', queryParams);
  }

  /**
   * Get latest cryptocurrency news from various sources
   *
   * Retrieves the most recent cryptocurrency news articles covering market trends,
   * regulatory updates, technology developments, and major crypto events.
   * Essential for crypto traders and investors.
   *
   * @param params - Crypto news request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of cryptocurrency news articles
   *
   * @example
   * ```typescript
   * // Get latest crypto news
   * const cryptoNews = await fmp.news.getCryptoNews({
   *   limit: 15
   * });
   *
   * // Get crypto news from last week
   * const weeklyCryptoNews = await fmp.news.getCryptoNews({
   *   from: '2024-01-08',
   *   to: '2024-01-15'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#crypto-news|Crypto News Documentation}
   */
  async getCryptoNews(
    params: {
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
    } = {},
  ): Promise<APIResponse<News[]>> {
    const { from, to, page = 1, limit = 100 } = params;
    const queryParams: { from?: string; to?: string; page: number; limit: number } = {
      page,
      limit,
    };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get('/news/crypto-latest', 'stable', queryParams);
  }

  /**
   * Get latest forex (foreign exchange) market news
   *
   * Retrieves the most recent forex market news covering currency movements,
   * central bank announcements, economic indicators, and geopolitical events
   * that impact currency markets.
   *
   * @param params - Forex news request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of forex news articles
   *
   * @example
   * ```typescript
   * // Get latest forex news
   * const forexNews = await fmp.news.getForexNews({
   *   limit: 25
   * });
   *
   * // Get forex news from specific period
   * const forexUpdates = await fmp.news.getForexNews({
   *   from: '2024-01-10',
   *   limit: 30
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#forex-news|Forex News Documentation}
   */
  async getForexNews(
    params: {
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
    } = {},
  ): Promise<APIResponse<News[]>> {
    const { from, to, page = 1, limit = 100 } = params;
    const queryParams: { from?: string; to?: string; page: number; limit: number } = {
      page,
      limit,
    };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get('/news/forex-latest', 'stable', queryParams);
  }

  /**
   * Get stock news filtered by specific company symbols
   *
   * Retrieves news articles specifically related to the provided stock symbols.
   * Perfect for monitoring news about specific companies in your portfolio or
   * watchlist. Supports multiple symbols for efficient batch news retrieval.
   *
   * @param params - Symbol-specific stock news request parameters
   * @param params.symbols - Array of stock symbols to get news for (required)
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of news articles filtered by the specified symbols
   *
   * @example
   * ```typescript
   * // Get news for specific stocks
   * const appleNews = await fmp.news.getStockNewsBySymbol({
   *   symbols: ['AAPL'],
   *   limit: 10
   * });
   *
   * // Get news for multiple tech stocks
   * const techNews = await fmp.news.getStockNewsBySymbol({
   *   symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'],
   *   from: '2024-01-01',
   *   limit: 20
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#search-stock-news|Search Stock News Documentation}
   */
  async getStockNewsBySymbol(params: {
    symbols: string[];
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<News[]>> {
    const { symbols, from, to, page = 1, limit = 100 } = params;
    const symbolsString = symbols.join(',');
    const queryParams: { from?: string; to?: string; page: number; limit: number } = {
      page,
      limit,
    };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get(`/news/stock?symbols=${symbolsString}`, 'stable', queryParams);
  }

  /**
   * Get cryptocurrency news filtered by specific crypto symbols
   *
   * Retrieves news articles specifically related to the provided cryptocurrency
   * symbols. Ideal for monitoring news about specific cryptocurrencies in your
   * portfolio or tracking particular digital assets.
   *
   * @param params - Symbol-specific crypto news request parameters
   * @param params.symbols - Array of cryptocurrency symbols to get news for (required)
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of news articles filtered by the specified crypto symbols
   *
   * @example
   * ```typescript
   * // Get news for Bitcoin
   * const bitcoinNews = await fmp.news.getCryptoNewsBySymbol({
   *   symbols: ['BTCUSD'],
   *   limit: 15
   * });
   *
   * // Get news for multiple cryptocurrencies
   * const cryptoNews = await fmp.news.getCryptoNewsBySymbol({
   *   symbols: ['BTCUSD', 'ETHUSD', 'ADAUSD'],
   *   from: '2024-01-01',
   *   limit: 25
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#search-crypto-news|Search Crypto News Documentation}
   */
  async getCryptoNewsBySymbol(params: {
    symbols: string[];
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<News[]>> {
    const { symbols, from, to, page = 1, limit = 100 } = params;
    const symbolsString = symbols.join(',');
    const queryParams: { from?: string; to?: string; page: number; limit: number } = {
      page,
      limit,
    };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get(`/news/crypto?symbols=${symbolsString}`, 'stable', queryParams);
  }

  /**
   * Get forex news filtered by specific currency pair symbols
   *
   * Retrieves news articles specifically related to the provided forex currency
   * pairs. Perfect for monitoring news about specific currency pairs you're
   * trading or analyzing for forex market movements.
   *
   * @param params - Symbol-specific forex news request parameters
   * @param params.symbols - Array of forex currency pair symbols to get news for (required)
   * @param params.from - Start date in YYYY-MM-DD format (optional)
   * @param params.to - End date in YYYY-MM-DD format (optional)
   * @param params.page - Page number for pagination (optional, defaults to 1)
   * @param params.limit - Number of articles per page (optional, defaults to 100)
   *
   * @returns Promise resolving to an array of news articles filtered by the specified forex symbols
   *
   * @example
   * ```typescript
   * // Get news for EUR/USD pair
   * const eurUsdNews = await fmp.news.getForexNewsBySymbol({
   *   symbols: ['EURUSD'],
   *   limit: 10
   * });
   *
   * // Get news for multiple currency pairs
   * const forexNews = await fmp.news.getForexNewsBySymbol({
   *   symbols: ['EURUSD', 'GBPUSD', 'USDJPY'],
   *   from: '2024-01-01',
   *   limit: 20
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#search-forex-news|Search Forex News Documentation}
   */
  async getForexNewsBySymbol(params: {
    symbols: string[];
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<News[]>> {
    const { symbols, from, to, page = 1, limit = 100 } = params;
    const symbolsString = symbols.join(',');
    const queryParams: { from?: string; to?: string; page: number; limit: number } = {
      page,
      limit,
    };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get(`/news/forex?symbols=${symbolsString}`, 'stable', queryParams);
  }
}

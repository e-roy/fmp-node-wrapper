// Market endpoints for FMP API

import { FMPClient } from '@/client';
import {
  APIResponse,
  ExchangeMarketHours,
  MarketPerformance,
  MarketSectorPerformance,
  IndustryPESnapshot,
  MarketIndex,
} from 'fmp-node-types';

export class MarketEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get trading hours and current open/closed status for all exchanges
   *
   * Returns one record per supported exchange (NYSE, NASDAQ, LSE, etc.) with its
   * opening/closing hours, timezone, and whether it is currently open. Essential
   * for determining trading availability across global markets.
   *
   * @returns Promise resolving to an array of per-exchange market-hours records
   *
   * @example
   * ```typescript
   * // Get market status for every exchange
   * const hours = await fmp.market.getMarketHours();
   *
   * // Check whether the NASDAQ is currently open
   * const nasdaq = hours.data.find(e => e.exchange === 'NASDAQ');
   * console.log(`NASDAQ is ${nasdaq?.isMarketOpen ? 'OPEN' : 'CLOSED'}`);
   *
   * // List all currently-open exchanges
   * const open = hours.data.filter(e => e.isMarketOpen).map(e => e.exchange);
   * console.log(`Open now: ${open.join(', ')}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable/all-exchange-market-hours|FMP Exchange Market Hours Documentation}
   */
  async getMarketHours(): Promise<APIResponse<ExchangeMarketHours[]>> {
    return this.client.get('/all-exchange-market-hours', 'stable');
  }

  /**
   * Get overall market performance data
   *
   * Provides comprehensive market performance data including major indices,
   * market breadth, and key performance metrics. Essential for understanding
   * overall market sentiment, trends, and daily market activity.
   *
   * @returns Promise resolving to array of market performance data with indices and metrics
   *
   * @example
   * ```typescript
   * // Get overall market performance
   * const marketPerformance = await fmp.market.getMarketPerformance();
   * marketPerformance.data.forEach(market => {
   *   console.log(`${market.index}: ${market.change} (${market.changesPercentage}%)`);
   *   console.log(`  Open: $${market.open}, High: $${market.dayHigh}, Low: $${market.dayLow}`);
   * });
   *
   * // Find specific indices
   * const sp500 = marketPerformance.data.find(market => market.index === 'S&P 500');
   * console.log(`S&P 500 performance: ${sp500?.changesPercentage}%`);
   *
   * // Check market sentiment
   * const gainers = marketPerformance.data.filter(market => market.changesPercentage > 0);
   * const losers = marketPerformance.data.filter(market => market.changesPercentage < 0);
   * console.log(`Gaining indices: ${gainers.length}, Losing indices: ${losers.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#market-index-market-overview|FMP Market Performance Documentation}
   */
  async getMarketPerformance(): Promise<APIResponse<MarketIndex[]>> {
    return this.client.get('/quotes/index', 'v3');
  }

  /**
   * Get top gaining stocks for the current trading day
   *
   * Provides a list of stocks that have gained the most value during the
   * current trading session. Essential for identifying momentum stocks,
   * tracking market movers, and discovering potential investment opportunities.
   * Useful for day trading, momentum strategies, and market analysis.
   *
   * @returns Promise resolving to array of top gaining stocks with price and percentage change data
   *
   * @example
   * ```typescript
   * // Get top gainers for the day
   * const gainers = await fmp.market.getGainers();
   * console.log(`Top ${gainers.data.length} gaining stocks today:`);
   *
   * gainers.data.forEach((stock, index) => {
   *   console.log(`${index + 1}. ${stock.symbol} (${stock.name})`);
   *   console.log(`   Price: $${stock.price} | Change: +${stock.change} (${stock.changesPercentage}%)`);
   *   console.log(`   Volume: ${stock.volume.toLocaleString()}`);
   * });
   *
   * // Find stocks with >10% gains
   * const bigGainers = gainers.data.filter(stock => stock.changesPercentage > 10);
   * console.log(`Stocks with >10% gains: ${bigGainers.length}`);
   *
   * // Check volume leaders among gainers
   * const highVolumeGainers = gainers.data.filter(stock => stock.volume > 1000000);
   * console.log(`High volume gainers (>1M shares): ${highVolumeGainers.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#biggest-gainers|FMP Market Biggest Gainers Documentation}
   */
  async getGainers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/biggest-gainers', 'stable');
  }

  /**
   * Get top losing stocks for the current trading day
   *
   * Provides a list of stocks that have lost the most value during the
   * current trading session. Essential for identifying underperforming stocks,
   * tracking market decliners, and discovering potential contrarian opportunities.
   * Useful for risk management, short selling strategies, and market analysis.
   *
   * @returns Promise resolving to array of top losing stocks with price and percentage change data
   *
   * @example
   * ```typescript
   * // Get top losers for the day
   * const losers = await fmp.market.getLosers();
   * console.log(`Top ${losers.data.length} losing stocks today:`);
   *
   * losers.data.forEach((stock, index) => {
   *   console.log(`${index + 1}. ${stock.symbol} (${stock.name})`);
   *   console.log(`   Price: $${stock.price} | Change: ${stock.change} (${stock.changesPercentage}%)`);
   *   console.log(`   Volume: ${stock.volume.toLocaleString()}`);
   * });
   *
   * // Find stocks with >10% losses
   * const bigLosers = losers.data.filter(stock => stock.changesPercentage < -10);
   * console.log(`Stocks with >10% losses: ${bigLosers.length}`);
   *
   * // Check for potential oversold conditions
   * const highVolumeLosers = losers.data.filter(stock => stock.volume > 1000000);
   * console.log(`High volume losers (>1M shares): ${highVolumeLosers.length}`);
   *
   * // Look for potential bounce candidates
   * const oversoldStocks = losers.data.filter(stock =>
   *   stock.changesPercentage < -5 && stock.volume > 500000
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#biggest-losers|FMP Market Biggest Losers Documentation}
   */
  async getLosers(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/biggest-losers', 'stable');
  }

  /**
   * Get most actively traded stocks for the current trading day
   *
   * Provides a list of stocks with the highest trading volume during the
   * current trading session. Essential for identifying stocks with high
   * liquidity, tracking market interest, and discovering stocks with
   * significant trading activity. Useful for day trading and liquidity analysis.
   *
   * @returns Promise resolving to array of most active stocks with volume and price data
   *
   * @example
   * ```typescript
   * // Get most active stocks for the day
   * const mostActive = await fmp.market.getMostActive();
   * console.log(`Top ${mostActive.data.length} most active stocks today:`);
   *
   * mostActive.data.forEach((stock, index) => {
   *   console.log(`${index + 1}. ${stock.symbol} (${stock.name})`);
   *   console.log(`   Volume: ${stock.volume.toLocaleString()} shares`);
   *   console.log(`   Price: $${stock.price} | Change: ${stock.change} (${stock.changesPercentage}%)`);
   *   console.log(`   Avg Volume: ${stock.avgVolume?.toLocaleString() || 'N/A'}`);
   * });
   *
   * // Find stocks with unusual volume (>2x average)
   * const unusualVolume = mostActive.data.filter(stock =>
   *   stock.avgVolume && stock.volume > stock.avgVolume * 2
   * );
   * console.log(`Stocks with unusual volume: ${unusualVolume.length}`);
   *
   * // Check for high volume gainers
   * const highVolumeGainers = mostActive.data.filter(stock =>
   *   stock.changesPercentage > 0 && stock.volume > 1000000
   * );
   * console.log(`High volume gainers: ${highVolumeGainers.length}`);
   *
   * // Find penny stocks with high volume
   * const pennyStocks = mostActive.data.filter(stock =>
   *   stock.price < 5 && stock.volume > 500000
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable#most-active|FMP Market Most Actives Documentation}
   */
  async getMostActive(): Promise<APIResponse<MarketPerformance[]>> {
    return this.client.get('/most-actives', 'stable');
  }

  /**
   * Get a sector-performance snapshot for a given date
   *
   * Returns the average price change per sector for the requested date, broken
   * out by exchange. Essential for sector-rotation analysis and identifying
   * leading/lagging sectors. A `date` is required (YYYY-MM-DD).
   *
   * @param params - Snapshot parameters
   * @param params.date - The date to snapshot, in YYYY-MM-DD format (required)
   * @param params.exchange - Optional exchange filter (e.g. 'NASDAQ', 'NYSE')
   * @param params.sector - Optional sector filter (e.g. 'Technology')
   *
   * @returns Promise resolving to an array of per-sector average changes
   *
   * @example
   * ```typescript
   * const snapshot = await fmp.market.getSectorPerformance({ date: '2024-06-10' });
   * snapshot.data.forEach(s => {
   *   console.log(`${s.sector} (${s.exchange}): ${s.averageChange.toFixed(2)}%`);
   * });
   *
   * // Filter to a single exchange
   * const nyse = await fmp.market.getSectorPerformance({ date: '2024-06-10', exchange: 'NYSE' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable/sector-performance-snapshot|FMP Sector Performance Snapshot Documentation}
   */
  async getSectorPerformance(params: {
    date: string;
    exchange?: string;
    sector?: string;
  }): Promise<APIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance-snapshot', 'stable', params);
  }

  /**
   * Get an industry P/E snapshot for a given date
   *
   * Returns the average price-to-earnings ratio per industry for the requested
   * date, broken out by exchange. Useful for relative-valuation analysis across
   * industries. A `date` is required (YYYY-MM-DD).
   *
   * @param params - Snapshot parameters
   * @param params.date - The date to snapshot, in YYYY-MM-DD format (required)
   * @param params.exchange - Optional exchange filter (e.g. 'NASDAQ', 'NYSE')
   * @param params.industry - Optional industry filter (e.g. 'Software')
   *
   * @returns Promise resolving to an array of per-industry P/E ratios
   *
   * @example
   * ```typescript
   * const pe = await fmp.market.getIndustryPESnapshot({ date: '2024-06-10' });
   * pe.data.forEach(i => console.log(`${i.industry} (${i.exchange}): ${i.pe.toFixed(1)}`));
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs/stable/industry-pe-snapshot|FMP Industry PE Snapshot Documentation}
   */
  async getIndustryPESnapshot(params: {
    date: string;
    exchange?: string;
    industry?: string;
  }): Promise<APIResponse<IndustryPESnapshot[]>> {
    return this.client.get('/industry-pe-snapshot', 'stable', params);
  }

  /**
   * Get real-time data for major market indices
   *
   * Provides real-time quote data for all major stock market indices including
   * S&P 500, Dow Jones Industrial Average, NASDAQ Composite, and other global
   * indices. Essential for tracking overall market performance, understanding
   * market sentiment, and identifying broad market trends.
   *
   * @returns Promise resolving to array of market index data with real-time quotes
   *
   * @example
   * ```typescript
   * // Get real-time market indices
   * const marketIndices = await fmp.market.getMarketIndex();
   * console.log(`Real-time data for ${marketIndices.data.length} major indices:`);
   *
   * marketIndices.data.forEach(index => {
   *   console.log(`${index.symbol} (${index.name}):`);
   *   console.log(`  Price: $${index.price}`);
   *   console.log(`  Change: ${index.change} (${index.changesPercentage}%)`);
   *   console.log(`  Day Range: $${index.dayLow} - $${index.dayHigh}`);
   *   console.log(`  Volume: ${index.volume?.toLocaleString() || 'N/A'}`);
   * });
   *
   * // Find specific major indices
   * const sp500 = marketIndices.data.find(index => index.symbol === '^GSPC');
   * const nasdaq = marketIndices.data.find(index => index.symbol === '^IXIC');
   * const dowJones = marketIndices.data.find(index => index.symbol === '^DJI');
   *
   * console.log(`S&P 500: ${sp500?.price} (${sp500?.changesPercentage}%)`);
   * console.log(`NASDAQ: ${nasdaq?.price} (${nasdaq?.changesPercentage}%)`);
   * console.log(`Dow Jones: ${dowJones?.price} (${dowJones?.changesPercentage}%)`);
   *
   * // Check market breadth
   * const gainingIndices = marketIndices.data.filter(index => index.changesPercentage > 0);
   * const losingIndices = marketIndices.data.filter(index => index.changesPercentage < 0);
   * console.log(`Indices gaining: ${gainingIndices.length}, Indices losing: ${losingIndices.length}`);
   *
   * // Find international indices
   * const internationalIndices = marketIndices.data.filter(index =>
   *   !index.symbol.startsWith('^') ||
   *   index.name.toLowerCase().includes('europe') ||
   *   index.name.toLowerCase().includes('asia')
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#market-index-market-overview|FMP Market Index Documentation}
   */
  async getMarketIndex(): Promise<APIResponse<MarketIndex[]>> {
    return this.client.get('/quotes/index', 'v3');
  }
}

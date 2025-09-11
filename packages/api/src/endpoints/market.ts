// Market endpoints for FMP API

import { FMPClient } from '@/client';
import {
  APIResponse,
  MarketHours,
  MarketPerformance,
  MarketSectorPerformance,
  MarketIndex,
} from 'fmp-node-types';

export class MarketEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get current market hours and trading status
   *
   * Provides real-time information about market trading hours, including
   * whether markets are currently open or closed, trading session times,
   * and upcoming market holidays. Essential for determining trading
   * availability and market status.
   *
   * @returns Promise resolving to market hours data with trading status and session information
   *
   * @example
   * ```typescript
   * // Get current market status
   * const marketHours = await fmp.market.getMarketHours();
   * console.log(`Market is ${marketHours.data.isTheStockMarketOpen ? 'OPEN' : 'CLOSED'}`);
   * console.log(`Current time: ${marketHours.data.currentTime}`);
   * console.log(`Next trading day: ${marketHours.data.nextTradingDay}`);
   *
   * // Check if it's a trading day
   * if (marketHours.data.isTheStockMarketOpen) {
   *   console.log('Markets are currently open for trading');
   * } else {
   *   console.log('Markets are closed');
   * }
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#market-hours|FMP Market Hours Documentation}
   */
  async getMarketHours(): Promise<APIResponse<MarketHours>> {
    return this.client.get('/market-hours', 'v3');
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
  async getMarketPerformance(): Promise<APIResponse<MarketPerformance[]>> {
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
   * Get sector performance data for the current trading day
   *
   * Provides performance data for all major market sectors including
   * technology, healthcare, financials, energy, and others. Essential for
   * sector rotation analysis, identifying leading/lagging sectors, and
   * understanding market breadth and sector-specific trends.
   *
   * @returns Promise resolving to array of sector performance data with percentage changes
   *
   * @example
   * ```typescript
   * // Get sector performance for the day
   * const sectorPerformance = await fmp.market.getSectorPerformance();
   * console.log(`Sector performance for ${sectorPerformance.data.length} sectors:`);
   *
   * sectorPerformance.data.forEach(sector => {
   *   const changeColor = sector.changesPercentage >= 0 ? 'green' : 'red';
   *   console.log(`${sector.sector}: ${sector.changesPercentage}%`);
   *   console.log(`  Change: ${sector.changesPercentage >= 0 ? '+' : ''}${sector.changesPercentage}%`);
   * });
   *
   * // Find best performing sectors
   * const topSectors = sectorPerformance.data
   *   .sort((a, b) => b.changesPercentage - a.changesPercentage)
   *   .slice(0, 3);
   * console.log('Top 3 performing sectors:');
   * topSectors.forEach((sector, index) => {
   *   console.log(`${index + 1}. ${sector.sector}: ${sector.changesPercentage}%`);
   * });
   *
   * // Find worst performing sectors
   * const bottomSectors = sectorPerformance.data
   *   .sort((a, b) => a.changesPercentage - b.changesPercentage)
   *   .slice(0, 3);
   * console.log('Bottom 3 performing sectors:');
   * bottomSectors.forEach((sector, index) => {
   *   console.log(`${index + 1}. ${sector.sector}: ${sector.changesPercentage}%`);
   * });
   *
   * // Check for sector rotation
   * const gainingSectors = sectorPerformance.data.filter(sector => sector.changesPercentage > 0);
   * const losingSectors = sectorPerformance.data.filter(sector => sector.changesPercentage < 0);
   * console.log(`Sectors gaining: ${gainingSectors.length}, Sectors losing: ${losingSectors.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#sector-performance-market-overview|FMP Sector Performance Documentation}
   */
  async getSectorPerformance(): Promise<APIResponse<MarketSectorPerformance[]>> {
    return this.client.get('/sector-performance', 'v3');
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

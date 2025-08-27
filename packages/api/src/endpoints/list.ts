import { FMPClient } from '@/client';
import {
  APIResponse,
  StockList,
  ETFList,
  CryptoList,
  ForexList,
  AvailableIndexesList,
} from 'fmp-node-types';

export class ListEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get comprehensive list of all available stocks
   *
   * Provides a complete list of all stocks available on major exchanges including
   * NYSE, NASDAQ, and other global markets. Essential for discovering available
   * symbols, building watchlists, or creating stock screening applications.
   *
   * @returns Promise resolving to array of stock data with symbol, name, exchange, and price information
   *
   * @example
   * ```typescript
   * // Get all available stocks
   * const stocks = await fmp.list.getStockList();
   * console.log(`Total stocks available: ${stocks.data.length}`);
   *
   * // Find specific stocks
   * const appleStock = stocks.data.find(stock => stock.symbol === 'AAPL');
   * console.log(`Apple: ${appleStock?.name} (${appleStock?.exchange})`);
   *
   * // Filter by exchange
   * const nasdaqStocks = stocks.data.filter(stock => stock.exchange === 'NASDAQ');
   * console.log(`NASDAQ stocks: ${nasdaqStocks.length}`);
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#symbol-list-stock-list|FMP Stock List Documentation}
   */
  async getStockList(): Promise<APIResponse<StockList[]>> {
    return this.client.get('/stock/list');
  }

  /**
   * Get comprehensive list of all available ETFs
   *
   * Provides a complete list of all Exchange-Traded Funds (ETFs) available for trading.
   * Includes ETFs from various asset classes including equity, bond, commodity, and
   * sector-specific funds. Essential for ETF research and portfolio construction.
   *
   * @returns Promise resolving to array of ETF data with symbol, name, exchange, and asset class information
   *
   * @example
   * ```typescript
   * // Get all available ETFs
   * const etfs = await fmp.list.getETFList();
   * console.log(`Total ETFs available: ${etfs.data.length}`);
   *
   * // Find specific ETFs
   * const spyETF = etfs.data.find(etf => etf.symbol === 'SPY');
   * console.log(`SPY: ${spyETF?.name} (${spyETF?.assetClass})`);
   *
   * // Filter by asset class
   * const equityETFs = etfs.data.filter(etf => etf.assetClass === 'Equity');
   * console.log(`Equity ETFs: ${equityETFs.length}`);
   *
   * // Find sector ETFs
   * const techETFs = etfs.data.filter(etf =>
   *   etf.name.toLowerCase().includes('technology') ||
   *   etf.name.toLowerCase().includes('tech')
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#exchange-traded-fund-search-stock-list|FMP ETF List Documentation}
   */
  async getETFList(): Promise<APIResponse<ETFList[]>> {
    return this.client.get('/etf/list');
  }

  /**
   * Get comprehensive list of all available cryptocurrencies
   *
   * Provides a complete list of all cryptocurrencies available for trading.
   * Includes major cryptocurrencies like Bitcoin, Ethereum, and thousands of altcoins
   * with their trading pairs against USD and other major currencies.
   *
   * @returns Promise resolving to array of cryptocurrency data with symbol, name, and exchange information
   *
   * @example
   * ```typescript
   * // Get all available cryptocurrencies
   * const cryptos = await fmp.list.getCryptoList();
   * console.log(`Total cryptocurrencies available: ${cryptos.data.length}`);
   *
   * // Find major cryptocurrencies
   * const bitcoin = cryptos.data.find(crypto => crypto.symbol === 'BTCUSD');
   * console.log(`Bitcoin: ${bitcoin?.name} (${bitcoin?.exchange})`);
   *
   * const ethereum = cryptos.data.find(crypto => crypto.symbol === 'ETHUSD');
   * console.log(`Ethereum: ${ethereum?.name} (${ethereum?.exchange})`);
   *
   * // Filter by exchange
   * const binanceCryptos = cryptos.data.filter(crypto => crypto.exchange === 'Binance');
   * console.log(`Binance cryptocurrencies: ${binanceCryptos.length}`);
   *
   * // Find altcoins
   * const altcoins = cryptos.data.filter(crypto =>
   *   !['BTCUSD', 'ETHUSD', 'USDTUSD', 'USDCUSD'].includes(crypto.symbol)
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#cryptocurrencies-list-crypto|FMP Cryptocurrency List Documentation}
   */
  async getCryptoList(): Promise<APIResponse<CryptoList[]>> {
    return this.client.get('/symbol/available-cryptocurrencies');
  }

  /**
   * Get comprehensive list of all available forex currency pairs
   *
   * Provides a complete list of all foreign exchange currency pairs available for trading.
   * Includes major, minor, and exotic currency pairs with their base and quote currencies.
   * Essential for forex trading, currency analysis, and international market research.
   *
   * @returns Promise resolving to array of forex data with currency pair symbols and exchange information
   *
   * @example
   * ```typescript
   * // Get all available forex pairs
   * const forexPairs = await fmp.list.getForexList();
   * console.log(`Total forex pairs available: ${forexPairs.data.length}`);
   *
   * // Find major currency pairs
   * const eurUsd = forexPairs.data.find(pair => pair.symbol === 'EURUSD');
   * console.log(`EUR/USD: ${eurUsd?.name} (${eurUsd?.exchange})`);
   *
   * const gbpUsd = forexPairs.data.find(pair => pair.symbol === 'GBPUSD');
   * console.log(`GBP/USD: ${gbpUsd?.name} (${gbpUsd?.exchange})`);
   *
   * // Filter major pairs (USD as quote currency)
   * const majorPairs = forexPairs.data.filter(pair =>
   *   pair.symbol.endsWith('USD') && pair.symbol.length === 6
   * );
   * console.log(`Major pairs: ${majorPairs.length}`);
   *
   * // Find exotic pairs
   * const exoticPairs = forexPairs.data.filter(pair =>
   *   pair.symbol.includes('ZAR') || pair.symbol.includes('TRY') || pair.symbol.includes('BRL')
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#forex-list-forex|FMP Forex List Documentation}
   */
  async getForexList(): Promise<APIResponse<ForexList[]>> {
    return this.client.get('/symbol/available-forex-currency-pairs');
  }

  /**
   * Get comprehensive list of all available market indexes
   *
   * Provides a complete list of all market indexes available for tracking and analysis.
   * Includes major global indexes like S&P 500, NASDAQ, Dow Jones, as well as
   * international indexes, sector indexes, and specialized market benchmarks.
   *
   * @returns Promise resolving to array of index data with symbol, name, and exchange information
   *
   * @example
   * ```typescript
   * // Get all available indexes
   * const indexes = await fmp.list.getAvailableIndexes();
   * console.log(`Total indexes available: ${indexes.data.length}`);
   *
   * // Find major US indexes
   * const sp500 = indexes.data.find(index => index.symbol === '^GSPC');
   * console.log(`S&P 500: ${sp500?.name} (${sp500?.exchange})`);
   *
   * const nasdaq = indexes.data.find(index => index.symbol === '^IXIC');
   * console.log(`NASDAQ: ${nasdaq?.name} (${nasdaq?.exchange})`);
   *
   * const dowJones = indexes.data.find(index => index.symbol === '^DJI');
   * console.log(`Dow Jones: ${dowJones?.name} (${dowJones?.exchange})`);
   *
   * // Filter by exchange
   * const nyseIndexes = indexes.data.filter(index => index.exchange === 'NYSE');
   * console.log(`NYSE indexes: ${nyseIndexes.length}`);
   *
   * // Find sector indexes
   * const techIndexes = indexes.data.filter(index =>
   *   index.name.toLowerCase().includes('technology') ||
   *   index.name.toLowerCase().includes('tech')
   * );
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#available-indexes|FMP Available Indexes Documentation}
   */
  async getAvailableIndexes(): Promise<APIResponse<AvailableIndexesList[]>> {
    return this.client.get('/symbol/available-indexes');
  }
}

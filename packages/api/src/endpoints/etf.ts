// ETF endpoints for FMP API

import { FMPClient } from '@/client';
import {
  APIResponse,
  ETFProfile,
  ETFHolding,
  ETFHoldingDates,
  ETFHolder,
  ETFStockExposure,
  ETFWeighting,
  ETFCountryWeighting,
} from '@fmp/types';

export class ETFEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get available ETF holding dates
   *
   * Provides a list of dates when ETF holdings are updated and available.
   * Useful for determining when the most recent holdings data is available
   * and ensuring you're working with current portfolio information.
   *
   * @param symbol - ETF symbol to get holding dates for (e.g., 'SPY', 'VOO', 'QQQ')
   *
   * @returns Promise resolving to array of available holding dates
   *
   * @example
   * ```typescript
   * // Get holding dates for specific ETF
   * const spyDates = await fmp.etf.getHoldingDates('SPY');
   * spyDates.data.forEach(date => {
   *   console.log(`Holdings available: ${date.date}`);
   * });
   *
   * // Get VOO holding dates
   * const vooDates = await fmp.etf.getHoldingDates('VOO');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-holding-dates-etf-holdings|FMP ETF Holding Dates Documentation}
   */
  async getHoldingDates(symbol: string): Promise<APIResponse<ETFHoldingDates[]>> {
    return this.client.get('/etf-holdings/portfolio-date', 'v4', { symbol });
  }

  /**
   * Get ETF holdings for specific date
   *
   * Provides detailed holdings information for an ETF on a specific date.
   * Includes individual stocks, their weights, shares held, and market values.
   * Essential for understanding ETF composition and portfolio analysis.
   *
   * @param params - ETF holdings request parameters
   * @param params.symbol - The ETF symbol to get holdings for (e.g., 'SPY', 'VOO', 'QQQ')
   * @param params.date - The date to get holdings for in YYYY-MM-DD format
   *
   * @returns Promise resolving to array of ETF holdings with detailed stock information
   *
   * @example
   * ```typescript
   * // Get SPY holdings for specific date
   * const holdings = await fmp.etf.getHoldings({ symbol: 'SPY', date: '2024-01-15' });
   * holdings.data.forEach(holding => {
   *   console.log(`${holding.asset}: ${holding.weight}% (${holding.sharesNumber} shares)`);
   * });
   *
   * // Get VOO holdings
   * const vooHoldings = await fmp.etf.getHoldings({ symbol: 'VOO', date: '2024-01-15' });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-holdings-etf-holdings|FMP ETF Holdings Documentation}
   */
  async getHoldings(params: { symbol: string; date: string }): Promise<APIResponse<ETFHolding[]>> {
    const { symbol, date } = params;
    const queryParams: { symbol?: string; date?: string } = {};
    if (symbol) queryParams.symbol = symbol;
    if (date) queryParams.date = date;
    return this.client.get('/etf-holdings', 'v4', queryParams);
  }

  /**
   * Get ETF holdings and components
   *
   * Provides all stocks held by a specific ETF including assets, share numbers,
   * and weight percentages. Essential for understanding ETF composition and
   * finding which ETFs hold specific stocks.
   *
   * @param symbol - The ETF symbol to get holdings for (e.g., 'SPY', 'VOO', 'QQQ')
   *
   * @returns Promise resolving to array of ETF holdings with stock details
   *
   * @example
   * ```typescript
   * // Get SPY holdings
   * const spyHoldings = await fmp.etf.getHolder('SPY');
   * spyHoldings.data.forEach(holding => {
   *   console.log(`${holding.asset}: ${holding.weight}% (${holding.sharesNumber} shares)`);
   * });
   *
   * // Get VOO holdings
   * const vooHoldings = await fmp.etf.getHolder('VOO');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-holder-etf-holdings|FMP ETF Holder Documentation}
   */
  async getHolder(symbol: string): Promise<APIResponse<ETFHolder[]>> {
    return this.client.get(`/etf-holder/${symbol}`, 'v3');
  }

  /**
   * Get ETF profile and information
   *
   * Provides comprehensive information about an ETF including ticker symbol,
   * name, expense ratio, assets under management, and other key metrics.
   * Essential for ETF comparison and due diligence.
   *
   * @param symbol - ETF symbol to get profile for (e.g., 'SPY', 'VOO', 'QQQ')
   *
   * @returns Promise resolving to ETF profile with detailed information
   *
   * @example
   * ```typescript
   * // Get SPY profile
   * const spyProfile = await fmp.etf.getProfile('SPY');
   * console.log(`SPY AUM: $${spyProfile.data.aum.toLocaleString()}`);
   * console.log(`Expense Ratio: ${spyProfile.data.expenseRatio}%`);
   *
   * // Get VOO profile
   * const vooProfile = await fmp.etf.getProfile('VOO');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-information-etf-holdings|FMP ETF Information Documentation}
   */
  async getProfile(symbol: string): Promise<APIResponse<ETFProfile>> {
    return this.client.getSingle('/etf-info', 'v4', { symbol });
  }

  /**
   * Get ETF sector weighting and exposure
   *
   * Provides a breakdown of an ETF's sector allocation showing the percentage
   * of assets invested in each sector. Essential for understanding sector
   * exposure and diversification analysis.
   *
   * @param symbol - The ETF symbol to get sector weighting for (e.g., 'SPY', 'VOO', 'QQQ')
   *
   * @returns Promise resolving to array of sector weightings with percentage allocations
   *
   * @example
   * ```typescript
   * // Get SPY sector weightings
   * const sectorWeightings = await fmp.etf.getSectorWeighting('SPY');
   * sectorWeightings.data.forEach(sector => {
   *   console.log(`${sector.sector}: ${sector.weight}%`);
   * });
   *
   * // Get QQQ sector exposure (tech-heavy)
   * const qqqSectors = await fmp.etf.getSectorWeighting('QQQ');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-sector-weighting-etf-holdings|FMP ETF Sector Weighting Documentation}
   */
  async getSectorWeighting(symbol: string): Promise<APIResponse<ETFWeighting[]>> {
    return this.client.get(`/etf-sector-weightings/${symbol}`, 'v3');
  }

  /**
   * Get ETF country weighting and exposure
   *
   * Provides a breakdown of an ETF's geographic allocation showing the percentage
   * of assets invested in each country. Essential for understanding international
   * exposure and geographic diversification.
   *
   * @param symbol - The ETF symbol to get country weighting for (e.g., 'SPY', 'VOO', 'EFA')
   *
   * @returns Promise resolving to array of country weightings with percentage allocations
   *
   * @example
   * ```typescript
   * // Get SPY country weightings
   * const countryWeightings = await fmp.etf.getCountryWeighting('SPY');
   * countryWeightings.data.forEach(country => {
   *   console.log(`${country.country}: ${country.weight}%`);
   * });
   *
   * // Get international ETF exposure
   * const efaCountries = await fmp.etf.getCountryWeighting('EFA');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-country-weighting-etf-holdings|FMP ETF Country Weighting Documentation}
   */
  async getCountryWeighting(symbol: string): Promise<APIResponse<ETFCountryWeighting[]>> {
    return this.client.get(`/etf-country-weightings/${symbol}`, 'v3');
  }

  /**
   * Get ETF stock exposure and holdings
   *
   * Provides detailed exposure information for a specific stock across all ETFs
   * that hold it. Includes market value, share numbers, and weight percentages.
   * Useful for finding which ETFs have exposure to specific stocks.
   *
   * @param symbol - The stock symbol to get ETF exposure for (e.g., 'AAPL', 'MSFT', 'GOOGL')
   *
   * @returns Promise resolving to array of ETF exposures with detailed holding information
   *
   * @example
   * ```typescript
   * // Find ETFs that hold Apple
   * const appleExposure = await fmp.etf.getStockExposure('AAPL');
   * appleExposure.data.forEach(etf => {
   *   console.log(`${etf.etfSymbol}: ${etf.weight}% (${etf.sharesNumber} shares)`);
   * });
   *
   * // Find ETFs that hold Microsoft
   * const msftExposure = await fmp.etf.getStockExposure('MSFT');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#etf-sector-exposure-etf-holdings|FMP ETF Stock Exposure Documentation}
   */
  async getStockExposure(symbol: string): Promise<APIResponse<ETFStockExposure[]>> {
    return this.client.get(`/etf-stock-exposure/${symbol}`, 'v3');
  }
}

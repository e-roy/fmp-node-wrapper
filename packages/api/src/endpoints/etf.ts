// ETF endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, SymbolParams } from '@/types/common';
import {
  ETFProfile,
  ETFHolding,
  ETFHoldingDates,
  ETFHolder,
  ETFStockExposure,
  ETFWeighting,
  ETFCountryWeighting,
} from '@/types/etf';

export class ETFEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get ETF holding dates
   * https://site.financialmodelingprep.com/developer/docs#etf-holding-dates-etf-holdings
   * @param symbol - The symbol of the ETF to get the holding dates for
   * @returns The FMP ETF Holding Dates endpoint provides a list of the dates on which ETF holdings are updated. For example, an investor may want to know when an ETF's holdings are updated in order to make sure that they are still aligned with their investment goals.
   */
  async getHoldingDates({ symbol }: SymbolParams): Promise<APIResponse<ETFHoldingDates[]>> {
    const params: { symbol?: string } = {};
    if (symbol) params.symbol = symbol;
    return this.client.get('/etf-holdings/portfolio-date', 'v4', params);
  }

  /**
   * Get ETF holdings
   * https://site.financialmodelingprep.com/developer/docs#etf-holdings-etf-holdings
   * @param symbol - The symbol of the ETF to get the holdings for
   * @param date - The date to get the holdings for
   * @returns The FMP ETF Holdings endpoint provides a list of all the institutional investors that own shares of an ETF. For example, an investor may want to know which ETF has the highest exposure to a particular industry or sector.
   */
  async getHoldings({
    symbol,
    date,
  }: {
    symbol: string;
    date: string;
  }): Promise<APIResponse<ETFHolding[]>> {
    const params: { symbol?: string; date?: string } = {};
    if (symbol) params.symbol = symbol;
    if (date) params.date = date;
    return this.client.get('/etf-holdings', 'v4', params);
  }

  /**
   * Get ETF holder
   * https://site.financialmodelingprep.com/developer/docs#etf-holder-etf-holdings
   * @param symbol - The symbol of the ETF to get the holder for
   * @returns This endpoint returns all stocks held by a specific ETF. Assets, share number, and weight are among the fields returned. For example you can get components of SPY, VOO and more.
   */
  async getHolder({ symbol }: SymbolParams): Promise<APIResponse<ETFHolder[]>> {
    return this.client.get(`/etf-holder/${symbol}`, 'v3');
  }

  /**
   * Get ETF profile
   * https://site.financialmodelingprep.com/developer/docs#etf-information-etf-holdings
   * @param symbol - The symbol of the ETF to get the profile for
   * @returns The FMP ETF Information endpoint provides basic information about an ETF, such as its ticker symbol, name, expense ratio, and asset under management. For example, an investor may want to compare the expense ratios of different ETFs to find the one that is most cost-effective.
   */
  async getProfile({ symbol }: SymbolParams): Promise<APIResponse<ETFProfile>> {
    const params: { symbol?: string } = {};
    if (symbol) params.symbol = symbol;
    return this.client.getSingle('/etf-info', 'v4', params);
  }

  /**
   * Get ETF sector weighting
   * https://site.financialmodelingprep.com/developer/docs#etf-sector-weighting-etf-holdings
   * @param symbol - The symbol of the ETF to get the sector exposure for
   * @returns The FMP ETF Sector Weighting endpoint provides a breakdown of the percentage of an ETF's assets that are invested in each sector. For example, an investor may want to invest in an ETF that has a high exposure to the technology sector if they believe that the technology sector is poised for growth.
   */
  async getSectorWeighting({ symbol }: SymbolParams): Promise<APIResponse<ETFWeighting[]>> {
    return this.client.get(`/etf-sector-weightings/${symbol}`, 'v3');
  }

  /**
   * Get ETF country weighting
   * https://site.financialmodelingprep.com/developer/docs#etf-country-weighting-etf-holdings
   * @param symbol - The symbol of the ETF to get the country weighting for
   * @returns The FMP ETF Country Weighting endpoint provides a breakdown of the percentage of an ETF's assets that are invested in each country. For example, an investor may want to invest in an ETF that has a high exposure to China if they believe that the Chinese economy is poised for growth.
   */
  async getCountryWeighting({ symbol }: SymbolParams): Promise<APIResponse<ETFCountryWeighting[]>> {
    return this.client.get(`/etf-country-weightings/${symbol}`, 'v3');
  }

  /**
   * Get ETF Stock exposure
   * https://site.financialmodelingprep.com/developer/docs#etf-sector-exposure-etf-holdings
   * @param symbol - The symbol of the ETF to get the stock exposure for
   * @returns This endpoint returns asset exposure from all ETFs that have it in their holdings. It has properties like market value, share number or weight percentage. It can be useful for looking up stock you like to check what ETF has it on their portfolio.
   */
  async getStockExposure({ symbol }: SymbolParams): Promise<APIResponse<ETFStockExposure[]>> {
    return this.client.get(`/etf-stock-exposure/${symbol}`, 'v3');
  }
}

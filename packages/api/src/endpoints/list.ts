import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '@/types';
import { StockList, ETFList, CryptoList, ForexList, AvailableIndexesList } from '@/types/list';

export class ListEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get stock list
   * https://site.financialmodelingprep.com/developer/docs#symbol-list-stock-list
   * @returns The stock list
   */
  async getStockList(): Promise<UnwrappedAPIResponse<StockList[]>> {
    return this.client.get('/stock/list');
  }

  /**
   * Get ETF list
   * https://site.financialmodelingprep.com/developer/docs#exchange-traded-fund-search-stock-list
   * @returns The ETF list
   */
  async getETFList(): Promise<UnwrappedAPIResponse<ETFList[]>> {
    return this.client.get('/etf/list');
  }

  /**
   * Get crypto list
   * https://site.financialmodelingprep.com/developer/docs#cryptocurrencies-list-crypto
   * @returns The crypto list
   */
  async getCryptoList(): Promise<UnwrappedAPIResponse<CryptoList[]>> {
    return this.client.get('/symbol/available-cryptocurrencies');
  }

  /**
   * Get forex list
   * https://site.financialmodelingprep.com/developer/docs#forex-list-forex
   * @returns The forex list
   */
  async getForexList(): Promise<UnwrappedAPIResponse<ForexList[]>> {
    return this.client.get('/symbol/available-forex-currency-pairs');
  }

  /**
   * Get available indexes list
   * https://site.financialmodelingprep.com/developer/docs#available-indexes
   * @returns The available indexes list
   */
  async getAvailableIndexes(): Promise<UnwrappedAPIResponse<AvailableIndexesList[]>> {
    return this.client.get('/symbol/available-indexes');
  }
}

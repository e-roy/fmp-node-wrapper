import { FMPClient } from '@/client';
import { UnwrappedAPIResponse } from '../types';
import { StockList, ETFList, MutualFundList, CryptoList, ForexList, BondList } from '../types/list';

export class ListEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get stock list
   */
  async getStockList(): Promise<UnwrappedAPIResponse<StockList[]>> {
    return this.client.get('/stock/list');
  }

  /**
   * Get ETF list
   */
  async getETFList(): Promise<UnwrappedAPIResponse<ETFList[]>> {
    return this.client.get('/etf/list');
  }

  /**
   * Get mutual fund list
   */
  async getMutualFundList(): Promise<UnwrappedAPIResponse<MutualFundList[]>> {
    return this.client.get('/mutual-fund/list');
  }

  /**
   * Get crypto list
   */
  async getCryptoList(): Promise<UnwrappedAPIResponse<CryptoList[]>> {
    return this.client.get('/crypto/list');
  }

  /**
   * Get forex list
   */
  async getForexList(): Promise<UnwrappedAPIResponse<ForexList[]>> {
    return this.client.get('/forex/list');
  }

  /**
   * Get bond list
   */
  async getBondList(): Promise<UnwrappedAPIResponse<BondList[]>> {
    return this.client.get('/bond/list');
  }
}

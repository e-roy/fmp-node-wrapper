// Mutual fund endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, SymbolParams } from '@/types/common';
import { MutualFundQuote, MutualFundHolding } from '@/types/mutual-fund';

export class MutualFundEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get mutual fund quote
   * @deprecated Use `fmp.quote.getQuote()` instead. This method will be removed in a future release.
   * @param params - Parameters for the mutual fund quote request
   * @returns Mutual fund quote data
   */
  async getQuote(params: SymbolParams): Promise<APIResponse<MutualFundQuote[]>> {
    return this.client.get('/quote', 'v3', params);
  }

  /**
   * Get mutual fund holders
   * https://site.financialmodelingprep.com/developer/docs#mutual-fund-holder-mutual-funds-holdings
   * @param symbol - The symbol of the mutual fund to get the holders for
   * @returns Mutual fund holders data
   */
  async getHolders({ symbol }: SymbolParams): Promise<APIResponse<MutualFundHolding[]>> {
    return this.client.get(`/mutual-fund-holder/${symbol}`, 'v3');
  }
}

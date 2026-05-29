// Search endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, SearchResult } from 'fmp-node-types';

export class SearchEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Search for stocks, ETFs, and other instruments by ticker symbol or company name.
   *
   * Resolves a free-text query (e.g. a company name or partial ticker) to matching
   * symbols. Useful for turning a name like "Apple" into a ticker like "AAPL".
   *
   * @param params - Search parameters
   * @param params.query - The search query (ticker or company name)
   * @param params.limit - Maximum number of results to return (optional)
   * @param params.exchange - Restrict results to a specific exchange (optional, e.g. "NASDAQ")
   *
   * @returns Promise resolving to an array of matching instruments
   *
   * @example
   * ```typescript
   * const results = await fmp.search.search({ query: 'Apple', limit: 5 });
   * const aapl = results.data?.find(r => r.symbol === 'AAPL');
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#general-search|FMP Search Documentation}
   */
  async search(params: {
    query: string;
    limit?: number;
    exchange?: string;
  }): Promise<APIResponse<SearchResult[]>> {
    const { query, limit, exchange } = params;
    return this.client.get('/search', 'v3', { query, limit, exchange });
  }
}

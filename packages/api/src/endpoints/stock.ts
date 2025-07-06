import { FMPClient } from '@/client';
import { UnwrappedAPIResponse, StockQuote, CompanyProfile } from '@/types';
import { StockHistoricalPriceResponse, MarketCap, StockSplit, StockDividend } from '@/types/stock';

export class StockEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get real-time stock quote
   */
  async getQuote({ symbol }: { symbol: string }): Promise<UnwrappedAPIResponse<StockQuote | null>> {
    return this.client.get(`/quote/${symbol}`);
  }

  /**
   * Get company profile
   */
  async getCompanyProfile({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<CompanyProfile | null>> {
    return this.client.get(`/profile/${symbol}`);
  }

  /**
   * Get historical stock prices
   */
  async getHistoricalPrice({
    symbol,
    from,
    to,
  }: {
    symbol: string;
    from?: string;
    to?: string;
  }): Promise<UnwrappedAPIResponse<StockHistoricalPriceResponse>> {
    const params: Record<string, any> = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.client.get(`/historical-price-full/${symbol}`, params);
  }

  /**
   * Get market cap
   */
  async getMarketCap({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<MarketCap | null>> {
    return this.client.get(`/market-capitalization/${symbol}`);
  }

  /**
   * Get stock splits
   */
  async getStockSplits({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<StockSplit[]>> {
    return this.client.get(`/stock-split-calendar/${symbol}`);
  }

  /**
   * Get dividend history
   */
  async getDividendHistory({
    symbol,
  }: {
    symbol: string;
  }): Promise<UnwrappedAPIResponse<StockDividend[]>> {
    return this.client.get(`/historical-price-full/stock_dividend/${symbol}`);
  }
}

// Cryptocurrency-related types for FMP API

import { SymbolParams, DateRangeParams } from './common';

// Crypto parameter interfaces
export interface CryptoQuoteParams extends SymbolParams {}

export interface CryptoHistoricalParams extends SymbolParams, DateRangeParams {
  timeseries?: number;
}

export interface CryptoListParams {}

// Crypto data interfaces
export interface CryptoQuote {
  symbol: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearLow: number;
  yearHigh: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}

// Forex-related types for FMP API

import { SymbolParams, DateRangeParams } from './common';

// Forex parameter interfaces
export interface ForexQuoteParams extends SymbolParams {}

export interface ForexHistoricalParams extends SymbolParams, DateRangeParams {
  timeseries?: number;
}

export interface ForexListParams {}

// Forex data interfaces
export interface ForexQuote {
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

export interface ForexPair {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

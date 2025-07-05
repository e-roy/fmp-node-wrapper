// Bond types for FMP API

import { SymbolParams, DateRangeParams } from './common';

// Bond parameter interfaces
export interface BondQuoteParams extends SymbolParams {}

export interface BondHistoricalParams extends SymbolParams, DateRangeParams {
  timeseries?: number;
}

export interface BondListParams {}

// Bond data interfaces
export interface BondQuote {
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

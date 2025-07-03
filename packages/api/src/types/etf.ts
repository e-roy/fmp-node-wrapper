// ETF-related types for FMP API

import { SymbolParams, PaginationParams } from './common';

// ETF parameter interfaces
export interface ETFQuoteParams extends SymbolParams {}

export interface ETFProfileParams extends SymbolParams {}

export interface ETFHoldersParams extends SymbolParams, PaginationParams {}

export interface ETFListParams {}

// ETF data interfaces
export interface ETFQuote {
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

export interface ETFProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  marketCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export interface ETFHolding {
  asset: string;
  weightPercent: number;
  shares: number;
  marketValue: number;
}

export interface ETFList {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

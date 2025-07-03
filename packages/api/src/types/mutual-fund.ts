// Mutual fund types for FMP API

import { SymbolParams, PaginationParams } from './common';

// Mutual fund parameter interfaces
export interface MutualFundQuoteParams extends SymbolParams {}

export interface MutualFundProfileParams extends SymbolParams {}

export interface MutualFundHoldersParams
  extends SymbolParams,
    PaginationParams {}

export interface MutualFundListParams {}

// Mutual fund data interfaces
export interface MutualFundQuote {
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

export interface MutualFundProfile {
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

export interface MutualFundHolding {
  asset: string;
  weightPercent: number;
  shares: number;
  marketValue: number;
}

export interface MutualFundList {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

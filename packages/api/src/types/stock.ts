// Stock-related types for FMP API

import { HistoricalPriceData, HistoricalPriceResponse } from './common';

// Stock data interfaces
export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}

export interface StockSplit {
  date: string;
  label: string;
  numerator: number;
  denominator: number;
}

export interface StockDividend {
  date: string;
  label: string;
  adjDividend: number;
  dividend: number;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
}

export interface MarketCap {
  symbol: string;
  date: string;
  marketCap: number;
}

// Historical price data for stocks (extends common historical price data)
export interface StockHistoricalPriceData extends HistoricalPriceData {}

// Historical price response for stocks
export interface StockHistoricalPriceResponse extends HistoricalPriceResponse {
  historical: StockHistoricalPriceData[];
}

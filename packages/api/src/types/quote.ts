// Quote-related types for FMP API

// Quote parameter interfaces
export interface QuoteParams {
  symbol: string;
}

export interface HistoricalPriceParams {
  symbol: string;
  from?: string;
  to?: string;
}

export interface IntradayParams {
  symbol: string;
  interval: '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';
  from?: string;
  to?: string;
}

// Quote data structure - unified for all asset types
export interface Quote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number | null;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number | null;
  pe: number | null;
  earningsAnnouncement: string | null;
  sharesOutstanding: number | null;
  timestamp: number;
}

// Historical price data structure
export interface HistoricalPriceData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

// Historical price response wrapper
export interface HistoricalPriceResponse {
  symbol: string;
  historical: HistoricalPriceData[];
}

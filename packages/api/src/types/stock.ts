// Stock-related types for FMP API

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

export interface StockSplitResponse {
  symbol: string;
  historical: StockSplit[];
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

export interface StockDividendResponse {
  symbol: string;
  historical: StockDividend[];
}

export interface MarketCap {
  symbol: string;
  date: string;
  marketCap: number;
}

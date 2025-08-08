// Stock-related types for FMP API

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

export interface StockRealTimePrice {
  symbol: string;
  price: number;
}

export interface StockRealTimePriceFull {
  bidSize: number;
  askPrice: number;
  volume: number;
  askSize: number;
  bidPrice: number;
  lastSalePrice: number;
  lastSaleSize: number;
  lastSaleTime: number;
  fmpLast: number;
  lastUpdated: number;
  symbol: string;
}

// For endpoints that return { stockList: [...] }
export interface StockListResponse<T> {
  stockList: T[];
}

// For endpoints that return { companiesPriceList: [...] }
export interface CompaniesPriceListResponse<T> {
  companiesPriceList: T[];
}

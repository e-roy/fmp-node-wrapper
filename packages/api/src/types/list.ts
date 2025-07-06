export interface StockList {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  price: string;
  name: string;
}

export interface ETFList {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  price: number;
  name: string;
}

export interface CryptoList {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export interface ForexList {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export interface AvailableIndexesList {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

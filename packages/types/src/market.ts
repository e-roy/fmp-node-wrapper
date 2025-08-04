// Market data types for FMP API

// Market data interfaces
export interface MarketHours {
  stockExchangeName: string;
  stockMarketHours: {
    openingHour: string;
    closingHour: string;
  };
  stockMarketHolidays: MarketHoliday[];
  isTheStockMarketOpen: boolean;
  isTheEuronextMarketOpen: boolean;
  isTheForexMarketOpen: boolean;
  isTheCryptoMarketOpen: boolean;
}

export interface MarketHoliday {
  year: number;
  'Martin Luther King, Jr. Day': string;
  "Presidents' Day": string;
  'Good Friday': string;
  'Memorial Day': string;
  Juneteenth: string;
  'Independence Day': string;
  'Labor Day': string;
  'Thanksgiving Day': string;
  Christmas: string;
}

export interface MarketPerformance {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

export interface MarketSectorPerformance {
  sector: string;
  changesPercentage: number;
}

export interface MarketIndex {
  symbol: string;
  price: number;
  extendedPrice: number | null;
  change: number;
  dayHigh: number;
  dayLow: number;
  previousClose: number;
  volume: number | null;
  open: number;
  close: number | null;
  lastTradeTime: string;
  lastExtendedTradeTime: string | null;
  updatedAt: string;
  createdAt: string;
  type: string;
  name: string;
  range: string;
  yearHigh: number;
  yearLow: number;
  priceAvg50: number | null;
  priceAvg200: number | null;
  changesPercentage: number;
}

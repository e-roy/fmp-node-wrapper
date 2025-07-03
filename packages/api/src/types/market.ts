// Market data types for FMP API

import { DateRangeParams } from './common';

// Market parameter interfaces
export interface MarketHoursParams {}

export interface MarketPerformanceParams {}

export interface MarketGainersParams {}

export interface MarketLosersParams {}

export interface MarketMostActiveParams {}

export interface MarketSectorPerformanceParams {}

export interface MarketIndexParams extends DateRangeParams {}

// Market data interfaces
export interface MarketHours {
  stockExchangeName: string;
  stockMarketHours: {
    openingHour: string;
    closingHour: string;
    gmtOffset: number;
  };
  holidays: string[];
  isTheStockMarketOpen: boolean;
  isTheEuronextMarketOpen: boolean;
  isTheForexMarketOpen: boolean;
  isTheCryptoMarketOpen: boolean;
}

export interface MarketPerformance {
  ticker: string;
  companyName: string;
  price: number;
  changesPercentage: number;
  changes: number;
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

export interface MarketSectorPerformance {
  sector: string;
  changesPercentage: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
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

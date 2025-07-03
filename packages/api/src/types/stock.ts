// Stock-related types for FMP API

import {
  SymbolParams,
  DateRangeParams,
  PaginationParams,
  HistoricalPriceData,
  HistoricalPriceResponse,
} from './common';

// Stock quote (alias for common Quote)
export type StockQuote = import('./common').Quote;

// Stock-specific parameter interfaces
export interface StockQuoteParams extends SymbolParams {}

export interface StockProfileParams extends SymbolParams {}

export interface StockHistoricalPriceParams
  extends SymbolParams,
    DateRangeParams {
  timeseries?: number;
}

export interface StockMarketCapParams extends SymbolParams {}

export interface StockEarningsCalendarParams {
  from?: string;
  to?: string;
}

export interface StockSplitsParams extends SymbolParams {}

export interface StockDividendParams extends SymbolParams {}

export interface StockInsiderTradingParams
  extends SymbolParams,
    PaginationParams {}

export interface StockInstitutionalHoldersParams extends SymbolParams {}

export interface StockMutualFundHoldersParams extends SymbolParams {}

export interface StockMajorHoldersParams extends SymbolParams {}

export interface StockAnalystEstimatesParams
  extends SymbolParams,
    PaginationParams {}

export interface StockPriceTargetParams extends SymbolParams {}

export interface StockRatingParams extends SymbolParams {}

export interface StockGradeParams extends SymbolParams {}

export interface StockSectorPerformanceParams {}

export interface StockLosersParams {}

export interface StockGainersParams {}

export interface StockMostActiveParams {}

// Stock data interfaces
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

export interface InsiderTrading {
  symbol: string;
  companyName: string;
  cik: string;
  ownerName: string;
  ownerCik: string;
  ownerTitle: string;
  transactionDate: string;
  transactionCode: string;
  transactionAmount: number;
  transactionPrice: number;
  transactionAcquiredDisposed: string;
  postTransactionAmount: number;
  secLink: string;
}

export interface InstitutionalHolder {
  holder: string;
  shares: number;
  dateReported: string;
  change: number;
  weightPercent: number;
}

export interface MutualFundHolder {
  holder: string;
  shares: number;
  dateReported: string;
  change: number;
  weightPercent: number;
}

export interface MajorHolder {
  holder: string;
  shares: number;
  dateReported: string;
  change: number;
  weightPercent: number;
}

export interface AnalystEstimate {
  symbol: string;
  date: string;
  estimatedRevenueLow: number;
  estimatedRevenueHigh: number;
  estimatedRevenueAvg: number;
  estimatedEbitdaLow: number;
  estimatedEbitdaHigh: number;
  estimatedEbitdaAvg: number;
  estimatedEbitLow: number;
  estimatedEbitHigh: number;
  estimatedEbitAvg: number;
  estimatedNetIncomeLow: number;
  estimatedNetIncomeHigh: number;
  estimatedNetIncomeAvg: number;
  estimatedSgaExpenseLow: number;
  estimatedSgaExpenseHigh: number;
  estimatedSgaExpenseAvg: number;
  estimatedEpsAvg: number;
  estimatedEpsHigh: number;
  estimatedEpsLow: number;
  numberAnalystEstimatedRevenue: number;
  numberAnalystsEstimatedEps: number;
}

export interface PriceTarget {
  symbol: string;
  targetMean: number;
  targetMedian: number;
  targetHigh: number;
  targetLow: number;
  targetCount: number;
}

export interface StockRating {
  symbol: string;
  date: string;
  rating: string;
  ratingScore: number;
  ratingRecommendation: string;
  ratingDetailsDCFScore: number;
  ratingDetailsDCFRecommendation: string;
  ratingDetailsROEScore: number;
  ratingDetailsROERecommendation: string;
  ratingDetailsROAScore: number;
  ratingDetailsROARecommendation: string;
  ratingDetailsDEScore: number;
  ratingDetailsDERecommendation: string;
  ratingDetailsPEScore: number;
  ratingDetailsPERecommendation: string;
  ratingDetailsPBScore: number;
  ratingDetailsPBRecommendation: string;
}

export interface StockGrade {
  symbol: string;
  date: string;
  gradingCompany: string;
  previousGrade: string;
  newGrade: string;
  grade: string;
}

export interface SectorPerformance {
  sector: string;
  changesPercentage: number;
}

export interface StockList {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

export interface MarketCap {
  symbol: string;
  date: string;
  marketCap: number;
}

// Earnings calendar data
export interface EarningsCalendar {
  date: string;
  symbol: string;
  eps: number;
  estimatedEps: number;
  time: string;
  revenue: number;
  estimatedRevenue: number;
  fiscalDateEnding: string;
  updatedFromDate: string;
}

// Historical price data for stocks (extends common historical price data)
export interface StockHistoricalPriceData extends HistoricalPriceData {}

// Historical price response for stocks
export interface StockHistoricalPriceResponse extends HistoricalPriceResponse {
  historical: StockHistoricalPriceData[];
}

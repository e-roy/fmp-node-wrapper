// Common types used across all FMP API endpoints

// Base API response wrapper - more type-safe without any default
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// More specific response types for better type safety
export interface SuccessResponse<T> extends APIResponse<T> {
  success: true;
  data: T;
  status: number;
}

export interface ErrorResponse extends APIResponse<never> {
  success: false;
  error: string;
  status: number;
}

// Type utility to unwrap single objects from arrays
// If T is an array type, unwrap it to the element type
// Otherwise, keep T as is
export type UnwrapSingle<T> = T extends [infer U] ? U : T extends (infer U)[] ? U | U[] : T;

// API response with automatic unwrapping of single objects
export interface UnwrappedAPIResponse<T = unknown> {
  success: boolean;
  data?: UnwrapSingle<T>;
  error?: string;
  status?: number;
}

// FMP API configuration
export interface FMPConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

// Common parameter interfaces
export interface SymbolParams {
  symbol: string;
}

export interface DateRangeParams {
  from?: string;
  to?: string;
}

export interface PaginationParams {
  limit?: number;
  page?: number;
}

export interface PeriodParams {
  period?: 'annual' | 'quarter';
}

// Common historical price data structure
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

// Type-safe query parameters
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// Common financial data types
export interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
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

export interface CompanyProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
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

// Common enums
export enum Period {
  ANNUAL = 'annual',
  QUARTER = 'quarter',
}

export enum Exchange {
  NYSE = 'NYSE',
  NASDAQ = 'NASDAQ',
  AMEX = 'AMEX',
  TSX = 'TSX',
  LSE = 'LSE',
  ASX = 'ASX',
  NSE = 'NSE',
  BSE = 'BSE',
}

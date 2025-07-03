// Shared types and utilities for FMP API wrapper

// Common error types
export class FMPError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'FMPError';
  }
}

// Common utility functions (for backward compatibility)
export function validateApiKey(apiKey: string): void {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new FMPError('API key is required and must be a string');
  }
}

export function validateSymbol(symbol: string): void {
  if (!symbol || typeof symbol !== 'string') {
    throw new FMPError('Symbol is required and must be a string');
  }
}

// Common constants (for backward compatibility)
export const FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3';
export const FMP_BASE_URL_V4 = 'https://financialmodelingprep.com/api/v4';

// Common enums (for backward compatibility)
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
}

// Common API response wrapper
export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

// Alias for backward compatibility
export interface APIResponse<T = any> extends BaseResponse<T> {}

// Configuration interface for API clients
export interface APIConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

// Common pagination parameters
export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}

// Common date range parameters
export interface DateRangeParams {
  from?: string;
  to?: string;
}

// Common symbol parameters
export interface SymbolParams {
  symbol: string;
}

// Common financial data types
export interface StockQuote {
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

export interface FinancialStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  fillingDate: string;
  acceptedDate: string;
  calendarYear: string;
  period: string;
  link: string;
  finalLink: string;
  [key: string]: any; // For dynamic financial metrics
}

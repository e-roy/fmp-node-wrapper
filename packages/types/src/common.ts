// Common types used across all FMP API endpoints

// Base API response wrapper - consistent structure with nullable fields
export interface APIResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  status: number;
}

// FMP API configuration
export interface FMPConfig {
  apiKey?: string; // Optional since we support FMP_API_KEY environment variable
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

// Type-safe query parameters
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
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

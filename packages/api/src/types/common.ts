// Common types used across all FMP API endpoints

// Base API response wrapper - maintains backward compatibility
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// More specific response types for better type safety (optional use)
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

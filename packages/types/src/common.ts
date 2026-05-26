// Common types used across all FMP API endpoints

// Categorizes a failed request so callers (and AI tools) can react to the
// *kind* of failure rather than parsing the message. Only set when success is false.
export type FMPErrorType =
  | 'plan-restricted' // 402/403 or "Exclusive/Special Endpoint" — not included in the API plan
  | 'rate-limit' //      429 — quota/rate limit reached
  | 'auth' //            401 — invalid or missing API key
  | 'not-found' //       404 — resource does not exist
  | 'bad-request' //     400 — invalid parameters
  | 'network' //         no HTTP response (timeout / DNS / offline)
  | 'unknown'; //        anything else

// Base API response wrapper - consistent structure with nullable fields
export interface APIResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  /** Categorizes the failure. Present only when `success` is false. */
  errorType?: FMPErrorType;
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

// Constants for FMP API

// Default configuration
export const DEFAULT_TIMEOUT = 10000;
export const DEFAULT_LIMIT = 100;
export const MAX_LIMIT = 1000;

// Common periods
export const PERIODS = {
  ANNUAL: 'annual',
  QUARTER: 'quarter',
} as const;

// Common exchanges
export const EXCHANGES = {
  NYSE: 'NYSE',
  NASDAQ: 'NASDAQ',
  AMEX: 'AMEX',
  TSX: 'TSX',
  LSE: 'LSE',
  ASX: 'ASX',
  NSE: 'NSE',
  BSE: 'BSE',
} as const;

// Common sectors
export const SECTORS = {
  TECHNOLOGY: 'Technology',
  HEALTHCARE: 'Healthcare',
  FINANCIAL: 'Financial',
  CONSUMER_DISCRETIONARY: 'Consumer Discretionary',
  CONSUMER_STAPLES: 'Consumer Staples',
  INDUSTRIALS: 'Industrials',
  ENERGY: 'Energy',
  MATERIALS: 'Materials',
  UTILITIES: 'Utilities',
  REAL_ESTATE: 'Real Estate',
  COMMUNICATION_SERVICES: 'Communication Services',
} as const;

// Common countries
export const COUNTRIES = {
  US: 'US',
  CA: 'CA',
  GB: 'GB',
  AU: 'AU',
  IN: 'IN',
  DE: 'DE',
  FR: 'FR',
  JP: 'JP',
  CN: 'CN',
  BR: 'BR',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  API_KEY_REQUIRED: 'API key is required',
  SYMBOL_REQUIRED: 'Symbol is required',
  INVALID_SYMBOL: 'Invalid symbol format',
  INVALID_DATE: 'Invalid date format. Use YYYY-MM-DD',
  INVALID_PERIOD: 'Period must be either "annual" or "quarter"',
  INVALID_LIMIT: 'Limit must be between 1 and 1000',
  INVALID_PAGE: 'Page must be a non-negative number',
  REQUEST_FAILED: 'Request failed',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
  UNAUTHORIZED: 'Unauthorized - Invalid API key',
  NOT_FOUND: 'Resource not found',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

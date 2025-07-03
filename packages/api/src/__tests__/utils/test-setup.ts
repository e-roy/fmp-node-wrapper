// Test utilities for FMP API tests

import { config } from 'dotenv';
import { resolve } from 'path';
import { FMP } from '../../fmp';

// Debug: Log what we see before dotenv
console.log('Before dotenv - FMP_API_KEY:', process.env.FMP_API_KEY ? 'SET' : 'NOT SET');
console.log('Before dotenv - CI:', process.env.CI);

// Only load .env file if not in CI (CI should have env vars set directly)
if (process.env.CI !== 'true') {
  config({ path: resolve(__dirname, '../../../../../.env'), override: false });
}

// Debug: Log what we see after dotenv
console.log('After dotenv - FMP_API_KEY:', process.env.FMP_API_KEY ? 'SET' : 'NOT SET');

// Get API key from environment, with fallback to .env
export const API_KEY = process.env.FMP_API_KEY;
export const isCI = process.env.CI === 'true';

// Debug logging
if (isCI) {
  console.log('Running in CI environment');
  console.log('API_KEY available:', !!API_KEY);
  console.log('API_KEY type:', typeof API_KEY);
  console.log('API_KEY length:', API_KEY ? API_KEY.length : 'N/A');
}

/**
 * Check if tests should be skipped
 * Only skip if no API key is available
 */
export function shouldSkipTests(): boolean {
  return !API_KEY;
}

/**
 * Skip tests if no API key is provided
 * @deprecated Use shouldSkipTests() instead
 */
export function skipIfNoApiKey() {
  return shouldSkipTests();
}

/**
 * Create FMP client for testing
 */
export function createTestClient(): FMP {
  if (!API_KEY) {
    throw new Error('FMP_API_KEY is required for testing');
  }
  return new FMP({ apiKey: API_KEY });
}

/**
 * Common test timeout for API calls
 */
export const API_TIMEOUT = 15000;

/**
 * Common test timeout for faster operations
 */
export const FAST_TIMEOUT = 10000;

/**
 * Test data constants
 */
export const TEST_SYMBOLS = {
  STOCK: 'AAPL',
  FOREX: 'EURUSD',
  CRYPTO: 'BTCUSD',
  ETF: 'SPY',
} as const;

/**
 * Test date ranges
 */
export const TEST_DATE_RANGES = {
  RECENT: {
    from: '2024-01-01',
    to: '2024-01-31',
  },
  HISTORICAL: {
    from: '2020-01-01',
    to: '2024-01-31',
  },
} as const;

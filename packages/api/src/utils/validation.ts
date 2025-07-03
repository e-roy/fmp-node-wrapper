// Validation utilities for FMP API

import { FMPError } from '../shared';

/**
 * Validate API key
 */
export function validateApiKey(apiKey: string): void {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    throw new FMPError('API key is required and must be a non-empty string');
  }
}

/**
 * Validate stock symbol
 */
export function validateSymbol(symbol: string): void {
  if (!symbol || typeof symbol !== 'string' || symbol.trim().length === 0) {
    throw new FMPError('Symbol is required and must be a non-empty string');
  }

  // Basic symbol validation (alphanumeric and common symbols)
  const symbolRegex = /^[A-Z0-9.-]+$/;
  if (!symbolRegex.test(symbol.toUpperCase())) {
    throw new FMPError(
      'Invalid symbol format. Symbols should contain only letters, numbers, dots, and hyphens'
    );
  }
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function validateDate(date: string): void {
  if (!date || typeof date !== 'string') {
    throw new FMPError('Date is required and must be a string');
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new FMPError('Invalid date format. Use YYYY-MM-DD format');
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new FMPError('Invalid date');
  }
}

/**
 * Validate period parameter
 */
export function validatePeriod(period: string): void {
  if (period && !['annual', 'quarter'].includes(period)) {
    throw new FMPError('Period must be either "annual" or "quarter"');
  }
}

/**
 * Validate limit parameter
 */
export function validateLimit(limit: number): void {
  if (
    limit !== undefined &&
    (typeof limit !== 'number' || limit < 1 || limit > 1000)
  ) {
    throw new FMPError('Limit must be a number between 1 and 1000');
  }
}

/**
 * Validate page parameter
 */
export function validatePage(page: number): void {
  if (page !== undefined && (typeof page !== 'number' || page < 0)) {
    throw new FMPError('Page must be a non-negative number');
  }
}

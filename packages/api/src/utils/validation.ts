// Validation utilities for FMP API

import { APIResponse } from 'fmp-node-types';

/**
 * Validation utilities for FMP API parameters and responses
 */
export class FMPValidation {
  /**
   * Validate stock symbol format
   * @param symbol - The symbol to validate
   * @returns True if the symbol format is valid
   */
  static isValidSymbol(symbol: string): boolean {
    if (!symbol || typeof symbol !== 'string') {
      return false;
    }
    // Basic stock symbol validation: 1-5 uppercase letters
    return /^[A-Z]{1,5}$/.test(symbol);
  }

  /**
   * Validate crypto symbol format
   * @param symbol - The crypto symbol to validate
   * @returns True if the crypto symbol format is valid
   */
  static isValidCryptoSymbol(symbol: string): boolean {
    if (!symbol || typeof symbol !== 'string') {
      return false;
    }
    // Crypto symbols typically end with USD, EUR, etc.
    return /^[A-Z]{2,10}(USD|EUR|GBP|JPY|CAD|AUD|CHF|CNY)$/.test(symbol);
  }

  /**
   * Validate forex pair format
   * @param symbol - The forex pair to validate
   * @returns True if the forex pair format is valid
   */
  static isValidForexPair(symbol: string): boolean {
    if (!symbol || typeof symbol !== 'string') {
      return false;
    }
    // Forex pairs: 6 characters, 3+3 format (e.g., EURUSD)
    return /^[A-Z]{3}[A-Z]{3}$/.test(symbol);
  }

  /**
   * Validate date format (YYYY-MM-DD)
   * @param date - The date string to validate
   * @returns True if the date format is valid
   */
  static isValidDate(date: string): boolean {
    if (!date || typeof date !== 'string') {
      return false;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }

    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime()) && dateObj.toISOString().split('T')[0] === date;
  }

  /**
   * Validate date range
   * @param from - Start date
   * @param to - End date
   * @returns True if the date range is valid
   */
  static isValidDateRange(from: string, to: string): boolean {
    if (!this.isValidDate(from) || !this.isValidDate(to)) {
      return false;
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    return fromDate <= toDate;
  }

  /**
   * Validate API response structure
   * @param response - The response to validate
   * @returns True if the response has the expected structure
   */
  static isValidResponse(response: any): response is APIResponse<any> {
    return Boolean(
      response && typeof response === 'object' && typeof response.success === 'boolean',
    );
  }

  /**
   * Validate API key format
   * @param apiKey - The API key to validate
   * @returns True if the API key format is valid
   */
  static isValidApiKey(apiKey: string): boolean {
    if (!apiKey || typeof apiKey !== 'string') {
      return false;
    }
    // FMP API keys are typically alphanumeric and at least 32 characters
    return /^[a-zA-Z0-9]{32,}$/.test(apiKey);
  }

  /**
   * Validate period parameter
   * @param period - The period to validate
   * @returns True if the period is valid
   */
  static isValidPeriod(period: string): boolean {
    if (!period || typeof period !== 'string') {
      return false;
    }
    return ['annual', 'quarter', 'fy'].includes(period.toLowerCase());
  }

  /**
   * Validate limit parameter
   * @param limit - The limit to validate
   * @returns True if the limit is valid
   */
  static isValidLimit(limit: number): boolean {
    return typeof limit === 'number' && Number.isInteger(limit) && limit > 0 && limit <= 1000;
  }

  /**
   * Get validation errors for quote parameters
   * @param params - The parameters to validate
   * @returns Array of validation error messages
   */
  static validateQuoteParams(params: any): string[] {
    const errors: string[] = [];

    if (!params) {
      errors.push('Parameters object is required');
      return errors;
    }

    if (!params.symbol) {
      errors.push('Symbol is required');
    } else if (
      !this.isValidSymbol(params.symbol) &&
      !this.isValidCryptoSymbol(params.symbol) &&
      !this.isValidForexPair(params.symbol)
    ) {
      errors.push('Invalid symbol format');
    }

    if (params.from && !this.isValidDate(params.from)) {
      errors.push('Invalid from date format (expected YYYY-MM-DD)');
    }

    if (params.to && !this.isValidDate(params.to)) {
      errors.push('Invalid to date format (expected YYYY-MM-DD)');
    }

    if (params.from && params.to && !this.isValidDateRange(params.from, params.to)) {
      errors.push('From date must be before or equal to to date');
    }

    return errors;
  }

  /**
   * Get validation errors for financial statement parameters
   * @param params - The parameters to validate
   * @returns Array of validation error messages
   */
  static validateFinancialParams(params: any): string[] {
    const errors: string[] = [];

    if (!params) {
      errors.push('Parameters object is required');
      return errors;
    }

    if (!params.symbol) {
      errors.push('Symbol is required');
    } else if (!this.isValidSymbol(params.symbol)) {
      errors.push('Invalid symbol format');
    }

    if (params.period && !this.isValidPeriod(params.period)) {
      errors.push('Invalid period (must be "annual", "quarter", or "FY")');
    }

    if (params.limit && !this.isValidLimit(params.limit)) {
      errors.push('Invalid limit (must be a positive integer <= 1000)');
    }

    return errors;
  }

  /**
   * Get validation errors for date range parameters
   * @param params - The parameters to validate
   * @returns Array of validation error messages
   */
  static validateDateRangeParams(params: any): string[] {
    const errors: string[] = [];

    if (!params) {
      errors.push('Parameters object is required');
      return errors;
    }

    if (params.from && !this.isValidDate(params.from)) {
      errors.push('Invalid from date format (expected YYYY-MM-DD)');
    }

    if (params.to && !this.isValidDate(params.to)) {
      errors.push('Invalid to date format (expected YYYY-MM-DD)');
    }

    if (params.from && params.to && !this.isValidDateRange(params.from, params.to)) {
      errors.push('From date must be before or equal to to date');
    }

    return errors;
  }

  /**
   * Validate and throw error if validation fails
   * @param errors - Array of validation errors
   * @param context - Context for the error message
   */
  static throwIfInvalid(errors: string[], context = 'Validation'): void {
    if (errors.length > 0) {
      throw new Error(`${context} failed: ${errors.join(', ')}`);
    }
  }
}

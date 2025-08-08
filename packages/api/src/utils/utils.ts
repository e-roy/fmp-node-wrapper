/**
 * Utility functions for common financial data processing and formatting
 */
export class FMPUtils {
  /**
   * Format currency values
   * @param value - The numeric value to format
   * @param currency - The currency code (default: USD)
   * @param locale - The locale for formatting (default: en-US)
   * @returns Formatted currency string
   */
  static formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
    if (typeof value !== 'number' || isNaN(value)) {
      return 'N/A';
    }

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (_error) {
      // Fallback formatting
      return `${currency} ${value.toFixed(2)}`;
    }
  }

  /**
   * Format percentages
   * @param value - The percentage value (as decimal, e.g., 0.15 for 15%)
   * @param decimals - Number of decimal places (default: 2)
   * @returns Formatted percentage string
   */
  static formatPercentage(value: number, decimals = 2): string {
    if (typeof value !== 'number' || isNaN(value)) {
      return 'N/A';
    }
    return `${value.toFixed(decimals)}%`;
  }

  /**
   * Format large numbers with abbreviations (K, M, B, T)
   * @param value - The numeric value to format
   * @param decimals - Number of decimal places (default: 1)
   * @returns Formatted number string
   */
  static formatLargeNumber(value: number, decimals = 1): string {
    if (typeof value !== 'number' || isNaN(value)) {
      return 'N/A';
    }

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1e12) {
      return `${sign}${(absValue / 1e12).toFixed(decimals)}T`;
    } else if (absValue >= 1e9) {
      return `${sign}${(absValue / 1e9).toFixed(decimals)}B`;
    } else if (absValue >= 1e6) {
      return `${sign}${(absValue / 1e6).toFixed(decimals)}M`;
    } else if (absValue >= 1e3) {
      return `${sign}${(absValue / 1e3).toFixed(decimals)}K`;
    } else {
      return `${sign}${absValue.toFixed(decimals)}`;
    }
  }

  /**
   * Convert date string to Date object
   * @param dateString - The date string in YYYY-MM-DD format
   * @returns Date object or null if invalid
   */
  static parseDate(dateString: string): Date | null {
    if (!dateString || typeof dateString !== 'string') {
      return null;
    }

    // Parse date in UTC to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return null;
    }

    // Validate date components
    if (month < 1 || month > 12) {
      return null;
    }

    const date = new Date(Date.UTC(year, month - 1, day));

    // Check if the date is valid (handles cases like 2024-02-30)
    if (isNaN(date.getTime())) {
      return null;
    }

    // Verify the parsed date matches the input (handles cases like 2024-02-30 becoming 2024-03-01)
    const parsedYear = date.getUTCFullYear();
    const parsedMonth = date.getUTCMonth() + 1;
    const parsedDay = date.getUTCDate();

    if (parsedYear !== year || parsedMonth !== month || parsedDay !== day) {
      return null;
    }

    return date;
  }

  /**
   * Format date to readable string
   * @param date - Date object or date string
   * @param format - Format style ('short', 'long', 'iso')
   * @returns Formatted date string
   */
  static formatDate(date: Date | string, format: 'short' | 'long' | 'iso' = 'short'): string {
    const dateObj = typeof date === 'string' ? this.parseDate(date) : date;

    if (!dateObj) {
      return 'Invalid Date';
    }

    switch (format) {
      case 'long':
        return dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      case 'iso':
        return dateObj.toISOString().split('T')[0];
      case 'short':
      default:
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
    }
  }

  /**
   * Calculate working days between two dates (excluding weekends)
   * @param from - Start date
   * @param to - End date
   * @returns Number of working days
   */
  static getWorkingDays(from: string | Date, to: string | Date): number {
    const startDate = typeof from === 'string' ? this.parseDate(from) : from;
    const endDate = typeof to === 'string' ? this.parseDate(to) : to;

    if (!startDate || !endDate) {
      return 0;
    }

    let workingDays = 0;
    const currentDate = new Date(startDate);

    // Normalize to start of day in UTC for consistent comparison
    const endDateNormalized = new Date(
      Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()),
    );

    while (currentDate <= endDateNormalized) {
      const dayOfWeek = currentDate.getUTCDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Not Sunday (0) or Saturday (6)
        workingDays++;
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return workingDays;
  }

  /**
   * Calculate percentage change between two values
   * @param oldValue - The original value
   * @param newValue - The new value
   * @param decimals - Number of decimal places (default: 2)
   * @returns Percentage change as a number
   */
  static calculatePercentageChange(oldValue: number, newValue: number, decimals = 2): number {
    if (
      typeof oldValue !== 'number' ||
      typeof newValue !== 'number' ||
      isNaN(oldValue) ||
      isNaN(newValue) ||
      oldValue === 0
    ) {
      return 0;
    }

    const change = ((newValue - oldValue) / oldValue) * 100;
    return Number(change.toFixed(decimals));
  }

  /**
   * Batch API calls with rate limiting
   * @param calls - Array of async functions to execute
   * @param delayMs - Delay between calls in milliseconds (default: 100)
   * @param maxConcurrent - Maximum concurrent calls (default: 1)
   * @returns Array of results
   */
  static async batchCalls<T>(
    calls: (() => Promise<T>)[],
    delayMs = 100,
    maxConcurrent = 1,
  ): Promise<T[]> {
    const results: T[] = [];

    if (maxConcurrent === 1) {
      // Sequential execution with delay
      for (const call of calls) {
        results.push(await call());
        if (delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    } else {
      // Concurrent execution with rate limiting
      const chunks = this.chunkArray(calls, maxConcurrent);

      for (const chunk of chunks) {
        const chunkResults = await Promise.all(chunk.map(call => call()));
        results.push(...chunkResults);

        if (delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }

    return results;
  }

  /**
   * Split array into chunks
   * @param array - The array to split
   * @param chunkSize - Size of each chunk
   * @returns Array of chunks
   */
  static chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Retry a function with exponential backoff
   * @param fn - The function to retry
   * @param maxRetries - Maximum number of retries (default: 3)
   * @param baseDelay - Base delay in milliseconds (default: 1000)
   * @returns Function result
   */
  static async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000,
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries) {
          throw lastError;
        }

        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Debounce a function
   * @param func - The function to debounce
   * @param wait - Wait time in milliseconds
   * @returns Debounced function
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle a function
   * @param func - The function to throttle
   * @param limit - Time limit in milliseconds
   * @returns Throttled function
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

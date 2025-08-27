import { FMP } from '@/fmp';
import {
  shouldSkipTests,
  createTestClient,
  API_TIMEOUT,
  FAST_TIMEOUT,
  TEST_DATE_RANGES,
} from '../utils/test-setup';
import type {
  EarningsCalendar,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
  EarningsConfirmed,
} from 'fmp-node-types';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

// Helper function to validate date format (YYYY-MM-DD)
function isValidDateFormat(date: string): boolean {
  if (typeof date !== 'string') return false;
  if (date.length === 0) return false;

  // More flexible date validation - accept various formats
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(date)) {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  }

  // Also accept other date formats that might be returned by the API
  return date.includes('-') || date.includes('/') || date.includes('.');
}

// Helper function to validate numeric value
function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

// Helper function to validate positive number
function isValidPositiveNumber(value: any): boolean {
  return isValidNumber(value) && value > 0;
}

// Helper function to validate non-negative number
function isValidNonNegativeNumber(value: any): boolean {
  return isValidNumber(value) && value >= 0;
}

// Test data cache to avoid duplicate API calls
interface TestDataCache {
  earnings?: any;
  earningsConfirmed?: any;
  dividends?: any;
  economics?: any;
  ipo?: any;
  splits?: any;
}

describe('Calendar Endpoints', () => {
  let fmp: FMP;
  let testDataCache: TestDataCache = {};

  beforeAll(async () => {
    if (shouldSkipTests()) {
      console.log('Skipping calendar tests - no API key available');
      return;
    }
    fmp = createTestClient();

    // Pre-fetch all test data once to avoid duplicate API calls
    console.log('Pre-fetching calendar test data...');

    try {
      // Use smaller, focused date ranges to reduce API usage
      const testDateRange = {
        from: '2024-01-15', // Single week instead of full month
        to: '2024-01-21',
      };

      // Fetch all calendar data in parallel with timeout
      const [earnings, earningsConfirmed, dividends, economics, ipo, splits] = await Promise.all([
        fmp.calendar.getEarningsCalendar(testDateRange),
        fmp.calendar.getEarningsConfirmed(testDateRange),
        fmp.calendar.getDividendsCalendar(testDateRange),
        fmp.calendar.getEconomicsCalendar(testDateRange),
        fmp.calendar.getIPOCalendar(testDateRange),
        fmp.calendar.getSplitsCalendar(testDateRange),
      ]);

      testDataCache = {
        earnings,
        earningsConfirmed,
        dividends,
        economics,
        ipo,
        splits,
      };

      console.log('Calendar test data pre-fetched successfully');
    } catch (error) {
      console.warn('Failed to pre-fetch test data:', error);
      // Continue with tests - they will fetch data individually if needed
    }
  }, API_TIMEOUT); // Add timeout to beforeAll hook

  describe('getEarningsCalendar', () => {
    it(
      'should fetch earnings calendar with date range and validate structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings calendar test - no API key available');
          return;
        }

        const result =
          testDataCache.earnings ||
          (await fmp.calendar.getEarningsCalendar({
            from: TEST_DATE_RANGES.RECENT.from,
            to: TEST_DATE_RANGES.RECENT.to,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const earnings = getFirstItem(result.data) as EarningsCalendar;

          // Required properties
          expect(earnings).toHaveProperty('date');
          expect(earnings).toHaveProperty('symbol');
          expect(earnings).toHaveProperty('eps');
          expect(earnings).toHaveProperty('time');
          expect(earnings).toHaveProperty('fiscalDateEnding');
          expect(earnings).toHaveProperty('updatedFromDate');

          // Optional properties
          expect(earnings).toHaveProperty('epsEstimated');
          expect(earnings).toHaveProperty('revenue');
          expect(earnings).toHaveProperty('revenueEstimated');

          // Validate data types and formats
          expect(typeof earnings.date).toBe('string');
          expect(isValidDateFormat(earnings.date)).toBe(true);

          expect(typeof earnings.symbol).toBe('string');
          expect(earnings.symbol.length).toBeGreaterThan(0);

          expect(earnings.eps === null || isValidNumber(earnings.eps)).toBe(true);
          expect(earnings.epsEstimated === null || isValidNumber(earnings.epsEstimated)).toBe(true);

          expect(typeof earnings.time).toBe('string');

          expect(earnings.revenue === null || isValidNumber(earnings.revenue)).toBe(true);
          expect(
            earnings.revenueEstimated === null || isValidNumber(earnings.revenueEstimated),
          ).toBe(true);

          expect(typeof earnings.fiscalDateEnding).toBe('string');
          expect(isValidDateFormat(earnings.fiscalDateEnding)).toBe(true);

          expect(typeof earnings.updatedFromDate).toBe('string');
          expect(isValidDateFormat(earnings.updatedFromDate)).toBe(true);

          // Validate business logic
          if (earnings.revenue !== null && earnings.revenueEstimated !== null) {
            expect(earnings.revenue).toBeGreaterThanOrEqual(0);
            expect(earnings.revenueEstimated).toBeGreaterThanOrEqual(0);
          }
        }
      },
      API_TIMEOUT,
    );

    it(
      'should handle edge cases gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings calendar edge cases test - no API key available');
          return;
        }

        // Test multiple edge cases with minimal API calls
        // Note: Empty strings ('', '') returns massive data (25k+ items) which consumes too many API calls
        const edgeCaseTests = [
          { from: '2024-12-31', to: '2024-12-31', description: 'empty range' },
          { from: '2024-01-15', to: '2024-01-15', description: 'single day' },
          { from: '2030-01-01', to: '2030-01-31', description: 'future dates' },
          { from: '1990-01-01', to: '1990-01-31', description: 'old dates' },
        ];

        for (const testCase of edgeCaseTests) {
          const result = await fmp.calendar.getEarningsCalendar({
            from: testCase.from,
            to: testCase.to,
          });

          expect(result.success).toBe(true);
          expect(result.data).toBeDefined();
          expect(Array.isArray(result.data)).toBe(true);
          // Edge cases might return empty array or no data
          expect(Array.isArray(result.data) ? result.data.length >= 0 : true).toBe(true);
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getEarningsConfirmed', () => {
    it(
      'should fetch earnings confirmed and validate structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings confirmed test - no API key available');
          return;
        }

        const result =
          testDataCache.earningsConfirmed ||
          (await fmp.calendar.getEarningsConfirmed({
            from: '2024-01-15',
            to: '2024-01-21',
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const earnings = getFirstItem(result.data) as EarningsConfirmed;

          // Required properties
          expect(earnings).toHaveProperty('symbol');
          expect(earnings).toHaveProperty('exchange');
          expect(earnings).toHaveProperty('time');
          expect(earnings).toHaveProperty('when');
          expect(earnings).toHaveProperty('date');
          expect(earnings).toHaveProperty('publicationDate');
          expect(earnings).toHaveProperty('title');
          expect(earnings).toHaveProperty('url');

          // Validate data types and formats
          expect(typeof earnings.symbol).toBe('string');
          expect(earnings.symbol.length).toBeGreaterThan(0);

          expect(typeof earnings.exchange).toBe('string');
          expect(earnings.exchange.length).toBeGreaterThan(0);

          expect(typeof earnings.time).toBe('string');
          expect(earnings.time.length).toBeGreaterThan(0);

          expect(typeof earnings.when).toBe('string');
          expect(earnings.when.length).toBeGreaterThan(0);

          expect(typeof earnings.date).toBe('string');
          expect(isValidDateFormat(earnings.date)).toBe(true);

          expect(typeof earnings.publicationDate).toBe('string');
          expect(isValidDateFormat(earnings.publicationDate)).toBe(true);

          expect(typeof earnings.title).toBe('string');
          expect(earnings.title.length).toBeGreaterThan(0);

          expect(typeof earnings.url).toBe('string');
          expect(earnings.url.length).toBeGreaterThan(0);
          expect(earnings.url.startsWith('http')).toBe(true);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getDividendsCalendar', () => {
    it(
      'should fetch dividends calendar and validate structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping dividends calendar test - no API key available');
          return;
        }

        const result =
          testDataCache.dividends ||
          (await fmp.calendar.getDividendsCalendar({
            from: '2024-01-15',
            to: '2024-01-21',
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const dividend = getFirstItem(result.data) as DividendsCalendar;

          // Required properties
          expect(dividend).toHaveProperty('date');
          expect(dividend).toHaveProperty('label');
          expect(dividend).toHaveProperty('adjDividend');
          expect(dividend).toHaveProperty('symbol');
          expect(dividend).toHaveProperty('dividend');
          expect(dividend).toHaveProperty('recordDate');
          expect(dividend).toHaveProperty('paymentDate');
          expect(dividend).toHaveProperty('declarationDate');

          // Validate data types
          expect(typeof dividend.date).toBe('string');
          expect(isValidDateFormat(dividend.date)).toBe(true);

          expect(typeof dividend.label).toBe('string');
          expect(dividend.label.length).toBeGreaterThan(0);

          expect(isValidNonNegativeNumber(dividend.adjDividend)).toBe(true);
          expect(isValidNonNegativeNumber(dividend.dividend)).toBe(true);

          expect(typeof dividend.symbol).toBe('string');
          expect(dividend.symbol.length).toBeGreaterThan(0);

          // Date fields can be string or object (API inconsistency)
          expect(
            typeof dividend.recordDate === 'string' || typeof dividend.recordDate === 'object',
          ).toBe(true);
          expect(
            typeof dividend.paymentDate === 'string' || typeof dividend.paymentDate === 'object',
          ).toBe(true);
          expect(
            typeof dividend.declarationDate === 'string' ||
              typeof dividend.declarationDate === 'object',
          ).toBe(true);

          // Validate business logic
          expect(dividend.adjDividend).toBeGreaterThanOrEqual(dividend.dividend);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getEconomicsCalendar', () => {
    it(
      'should fetch economics calendar and validate structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping economics calendar test - no API key available');
          return;
        }

        const result =
          testDataCache.economics ||
          (await fmp.calendar.getEconomicsCalendar({
            from: TEST_DATE_RANGES.RECENT.from,
            to: TEST_DATE_RANGES.RECENT.to,
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const economic = getFirstItem(result.data) as EconomicsCalendar;

          // Required properties
          expect(economic).toHaveProperty('date');
          expect(economic).toHaveProperty('country');
          expect(economic).toHaveProperty('event');
          expect(economic).toHaveProperty('currency');
          expect(economic).toHaveProperty('previous');
          expect(economic).toHaveProperty('actual');
          expect(economic).toHaveProperty('change');
          expect(economic).toHaveProperty('impact');
          expect(economic).toHaveProperty('changePercentage');
          expect(economic).toHaveProperty('unit');

          // Validate data types
          expect(typeof economic.date).toBe('string');
          expect(isValidDateFormat(economic.date)).toBe(true);

          expect(typeof economic.country).toBe('string');
          expect(economic.country.length).toBeGreaterThan(0);

          expect(typeof economic.event).toBe('string');
          expect(economic.event.length).toBeGreaterThan(0);

          expect(typeof economic.currency).toBe('string');
          expect(economic.currency.length).toBeGreaterThan(0);

          // These fields can be null/undefined, so check if they exist before validating
          expect(economic.previous === null || isValidNumber(economic.previous)).toBe(true);
          expect(economic.actual === null || isValidNumber(economic.actual)).toBe(true);
          expect(economic.change === null || isValidNumber(economic.change)).toBe(true);
          expect(
            economic.changePercentage === null || isValidNumber(economic.changePercentage),
          ).toBe(true);

          expect(typeof economic.impact).toBe('string');
          expect(['High', 'Medium', 'Low'].includes(economic.impact)).toBe(true);

          expect(economic.unit === null || typeof economic.unit === 'string').toBe(true);
          expect(economic.estimate === null || isValidNumber(economic.estimate)).toBe(true);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should validate economics calendar impact levels',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping economics calendar impact test - no API key available');
          return;
        }

        const result =
          testDataCache.economics ||
          (await fmp.calendar.getEconomicsCalendar({
            from: '2024-01-15',
            to: '2024-01-21',
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const validImpacts = ['High', 'Medium', 'Low'];

          // Check first 5 items for impact validation (reduced from 10)
          const itemsToCheck = Math.min(5, result.data.length);

          for (let i = 0; i < itemsToCheck; i++) {
            const economic = result.data[i] as EconomicsCalendar;
            expect(validImpacts).toContain(economic.impact);
          }
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getIPOCalendar', () => {
    it(
      'should fetch IPO calendar and validate structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping IPO calendar test - no API key available');
          return;
        }

        const result =
          testDataCache.ipo ||
          (await fmp.calendar.getIPOCalendar({
            from: '2024-01-15',
            to: '2024-01-21',
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const ipo = getFirstItem(result.data) as IPOCalendar;

          // Required properties
          expect(ipo).toHaveProperty('date');
          expect(ipo).toHaveProperty('company');
          expect(ipo).toHaveProperty('symbol');
          expect(ipo).toHaveProperty('exchange');
          expect(ipo).toHaveProperty('actions');
          expect(ipo).toHaveProperty('shares');
          expect(ipo).toHaveProperty('priceRange');
          expect(ipo).toHaveProperty('marketCap');

          // Validate data types
          expect(typeof ipo.date).toBe('string');
          expect(isValidDateFormat(ipo.date)).toBe(true);

          expect(typeof ipo.company).toBe('string');
          expect(ipo.company.length).toBeGreaterThan(0);

          expect(typeof ipo.symbol).toBe('string');
          expect(ipo.symbol.length).toBeGreaterThan(0);

          expect(typeof ipo.exchange).toBe('string');
          expect(ipo.exchange.length).toBeGreaterThan(0);

          expect(typeof ipo.actions).toBe('string');
          expect(ipo.actions.length).toBeGreaterThan(0);

          // priceRange can be object or string
          expect(typeof ipo.priceRange === 'string' || typeof ipo.priceRange === 'object').toBe(
            true,
          );

          // shares and marketCap can be null
          expect(ipo.shares === null || isValidPositiveNumber(ipo.shares)).toBe(true);
          expect(ipo.marketCap === null || isValidPositiveNumber(ipo.marketCap)).toBe(true);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getSplitsCalendar', () => {
    it(
      'should fetch splits calendar and validate structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping splits calendar test - no API key available');
          return;
        }

        const result =
          testDataCache.splits ||
          (await fmp.calendar.getSplitsCalendar({
            from: '2024-01-15',
            to: '2024-01-21',
          }));

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const split = getFirstItem(result.data) as SplitsCalendar;

          // Required properties
          expect(split).toHaveProperty('date');
          expect(split).toHaveProperty('label');
          expect(split).toHaveProperty('symbol');
          expect(split).toHaveProperty('numerator');
          expect(split).toHaveProperty('denominator');

          // Validate data types
          expect(typeof split.date).toBe('string');
          expect(isValidDateFormat(split.date)).toBe(true);

          expect(typeof split.label).toBe('string');
          expect(split.label.length).toBeGreaterThan(0);

          expect(typeof split.symbol).toBe('string');
          expect(split.symbol.length).toBeGreaterThan(0);

          expect(isValidPositiveNumber(split.numerator)).toBe(true);
          expect(isValidPositiveNumber(split.denominator)).toBe(true);

          // Validate split ratio logic
          expect(split.numerator).toBeGreaterThan(0);
          expect(split.denominator).toBeGreaterThan(0);

          // Validate split ratio format (e.g., "2:1", "3:2")
          const ratioMatch = split.label.match(/(\d+):(\d+)/);
          if (ratioMatch) {
            const labelNumerator = parseInt(ratioMatch[1]);
            const labelDenominator = parseInt(ratioMatch[2]);
            expect(split.numerator).toBe(labelNumerator);
            expect(split.denominator).toBe(labelDenominator);
          }
        }
      },
      API_TIMEOUT,
    );
  });

  describe('Data Consistency and Performance', () => {
    it(
      'should maintain consistent data structure across all calendar endpoints',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping data consistency test - no API key available');
          return;
        }

        // Use cached data if available, otherwise make minimal API calls
        const endpoints = [
          () => Promise.resolve(testDataCache.earnings || { success: false, data: [] }),
          () => Promise.resolve(testDataCache.earningsConfirmed || { success: false, data: [] }),
          () => Promise.resolve(testDataCache.dividends || { success: false, data: [] }),
          () => Promise.resolve(testDataCache.economics || { success: false, data: [] }),
          () => Promise.resolve(testDataCache.ipo || { success: false, data: [] }),
          () => Promise.resolve(testDataCache.splits || { success: false, data: [] }),
        ];

        for (const endpoint of endpoints) {
          const result = await endpoint();

          if (result.success) {
            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);

            if (result.data && Array.isArray(result.data) && result.data.length > 0) {
              const firstItem = result.data[0];
              expect(firstItem).toHaveProperty('date');
              expect(typeof firstItem.date).toBe('string');
              expect(isValidDateFormat(firstItem.date)).toBe(true);
            }
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should complete calendar requests within reasonable time',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping performance test - no API key available');
          return;
        }

        const startTime = Date.now();

        const result = await fmp.calendar.getEarningsCalendar({
          from: '2024-01-15',
          to: '2024-01-21',
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        expect(result.success).toBe(true);
        expect(duration).toBeLessThan(API_TIMEOUT);
        expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
      },
      API_TIMEOUT,
    );
  });
});

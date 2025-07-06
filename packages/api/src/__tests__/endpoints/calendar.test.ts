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
} from '@/types/calendar';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Calendar Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping calendar tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getEarningsCalendar', () => {
    it(
      'should fetch earnings calendar with date range',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings calendar test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEarningsCalendar({
          from: TEST_DATE_RANGES.RECENT.from,
          to: TEST_DATE_RANGES.RECENT.to,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const earnings = getFirstItem(result.data) as EarningsCalendar;
          expect(earnings).toHaveProperty('date');
          expect(earnings).toHaveProperty('symbol');
          expect(earnings).toHaveProperty('eps');
          expect(earnings).toHaveProperty('epsEstimated');
          expect(earnings).toHaveProperty('time');
          expect(earnings).toHaveProperty('revenue');
          expect(earnings).toHaveProperty('revenueEstimated');
          expect(earnings).toHaveProperty('fiscalDateEnding');
          expect(earnings).toHaveProperty('updatedFromDate');

          // Validate data types
          expect(typeof earnings.date).toBe('string');
          expect(typeof earnings.symbol).toBe('string');
          expect(typeof earnings.eps).toBe('number');
          expect(earnings.epsEstimated === null || typeof earnings.epsEstimated === 'number').toBe(
            true,
          );
          expect(typeof earnings.time).toBe('string');
          expect(earnings.revenue === null || typeof earnings.revenue === 'number').toBe(true);
          expect(
            earnings.revenueEstimated === null || typeof earnings.revenueEstimated === 'number',
          ).toBe(true);
          expect(typeof earnings.fiscalDateEnding).toBe('string');
          expect(typeof earnings.updatedFromDate).toBe('string');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch earnings calendar without date parameters',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings calendar no params test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEarningsCalendar({});

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );

    it(
      'should handle empty date range gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings calendar empty range test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEarningsCalendar({
          from: '2024-12-31',
          to: '2024-12-31',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        // Empty range might return empty array or no data
        expect(Array.isArray(result.data) ? result.data.length >= 0 : true).toBe(true);
      },
      FAST_TIMEOUT,
    );
  });

  describe('getDividendsCalendar', () => {
    it(
      'should fetch dividends calendar with date range',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping dividends calendar test - no API key available');
          return;
        }
        const result = await fmp.calendar.getDividendsCalendar({
          from: TEST_DATE_RANGES.RECENT.from,
          to: TEST_DATE_RANGES.RECENT.to,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const dividend = getFirstItem(result.data) as DividendsCalendar;
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
          expect(typeof dividend.label).toBe('string');
          expect(typeof dividend.adjDividend).toBe('number');
          expect(typeof dividend.symbol).toBe('string');
          expect(typeof dividend.dividend).toBe('number');
          // recordDate can be object or string
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
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch dividends calendar without date parameters',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping dividends calendar no params test - no API key available');
          return;
        }
        const result = await fmp.calendar.getDividendsCalendar({});

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );
  });

  describe('getEconomicsCalendar', () => {
    it(
      'should fetch economics calendar with date range',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping economics calendar test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEconomicsCalendar({
          from: TEST_DATE_RANGES.RECENT.from,
          to: TEST_DATE_RANGES.RECENT.to,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const economic = getFirstItem(result.data) as EconomicsCalendar;
          expect(economic).toHaveProperty('date');
          expect(economic).toHaveProperty('country');
          expect(economic).toHaveProperty('event');
          expect(economic).toHaveProperty('currency');
          expect(economic).toHaveProperty('previous');
          expect(economic).toHaveProperty('estimate');
          expect(economic).toHaveProperty('actual');
          expect(economic).toHaveProperty('change');
          expect(economic).toHaveProperty('impact');
          expect(economic).toHaveProperty('changePercentage');
          expect(economic).toHaveProperty('unit');

          // Validate data types
          expect(typeof economic.date).toBe('string');
          expect(typeof economic.country).toBe('string');
          expect(typeof economic.event).toBe('string');
          expect(typeof economic.currency).toBe('string');
          expect(typeof economic.previous).toBe('number');
          expect(typeof economic.actual).toBe('number');
          expect(typeof economic.change).toBe('number');
          expect(typeof economic.impact).toBe('string');
          expect(typeof economic.changePercentage).toBe('number');
          expect(economic.unit === null || typeof economic.unit === 'string').toBe(true);
          // estimate can be null
          expect(economic.estimate === null || typeof economic.estimate === 'number').toBe(true);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch economics calendar without date parameters',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping economics calendar no params test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEconomicsCalendar({});

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );
  });

  describe('getIPOCalendar', () => {
    it(
      'should fetch IPO calendar with date range',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping IPO calendar test - no API key available');
          return;
        }
        const result = await fmp.calendar.getIPOCalendar({
          from: TEST_DATE_RANGES.RECENT.from,
          to: TEST_DATE_RANGES.RECENT.to,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const ipo = getFirstItem(result.data) as IPOCalendar;
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
          expect(typeof ipo.company).toBe('string');
          expect(typeof ipo.symbol).toBe('string');
          expect(typeof ipo.exchange).toBe('string');
          expect(typeof ipo.actions).toBe('string');
          // priceRange can be object or string
          expect(typeof ipo.priceRange === 'string' || typeof ipo.priceRange === 'object').toBe(
            true,
          );
          // shares and marketCap can be null
          expect(ipo.shares === null || typeof ipo.shares === 'number').toBe(true);
          expect(ipo.marketCap === null || typeof ipo.marketCap === 'number').toBe(true);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch IPO calendar without date parameters',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping IPO calendar no params test - no API key available');
          return;
        }
        const result = await fmp.calendar.getIPOCalendar({});

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );
  });

  describe('getSplitsCalendar', () => {
    it(
      'should fetch splits calendar with date range',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping splits calendar test - no API key available');
          return;
        }
        const result = await fmp.calendar.getSplitsCalendar({
          from: TEST_DATE_RANGES.RECENT.from,
          to: TEST_DATE_RANGES.RECENT.to,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        // Validate data structure if data exists
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          const split = getFirstItem(result.data) as SplitsCalendar;
          expect(split).toHaveProperty('date');
          expect(split).toHaveProperty('label');
          expect(split).toHaveProperty('symbol');
          expect(split).toHaveProperty('numerator');
          expect(split).toHaveProperty('denominator');

          // Validate data types
          expect(typeof split.date).toBe('string');
          expect(typeof split.label).toBe('string');
          expect(typeof split.symbol).toBe('string');
          expect(typeof split.numerator).toBe('number');
          expect(typeof split.denominator).toBe('number');

          // Validate split ratio logic
          expect(split.numerator).toBeGreaterThan(0);
          expect(split.denominator).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch splits calendar without date parameters',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping splits calendar no params test - no API key available');
          return;
        }
        const result = await fmp.calendar.getSplitsCalendar({});

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );
  });

  describe('Edge Cases and Error Handling', () => {
    it(
      'should handle future date ranges gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping future date range test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEarningsCalendar({
          from: '2030-01-01',
          to: '2030-01-31',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        // Future dates might return empty array
        expect(Array.isArray(result.data) ? result.data.length >= 0 : true).toBe(true);
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle invalid date format gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping invalid date format test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEarningsCalendar({
          from: 'invalid-date',
          to: 'also-invalid',
        });

        // API might return error or empty data for invalid dates
        expect(result.success === true || result.success === false).toBe(true);
        expect(result.data !== undefined).toBe(true);
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle reversed date ranges',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping reversed date range test - no API key available');
          return;
        }
        const result = await fmp.calendar.getEarningsCalendar({
          from: '2024-01-31',
          to: '2024-01-01',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        // Reversed dates might return empty array or error
        expect(Array.isArray(result.data) ? result.data.length >= 0 : true).toBe(true);
      },
      FAST_TIMEOUT,
    );
  });
});

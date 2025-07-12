import { FMP } from '../../fmp';
import {
  shouldSkipTests,
  createTestClient,
  API_TIMEOUT,
  FAST_TIMEOUT,
  TEST_SYMBOLS,
} from '../utils/test-setup';
import { StockSplitResponse } from '../../types/stock';

describe('Stock Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping stock tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it(
      'should fetch stock quote for AAPL with comprehensive data validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping stock quote test - no API key available');
          return;
        }
        const result = await fmp.stock.getQuote({ symbol: TEST_SYMBOLS.STOCK });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // Enhanced data validation - check for actual data vs empty object
        const dataKeys = Object.keys(result.data || {});
        expect(dataKeys.length).toBeGreaterThan(0);

        if (dataKeys.length > 0) {
          console.log(
            `✅ Stock quote for ${TEST_SYMBOLS.STOCK} returned ${dataKeys.length} data fields`,
          );
        } else {
          console.log('⚠️ Stock quote returned empty data object');
        }

        if (result.data) {
          const quote = Array.isArray(result.data) ? result.data[0] : result.data;
          expect(quote.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(quote.price).toBeGreaterThan(0);
          expect(quote.marketCap).toBeGreaterThan(0);
          expect(quote.volume).toBeGreaterThan(0);

          // Additional validation for key fields
          expect(typeof quote.price).toBe('number');
          expect(typeof quote.marketCap).toBe('number');
          expect(typeof quote.volume).toBe('number');
          expect(quote.exchange).toBeDefined();
          expect(typeof quote.exchange).toBe('string');
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle invalid symbol gracefully and return empty data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping invalid symbol test - no API key available');
          return;
        }
        const result = await fmp.stock.getQuote({
          symbol: 'INVALID_SYMBOL_12345',
        });

        // Should return empty object or failed response
        const dataKeys = Object.keys(result.data || {});
        if (dataKeys.length === 0) {
          console.log('✅ Invalid symbol correctly returned empty data object');
        } else if (!result.success) {
          console.log('✅ Invalid symbol correctly returned failed response');
        }

        expect(dataKeys.length === 0 || result.success === false).toBe(true);
      },
      FAST_TIMEOUT,
    );
  });

  describe('getHistoricalPrice', () => {
    it(
      'should fetch historical prices for AAPL with data validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping historical price test - no API key available');
          return;
        }
        const result = await fmp.stock.getHistoricalPrice({
          symbol: TEST_SYMBOLS.STOCK,
          from: '2024-01-01',
          to: '2024-01-31',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // Enhanced data validation
        if (result.data && typeof result.data === 'object' && 'historical' in result.data) {
          const historical = result.data.historical;
          expect(Array.isArray(historical)).toBe(true);

          if (historical.length > 0) {
            console.log(
              `✅ Historical prices for ${TEST_SYMBOLS.STOCK} returned ${historical.length} records`,
            );

            // Validate first record structure
            const firstRecord = historical[0];
            expect(firstRecord.date).toBeDefined();
            expect(firstRecord.open).toBeDefined();
            expect(firstRecord.high).toBeDefined();
            expect(firstRecord.low).toBeDefined();
            expect(firstRecord.close).toBeDefined();
            expect(firstRecord.volume).toBeDefined();

            // Validate numeric fields
            expect(typeof firstRecord.open).toBe('number');
            expect(typeof firstRecord.high).toBe('number');
            expect(typeof firstRecord.low).toBe('number');
            expect(typeof firstRecord.close).toBe('number');
            expect(typeof firstRecord.volume).toBe('number');
          } else {
            console.log('⚠️ Historical prices returned empty array');
          }
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getMarketCap', () => {
    it(
      'should fetch market cap for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping market cap test - no API key available');
          return;
        }
        const result = await fmp.stock.getMarketCap({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // Enhanced data validation
        const dataKeys = Object.keys(result.data || {});
        expect(dataKeys.length).toBeGreaterThan(0);

        if (dataKeys.length > 0) {
          console.log(
            `✅ Market cap for ${TEST_SYMBOLS.STOCK} returned ${dataKeys.length} data fields`,
          );
        } else {
          console.log('⚠️ Market cap returned empty data object');
        }

        if (result.data) {
          const marketCap = Array.isArray(result.data) ? result.data[0] : result.data;
          expect(marketCap.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(marketCap.marketCap).toBeGreaterThan(0);

          // Additional validation
          expect(typeof marketCap.marketCap).toBe('number');
          expect(marketCap.marketCap).toBeGreaterThan(1000000000); // Should be > $1B for AAPL
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getStockSplits', () => {
    it(
      'should fetch stock splits for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping stock splits test - no API key available');
          return;
        }
        const result = await fmp.stock.getStockSplits({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // Stock splits returns a single object with historical array
        expect(typeof result.data).toBe('object');
        if (result.data && typeof result.data === 'object' && 'symbol' in result.data) {
          expect(result.data.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(result.data).toHaveProperty('historical');
          expect(Array.isArray((result.data as StockSplitResponse).historical)).toBe(true);

          const historical = (result.data as StockSplitResponse).historical;
          if (historical && historical.length > 0) {
            console.log(
              `✅ Stock splits for ${TEST_SYMBOLS.STOCK} returned ${historical.length} records`,
            );

            // Validate first record structure
            const firstRecord = historical[0];
            expect(firstRecord.date).toBeDefined();
            expect(firstRecord.label).toBeDefined();
            expect(firstRecord.numerator).toBeDefined();
            expect(firstRecord.denominator).toBeDefined();

            // Validate numeric fields
            expect(typeof firstRecord.numerator).toBe('number');
            expect(typeof firstRecord.denominator).toBe('number');
            expect(firstRecord.numerator).toBeGreaterThan(0);
            expect(firstRecord.denominator).toBeGreaterThan(0);
          } else {
            console.log('⚠️ Stock splits returned empty historical array');
          }
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getDividendHistory', () => {
    it(
      'should fetch dividend history for AAPL with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping dividend history test - no API key available');
          return;
        }
        const result = await fmp.stock.getDividendHistory({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // Dividend history returns a single object with historical array
        expect(typeof result.data).toBe('object');
        if (result.data && typeof result.data === 'object' && 'symbol' in result.data) {
          expect(result.data.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(result.data).toHaveProperty('historical');
          expect(Array.isArray(result.data.historical)).toBe(true);

          const historical = result.data.historical;
          if (historical && historical.length > 0) {
            console.log(
              `✅ Dividend history for ${TEST_SYMBOLS.STOCK} returned ${historical.length} records`,
            );

            // Validate first record structure
            const firstRecord = historical[0];
            expect(firstRecord.date).toBeDefined();
            expect(firstRecord.label).toBeDefined();
            expect(firstRecord.adjDividend).toBeDefined();
            expect(firstRecord.dividend).toBeDefined();
            expect(firstRecord.recordDate).toBeDefined();
            expect(firstRecord.paymentDate).toBeDefined();
            expect(firstRecord.declarationDate).toBeDefined();

            // Validate numeric fields
            expect(typeof firstRecord.adjDividend).toBe('number');
            expect(typeof firstRecord.dividend).toBe('number');
            expect(firstRecord.adjDividend).toBeGreaterThanOrEqual(0);
            expect(firstRecord.dividend).toBeGreaterThanOrEqual(0);
          } else {
            console.log('⚠️ Dividend history returned empty historical array');
          }
        }
      },
      FAST_TIMEOUT,
    );
  });
});

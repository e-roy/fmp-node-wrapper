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
      'should fetch stock quote for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping stock quote test - no API key available');
          return;
        }
        const result = await fmp.stock.getQuote({ symbol: TEST_SYMBOLS.STOCK });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Object.keys(result.data || {}).length).toBeGreaterThan(0);

        if (result.data) {
          const quote = Array.isArray(result.data) ? result.data[0] : result.data;
          expect(quote.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(quote.price).toBeGreaterThan(0);
          expect(quote.marketCap).toBeGreaterThan(0);
          expect(quote.volume).toBeGreaterThan(0);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle invalid symbol gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping invalid symbol test - no API key available');
          return;
        }
        const result = await fmp.stock.getQuote({
          symbol: 'INVALID_SYMBOL_12345',
        });

        expect(Object.keys(result.data || {}).length === 0 || result.success === false).toBe(true);
      },
      FAST_TIMEOUT,
    );
  });

  describe('getHistoricalPrice', () => {
    it(
      'should fetch historical prices for AAPL',
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
      },
      API_TIMEOUT,
    );
  });

  describe('getMarketCap', () => {
    it(
      'should fetch market cap for AAPL',
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
        expect(Object.keys(result.data || {}).length).toBeGreaterThan(0);

        if (result.data) {
          const marketCap = Array.isArray(result.data) ? result.data[0] : result.data;
          expect(marketCap.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(marketCap.marketCap).toBeGreaterThan(0);
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getStockSplits', () => {
    it(
      'should fetch stock splits for AAPL',
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
          if (
            (result.data as StockSplitResponse).historical &&
            (result.data as StockSplitResponse).historical.length > 0
          ) {
            expect((result.data as StockSplitResponse).historical[0].date).toBeDefined();
            expect((result.data as StockSplitResponse).historical[0].label).toBeDefined();
            expect((result.data as StockSplitResponse).historical[0].numerator).toBeDefined();
            expect((result.data as StockSplitResponse).historical[0].denominator).toBeDefined();
          }
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getDividendHistory', () => {
    it(
      'should fetch dividend history for AAPL',
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
          if (result.data.historical && result.data.historical.length > 0) {
            expect(result.data.historical[0].date).toBeDefined();
            expect(result.data.historical[0].label).toBeDefined();
            expect(result.data.historical[0].adjDividend).toBeDefined();
            expect(result.data.historical[0].dividend).toBeDefined();
            expect(result.data.historical[0].recordDate).toBeDefined();
            expect(result.data.historical[0].paymentDate).toBeDefined();
            expect(result.data.historical[0].declarationDate).toBeDefined();
            expect(typeof result.data.historical[0].adjDividend).toBe('number');
            expect(typeof result.data.historical[0].dividend).toBe('number');
          }
        }
      },
      FAST_TIMEOUT,
    );
  });
});

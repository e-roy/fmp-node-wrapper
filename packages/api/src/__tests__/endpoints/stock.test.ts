import { FMP } from '../../fmp';
import {
  shouldSkipTests,
  createTestClient,
  API_TIMEOUT,
  FAST_TIMEOUT,
  TEST_SYMBOLS,
} from '../utils/test-setup';

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
          const quote = result.data;
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

  describe('getCompanyProfile', () => {
    it(
      'should fetch company profile for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping company profile test - no API key available');
          return;
        }
        const result = await fmp.stock.getCompanyProfile({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Object.keys(result.data || {}).length).toBeGreaterThan(0);

        if (result.data) {
          const profile = result.data;
          expect(profile.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(profile.companyName).toBeDefined();
          expect(profile.industry).toBeDefined();
          expect(profile.sector).toBeDefined();
          // Note: marketCap is not always returned in company profile
          // expect(profile.marketCap).toBeGreaterThan(0);
        }
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
          const marketCap = result.data;
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
        expect(Array.isArray(result.data)).toBe(true);
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
        expect(Array.isArray(result.data)).toBe(true);
      },
      FAST_TIMEOUT,
    );
  });
});

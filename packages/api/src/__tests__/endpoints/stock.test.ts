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

  describe('getRealTimePrice', () => {
    it(
      'should fetch real time price for single stock with comprehensive validation',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping real time price test - no API key available');
          return;
        }
        const result = await fmp.stock.getRealTimePrice({
          symbols: [TEST_SYMBOLS.STOCK],
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          // Validate that at least one record matches the symbol
          const found = result.data.find(r => r.symbol === TEST_SYMBOLS.STOCK);
          expect(found).toBeDefined();
          expect(found!.price).toBeDefined();
          expect(typeof found!.price).toBe('number');
          expect(found!.price).toBeGreaterThan(0);
        } else {
          console.log('⚠️ Real time price returned empty array');
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch real time price for multiple stocks',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping multiple stocks real time price test - no API key available');
          return;
        }
        const symbols = [TEST_SYMBOLS.STOCK, 'MSFT', 'GOOGL'];
        const result = await fmp.stock.getRealTimePrice({
          symbols,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          // Validate that we got data for at least some of the requested symbols
          const returnedSymbols = result.data.map(item => item.symbol);
          const hasRequestedSymbols = symbols.some(symbol => returnedSymbols.includes(symbol));
          expect(hasRequestedSymbols).toBe(true);

          // Validate record structure
          result.data.forEach(record => {
            expect(record.symbol).toBeDefined();
            expect(record.price).toBeDefined();
            expect(typeof record.price).toBe('number');
            expect(record.price).toBeGreaterThan(0);
          });
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch real time price for all stocks when symbols array is empty',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping all stocks real time price test - no API key available');
          return;
        }
        const result = await fmp.stock.getRealTimePrice({
          symbols: [],
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          // Should return a substantial number of stocks
          expect(result.data.length).toBeGreaterThan(100);

          // Validate record structure
          const firstRecord = result.data[0];
          expect(firstRecord.symbol).toBeDefined();
          expect(firstRecord.price).toBeDefined();
          expect(typeof firstRecord.price).toBe('number');
          expect(firstRecord.price).toBeGreaterThan(0);
        } else {
          console.log('⚠️ All stocks real time price returned empty array');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getRealTimePriceForMultipleStocks', () => {
    it(
      'should fetch full real time price data for single stock',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping full real time price test - no API key available');
          return;
        }
        const result = await fmp.stock.getRealTimePriceForMultipleStocks({
          symbols: [TEST_SYMBOLS.STOCK],
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          // Validate that at least one record matches the symbol
          const found = result.data.find(r => r.symbol === TEST_SYMBOLS.STOCK);
          expect(found).toBeDefined();
          expect(found!.bidPrice).toBeDefined();
          expect(found!.askPrice).toBeDefined();
          expect(found!.lastSalePrice).toBeDefined();
          expect(found!.volume).toBeDefined();
          expect(found!.bidSize).toBeDefined();
          expect(found!.askSize).toBeDefined();
          expect(found!.lastSaleSize).toBeDefined();
          expect(found!.lastSaleTime).toBeDefined();
          expect(found!.fmpLast).toBeDefined();
          expect(found!.lastUpdated).toBeDefined();

          // Validate numeric fields
          expect(typeof found!.bidPrice).toBe('number');
          expect(typeof found!.askPrice).toBe('number');
          expect(typeof found!.lastSalePrice).toBe('number');
          expect(typeof found!.volume).toBe('number');
          expect(typeof found!.bidSize).toBe('number');
          expect(typeof found!.askSize).toBe('number');
          expect(typeof found!.lastSaleSize).toBe('number');
          expect(typeof found!.lastSaleTime).toBe('number');
          expect(typeof found!.fmpLast).toBe('number');
          expect(typeof found!.lastUpdated).toBe('number');
        } else {
          console.log('⚠️ Full real time price returned empty array');
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch full real time price data for multiple stocks',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping multiple stocks full real time price test - no API key available');
          return;
        }
        const symbols = [TEST_SYMBOLS.STOCK, 'MSFT', 'GOOGL'];
        const result = await fmp.stock.getRealTimePriceForMultipleStocks({
          symbols,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          // Validate that we got data for at least some of the requested symbols
          const returnedSymbols = result.data.map(item => item.symbol);
          const hasRequestedSymbols = symbols.some(symbol => returnedSymbols.includes(symbol));
          expect(hasRequestedSymbols).toBe(true);

          // Validate record structure
          result.data.forEach(record => {
            expect(record.symbol).toBeDefined();
            expect(record.bidPrice).toBeDefined();
            expect(record.askPrice).toBeDefined();
            expect(record.lastSalePrice).toBeDefined();
            expect(record.volume).toBeDefined();
            expect(typeof record.bidPrice).toBe('number');
            expect(typeof record.askPrice).toBe('number');
            expect(typeof record.lastSalePrice).toBe('number');
            expect(typeof record.volume).toBe('number');
          });
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch full real time price data for all stocks when symbols array is empty',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping all stocks full real time price test - no API key available');
          return;
        }
        const result = await fmp.stock.getRealTimePriceForMultipleStocks({
          symbols: [],
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          // Should return a substantial number of stocks
          expect(result.data.length).toBeGreaterThan(100);

          // Validate record structure - be flexible about which properties exist
          const firstRecord = result.data[0];
          if (firstRecord && firstRecord.symbol) {
            expect(firstRecord.symbol).toBeDefined();
            expect(typeof firstRecord.symbol).toBe('string');

            // Check for common properties that might exist
            if ('bidPrice' in firstRecord) {
              expect(typeof firstRecord.bidPrice).toBe('number');
            }
            if ('askPrice' in firstRecord) {
              expect(typeof firstRecord.askPrice).toBe('number');
            }
            if ('lastSalePrice' in firstRecord) {
              expect(typeof firstRecord.lastSalePrice).toBe('number');
            }
            if ('volume' in firstRecord) {
              expect(typeof firstRecord.volume).toBe('number');
            }
            if ('price' in firstRecord) {
              expect(typeof firstRecord.price).toBe('number');
            }
          } else {
            console.log('⚠️ First record is invalid or missing required properties');
          }
        } else {
          console.log(
            '⚠️ All stocks full real time price returned empty array (API limitation or no data)',
          );
          // Don't run assertions if no data is returned
        }
      },
      API_TIMEOUT,
    );
  });
});

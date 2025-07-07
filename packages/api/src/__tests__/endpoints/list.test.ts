import { FMP } from '../../fmp';
import { shouldSkipTests, createTestClient, API_TIMEOUT } from '../utils/test-setup';
import { StockList, ETFList, CryptoList, ForexList, AvailableIndexesList } from '../../types/list';

describe('List Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping list tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getStockList', () => {
    it(
      'should fetch stock list with valid data structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping stock list test - no API key available');
          return;
        }
        const result = await fmp.list.getStockList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const stock = result.data[0] as StockList;

          // Validate required fields
          expect(stock.symbol).toBeDefined();
          expect(typeof stock.symbol).toBe('string');
          expect(stock.symbol.length).toBeGreaterThan(0);

          expect(stock.exchange).toBeDefined();
          expect(typeof stock.exchange).toBe('string');

          expect(stock.exchangeShortName).toBeDefined();
          expect(typeof stock.exchangeShortName).toBe('string');

          expect(stock.price).toBeDefined();
          expect(typeof stock.price).toBe('number');
          expect(stock.price).toBeGreaterThan(0);

          expect(stock.type).toBeDefined();
          expect(typeof stock.type).toBe('string');

          expect(stock.name).toBeDefined();
          expect(typeof stock.name).toBe('string');
          expect(stock.name.length).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should return a non-empty array of stocks',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping stock list length test - no API key available');
          return;
        }
        const result = await fmp.list.getStockList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);
      },
      API_TIMEOUT,
    );
  });

  describe('getETFList', () => {
    it(
      'should fetch ETF list with valid data structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping ETF list test - no API key available');
          return;
        }
        const result = await fmp.list.getETFList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const etf = result.data[0] as ETFList;

          // Validate required fields
          expect(etf.symbol).toBeDefined();
          expect(typeof etf.symbol).toBe('string');
          expect(etf.symbol.length).toBeGreaterThan(0);

          expect(etf.exchange).toBeDefined();
          expect(typeof etf.exchange).toBe('string');

          expect(etf.exchangeShortName).toBeDefined();
          expect(typeof etf.exchangeShortName).toBe('string');

          expect(etf.price).toBeDefined();
          expect(typeof etf.price).toBe('number');
          expect(etf.price).toBeGreaterThan(0);

          expect(etf.name).toBeDefined();
          expect(typeof etf.name).toBe('string');
          expect(etf.name.length).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should return a non-empty array of ETFs',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping ETF list length test - no API key available');
          return;
        }
        const result = await fmp.list.getETFList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);
      },
      API_TIMEOUT,
    );
  });

  describe('getCryptoList', () => {
    it(
      'should fetch crypto list with valid data structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping crypto list test - no API key available');
          return;
        }
        const result = await fmp.list.getCryptoList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const crypto = result.data[0] as CryptoList;

          // Validate required fields
          expect(crypto.symbol).toBeDefined();
          expect(typeof crypto.symbol).toBe('string');
          expect(crypto.symbol.length).toBeGreaterThan(0);

          expect(crypto.name).toBeDefined();
          expect(typeof crypto.name).toBe('string');
          expect(crypto.name.length).toBeGreaterThan(0);

          expect(crypto.currency).toBeDefined();
          expect(typeof crypto.currency).toBe('string');

          expect(crypto.stockExchange).toBeDefined();
          expect(typeof crypto.stockExchange).toBe('string');

          expect(crypto.exchangeShortName).toBeDefined();
          expect(typeof crypto.exchangeShortName).toBe('string');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should return a non-empty array of cryptocurrencies',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping crypto list length test - no API key available');
          return;
        }
        const result = await fmp.list.getCryptoList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);
      },
      API_TIMEOUT,
    );

    it(
      'should contain major cryptocurrencies',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping major crypto test - no API key available');
          return;
        }
        const result = await fmp.list.getCryptoList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const symbols = result.data.map((crypto: CryptoList) => crypto.symbol);

          // Check for common major cryptocurrencies
          const majorCryptos = ['BTCUSD', 'ETHUSD', 'USDTUSD', 'BNBUSD', 'ADAUSD'];
          const foundMajorCryptos = majorCryptos.filter(symbol =>
            symbols.some(s => s.includes(symbol.replace('USD', '')) || s === symbol),
          );

          // Should find at least some major cryptocurrencies
          expect(foundMajorCryptos.length).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getForexList', () => {
    it(
      'should fetch forex list with valid data structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping forex list test - no API key available');
          return;
        }
        const result = await fmp.list.getForexList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const forex = result.data[0] as ForexList;

          // Validate required fields
          expect(forex.symbol).toBeDefined();
          expect(typeof forex.symbol).toBe('string');
          expect(forex.symbol.length).toBeGreaterThan(0);

          expect(forex.name).toBeDefined();
          expect(typeof forex.name).toBe('string');
          expect(forex.name.length).toBeGreaterThan(0);

          expect(forex.currency).toBeDefined();
          expect(typeof forex.currency).toBe('string');

          expect(forex.stockExchange).toBeDefined();
          expect(typeof forex.stockExchange).toBe('string');

          expect(forex.exchangeShortName).toBeDefined();
          expect(typeof forex.exchangeShortName).toBe('string');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should return a non-empty array of forex pairs',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping forex list length test - no API key available');
          return;
        }
        const result = await fmp.list.getForexList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);
      },
      API_TIMEOUT,
    );

    it(
      'should contain major forex pairs',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping major forex test - no API key available');
          return;
        }
        const result = await fmp.list.getForexList();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const symbols = result.data.map((forex: ForexList) => forex.symbol);

          // Check for common major forex pairs
          const majorPairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD'];
          const foundMajorPairs = majorPairs.filter(symbol => symbols.includes(symbol));

          // Should find at least some major forex pairs
          expect(foundMajorPairs.length).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getAvailableIndexes', () => {
    it(
      'should fetch available indexes with valid data structure',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping available indexes test - no API key available');
          return;
        }
        const result = await fmp.list.getAvailableIndexes();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const index = result.data[0] as AvailableIndexesList;

          // Validate required fields
          expect(index.symbol).toBeDefined();
          expect(typeof index.symbol).toBe('string');
          expect(index.symbol.length).toBeGreaterThan(0);

          expect(index.name).toBeDefined();
          expect(typeof index.name).toBe('string');
          expect(index.name.length).toBeGreaterThan(0);

          expect(index.currency).toBeDefined();
          expect(typeof index.currency).toBe('string');

          expect(index.stockExchange).toBeDefined();
          expect(typeof index.stockExchange).toBe('string');

          expect(index.exchangeShortName).toBeDefined();
          expect(typeof index.exchangeShortName).toBe('string');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should return a non-empty array of indexes',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping indexes list length test - no API key available');
          return;
        }
        const result = await fmp.list.getAvailableIndexes();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);
      },
      API_TIMEOUT,
    );

    it(
      'should contain major market indexes',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping major indexes test - no API key available');
          return;
        }
        const result = await fmp.list.getAvailableIndexes();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const symbols = result.data.map((index: AvailableIndexesList) => index.symbol);

          // Check for common major indexes
          const majorIndexes = ['^GSPC', '^DJI', '^IXIC', '^RUT', '^VIX'];
          const foundMajorIndexes = majorIndexes.filter(symbol => symbols.includes(symbol));

          // Should find at least some major indexes
          expect(foundMajorIndexes.length).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('Data Consistency', () => {
    it(
      'should have consistent data types across all list endpoints',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping data consistency test - no API key available');
          return;
        }

        // Test all endpoints
        const [stockResult, etfResult, cryptoResult, forexResult, indexesResult] =
          await Promise.all([
            fmp.list.getStockList(),
            fmp.list.getETFList(),
            fmp.list.getCryptoList(),
            fmp.list.getForexList(),
            fmp.list.getAvailableIndexes(),
          ]);

        // All should be successful
        expect(stockResult.success).toBe(true);
        expect(etfResult.success).toBe(true);
        expect(cryptoResult.success).toBe(true);
        expect(forexResult.success).toBe(true);
        expect(indexesResult.success).toBe(true);

        // All should return arrays
        expect(Array.isArray(stockResult.data)).toBe(true);
        expect(Array.isArray(etfResult.data)).toBe(true);
        expect(Array.isArray(cryptoResult.data)).toBe(true);
        expect(Array.isArray(forexResult.data)).toBe(true);
        expect(Array.isArray(indexesResult.data)).toBe(true);

        // All arrays should be non-empty
        expect(stockResult.data!.length).toBeGreaterThan(0);
        expect(etfResult.data!.length).toBeGreaterThan(0);
        expect(cryptoResult.data!.length).toBeGreaterThan(0);
        expect(forexResult.data!.length).toBeGreaterThan(0);
        expect(indexesResult.data!.length).toBeGreaterThan(0);
      },
      API_TIMEOUT,
    );
  });
});

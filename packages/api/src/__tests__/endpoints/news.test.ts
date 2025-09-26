import { FMP } from '../../fmp';
import { shouldSkipTests, createTestClient, API_TIMEOUT, FAST_TIMEOUT } from '../utils/test-setup';
import type { News, Article } from 'fmp-node-types';

// Helper function to validate news article structure
function validateNewsArticle(news: News): void {
  expect(news.symbol).toBeDefined();
  expect(typeof news.symbol).toBe('string');
  expect(news.publishedDate).toBeDefined();
  expect(typeof news.publishedDate).toBe('string');
  expect(news.publisher).toBeDefined();
  expect(typeof news.publisher).toBe('string');
  expect(news.title).toBeDefined();
  expect(typeof news.title).toBe('string');
  expect(news.text).toBeDefined();
  expect(typeof news.text).toBe('string');
  expect(news.url).toBeDefined();
  expect(typeof news.url).toBe('string');
  expect(news.site).toBeDefined();
  expect(typeof news.site).toBe('string');
  expect(news.image).toBeDefined();
  // Image can be string or object depending on API response
  expect(typeof news.image === 'string' || typeof news.image === 'object').toBe(true);
}

// Helper function to validate FMP article structure
function validateFMPArticle(article: Article): void {
  expect(article.title).toBeDefined();
  expect(typeof article.title).toBe('string');
  expect(article.date).toBeDefined();
  expect(typeof article.date).toBe('string');
  expect(article.content).toBeDefined();
  expect(typeof article.content).toBe('string');
  expect(article.link).toBeDefined();
  expect(typeof article.link).toBe('string');
  expect(article.author).toBeDefined();
  expect(typeof article.author).toBe('string');
  expect(article.site).toBeDefined();
  expect(typeof article.site).toBe('string');
  expect(article.tickers).toBeDefined();
  expect(typeof article.tickers).toBe('string');
  expect(article.image).toBeDefined();
  expect(typeof article.image).toBe('string');
}

describe('NewsEndpoints Integration Tests', () => {
  let fmp: FMP;

  beforeAll(async () => {
    if (shouldSkipTests()) {
      console.log('Skipping news integration tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getArticles', () => {
    it(
      'should fetch FMP articles successfully',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getArticles({ page: 1, limit: 5 });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const article = result.data[0];
          validateFMPArticle(article);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch FMP articles with pagination',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getArticles({ page: 2, limit: 3 });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );

    it(
      'should handle pagination correctly',
      async () => {
        if (shouldSkipTests()) return;

        // Test with a reasonable page number
        const result = await fmp.news.getArticles({ page: 5, limit: 2 });

        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        // Should return data or empty array, but not error
        if (result.data) {
          expect(result.data.length).toBeLessThanOrEqual(2);
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getStockNews', () => {
    it(
      'should fetch stock news successfully',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getStockNews({ limit: 5 });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const news = result.data[0];
          validateNewsArticle(news);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch stock news with date range',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getStockNews({
          from: '2024-01-01',
          to: '2024-01-15',
          limit: 3,
        });

        // API might return success: false if no data for date range
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        // Data might be null/undefined or array depending on API response
        if (result.data !== null && result.data !== undefined) {
          expect(Array.isArray(result.data)).toBe(true);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch stock news with pagination',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getStockNews({
          page: 1,
          limit: 10,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );
  });

  describe('getCryptoNews', () => {
    it(
      'should fetch crypto news successfully',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getCryptoNews({ limit: 5 });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const news = result.data[0];
          validateNewsArticle(news);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch crypto news with date range',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getCryptoNews({
          from: '2024-01-01',
          to: '2024-01-15',
          limit: 3,
        });

        // API might return success: false if no data for date range
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        // Data might be null/undefined or array depending on API response
        if (result.data !== null && result.data !== undefined) {
          expect(Array.isArray(result.data)).toBe(true);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getForexNews', () => {
    it(
      'should fetch forex news successfully',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getForexNews({ limit: 5 });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const news = result.data[0];
          validateNewsArticle(news);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch forex news with date range',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getForexNews({
          from: '2024-01-01',
          to: '2024-01-15',
          limit: 3,
        });

        // API might return success: false if no data for date range
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        // Data might be null/undefined or array depending on API response
        if (result.data !== null && result.data !== undefined) {
          expect(Array.isArray(result.data)).toBe(true);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getStockNewsBySymbol', () => {
    it(
      'should fetch stock news for specific symbols',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getStockNewsBySymbol({
          symbols: ['AAPL'],
          limit: 3,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const news = result.data[0];
          validateNewsArticle(news);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch stock news for multiple symbols',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getStockNewsBySymbol({
          symbols: ['AAPL', 'MSFT'],
          limit: 5,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );

    it(
      'should handle invalid symbols gracefully',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getStockNewsBySymbol({
          symbols: ['INVALID_SYMBOL_12345'],
          limit: 3,
        });

        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        // Should return empty array for invalid symbols
        if (result.data) {
          expect(result.data.length).toBe(0);
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getCryptoNewsBySymbol', () => {
    it(
      'should fetch crypto news for specific symbols',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getCryptoNewsBySymbol({
          symbols: ['BTCUSD'],
          limit: 3,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const news = result.data[0];
          validateNewsArticle(news);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch crypto news for multiple symbols',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getCryptoNewsBySymbol({
          symbols: ['BTCUSD', 'ETHUSD'],
          limit: 5,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );

    it(
      'should fetch crypto news with date range',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getCryptoNewsBySymbol({
          symbols: ['BTCUSD'],
          from: '2024-01-01',
          to: '2024-01-15',
          limit: 3,
        });

        // API might return success: false if no data for date range
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        // Data might be null/undefined or array depending on API response
        if (result.data !== null && result.data !== undefined) {
          expect(Array.isArray(result.data)).toBe(true);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getForexNewsBySymbol', () => {
    it(
      'should fetch forex news for specific symbols',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getForexNewsBySymbol({
          symbols: ['EURUSD'],
          limit: 3,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const news = result.data[0];
          validateNewsArticle(news);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch forex news for multiple symbols',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getForexNewsBySymbol({
          symbols: ['EURUSD', 'GBPUSD'],
          limit: 5,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      },
      API_TIMEOUT,
    );

    it(
      'should fetch forex news with date range',
      async () => {
        if (shouldSkipTests()) return;

        const result = await fmp.news.getForexNewsBySymbol({
          symbols: ['EURUSD'],
          from: '2024-01-01',
          to: '2024-01-15',
          limit: 3,
        });

        // API might return success: false if no data for date range
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        // Data might be null/undefined or array depending on API response
        if (result.data !== null && result.data !== undefined) {
          expect(Array.isArray(result.data)).toBe(true);
        }
      },
      API_TIMEOUT,
    );
  });
});

import { FMP } from '../../fmp';
import { shouldSkipTests, createTestClient, API_TIMEOUT, FAST_TIMEOUT } from '../utils/test-setup';

describe('Screener Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping screener tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getScreener', () => {
    it(
      'should fetch companies with basic screening criteria',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping screener test - no API key available');
          return;
        }
        const result = await fmp.screener.getScreener({
          marketCapMoreThan: 1000000000, // $1B+
          isActivelyTrading: true,
          limit: 10,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          expect(result.data.length).toBeLessThanOrEqual(10);

          const company = result.data[0];
          expect(company.symbol).toBeDefined();
          expect(company.companyName).toBeDefined();
          expect(company.marketCap).toBeGreaterThan(1000000000);
          expect(company.price).toBeGreaterThan(0);
          expect(company.sector).toBeDefined();
          expect(company.industry).toBeDefined();
          expect(company.exchange).toBeDefined();
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch tech sector companies',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping tech sector screener test - no API key available');
          return;
        }
        const result = await fmp.screener.getScreener({
          sector: 'Technology',
          marketCapMoreThan: 5000000000, // $5B+
          isActivelyTrading: true,
          limit: 5,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          expect(result.data.length).toBeLessThanOrEqual(5);

          const company = result.data[0];
          expect(company.symbol).toBeDefined();
          expect(company.sector).toBe('Technology');
          expect(company.marketCap).toBeGreaterThan(5000000000);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch dividend-paying stocks',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping dividend screener test - no API key available');
          return;
        }
        const result = await fmp.screener.getScreener({
          dividendMoreThan: 0.02, // 2%+ dividend yield
          marketCapMoreThan: 2000000000, // $2B+
          isActivelyTrading: true,
          limit: 5,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          expect(result.data.length).toBeLessThanOrEqual(5);

          const company = result.data[0];
          expect(company.symbol).toBeDefined();
          expect(company.lastAnnualDividend).toBeGreaterThan(0.02);
          expect(company.marketCap).toBeGreaterThan(2000000000);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should handle empty results gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping empty results screener test - no API key available');
          return;
        }
        const result = await fmp.screener.getScreener({
          marketCapMoreThan: 999999999999999, // Unrealistically high market cap
          isActivelyTrading: true,
          limit: 10,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBe(0);
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle invalid parameters gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping invalid parameters screener test - no API key available');
          return;
        }
        const result = await fmp.screener.getScreener({
          marketCapMoreThan: -1000, // Invalid negative value
          isActivelyTrading: true,
          limit: 5,
        });

        // Should either return empty results or handle gracefully
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
      },
      FAST_TIMEOUT,
    );
  });

  describe('getAvailableExchanges', () => {
    it(
      'should fetch available exchanges',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping available exchanges test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableExchanges();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const exchange = result.data[0];
          expect(exchange.exchange).toBeDefined();
          expect(exchange.name).toBeDefined();
          expect(exchange.countryName).toBeDefined();
          expect(exchange.countryCode).toBeDefined();
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should contain common exchanges',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping common exchanges test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableExchanges();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          const exchangeNames = result.data.map(ex => ex.exchange);
          expect(exchangeNames).toContain('NASDAQ');
          expect(exchangeNames).toContain('NYSE');
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getAvailableSectors', () => {
    it(
      'should fetch available sectors',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping available sectors test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableSectors();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const sector = result.data[0];
          expect(sector.sector).toBeDefined();
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should contain common sectors',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping common sectors test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableSectors();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          const sectors = result.data.map(s => s.sector);
          expect(sectors).toContain('Technology');
          expect(sectors).toContain('Healthcare');
          expect(sectors).toContain('Financial Services');
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getAvailableIndustries', () => {
    it(
      'should fetch available industries',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping available industries test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableIndustries();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const industry = result.data[0];
          expect(industry.industry).toBeDefined();
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should contain tech-related industries',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping tech industries test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableIndustries();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          const industries = result.data.map(i => i.industry);
          const hasSoftwareIndustry = industries.some(industry =>
            industry.toLowerCase().includes('software'),
          );
          expect(hasSoftwareIndustry).toBe(true);
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getAvailableCountries', () => {
    it(
      'should fetch available countries',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping available countries test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableCountries();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const country = result.data[0];
          expect(country.country).toBeDefined();
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should contain major countries',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping major countries test - no API key available');
          return;
        }
        const result = await fmp.screener.getAvailableCountries();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          const countries = result.data.map(c => c.country);
          expect(countries).toContain('US');
          expect(countries).toContain('CA');
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('Integration Tests', () => {
    it(
      'should use available data in screener filters',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping integration test - no API key available');
          return;
        }

        // First get available sectors
        const sectorsResult = await fmp.screener.getAvailableSectors();
        expect(sectorsResult.success).toBe(true);
        expect(sectorsResult.data).toBeDefined();

        if (
          sectorsResult.data &&
          Array.isArray(sectorsResult.data) &&
          sectorsResult.data.length > 0
        ) {
          const firstSector = sectorsResult.data[0].sector;

          // Use that sector in a screener query
          const screenerResult = await fmp.screener.getScreener({
            sector: firstSector,
            marketCapMoreThan: 1000000000,
            isActivelyTrading: true,
            limit: 3,
          });

          expect(screenerResult.success).toBe(true);
          expect(screenerResult.data).toBeDefined();

          if (screenerResult.data && Array.isArray(screenerResult.data)) {
            screenerResult.data.forEach(company => {
              expect(company.sector).toBe(firstSector);
            });
          }
        }
      },
      API_TIMEOUT,
    );
  });
});

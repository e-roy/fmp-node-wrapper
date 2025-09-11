import { FMP } from '../../fmp';
import { shouldSkipTests, createTestClient, API_TIMEOUT, FAST_TIMEOUT } from '../utils/test-setup';

// Test data cache to avoid duplicate API calls
interface TestDataCache {
  screener?: any;
  availableExchanges?: any;
  availableSectors?: any;
  availableIndustries?: any;
  availableCountries?: any;
}

describe('Screener Endpoints', () => {
  let fmp: FMP;
  let testDataCache: TestDataCache = {};

  beforeAll(async () => {
    if (shouldSkipTests()) {
      console.log('Skipping screener tests - no API key available');
      return;
    }
    fmp = createTestClient();

    try {
      // Fetch all screener data in parallel with timeout
      const [
        screener,
        availableExchanges,
        availableSectors,
        availableIndustries,
        availableCountries,
      ] = await Promise.all([
        fmp.screener.getScreener({
          marketCapMoreThan: 1000000000, // $1B+
          isActivelyTrading: true,
          limit: 10,
        }),
        fmp.screener.getAvailableExchanges(),
        fmp.screener.getAvailableSectors(),
        fmp.screener.getAvailableIndustries(),
        fmp.screener.getAvailableCountries(),
      ]);

      testDataCache = {
        screener,
        availableExchanges,
        availableSectors,
        availableIndustries,
        availableCountries,
      };
    } catch (error) {
      console.warn('Failed to pre-fetch test data:', error);
      // Continue with tests - they will fetch data individually if needed
    }
  }, API_TIMEOUT);

  describe('getScreener', () => {
    it(
      'should fetch companies with basic screening criteria',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping screener test - no API key available');
          return;
        }

        const result =
          testDataCache.screener ||
          (await fmp.screener.getScreener({
            marketCapMoreThan: 1000000000, // $1B+
            isActivelyTrading: true,
            limit: 10,
          }));

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
  });

  describe('getAvailableExchanges', () => {
    it(
      'should fetch available exchanges',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping available exchanges test - no API key available');
          return;
        }

        const result =
          testDataCache.availableExchanges || (await fmp.screener.getAvailableExchanges());

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const exchange = result.data[0];
          expect(exchange.exchange).toBeDefined();
          expect(exchange.name).toBeDefined();
          expect(exchange.countryName).toBeDefined();
          expect(exchange.countryCode).toBeDefined();

          // Test that common exchanges are present
          const exchangeNames = result.data.map((ex: any) => ex.exchange);
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

        const result = testDataCache.availableSectors || (await fmp.screener.getAvailableSectors());

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const sector = result.data[0];
          expect(sector.sector).toBeDefined();

          // Test that common sectors are present
          const sectors = result.data.map((s: any) => s.sector);
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

        const result =
          testDataCache.availableIndustries || (await fmp.screener.getAvailableIndustries());

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const industry = result.data[0];
          expect(industry.industry).toBeDefined();

          // Test that tech-related industries are present
          const industries = result.data.map((i: any) => i.industry);
          const hasSoftwareIndustry = industries.some((industry: string) =>
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

        const result =
          testDataCache.availableCountries || (await fmp.screener.getAvailableCountries());

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const country = result.data[0];
          expect(country.country).toBeDefined();

          // Test that major countries are present
          const countries = result.data.map((c: any) => c.country);
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

        // Use cached sectors data
        const sectorsResult =
          testDataCache.availableSectors || (await fmp.screener.getAvailableSectors());
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

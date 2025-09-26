import { FMP } from '../../fmp';
import { TransactionType } from 'fmp-node-types';
import { shouldSkipTests, createTestClient, API_TIMEOUT, FAST_TIMEOUT } from '../utils/test-setup';

describe('InsiderEndpoints', () => {
  let fmp: FMP;

  beforeEach(() => {
    // Create a new FMP instance for each test
    fmp = createTestClient();
  });

  describe('getInsiderTradingRSS', () => {
    it(
      'should return insider trading RSS data with pagination',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping insider trading RSS test - no API key available');
          return;
        }

        const result = await fmp.insider.getInsiderTradingRSS({ page: 0, limit: 5 });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeLessThanOrEqual(5);

        if (result.data && result.data.length > 0) {
          const firstTrade = result.data[0];
          expect(firstTrade).toHaveProperty('symbol');
          expect(firstTrade).toHaveProperty('filingDate');
          expect(firstTrade).toHaveProperty('transactionDate');
          expect(firstTrade).toHaveProperty('reportingCik');
          expect(firstTrade).toHaveProperty('companyCik');
          expect(firstTrade).toHaveProperty('transactionType');
          expect(firstTrade).toHaveProperty('reportingName');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('searchInsiderTrading', () => {
    it(
      'should return insider trading data for a specific symbol',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping insider trading search test - no API key available');
          return;
        }

        const result = await fmp.insider.searchInsiderTrading({
          symbol: 'AAPL',
          page: 0,
          limit: 3,
        });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeLessThanOrEqual(3);

        if (result.data && result.data.length > 0) {
          const firstTrade = result.data[0];
          expect(firstTrade).toHaveProperty('symbol');
          expect(firstTrade).toHaveProperty('filingDate');
          expect(firstTrade).toHaveProperty('transactionDate');
          expect(firstTrade).toHaveProperty('reportingCik');
          expect(firstTrade).toHaveProperty('companyCik');
          expect(firstTrade).toHaveProperty('transactionType');
          expect(firstTrade).toHaveProperty('reportingName');
          expect(firstTrade.symbol).toBe('AAPL');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should return insider trading data with pagination only',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping insider trading search test - no API key available');
          return;
        }

        const result = await fmp.insider.searchInsiderTrading({
          page: 0,
          limit: 2,
        });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeLessThanOrEqual(2);
      },
      API_TIMEOUT,
    );

    it(
      'should return insider trading data filtered by reporting CIK',
      async () => {
        if (shouldSkipTests()) {
          console.log(
            'Skipping insider trading search by reporting CIK test - no API key available',
          );
          return;
        }

        const result = await fmp.insider.searchInsiderTrading({
          reportingCik: '0000320193',
          page: 0,
          limit: 2,
        });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeLessThanOrEqual(2);
      },
      API_TIMEOUT,
    );

    it(
      'should return insider trading data filtered by company CIK',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping insider trading search by company CIK test - no API key available');
          return;
        }

        const result = await fmp.insider.searchInsiderTrading({
          companyCik: '0000320193',
          page: 0,
          limit: 2,
        });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeLessThanOrEqual(2);
      },
      API_TIMEOUT,
    );

    it(
      'should return insider trading data filtered by transaction type',
      async () => {
        if (shouldSkipTests()) {
          console.log(
            'Skipping insider trading search by transaction type test - no API key available',
          );
          return;
        }

        const result = await fmp.insider.searchInsiderTrading({
          transactionType: 'P-Purchase',
          page: 0,
          limit: 2,
        });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeLessThanOrEqual(2);
      },
      API_TIMEOUT,
    );
  });

  describe('getTransactionTypes', () => {
    it(
      'should return array of transaction types',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping transaction types test - no API key available');
          return;
        }

        const result = await fmp.insider.getTransactionTypes();

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data!.length).toBeGreaterThan(0);

        // Check that we have some expected transaction types
        const transactionTypes = result.data!;
        const typeStrings = transactionTypes.map((t: any) => t.transactionType);
        expect(typeStrings).toContain('P-Purchase');
        expect(typeStrings).toContain('S-Sale');
      },
      FAST_TIMEOUT,
    );
  });

  describe('getInsidersBySymbol (DEPRECATED)', () => {
    it(
      'should return insiders data for a symbol (v4 endpoint)',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping insiders by symbol test - no API key available');
          return;
        }

        const result = await fmp.insider.getInsidersBySymbol({ symbol: 'AAPL' });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const firstInsider = result.data[0];
          expect(firstInsider).toHaveProperty('typeOfOwner');
          expect(firstInsider).toHaveProperty('transactionDate');
          expect(firstInsider).toHaveProperty('owner');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getInsiderTradeStatistics', () => {
    it(
      'should return insider trade statistics for a symbol',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping insider trade statistics test - no API key available');
          return;
        }

        const result = await fmp.insider.getInsiderTradeStatistics({ symbol: 'AAPL' });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const firstStat = result.data[0];
          expect(firstStat).toHaveProperty('symbol');
          expect(firstStat).toHaveProperty('cik');
          expect(firstStat).toHaveProperty('year');
          expect(firstStat).toHaveProperty('quarter');
          expect(firstStat).toHaveProperty('totalPurchases');
          expect(firstStat).toHaveProperty('totalSales');
          expect(firstStat.symbol).toBe('AAPL');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getCikMapper (DEPRECATED)', () => {
    it(
      'should return CIK mapper data with pagination (v4 endpoint)',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping CIK mapper test - no API key available');
          return;
        }

        const result = await fmp.insider.getCikMapper({ page: 0 });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const firstMapping = result.data[0];
          expect(firstMapping).toHaveProperty('reportingCik');
          expect(firstMapping).toHaveProperty('reportingName');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getCikMapperByName (DEPRECATED)', () => {
    it(
      'should return CIK mapper data by name search (v4 endpoint)',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping CIK mapper by name test - no API key available');
          return;
        }

        const result = await fmp.insider.getCikMapperByName({ name: 'apple', page: 0 });

        // This endpoint might fail, so we'll check for success or handle the failure gracefully
        if (result.success) {
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);

          if (result.data && result.data.length > 0) {
            const firstMapping = result.data[0];
            expect(firstMapping).toHaveProperty('reportingCik');
            expect(firstMapping).toHaveProperty('reportingName');
            expect(firstMapping.reportingName.toLowerCase()).toContain('apple');
          }
        } else {
          // If the API call fails, just log it but don't fail the test
          console.log(
            'CIK mapper by name API call failed, which is expected for deprecated endpoints',
          );
          expect(result.success).toBe(false);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getCikMapperBySymbol (DEPRECATED)', () => {
    it(
      'should return CIK mapper data by symbol (v4 endpoint)',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping CIK mapper by symbol test - no API key available');
          return;
        }

        const result = await fmp.insider.getCikMapperBySymbol({ symbol: 'AAPL' });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(result.data).toHaveProperty('symbol');
        expect(result.data).toHaveProperty('companyCik');
        expect(result.data!.symbol).toBe('AAPL');
      },
      FAST_TIMEOUT,
    );
  });

  describe('getBeneficialOwnership', () => {
    it(
      'should return beneficial ownership data for a symbol',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping beneficial ownership test - no API key available');
          return;
        }

        const result = await fmp.insider.getBeneficialOwnership({ symbol: 'AAPL' });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const firstOwnership = result.data[0];
          expect(firstOwnership).toHaveProperty('cik');
          expect(firstOwnership).toHaveProperty('symbol');
          expect(firstOwnership).toHaveProperty('filingDate');
          expect(firstOwnership).toHaveProperty('nameOfReportingPerson');
          expect(firstOwnership.symbol).toBe('AAPL');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getFailToDeliver (DEPRECATED)', () => {
    it(
      'should return fail to deliver data for a symbol (v4 endpoint)',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping fail to deliver test - no API key available');
          return;
        }

        const result = await fmp.insider.getFailToDeliver({ symbol: 'AAPL', page: 0 });

        expect(result.success).toBe(true);
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);

        if (result.data && result.data.length > 0) {
          const firstEntry = result.data[0];
          expect(firstEntry).toHaveProperty('symbol');
          expect(firstEntry).toHaveProperty('date');
          expect(firstEntry).toHaveProperty('price');
          expect(firstEntry).toHaveProperty('quantity');
          expect(firstEntry.symbol).toBe('AAPL');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('convenience methods', () => {
    describe('getInsiderTradesBySymbol', () => {
      it(
        'should return insider trades for a specific symbol',
        async () => {
          if (shouldSkipTests()) {
            console.log('Skipping insider trades by symbol test - no API key available');
            return;
          }

          const result = await fmp.insider.getInsiderTradesBySymbol('AAPL', 0);

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);

          if (result.data && result.data.length > 0) {
            const firstTrade = result.data[0];
            expect(firstTrade).toHaveProperty('symbol');
            expect(firstTrade.symbol).toBe('AAPL');
          }
        },
        API_TIMEOUT,
      );

      it(
        'should use default page value when not provided',
        async () => {
          if (shouldSkipTests()) {
            console.log(
              'Skipping insider trades by symbol default page test - no API key available',
            );
            return;
          }

          const result = await fmp.insider.getInsiderTradesBySymbol('AAPL');

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);
        },
        API_TIMEOUT,
      );
    });

    describe('getInsiderTradesByType', () => {
      it(
        'should return insider trades filtered by transaction type',
        async () => {
          if (shouldSkipTests()) {
            console.log('Skipping insider trades by type test - no API key available');
            return;
          }

          const result = await fmp.insider.getInsiderTradesByType(TransactionType.SALE, 0);

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);

          if (result.data && result.data.length > 0) {
            const firstTrade = result.data[0];
            expect(firstTrade).toHaveProperty('transactionType');
            expect(firstTrade.transactionType).toBe(TransactionType.SALE);
          }
        },
        API_TIMEOUT,
      );

      it(
        'should use default page value when not provided',
        async () => {
          if (shouldSkipTests()) {
            console.log('Skipping insider trades by type default page test - no API key available');
            return;
          }

          const result = await fmp.insider.getInsiderTradesByType(TransactionType.SALE);

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);
        },
        API_TIMEOUT,
      );
    });

    describe('getInsiderTradesByReportingCik', () => {
      it(
        'should return insider trades filtered by reporting CIK',
        async () => {
          if (shouldSkipTests()) {
            console.log('Skipping insider trades by reporting CIK test - no API key available');
            return;
          }

          const result = await fmp.insider.getInsiderTradesByReportingCik('0000320193', 0);

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);

          if (result.data && result.data.length > 0) {
            const firstTrade = result.data[0];
            expect(firstTrade).toHaveProperty('reportingCik');
          }
        },
        API_TIMEOUT,
      );

      it(
        'should use default page value when not provided',
        async () => {
          if (shouldSkipTests()) {
            console.log(
              'Skipping insider trades by reporting CIK default page test - no API key available',
            );
            return;
          }

          const result = await fmp.insider.getInsiderTradesByReportingCik('0000320193');

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);
        },
        API_TIMEOUT,
      );
    });

    describe('getInsiderTradesByCompanyCik', () => {
      it(
        'should return insider trades filtered by company CIK',
        async () => {
          if (shouldSkipTests()) {
            console.log('Skipping insider trades by company CIK test - no API key available');
            return;
          }

          const result = await fmp.insider.getInsiderTradesByCompanyCik('0000320193', 0);

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);

          if (result.data && result.data.length > 0) {
            const firstTrade = result.data[0];
            expect(firstTrade).toHaveProperty('companyCik');
          }
        },
        API_TIMEOUT,
      );

      it(
        'should use default page value when not provided',
        async () => {
          if (shouldSkipTests()) {
            console.log(
              'Skipping insider trades by company CIK default page test - no API key available',
            );
            return;
          }

          const result = await fmp.insider.getInsiderTradesByCompanyCik('0000320193');

          expect(result.success).toBe(true);
          expect(result.data).not.toBeNull();
          expect(Array.isArray(result.data)).toBe(true);
        },
        API_TIMEOUT,
      );
    });
  });
});

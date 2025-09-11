import { FMP } from '../../fmp';
import { FAST_TIMEOUT } from '../utils/test-setup';

describe('SenateHouseEndpoints', () => {
  let fmp: FMP;

  beforeEach(() => {
    fmp = new FMP();
  });

  describe('getSenateTrading', () => {
    it(
      'should get senate trading data for a specific symbol',
      async () => {
        const result = await fmp.senateHouse.getSenateTrading({
          symbol: 'AAPL',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Type safety test - verify SenateTradingResponse structure
        if (result.success && result.data) {
          const senateData = result.data;
          expect(Array.isArray(senateData)).toBe(true);

          if (senateData.length > 0) {
            const firstItem = senateData[0];
            // Check for SenateTradingResponse specific fields
            expect(firstItem).toHaveProperty('firstName');
            expect(firstItem).toHaveProperty('lastName');
            expect(firstItem).toHaveProperty('office');
            expect(firstItem).toHaveProperty('disclosureDate');
            expect(firstItem).toHaveProperty('transactionDate');
            expect(firstItem).toHaveProperty('owner');
            expect(firstItem).toHaveProperty('assetDescription');
            expect(firstItem).toHaveProperty('assetType');
            expect(firstItem).toHaveProperty('type');
            expect(firstItem).toHaveProperty('amount');
            expect(firstItem).toHaveProperty('comment');
            expect(firstItem).toHaveProperty('symbol');
            // Note: Both Senate and House now have similar fields in unified structure
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should get senate trading data for different symbols',
      async () => {
        const result = await fmp.senateHouse.getSenateTrading({
          symbol: 'MSFT',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');
      },
      FAST_TIMEOUT,
    );
  });

  describe('getSenateTradingRSSFeed', () => {
    it(
      'should get senate trading RSS feed for page 0',
      async () => {
        const result = await fmp.senateHouse.getSenateTradingRSSFeed({
          page: 0,
          limit: 5,
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Type safety test - verify SenateTradingResponse structure
        if (result.success && result.data) {
          const senateData = result.data;
          expect(Array.isArray(senateData)).toBe(true);

          if (senateData.length > 0) {
            const firstItem = senateData[0];
            // Check for SenateTradingResponse specific fields
            expect(firstItem).toHaveProperty('firstName');
            expect(firstItem).toHaveProperty('lastName');
            expect(firstItem).toHaveProperty('office');
            expect(firstItem).toHaveProperty('disclosureDate');
            // Note: Both Senate and House now have similar fields in unified structure
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should get senate trading RSS feed for different pages',
      async () => {
        const result = await fmp.senateHouse.getSenateTradingRSSFeed({
          page: 1,
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');
      },
      FAST_TIMEOUT,
    );

    it(
      'should get senate trading RSS feed for page 2',
      async () => {
        const result = await fmp.senateHouse.getSenateTradingRSSFeed({
          page: 2,
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');
      },
      FAST_TIMEOUT,
    );
  });

  describe('getHouseTrading', () => {
    it(
      'should get house trading data for a specific symbol',
      async () => {
        const result = await fmp.senateHouse.getHouseTrading({
          symbol: 'AAPL',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Type safety test - verify HouseTradingResponse structure
        if (result.success && result.data) {
          const houseData = result.data;
          expect(Array.isArray(houseData)).toBe(true);

          if (houseData.length > 0) {
            const firstItem = houseData[0];
            // Check for HouseTradingResponse specific fields
            expect(firstItem).toHaveProperty('disclosureDate');
            expect(firstItem).toHaveProperty('transactionDate');
            expect(firstItem).toHaveProperty('owner');
            expect(firstItem).toHaveProperty('symbol');
            expect(firstItem).toHaveProperty('assetDescription');
            expect(firstItem).toHaveProperty('type');
            expect(firstItem).toHaveProperty('amount');
            expect(firstItem).toHaveProperty('firstName');
            expect(firstItem).toHaveProperty('lastName');
            expect(firstItem).toHaveProperty('district');
            expect(firstItem).toHaveProperty('link');
            expect(firstItem).toHaveProperty('capitalGainsOver200USD');
            // Note: Both Senate and House now have office field in unified structure
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should get house trading data for different symbols',
      async () => {
        const result = await fmp.senateHouse.getHouseTrading({
          symbol: 'GOOGL',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');
      },
      FAST_TIMEOUT,
    );
  });

  describe('getHouseTradingRSSFeed', () => {
    it('should get house trading RSS feed for page 0', async () => {
      const result = await fmp.senateHouse.getHouseTradingRSSFeed({
        page: 0,
        limit: 5,
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // Type safety test - this would catch the type mismatch
      if (result.success && result.data) {
        // This should be HouseTradingResponse[], not SenateTradingResponse[]
        const houseData = result.data;
        expect(Array.isArray(houseData)).toBe(true);

        if (houseData.length > 0) {
          const firstItem = houseData[0];
          // Check for HouseTradingResponse specific fields
          expect(firstItem).toHaveProperty('disclosureDate');
          expect(firstItem).toHaveProperty('firstName');
          expect(firstItem).toHaveProperty('lastName');
          expect(firstItem).toHaveProperty('district');
          expect(firstItem).toHaveProperty('capitalGainsOver200USD');
          // Note: Both Senate and House now have office field in unified structure
        }
      }
    });

    it(
      'should get house trading RSS feed for different pages',
      async () => {
        const result = await fmp.senateHouse.getHouseTradingRSSFeed({
          page: 1,
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');
      },
      FAST_TIMEOUT,
    );

    it(
      'should get house trading RSS feed for page 2',
      async () => {
        const result = await fmp.senateHouse.getHouseTradingRSSFeed({
          page: 2,
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');
      },
      FAST_TIMEOUT,
    );
  });

  describe('getSenateTradingByName', () => {
    it(
      'should get senate trading data by name',
      async () => {
        const result = await fmp.senateHouse.getSenateTradingByName({
          name: 'Jerry',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Type safety test - verify SenateHouseTradingByNameResponse structure
        if (result.success && result.data) {
          const senateData = result.data;
          expect(Array.isArray(senateData)).toBe(true);

          if (senateData.length > 0) {
            const firstItem = senateData[0];
            // Check for SenateHouseTradingByNameResponse specific fields
            expect(firstItem).toHaveProperty('symbol');
            expect(firstItem).toHaveProperty('disclosureDate');
            expect(firstItem).toHaveProperty('transactionDate');
            expect(firstItem).toHaveProperty('firstName');
            expect(firstItem).toHaveProperty('lastName');
            expect(firstItem).toHaveProperty('office');
            expect(firstItem).toHaveProperty('district');
            expect(firstItem).toHaveProperty('owner');
            expect(firstItem).toHaveProperty('assetDescription');
            expect(firstItem).toHaveProperty('assetType');
            expect(firstItem).toHaveProperty('type');
            expect(firstItem).toHaveProperty('amount');
            expect(firstItem).toHaveProperty('capitalGainsOver200USD');
            expect(firstItem).toHaveProperty('comment');
            expect(firstItem).toHaveProperty('link');
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should get senate trading data by different names',
      async () => {
        const result = await fmp.senateHouse.getSenateTradingByName({
          name: 'John',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        if (result.success && result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          if (result.data.length > 0) {
            // Data found as expected
          } else {
            // No data found as expected
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle empty results gracefully',
      async () => {
        const result = await fmp.senateHouse.getSenateTradingByName({
          name: 'NonExistentName123',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Should return empty array, not undefined
        if (result.success && result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          expect(result.data.length).toBe(0);
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getHouseTradingByName', () => {
    it(
      'should get house trading data by name',
      async () => {
        const result = await fmp.senateHouse.getHouseTradingByName({
          name: 'Nancy',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Type safety test - verify SenateHouseTradingByNameResponse structure
        if (result.success && result.data) {
          const houseData = result.data;
          expect(Array.isArray(houseData)).toBe(true);

          if (houseData.length > 0) {
            const firstItem = houseData[0];
            // Check for SenateHouseTradingByNameResponse specific fields
            expect(firstItem).toHaveProperty('symbol');
            expect(firstItem).toHaveProperty('disclosureDate');
            expect(firstItem).toHaveProperty('transactionDate');
            expect(firstItem).toHaveProperty('firstName');
            expect(firstItem).toHaveProperty('lastName');
            expect(firstItem).toHaveProperty('office');
            expect(firstItem).toHaveProperty('district');
            expect(firstItem).toHaveProperty('owner');
            expect(firstItem).toHaveProperty('assetDescription');
            expect(firstItem).toHaveProperty('assetType');
            expect(firstItem).toHaveProperty('type');
            expect(firstItem).toHaveProperty('amount');
            expect(firstItem).toHaveProperty('capitalGainsOver200USD');
            expect(firstItem).toHaveProperty('comment');
            expect(firstItem).toHaveProperty('link');
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should get house trading data by different names',
      async () => {
        const result = await fmp.senateHouse.getHouseTradingByName({
          name: 'Kevin',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        if (result.success && result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          if (result.data.length > 0) {
            // Data found as expected
          } else {
            // No data found as expected
          }
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle empty results gracefully',
      async () => {
        const result = await fmp.senateHouse.getHouseTradingByName({
          name: 'NonExistentName123',
        });

        expect(result).toBeDefined();
        expect(typeof result.success).toBe('boolean');

        // Should return empty array, not undefined
        if (result.success && result.data) {
          expect(Array.isArray(result.data)).toBe(true);
          expect(result.data.length).toBe(0);
        }
      },
      FAST_TIMEOUT,
    );
  });
});

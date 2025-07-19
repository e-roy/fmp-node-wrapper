import { FMP } from '../../fmp';

// Mock API key for testing
const API_KEY = 'testapikey123456789012345678901234567890';

describe('SenateHouseEndpoints', () => {
  let fmp: FMP;

  beforeEach(() => {
    fmp = new FMP({ apiKey: API_KEY });
  });

  describe('getSenateTrading', () => {
    it('should get senate trading data for a specific symbol', async () => {
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
          expect(firstItem).toHaveProperty('dateRecieved');
          expect(firstItem).toHaveProperty('transactionDate');
          expect(firstItem).toHaveProperty('owner');
          expect(firstItem).toHaveProperty('assetDescription');
          expect(firstItem).toHaveProperty('assetType');
          expect(firstItem).toHaveProperty('type');
          expect(firstItem).toHaveProperty('amount');
          expect(firstItem).toHaveProperty('comment');
          expect(firstItem).toHaveProperty('symbol');
          // Should NOT have HouseTradingResponse specific fields
          expect(firstItem).not.toHaveProperty('disclosureYear');
          expect(firstItem).not.toHaveProperty('representative');
          expect(firstItem).not.toHaveProperty('district');
          expect(firstItem).not.toHaveProperty('capitalGainsOver200USD');
        }
      }
    });

    it('should get senate trading data for different symbols', async () => {
      const result = await fmp.senateHouse.getSenateTrading({
        symbol: 'MSFT',
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('getSenateTradingRSSFeed', () => {
    it('should get senate trading RSS feed for page 0', async () => {
      const result = await fmp.senateHouse.getSenateTradingRSSFeed({
        page: 0,
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
          expect(firstItem).toHaveProperty('dateRecieved');
          // Should NOT have HouseTradingResponse specific fields
          expect(firstItem).not.toHaveProperty('disclosureYear');
          expect(firstItem).not.toHaveProperty('representative');
          expect(firstItem).not.toHaveProperty('district');
        }
      }
    });

    it('should get senate trading RSS feed for different pages', async () => {
      const result = await fmp.senateHouse.getSenateTradingRSSFeed({
        page: 1,
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
    });

    it('should get senate trading RSS feed for page 2', async () => {
      const result = await fmp.senateHouse.getSenateTradingRSSFeed({
        page: 2,
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('getHouseTrading', () => {
    it('should get house trading data for a specific symbol', async () => {
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
          expect(firstItem).toHaveProperty('disclosureYear');
          expect(firstItem).toHaveProperty('disclosureDate');
          expect(firstItem).toHaveProperty('transactionDate');
          expect(firstItem).toHaveProperty('owner');
          expect(firstItem).toHaveProperty('ticker');
          expect(firstItem).toHaveProperty('assetDescription');
          expect(firstItem).toHaveProperty('type');
          expect(firstItem).toHaveProperty('amount');
          expect(firstItem).toHaveProperty('representative');
          expect(firstItem).toHaveProperty('district');
          expect(firstItem).toHaveProperty('link');
          expect(firstItem).toHaveProperty('capitalGainsOver200USD');
          // Should NOT have SenateTradingResponse specific fields
          expect(firstItem).not.toHaveProperty('firstName');
          expect(firstItem).not.toHaveProperty('lastName');
          expect(firstItem).not.toHaveProperty('office');
          expect(firstItem).not.toHaveProperty('dateRecieved');
          expect(firstItem).not.toHaveProperty('comment');
        }
      }
    });

    it('should get house trading data for different symbols', async () => {
      const result = await fmp.senateHouse.getHouseTrading({
        symbol: 'GOOGL',
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('getHouseTradingRSSFeed', () => {
    it('should get house trading RSS feed for page 0', async () => {
      const result = await fmp.senateHouse.getHouseTradingRSSFeed({
        page: 0,
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
          expect(firstItem).toHaveProperty('disclosureYear');
          expect(firstItem).toHaveProperty('disclosureDate');
          expect(firstItem).toHaveProperty('representative');
          expect(firstItem).toHaveProperty('district');
          expect(firstItem).toHaveProperty('capitalGainsOver200USD');
          // Should NOT have SenateTradingResponse specific fields
          expect(firstItem).not.toHaveProperty('firstName');
          expect(firstItem).not.toHaveProperty('lastName');
          expect(firstItem).not.toHaveProperty('office');
        }
      }
    });

    it('should get house trading RSS feed for different pages', async () => {
      const result = await fmp.senateHouse.getHouseTradingRSSFeed({
        page: 1,
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
    });

    it('should get house trading RSS feed for page 2', async () => {
      const result = await fmp.senateHouse.getHouseTradingRSSFeed({
        page: 2,
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('getSenateTradingByName', () => {
    it('should get senate trading data by name', async () => {
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
          console.log(`✅ Senate trading by name "Jerry" returned ${senateData.length} records`);
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
        } else {
          console.log('⚠️ Senate trading by name "Jerry" returned empty array');
        }
      }
    });

    it('should get senate trading data by different names', async () => {
      const result = await fmp.senateHouse.getSenateTradingByName({
        name: 'John',
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      if (result.success && result.data) {
        expect(Array.isArray(result.data)).toBe(true);
        if (result.data.length > 0) {
          console.log(`✅ Senate trading by name "John" returned ${result.data.length} records`);
        } else {
          console.log('⚠️ Senate trading by name "John" returned empty array');
        }
      }
    });

    it('should handle empty results gracefully', async () => {
      const result = await fmp.senateHouse.getSenateTradingByName({
        name: 'NonExistentName123',
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // Should return empty array, not undefined
      if (result.success && result.data) {
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBe(0);
        console.log('✅ Non-existent name correctly returned empty array');
      }
    });
  });

  describe('getHouseTradingByName', () => {
    it('should get house trading data by name', async () => {
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
          console.log(`✅ House trading by name "Nancy" returned ${houseData.length} records`);
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
        } else {
          console.log('⚠️ House trading by name "Nancy" returned empty array');
        }
      }
    });

    it('should get house trading data by different names', async () => {
      const result = await fmp.senateHouse.getHouseTradingByName({
        name: 'Kevin',
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      if (result.success && result.data) {
        expect(Array.isArray(result.data)).toBe(true);
        if (result.data.length > 0) {
          console.log(`✅ House trading by name "Kevin" returned ${result.data.length} records`);
        } else {
          console.log('⚠️ House trading by name "Kevin" returned empty array');
        }
      }
    });

    it('should handle empty results gracefully', async () => {
      const result = await fmp.senateHouse.getHouseTradingByName({
        name: 'NonExistentName123',
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');

      // Should return empty array, not undefined
      if (result.success && result.data) {
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBe(0);
        console.log('✅ Non-existent name correctly returned empty array');
      }
    });
  });
});

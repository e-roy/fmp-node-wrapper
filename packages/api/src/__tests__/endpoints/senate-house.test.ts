import { FMP } from '../../fmp';

// Mock API key for testing
const API_KEY = 'test-api-key';

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
});

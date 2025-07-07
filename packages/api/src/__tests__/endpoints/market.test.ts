import { FMP } from '../../fmp';
import { API_KEY, isCI } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Market Endpoints', () => {
  if (!API_KEY || isCI) {
    it('should skip tests when no API key is provided or running in CI', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let fmp: FMP;

  beforeAll(() => {
    if (!API_KEY) {
      throw new Error('FMP_API_KEY is required for testing');
    }
    fmp = new FMP({ apiKey: API_KEY });
  });

  describe('getMarketHours', () => {
    it('should fetch market hours', async () => {
      const result = await fmp.market.getMarketHours();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.isTheStockMarketOpen).toBeDefined();
      expect(result.data?.isTheForexMarketOpen).toBeDefined();
      expect(result.data?.isTheCryptoMarketOpen).toBeDefined();
      expect(result.data?.stockExchangeName).toBeDefined();
    }, 10000);
  });

  describe('getMarketPerformance', () => {
    it('should fetch market performance', async () => {
      const result = await fmp.market.getMarketPerformance();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const performance = getFirstItem(result.data);
        expect(performance.symbol).toBeDefined();
        expect(performance.name).toBeDefined();
        expect(Number(performance.price)).toBeGreaterThan(0);
        expect(typeof performance.change).toBe('number');
        expect(typeof performance.changesPercentage).toBe('number');
      }
    }, 10000);
  });

  describe('getGainers', () => {
    it('should fetch market gainers', async () => {
      const result = await fmp.market.getGainers();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const gainer = getFirstItem(result.data);
        expect(gainer.symbol).toBeDefined();
        expect(gainer.name).toBeDefined();
        expect(Number(gainer.price)).toBeGreaterThan(0);
        expect(Number(gainer.changesPercentage)).toBeGreaterThan(0);
        expect(typeof gainer.change).toBe('number');
      }
    }, 10000);
  });

  describe('getLosers', () => {
    it('should fetch market losers', async () => {
      const result = await fmp.market.getLosers();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const loser = getFirstItem(result.data);
        expect(loser.symbol).toBeDefined();
        expect(loser.name).toBeDefined();
        expect(Number(loser.price)).toBeGreaterThan(0);
        expect(Number(loser.changesPercentage)).toBeLessThan(0);
        expect(typeof loser.change).toBe('number');
      }
    }, 10000);
  });

  describe('getMostActive', () => {
    it('should fetch most active stocks', async () => {
      const result = await fmp.market.getMostActive();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const active = getFirstItem(result.data);
        expect(active.symbol).toBeDefined();
        expect(active.name).toBeDefined();
        expect(Number(active.price)).toBeGreaterThan(0);
        expect(typeof active.change).toBe('number');
        expect(typeof active.changesPercentage).toBe('number');
      }
    }, 10000);
  });

  describe('getSectorPerformance', () => {
    it('should fetch sector performance', async () => {
      const result = await fmp.market.getSectorPerformance();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const sector = getFirstItem(result.data);
        expect(sector.sector).toBeDefined();
        expect(sector.changesPercentage).toBeDefined();
        // changesPercentage can be a string or number from the API
        expect(['string', 'number']).toContain(typeof sector.changesPercentage);
      }
    }, 10000);
  });

  describe('getMarketIndex', () => {
    it('should fetch market index data', async () => {
      const result = await fmp.market.getMarketIndex();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const index = getFirstItem(result.data);
        expect(index.symbol).toBeDefined();
        expect(index.name).toBeDefined();
        expect(Number(index.price)).toBeGreaterThan(0);
        // Check for optional properties that may or may not be present
        if (index.type !== undefined) {
          expect(typeof index.type).toBe('string');
        }
        if (index.volume !== undefined) {
          expect(typeof index.volume).toBe('number');
        }
      }
    }, 15000);
  });
});

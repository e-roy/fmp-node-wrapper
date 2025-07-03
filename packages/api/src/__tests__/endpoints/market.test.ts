import { FMP } from '../../fmp';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../../../.env') });

const API_KEY = process.env.FMP_API_KEY;
const isCI = process.env.CI === 'true';

describe('Market Endpoints', () => {
  if (!API_KEY || isCI) {
    it('should skip tests when no API key is provided or running in CI', () => {
      expect(true).toBe(true);
    });
    return;
  }

  let fmp: FMP;

  beforeAll(() => {
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

      if (result.data && result.data.length > 0) {
        const performance = result.data[0];
        expect(performance.ticker).toBeDefined();
        expect(performance.companyName).toBeDefined();
        expect(Number(performance.price)).toBeGreaterThan(0);
      }
    }, 10000);
  });

  describe('getGainers', () => {
    it('should fetch market gainers', async () => {
      const result = await fmp.market.getGainers();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const gainer = result.data[0];
        expect(gainer.ticker).toBeDefined();
        expect(gainer.companyName).toBeDefined();
        expect(Number(gainer.price)).toBeGreaterThan(0);
        expect(Number(gainer.changesPercentage)).toBeGreaterThan(0);
      }
    }, 10000);
  });

  describe('getLosers', () => {
    it('should fetch market losers', async () => {
      const result = await fmp.market.getLosers();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const loser = result.data[0];
        expect(loser.ticker).toBeDefined();
        expect(loser.companyName).toBeDefined();
        expect(Number(loser.price)).toBeGreaterThan(0);
        expect(Number(loser.changesPercentage)).toBeLessThan(0);
      }
    }, 10000);
  });

  describe('getMostActive', () => {
    it('should fetch most active stocks', async () => {
      const result = await fmp.market.getMostActive();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const active = result.data[0];
        expect(active.ticker).toBeDefined();
        expect(active.companyName).toBeDefined();
        expect(Number(active.price)).toBeGreaterThan(0);
        expect(Number(active.volume)).toBeGreaterThan(0);
      }
    }, 10000);
  });

  describe('getSectorPerformance', () => {
    it('should fetch sector performance', async () => {
      const result = await fmp.market.getSectorPerformance();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const sector = result.data[0];
        expect(sector.sector).toBeDefined();
        expect(sector.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getMarketIndex', () => {
    it('should fetch market index data', async () => {
      const result = await fmp.market.getMarketIndex({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    }, 15000);
  });
});

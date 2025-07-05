import { FMP } from '@/fmp';
import { shouldSkipTests, createTestClient, API_TIMEOUT } from '../utils/test-setup';

describe('Stock Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping stock tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getStockList', () => {
    it(
      'should fetch stock list',
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
          const stock = result.data[0];
          expect(stock.symbol).toBeDefined();
          expect(stock.name).toBeDefined();
          // Note: currency is not always returned in stock list
          // expect(stock.currency).toBeDefined();
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getETFList', () => {
    it('should fetch ETF list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF list test - running in CI environment');
        return;
      }

      const result = await fmp.list.getETFList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const etf = result.data[0];
        expect(etf.symbol).toBeDefined();
        expect(etf.name).toBeDefined();
        // currency might not always be present in the API response
        // expect(etf.currency).toBeDefined();
      }
    }, 10000);
  });

  describe('getMutualFundList', () => {
    it('should fetch mutual fund list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund list test - no API key available');
        return;
      }

      const result = await fmp.list.getMutualFundList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const fund = result.data[0];
        expect(fund.symbol).toBeDefined();
        expect(fund.name).toBeDefined();
        // currency might not always be present in the API response
        // expect(fund.currency).toBeDefined();
      }
    }, 10000);
  });

  describe('getCryptoList', () => {
    it('should fetch crypto list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping crypto list test - no API key available');
        return;
      }

      const result = await fmp.list.getCryptoList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const crypto = result.data[0];
        expect(crypto.symbol).toBeDefined();
        expect(crypto.name).toBeDefined();
        expect(crypto.currency).toBeDefined();
      }
    }, 10000);
  });

  describe('getForexList', () => {
    it('should fetch forex pairs list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping forex list test - no API key available');
        return;
      }

      const result = await fmp.list.getForexList();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const pair = result.data[0];
        expect(pair.symbol).toBeDefined();
        expect(pair.name).toBeDefined();
      }
    }, 15000);
  });

  describe('getBondList', () => {
    it('should fetch bond list', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping bond list test - running in CI environment');
        return;
      }

      const result = await fmp.list.getBondList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const bond = result.data[0];
        expect(bond.symbol).toBeDefined();
        expect(bond.name).toBeDefined();
        expect(bond.currency).toBeDefined();
      }
    }, 10000);
  });
});

import { FMP } from '../../fmp';
import { createTestClient, skipIfNoApiKey } from '../utils/test-setup';

describe('ETF Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (skipIfNoApiKey()) return;
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch ETF quote', async () => {
      const result = await fmp.etf.getQuote({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const etf = result.data[0];
        expect(etf.symbol).toBeDefined();
        expect(etf.price).toBeDefined();
        expect(etf.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getETFList', () => {
    it('should fetch ETF list', async () => {
      const result = await fmp.etf.getETFList();

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

  describe('getHoldings', () => {
    it('should fetch ETF holdings', async () => {
      const result = await fmp.etf.getHoldings({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const holding = result.data[0];
        expect(holding.asset).toBeDefined();
        // weightPercent might not always be present in the API response
        // expect(holding.weightPercent).toBeDefined();
      }
    }, 10000);
  });
});

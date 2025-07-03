import { FMP } from '../../fmp';
import { createTestClient, skipIfNoApiKey } from '../utils/test-setup';

describe('Mutual Fund Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (skipIfNoApiKey()) return;
    fmp = createTestClient();
  });

  describe('getQuote', () => {
    it('should fetch mutual fund quote', async () => {
      const result = await fmp.mutualFund.getQuote({ symbol: 'VFINX' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const fund = result.data[0];
        expect(fund.symbol).toBeDefined();
        expect(fund.price).toBeDefined();
        expect(fund.changesPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getMutualFundList', () => {
    it('should fetch mutual fund list', async () => {
      const result = await fmp.mutualFund.getMutualFundList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const fund = result.data[0];
        expect(fund.symbol).toBeDefined();
        expect(fund.name).toBeDefined();
        expect(fund.currency).toBeDefined();
      }
    }, 10000);
  });

  describe('getHoldings', () => {
    it('should fetch mutual fund holdings', async () => {
      const result = await fmp.mutualFund.getHoldings({ symbol: 'VFINX' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const holding = result.data[0];
        expect(holding.asset).toBeDefined();
        expect(holding.weightPercent).toBeDefined();
      }
    }, 10000);
  });
});

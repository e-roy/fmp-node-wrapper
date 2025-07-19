import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('Mutual Fund Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping mutual fund tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getHolders', () => {
    it('should fetch mutual fund holders', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping mutual fund holders test - no API key available');
        return;
      }

      const result = await fmp.mutualFund.getHolders('VFINX');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const holding = result.data[0];
        expect(holding.holder).toBeDefined();
        expect(holding.shares).toBeDefined();
        expect(holding.dateReported).toBeDefined();
        expect(holding.change).toBeDefined();
        expect(holding.weightPercent).toBeDefined();
      } else {
        // Accept empty result as valid for this test
        expect(Array.isArray(result.data)).toBe(true);
      }
    }, 10000);
  });
});

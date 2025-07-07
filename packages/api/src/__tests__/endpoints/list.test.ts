import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('Stock Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping list tests - no API key available');
      return;
    }
    fmp = createTestClient();
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
      if (result.data && Array.isArray(result.data)) {
        expect(Array.isArray(result.data)).toBe(true);
        if (result.data.length > 0) {
          const pair = result.data[0];
          expect(pair.symbol).toBeDefined();
        }
      } else if (result.data) {
        // Single object case
        expect(typeof result.data).toBe('object');
        if ((result.data as any).symbol !== undefined) {
          expect((result.data as any).symbol).toBeDefined();
        }
      }
    }, 10000);
  });
});

import { FMP } from '../../fmp';
import { API_KEY, isCI } from '../utils/test-setup';

// Helper function to safely access data that could be an array or single object
function getFirstItem<T>(data: T | T[]): T {
  return Array.isArray(data) ? data[0] : data;
}

describe('Economic Endpoints', () => {
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

  describe('getTreasuryRates', () => {
    it('should fetch treasury rates', async () => {
      const result = await fmp.economic.getTreasuryRates({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const rate = getFirstItem(result.data);
        expect(rate.date).toBeDefined();
        expect(rate.month1).toBeDefined();
        expect(rate.year1).toBeDefined();
        expect(rate.year10).toBeDefined();
      }
    }, 15000);
  });

  describe('getFederalFundsRate', () => {
    it('should fetch federal funds rate', async () => {
      const result = await fmp.economic.getFederalFundsRate({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const rate = getFirstItem(result.data);
        expect(rate.date).toBeDefined();
        expect(rate.value).toBeDefined();
      }
    }, 15000);
  });

  describe('getCPI', () => {
    it('should fetch CPI data', async () => {
      const result = await fmp.economic.getCPI({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const cpi = getFirstItem(result.data);
        expect(cpi.date).toBeDefined();
        expect(cpi.value).toBeDefined();
      }
    }, 15000);
  });

  describe('getGDP', () => {
    it('should fetch GDP data', async () => {
      const result = await fmp.economic.getGDP({
        from: '2020-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const gdp = getFirstItem(result.data);
        expect(gdp.date).toBeDefined();
        expect(gdp.value).toBeDefined();
      }
    }, 15000);
  });

  describe('getUnemployment', () => {
    it('should fetch unemployment data', async () => {
      const result = await fmp.economic.getUnemployment({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const unemployment = getFirstItem(result.data);
        expect(unemployment.date).toBeDefined();
        expect(unemployment.value).toBeDefined();
      }
    }, 15000);
  });
});

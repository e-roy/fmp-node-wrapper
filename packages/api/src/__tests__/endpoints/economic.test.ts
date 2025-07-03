import { FMP } from '../../fmp';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../../../.env') });

const API_KEY = process.env.FMP_API_KEY;
const isCI = process.env.CI === 'true';

describe('Economic Endpoints', () => {
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

  describe('getTreasuryRates', () => {
    it('should fetch treasury rates', async () => {
      const result = await fmp.economic.getTreasuryRates({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const rate = result.data[0];
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

      if (result.data && result.data.length > 0) {
        const rate = result.data[0];
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

      if (result.data && result.data.length > 0) {
        const cpi = result.data[0];
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

      if (result.data && result.data.length > 0) {
        const gdp = result.data[0];
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

      if (result.data && result.data.length > 0) {
        const unemployment = result.data[0];
        expect(unemployment.date).toBeDefined();
        expect(unemployment.value).toBeDefined();
      }
    }, 15000);
  });
});

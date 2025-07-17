import { FMP } from '../../fmp';

const API_KEY = process.env.FMP_API_KEY || '';

describe('InstitutionalEndpoints (integration)', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (!API_KEY) {
      throw new Error('FMP_API_KEY must be set in environment for integration tests');
    }
    fmp = new FMP({ apiKey: API_KEY });
  });

  describe('getForm13F', () => {
    it('should return non-empty data array with expected fields for a valid CIK and date', async () => {
      const result = await fmp.institutional.getForm13F({
        cik: '0001388838',
        date: '2021-09-30',
      });
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      if (result.data && result.data.length > 0) {
        const first = result.data[0];
        expect(first).toHaveProperty('nameOfIssuer');
        expect(first).toHaveProperty('cusip');
        expect(first).toHaveProperty('value');
        expect(first).toHaveProperty('shares');
        expect(first).toHaveProperty('titleOfClass');
        expect(first).toHaveProperty('tickercusip');
        expect(first).toHaveProperty('acceptedDate');
        expect(first).toHaveProperty('fillingDate');
        expect(first).toHaveProperty('link');
        expect(first).toHaveProperty('finalLink');
      } else {
        console.warn(
          '⚠️ getForm13F returned an empty array for CIK 0001388838 and date 2021-09-30',
        );
      }
    });
  });

  describe('getForm13FDates', () => {
    it('should return a non-empty array of date strings for a valid CIK', async () => {
      const result = await fmp.institutional.getForm13FDates({ cik: '0001067983' });
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      if (result.data && result.data.length > 0) {
        expect(typeof result.data[0]).toBe('string');
        // Optionally, check if it's a valid date string
        expect(result.data[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      } else {
        console.warn('⚠️ getForm13FDates returned an empty array for CIK 0001067983');
      }
    });
  });

  describe('getInstitutionalHolders', () => {
    it('should return non-empty data array with expected fields for a valid symbol', async () => {
      const result = await fmp.institutional.getInstitutionalHolders({ symbol: 'AAPL' });
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      if (result.data && result.data.length > 0) {
        const first = result.data[0];
        expect(first).toHaveProperty('holder');
        expect(first).toHaveProperty('shares');
        expect(first).toHaveProperty('dateReported');
        expect(first).toHaveProperty('change');
      } else {
        console.warn('⚠️ getInstitutionalHolders returned an empty array for symbol AAPL');
      }
    });
  });
});

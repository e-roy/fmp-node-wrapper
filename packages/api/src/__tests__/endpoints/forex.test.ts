import { FMP } from '../../fmp';
import { API_KEY, isCI } from '../utils/test-setup';

describe('Forex Endpoints', () => {
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

  describe('getQuote', () => {
    it('should fetch forex quote for EURUSD', async () => {
      const result = await fmp.forex.getQuote({ symbol: 'EURUSD' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data && result.data.length > 0) {
        const quote = result.data[0];
        expect(quote.symbol).toBe('EURUSD');
        expect(quote.price).toBeGreaterThan(0);
        expect(quote.volume).toBeGreaterThan(0);
      }
    }, 10000);
  });

  describe('getHistoricalPrice', () => {
    it('should fetch historical forex data for EURUSD', async () => {
      const result = await fmp.forex.getHistoricalPrice({
        symbol: 'EURUSD',
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    }, 15000);
  });
});

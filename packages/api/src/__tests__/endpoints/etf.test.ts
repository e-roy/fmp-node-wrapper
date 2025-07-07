import { FMP } from '../../fmp';
import { createTestClient, shouldSkipTests } from '../utils/test-setup';

describe('ETF Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping ETF tests - running in CI environment');
      return;
    }
    fmp = createTestClient();
  });

  describe('getProfile', () => {
    it('should fetch ETF profile', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF profile test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getProfile({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data) {
        // getProfile uses getSingle, so it returns a single object, not an array
        expect(result.data.symbol).toBeDefined();
        expect(result.data.name).toBeDefined();
        expect(result.data.expenseRatio).toBeDefined();
      }
    }, 10000);
  });

  describe('getHoldings', () => {
    it('should fetch ETF holdings', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF holdings test - running in CI environment');
        return;
      }

      // First get holding dates to get a valid date
      const datesResult = await fmp.etf.getHoldingDates({ symbol: 'SPY' });
      if (!datesResult.success || !datesResult.data || datesResult.data.length === 0) {
        console.log('No holding dates available for SPY, skipping holdings test');
        return;
      }

      const date = datesResult.data[0].date;
      const result = await fmp.etf.getHoldings({ symbol: 'SPY', date });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data && result.data.length > 0) {
        const holding = result.data[0];
        // ETFHolding has these properties
        expect(holding.symbol).toBeDefined();
        expect(holding.name).toBeDefined();
        expect(holding.cik).toBeDefined();
        expect(holding.balance).toBeDefined();
      }
    }, 10000);
  });

  describe('getHolder', () => {
    it('should fetch ETF holder', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF holder test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getHolder({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data && result.data.length > 0) {
        const holder = result.data[0];
        expect(holder.asset).toBeDefined();
        expect(holder.sharesNumber).toBeDefined();
        expect(holder.weightPercentage).toBeDefined();
      }
    }, 10000);
  });

  describe('getSectorWeighting', () => {
    it('should fetch ETF sector weighting', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF sector weighting test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getSectorWeighting({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const weighting = result.data[0];
        expect(weighting.sector).toBeDefined();
        expect(weighting.weightPercentage).toBeDefined();
      } else {
        // Accept empty, undefined, or null as valid for this test
        expect(Array.isArray(result.data) || result.data == null).toBe(true);
      }
    }, 10000);
  });

  describe('getCountryWeighting', () => {
    it('should fetch ETF country weighting', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF country weighting test - running in CI environment');
        return;
      }

      const result = await fmp.etf.getCountryWeighting({ symbol: 'SPY' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const weighting = result.data[0];
        expect(weighting.country).toBeDefined();
        expect(weighting.weightPercentage).toBeDefined();
      } else {
        // Accept empty, undefined, or null as valid for this test
        expect(Array.isArray(result.data) || result.data == null).toBe(true);
      }
    }, 10000);
  });

  describe('getStockExposure', () => {
    it('should fetch ETF stock exposure', async () => {
      if (shouldSkipTests()) {
        console.log('Skipping ETF stock exposure test - running in CI environment');
        return;
      }

      // getStockExposure takes a stock symbol to find which ETFs hold that stock
      const result = await fmp.etf.getStockExposure({ symbol: 'AAPL' });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      if (result.data && result.data.length > 0) {
        const exposure = result.data[0];
        expect(exposure.etfSymbol).toBeDefined();
        expect(exposure.assetExposure).toBeDefined();
        expect(exposure.sharesNumber).toBeDefined();
        expect(exposure.weightPercentage).toBeDefined();
      }
    }, 10000);
  });
});

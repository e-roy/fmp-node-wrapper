import { FMP } from '../../fmp';
import {
  shouldSkipTests,
  createTestClient,
  API_TIMEOUT,
  FAST_TIMEOUT,
  TEST_SYMBOLS,
} from '../utils/test-setup';

describe('Company Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping company tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getCompanyProfile', () => {
    it(
      'should fetch company profile for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping company profile test - no API key available');
          return;
        }
        const result = await fmp.company.getCompanyProfile({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(Object.keys(result.data || {}).length).toBeGreaterThan(0);

        if (result.data) {
          const profile = result.data;
          expect(profile.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(profile.companyName).toBeDefined();
          expect(profile.price).toBeGreaterThan(0);
          expect(profile.mktCap).toBeGreaterThan(0);
          expect(profile.industry).toBeDefined();
          expect(profile.sector).toBeDefined();
          expect(profile.country).toBeDefined();
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should handle invalid symbol gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping invalid symbol test - no API key available');
          return;
        }
        const result = await fmp.company.getCompanyProfile({
          symbol: 'INVALID_SYMBOL_12345',
        });

        expect(Object.keys(result.data || {}).length === 0 || result.success === false).toBe(true);
      },
      FAST_TIMEOUT,
    );
  });

  describe('getExecutiveCompensation', () => {
    it(
      'should fetch executive compensation for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping executive compensation test - no API key available');
          return;
        }
        const result = await fmp.company.getExecutiveCompensation({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          const compensation = result.data[0];
          expect(compensation.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(compensation.cik).toBeDefined();
          expect(compensation.companyName).toBeDefined();
          expect(compensation.nameAndPosition).toBeDefined();
          expect(compensation.year).toBeGreaterThan(0);
          expect(compensation.total).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getCompanyNotes', () => {
    it(
      'should fetch company notes for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping company notes test - no API key available');
          return;
        }
        const result = await fmp.company.getCompanyNotes({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          const note = result.data[0];
          expect(note.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(note.cik).toBeDefined();
          expect(note.title).toBeDefined();
          expect(note.exchange).toBeDefined();
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getHistoricalEmployeeCount', () => {
    it(
      'should fetch historical employee count for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping historical employee count test - no API key available');
          return;
        }
        const result = await fmp.company.getHistoricalEmployeeCount({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          const employeeData = result.data[0];
          expect(employeeData.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(employeeData.cik).toBeDefined();
          expect(employeeData.companyName).toBeDefined();
          expect(employeeData.employeeCount).toBeGreaterThan(0);
          expect(employeeData.filingDate).toBeDefined();
          expect(employeeData.formType).toBeDefined();
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getSharesFloat', () => {
    it(
      'should fetch shares float for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping shares float test - no API key available');
          return;
        }
        const result = await fmp.company.getSharesFloat({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data) {
          const sharesFloat = Array.isArray(result.data) ? result.data[0] : result.data;
          expect(sharesFloat.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(sharesFloat.freeFloat).toBeGreaterThan(0);
          expect(sharesFloat.floatShares).toBeGreaterThan(0);
          expect(sharesFloat.outstandingShares).toBeGreaterThan(0);
          expect(sharesFloat.source).toBeDefined();
          expect(sharesFloat.date).toBeDefined();
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getHistoricalSharesFloat', () => {
    it(
      'should fetch historical shares float for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping historical shares float test - no API key available');
          return;
        }
        const result = await fmp.company.getHistoricalSharesFloat({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          const sharesFloat = result.data[0];
          expect(sharesFloat.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(sharesFloat.freeFloat).toBeGreaterThan(0);
          expect(sharesFloat.floatShares).toBeDefined();
          expect(sharesFloat.floatShares.length).toBeGreaterThan(0);
          expect(sharesFloat.outstandingShares).toBeDefined();
          expect(sharesFloat.outstandingShares.length).toBeGreaterThan(0);
          expect(sharesFloat.source).toBeDefined();
          expect(sharesFloat.date).toBeDefined();
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getEarningsCallTranscript', () => {
    it(
      'should fetch earnings call transcript for AAPL',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping earnings call transcript test - no API key available');
          return;
        }
        const result = await fmp.company.getEarningsCallTranscript({
          symbol: TEST_SYMBOLS.STOCK,
          year: 2024,
          quarter: 1,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);
          const transcript = result.data[0];
          expect(transcript.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(transcript.quarter).toBe(1);
          expect(transcript.year).toBe(2024);
          expect(transcript.date).toBeDefined();
          expect(transcript.content).toBeDefined();
          expect(transcript.content.length).toBeGreaterThan(0);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should handle non-existent transcript gracefully',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping non-existent transcript test - no API key available');
          return;
        }
        const result = await fmp.company.getEarningsCallTranscript({
          symbol: TEST_SYMBOLS.STOCK,
          year: 1900,
          quarter: 1,
        });

        // Should either return empty array or handle gracefully
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
      },
      FAST_TIMEOUT,
    );
  });
});

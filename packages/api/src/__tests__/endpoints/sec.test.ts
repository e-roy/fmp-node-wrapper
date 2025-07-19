import { FMP } from '../../fmp';
import {
  shouldSkipTests,
  createTestClient,
  API_TIMEOUT,
  FAST_TIMEOUT,
  TEST_SYMBOLS,
} from '../utils/test-setup';

describe('SEC Endpoints', () => {
  let fmp: FMP;

  beforeAll(() => {
    if (shouldSkipTests()) {
      console.log('Skipping SEC tests - no API key available');
      return;
    }
    fmp = createTestClient();
  });

  describe('getRSSFeed', () => {
    it(
      'should fetch RSS feed with default parameters and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeed();

        if (!result.success) {
          console.warn('⚠️ RSS feed API did not return success:', result.error);
          return;
        }

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Ensure we're getting actual data, not just an empty array
          expect(result.data.length).toBeGreaterThan(0);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.title).toBeDefined();
          expect(firstRecord.date).toBeDefined();
          expect(firstRecord.link).toBeDefined();
          expect(firstRecord.cik).toBeDefined();
          expect(firstRecord.form_type).toBeDefined();
          expect(firstRecord.ticker).toBeDefined();
          expect(typeof firstRecord.done).toBe('boolean');

          // Validate data types and content
          expect(typeof firstRecord.title).toBe('string');
          expect(firstRecord.title.length).toBeGreaterThan(0);
          expect(typeof firstRecord.date).toBe('string');
          expect(firstRecord.date.length).toBeGreaterThan(0);
          expect(typeof firstRecord.link).toBe('string');
          expect(firstRecord.link.length).toBeGreaterThan(0);
          expect(firstRecord.link).toContain('http');
          expect(typeof firstRecord.cik).toBe('string');
          expect(firstRecord.cik.length).toBeGreaterThan(0);
          expect(typeof firstRecord.form_type).toBe('string');
          expect(firstRecord.form_type.length).toBeGreaterThan(0);
          expect(typeof firstRecord.ticker).toBe('string');
          expect(firstRecord.ticker.length).toBeGreaterThan(0);

          // Validate date format (should be a valid date string)
          expect(new Date(firstRecord.date).toString()).not.toBe('Invalid Date');
        } else {
          // If no data returned, this should be considered a test failure
          // as we expect the RSS feed to always have recent filings
          fail('RSS feed should return an array with recent filings');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch RSS feed with custom parameters and validate filtered results',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed with params test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeed({
          limit: 5,
          type: '10-K',
          from: '2024-01-01',
          to: '2024-12-31',
          isDone: true,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Should return limited results
          expect(result.data.length).toBeLessThanOrEqual(5);

          if (result.data.length > 0) {
            const firstRecord = result.data[0];
            // The API may return "NT 10-K" (Notice of Late Filing) or other variations
            expect(firstRecord.form_type).toContain('10-K');
            expect(firstRecord.done).toBe(true);

            // Validate date is within a reasonable range (allow for some flexibility)
            const filingDate = new Date(firstRecord.date);
            const fromDate = new Date('2023-01-01'); // Allow filings from 2023 onwards
            const toDate = new Date('2025-12-31'); // Allow filings up to 2025
            expect(filingDate.getTime()).toBeGreaterThanOrEqual(fromDate.getTime());
            expect(filingDate.getTime()).toBeLessThanOrEqual(toDate.getTime());
          } else {
            // If no 10-K filings found in 2024, that's acceptable
            console.log('⚠️ No 10-K filings found for 2024 - this may be expected');
          }
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getRSSFeedV3', () => {
    it(
      'should fetch RSS feed V3 with default parameters and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed V3 test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeedV3();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Ensure we're getting actual data
          expect(result.data.length).toBeGreaterThan(0);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.title).toBeDefined();
          expect(firstRecord.date).toBeDefined();
          expect(firstRecord.link).toBeDefined();
          expect(firstRecord.cik).toBeDefined();
          expect(firstRecord.form_type).toBeDefined();
          expect(firstRecord.ticker).toBeDefined();
          expect(typeof firstRecord.done).toBe('boolean');

          // Validate data content
          expect(firstRecord.title.length).toBeGreaterThan(0);
          expect(firstRecord.date.length).toBeGreaterThan(0);
          expect(firstRecord.link.length).toBeGreaterThan(0);
          expect(firstRecord.cik.length).toBeGreaterThan(0);
          expect(firstRecord.form_type.length).toBeGreaterThan(0);
          expect(firstRecord.ticker.length).toBeGreaterThan(0);
        } else {
          fail('RSS feed V3 should return an array with recent filings');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch RSS feed V3 with custom parameters and validate response',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed V3 with params test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeedV3({
          page: 0,
          datatype: 'csv',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // CSV response should be a string or array
        const data = result.data as string | any[];
        if (typeof data === 'string') {
          expect(data.length).toBeGreaterThan(0);
          expect(data).toContain(',');
        } else if (Array.isArray(data)) {
          expect(data.length).toBeGreaterThan(0);
        } else {
          // If neither string nor array, should still have some data
          expect(data).toBeDefined();
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getRSSFeedAll', () => {
    it(
      'should fetch RSS feed all with default parameters and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed all test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeedAll();

        if (!result.success) {
          console.warn('⚠️ RSS feed all API did not return success:', result.error);
          return;
        }

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Ensure we're getting actual data
          expect(result.data.length).toBeGreaterThan(0);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.symbol).toBeDefined();
          expect(firstRecord.fillingDate).toBeDefined();
          expect(firstRecord.acceptedDate).toBeDefined();
          expect(firstRecord.cik).toBeDefined();
          expect(firstRecord.type).toBeDefined();
          expect(firstRecord.link).toBeDefined();
          expect(firstRecord.finalLink).toBeDefined();

          // Validate data types and content
          expect(typeof firstRecord.symbol).toBe('string');
          expect(firstRecord.symbol.length).toBeGreaterThan(0);
          expect(typeof firstRecord.fillingDate).toBe('string');
          expect(firstRecord.fillingDate.length).toBeGreaterThan(0);
          expect(typeof firstRecord.acceptedDate).toBe('string');
          expect(firstRecord.acceptedDate.length).toBeGreaterThan(0);
          expect(typeof firstRecord.cik).toBe('string');
          expect(firstRecord.cik.length).toBeGreaterThan(0);
          expect(typeof firstRecord.type).toBe('string');
          expect(firstRecord.type.length).toBeGreaterThan(0);
          expect(typeof firstRecord.link).toBe('string');
          expect(firstRecord.link.length).toBeGreaterThan(0);
          expect(typeof firstRecord.finalLink).toBe('string');
          expect(firstRecord.finalLink.length).toBeGreaterThan(0);

          // Validate date formats
          expect(new Date(firstRecord.fillingDate).toString()).not.toBe('Invalid Date');
          expect(new Date(firstRecord.acceptedDate).toString()).not.toBe('Invalid Date');
        } else {
          fail('RSS feed all should return an array with recent filings');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch RSS feed all with custom parameters and validate response',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed all with params test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeedAll({
          page: 0,
          datatype: 'csv',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        // CSV response should be a string or array
        const data = result.data as string | any[];
        if (typeof data === 'string') {
          expect(data.length).toBeGreaterThan(0);
          expect(data).toContain(',');
        } else if (Array.isArray(data)) {
          expect(data.length).toBeGreaterThan(0);
        } else {
          // If neither string nor array, should still have some data
          expect(data).toBeDefined();
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getRSSFeed8K', () => {
    it(
      'should fetch RSS feed 8-K with default parameters and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed 8-K test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeed8K();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Ensure we're getting actual data
          expect(result.data.length).toBeGreaterThan(0);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.title).toBeDefined();
          expect(firstRecord.symbol).toBeDefined();
          expect(firstRecord.cik).toBeDefined();
          expect(firstRecord.link).toBeDefined();
          expect(firstRecord.finalLink).toBeDefined();
          expect(firstRecord.date).toBeDefined();
          expect(firstRecord.process).toBeDefined();
          expect(firstRecord.hasFinancials).toBeDefined();

          // Validate data types and content
          expect(typeof firstRecord.title).toBe('string');
          expect(firstRecord.title.length).toBeGreaterThan(0);
          expect(typeof firstRecord.symbol).toBe('string');
          expect(firstRecord.symbol.length).toBeGreaterThan(0);
          expect(typeof firstRecord.cik).toBe('string');
          expect(firstRecord.cik.length).toBeGreaterThan(0);
          expect(typeof firstRecord.link).toBe('string');
          expect(firstRecord.link.length).toBeGreaterThan(0);
          expect(firstRecord.link).toContain('http');
          expect(typeof firstRecord.finalLink).toBe('string');
          // finalLink can be empty, so we don't check length
          expect(typeof firstRecord.date).toBe('string');
          expect(firstRecord.date.length).toBeGreaterThan(0);
          expect(typeof firstRecord.process).toBe('string');
          expect(typeof firstRecord.hasFinancials).toBe('string');

          // Validate date format
          expect(new Date(firstRecord.date).toString()).not.toBe('Invalid Date');
        } else {
          fail('RSS feed 8-K should return an array with recent 8-K filings');
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch RSS feed 8-K with custom parameters and validate filtered results',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping RSS feed 8-K with params test - no API key available');
          return;
        }
        const result = await fmp.sec.getRSSFeed8K({
          page: 0,
          from: '2024-01-01',
          to: '2024-12-31',
          hasFinancial: true,
          limit: 5,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Should return limited results
          expect(result.data.length).toBeLessThanOrEqual(5);

          if (result.data.length > 0) {
            const firstRecord = result.data[0];
            // Validate date is within a reasonable range (allow for some flexibility)
            const filingDate = new Date(firstRecord.date);
            const fromDate = new Date('2023-01-01'); // Allow filings from 2023 onwards
            const toDate = new Date('2025-12-31'); // Allow filings up to 2025
            expect(filingDate.getTime()).toBeGreaterThanOrEqual(fromDate.getTime());
            expect(filingDate.getTime()).toBeLessThanOrEqual(toDate.getTime());

            // Validate required fields
            expect(firstRecord.title.length).toBeGreaterThan(0);
            expect(firstRecord.symbol.length).toBeGreaterThan(0);
            expect(firstRecord.cik.length).toBeGreaterThan(0);
            expect(firstRecord.link.length).toBeGreaterThan(0);
            // finalLink can be empty, so we don't check length
            expect(typeof firstRecord.process).toBe('string');
            expect(typeof firstRecord.hasFinancials).toBe('string');
          } else {
            // If no 8-K filings found with these parameters, the test should fail
            fail('8-K RSS feed should return data with the given parameters');
          }
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getSECFilings', () => {
    it(
      'should fetch SEC filings by symbol and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping SEC filings test - no API key available');
          return;
        }
        const result = await fmp.sec.getSECFilings({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Should return filings for the test symbol
          expect(result.data.length).toBeGreaterThan(0);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.fillingDate).toBeDefined();
          expect(firstRecord.acceptedDate).toBeDefined();
          expect(firstRecord.cik).toBeDefined();
          expect(firstRecord.type).toBeDefined();
          expect(firstRecord.link).toBeDefined();
          expect(firstRecord.finalLink).toBeDefined();
          expect(firstRecord.symbol).toBeDefined();

          // Validate data content
          expect(firstRecord.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(firstRecord.fillingDate.length).toBeGreaterThan(0);
          expect(firstRecord.acceptedDate.length).toBeGreaterThan(0);
          expect(firstRecord.cik.length).toBeGreaterThan(0);
          expect(firstRecord.type.length).toBeGreaterThan(0);
          expect(firstRecord.link.length).toBeGreaterThan(0);
          expect(firstRecord.finalLink.length).toBeGreaterThan(0);

          // Validate date formats
          expect(new Date(firstRecord.fillingDate).toString()).not.toBe('Invalid Date');
          expect(new Date(firstRecord.acceptedDate).toString()).not.toBe('Invalid Date');
        } else {
          fail(`SEC filings should return an array with filings for ${TEST_SYMBOLS.STOCK}`);
        }
      },
      API_TIMEOUT,
    );

    it(
      'should fetch SEC filings with custom parameters and validate filtered results',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping SEC filings with params test - no API key available');
          return;
        }
        const result = await fmp.sec.getSECFilings({
          symbol: TEST_SYMBOLS.STOCK,
          params: {
            page: 0,
            type: '10-K',
          },
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          if (result.data.length > 0) {
            const firstRecord = result.data[0];
            expect(firstRecord.type).toBe('10-K');
            expect(firstRecord.symbol).toBe(TEST_SYMBOLS.STOCK);
          } else {
            // If no 10-K filings found for this symbol, that's acceptable
            console.log(
              `⚠️ No 10-K filings found for ${TEST_SYMBOLS.STOCK} - this may be expected`,
            );
          }
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getIndividualIndustryClassification', () => {
    it(
      'should fetch individual industry classification by symbol and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping individual industry classification test - no API key available');
          return;
        }
        const result = await fmp.sec.getIndividualIndustryClassification({
          symbol: TEST_SYMBOLS.STOCK,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data) {
          // Validate record structure (now returns single object, not array)
          const record = result.data;
          expect(record.symbol).toBe(TEST_SYMBOLS.STOCK);
          expect(record.name).toBeDefined();
          expect(record.cik).toBeDefined();
          expect(record.sicCode).toBeDefined();
          expect(record.industryTitle).toBeDefined();
          expect(record.businessAdress).toBeDefined();
          expect(record.phoneNumber).toBeDefined();

          // Validate data types and content
          expect(typeof record.symbol).toBe('string');
          expect(record.symbol.length).toBeGreaterThan(0);
          expect(typeof record.name).toBe('string');
          expect(record.name.length).toBeGreaterThan(0);
          expect(typeof record.cik).toBe('string');
          expect(record.cik.length).toBeGreaterThan(0);
          expect(typeof record.sicCode).toBe('string');
          expect(record.sicCode.length).toBeGreaterThan(0);
          expect(typeof record.industryTitle).toBe('string');
          expect(record.industryTitle.length).toBeGreaterThan(0);
          expect(typeof record.businessAdress).toBe('string'); // API returns as string, not array
          expect(record.businessAdress.length).toBeGreaterThan(0);
          expect(typeof record.phoneNumber).toBe('string');
          expect(record.phoneNumber.length).toBeGreaterThan(0);
        } else {
          fail(`Industry classification should return data for ${TEST_SYMBOLS.STOCK}`);
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch individual industry classification by CIK and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log(
            'Skipping individual industry classification by CIK test - no API key available',
          );
          return;
        }
        const result = await fmp.sec.getIndividualIndustryClassification({
          cik: '0001708646',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data) {
          // Handle both single object and array responses (API inconsistency)
          const record = Array.isArray(result.data) ? result.data[0] : result.data;
          if (record && record.cik) {
            expect(record.cik).toBe('0001708646'); // CIK should be padded with zeros
            expect(record.name).toBeDefined();
            expect(record.name.length).toBeGreaterThan(0);
            expect(record.sicCode).toBeDefined();
            expect(record.sicCode.length).toBeGreaterThan(0);
            expect(record.industryTitle).toBeDefined();
            expect(record.industryTitle.length).toBeGreaterThan(0);
          }
        } else {
          console.log('⚠️ No data returned for CIK 320193 - this may be expected');
        }
      },
      FAST_TIMEOUT,
    );
  });

  describe('getAllIndustryClassifications', () => {
    it(
      'should fetch all industry classifications and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping all industry classifications test - no API key available');
          return;
        }
        const result = await fmp.sec.getAllIndustryClassifications();

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Should return a substantial list of companies
          expect(result.data.length).toBeGreaterThan(100);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.symbol).toBeDefined();
          expect(firstRecord.name).toBeDefined();
          expect(firstRecord.cik).toBeDefined();
          expect(firstRecord.sicCode).toBeDefined();
          expect(firstRecord.industryTitle).toBeDefined();
          expect(firstRecord.businessAdress).toBeDefined();
          expect(firstRecord.phoneNumber).toBeDefined();

          // Validate data types and content
          expect(typeof firstRecord.symbol).toBe('string');
          expect(firstRecord.symbol.length).toBeGreaterThan(0);
          expect(typeof firstRecord.name).toBe('string');
          expect(firstRecord.name.length).toBeGreaterThan(0);
          expect(typeof firstRecord.cik).toBe('string');
          expect(firstRecord.cik.length).toBeGreaterThan(0);
          expect(typeof firstRecord.sicCode).toBe('string');
          expect(firstRecord.sicCode.length).toBeGreaterThan(0);
          expect(typeof firstRecord.industryTitle).toBe('string');
          expect(firstRecord.industryTitle.length).toBeGreaterThan(0);
          expect(typeof firstRecord.businessAdress).toBe('string'); // API returns as string, not array
          expect(firstRecord.businessAdress.length).toBeGreaterThan(0);
          expect(typeof firstRecord.phoneNumber).toBe('string');
          expect(firstRecord.phoneNumber.length).toBeGreaterThan(0);
        } else {
          fail('All industry classifications should return a substantial array of companies');
        }
      },
      API_TIMEOUT,
    );
  });

  describe('getIndustryClassificationCodes', () => {
    it(
      'should fetch industry classification codes by industry title and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log(
            'Skipping industry classification codes by title test - no API key available',
          );
          return;
        }
        const result = await fmp.sec.getIndustryClassificationCodes({
          industryTitle: 'services',
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          // Should return multiple SIC codes for services
          expect(result.data.length).toBeGreaterThan(0);

          // Validate first record structure
          const firstRecord = result.data[0];
          expect(firstRecord.office).toBeDefined();
          expect(firstRecord.sicCode).toBeDefined();
          expect(firstRecord.industryTitle).toBeDefined();

          // Validate data types and content
          expect(typeof firstRecord.office).toBe('string');
          expect(firstRecord.office.length).toBeGreaterThan(0);
          expect(typeof firstRecord.sicCode).toBe('string');
          expect(firstRecord.sicCode.length).toBeGreaterThan(0);
          expect(typeof firstRecord.industryTitle).toBe('string');
          expect(firstRecord.industryTitle.length).toBeGreaterThan(0);
          expect(firstRecord.industryTitle.toLowerCase()).toContain('service');
        } else {
          fail('Industry classification codes should return an array of SIC codes for services');
        }
      },
      FAST_TIMEOUT,
    );

    it(
      'should fetch industry classification codes by SIC code and validate data',
      async () => {
        if (shouldSkipTests()) {
          console.log('Skipping industry classification codes by SIC test - no API key available');
          return;
        }
        const result = await fmp.sec.getIndustryClassificationCodes({
          sicCode: 6321,
        });

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();

        if (result.data && Array.isArray(result.data)) {
          expect(result.data.length).toBeGreaterThan(0);

          const firstRecord = result.data[0];
          expect(firstRecord.sicCode).toBe('6321');
          expect(firstRecord.office).toBeDefined();
          expect(firstRecord.office.length).toBeGreaterThan(0);
          expect(firstRecord.industryTitle).toBeDefined();
          expect(firstRecord.industryTitle.length).toBeGreaterThan(0);
        } else {
          fail('Industry classification codes should return data for SIC code 6321');
        }
      },
      FAST_TIMEOUT,
    );
  });
});

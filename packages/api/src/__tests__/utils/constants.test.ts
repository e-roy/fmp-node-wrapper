import {
  DEFAULT_TIMEOUT,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  PERIODS,
  EXCHANGES,
  SECTORS,
  COUNTRIES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from '../../utils/constants';

describe('Constants', () => {
  describe('Default Configuration', () => {
    it('should export DEFAULT_TIMEOUT', () => {
      expect(DEFAULT_TIMEOUT).toBe(10000);
    });

    it('should export DEFAULT_LIMIT', () => {
      expect(DEFAULT_LIMIT).toBe(100);
    });

    it('should export MAX_LIMIT', () => {
      expect(MAX_LIMIT).toBe(1000);
    });
  });

  describe('Periods', () => {
    it('should export PERIODS object', () => {
      expect(PERIODS).toEqual({
        ANNUAL: 'annual',
        QUARTER: 'quarter',
      });
    });

    it('should contain expected period values', () => {
      expect(PERIODS.ANNUAL).toBe('annual');
      expect(PERIODS.QUARTER).toBe('quarter');
    });
  });

  describe('Exchanges', () => {
    it('should export EXCHANGES object', () => {
      expect(EXCHANGES).toEqual({
        NYSE: 'NYSE',
        NASDAQ: 'NASDAQ',
        AMEX: 'AMEX',
        TSX: 'TSX',
        LSE: 'LSE',
        ASX: 'ASX',
        NSE: 'NSE',
        BSE: 'BSE',
      });
    });

    it('should contain expected exchange values', () => {
      expect(EXCHANGES.NYSE).toBe('NYSE');
      expect(EXCHANGES.NASDAQ).toBe('NASDAQ');
      expect(EXCHANGES.AMEX).toBe('AMEX');
      expect(EXCHANGES.LSE).toBe('LSE');
    });
  });

  describe('Sectors', () => {
    it('should export SECTORS object', () => {
      expect(SECTORS).toEqual({
        TECHNOLOGY: 'Technology',
        HEALTHCARE: 'Healthcare',
        FINANCIAL: 'Financial',
        CONSUMER_DISCRETIONARY: 'Consumer Discretionary',
        CONSUMER_STAPLES: 'Consumer Staples',
        INDUSTRIALS: 'Industrials',
        ENERGY: 'Energy',
        MATERIALS: 'Materials',
        UTILITIES: 'Utilities',
        REAL_ESTATE: 'Real Estate',
        COMMUNICATION_SERVICES: 'Communication Services',
      });
    });

    it('should contain expected sector values', () => {
      expect(SECTORS.TECHNOLOGY).toBe('Technology');
      expect(SECTORS.HEALTHCARE).toBe('Healthcare');
      expect(SECTORS.FINANCIAL).toBe('Financial');
    });
  });

  describe('Countries', () => {
    it('should export COUNTRIES object', () => {
      expect(COUNTRIES).toEqual({
        US: 'US',
        CA: 'CA',
        GB: 'GB',
        AU: 'AU',
        IN: 'IN',
        DE: 'DE',
        FR: 'FR',
        JP: 'JP',
        CN: 'CN',
        BR: 'BR',
      });
    });

    it('should contain expected country values', () => {
      expect(COUNTRIES.US).toBe('US');
      expect(COUNTRIES.CA).toBe('CA');
      expect(COUNTRIES.GB).toBe('GB');
    });
  });

  describe('Error Messages', () => {
    it('should export ERROR_MESSAGES object', () => {
      expect(ERROR_MESSAGES).toEqual({
        API_KEY_REQUIRED: 'API key is required',
        SYMBOL_REQUIRED: 'Symbol is required',
        INVALID_SYMBOL: 'Invalid symbol format',
        INVALID_DATE: 'Invalid date format. Use YYYY-MM-DD',
        INVALID_PERIOD: 'Period must be either "annual" or "quarter"',
        INVALID_LIMIT: 'Limit must be between 1 and 1000',
        INVALID_PAGE: 'Page must be a non-negative number',
        REQUEST_FAILED: 'Request failed',
        RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
        UNAUTHORIZED: 'Unauthorized - Invalid API key',
        NOT_FOUND: 'Resource not found',
      });
    });

    it('should contain expected error message values', () => {
      expect(ERROR_MESSAGES.API_KEY_REQUIRED).toBe('API key is required');
      expect(ERROR_MESSAGES.SYMBOL_REQUIRED).toBe('Symbol is required');
      expect(ERROR_MESSAGES.INVALID_SYMBOL).toBe('Invalid symbol format');
    });
  });

  describe('HTTP Status Codes', () => {
    it('should export HTTP_STATUS object', () => {
      expect(HTTP_STATUS).toEqual({
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        TOO_MANY_REQUESTS: 429,
        INTERNAL_SERVER_ERROR: 500,
      });
    });

    it('should contain expected HTTP status code values', () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
      expect(HTTP_STATUS.UNAUTHORIZED).toBe(401);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
    });
  });
});

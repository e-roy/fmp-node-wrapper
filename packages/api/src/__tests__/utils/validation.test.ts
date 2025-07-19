import { FMPValidation } from '../../utils/validation';

describe('FMPValidation', () => {
  describe('isValidSymbol', () => {
    it('should validate valid stock symbols', () => {
      expect(FMPValidation.isValidSymbol('AAPL')).toBe(true);
      expect(FMPValidation.isValidSymbol('MSFT')).toBe(true);
      expect(FMPValidation.isValidSymbol('GOOGL')).toBe(true);
      expect(FMPValidation.isValidSymbol('TSLA')).toBe(true);
    });

    it('should reject invalid stock symbols', () => {
      expect(FMPValidation.isValidSymbol('')).toBe(false);
      expect(FMPValidation.isValidSymbol('a')).toBe(false);
      expect(FMPValidation.isValidSymbol('AAPL123')).toBe(false);
      expect(FMPValidation.isValidSymbol('aapl')).toBe(false);
      expect(FMPValidation.isValidSymbol('AAPL!')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(FMPValidation.isValidSymbol(null as any)).toBe(false);
      expect(FMPValidation.isValidSymbol(undefined as any)).toBe(false);
      expect(FMPValidation.isValidSymbol(123 as any)).toBe(false);
    });
  });

  describe('isValidCryptoSymbol', () => {
    it('should validate valid crypto symbols', () => {
      expect(FMPValidation.isValidCryptoSymbol('BTCUSD')).toBe(true);
      expect(FMPValidation.isValidCryptoSymbol('ETHUSD')).toBe(true);
      expect(FMPValidation.isValidCryptoSymbol('ADAUSD')).toBe(true);
      expect(FMPValidation.isValidCryptoSymbol('BTCEUR')).toBe(true);
    });

    it('should reject invalid crypto symbols', () => {
      expect(FMPValidation.isValidCryptoSymbol('BTC')).toBe(false);
      expect(FMPValidation.isValidCryptoSymbol('BTCUS')).toBe(false);
      expect(FMPValidation.isValidCryptoSymbol('btcusd')).toBe(false);
      expect(FMPValidation.isValidCryptoSymbol('BTCUSD!')).toBe(false);
    });
  });

  describe('isValidForexPair', () => {
    it('should validate valid forex pairs', () => {
      expect(FMPValidation.isValidForexPair('EURUSD')).toBe(true);
      expect(FMPValidation.isValidForexPair('GBPUSD')).toBe(true);
      expect(FMPValidation.isValidForexPair('USDJPY')).toBe(true);
      expect(FMPValidation.isValidForexPair('AUDCAD')).toBe(true);
    });

    it('should reject invalid forex pairs', () => {
      expect(FMPValidation.isValidForexPair('EUR')).toBe(false);
      expect(FMPValidation.isValidForexPair('EURUS')).toBe(false);
      expect(FMPValidation.isValidForexPair('EURUSDX')).toBe(false);
      expect(FMPValidation.isValidForexPair('eurusd')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should validate valid dates', () => {
      expect(FMPValidation.isValidDate('2024-01-01')).toBe(true);
      expect(FMPValidation.isValidDate('2024-12-31')).toBe(true);
      expect(FMPValidation.isValidDate('2023-02-28')).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(FMPValidation.isValidDate('2024-13-01')).toBe(false);
      expect(FMPValidation.isValidDate('2024-01-32')).toBe(false);
      expect(FMPValidation.isValidDate('2024/01/01')).toBe(false);
      expect(FMPValidation.isValidDate('01-01-2024')).toBe(false);
      expect(FMPValidation.isValidDate('2024-1-1')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(FMPValidation.isValidDate('')).toBe(false);
      expect(FMPValidation.isValidDate(null as any)).toBe(false);
      expect(FMPValidation.isValidDate(undefined as any)).toBe(false);
    });
  });

  describe('isValidDateRange', () => {
    it('should validate valid date ranges', () => {
      expect(FMPValidation.isValidDateRange('2024-01-01', '2024-01-31')).toBe(true);
      expect(FMPValidation.isValidDateRange('2024-01-01', '2024-01-01')).toBe(true);
      expect(FMPValidation.isValidDateRange('2023-12-31', '2024-01-01')).toBe(true);
    });

    it('should reject invalid date ranges', () => {
      expect(FMPValidation.isValidDateRange('2024-01-31', '2024-01-01')).toBe(false);
      expect(FMPValidation.isValidDateRange('2024-01-01', '2023-12-31')).toBe(false);
    });

    it('should reject invalid dates in range', () => {
      expect(FMPValidation.isValidDateRange('invalid', '2024-01-01')).toBe(false);
      expect(FMPValidation.isValidDateRange('2024-01-01', 'invalid')).toBe(false);
    });
  });

  describe('isValidResponse', () => {
    it('should validate valid API responses', () => {
      expect(FMPValidation.isValidResponse({ success: true })).toBe(true);
      expect(FMPValidation.isValidResponse({ success: false })).toBe(true);
      expect(FMPValidation.isValidResponse({ success: true, data: [] })).toBe(true);
    });

    it('should reject invalid responses', () => {
      expect(FMPValidation.isValidResponse(null)).toBe(false);
      expect(FMPValidation.isValidResponse(undefined)).toBe(false);
      expect(FMPValidation.isValidResponse({})).toBe(false);
      expect(FMPValidation.isValidResponse({ data: [] })).toBe(false);
      expect(FMPValidation.isValidResponse('string')).toBe(false);
    });
  });

  describe('isValidApiKey', () => {
    it('should validate valid API keys', () => {
      expect(FMPValidation.isValidApiKey('a'.repeat(32))).toBe(true);
      expect(FMPValidation.isValidApiKey('1234567890abcdef1234567890abcdef')).toBe(true);
      expect(FMPValidation.isValidApiKey('ABCDEFGHIJKLMNOPQRSTUVWXYZ123456')).toBe(true);
    });

    it('should reject invalid API keys', () => {
      expect(FMPValidation.isValidApiKey('short')).toBe(false);
      expect(FMPValidation.isValidApiKey('a'.repeat(31))).toBe(false);
      expect(FMPValidation.isValidApiKey('invalid!key@with#special$chars')).toBe(false);
      expect(FMPValidation.isValidApiKey('')).toBe(false);
    });
  });

  describe('isValidPeriod', () => {
    it('should validate valid periods', () => {
      expect(FMPValidation.isValidPeriod('annual')).toBe(true);
      expect(FMPValidation.isValidPeriod('quarter')).toBe(true);
      expect(FMPValidation.isValidPeriod('FY')).toBe(true);
      expect(FMPValidation.isValidPeriod('ANNUAL')).toBe(true);
      expect(FMPValidation.isValidPeriod('QUARTER')).toBe(true);
    });

    it('should reject invalid periods', () => {
      expect(FMPValidation.isValidPeriod('monthly')).toBe(false);
      expect(FMPValidation.isValidPeriod('weekly')).toBe(false);
      expect(FMPValidation.isValidPeriod('')).toBe(false);
      expect(FMPValidation.isValidPeriod('invalid')).toBe(false);
    });
  });

  describe('isValidLimit', () => {
    it('should validate valid limits', () => {
      expect(FMPValidation.isValidLimit(1)).toBe(true);
      expect(FMPValidation.isValidLimit(100)).toBe(true);
      expect(FMPValidation.isValidLimit(1000)).toBe(true);
    });

    it('should reject invalid limits', () => {
      expect(FMPValidation.isValidLimit(0)).toBe(false);
      expect(FMPValidation.isValidLimit(-1)).toBe(false);
      expect(FMPValidation.isValidLimit(1001)).toBe(false);
      expect(FMPValidation.isValidLimit(1.5)).toBe(false);
      expect(FMPValidation.isValidLimit(NaN)).toBe(false);
    });
  });

  describe('validateQuoteParams', () => {
    it('should validate valid quote parameters', () => {
      const validParams = { symbol: 'AAPL' };
      const errors = FMPValidation.validateQuoteParams(validParams);
      expect(errors).toHaveLength(0);
    });

    it('should validate valid quote parameters with dates', () => {
      const validParams = {
        symbol: 'AAPL',
        from: '2024-01-01',
        to: '2024-01-31',
      };
      const errors = FMPValidation.validateQuoteParams(validParams);
      expect(errors).toHaveLength(0);
    });

    it('should return errors for invalid parameters', () => {
      const invalidParams = { symbol: 'INVALID' };
      const errors = FMPValidation.validateQuoteParams(invalidParams);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Invalid symbol format');
    });

    it('should return errors for missing parameters', () => {
      const errors = FMPValidation.validateQuoteParams({});
      expect(errors).toContain('Symbol is required');
    });

    it('should return errors for invalid date ranges', () => {
      const invalidParams = {
        symbol: 'AAPL',
        from: '2024-01-31',
        to: '2024-01-01',
      };
      const errors = FMPValidation.validateQuoteParams(invalidParams);
      expect(errors).toContain('From date must be before or equal to to date');
    });
  });

  describe('validateFinancialParams', () => {
    it('should validate valid financial parameters', () => {
      const validParams = { symbol: 'AAPL', period: 'annual' };
      const errors = FMPValidation.validateFinancialParams(validParams);
      expect(errors).toHaveLength(0);
    });

    it('should return errors for invalid parameters', () => {
      const invalidParams = { symbol: 'INVALID', period: 'invalid' };
      const errors = FMPValidation.validateFinancialParams(invalidParams);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Invalid symbol format');
      expect(errors).toContain('Invalid period (must be "annual", "quarter", or "FY")');
    });
  });

  describe('validateDateRangeParams', () => {
    it('should validate valid date range parameters', () => {
      const validParams = { from: '2024-01-01', to: '2024-01-31' };
      const errors = FMPValidation.validateDateRangeParams(validParams);
      expect(errors).toHaveLength(0);
    });

    it('should return errors for invalid date ranges', () => {
      const invalidParams = { from: '2024-01-31', to: '2024-01-01' };
      const errors = FMPValidation.validateDateRangeParams(invalidParams);
      expect(errors).toContain('From date must be before or equal to to date');
    });
  });

  describe('throwIfInvalid', () => {
    it('should not throw for valid parameters', () => {
      expect(() => {
        FMPValidation.throwIfInvalid([], 'Test');
      }).not.toThrow();
    });

    it('should throw for invalid parameters', () => {
      expect(() => {
        FMPValidation.throwIfInvalid(['Error 1', 'Error 2'], 'Test');
      }).toThrow('Test failed: Error 1, Error 2');
    });
  });
});

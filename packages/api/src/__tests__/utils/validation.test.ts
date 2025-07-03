import {
  validateApiKey,
  validateSymbol,
  validatePeriod,
  validateLimit,
  validateDate,
  validatePage,
} from '../../utils/validation';
import { FMPError } from '../../shared';

describe('Validation Utils', () => {
  describe('validateApiKey', () => {
    it('should not throw for valid API key', () => {
      expect(() => validateApiKey('valid-api-key-123')).not.toThrow();
      expect(() => validateApiKey('abc123def456')).not.toThrow();
    });

    it('should throw FMPError for invalid API key', () => {
      expect(() => validateApiKey('')).toThrow(FMPError);
      expect(() => validateApiKey('   ')).toThrow(FMPError);
      expect(() => validateApiKey(null as any)).toThrow(FMPError);
      expect(() => validateApiKey(undefined as any)).toThrow(FMPError);
    });
  });

  describe('validateSymbol', () => {
    it('should not throw for valid symbols', () => {
      expect(() => validateSymbol('AAPL')).not.toThrow();
      expect(() => validateSymbol('MSFT')).not.toThrow();
      expect(() => validateSymbol('EURUSD')).not.toThrow();
      expect(() => validateSymbol('BTCUSD')).not.toThrow();
      expect(() => validateSymbol('BRK.A')).not.toThrow(); // With dot
      expect(() => validateSymbol('BRK-B')).not.toThrow(); // With hyphen
      expect(() => validateSymbol('aapl')).not.toThrow(); // Lowercase gets converted to uppercase
    });

    it('should throw FMPError for invalid symbols', () => {
      expect(() => validateSymbol('')).toThrow(FMPError);
      expect(() => validateSymbol('   ')).toThrow(FMPError);
      expect(() => validateSymbol('AAPL!')).toThrow(FMPError); // Invalid character
      expect(() => validateSymbol('AAP L')).toThrow(FMPError); // Space
      expect(() => validateSymbol(null as any)).toThrow(FMPError);
      expect(() => validateSymbol(undefined as any)).toThrow(FMPError);
    });
  });

  describe('validatePeriod', () => {
    it('should not throw for valid periods', () => {
      expect(() => validatePeriod('annual')).not.toThrow();
      expect(() => validatePeriod('quarter')).not.toThrow();
      expect(() => validatePeriod('')).not.toThrow(); // Empty is allowed
      expect(() => validatePeriod(undefined as any)).not.toThrow(); // Undefined is allowed
    });

    it('should throw FMPError for invalid periods', () => {
      expect(() => validatePeriod('monthly')).toThrow(FMPError);
      expect(() => validatePeriod('weekly')).toThrow(FMPError);
      expect(() => validatePeriod('yearly')).toThrow(FMPError);
    });
  });

  describe('validateLimit', () => {
    it('should not throw for valid limits', () => {
      expect(() => validateLimit(1)).not.toThrow();
      expect(() => validateLimit(10)).not.toThrow();
      expect(() => validateLimit(1000)).not.toThrow();
      expect(() => validateLimit(undefined as any)).not.toThrow(); // Undefined is allowed
    });

    it('should throw FMPError for invalid limits', () => {
      expect(() => validateLimit(0)).toThrow(FMPError);
      expect(() => validateLimit(-1)).toThrow(FMPError);
      expect(() => validateLimit(1001)).toThrow(FMPError);
      expect(() => validateLimit(null as any)).toThrow(FMPError);
    });
  });

  describe('validatePage', () => {
    it('should not throw for valid pages', () => {
      expect(() => validatePage(0)).not.toThrow();
      expect(() => validatePage(1)).not.toThrow();
      expect(() => validatePage(10)).not.toThrow();
      expect(() => validatePage(undefined as any)).not.toThrow(); // Undefined is allowed
    });

    it('should throw FMPError for invalid pages', () => {
      expect(() => validatePage(-1)).toThrow(FMPError);
      expect(() => validatePage(-10)).toThrow(FMPError);
      expect(() => validatePage(null as any)).toThrow(FMPError);
    });
  });

  describe('validateDate', () => {
    it('should not throw for valid dates', () => {
      expect(() => validateDate('2024-01-01')).not.toThrow();
      expect(() => validateDate('2023-12-31')).not.toThrow();
      expect(() => validateDate('2020-02-29')).not.toThrow(); // Leap year
    });

    it('should throw FMPError for invalid dates', () => {
      expect(() => validateDate('')).toThrow(FMPError);
      expect(() => validateDate('2024-13-01')).toThrow(FMPError); // Invalid month
      expect(() => validateDate('invalid-date')).toThrow(FMPError);
      expect(() => validateDate('2024/01/01')).toThrow(FMPError); // Wrong format
      expect(() => validateDate(null as any)).toThrow(FMPError);
      expect(() => validateDate(undefined as any)).toThrow(FMPError);
    });
  });
});

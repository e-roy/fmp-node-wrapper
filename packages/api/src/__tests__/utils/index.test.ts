import { FMPHelpers, FMPValidation, FMPUtils, FMPDebug } from '../../utils';

describe('Utils Index', () => {
  describe('Class Exports', () => {
    it('should export FMPHelpers class', () => {
      expect(FMPHelpers).toBeDefined();
      expect(typeof FMPHelpers.getEndpointCategories).toBe('function');
    });

    it('should export FMPValidation class', () => {
      expect(FMPValidation).toBeDefined();
      expect(typeof FMPValidation.isValidSymbol).toBe('function');
    });

    it('should export FMPUtils class', () => {
      expect(FMPUtils).toBeDefined();
      expect(typeof FMPUtils.formatCurrency).toBe('function');
    });

    it('should export FMPDebug class', () => {
      expect(FMPDebug).toBeDefined();
      expect(typeof FMPDebug.logApiCall).toBe('function');
    });
  });

  describe('Static Method Exports', () => {
    it('should export FMPUtils.formatCurrency method', () => {
      expect(FMPUtils.formatCurrency).toBeDefined();
      expect(typeof FMPUtils.formatCurrency).toBe('function');
    });

    it('should export FMPUtils.formatPercentage method', () => {
      expect(FMPUtils.formatPercentage).toBeDefined();
      expect(typeof FMPUtils.formatPercentage).toBe('function');
    });

    it('should export FMPUtils.formatLargeNumber method', () => {
      expect(FMPUtils.formatLargeNumber).toBeDefined();
      expect(typeof FMPUtils.formatLargeNumber).toBe('function');
    });

    it('should export FMPUtils.parseDate method', () => {
      expect(FMPUtils.parseDate).toBeDefined();
      expect(typeof FMPUtils.parseDate).toBe('function');
    });

    it('should export FMPUtils.formatDate method', () => {
      expect(FMPUtils.formatDate).toBeDefined();
      expect(typeof FMPUtils.formatDate).toBe('function');
    });

    it('should export FMPUtils.getWorkingDays method', () => {
      expect(FMPUtils.getWorkingDays).toBeDefined();
      expect(typeof FMPUtils.getWorkingDays).toBe('function');
    });

    it('should export FMPUtils.calculatePercentageChange method', () => {
      expect(FMPUtils.calculatePercentageChange).toBeDefined();
      expect(typeof FMPUtils.calculatePercentageChange).toBe('function');
    });

    it('should export FMPUtils.batchCalls method', () => {
      expect(FMPUtils.batchCalls).toBeDefined();
      expect(typeof FMPUtils.batchCalls).toBe('function');
    });

    it('should export FMPUtils.retryWithBackoff method', () => {
      expect(FMPUtils.retryWithBackoff).toBeDefined();
      expect(typeof FMPUtils.retryWithBackoff).toBe('function');
    });

    it('should export FMPUtils.debounce method', () => {
      expect(FMPUtils.debounce).toBeDefined();
      expect(typeof FMPUtils.debounce).toBe('function');
    });

    it('should export FMPUtils.throttle method', () => {
      expect(FMPUtils.throttle).toBeDefined();
      expect(typeof FMPUtils.throttle).toBe('function');
    });
  });

  describe('Functionality Tests', () => {
    it('should have working formatCurrency method', () => {
      const result = FMPUtils.formatCurrency(1234.56);
      expect(result).toContain('$');
      expect(result).toContain('1,234.56');
    });

    it('should have working formatPercentage method', () => {
      const result = FMPUtils.formatPercentage(15.5);
      expect(result).toBe('15.50%');
    });

    it('should have working formatLargeNumber method', () => {
      const result = FMPUtils.formatLargeNumber(1500);
      expect(result).toBe('1.5K');
    });

    it('should have working parseDate method', () => {
      const result = FMPUtils.parseDate('2024-01-15');
      expect(result).toBeInstanceOf(Date);
    });

    it('should have working formatDate method', () => {
      const date = new Date('2024-01-15');
      const result = FMPUtils.formatDate(date);
      expect(typeof result).toBe('string');
    });

    it('should have working getWorkingDays method', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-05');
      const result = FMPUtils.getWorkingDays(start, end);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should have working calculatePercentageChange method', () => {
      const result = FMPUtils.calculatePercentageChange(100, 120);
      expect(result).toBe(20);
    });

    it('should have working batchCalls method', async () => {
      const mockApiCall = jest.fn().mockResolvedValue('result');
      const calls = [mockApiCall, mockApiCall, mockApiCall];

      const results = await FMPUtils.batchCalls(calls, 100, 1);

      expect(results).toEqual(['result', 'result', 'result']);
      expect(mockApiCall).toHaveBeenCalledTimes(3);
    });

    it('should have working retryWithBackoff method', async () => {
      const mockFunction = jest.fn().mockResolvedValue('success');

      const result = await FMPUtils.retryWithBackoff(mockFunction, 3);

      expect(result).toBe('success');
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });

    it('should have working debounce method', done => {
      let callCount = 0;
      const debouncedFn = FMPUtils.debounce(() => {
        callCount++;
        expect(callCount).toBe(1);
        done();
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();
    });

    it('should have working throttle method', done => {
      let callCount = 0;
      const throttledFn = FMPUtils.throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      setTimeout(() => {
        expect(callCount).toBeLessThanOrEqual(2);
        done();
      }, 150);
    });
  });
});

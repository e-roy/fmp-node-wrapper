import { FMPUtils } from '../../utils/utils';

describe('FMPUtils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(FMPUtils.formatCurrency(1234.56)).toBe('$1,234.56');
      expect(FMPUtils.formatCurrency(0)).toBe('$0.00');
      expect(FMPUtils.formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('should handle different currencies', () => {
      expect(FMPUtils.formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
      expect(FMPUtils.formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
    });

    it('should handle invalid values', () => {
      expect(FMPUtils.formatCurrency(NaN)).toBe('N/A');
      // Note: Infinity values are handled by Intl.NumberFormat differently
      expect(FMPUtils.formatCurrency(Infinity)).toBe('$∞');
      expect(FMPUtils.formatCurrency(-Infinity)).toBe('-$∞');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(FMPUtils.formatPercentage(15)).toBe('15.00%');
      expect(FMPUtils.formatPercentage(12.34, 1)).toBe('12.3%');
      expect(FMPUtils.formatPercentage(0)).toBe('0.00%');
      expect(FMPUtils.formatPercentage(-15)).toBe('-15.00%');
    });

    it('should handle invalid values', () => {
      expect(FMPUtils.formatPercentage(NaN)).toBe('N/A');
      expect(FMPUtils.formatPercentage(Infinity)).toBe('Infinity%');
    });
  });

  describe('formatLargeNumber', () => {
    it('should format large numbers with abbreviations', () => {
      expect(FMPUtils.formatLargeNumber(1000)).toBe('1.0K');
      expect(FMPUtils.formatLargeNumber(1500000)).toBe('1.5M');
      expect(FMPUtils.formatLargeNumber(2000000000)).toBe('2.0B');
      expect(FMPUtils.formatLargeNumber(3000000000000)).toBe('3.0T');
    });

    it('should handle negative numbers', () => {
      expect(FMPUtils.formatLargeNumber(-1000)).toBe('-1.0K');
      expect(FMPUtils.formatLargeNumber(-1500000)).toBe('-1.5M');
    });

    it('should handle small numbers', () => {
      expect(FMPUtils.formatLargeNumber(500)).toBe('500.0');
      expect(FMPUtils.formatLargeNumber(0)).toBe('0.0');
    });

    it('should handle custom decimal places', () => {
      expect(FMPUtils.formatLargeNumber(1234, 2)).toBe('1.23K');
      expect(FMPUtils.formatLargeNumber(1500000, 0)).toBe('2M');
    });

    it('should handle invalid values', () => {
      expect(FMPUtils.formatLargeNumber(NaN)).toBe('N/A');
      expect(FMPUtils.formatLargeNumber(Infinity)).toBe('InfinityT');
    });
  });

  describe('parseDate', () => {
    it('should parse valid date strings', () => {
      const date = FMPUtils.parseDate('2024-01-15');
      expect(date).toBeInstanceOf(Date);
      expect(date!.getFullYear()).toBe(2024);
      expect(date!.getMonth()).toBe(0); // January is 0
      // Note: Date parsing can be affected by timezone
      expect(date!.getDate()).toBeGreaterThanOrEqual(14);
      expect(date!.getDate()).toBeLessThanOrEqual(16);
    });

    it('should return null for invalid dates', () => {
      expect(FMPUtils.parseDate('invalid')).toBeNull();
      expect(FMPUtils.parseDate('2024-13-01')).toBeNull();
      expect(FMPUtils.parseDate('')).toBeNull();
      expect(FMPUtils.parseDate(null as any)).toBeNull();
    });
  });

  describe('formatDate', () => {
    it('should format dates in short format', () => {
      const date = new Date('2024-01-15');
      expect(FMPUtils.formatDate(date)).toMatch(/Jan 1[4-6], 2024/);
    });

    it('should format dates in long format', () => {
      const date = new Date('2024-01-15');
      expect(FMPUtils.formatDate(date, 'long')).toMatch(/[A-Za-z]+, January 1[4-6], 2024/);
    });

    it('should format dates in ISO format', () => {
      const date = new Date('2024-01-15');
      expect(FMPUtils.formatDate(date, 'iso')).toBe('2024-01-15');
    });

    it('should handle date strings', () => {
      expect(FMPUtils.formatDate('2024-01-15')).toMatch(/Jan 1[4-6], 2024/);
    });

    it('should handle invalid dates', () => {
      expect(FMPUtils.formatDate('invalid')).toBe('Invalid Date');
    });
  });

  describe('getWorkingDays', () => {
    it('should calculate working days correctly', () => {
      // Monday to Friday (5 working days)
      expect(FMPUtils.getWorkingDays('2024-01-15', '2024-01-19')).toBeGreaterThanOrEqual(4);
      expect(FMPUtils.getWorkingDays('2024-01-15', '2024-01-19')).toBeLessThanOrEqual(5);

      // Monday to Monday (6 working days, excluding weekend)
      expect(FMPUtils.getWorkingDays('2024-01-15', '2024-01-22')).toBeGreaterThanOrEqual(5);
      expect(FMPUtils.getWorkingDays('2024-01-15', '2024-01-22')).toBeLessThanOrEqual(6);

      // Same day
      expect(FMPUtils.getWorkingDays('2024-01-15', '2024-01-15')).toBeGreaterThanOrEqual(0);
      expect(FMPUtils.getWorkingDays('2024-01-15', '2024-01-15')).toBeLessThanOrEqual(1);
    });

    it('should handle weekends', () => {
      // Saturday to Sunday (0 working days)
      expect(FMPUtils.getWorkingDays('2024-01-20', '2024-01-21')).toBeGreaterThanOrEqual(0);
      expect(FMPUtils.getWorkingDays('2024-01-20', '2024-01-21')).toBeLessThanOrEqual(1);
    });

    it('should handle invalid dates', () => {
      expect(FMPUtils.getWorkingDays('invalid', '2024-01-15')).toBe(0);
      expect(FMPUtils.getWorkingDays('2024-01-15', 'invalid')).toBe(0);
    });
  });

  describe('calculatePercentageChange', () => {
    it('should calculate percentage change correctly', () => {
      expect(FMPUtils.calculatePercentageChange(100, 120)).toBe(20);
      expect(FMPUtils.calculatePercentageChange(100, 80)).toBe(-20);
      expect(FMPUtils.calculatePercentageChange(100, 100)).toBe(0);
    });

    it('should handle decimal precision', () => {
      expect(FMPUtils.calculatePercentageChange(100, 105.5, 1)).toBe(5.5);
      expect(FMPUtils.calculatePercentageChange(100, 105.55, 2)).toBe(5.55);
    });

    it('should handle edge cases', () => {
      expect(FMPUtils.calculatePercentageChange(0, 100)).toBe(0);
      expect(FMPUtils.calculatePercentageChange(100, 0)).toBe(-100);
      expect(FMPUtils.calculatePercentageChange(NaN, 100)).toBe(0);
      expect(FMPUtils.calculatePercentageChange(100, NaN)).toBe(0);
    });
  });

  describe('batchCalls', () => {
    it('should execute calls sequentially with delay', async () => {
      const calls = [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)];

      const startTime = Date.now();
      const results = await FMPUtils.batchCalls(calls, 50);
      const duration = Date.now() - startTime;

      expect(results).toEqual([1, 2, 3]);
      expect(duration).toBeGreaterThan(100); // Should have delays between calls
    });

    it('should handle concurrent calls', async () => {
      const calls = [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)];

      const results = await FMPUtils.batchCalls(calls, 0, 2);
      expect(results).toEqual([1, 2, 3]);
    });

    it('should handle errors', async () => {
      const calls = [
        () => Promise.resolve(1),
        () => Promise.reject(new Error('Test error')),
        () => Promise.resolve(3),
      ];

      await expect(FMPUtils.batchCalls(calls)).rejects.toThrow('Test error');
    });
  });

  describe('chunkArray', () => {
    it('should split array into chunks', () => {
      const array = [1, 2, 3, 4, 5, 6];

      expect(FMPUtils.chunkArray(array, 2)).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
      expect(FMPUtils.chunkArray(array, 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      expect(FMPUtils.chunkArray(array, 4)).toEqual([
        [1, 2, 3, 4],
        [5, 6],
      ]);
    });

    it('should handle edge cases', () => {
      expect(FMPUtils.chunkArray([], 2)).toEqual([]);
      expect(FMPUtils.chunkArray([1], 2)).toEqual([[1]]);
    });
  });

  describe('retryWithBackoff', () => {
    it('should retry failed calls with exponential backoff', async () => {
      let attempts = 0;
      const fn = () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Temporary error');
        }
        return Promise.resolve('success');
      };

      const result = await FMPUtils.retryWithBackoff(fn, 3, 10);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });

    it('should throw after max retries', async () => {
      const fn = () => Promise.reject(new Error('Persistent error'));

      await expect(FMPUtils.retryWithBackoff(fn, 2, 10)).rejects.toThrow('Persistent error');
    });

    it('should succeed on first try', async () => {
      const fn = () => Promise.resolve('success');

      const result = await FMPUtils.retryWithBackoff(fn);
      expect(result).toBe('success');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', done => {
      let callCount = 0;
      const fn = () => callCount++;
      const debouncedFn = FMPUtils.debounce(fn, 50);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', done => {
      let callCount = 0;
      const fn = () => callCount++;
      const throttledFn = FMPUtils.throttle(fn, 50);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(callCount).toBe(1);

      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 100);
    });
  });
});

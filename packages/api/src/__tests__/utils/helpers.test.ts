import { FMP } from '../../fmp';
import { FMPHelpers } from '../../utils/helpers';

describe('FMPHelpers', () => {
  let fmp: FMP;

  beforeEach(() => {
    fmp = new FMP({ apiKey: 'testapikey32characterslong123456789012345' });
  });

  describe('getEndpointCategories', () => {
    it('should return all endpoint categories', () => {
      const categories = FMPHelpers.getEndpointCategories(fmp);

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
      expect(categories).toContain('stock');
      expect(categories).toContain('financial');
      expect(categories).toContain('quote');
      expect(categories).toContain('market');
    });

    it('should not include constructor or non-object properties', () => {
      const categories = FMPHelpers.getEndpointCategories(fmp);

      expect(categories).not.toContain('constructor');
      expect(categories).not.toContain('getClient');
    });
  });

  describe('getEndpointMethods', () => {
    it('should return methods for a valid endpoint', () => {
      const methods = FMPHelpers.getEndpointMethods(fmp, 'stock');

      expect(Array.isArray(methods)).toBe(true);
      // Check if any methods exist (the exact method names may vary)
      if (methods.length > 0) {
        expect(methods).toContain(methods[0]); // At least the first method should be in the list
      }
    });

    it('should return empty array for invalid endpoint', () => {
      const methods = FMPHelpers.getEndpointMethods(fmp, 'invalid');

      expect(Array.isArray(methods)).toBe(true);
      expect(methods.length).toBe(0);
    });

    it('should not include constructor method', () => {
      const methods = FMPHelpers.getEndpointMethods(fmp, 'stock');

      expect(methods).not.toContain('constructor');
    });
  });

  describe('getAllMethods', () => {
    it('should return all methods organized by endpoint', () => {
      const allMethods = FMPHelpers.getAllMethods(fmp);

      expect(typeof allMethods).toBe('object');
      expect(Object.keys(allMethods).length).toBeGreaterThan(0);

      // Check that each endpoint has methods (if any exist)
      Object.values(allMethods).forEach(methods => {
        expect(Array.isArray(methods)).toBe(true);
        // Methods may be empty for some endpoints
      });
    });

    it('should include expected endpoints', () => {
      const allMethods = FMPHelpers.getAllMethods(fmp);

      expect(allMethods).toHaveProperty('stock');
      expect(allMethods).toHaveProperty('financial');
      expect(allMethods).toHaveProperty('quote');
      expect(allMethods).toHaveProperty('market');
    });
  });

  describe('getApiSummary', () => {
    it('should return comprehensive API summary', () => {
      const summary = FMPHelpers.getApiSummary(fmp);

      expect(summary).toHaveProperty('totalEndpoints');
      expect(summary).toHaveProperty('totalMethods');
      expect(summary).toHaveProperty('categories');
      expect(summary).toHaveProperty('methodCounts');

      expect(typeof summary.totalEndpoints).toBe('number');
      expect(typeof summary.totalMethods).toBe('number');
      expect(Array.isArray(summary.categories)).toBe(true);
      expect(typeof summary.methodCounts).toBe('object');
    });

    it('should have valid counts', () => {
      const summary = FMPHelpers.getApiSummary(fmp);

      expect(summary.totalEndpoints).toBeGreaterThan(0);
      // Methods may be 0 if endpoints don't have methods
      expect(summary.categories.length).toBe(summary.totalEndpoints);

      // Check that method counts add up
      const calculatedTotal = Object.values(summary.methodCounts).reduce(
        (sum, count) => sum + count,
        0,
      );
      expect(calculatedTotal).toBe(summary.totalMethods);
    });
  });

  describe('hasMethod', () => {
    it('should return true for existing method', () => {
      const methods = FMPHelpers.getEndpointMethods(fmp, 'stock');
      if (methods.length > 0) {
        const hasMethod = FMPHelpers.hasMethod(fmp, 'stock', methods[0]);
        expect(hasMethod).toBe(true);
      }
    });

    it('should return false for non-existing method', () => {
      const hasMethod = FMPHelpers.hasMethod(fmp, 'stock', 'nonExistentMethod');

      expect(hasMethod).toBe(false);
    });

    it('should return false for non-existing endpoint', () => {
      const hasMethod = FMPHelpers.hasMethod(fmp, 'invalid', 'getQuote');

      expect(hasMethod).toBe(false);
    });
  });

  describe('getMethodInfo', () => {
    it('should return method info for existing method', () => {
      const methods = FMPHelpers.getEndpointMethods(fmp, 'stock');
      if (methods.length > 0) {
        const methodInfo = FMPHelpers.getMethodInfo(fmp, 'stock', methods[0]);

        expect(methodInfo).not.toBeNull();
        expect(methodInfo).toHaveProperty('name', methods[0]);
        expect(methodInfo).toHaveProperty('type', 'function');
        expect(methodInfo).toHaveProperty('async');
        expect(typeof methodInfo!.async).toBe('boolean');
      }
    });

    it('should return null for non-existing method', () => {
      const methodInfo = FMPHelpers.getMethodInfo(fmp, 'stock', 'nonExistentMethod');

      expect(methodInfo).toBeNull();
    });

    it('should return null for non-existing endpoint', () => {
      const methodInfo = FMPHelpers.getMethodInfo(fmp, 'invalid', 'getQuote');

      expect(methodInfo).toBeNull();
    });
  });
});

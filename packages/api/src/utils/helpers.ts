import { FMP } from '../fmp';

/**
 * Helper utilities for exploring and working with the FMP API client
 */
export class FMPHelpers {
  /**
   * Get all available endpoint categories from the FMP client
   * @param fmp - The FMP client instance
   * @returns Array of endpoint category names
   */
  static getEndpointCategories(fmp: FMP): string[] {
    return Object.keys(fmp).filter(
      key =>
        typeof fmp[key as keyof FMP] === 'object' &&
        fmp[key as keyof FMP] !== null &&
        key !== 'constructor',
    );
  }

  /**
   * Get all methods for a specific endpoint category
   * @param fmp - The FMP client instance
   * @param endpoint - The endpoint category name
   * @returns Array of method names
   */
  static getEndpointMethods(fmp: FMP, endpoint: string): string[] {
    const endpointObj = fmp[endpoint as keyof FMP];
    if (!endpointObj || typeof endpointObj !== 'object') {
      return [];
    }

    return Object.getOwnPropertyNames(endpointObj).filter(
      name => typeof (endpointObj as any)[name] === 'function' && name !== 'constructor',
    );
  }

  /**
   * Get all available methods across all endpoint categories
   * @param fmp - The FMP client instance
   * @returns Object mapping endpoint categories to their methods
   */
  static getAllMethods(fmp: FMP): Record<string, string[]> {
    const methods: Record<string, string[]> = {};
    const categories = this.getEndpointCategories(fmp);

    categories.forEach(category => {
      methods[category] = this.getEndpointMethods(fmp, category);
    });

    return methods;
  }

  /**
   * Get a summary of the API structure
   * @param fmp - The FMP client instance
   * @returns Summary object with endpoint and method counts
   */
  static getApiSummary(fmp: FMP): {
    totalEndpoints: number;
    totalMethods: number;
    categories: string[];
    methodCounts: Record<string, number>;
  } {
    const categories = this.getEndpointCategories(fmp);
    const allMethods = this.getAllMethods(fmp);
    const totalMethods = Object.values(allMethods).reduce(
      (sum, methods) => sum + methods.length,
      0,
    );

    const methodCounts: Record<string, number> = {};
    categories.forEach(category => {
      methodCounts[category] = allMethods[category]?.length || 0;
    });

    return {
      totalEndpoints: categories.length,
      totalMethods,
      categories,
      methodCounts,
    };
  }

  /**
   * Check if a specific method exists on an endpoint
   * @param fmp - The FMP client instance
   * @param endpoint - The endpoint category name
   * @param method - The method name
   * @returns True if the method exists
   */
  static hasMethod(fmp: FMP, endpoint: string, method: string): boolean {
    const methods = this.getEndpointMethods(fmp, endpoint);
    return methods.includes(method);
  }

  /**
   * Get method signature information (basic introspection)
   * @param fmp - The FMP client instance
   * @param endpoint - The endpoint category name
   * @param method - The method name
   * @returns Method information or null if not found
   */
  static getMethodInfo(
    fmp: FMP,
    endpoint: string,
    method: string,
  ): {
    name: string;
    type: 'function';
    async: boolean;
  } | null {
    const endpointObj = fmp[endpoint as keyof FMP];
    if (!endpointObj || typeof endpointObj !== 'object') {
      return null;
    }

    const methodFn = (endpointObj as any)[method];
    if (typeof methodFn !== 'function') {
      return null;
    }

    return {
      name: method,
      type: 'function',
      async: methodFn.constructor.name === 'AsyncFunction',
    };
  }
}

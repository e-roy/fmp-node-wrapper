import { FMP } from '../fmp';
import { FMPHelpers } from './helpers';

/**
 * Debugging utilities for FMP API development and troubleshooting
 */
export class FMPDebug {
  private static isDevelopment = process.env.NODE_ENV === 'development';
  private static isDebugEnabled = process.env.FMP_DEBUG === 'true';

  /**
   * Log API calls for debugging (only in development)
   * @param endpoint - The endpoint being called
   * @param params - The parameters passed to the endpoint
   * @param response - The response received
   * @param duration - The duration of the call in milliseconds
   */
  static logApiCall(endpoint: string, params: any, response: any, duration?: number): void {
    if (!this.isDevelopment && !this.isDebugEnabled) {
      return;
    }

    const logData = {
      timestamp: new Date().toISOString(),
      endpoint,
      params,
      success: response?.success,
      status: response?.status,
      duration: duration ? `${duration}ms` : undefined,
    };

    console.log('🔍 FMP API Call:', logData);
  }

  /**
   * Log API errors for debugging
   * @param endpoint - The endpoint that failed
   * @param params - The parameters that were passed
   * @param error - The error that occurred
   */
  static logApiError(endpoint: string, params: any, error: any): void {
    if (!this.isDevelopment && !this.isDebugEnabled) {
      return;
    }

    console.error('❌ FMP API Error:', {
      timestamp: new Date().toISOString(),
      endpoint,
      params,
      error: error?.message || error,
      stack: error?.stack,
    });
  }

  /**
   * Get comprehensive API usage statistics
   * @param fmp - The FMP client instance
   * @returns Detailed API statistics
   */
  static getApiStats(fmp: FMP): {
    totalEndpoints: number;
    totalMethods: number;
    categories: string[];
    methodCounts: Record<string, number>;
    estimatedApiCalls: number;
  } {
    const summary = FMPHelpers.getApiSummary(fmp);

    // Estimate API calls based on typical usage patterns
    const estimatedApiCalls = Object.values(summary.methodCounts).reduce(
      (total, count) => total + count * 2, // Assume 2 calls per method on average
      0,
    );

    return {
      ...summary,
      estimatedApiCalls,
    };
  }

  /**
   * Validate API key format and provide feedback
   * @param apiKey - The API key to validate
   * @returns Validation result with details
   */
  static validateApiKey(apiKey: string): {
    isValid: boolean;
    length: number;
    format: string;
    suggestions: string[];
  } {
    const length = apiKey?.length || 0;
    const format = apiKey?.match(/^[a-zA-Z0-9]+$/) ? 'alphanumeric' : 'invalid';
    const isValid = length >= 32 && format === 'alphanumeric';

    const suggestions: string[] = [];
    if (length < 32) {
      suggestions.push('API key should be at least 32 characters long');
    }
    if (format !== 'alphanumeric') {
      suggestions.push('API key should contain only letters and numbers');
    }
    if (!apiKey) {
      suggestions.push('API key is required');
    }

    return {
      isValid,
      length,
      format,
      suggestions,
    };
  }

  /**
   * Check API key environment variable
   * @returns Environment check result
   */
  static checkApiKeyEnvironment(): {
    hasEnvVar: boolean;
    envVarName: string;
    isValid: boolean;
    suggestions: string[];
  } {
    const envVarName = 'FMP_API_KEY';
    const apiKey = process.env[envVarName];
    const hasEnvVar = !!apiKey;
    const validation = this.validateApiKey(apiKey || '');

    const suggestions: string[] = [];
    if (!hasEnvVar) {
      suggestions.push(`Set ${envVarName} environment variable`);
      suggestions.push('Add to your .env file: FMP_API_KEY=your_api_key_here');
    } else if (!validation.isValid) {
      suggestions.push(...validation.suggestions);
    }

    return {
      hasEnvVar,
      envVarName,
      isValid: validation.isValid,
      suggestions,
    };
  }

  /**
   * Get performance metrics for API calls
   * @param fmp - The FMP client instance
   * @returns Performance information
   */
  static getPerformanceInfo(): {
    nodeVersion: string;
    platform: string;
    memoryUsage: NodeJS.MemoryUsage;
    uptime: number;
  } {
    return {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
    };
  }

  /**
   * Create a debug configuration object
   * @param fmp - The FMP client instance
   * @returns Debug configuration
   */
  static createDebugConfig(fmp: FMP): {
    apiStats: ReturnType<typeof FMPDebug.getApiStats>;
    envCheck: ReturnType<typeof FMPDebug.checkApiKeyEnvironment>;
    performance: ReturnType<typeof FMPDebug.getPerformanceInfo>;
    timestamp: string;
  } {
    return {
      apiStats: this.getApiStats(fmp),
      envCheck: this.checkApiKeyEnvironment(),
      performance: this.getPerformanceInfo(),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Print debug information to console
   * @param fmp - The FMP client instance
   */
  static printDebugInfo(fmp: FMP): void {
    if (!this.isDevelopment && !this.isDebugEnabled) {
      return;
    }

    const config = this.createDebugConfig(fmp);

    console.log('🔧 FMP Debug Information:');
    console.log('📊 API Stats:', config.apiStats);
    console.log('🔑 Environment Check:', config.envCheck);
    console.log('⚡ Performance:', config.performance);
    console.log('🕒 Timestamp:', config.timestamp);
  }

  /**
   * Enable debug mode programmatically
   */
  static enableDebugMode(): void {
    process.env.FMP_DEBUG = 'true';
    this.isDebugEnabled = true;
    console.log('🔧 FMP Debug mode enabled');
  }

  /**
   * Disable debug mode programmatically
   */
  static disableDebugMode(): void {
    process.env.FMP_DEBUG = 'false';
    this.isDebugEnabled = false;
    console.log('🔧 FMP Debug mode disabled');
  }

  /**
   * Check if debug mode is enabled
   * @returns True if debug mode is enabled
   */
  static isDebugMode(): boolean {
    return this.isDevelopment || this.isDebugEnabled;
  }

  /**
   * Create a debug wrapper for API calls
   * @param fmp - The FMP client instance
   * @returns FMP client with debug logging
   */
  static createDebugWrapper(fmp: FMP): FMP {
    if (!this.isDebugMode()) {
      return fmp;
    }

    // Create a proxy to intercept method calls
    return new Proxy(fmp, {
      get(target, prop) {
        const value = target[prop as keyof FMP];

        if (typeof value === 'object' && value !== null) {
          // Wrap endpoint objects
          return new Proxy(value, {
            get(endpointTarget, methodName) {
              const method = endpointTarget[methodName as keyof typeof endpointTarget];

              if (typeof method === 'function') {
                return async (...args: any[]) => {
                  const startTime = Date.now();
                  const endpoint = `${String(prop)}.${String(methodName)}`;

                  try {
                    FMPDebug.logApiCall(endpoint, args[0], null);
                    const result = await (method as (...args: any[]) => any).apply(
                      endpointTarget,
                      args,
                    );
                    const duration = Date.now() - startTime;
                    FMPDebug.logApiCall(endpoint, args[0], result, duration);
                    return result;
                  } catch (error) {
                    FMPDebug.logApiError(endpoint, args[0], error);
                    throw error;
                  }
                };
              }

              return method;
            },
          });
        }

        return value;
      },
    });
  }
}

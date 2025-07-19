import { FMPDebug } from '../../utils/debug';
import { FMP } from '../../fmp';

// Mock console methods
const originalConsole = { ...console };
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
};

describe('FMPDebug', () => {
  let fmp: FMP;

  beforeEach(() => {
    // Reset console mocks
    jest.clearAllMocks();
    console.log = mockConsole.log;
    console.error = mockConsole.error;

    // Create FMP instance for testing
    fmp = new FMP({ apiKey: 'testapikey123456789012345678901234567890' });

    // Reset environment variables
    delete process.env.NODE_ENV;
    delete process.env.FMP_DEBUG;

    // Reset static properties
    (FMPDebug as any).isDevelopment = false;
    (FMPDebug as any).isDebugEnabled = false;
  });

  afterEach(() => {
    // Restore original console
    console.log = originalConsole.log;
    console.error = originalConsole.error;
  });

  describe('logApiCall', () => {
    it('should log API call in development mode', () => {
      process.env.NODE_ENV = 'development';
      (FMPDebug as any).isDevelopment = true;

      const endpoint = '/test-endpoint';
      const params = { symbol: 'AAPL' };
      const response = { success: true, data: [] };
      const duration = 150;

      FMPDebug.logApiCall(endpoint, params, response, duration);

      expect(mockConsole.log).toHaveBeenCalledWith('🔍 FMP API Call:', {
        timestamp: expect.any(String),
        endpoint,
        params,
        success: true,
        status: undefined,
        duration: '150ms',
      });
    });

    it('should log API call when debug mode is enabled', () => {
      FMPDebug.enableDebugMode();

      const endpoint = '/test-endpoint';
      const params = { symbol: 'AAPL' };
      const response = { success: true, data: [] };

      FMPDebug.logApiCall(endpoint, params, response);

      expect(mockConsole.log).toHaveBeenCalledWith('🔍 FMP API Call:', {
        timestamp: expect.any(String),
        endpoint,
        params,
        success: true,
        status: undefined,
        duration: undefined,
      });
    });

    it('should not log API call when not in development or debug mode', () => {
      const endpoint = '/test-endpoint';
      const params = { symbol: 'AAPL' };
      const response = { success: true, data: [] };

      FMPDebug.logApiCall(endpoint, params, response);

      expect(mockConsole.log).not.toHaveBeenCalled();
    });
  });

  describe('logApiError', () => {
    it('should log API error in development mode', () => {
      process.env.NODE_ENV = 'development';
      (FMPDebug as any).isDevelopment = true;

      const endpoint = '/test-endpoint';
      const params = { symbol: 'AAPL' };
      const error = new Error('API Error');

      FMPDebug.logApiError(endpoint, params, error);

      expect(mockConsole.error).toHaveBeenCalledWith('❌ FMP API Error:', {
        timestamp: expect.any(String),
        endpoint,
        params,
        error: 'API Error',
        stack: error.stack,
      });
    });

    it('should log API error when debug mode is enabled', () => {
      FMPDebug.enableDebugMode();

      const endpoint = '/test-endpoint';
      const params = { symbol: 'AAPL' };
      const error = { message: 'API Error' };

      FMPDebug.logApiError(endpoint, params, error);

      expect(mockConsole.error).toHaveBeenCalledWith('❌ FMP API Error:', {
        timestamp: expect.any(String),
        endpoint,
        params,
        error: 'API Error',
        stack: undefined,
      });
    });

    it('should not log API error when not in development or debug mode', () => {
      const endpoint = '/test-endpoint';
      const params = { symbol: 'AAPL' };
      const error = new Error('API Error');

      FMPDebug.logApiError(endpoint, params, error);

      expect(mockConsole.error).not.toHaveBeenCalled();
    });
  });

  describe('getApiStats', () => {
    it('should return comprehensive API statistics', () => {
      const stats = FMPDebug.getApiStats(fmp);

      expect(stats).toHaveProperty('totalEndpoints');
      expect(stats).toHaveProperty('totalMethods');
      expect(stats).toHaveProperty('categories');
      expect(stats).toHaveProperty('methodCounts');
      expect(stats).toHaveProperty('estimatedApiCalls');

      expect(typeof stats.totalEndpoints).toBe('number');
      expect(typeof stats.totalMethods).toBe('number');
      expect(Array.isArray(stats.categories)).toBe(true);
      expect(typeof stats.methodCounts).toBe('object');
      expect(typeof stats.estimatedApiCalls).toBe('number');
    });
  });

  describe('validateApiKey', () => {
    it('should validate a valid API key', () => {
      const validKey = 'validapikey32characterslong123456789012345';
      const result = FMPDebug.validateApiKey(validKey);

      expect(result.isValid).toBe(true);
      expect(result.length).toBe(42);
      expect(result.format).toBe('alphanumeric');
      expect(result.suggestions).toEqual([]);
    });

    it('should reject API key that is too short', () => {
      const shortKey = 'short';
      const result = FMPDebug.validateApiKey(shortKey);

      expect(result.isValid).toBe(false);
      expect(result.length).toBe(5);
      expect(result.format).toBe('alphanumeric');
      expect(result.suggestions).toContain('API key should be at least 32 characters long');
    });

    it('should reject API key with invalid characters', () => {
      const invalidKey = 'invalid-key-with-hyphens-32-chars-long';
      const result = FMPDebug.validateApiKey(invalidKey);

      expect(result.isValid).toBe(false);
      expect(result.length).toBe(38);
      expect(result.format).toBe('invalid');
      expect(result.suggestions).toContain('API key should contain only letters and numbers');
    });

    it('should handle empty API key', () => {
      const result = FMPDebug.validateApiKey('');

      expect(result.isValid).toBe(false);
      expect(result.length).toBe(0);
      expect(result.format).toBe('invalid');
      expect(result.suggestions).toContain('API key should be at least 32 characters long');
      expect(result.suggestions).toContain('API key should contain only letters and numbers');
    });

    it('should handle null/undefined API key', () => {
      const result = FMPDebug.validateApiKey(null as any);

      expect(result.isValid).toBe(false);
      expect(result.length).toBe(0);
      expect(result.format).toBe('invalid');
    });
  });

  describe('checkApiKeyEnvironment', () => {
    it('should detect missing environment variable', () => {
      delete process.env.FMP_API_KEY;

      const result = FMPDebug.checkApiKeyEnvironment();

      expect(result.hasEnvVar).toBe(false);
      expect(result.envVarName).toBe('FMP_API_KEY');
      expect(result.isValid).toBe(false);
      expect(result.suggestions).toContain('Set FMP_API_KEY environment variable');
      expect(result.suggestions).toContain('Add to your .env file: FMP_API_KEY=your_api_key_here');
    });

    it('should detect invalid environment variable', () => {
      process.env.FMP_API_KEY = 'invalid';

      const result = FMPDebug.checkApiKeyEnvironment();

      expect(result.hasEnvVar).toBe(true);
      expect(result.envVarName).toBe('FMP_API_KEY');
      expect(result.isValid).toBe(false);
      expect(result.suggestions).toContain('API key should be at least 32 characters long');
    });

    it('should validate correct environment variable', () => {
      process.env.FMP_API_KEY = 'validapikey32characterslong123456789012345';

      const result = FMPDebug.checkApiKeyEnvironment();

      expect(result.hasEnvVar).toBe(true);
      expect(result.envVarName).toBe('FMP_API_KEY');
      expect(result.isValid).toBe(true);
      expect(result.suggestions).toEqual([]);
    });
  });

  describe('getPerformanceInfo', () => {
    it('should return performance information', () => {
      const info = FMPDebug.getPerformanceInfo();

      expect(info).toHaveProperty('nodeVersion');
      expect(info).toHaveProperty('platform');
      expect(info).toHaveProperty('memoryUsage');
      expect(info).toHaveProperty('uptime');

      expect(typeof info.nodeVersion).toBe('string');
      expect(typeof info.platform).toBe('string');
      expect(typeof info.memoryUsage).toBe('object');
      expect(typeof info.uptime).toBe('number');
    });
  });

  describe('createDebugConfig', () => {
    it('should create comprehensive debug configuration', () => {
      const config = FMPDebug.createDebugConfig(fmp);

      expect(config).toHaveProperty('apiStats');
      expect(config).toHaveProperty('envCheck');
      expect(config).toHaveProperty('performance');
      expect(config).toHaveProperty('timestamp');

      expect(typeof config.apiStats).toBe('object');
      expect(typeof config.envCheck).toBe('object');
      expect(typeof config.performance).toBe('object');
      expect(typeof config.timestamp).toBe('string');
    });
  });

  describe('printDebugInfo', () => {
    it('should print debug info in development mode', () => {
      process.env.NODE_ENV = 'development';
      (FMPDebug as any).isDevelopment = true;

      FMPDebug.printDebugInfo(fmp);

      expect(mockConsole.log).toHaveBeenCalledWith('🔧 FMP Debug Information:');
      expect(mockConsole.log).toHaveBeenCalledWith('📊 API Stats:', expect.any(Object));
      expect(mockConsole.log).toHaveBeenCalledWith('🔑 Environment Check:', expect.any(Object));
      expect(mockConsole.log).toHaveBeenCalledWith('⚡ Performance:', expect.any(Object));
      expect(mockConsole.log).toHaveBeenCalledWith('🕒 Timestamp:', expect.any(String));
    });

    it('should print debug info when debug mode is enabled', () => {
      FMPDebug.enableDebugMode();

      FMPDebug.printDebugInfo(fmp);

      expect(mockConsole.log).toHaveBeenCalledWith('🔧 FMP Debug Information:');
    });

    it('should not print debug info when not in development or debug mode', () => {
      FMPDebug.printDebugInfo(fmp);

      expect(mockConsole.log).not.toHaveBeenCalled();
    });
  });

  describe('enableDebugMode', () => {
    it('should enable debug mode', () => {
      FMPDebug.enableDebugMode();

      expect(process.env.FMP_DEBUG).toBe('true');
      expect(mockConsole.log).toHaveBeenCalledWith('🔧 FMP Debug mode enabled');
    });
  });

  describe('disableDebugMode', () => {
    it('should disable debug mode', () => {
      FMPDebug.disableDebugMode();

      expect(process.env.FMP_DEBUG).toBe('false');
      expect(mockConsole.log).toHaveBeenCalledWith('🔧 FMP Debug mode disabled');
    });
  });

  describe('isDebugMode', () => {
    it('should return true in development mode', () => {
      process.env.NODE_ENV = 'development';
      (FMPDebug as any).isDevelopment = true;

      expect(FMPDebug.isDebugMode()).toBe(true);
    });

    it('should return true when debug mode is enabled', () => {
      FMPDebug.enableDebugMode();

      expect(FMPDebug.isDebugMode()).toBe(true);
    });

    it('should return false when neither development nor debug mode is enabled', () => {
      expect(FMPDebug.isDebugMode()).toBe(false);
    });
  });

  describe('createDebugWrapper', () => {
    it('should return original client when debug mode is disabled', () => {
      const wrapper = FMPDebug.createDebugWrapper(fmp);

      expect(wrapper).toBe(fmp);
    });

    it('should return debug wrapper when debug mode is enabled', async () => {
      FMPDebug.enableDebugMode();

      const wrapper = FMPDebug.createDebugWrapper(fmp);

      expect(wrapper).not.toBe(fmp);
      expect(typeof wrapper.quote.getQuote).toBe('function');

      // Test that the wrapper logs API calls
      const mockResponse = {
        success: true,
        data: { symbol: 'AAPL', name: 'Apple Inc.', price: 150.0, changesPercentage: 1.5 } as any,
        error: null,
        status: 200,
      };
      jest.spyOn(fmp.quote, 'getQuote').mockResolvedValue(mockResponse);

      await wrapper.quote.getQuote({ symbol: 'AAPL' });

      expect(mockConsole.log).toHaveBeenCalledWith(
        '🔍 FMP API Call:',
        expect.objectContaining({
          endpoint: 'quote.getQuote',
          params: { symbol: 'AAPL' },
        }),
      );
    });

    it('should handle errors in debug wrapper', async () => {
      FMPDebug.enableDebugMode();

      const wrapper = FMPDebug.createDebugWrapper(fmp);
      const testError = new Error('Test error');

      jest.spyOn(fmp.quote, 'getQuote').mockRejectedValue(testError);

      await expect(wrapper.quote.getQuote({ symbol: 'AAPL' })).rejects.toThrow('Test error');

      expect(mockConsole.error).toHaveBeenCalledWith(
        '❌ FMP API Error:',
        expect.objectContaining({
          endpoint: 'quote.getQuote',
          params: { symbol: 'AAPL' },
          error: 'Test error',
        }),
      );
    });
  });
});

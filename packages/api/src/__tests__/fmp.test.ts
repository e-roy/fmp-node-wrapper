import { FMP } from '../fmp';
import { FMPClient } from '../client';
import { API_KEY } from './utils/test-setup';

// Mock the environment variable
const originalEnv = process.env.FMP_API_KEY;

describe('FMP Class', () => {
  beforeEach(() => {
    // Clear any existing API key
    delete process.env.FMP_API_KEY;
  });

  afterEach(() => {
    // Restore original environment
    if (originalEnv) {
      process.env.FMP_API_KEY = originalEnv;
    } else {
      delete process.env.FMP_API_KEY;
    }
  });

  describe('Constructor', () => {
    it('should create instance with explicit API key', () => {
      const fmp = new FMP({ apiKey: 'testapikey32characterslong123456789012345' });
      expect(fmp).toBeInstanceOf(FMP);
    });

    it('should create instance with environment variable', () => {
      process.env.FMP_API_KEY = 'envapikey32characterslong123456789012345';
      const fmp = new FMP();
      expect(fmp).toBeInstanceOf(FMP);
    });

    it('should create instance with partial config and environment variable', () => {
      process.env.FMP_API_KEY = 'envapikey32characterslong123456789012345';
      const fmp = new FMP({ timeout: 15000 });
      expect(fmp).toBeInstanceOf(FMP);
    });

    it('should throw error when no API key is provided', () => {
      expect(() => new FMP()).toThrow('FMP API key is required');
    });

    it('should throw error when empty API key is provided', () => {
      expect(() => new FMP({ apiKey: '' })).toThrow('FMP API key is required');
    });

    it('should throw error when invalid API key format is provided', () => {
      expect(() => new FMP({ apiKey: 'invalid' })).toThrow('Invalid API key format');
    });
  });
});

describe('FMP', () => {
  let fmp: FMP;

  beforeEach(() => {
    fmp = new FMP({
      apiKey: 'testapikey32characterslong123456789012345',
    });
  });

  it('should initialize with all endpoint modules', () => {
    expect(fmp.stock).toBeDefined();
    expect(fmp.financial).toBeDefined();
    expect(fmp.etf).toBeDefined();
    expect(fmp.mutualFund).toBeDefined();
    expect(fmp.economic).toBeDefined();
    expect(fmp.market).toBeDefined();
  });

  it('should provide access to underlying client', () => {
    const client = fmp.getClient();
    expect(client).toBeInstanceOf(FMPClient);
  });

  it('should have working stock endpoints', () => {
    expect(typeof fmp.company.getCompanyProfile).toBe('function');
  });

  it('should have working financial endpoints', () => {
    expect(typeof fmp.financial.getIncomeStatement).toBe('function');
    expect(typeof fmp.financial.getBalanceSheet).toBe('function');
    expect(typeof fmp.financial.getCashFlowStatement).toBe('function');
  });

  it('should have working market endpoints', () => {
    expect(typeof fmp.market.getMarketHours).toBe('function');
    expect(typeof fmp.market.getMarketPerformance).toBe('function');
    expect(typeof fmp.market.getGainers).toBe('function');
    expect(typeof fmp.market.getLosers).toBe('function');
  });

  describe('API Key Validation', () => {
    beforeEach(() => {
      // Ensure no environment variable is set for these tests
      delete process.env.FMP_API_KEY;
    });

    it('should throw error for empty API key', () => {
      expect(() => {
        new FMP({ apiKey: '' });
      }).toThrow('FMP API key is required');
    });

    it('should throw error for undefined API key', () => {
      expect(() => {
        new FMP({ apiKey: undefined as any });
      }).toThrow('FMP API key is required');
    });

    it('should throw error for null API key', () => {
      expect(() => {
        new FMP({ apiKey: null as any });
      }).toThrow('FMP API key is required');
    });

    it('should accept valid API key', () => {
      expect(() => {
        new FMP({ apiKey: 'validapikey32characterslong123456789012345' });
      }).not.toThrow();
    });
  });
});

describe('FMP API Smoke Test', () => {
  it('should have an API key set for integration tests', () => {
    if (!API_KEY) {
      console.log('⚠️  No FMP_API_KEY found - integration tests will be skipped');
      console.log(
        '   Set FMP_API_KEY in your .env file or environment variables to run integration tests',
      );
    }
    expect(typeof API_KEY).toBe('string');
    expect(API_KEY?.length || 0).toBeGreaterThan(0);
  });
});

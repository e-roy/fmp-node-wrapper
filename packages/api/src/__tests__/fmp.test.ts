import { FMP } from '../fmp';
import { FMPClient } from '../client';
import { API_KEY } from './utils/test-setup';

describe('FMP', () => {
  let fmp: FMP;

  beforeEach(() => {
    fmp = new FMP({
      apiKey: 'test-api-key',
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
    it('should throw error for empty API key', () => {
      expect(() => {
        new FMP({ apiKey: '' });
      }).toThrow('API key is required and must be a non-empty string');
    });

    it('should throw error for undefined API key', () => {
      expect(() => {
        new FMP({ apiKey: undefined as any });
      }).toThrow('API key is required and must be a non-empty string');
    });

    it('should throw error for null API key', () => {
      expect(() => {
        new FMP({ apiKey: null as any });
      }).toThrow('API key is required and must be a non-empty string');
    });

    it('should accept valid API key', () => {
      expect(() => {
        new FMP({ apiKey: 'valid-api-key' });
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

import {
  APIResponse,
  FMPConfig,
  SymbolParams,
  DateRangeParams,
  PaginationParams,
  PeriodParams,
  Period,
  Exchange,
} from '@fmp/types';
import { Quote } from '@fmp/types';

describe('Common Types', () => {
  describe('APIResponse', () => {
    it('should allow generic type parameter for success case', () => {
      const response: APIResponse<string> = {
        success: true,
        data: 'test data',
        error: null,
        status: 200,
      };

      expect(response.success).toBe(true);
      expect(response.data).toBe('test data');
      expect(response.error).toBeNull();
      expect(response.status).toBe(200);
    });

    it('should work with error case', () => {
      const response: APIResponse = {
        success: false,
        data: null,
        error: 'API Error',
        status: 400,
      };

      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.error).toBe('API Error');
      expect(response.status).toBe(400);
    });

    it('should work with unknown default type', () => {
      const response: APIResponse = {
        success: false,
        data: null,
        error: 'API Error',
        status: 400,
      };

      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.error).toBe('API Error');
      expect(response.status).toBe(400);
    });
  });

  describe('FMPConfig', () => {
    it('should require apiKey and allow optional properties', () => {
      const config: FMPConfig = {
        apiKey: 'testapikey123456789012345678901234567890',
        timeout: 5000,
      };

      expect(config.apiKey).toBe('testapikey123456789012345678901234567890');
      expect(config.timeout).toBe(5000);
    });

    it('should work with minimal config', () => {
      const config: FMPConfig = {
        apiKey: 'testapikey123456789012345678901234567890',
      };

      expect(config.apiKey).toBe('testapikey123456789012345678901234567890');
      expect(config.timeout).toBeUndefined();
    });
  });

  describe('Parameter Interfaces', () => {
    it('should validate SymbolParams', () => {
      const params: SymbolParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate DateRangeParams', () => {
      const params: DateRangeParams = {
        from: '2024-01-01',
        to: '2024-12-31',
      };

      expect(params.from).toBe('2024-01-01');
      expect(params.to).toBe('2024-12-31');
    });

    it('should validate PaginationParams', () => {
      const params: PaginationParams = {
        limit: 10,
        page: 1,
      };

      expect(params.limit).toBe(10);
      expect(params.page).toBe(1);
    });

    it('should validate PeriodParams', () => {
      const params: PeriodParams = {
        period: 'annual',
      };

      expect(params.period).toBe('annual');
    });
  });

  describe('Quote Interface', () => {
    it('should validate Quote structure', () => {
      const quote: Quote = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 150.25,
        changesPercentage: 1.45,
        change: 2.15,
        dayLow: 148.5,
        dayHigh: 152.0,
        yearLow: 120.0,
        yearHigh: 180.0,
        marketCap: 2500000000000,
        priceAvg50: 145.0,
        priceAvg200: 140.0,
        volume: 50000000,
        avgVolume: 45000000,
        exchange: 'NASDAQ',
        open: 149.0,
        previousClose: 148.1,
        eps: 6.15,
        pe: 24.43,
        earningsAnnouncement: '2024-01-25',
        sharesOutstanding: 15700000000,
        timestamp: 1704067200,
      };

      expect(quote.symbol).toBe('AAPL');
      expect(quote.price).toBe(150.25);
      expect(quote.change).toBe(2.15);
      expect(quote.changesPercentage).toBe(1.45);
    });
  });

  describe('Enums', () => {
    it('should validate Period enum', () => {
      expect(Period.ANNUAL).toBe('annual');
      expect(Period.QUARTER).toBe('quarter');
    });

    it('should validate Exchange enum', () => {
      expect(Exchange.NYSE).toBe('NYSE');
      expect(Exchange.NASDAQ).toBe('NASDAQ');
      expect(Exchange.AMEX).toBe('AMEX');
      expect(Exchange.LSE).toBe('LSE');
    });
  });
});

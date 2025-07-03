import {
  APIResponse,
  SuccessResponse,
  ErrorResponse,
  FMPConfig,
  SymbolParams,
  DateRangeParams,
  PaginationParams,
  PeriodParams,
  Quote,
  CompanyProfile,
  Period,
  Exchange,
  FMP_BASE_URL,
  FMP_BASE_URL_V4,
  FMP_STABLE_URL,
} from '../../types/common';

describe('Common Types', () => {
  describe('APIResponse', () => {
    it('should allow generic type parameter', () => {
      const response: APIResponse<string> = {
        success: true,
        data: 'test data',
        status: 200,
      };

      expect(response.success).toBe(true);
      expect(response.data).toBe('test data');
      expect(response.status).toBe(200);
    });

    it('should work with unknown default type', () => {
      const response: APIResponse = {
        success: false,
        error: 'API Error',
        status: 400,
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe('API Error');
      expect(response.status).toBe(400);
    });
  });

  describe('SuccessResponse', () => {
    it('should enforce success: true and required data', () => {
      const response: SuccessResponse<number[]> = {
        success: true,
        data: [1, 2, 3],
        status: 200,
      };

      expect(response.success).toBe(true);
      expect(response.data).toEqual([1, 2, 3]);
      expect(response.status).toBe(200);
    });
  });

  describe('ErrorResponse', () => {
    it('should enforce success: false and required error', () => {
      const response: ErrorResponse = {
        success: false,
        error: 'Not Found',
        status: 404,
      };

      expect(response.success).toBe(false);
      expect(response.error).toBe('Not Found');
      expect(response.status).toBe(404);
    });
  });

  describe('FMPConfig', () => {
    it('should require apiKey and allow optional properties', () => {
      const config: FMPConfig = {
        apiKey: 'test-api-key',
        baseURL: 'https://test.com',
        timeout: 5000,
      };

      expect(config.apiKey).toBe('test-api-key');
      expect(config.baseURL).toBe('https://test.com');
      expect(config.timeout).toBe(5000);
    });

    it('should work with minimal config', () => {
      const config: FMPConfig = {
        apiKey: 'test-api-key',
      };

      expect(config.apiKey).toBe('test-api-key');
      expect(config.baseURL).toBeUndefined();
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
        price: 150.25,
        change: 2.15,
        changePercent: 1.45,
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
      expect(quote.changePercent).toBe(1.45);
    });
  });

  describe('CompanyProfile Interface', () => {
    it('should validate CompanyProfile structure', () => {
      const profile: CompanyProfile = {
        symbol: 'AAPL',
        price: 150.25,
        beta: 1.25,
        volAvg: 45000000,
        marketCap: 2500000000000,
        lastDiv: 0.24,
        range: '120.00-180.00',
        changes: 2.15,
        companyName: 'Apple Inc.',
        currency: 'USD',
        cik: '0000320193',
        isin: 'US0378331005',
        cusip: '037833100',
        exchange: 'NASDAQ',
        exchangeShortName: 'NASDAQ',
        industry: 'Consumer Electronics',
        website: 'https://www.apple.com',
        description: 'Apple Inc. designs, manufactures, and markets smartphones...',
        ceo: 'Tim Cook',
        sector: 'Technology',
        country: 'US',
        fullTimeEmployees: '164000',
        phone: '+1 408-996-1010',
        address: 'One Apple Park Way',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014',
        dcfDiff: 5.25,
        dcf: 155.5,
        image: 'https://financialmodelingprep.com/image-stock/AAPL.png',
        ipoDate: '1980-12-12',
        defaultImage: false,
        isEtf: false,
        isActivelyTrading: true,
        isAdr: false,
        isFund: false,
      };

      expect(profile.symbol).toBe('AAPL');
      expect(profile.companyName).toBe('Apple Inc.');
      expect(profile.sector).toBe('Technology');
      expect(profile.isEtf).toBe(false);
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

  describe('Constants', () => {
    it('should validate API URLs', () => {
      expect(FMP_BASE_URL).toBe('https://financialmodelingprep.com/api/v3');
      expect(FMP_BASE_URL_V4).toBe('https://financialmodelingprep.com/api/v4');
      expect(FMP_STABLE_URL).toBe('https://financialmodelingprep.com/stable');
    });
  });
});

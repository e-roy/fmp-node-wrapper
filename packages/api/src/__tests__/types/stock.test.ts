import { StockQuote, StockSplit, StockDividend, MarketCap } from '@/types/stock';
import { HistoricalPriceData, HistoricalPriceResponse } from '@/types/quote';

describe('Stock Types', () => {
  describe('StockQuote Interface', () => {
    it('should validate stock quote structure', () => {
      const quote: StockQuote = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 150.25,
        change: 2.15,
        changesPercentage: 1.45,
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
      expect(quote.marketCap).toBe(2500000000000);
    });
  });

  describe('StockSplit Interface', () => {
    it('should validate stock split structure', () => {
      const split: StockSplit = {
        date: '2020-08-31',
        label: 'Aug 31, 20',
        numerator: 4,
        denominator: 1,
      };

      expect(split.date).toBe('2020-08-31');
      expect(split.numerator).toBe(4);
      expect(split.denominator).toBe(1);
    });
  });

  describe('StockDividend Interface', () => {
    it('should validate stock dividend structure', () => {
      const dividend: StockDividend = {
        date: '2024-01-15',
        label: 'Jan 15, 24',
        adjDividend: 0.24,
        dividend: 0.24,
        recordDate: '2024-01-08',
        paymentDate: '2024-02-15',
        declarationDate: '2024-01-02',
      };

      expect(dividend.date).toBe('2024-01-15');
      expect(dividend.dividend).toBe(0.24);
      expect(dividend.paymentDate).toBe('2024-02-15');
    });
  });

  describe('MarketCap Interface', () => {
    it('should validate market cap structure', () => {
      const marketCap: MarketCap = {
        symbol: 'AAPL',
        date: '2024-01-15',
        marketCap: 2500000000000,
      };

      expect(marketCap.symbol).toBe('AAPL');
      expect(marketCap.marketCap).toBe(2500000000000);
    });
  });

  describe('HistoricalPriceData Interface', () => {
    it('should validate historical price data structure', () => {
      const historicalData: HistoricalPriceData = {
        date: '2024-01-15',
        open: 150.0,
        high: 152.5,
        low: 149.5,
        close: 151.25,
        adjClose: 151.25,
        volume: 50000000,
        unadjustedVolume: 50000000,
        change: 1.25,
        changePercent: 0.83,
        vwap: 150.75,
        label: 'Jan 15, 24',
        changeOverTime: 0.0083,
      };

      expect(historicalData.date).toBe('2024-01-15');
      expect(historicalData.open).toBe(150.0);
      expect(historicalData.close).toBe(151.25);
      expect(historicalData.volume).toBe(50000000);
    });
  });

  describe('HistoricalPriceResponse Interface', () => {
    it('should validate historical price response structure', () => {
      const response: HistoricalPriceResponse = {
        symbol: 'AAPL',
        historical: [
          {
            date: '2024-01-15',
            open: 150.0,
            high: 152.5,
            low: 149.5,
            close: 151.25,
            adjClose: 151.25,
            volume: 50000000,
            unadjustedVolume: 50000000,
            change: 1.25,
            changePercent: 0.83,
            vwap: 150.75,
            label: 'Jan 15, 24',
            changeOverTime: 0.0083,
          },
        ],
      };

      expect(response.symbol).toBe('AAPL');
      expect(response.historical).toHaveLength(1);
      expect(response.historical[0].date).toBe('2024-01-15');
    });
  });
});

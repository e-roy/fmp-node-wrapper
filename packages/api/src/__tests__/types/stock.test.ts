import { StockList } from '@/types/list';
import {
  StockQuote,
  StockSplit,
  StockDividend,
  InsiderTrading,
  InstitutionalHolder,
  MutualFundHolder,
  MajorHolder,
  AnalystEstimate,
  PriceTarget,
  StockRating,
  StockGrade,
  SectorPerformance,
  MarketCap,
  StockQuoteParams,
  StockProfileParams,
  StockHistoricalPriceParams,
  StockMarketCapParams,
  StockEarningsCalendarParams,
  StockSplitsParams,
  StockDividendParams,
  StockInsiderTradingParams,
  StockInstitutionalHoldersParams,
  StockMutualFundHoldersParams,
  StockMajorHoldersParams,
  StockAnalystEstimatesParams,
  StockPriceTargetParams,
  StockRatingParams,
  StockGradeParams,
  StockSectorPerformanceParams,
  StockLosersParams,
  StockGainersParams,
  StockMostActiveParams,
} from '../../types/stock';

describe('Stock Types', () => {
  describe('StockQuote Interface', () => {
    it('should validate stock quote structure', () => {
      const quote: StockQuote = {
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

  describe('InsiderTrading Interface', () => {
    it('should validate insider trading structure', () => {
      const insiderTrading: InsiderTrading = {
        symbol: 'AAPL',
        companyName: 'Apple Inc.',
        cik: '0000320193',
        ownerName: 'Tim Cook',
        ownerCik: '0001234567',
        ownerTitle: 'CEO',
        transactionDate: '2024-01-15',
        transactionCode: 'P',
        transactionAmount: 1000,
        transactionPrice: 150.25,
        transactionAcquiredDisposed: 'A',
        postTransactionAmount: 5000,
        secLink: 'https://www.sec.gov/Archives/edgar/data/...',
      };

      expect(insiderTrading.symbol).toBe('AAPL');
      expect(insiderTrading.companyName).toBe('Apple Inc.');
      expect(insiderTrading.transactionAmount).toBe(1000);
    });
  });

  describe('InstitutionalHolder Interface', () => {
    it('should validate institutional holder structure', () => {
      const holder: InstitutionalHolder = {
        holder: 'Vanguard Group Inc',
        shares: 1000000000,
        dateReported: '2024-01-15',
        change: 50000000,
        weightPercent: 6.37,
      };

      expect(holder.holder).toBe('Vanguard Group Inc');
      expect(holder.shares).toBe(1000000000);
      expect(holder.weightPercent).toBe(6.37);
    });
  });

  describe('MutualFundHolder Interface', () => {
    it('should validate mutual fund holder structure', () => {
      const holder: MutualFundHolder = {
        holder: 'Fidelity Contrafund',
        shares: 500000000,
        dateReported: '2024-01-15',
        change: 25000000,
        weightPercent: 3.18,
      };

      expect(holder.holder).toBe('Fidelity Contrafund');
      expect(holder.shares).toBe(500000000);
      expect(holder.weightPercent).toBe(3.18);
    });
  });

  describe('MajorHolder Interface', () => {
    it('should validate major holder structure', () => {
      const holder: MajorHolder = {
        holder: 'BlackRock Inc',
        shares: 800000000,
        dateReported: '2024-01-15',
        change: 40000000,
        weightPercent: 5.1,
      };

      expect(holder.holder).toBe('BlackRock Inc');
      expect(holder.shares).toBe(800000000);
      expect(holder.weightPercent).toBe(5.1);
    });
  });

  describe('AnalystEstimate Interface', () => {
    it('should validate analyst estimate structure', () => {
      const estimate: AnalystEstimate = {
        symbol: 'AAPL',
        date: '2024-01-25',
        estimatedRevenueLow: 115000000000,
        estimatedRevenueHigh: 125000000000,
        estimatedRevenueAvg: 120000000000,
        estimatedEbitdaLow: 35000000000,
        estimatedEbitdaHigh: 40000000000,
        estimatedEbitdaAvg: 37500000000,
        estimatedEbitLow: 32000000000,
        estimatedEbitHigh: 37000000000,
        estimatedEbitAvg: 34500000000,
        estimatedNetIncomeLow: 28000000000,
        estimatedNetIncomeHigh: 32000000000,
        estimatedNetIncomeAvg: 30000000000,
        estimatedSgaExpenseLow: 8000000000,
        estimatedSgaExpenseHigh: 9000000000,
        estimatedSgaExpenseAvg: 8500000000,
        estimatedEpsAvg: 2.1,
        estimatedEpsHigh: 2.25,
        estimatedEpsLow: 1.95,
        numberAnalystEstimatedRevenue: 25,
        numberAnalystsEstimatedEps: 30,
      };

      expect(estimate.symbol).toBe('AAPL');
      expect(estimate.estimatedRevenueAvg).toBe(120000000000);
      expect(estimate.estimatedEpsAvg).toBe(2.1);
    });
  });

  describe('PriceTarget Interface', () => {
    it('should validate price target structure', () => {
      const priceTarget: PriceTarget = {
        symbol: 'AAPL',
        targetMean: 175.5,
        targetMedian: 175.0,
        targetHigh: 200.0,
        targetLow: 150.0,
        targetCount: 25,
      };

      expect(priceTarget.symbol).toBe('AAPL');
      expect(priceTarget.targetMean).toBe(175.5);
      expect(priceTarget.targetCount).toBe(25);
    });
  });

  describe('StockRating Interface', () => {
    it('should validate stock rating structure', () => {
      const rating: StockRating = {
        symbol: 'AAPL',
        date: '2024-01-15',
        rating: 'Buy',
        ratingScore: 85,
        ratingRecommendation: 'Strong Buy',
        ratingDetailsDCFScore: 80,
        ratingDetailsDCFRecommendation: 'Buy',
        ratingDetailsROEScore: 90,
        ratingDetailsROERecommendation: 'Strong Buy',
        ratingDetailsROAScore: 85,
        ratingDetailsROARecommendation: 'Buy',
        ratingDetailsDEScore: 95,
        ratingDetailsDERecommendation: 'Strong Buy',
        ratingDetailsPEScore: 75,
        ratingDetailsPERecommendation: 'Hold',
        ratingDetailsPBScore: 80,
        ratingDetailsPBRecommendation: 'Buy',
      };

      expect(rating.symbol).toBe('AAPL');
      expect(rating.rating).toBe('Buy');
      expect(rating.ratingScore).toBe(85);
    });
  });

  describe('StockGrade Interface', () => {
    it('should validate stock grade structure', () => {
      const grade: StockGrade = {
        symbol: 'AAPL',
        date: '2024-01-15',
        gradingCompany: 'S&P Global',
        previousGrade: 'A+',
        newGrade: 'A+',
        grade: 'A+',
      };

      expect(grade.symbol).toBe('AAPL');
      expect(grade.gradingCompany).toBe('S&P Global');
      expect(grade.grade).toBe('A+');
    });
  });

  describe('SectorPerformance Interface', () => {
    it('should validate sector performance structure', () => {
      const performance: SectorPerformance = {
        sector: 'Technology',
        changesPercentage: 2.5,
      };

      expect(performance.sector).toBe('Technology');
      expect(performance.changesPercentage).toBe(2.5);
    });
  });

  describe('StockList Interface', () => {
    it('should validate stock list structure', () => {
      const stock: StockList = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        currency: 'USD',
        stockExchange: 'NASDAQ',
        exchangeShortName: 'NASDAQ',
      };

      expect(stock.symbol).toBe('AAPL');
      expect(stock.name).toBe('Apple Inc.');
      expect(stock.currency).toBe('USD');
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

  describe('Parameter Interfaces', () => {
    it('should validate StockQuoteParams', () => {
      const params: StockQuoteParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockProfileParams', () => {
      const params: StockProfileParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockHistoricalPriceParams', () => {
      const params: StockHistoricalPriceParams = {
        symbol: 'AAPL',
        from: '2024-01-01',
        to: '2024-12-31',
        timeseries: 1,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.from).toBe('2024-01-01');
      expect(params.to).toBe('2024-12-31');
      expect(params.timeseries).toBe(1);
    });

    it('should validate StockMarketCapParams', () => {
      const params: StockMarketCapParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockEarningsCalendarParams', () => {
      const params: StockEarningsCalendarParams = {
        from: '2024-01-01',
        to: '2024-12-31',
      };

      expect(params.from).toBe('2024-01-01');
      expect(params.to).toBe('2024-12-31');
    });

    it('should validate StockSplitsParams', () => {
      const params: StockSplitsParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockDividendParams', () => {
      const params: StockDividendParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockInsiderTradingParams', () => {
      const params: StockInsiderTradingParams = {
        symbol: 'AAPL',
        limit: 10,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.limit).toBe(10);
    });

    it('should validate StockInstitutionalHoldersParams', () => {
      const params: StockInstitutionalHoldersParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockMutualFundHoldersParams', () => {
      const params: StockMutualFundHoldersParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockMajorHoldersParams', () => {
      const params: StockMajorHoldersParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockAnalystEstimatesParams', () => {
      const params: StockAnalystEstimatesParams = {
        symbol: 'AAPL',
        limit: 10,
      };

      expect(params.symbol).toBe('AAPL');
      expect(params.limit).toBe(10);
    });

    it('should validate StockPriceTargetParams', () => {
      const params: StockPriceTargetParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockRatingParams', () => {
      const params: StockRatingParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockGradeParams', () => {
      const params: StockGradeParams = {
        symbol: 'AAPL',
      };

      expect(params.symbol).toBe('AAPL');
    });

    it('should validate StockSectorPerformanceParams', () => {
      const params: StockSectorPerformanceParams = {};

      expect(params).toEqual({});
    });

    it('should validate StockLosersParams', () => {
      const params: StockLosersParams = {};

      expect(params).toEqual({});
    });

    it('should validate StockGainersParams', () => {
      const params: StockGainersParams = {};

      expect(params).toEqual({});
    });

    it('should validate StockMostActiveParams', () => {
      const params: StockMostActiveParams = {};

      expect(params).toEqual({});
    });
  });
});

// Data-driven registry of live-API test cases.
//
// Each entry calls one endpoint method with curated inputs (lifted from
// scripts/test-endpoint.ts) and names the schema + payload kind to validate
// against. Mark `planLocked: true` for endpoints confirmed unavailable on the
// current FMP plan so default runs skip them (see --include-locked).

import { z } from 'zod';
import {
  // quote
  QuoteSchema,
  HistoricalPriceResponseSchema,
  IntradayPriceSchema,
  // stock
  MarketCapSchema,
  StockSplitResponseSchema,
  StockDividendResponseSchema,
  StockRealTimePriceSchema,
  StockRealTimePriceFullSchema,
  // market
  MarketHoursSchema,
  MarketPerformanceSchema,
  MarketSectorPerformanceSchema,
  MarketIndexSchema,
  // financial
  IncomeStatementSchema,
  BalanceSheetSchema,
  CashFlowStatementSchema,
  KeyMetricsSchema,
  FinancialRatiosSchema,
  EnterpriseValueSchema,
  CashflowGrowthSchema,
  IncomeGrowthSchema,
  BalanceSheetGrowthSchema,
  FinancialGrowthSchema,
  EarningsHistoricalSchema,
  EarningsSurprisesSchema,
  FinancialScoresSchema,
  KeyMetricsTTMSchema,
  FinancialRatiosTTMSchema,
  RevenueProductSegmentationSchema,
  RevenueGeographicSegmentationSchema,
  // calendar
  EarningsCalendarSchema,
  EarningsConfirmedSchema,
  DividendsCalendarSchema,
  EconomicsCalendarSchema,
  IPOCalendarSchema,
  SplitsCalendarSchema,
  // company
  CompanyProfileSchema,
  ExecutiveCompensationSchema,
  CompanyNotesSchema,
  HistoricalEmployeeCountSchema,
  SharesFloatSchema,
  HistoricalSharesFloatSchema,
  EarningsCallTranscriptSchema,
  CompanyTranscriptDataSchema,
  StockPeerSchema,
  // economic
  TreasuryRateSchema,
  EconomicIndicatorSchema,
  // etf
  ETFHoldingDatesSchema,
  ETFHoldingSchema,
  ETFHolderSchema,
  ETFProfileSchema,
  ETFWeightingSchema,
  ETFCountryWeightingSchema,
  ETFStockExposureSchema,
  // insider
  InsiderTradingRSSResponseSchema,
  InsiderTradingSearchResponseSchema,
  TransactionTypeRecordSchema,
  InsidersBySymbolResponseSchema,
  InsiderTradeStatisticsResponseSchema,
  CikMapperResponseSchema,
  CikMapperBySymbolResponseSchema,
  BeneficialOwnershipResponseSchema,
  FailToDeliverResponseSchema,
  // institutional
  Form13FResponseSchema,
  InstitutionalHolderResponseSchema,
  // list
  StockListSchema,
  ETFListSchema,
  CryptoListSchema,
  ForexListSchema,
  AvailableIndexesListSchema,
  // mutual-fund
  MutualFundHoldingSchema,
  // news
  ArticleSchema,
  NewsSchema,
  // screener
  ScreenerSchema,
  AvailableExchangesSchema,
  AvailableSectorsSchema,
  AvailableIndustriesSchema,
  AvailableCountriesSchema,
  // search
  SearchResultSchema,
  // analyst
  AnalystEstimateSchema,
  PriceTargetConsensusSchema,
  PriceTargetSummarySchema,
  StockGradeSchema,
  GradesConsensusSchema,
  // valuation
  DCFValuationSchema,
  CompanyRatingSchema,
  // technical
  TechnicalIndicatorSchema,
  // sec
  RSSFeedItemSchema,
  RSSFeedAllItemSchema,
  RSSFeedV3ItemSchema,
  RSSFeed8KItemSchema,
  SECFilingSchema,
  IndustryClassificationSchema,
  IndustryClassificationCodeSchema,
  // senate-house
  SenateTradingResponseSchema,
  HouseTradingResponseSchema,
  SenateHouseTradingByNameResponseSchema,
} from 'fmp-node-types';
import type { FMP } from '../../src/fmp';

export type Category =
  | 'quote'
  | 'stock'
  | 'financial'
  | 'market'
  | 'calendar'
  | 'company'
  | 'economic'
  | 'etf'
  | 'insider'
  | 'institutional'
  | 'list'
  | 'mutual-fund'
  | 'news'
  | 'screener'
  | 'search'
  | 'analyst'
  | 'valuation'
  | 'technical'
  | 'sec'
  | 'senate-house';

export interface LiveCase {
  category: Category;
  /** Human label, e.g. 'getQuote(AAPL)'. */
  name: string;
  /** Canonical schema for one record. */
  schema: z.ZodTypeAny;
  /** 'object' => validate the payload; 'array' => validate a sample of elements. */
  kind: 'object' | 'array';
  /** Performs the live call; returns the APIResponse. */
  call: (fmp: FMP) => Promise<{ success: boolean; data: unknown; error: string | null; status: number }>;
  /** Skip by default (known plan-locked); run only with --include-locked. */
  planLocked?: boolean;
}

const RANGE = { from: '2024-01-01', to: '2024-01-31' };

export const manifest: LiveCase[] = [
  // ---- quote ----
  { category: 'quote', name: 'getQuote(AAPL)', schema: QuoteSchema, kind: 'object', call: (fmp) => fmp.quote.getQuote('AAPL') },
  { category: 'quote', name: 'getQuotes([AAPL,GOOGL])', schema: QuoteSchema, kind: 'array', call: (fmp) => fmp.quote.getQuotes(['AAPL', 'GOOGL']) },
  { category: 'quote', name: 'getHistoricalPrice(AAPL)', schema: HistoricalPriceResponseSchema, kind: 'object', call: (fmp) => fmp.quote.getHistoricalPrice({ symbol: 'AAPL', ...RANGE }) },
  { category: 'quote', name: 'getIntraday(AAPL,5min)', schema: IntradayPriceSchema, kind: 'array', call: (fmp) => fmp.quote.getIntraday({ symbol: 'AAPL', interval: '5min', from: '2024-01-02', to: '2024-01-03' }) },

  // ---- stock ----
  { category: 'stock', name: 'getMarketCap(AAPL)', schema: MarketCapSchema, kind: 'object', call: (fmp) => fmp.stock.getMarketCap('AAPL') },
  { category: 'stock', name: 'getStockSplits(AAPL)', schema: StockSplitResponseSchema, kind: 'object', call: (fmp) => fmp.stock.getStockSplits('AAPL') },
  { category: 'stock', name: 'getDividendHistory(AAPL)', schema: StockDividendResponseSchema, kind: 'object', call: (fmp) => fmp.stock.getDividendHistory('AAPL') },
  { category: 'stock', name: 'getRealTimePrice([AAPL,MSFT])', schema: StockRealTimePriceSchema, kind: 'array', call: (fmp) => fmp.stock.getRealTimePrice(['AAPL', 'MSFT']) },
  { category: 'stock', name: 'getRealTimePriceForMultipleStocks([AAPL,MSFT])', schema: StockRealTimePriceFullSchema, kind: 'array', call: (fmp) => fmp.stock.getRealTimePriceForMultipleStocks(['AAPL', 'MSFT']) },

  // ---- market ----
  { category: 'market', name: 'getMarketHours()', schema: MarketHoursSchema, kind: 'object', call: (fmp) => fmp.market.getMarketHours() },
  { category: 'market', name: 'getMarketPerformance()', schema: MarketIndexSchema, kind: 'array', call: (fmp) => fmp.market.getMarketPerformance() },
  { category: 'market', name: 'getGainers()', schema: MarketPerformanceSchema, kind: 'array', call: (fmp) => fmp.market.getGainers() },
  { category: 'market', name: 'getLosers()', schema: MarketPerformanceSchema, kind: 'array', call: (fmp) => fmp.market.getLosers() },
  { category: 'market', name: 'getMostActive()', schema: MarketPerformanceSchema, kind: 'array', call: (fmp) => fmp.market.getMostActive() },
  { category: 'market', name: 'getSectorPerformance()', schema: MarketSectorPerformanceSchema, kind: 'array', call: (fmp) => fmp.market.getSectorPerformance() },
  { category: 'market', name: 'getMarketIndex()', schema: MarketIndexSchema, kind: 'array', call: (fmp) => fmp.market.getMarketIndex() },

  // ---- financial ----
  { category: 'financial', name: 'getIncomeStatement(AAPL,annual,2)', schema: IncomeStatementSchema, kind: 'array', call: (fmp) => fmp.financial.getIncomeStatement({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getBalanceSheet(AAPL,annual,2)', schema: BalanceSheetSchema, kind: 'array', call: (fmp) => fmp.financial.getBalanceSheet({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getCashFlowStatement(AAPL,annual,2)', schema: CashFlowStatementSchema, kind: 'array', call: (fmp) => fmp.financial.getCashFlowStatement({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getKeyMetrics(AAPL,annual,2)', schema: KeyMetricsSchema, kind: 'array', call: (fmp) => fmp.financial.getKeyMetrics({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getFinancialRatios(AAPL,annual,2)', schema: FinancialRatiosSchema, kind: 'array', call: (fmp) => fmp.financial.getFinancialRatios({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getEnterpriseValue(AAPL,annual,2)', schema: EnterpriseValueSchema, kind: 'array', call: (fmp) => fmp.financial.getEnterpriseValue({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getCashflowGrowth(AAPL,annual,2)', schema: CashflowGrowthSchema, kind: 'array', call: (fmp) => fmp.financial.getCashflowGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getIncomeGrowth(AAPL,annual,2)', schema: IncomeGrowthSchema, kind: 'array', call: (fmp) => fmp.financial.getIncomeGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getBalanceSheetGrowth(AAPL,annual,2)', schema: BalanceSheetGrowthSchema, kind: 'array', call: (fmp) => fmp.financial.getBalanceSheetGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getFinancialGrowth(AAPL,annual,2)', schema: FinancialGrowthSchema, kind: 'array', call: (fmp) => fmp.financial.getFinancialGrowth({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'financial', name: 'getEarningsHistorical(AAPL,2)', schema: EarningsHistoricalSchema, kind: 'array', call: (fmp) => fmp.financial.getEarningsHistorical({ symbol: 'AAPL', limit: 2 }) },
  { category: 'financial', name: 'getEarningsSurprises(AAPL)', schema: EarningsSurprisesSchema, kind: 'array', call: (fmp) => fmp.financial.getEarningsSurprises('AAPL') },
  { category: 'financial', name: 'getFinancialScores(AAPL)', schema: FinancialScoresSchema, kind: 'object', call: (fmp) => fmp.financial.getFinancialScores({ symbol: 'AAPL' }) },
  { category: 'financial', name: 'getKeyMetricsTTM(AAPL)', schema: KeyMetricsTTMSchema, kind: 'object', call: (fmp) => fmp.financial.getKeyMetricsTTM({ symbol: 'AAPL' }) },
  { category: 'financial', name: 'getFinancialRatiosTTM(AAPL)', schema: FinancialRatiosTTMSchema, kind: 'object', call: (fmp) => fmp.financial.getFinancialRatiosTTM({ symbol: 'AAPL' }) },
  { category: 'financial', name: 'getRevenueProductSegmentation(AAPL)', schema: RevenueProductSegmentationSchema, kind: 'array', call: (fmp) => fmp.financial.getRevenueProductSegmentation({ symbol: 'AAPL' }) },
  { category: 'financial', name: 'getRevenueGeographicSegmentation(AAPL)', schema: RevenueGeographicSegmentationSchema, kind: 'array', call: (fmp) => fmp.financial.getRevenueGeographicSegmentation({ symbol: 'AAPL' }) },

  // ---- calendar ----
  { category: 'calendar', name: 'getEarningsCalendar()', schema: EarningsCalendarSchema, kind: 'array', call: (fmp) => fmp.calendar.getEarningsCalendar({ from: '2024-01-15', to: '2024-01-21' }) },
  { category: 'calendar', name: 'getEarningsConfirmed()', schema: EarningsConfirmedSchema, kind: 'array', call: (fmp) => fmp.calendar.getEarningsConfirmed(RANGE) },
  { category: 'calendar', name: 'getDividendsCalendar()', schema: DividendsCalendarSchema, kind: 'array', call: (fmp) => fmp.calendar.getDividendsCalendar(RANGE) },
  { category: 'calendar', name: 'getEconomicsCalendar()', schema: EconomicsCalendarSchema, kind: 'array', call: (fmp) => fmp.calendar.getEconomicsCalendar(RANGE) },
  { category: 'calendar', name: 'getIPOCalendar()', schema: IPOCalendarSchema, kind: 'array', call: (fmp) => fmp.calendar.getIPOCalendar(RANGE) },
  { category: 'calendar', name: 'getSplitsCalendar()', schema: SplitsCalendarSchema, kind: 'array', call: (fmp) => fmp.calendar.getSplitsCalendar(RANGE) },

  // ---- company ----
  { category: 'company', name: 'getCompanyProfile(AAPL)', schema: CompanyProfileSchema, kind: 'object', call: (fmp) => fmp.company.getCompanyProfile('AAPL') },
  { category: 'company', name: 'getExecutiveCompensation(AAPL)', schema: ExecutiveCompensationSchema, kind: 'array', call: (fmp) => fmp.company.getExecutiveCompensation('AAPL') },
  { category: 'company', name: 'getCompanyNotes(AAPL)', schema: CompanyNotesSchema, kind: 'array', call: (fmp) => fmp.company.getCompanyNotes('AAPL') },
  { category: 'company', name: 'getHistoricalEmployeeCount(AAPL)', schema: HistoricalEmployeeCountSchema, kind: 'array', call: (fmp) => fmp.company.getHistoricalEmployeeCount('AAPL') },
  { category: 'company', name: 'getSharesFloat(AAPL)', schema: SharesFloatSchema, kind: 'object', call: (fmp) => fmp.company.getSharesFloat('AAPL') },
  { category: 'company', name: 'getHistoricalSharesFloat(AAPL)', schema: HistoricalSharesFloatSchema, kind: 'array', call: (fmp) => fmp.company.getHistoricalSharesFloat('AAPL') },
  { category: 'company', name: 'getEarningsCallTranscript(AAPL,2020,3)', schema: EarningsCallTranscriptSchema, kind: 'object', call: (fmp) => fmp.company.getEarningsCallTranscript({ symbol: 'AAPL', year: 2020, quarter: 3 }) },
  { category: 'company', name: 'getCompanyTranscriptData(AAPL)', schema: CompanyTranscriptDataSchema, kind: 'array', call: (fmp) => fmp.company.getCompanyTranscriptData('AAPL') },
  { category: 'company', name: 'getStockPeers(AAPL)', schema: StockPeerSchema, kind: 'array', call: (fmp) => fmp.company.getStockPeers('AAPL') },

  // ---- economic ----
  { category: 'economic', name: 'getTreasuryRates()', schema: TreasuryRateSchema, kind: 'array', call: (fmp) => fmp.economic.getTreasuryRates({ from: '2024-01-01', to: '2024-12-31' }) },
  { category: 'economic', name: 'getEconomicIndicators(CPI)', schema: EconomicIndicatorSchema, kind: 'array', call: (fmp) => fmp.economic.getEconomicIndicators({ name: 'CPI', from: '2024-01-01', to: '2024-12-31' }) },

  // ---- etf ----
  { category: 'etf', name: 'getHoldingDates(SPY)', schema: ETFHoldingDatesSchema, kind: 'array', call: (fmp) => fmp.etf.getHoldingDates('SPY') },
  { category: 'etf', name: 'getHoldings(SPY)', schema: ETFHoldingSchema, kind: 'array', call: (fmp) => fmp.etf.getHoldings({ symbol: 'SPY', date: '2023-09-30' }) },
  { category: 'etf', name: 'getHolder(SPY)', schema: ETFHolderSchema, kind: 'array', call: (fmp) => fmp.etf.getHolder('SPY') },
  { category: 'etf', name: 'getProfile(SPY)', schema: ETFProfileSchema, kind: 'object', call: (fmp) => fmp.etf.getProfile('SPY') },
  { category: 'etf', name: 'getSectorWeighting(SPY)', schema: ETFWeightingSchema, kind: 'array', call: (fmp) => fmp.etf.getSectorWeighting('SPY') },
  { category: 'etf', name: 'getCountryWeighting(SPY)', schema: ETFCountryWeightingSchema, kind: 'array', call: (fmp) => fmp.etf.getCountryWeighting('SPY') },
  { category: 'etf', name: 'getStockExposure(SPY)', schema: ETFStockExposureSchema, kind: 'array', call: (fmp) => fmp.etf.getStockExposure('SPY') },

  // ---- insider ----
  { category: 'insider', name: 'getInsiderTradingRSS()', schema: InsiderTradingRSSResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsiderTradingRSS({ page: 0, limit: 10 }) },
  { category: 'insider', name: 'searchInsiderTrading(AAPL)', schema: InsiderTradingSearchResponseSchema, kind: 'array', call: (fmp) => fmp.insider.searchInsiderTrading({ symbol: 'AAPL', page: 0, limit: 10 }) },
  { category: 'insider', name: 'getTransactionTypes()', schema: TransactionTypeRecordSchema, kind: 'array', call: (fmp) => fmp.insider.getTransactionTypes() },
  { category: 'insider', name: 'getInsidersBySymbol(AAPL)', schema: InsidersBySymbolResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsidersBySymbol({ symbol: 'AAPL' }) },
  { category: 'insider', name: 'getInsiderTradeStatistics(AAPL)', schema: InsiderTradeStatisticsResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsiderTradeStatistics({ symbol: 'AAPL' }) },
  { category: 'insider', name: 'getCikMapper()', schema: CikMapperResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getCikMapper({ page: 0 }) },
  { category: 'insider', name: 'getCikMapperByName(zuckerberg)', schema: CikMapperResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getCikMapperByName({ name: 'zuckerberg', page: 0 }) },
  { category: 'insider', name: 'getCikMapperBySymbol(MSFT)', schema: CikMapperBySymbolResponseSchema, kind: 'object', call: (fmp) => fmp.insider.getCikMapperBySymbol({ symbol: 'MSFT' }) },
  { category: 'insider', name: 'getBeneficialOwnership(AAPL)', schema: BeneficialOwnershipResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getBeneficialOwnership({ symbol: 'AAPL', limit: 10 }) },
  { category: 'insider', name: 'getFailToDeliver(GE)', schema: FailToDeliverResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getFailToDeliver({ symbol: 'GE', page: 0 }) },
  { category: 'insider', name: 'getInsiderTradesBySymbol(AAPL)', schema: InsiderTradingSearchResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsiderTradesBySymbol('AAPL') },
  { category: 'insider', name: 'getInsiderTradesByType(P-Purchase)', schema: InsiderTradingSearchResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsiderTradesByType('P-Purchase') },
  { category: 'insider', name: 'getInsiderTradesByReportingCik', schema: InsiderTradingSearchResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsiderTradesByReportingCik('0001767094') },
  { category: 'insider', name: 'getInsiderTradesByCompanyCik', schema: InsiderTradingSearchResponseSchema, kind: 'array', call: (fmp) => fmp.insider.getInsiderTradesByCompanyCik('0000320193') },

  // ---- institutional ----
  { category: 'institutional', name: 'getForm13F(cik,date)', schema: Form13FResponseSchema, kind: 'array', call: (fmp) => fmp.institutional.getForm13F({ cik: '0001388838', date: '2021-09-30' }) },
  { category: 'institutional', name: 'getForm13FDates(cik)', schema: z.string(), kind: 'array', call: (fmp) => fmp.institutional.getForm13FDates({ cik: '0001067983' }) },
  { category: 'institutional', name: 'getInstitutionalHolders(AAPL)', schema: InstitutionalHolderResponseSchema, kind: 'array', call: (fmp) => fmp.institutional.getInstitutionalHolders({ symbol: 'AAPL' }) },

  // ---- list ----
  { category: 'list', name: 'getStockList()', schema: StockListSchema, kind: 'array', call: (fmp) => fmp.list.getStockList() },
  { category: 'list', name: 'getETFList()', schema: ETFListSchema, kind: 'array', call: (fmp) => fmp.list.getETFList() },
  { category: 'list', name: 'getCryptoList()', schema: CryptoListSchema, kind: 'array', call: (fmp) => fmp.list.getCryptoList() },
  { category: 'list', name: 'getForexList()', schema: ForexListSchema, kind: 'array', call: (fmp) => fmp.list.getForexList() },
  { category: 'list', name: 'getAvailableIndexes()', schema: AvailableIndexesListSchema, kind: 'array', call: (fmp) => fmp.list.getAvailableIndexes() },

  // ---- mutual-fund ----
  { category: 'mutual-fund', name: 'getHolders(AAPL)', schema: MutualFundHoldingSchema, kind: 'array', call: (fmp) => fmp.mutualFund.getHolders('AAPL') },

  // ---- news ----
  { category: 'news', name: 'getArticles()', schema: ArticleSchema, kind: 'array', call: (fmp) => fmp.news.getArticles({ page: 0, limit: 10 }) },
  { category: 'news', name: 'getStockNews()', schema: NewsSchema, kind: 'array', call: (fmp) => fmp.news.getStockNews({ from: '2025-07-01', to: '2025-07-31', page: 0, limit: 10 }) },
  { category: 'news', name: 'getCryptoNews()', schema: NewsSchema, kind: 'array', call: (fmp) => fmp.news.getCryptoNews({ from: '2025-07-01', to: '2025-07-31', page: 0, limit: 10 }) },
  { category: 'news', name: 'getForexNews()', schema: NewsSchema, kind: 'array', call: (fmp) => fmp.news.getForexNews({ from: '2025-07-01', to: '2025-07-31', page: 0, limit: 10 }) },
  { category: 'news', name: 'getStockNewsBySymbol([TSLA,GOOGL])', schema: NewsSchema, kind: 'array', call: (fmp) => fmp.news.getStockNewsBySymbol({ symbols: ['TSLA', 'GOOGL'], from: '2025-07-01', to: '2025-07-31', page: 0, limit: 10 }) },
  { category: 'news', name: 'getCryptoNewsBySymbol([BTCUSD])', schema: NewsSchema, kind: 'array', call: (fmp) => fmp.news.getCryptoNewsBySymbol({ symbols: ['BTCUSD', 'ETHUSD'], from: '2025-07-01', to: '2025-07-31', page: 0, limit: 10 }) },
  { category: 'news', name: 'getForexNewsBySymbol([EURUSD])', schema: NewsSchema, kind: 'array', call: (fmp) => fmp.news.getForexNewsBySymbol({ symbols: ['EURUSD', 'GBPUSD'], from: '2025-07-01', to: '2025-07-31', page: 0, limit: 10 }) },

  // ---- screener ----
  { category: 'screener', name: 'getScreener(limit=10)', schema: ScreenerSchema, kind: 'array', call: (fmp) => fmp.screener.getScreener({ limit: 10 }) },
  { category: 'screener', name: 'getAvailableExchanges()', schema: AvailableExchangesSchema, kind: 'array', call: (fmp) => fmp.screener.getAvailableExchanges() },
  { category: 'screener', name: 'getAvailableSectors()', schema: AvailableSectorsSchema, kind: 'array', call: (fmp) => fmp.screener.getAvailableSectors() },
  { category: 'screener', name: 'getAvailableIndustries()', schema: AvailableIndustriesSchema, kind: 'array', call: (fmp) => fmp.screener.getAvailableIndustries() },
  { category: 'screener', name: 'getAvailableCountries()', schema: AvailableCountriesSchema, kind: 'array', call: (fmp) => fmp.screener.getAvailableCountries() },

  // ---- search ----
  { category: 'search', name: 'search(AAPL)', schema: SearchResultSchema, kind: 'array', call: (fmp) => fmp.search.search({ query: 'AAPL', limit: 5 }) },

  // ---- analyst ----
  { category: 'analyst', name: 'getEstimates(AAPL,annual,2)', schema: AnalystEstimateSchema, kind: 'array', call: (fmp) => fmp.analyst.getEstimates({ symbol: 'AAPL', period: 'annual', limit: 2 }) },
  { category: 'analyst', name: 'getPriceTargetConsensus(AAPL)', schema: PriceTargetConsensusSchema, kind: 'object', call: (fmp) => fmp.analyst.getPriceTargetConsensus({ symbol: 'AAPL' }) },
  { category: 'analyst', name: 'getPriceTargetSummary(AAPL)', schema: PriceTargetSummarySchema, kind: 'object', call: (fmp) => fmp.analyst.getPriceTargetSummary({ symbol: 'AAPL' }) },
  { category: 'analyst', name: 'getGrades(AAPL)', schema: StockGradeSchema, kind: 'array', call: (fmp) => fmp.analyst.getGrades({ symbol: 'AAPL' }) },
  { category: 'analyst', name: 'getGradesConsensus(AAPL)', schema: GradesConsensusSchema, kind: 'object', call: (fmp) => fmp.analyst.getGradesConsensus({ symbol: 'AAPL' }) },

  // ---- valuation ----
  { category: 'valuation', name: 'getDiscountedCashFlow(AAPL)', schema: DCFValuationSchema, kind: 'object', call: (fmp) => fmp.valuation.getDiscountedCashFlow({ symbol: 'AAPL' }) },
  { category: 'valuation', name: 'getRatingSnapshot(AAPL)', schema: CompanyRatingSchema, kind: 'object', call: (fmp) => fmp.valuation.getRatingSnapshot({ symbol: 'AAPL' }) },
  { category: 'valuation', name: 'getHistoricalRating(AAPL,2)', schema: CompanyRatingSchema, kind: 'array', call: (fmp) => fmp.valuation.getHistoricalRating({ symbol: 'AAPL', limit: 2 }) },

  // ---- technical ----
  { category: 'technical', name: 'getTechnicalIndicator(AAPL,sma,10,1day)', schema: TechnicalIndicatorSchema, kind: 'array', call: (fmp) => fmp.technical.getTechnicalIndicator({ symbol: 'AAPL', type: 'sma', periodLength: 10, timeframe: '1day' }) },

  // ---- sec ----
  { category: 'sec', name: 'getRSSFeed()', schema: RSSFeedItemSchema, kind: 'array', call: (fmp) => fmp.sec.getRSSFeed({ limit: 5, type: '10-K', from: '2024-01-01', to: '2024-12-31', isDone: true }) },
  { category: 'sec', name: 'getRSSFeedAll()', schema: RSSFeedAllItemSchema, kind: 'array', call: (fmp) => fmp.sec.getRSSFeedAll({ page: 0 }) },
  { category: 'sec', name: 'getRSSFeedV3()', schema: RSSFeedV3ItemSchema, kind: 'array', call: (fmp) => fmp.sec.getRSSFeedV3({ page: 0 }) },
  { category: 'sec', name: 'getRSSFeed8K()', schema: RSSFeed8KItemSchema, kind: 'array', call: (fmp) => fmp.sec.getRSSFeed8K({ page: 0 }) },
  { category: 'sec', name: 'getSECFilings(AAPL)', schema: SECFilingSchema, kind: 'array', call: (fmp) => fmp.sec.getSECFilings({ symbol: 'AAPL', params: { page: 0 } }) },
  { category: 'sec', name: 'getIndividualIndustryClassification(AAPL)', schema: IndustryClassificationSchema, kind: 'object', call: (fmp) => fmp.sec.getIndividualIndustryClassification({ symbol: 'AAPL' }) },
  { category: 'sec', name: 'getAllIndustryClassifications()', schema: IndustryClassificationSchema, kind: 'array', call: (fmp) => fmp.sec.getAllIndustryClassifications() },
  { category: 'sec', name: 'getIndustryClassificationCodes(Software)', schema: IndustryClassificationCodeSchema, kind: 'array', call: (fmp) => fmp.sec.getIndustryClassificationCodes({ industryTitle: 'Software' }) },

  // ---- senate-house ----
  { category: 'senate-house', name: 'getSenateTrading(AAPL)', schema: SenateTradingResponseSchema, kind: 'array', call: (fmp) => fmp.senateHouse.getSenateTrading({ symbol: 'AAPL' }) },
  { category: 'senate-house', name: 'getSenateTradingRSSFeed()', schema: SenateTradingResponseSchema, kind: 'array', call: (fmp) => fmp.senateHouse.getSenateTradingRSSFeed({ page: 0 }) },
  { category: 'senate-house', name: 'getSenateTradingByName(Jerry)', schema: SenateHouseTradingByNameResponseSchema, kind: 'array', call: (fmp) => fmp.senateHouse.getSenateTradingByName({ name: 'Jerry' }) },
  { category: 'senate-house', name: 'getHouseTrading(AAPL)', schema: HouseTradingResponseSchema, kind: 'array', call: (fmp) => fmp.senateHouse.getHouseTrading({ symbol: 'AAPL' }) },
  { category: 'senate-house', name: 'getHouseTradingRSSFeed()', schema: HouseTradingResponseSchema, kind: 'array', call: (fmp) => fmp.senateHouse.getHouseTradingRSSFeed({ page: 0 }) },
  { category: 'senate-house', name: 'getHouseTradingByName(nancy pelosi)', schema: SenateHouseTradingByNameResponseSchema, kind: 'array', call: (fmp) => fmp.senateHouse.getHouseTradingByName({ name: 'nancy pelosi' }) },
];

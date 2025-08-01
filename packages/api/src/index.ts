// Main entry point for the Financial Modeling Prep API wrapper

// Export main FMP client
export { FMP } from './fmp';

// Export individual client for advanced usage
export { FMPClient } from './client';

// Export core types (most commonly used)
export type { APIResponse, SymbolParams, PeriodParams } from './types/common';
export type { Quote } from './types/quote';
export type {
  StockSplit,
  StockDividend,
  MarketCap,
  StockRealTimePrice,
  StockRealTimePriceFull,
} from './types/stock';

// Export financial types
export type {
  IncomeStatement,
  BalanceSheet,
  CashFlowStatement,
  KeyMetrics,
  FinancialRatios,
  EnterpriseValue,
  CashflowGrowth,
  IncomeGrowth,
  BalanceSheetGrowth,
  FinancialGrowth,
  EarningsHistorical,
  EarningsSurprises,
} from './types/financial';

// Export company types
export type {
  CompanyProfile,
  ExecutiveCompensation,
  CompanyNotes,
  HistoricalEmployeeCount,
  SharesFloat,
  HistoricalSharesFloat,
  EarningsCallTranscript,
  CompanyTranscriptData,
} from './types/company';

// Export ETF types
export type {
  ETFHoldingDates,
  ETFHolding,
  ETFHolder,
  ETFProfile,
  ETFWeighting,
  ETFCountryWeighting,
  ETFStockExposure,
} from './types/etf';

// Export market types
export type {
  MarketHours,
  MarketHoliday,
  MarketPerformance,
  MarketSectorPerformance,
  MarketIndex,
} from './types/market';

// Export economic types
export type { EconomicIndicator, TreasuryRate, EconomicIndicatorName } from './types/economic';

// Export calendar types
export type {
  EarningsCalendar,
  EarningsConfirmed,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
} from './types/calendar';

// Export list types
export type { StockList, ETFList, CryptoList, ForexList, AvailableIndexesList } from './types/list';

// Export senate/house types
export type { SenateTradingResponse, HouseTradingResponse } from './types/senate-house';

// Export institutional types
export type { InstitutionalHolderResponse, Form13FResponse } from './types/institutional';

// Export insider types
export type { InsiderTradingSearchResponse } from './types/insider';

// Export SEC types
export type { RSSFeedItem } from './types/sec';

// Export mutual fund types
export type { MutualFundHolding } from './types/mutual-fund';

// Export endpoint classes for tree-shaking
export { QuoteEndpoints } from './endpoints/quote';
export { StockEndpoints } from './endpoints/stock';
export { FinancialEndpoints } from './endpoints/financial';
export { CompanyEndpoints } from './endpoints/company';
export { ETFEndpoints } from './endpoints/etf';
export { MutualFundEndpoints } from './endpoints/mutual-fund';
export { MarketEndpoints } from './endpoints/market';
export { EconomicEndpoints } from './endpoints/economic';
export { ListEndpoints } from './endpoints/list';
export { CalendarEndpoints } from './endpoints/calendar';
export { SenateHouseEndpoints } from './endpoints/senate-house';
export { InstitutionalEndpoints } from './endpoints/institutional';
export { InsiderEndpoints } from './endpoints/insider';
export { SECEndpoints } from './endpoints/sec';

// Export commonly used utilities
export {
  formatCurrency,
  formatPercentage,
  formatLargeNumber,
  formatDate,
  formatVolume,
} from './utils/formatting';

export {
  DEFAULT_TIMEOUT,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  PERIODS,
  EXCHANGES,
  SECTORS,
} from './utils/constants';

export { FMPValidation } from './utils/validation';

// Types-only entry point for tree-shaking optimization
// Import this if you only need type definitions

// Core types
export type { APIResponse, SymbolParams, PeriodParams } from './types/common';

// Quote types
export type { Quote } from './types/quote';

// Stock types
export type {
  StockSplit,
  StockDividend,
  MarketCap,
  StockRealTimePrice,
  StockRealTimePriceFull,
} from './types/stock';

// Financial types
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

// Company types
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

// ETF types
export type {
  ETFHoldingDates,
  ETFHolding,
  ETFHolder,
  ETFProfile,
  ETFWeighting,
  ETFCountryWeighting,
  ETFStockExposure,
} from './types/etf';

// Market types
export type {
  MarketHours,
  MarketHoliday,
  MarketPerformance,
  MarketSectorPerformance,
  MarketIndex,
} from './types/market';

// Economic types
export type { EconomicIndicator, TreasuryRate, EconomicIndicatorName } from './types/economic';

// Calendar types
export type {
  EarningsCalendar,
  EarningsConfirmed,
  DividendsCalendar,
  EconomicsCalendar,
  IPOCalendar,
  SplitsCalendar,
} from './types/calendar';

// List types
export type { StockList, ETFList, CryptoList, ForexList, AvailableIndexesList } from './types/list';

// Senate/House types
export type { SenateTradingResponse, HouseTradingResponse } from './types/senate-house';

// Institutional types
export type { InstitutionalHolderResponse, Form13FResponse } from './types/institutional';

// Insider types
export type { InsiderTradingSearchResponse } from './types/insider';

// SEC types
export type { RSSFeedItem } from './types/sec';

// Mutual fund types
export type { MutualFundHolding } from './types/mutual-fund';

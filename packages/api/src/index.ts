// Main entry point for the Financial Modeling Prep API wrapper

// Export main FMP client
export { FMP } from './fmp';

// Export individual client for advanced usage
export { FMPClient } from './client';

// Re-export all types from the shared types package
export type * from 'fmp-node-types';

// Export endpoint classes for tree-shaking
export { CalendarEndpoints } from './endpoints/calendar';
export { CompanyEndpoints } from './endpoints/company';
export { EconomicEndpoints } from './endpoints/economic';
export { ETFEndpoints } from './endpoints/etf';
export { FinancialEndpoints } from './endpoints/financial';
export { InsiderEndpoints } from './endpoints/insider';
export { InstitutionalEndpoints } from './endpoints/institutional';
export { ListEndpoints } from './endpoints/list';
export { MarketEndpoints } from './endpoints/market';
export { MutualFundEndpoints } from './endpoints/mutual-fund';
export { NewsEndpoints } from './endpoints/news';
export { QuoteEndpoints } from './endpoints/quote';
export { ScreenerEndpoints } from './endpoints/screener';
export { StockEndpoints } from './endpoints/stock';
export { SenateHouseEndpoints } from './endpoints/senate-house';
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

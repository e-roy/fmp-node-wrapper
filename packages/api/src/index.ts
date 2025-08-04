// Main entry point for the Financial Modeling Prep API wrapper

// Export main FMP client
export { FMP } from './fmp';

// Export individual client for advanced usage
export { FMPClient } from './client';

// Re-export all types from the shared types package
export type * from '@fmp/types';

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

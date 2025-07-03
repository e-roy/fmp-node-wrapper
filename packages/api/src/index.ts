// Main entry point for the Financial Modeling Prep API wrapper

// Export main FMP client
export { FMP } from './fmp';

// Export individual client for advanced usage
export { FMPClient } from './client';

// Export all types
export * from './types';

// Export all endpoints
export * from './endpoints';

// Export utilities
export * from './utils';

// Export shared types for backward compatibility
export {
  FMPError,
  validateApiKey,
  validateSymbol,
  FMP_BASE_URL,
  FMP_BASE_URL_V4,
  Period,
  Exchange,
} from './shared';

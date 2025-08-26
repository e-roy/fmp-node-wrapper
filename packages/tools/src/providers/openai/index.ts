import type { Tool } from '@openai/agents';
import { checkOpenAIAgentsVersion } from '@/utils/version-check';
import { getCompanyProfile } from './company';
import { getEarningsCalendar, getEconomicCalendar } from './calendar';
import { getTreasuryRates, getEconomicIndicators } from './economic';
import { getETFHoldings, getETFProfile } from './etf';
import {
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getFinancialRatios,
} from './financial';
import { getInsiderTrading } from './insider';
import { getInstitutionalHolders } from './institutional';
import {
  getMarketPerformance,
  getSectorPerformance,
  getGainers,
  getLosers,
  getMostActive,
} from './market';
import { getStockQuote } from './quote';
import {
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
} from './senate-house';
import { getMarketCap, getStockSplits, getDividendHistory } from './stock';

// Export individual tools for OpenAI agents
export {
  getCompanyProfile,
  getEarningsCalendar,
  getEconomicCalendar,
  getTreasuryRates,
  getEconomicIndicators,
  getETFHoldings,
  getETFProfile,
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getFinancialRatios,
  getInsiderTrading,
  getInstitutionalHolders,
  getMarketPerformance,
  getSectorPerformance,
  getGainers,
  getLosers,
  getMostActive,
  getStockQuote,
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
  getMarketCap,
  getStockSplits,
  getDividendHistory,
};

// Export tool groups as arrays for OpenAI Agents
export const companyTools = [getCompanyProfile] as Tool<unknown>[];
export const calendarTools = [getEarningsCalendar, getEconomicCalendar] as Tool<unknown>[];
export const economicTools = [getTreasuryRates, getEconomicIndicators] as Tool<unknown>[];
export const etfTools = [getETFHoldings, getETFProfile] as Tool<unknown>[];
export const financialTools = [
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getFinancialRatios,
] as Tool<unknown>[];
export const insiderTools = [getInsiderTrading] as Tool<unknown>[];
export const institutionalTools = [getInstitutionalHolders] as Tool<unknown>[];
export const marketTools = [
  getMarketPerformance,
  getSectorPerformance,
  getGainers,
  getLosers,
  getMostActive,
] as Tool<unknown>[];
export const quoteTools = [getStockQuote] as Tool<unknown>[];
export const senateHouseTools = [
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
] as Tool<unknown>[];
export const stockTools = [getMarketCap, getStockSplits, getDividendHistory] as Tool<unknown>[];

// Combine all tools into a single array for convenience
export const fmpTools: Tool<unknown>[] = [
  getCompanyProfile,
  getEarningsCalendar,
  getEconomicCalendar,
  getTreasuryRates,
  getEconomicIndicators,
  getETFHoldings,
  getETFProfile,
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getFinancialRatios,
  getInsiderTrading,
  getInstitutionalHolders,
  getMarketPerformance,
  getSectorPerformance,
  getGainers,
  getLosers,
  getMostActive,
  getStockQuote,
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
  getMarketCap,
  getStockSplits,
  getDividendHistory,
];

// Check version compatibility when the module is imported
checkOpenAIAgentsVersion();

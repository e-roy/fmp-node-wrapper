import { ToolSet } from 'ai';
import { createTool } from '@/utils/aisdk-tool-wrapper';
import {
  quoteDefinitions,
  companyDefinitions,
  financialDefinitions,
  calendarDefinitions,
  economicDefinitions,
  etfDefinitions,
  insiderDefinitions,
  institutionalDefinitions,
  marketDefinitions,
  senateHouseDefinitions,
  stockDefinitions,
  type FMPToolDefinition,
} from '@/definitions';

// Build a Vercel AI `ToolSet` (object keyed by tool name) from shared definitions.
const toToolSet = (defs: FMPToolDefinition[]): ToolSet =>
  Object.fromEntries(defs.map(def => [def.name, createTool(def)]));

// Tool groups by category
export const quoteTools = toToolSet(quoteDefinitions);
export const companyTools = toToolSet(companyDefinitions);
export const financialTools = toToolSet(financialDefinitions);
export const calendarTools = toToolSet(calendarDefinitions);
export const economicTools = toToolSet(economicDefinitions);
export const etfTools = toToolSet(etfDefinitions);
export const insiderTools = toToolSet(insiderDefinitions);
export const institutionalTools = toToolSet(institutionalDefinitions);
export const marketTools = toToolSet(marketDefinitions);
export const senateHouseTools = toToolSet(senateHouseDefinitions);
export const stockTools = toToolSet(stockDefinitions);

// Combine all tools into a single ToolSet
export const fmpTools: ToolSet = {
  ...quoteTools,
  ...companyTools,
  ...financialTools,
  ...calendarTools,
  ...economicTools,
  ...etfTools,
  ...insiderTools,
  ...institutionalTools,
  ...marketTools,
  ...senateHouseTools,
  ...stockTools,
};

// Individual tools for direct import
export const { getStockQuote } = quoteTools;
export const { getCompanyProfile, getCompanySharesFloat, getCompanyExecutiveCompensation } =
  companyTools;
export const { getEarningsCalendar, getEconomicCalendar } = calendarTools;
export const { getTreasuryRates, getEconomicIndicators } = economicTools;
export const { getETFHoldings, getETFProfile } = etfTools;
export const {
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getKeyMetrics,
  getFinancialRatios,
  getEnterpriseValue,
  getCashflowGrowth,
  getIncomeGrowth,
  getBalanceSheetGrowth,
  getFinancialGrowth,
  getEarningsHistorical,
} = financialTools;
export const { getInsiderTrading } = insiderTools;
export const { getInstitutionalHolders } = institutionalTools;
export const { getMarketPerformance, getSectorPerformance, getGainers, getLosers, getMostActive } =
  marketTools;
export const {
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
} = senateHouseTools;
export const { getMarketCap, getStockSplits, getDividendHistory } = stockTools;

import { ToolSet } from 'ai';
import { createTool } from '@/utils/aisdk-tool-wrapper';

// Re-export client configuration helpers (optional; tools default to FMP_API_KEY).
export { configureFMPClient, resetFMPClient } from '@/client';

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
  newsDefinitions,
  screenerDefinitions,
  searchDefinitions,
  analystDefinitions,
  valuationDefinitions,
  technicalDefinitions,
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
export const newsTools = toToolSet(newsDefinitions);
export const screenerTools = toToolSet(screenerDefinitions);
export const searchTools = toToolSet(searchDefinitions);
export const analystTools = toToolSet(analystDefinitions);
export const valuationTools = toToolSet(valuationDefinitions);
export const technicalTools = toToolSet(technicalDefinitions);
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
  ...newsTools,
  ...screenerTools,
  ...searchTools,
  ...analystTools,
  ...valuationTools,
  ...technicalTools,
  ...senateHouseTools,
  ...stockTools,
};

// Individual tools for direct import
export const { getStockQuote, getHistoricalPrice, getIntraday } = quoteTools;
export const {
  getCompanyProfile,
  getCompanySharesFloat,
  getCompanyExecutiveCompensation,
  getStockPeers,
} = companyTools;
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
  getFinancialScores,
  getKeyMetricsTTM,
  getFinancialRatiosTTM,
  getRevenueProductSegmentation,
  getRevenueGeographicSegmentation,
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
export const { getStockNews, getStockNewsBySymbol } = newsTools;
export const { screenStocks } = screenerTools;
export const { searchSymbol } = searchTools;
export const { getAnalystEstimates, getPriceTargetConsensus, getStockGrades, getGradesConsensus } =
  analystTools;
export const { getDiscountedCashFlow, getCompanyRating } = valuationTools;
export const { getTechnicalIndicator } = technicalTools;
export const { getMarketCap, getStockSplits, getDividendHistory } = stockTools;

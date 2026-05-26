import type { Tool } from '@openai/agents';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import {
  allDefinitions,
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

// One OpenAI Agents tool instance per definition, addressable by name. The same
// instances are reused for the individual exports and the category arrays below.
const byName: Record<string, Tool<unknown>> = Object.fromEntries(
  allDefinitions.map(def => [def.name, createOpenAITool(def) as Tool<unknown>]),
);

const pick = (defs: FMPToolDefinition[]): Tool<unknown>[] => defs.map(def => byName[def.name]);

// Individual tools for direct import
export const getStockQuote = byName.getStockQuote;
export const getCompanyProfile = byName.getCompanyProfile;
export const getCompanySharesFloat = byName.getCompanySharesFloat;
export const getCompanyExecutiveCompensation = byName.getCompanyExecutiveCompensation;
export const getEarningsCalendar = byName.getEarningsCalendar;
export const getEconomicCalendar = byName.getEconomicCalendar;
export const getTreasuryRates = byName.getTreasuryRates;
export const getEconomicIndicators = byName.getEconomicIndicators;
export const getETFHoldings = byName.getETFHoldings;
export const getETFProfile = byName.getETFProfile;
export const getBalanceSheet = byName.getBalanceSheet;
export const getIncomeStatement = byName.getIncomeStatement;
export const getCashFlowStatement = byName.getCashFlowStatement;
export const getKeyMetrics = byName.getKeyMetrics;
export const getFinancialRatios = byName.getFinancialRatios;
export const getEnterpriseValue = byName.getEnterpriseValue;
export const getCashflowGrowth = byName.getCashflowGrowth;
export const getIncomeGrowth = byName.getIncomeGrowth;
export const getBalanceSheetGrowth = byName.getBalanceSheetGrowth;
export const getFinancialGrowth = byName.getFinancialGrowth;
export const getEarningsHistorical = byName.getEarningsHistorical;
export const getInsiderTrading = byName.getInsiderTrading;
export const getInstitutionalHolders = byName.getInstitutionalHolders;
export const getMarketPerformance = byName.getMarketPerformance;
export const getSectorPerformance = byName.getSectorPerformance;
export const getGainers = byName.getGainers;
export const getLosers = byName.getLosers;
export const getMostActive = byName.getMostActive;
export const getSenateTrading = byName.getSenateTrading;
export const getHouseTrading = byName.getHouseTrading;
export const getSenateTradingByName = byName.getSenateTradingByName;
export const getHouseTradingByName = byName.getHouseTradingByName;
export const getSenateTradingRSSFeed = byName.getSenateTradingRSSFeed;
export const getHouseTradingRSSFeed = byName.getHouseTradingRSSFeed;
export const getMarketCap = byName.getMarketCap;
export const getStockSplits = byName.getStockSplits;
export const getDividendHistory = byName.getDividendHistory;

// Tool groups as arrays for OpenAI Agents
export const quoteTools = pick(quoteDefinitions);
export const companyTools = pick(companyDefinitions);
export const financialTools = pick(financialDefinitions);
export const calendarTools = pick(calendarDefinitions);
export const economicTools = pick(economicDefinitions);
export const etfTools = pick(etfDefinitions);
export const insiderTools = pick(insiderDefinitions);
export const institutionalTools = pick(institutionalDefinitions);
export const marketTools = pick(marketDefinitions);
export const senateHouseTools = pick(senateHouseDefinitions);
export const stockTools = pick(stockDefinitions);

// Combine all tools into a single array
export const fmpTools: Tool<unknown>[] = allDefinitions.map(def => byName[def.name]);

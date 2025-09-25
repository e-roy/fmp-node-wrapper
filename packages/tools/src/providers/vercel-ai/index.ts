import { ToolSet } from 'ai';
import { quoteTools } from './quote';
import { companyTools } from './company';
import { financialTools } from './financial';
import { calendarTools } from './calendar';
import { economicTools } from './economic';
import { etfTools } from './etf';
import { insiderTools } from './insider';
import { institutionalTools } from './institutional';
import { marketTools } from './market';
import { senateHouseTools } from './senate-house';
import { stockTools } from './stock';

// Export individual tools for Vercel AI
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

export const { getStockQuote } = quoteTools;

export const {
  getSenateTrading,
  getHouseTrading,
  getSenateTradingByName,
  getHouseTradingByName,
  getSenateTradingRSSFeed,
  getHouseTradingRSSFeed,
} = senateHouseTools;

export const { getMarketCap, getStockSplits, getDividendHistory } = stockTools;

// Combine all tools into a single object for AI SDK v2
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

// Re-export individual tool groups
export {
  quoteTools,
  companyTools,
  financialTools,
  calendarTools,
  economicTools,
  etfTools,
  insiderTools,
  institutionalTools,
  marketTools,
  senateHouseTools,
  stockTools,
};

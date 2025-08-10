import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/types';

// Common input schema for financial statements with symbol and period
const financialStatementInputSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
  period: z
    .enum(['annual', 'quarter'])
    .default('annual')
    .describe('The period type (annual or quarter)'),
});

export const getBalanceSheet = createOpenAITool({
  name: 'getBalanceSheet',
  description: 'Get balance sheet for a company showing assets, liabilities, and equity',
  inputSchema: financialStatementInputSchema,
  execute: async ({ symbol, period }) => {
    const fmp = getFMPClient();
    const balanceSheet = await fmp.financial.getBalanceSheet({ symbol, period });
    return JSON.stringify(balanceSheet.data, null, 2);
  },
});

export const getIncomeStatement = createOpenAITool({
  name: 'getIncomeStatement',
  description: 'Get income statement for a company showing revenue, expenses, and profit',
  inputSchema: financialStatementInputSchema,
  execute: async ({ symbol, period }) => {
    const fmp = getFMPClient();
    const incomeStatement = await fmp.financial.getIncomeStatement({ symbol, period });
    return JSON.stringify(incomeStatement.data, null, 2);
  },
});

export const getCashFlowStatement = createOpenAITool({
  name: 'getCashFlowStatement',
  description:
    'Get cash flow statement for a company showing operating, investing, and financing cash flows',
  inputSchema: financialStatementInputSchema,
  execute: async ({ symbol, period }) => {
    const fmp = getFMPClient();
    const cashFlowStatement = await fmp.financial.getCashFlowStatement({ symbol, period });
    return JSON.stringify(cashFlowStatement.data, null, 2);
  },
});

export const getFinancialRatios = createOpenAITool({
  name: 'getFinancialRatios',
  description:
    'Get financial ratios for a company including profitability, liquidity, and efficiency metrics',
  inputSchema: financialStatementInputSchema,
  execute: async ({ symbol, period }) => {
    const fmp = getFMPClient();
    const financialRatios = await fmp.financial.getFinancialRatios({ symbol, period });
    return JSON.stringify(financialRatios.data, null, 2);
  },
});

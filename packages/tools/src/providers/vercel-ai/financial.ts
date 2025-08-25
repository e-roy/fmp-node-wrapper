import { z } from 'zod';
import { getFMPClient } from '@/types';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const financialTools = {
  getBalanceSheet: createTool({
    name: 'getBalanceSheet',
    description: 'Get balance sheet for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get balance sheet for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
    }),
    execute: async ({ symbol, period }) => {
      const fmp = getFMPClient();
      const balanceSheet = await fmp.financial.getBalanceSheet({ symbol, period });
      const response = JSON.stringify(balanceSheet.data, null, 2);
      return response;
    },
  }),

  getIncomeStatement: createTool({
    name: 'getIncomeStatement',
    description: 'Get income statement for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get income statement for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
    }),
    execute: async ({ symbol, period }) => {
      const fmp = getFMPClient();
      const incomeStatement = await fmp.financial.getIncomeStatement({ symbol, period });
      const response = JSON.stringify(incomeStatement.data, null, 2);
      return response;
    },
  }),

  getCashFlowStatement: createTool({
    name: 'getCashFlowStatement',
    description: 'Get cash flow statement for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get cash flow statement for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
    }),
    execute: async ({ symbol, period }) => {
      const fmp = getFMPClient();
      const cashFlowStatement = await fmp.financial.getCashFlowStatement({ symbol, period });
      const response = JSON.stringify(cashFlowStatement.data, null, 2);
      return response;
    },
  }),

  getFinancialRatios: createTool({
    name: 'getFinancialRatios',
    description: 'Get financial ratios for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get financial ratios for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
    }),
    execute: async ({ symbol, period }) => {
      const fmp = getFMPClient();
      const financialRatios = await fmp.financial.getFinancialRatios({ symbol, period });
      const response = JSON.stringify(financialRatios.data, null, 2);
      return response;
    },
  }),
};

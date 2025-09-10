import { z } from 'zod';
import { getFMPClient } from '@/client';
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
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const balanceSheet = await fmp.financial.getBalanceSheet({ symbol, period, limit });
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
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const incomeStatement = await fmp.financial.getIncomeStatement({ symbol, period, limit });
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
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const cashFlowStatement = await fmp.financial.getCashFlowStatement({ symbol, period, limit });
      const response = JSON.stringify(cashFlowStatement.data, null, 2);
      return response;
    },
  }),

  getKeyMetrics: createTool({
    name: 'getKeyMetrics',
    description: 'Get key metrics for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get key metrics for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const keyMetrics = await fmp.financial.getKeyMetrics({ symbol, period, limit });
      const response = JSON.stringify(keyMetrics.data, null, 2);
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
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const financialRatios = await fmp.financial.getFinancialRatios({ symbol, period, limit });
      const response = JSON.stringify(financialRatios.data, null, 2);
      return response;
    },
  }),

  getEnterpriseValue: createTool({
    name: 'getEnterpriseValue',
    description: 'Get enterprise value for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get enterprise value for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const enterpriseValue = await fmp.financial.getEnterpriseValue({ symbol, period, limit });
      const response = JSON.stringify(enterpriseValue.data, null, 2);
      return response;
    },
  }),

  getCashflowGrowth: createTool({
    name: 'getCashflowGrowth',
    description: 'Get cashflow growth for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get cashflow growth for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const cashflowGrowth = await fmp.financial.getCashflowGrowth({ symbol, period, limit });
      const response = JSON.stringify(cashflowGrowth.data, null, 2);
      return response;
    },
  }),

  getIncomeGrowth: createTool({
    name: 'getIncomeGrowth',
    description: 'Get income growth for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get income growth for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const incomeGrowth = await fmp.financial.getIncomeGrowth({ symbol, period, limit });
      const response = JSON.stringify(incomeGrowth.data, null, 2);
      return response;
    },
  }),

  getBalanceSheetGrowth: createTool({
    name: 'getBalanceSheetGrowth',
    description: 'Get balance sheet growth for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get balance sheet growth for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const balanceSheetGrowth = await fmp.financial.getBalanceSheetGrowth({
        symbol,
        period,
        limit,
      });
      const response = JSON.stringify(balanceSheetGrowth.data, null, 2);
      return response;
    },
  }),

  getFinancialGrowth: createTool({
    name: 'getFinancialGrowth',
    description: 'Get financial growth for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get financial growth for'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z.number().default(5).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, period, limit }) => {
      const fmp = getFMPClient();
      const financialGrowth = await fmp.financial.getFinancialGrowth({ symbol, period, limit });
      const response = JSON.stringify(financialGrowth.data, null, 2);
      return response;
    },
  }),

  getEarningsHistorical: createTool({
    name: 'getEarningsHistorical',
    description: 'Get earnings historical for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get earnings historical for'),
      limit: z.number().default(10).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, limit }) => {
      const fmp = getFMPClient();
      const earningsHistorical = await fmp.financial.getEarningsHistorical({ symbol, limit });
      const response = JSON.stringify(earningsHistorical.data, null, 2);
      return response;
    },
  }),
};

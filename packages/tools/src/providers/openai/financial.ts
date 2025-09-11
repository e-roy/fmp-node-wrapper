import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

export const getBalanceSheet = createOpenAITool({
  name: 'getBalanceSheet',
  description: 'Get balance sheet for a company showing assets, liabilities, and equity',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get balance sheet for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const balanceSheet = await fmp.financial.getBalanceSheet({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(balanceSheet.data, null, 2);
  },
});

export const getIncomeStatement = createOpenAITool({
  name: 'getIncomeStatement',
  description: 'Get income statement for a company showing revenue, expenses, and profit',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get income statement for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const incomeStatement = await fmp.financial.getIncomeStatement({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(incomeStatement.data, null, 2);
  },
});

export const getCashFlowStatement = createOpenAITool({
  name: 'getCashFlowStatement',
  description:
    'Get cash flow statement for a company showing operating, investing, and financing cash flows',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get cash flow statement for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const cashFlowStatement = await fmp.financial.getCashFlowStatement({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(cashFlowStatement.data, null, 2);
  },
});

export const getKeyMetrics = createOpenAITool({
  name: 'getKeyMetrics',
  description: 'Get key metrics for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get key metrics for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const keyMetrics = await fmp.financial.getKeyMetrics({ symbol, period, limit: Number(limit) });
    return JSON.stringify(keyMetrics.data, null, 2);
  },
});

export const getFinancialRatios = createOpenAITool({
  name: 'getFinancialRatios',
  description:
    'Get financial ratios for a company including profitability, liquidity, and efficiency metrics',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get financial ratios for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const financialRatios = await fmp.financial.getFinancialRatios({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(financialRatios.data, null, 2);
  },
});

export const getEnterpriseValue = createOpenAITool({
  name: 'getEnterpriseValue',
  description: 'Get enterprise value for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get enterprise value for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const enterpriseValue = await fmp.financial.getEnterpriseValue({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(enterpriseValue.data, null, 2);
  },
});

export const getCashflowGrowth = createOpenAITool({
  name: 'getCashflowGrowth',
  description: 'Get cashflow growth for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get cashflow growth for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const cashflowGrowth = await fmp.financial.getCashflowGrowth({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(cashflowGrowth.data, null, 2);
  },
});

export const getIncomeGrowth = createOpenAITool({
  name: 'getIncomeGrowth',
  description: 'Get income growth for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get income growth for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const incomeGrowth = await fmp.financial.getIncomeGrowth({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(incomeGrowth.data, null, 2);
  },
});

export const getBalanceSheetGrowth = createOpenAITool({
  name: 'getBalanceSheetGrowth',
  description: 'Get balance sheet growth for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get balance sheet growth for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const balanceSheetGrowth = await fmp.financial.getBalanceSheetGrowth({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(balanceSheetGrowth.data, null, 2);
  },
});

export const getFinancialGrowth = createOpenAITool({
  name: 'getFinancialGrowth',
  description: 'Get financial growth for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get financial growth for'),
    period: z
      .enum(['annual', 'quarter'])
      .default('annual')
      .describe('The period type (annual or quarter)'),
    limit: z.string().default('5').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, period, limit }) => {
    const fmp = getFMPClient();
    const financialGrowth = await fmp.financial.getFinancialGrowth({
      symbol,
      period,
      limit: Number(limit),
    });
    return JSON.stringify(financialGrowth.data, null, 2);
  },
});

export const getEarningsHistorical = createOpenAITool({
  name: 'getEarningsHistorical',
  description: 'Get earnings historical for a company',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol to get earnings historical for'),
    limit: z.string().default('10').describe('The number of periods to retrieve'),
  }),
  execute: async ({ symbol, limit }) => {
    const fmp = getFMPClient();
    const earningsHistorical = await fmp.financial.getEarningsHistorical({
      symbol,
      limit: Number(limit),
    });
    return JSON.stringify(earningsHistorical.data, null, 2);
  },
});

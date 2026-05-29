import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const period = z
  .enum(['annual', 'quarter'])
  .default('annual')
  .describe('The period type (annual or quarter)');

const symbol = (what: string) => z.string().min(1).describe(`The stock symbol to get ${what} for`);

const limit = z.number().default(5).describe('The number of periods to retrieve');

/** Build a standard statement tool: symbol + period + limit -> fmp.financial[method]. */
const statementTool = (
  name: string,
  description: string,
  what: string,
  call: (args: { symbol: string; period: 'annual' | 'quarter'; limit: number }) => Promise<any>,
) =>
  defineTool({
    name,
    description,
    inputSchema: z.object({ symbol: symbol(what), period, limit }),
    execute: async ({ symbol, period, limit }) =>
      toToolResponse(await call({ symbol, period, limit })),
  });

export const financialDefinitions: FMPToolDefinition[] = [
  statementTool(
    'getBalanceSheet',
    'Get balance sheet for a company showing assets, liabilities, and equity',
    'balance sheet',
    args => getFMPClient().financial.getBalanceSheet(args),
  ),
  statementTool(
    'getIncomeStatement',
    'Get income statement for a company showing revenue, expenses, and profit',
    'income statement',
    args => getFMPClient().financial.getIncomeStatement(args),
  ),
  statementTool(
    'getCashFlowStatement',
    'Get cash flow statement for a company showing operating, investing, and financing cash flows',
    'cash flow statement',
    args => getFMPClient().financial.getCashFlowStatement(args),
  ),
  statementTool('getKeyMetrics', 'Get key metrics for a company', 'key metrics', args =>
    getFMPClient().financial.getKeyMetrics(args),
  ),
  statementTool(
    'getFinancialRatios',
    'Get financial ratios for a company including profitability, liquidity, and efficiency metrics',
    'financial ratios',
    args => getFMPClient().financial.getFinancialRatios(args),
  ),
  statementTool(
    'getEnterpriseValue',
    'Get enterprise value for a company',
    'enterprise value',
    args => getFMPClient().financial.getEnterpriseValue(args),
  ),
  statementTool('getCashflowGrowth', 'Get cashflow growth for a company', 'cashflow growth', args =>
    getFMPClient().financial.getCashflowGrowth(args),
  ),
  statementTool('getIncomeGrowth', 'Get income growth for a company', 'income growth', args =>
    getFMPClient().financial.getIncomeGrowth(args),
  ),
  statementTool(
    'getBalanceSheetGrowth',
    'Get balance sheet growth for a company',
    'balance sheet growth',
    args => getFMPClient().financial.getBalanceSheetGrowth(args),
  ),
  statementTool(
    'getFinancialGrowth',
    'Get financial growth for a company',
    'financial growth',
    args => getFMPClient().financial.getFinancialGrowth(args),
  ),
  defineTool({
    name: 'getEarningsHistorical',
    description: 'Get earnings historical for a company',
    inputSchema: z.object({
      symbol: symbol('earnings historical'),
      limit: z.number().default(10).describe('The number of periods to retrieve'),
    }),
    execute: async ({ symbol, limit }) =>
      toToolResponse(await getFMPClient().financial.getEarningsHistorical({ symbol, limit })),
  }),
  defineTool({
    name: 'getFinancialScores',
    description:
      'Get financial health scores for a company (Altman Z-Score bankruptcy risk + Piotroski fundamental-strength score)',
    inputSchema: z.object({ symbol: symbol('financial scores') }),
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().financial.getFinancialScores({ symbol })),
  }),
  defineTool({
    name: 'getKeyMetricsTTM',
    description:
      'Get current trailing-twelve-month (TTM) key metrics for a company (one snapshot row)',
    inputSchema: z.object({ symbol: symbol('TTM key metrics') }),
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().financial.getKeyMetricsTTM({ symbol })),
  }),
  defineTool({
    name: 'getFinancialRatiosTTM',
    description:
      'Get current trailing-twelve-month (TTM) financial ratios for a company (margins, returns, liquidity)',
    inputSchema: z.object({ symbol: symbol('TTM financial ratios') }),
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().financial.getFinancialRatiosTTM({ symbol })),
  }),
  defineTool({
    name: 'getRevenueProductSegmentation',
    description: 'Get revenue broken down by product line for a company',
    inputSchema: z.object({ symbol: symbol('product revenue segmentation'), period }),
    execute: async ({ symbol, period }) =>
      toToolResponse(
        await getFMPClient().financial.getRevenueProductSegmentation({ symbol, period }),
      ),
  }),
  defineTool({
    name: 'getRevenueGeographicSegmentation',
    description: 'Get revenue broken down by geographic region for a company',
    inputSchema: z.object({ symbol: symbol('geographic revenue segmentation'), period }),
    execute: async ({ symbol, period }) =>
      toToolResponse(
        await getFMPClient().financial.getRevenueGeographicSegmentation({ symbol, period }),
      ),
  }),
];

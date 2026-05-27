import { z } from 'zod';
import type { APIResponse } from 'fmp-node-api';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const analystDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getAnalystEstimates',
    description:
      'Get analyst estimates (revenue, EBITDA, net income, EPS) for a company, by period',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock symbol (e.g., AAPL)'),
      period: z
        .enum(['annual', 'quarter'])
        .default('annual')
        .describe('The period type (annual or quarter)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(10)
        .describe('Max number of periods to return (default 10)'),
    }),
    execute: async ({ symbol, period = 'annual', limit = 10 }) =>
      toToolResponse(await getFMPClient().analyst.getEstimates({ symbol, period, limit })),
  }),
  defineTool({
    name: 'getPriceTargetConsensus',
    description:
      'Get the analyst price-target consensus (high, low, consensus, median) for a company',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock symbol (e.g., AAPL)'),
    }),
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().analyst.getPriceTargetConsensus({ symbol })),
  }),
  defineTool({
    name: 'getStockGrades',
    description:
      'Get recent analyst grades (upgrades/downgrades) for a company (most recent `limit`)',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock symbol (e.g., AAPL)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(20)
        .describe('Max number of grade entries to return (default 20)'),
    }),
    execute: async ({ symbol, limit = 20 }) => {
      const res = await getFMPClient().analyst.getGrades({ symbol });
      if (res.success && Array.isArray(res.data)) {
        return toToolResponse({ ...res, data: res.data.slice(0, limit) } as APIResponse<unknown>);
      }
      return toToolResponse(res);
    },
  }),
];

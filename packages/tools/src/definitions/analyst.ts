import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse, toToolResponse } from '@/utils/format-response';
import { capLimit } from '@/utils/tool-input';
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
        // FMP's Starter plan rejects limit > 10 here (premium query parameter).
        .describe('Max number of periods to return (default 10, max 10)'),
    }),
    execute: async ({ symbol, period = 'annual', limit }) => {
      const cap = capLimit(limit, 10, 10);
      return toCappedToolResponse(
        await getFMPClient().analyst.getEstimates({ symbol, period, limit: cap.limit }),
        cap.limit,
        { notice: cap.notice },
      );
    },
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
        .describe('Max number of grade entries to return (default 20, max 100)'),
    }),
    execute: async ({ symbol, limit }) => {
      const cap = capLimit(limit, 20, 100);
      return toCappedToolResponse(await getFMPClient().analyst.getGrades({ symbol }), cap.limit, {
        notice: cap.notice,
        hint: 'Most recent grades first.',
      });
    },
  }),
  defineTool({
    name: 'getGradesConsensus',
    description:
      'Get the analyst rating consensus for a company (counts of strongBuy/buy/hold/sell/strongSell + overall consensus)',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock symbol (e.g., AAPL)'),
    }),
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().analyst.getGradesConsensus({ symbol })),
  }),
];

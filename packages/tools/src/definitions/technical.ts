import { z } from 'zod';
import type { APIResponse } from 'fmp-node-api';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const technicalDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getTechnicalIndicator',
    description:
      'Get a technical indicator series (SMA, EMA, RSI, etc.) for a symbol at a given timeframe. Returns the most recent `limit` bars.',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock/ETF symbol (e.g., AAPL)'),
      type: z
        .enum(['sma', 'ema', 'wma', 'dema', 'tema', 'rsi', 'standardDeviation', 'williams', 'adx'])
        .describe('The indicator type'),
      periodLength: z
        .number()
        .int()
        .positive()
        .default(10)
        .describe('Lookback period for the indicator (e.g. 14 for a 14-day RSI)'),
      timeframe: z
        .enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day', '1week', '1month'])
        .default('1day')
        .describe('Bar timeframe'),
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe('Max number of most-recent bars to return (default 50)'),
    }),
    execute: async ({ symbol, type, periodLength = 10, timeframe = '1day', limit = 50 }) => {
      const res = await getFMPClient().technical.getTechnicalIndicator({
        symbol,
        type,
        periodLength,
        timeframe,
      });
      if (res.success && Array.isArray(res.data)) {
        return toToolResponse({ ...res, data: res.data.slice(0, limit) } as APIResponse<unknown>);
      }
      return toToolResponse(res);
    },
  }),
];

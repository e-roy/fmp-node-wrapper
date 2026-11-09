import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse } from '@/utils/format-response';
import { capLimit } from '@/utils/tool-input';
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
        .describe('Max number of most-recent bars to return (default 50, max 365)'),
    }),
    execute: async ({ symbol, type, periodLength = 10, timeframe = '1day', limit }) => {
      const res = await getFMPClient().technical.getTechnicalIndicator({
        symbol,
        type,
        periodLength,
        timeframe,
      });
      const cap = capLimit(limit, 50, 365);
      return toCappedToolResponse(res, cap.limit, {
        notice: cap.notice,
        hint: 'Most recent bars first.',
      });
    },
  }),
];

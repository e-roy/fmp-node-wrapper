import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';
import type { APIResponse } from 'fmp-node-api';

export const quoteDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getStockQuote',
    description:
      'Get the real-time stock quote for a company including price, volume, and market data',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'Stock symbol is required')
        .describe('The symbol of the company to get the stock quote for'),
    }),
    execute: async ({ symbol }) => toToolResponse(await getFMPClient().quote.getQuote(symbol)),
  }),
  defineTool({
    name: 'getStockQuoteShort',
    description:
      'Get a short real-time quote (price, change, and volume only) for a symbol. Lighter than the full quote.',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'Stock symbol is required')
        .describe('The symbol to get the short quote for (e.g., AAPL, BTCUSD, EURUSD)'),
    }),
    execute: async ({ symbol }) => toToolResponse(await getFMPClient().quote.getQuoteShort(symbol)),
  }),
  defineTool({
    name: 'getHistoricalPrice',
    description:
      'Get historical daily prices (open/high/low/close/volume) for a symbol. Returns the most recent `limit` days.',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock/ETF symbol (e.g., AAPL)'),
      from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
      to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(30)
        .describe('Max number of most-recent days to return (default 30)'),
    }),
    execute: async ({ symbol, from, to, limit = 30 }) => {
      const res = await getFMPClient().quote.getHistoricalPrice({
        symbol,
        from: from ?? undefined,
        to: to ?? undefined,
      });
      // Response is { symbol, historical: [...] } (newest first); cap to `limit`.
      const data = res.data as { historical?: unknown[] } | null;
      if (res.success && data && Array.isArray(data.historical)) {
        return toToolResponse({
          ...res,
          data: { ...data, historical: data.historical.slice(0, limit) },
        } as APIResponse<unknown>);
      }
      return toToolResponse(res);
    },
  }),
  defineTool({
    name: 'getIntraday',
    description:
      'Get intraday price bars for a symbol at a given interval. Returns the most recent `limit` bars.',
    inputSchema: z.object({
      symbol: z.string().min(1).describe('The stock/ETF symbol (e.g., AAPL)'),
      interval: z
        .enum(['1min', '5min', '15min', '30min', '1hour', '4hour'])
        .default('5min')
        .describe('Bar interval'),
      from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
      to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe('Max number of most-recent bars to return (default 50)'),
    }),
    execute: async ({ symbol, interval = '5min', from, to, limit = 50 }) => {
      const res = await getFMPClient().quote.getIntraday({
        symbol,
        interval,
        from: from ?? undefined,
        to: to ?? undefined,
      });
      if (res.success && Array.isArray(res.data)) {
        return toToolResponse({ ...res, data: res.data.slice(0, limit) } as APIResponse<unknown>);
      }
      return toToolResponse(res);
    },
  }),
];

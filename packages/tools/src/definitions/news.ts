import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse } from '@/utils/format-response';
import { capLimit } from '@/utils/tool-input';
import { defineTool, type FMPToolDefinition } from './types';

export const newsDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getStockNews',
    description: 'Get the latest general stock market news articles',
    inputSchema: z.object({
      from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
      to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(20)
        .describe('Max number of articles to return (default 20, max 50)'),
    }),
    execute: async ({ from, to, limit }) => {
      const cap = capLimit(limit, 20, 50);
      return toCappedToolResponse(
        await getFMPClient().news.getStockNews({
          from: from ?? undefined,
          to: to ?? undefined,
          limit: cap.limit,
        }),
        cap.limit,
        { notice: cap.notice },
      );
    },
  }),
  defineTool({
    name: 'getStockNewsBySymbol',
    description: 'Get the latest news articles for one or more specific stock symbols',
    inputSchema: z.object({
      symbols: z
        .array(z.string().min(1))
        .min(1)
        .describe('Stock symbols to get news for (e.g., ["AAPL", "MSFT"])'),
      from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
      to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(20)
        .describe('Max number of articles to return (default 20, max 50)'),
    }),
    execute: async ({ symbols, from, to, limit }) => {
      const cap = capLimit(limit, 20, 50);
      return toCappedToolResponse(
        await getFMPClient().news.getStockNewsBySymbol({
          symbols,
          from: from ?? undefined,
          to: to ?? undefined,
          limit: cap.limit,
        }),
        cap.limit,
        { notice: cap.notice },
      );
    },
  }),
];

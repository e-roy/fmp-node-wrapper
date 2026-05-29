import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const insiderDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getInsiderTrading',
    description:
      'Get insider trading data for a specific stock symbol showing buy/sell transactions by company insiders',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'Stock symbol is required')
        .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
      page: z
        .number()
        .int()
        .min(0)
        .default(0)
        .describe('Page number for pagination (optional, defaults to 0)'),
    }),
    execute: async ({ symbol, page }) =>
      toToolResponse(await getFMPClient().insider.getInsiderTradesBySymbol(symbol, page)),
  }),
];

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

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
];

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const symbolSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
});

export const aftermarketDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getAftermarketTrade',
    description:
      'Get the latest extended-hours (pre/post-market) trade for a symbol, including price, trade size, and timestamp',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().aftermarket.getTrade(symbol)),
  }),
  defineTool({
    name: 'getAftermarketQuote',
    description:
      'Get the latest extended-hours (pre/post-market) bid/ask quote for a symbol, including bid/ask prices and sizes',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().aftermarket.getQuote(symbol)),
  }),
];

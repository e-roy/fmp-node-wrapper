import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const symbolSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
});

const rssFeedSchema = z.object({
  page: z
    .number()
    .int()
    .min(0)
    .default(0)
    .describe('Page number for pagination (optional, defaults to 0)'),
});

export const senateHouseDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getSenateTrading',
    description: 'Get senate trading data for a specific stock symbol showing senator transactions',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().senateHouse.getSenateTrading({ symbol })),
  }),
  defineTool({
    name: 'getHouseTrading',
    description:
      'Get house trading data for a specific stock symbol showing representative transactions',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().senateHouse.getHouseTrading({ symbol })),
  }),
  defineTool({
    name: 'getSenateTradingByName',
    description:
      'Get senate trading data for a specific senator by name showing their trading activity',
    inputSchema: z.object({
      name: z
        .string()
        .min(1, 'Name is required')
        .describe('The name of the senator to get trading data for'),
    }),
    execute: async ({ name }) =>
      toToolResponse(await getFMPClient().senateHouse.getSenateTradingByName({ name })),
  }),
  defineTool({
    name: 'getHouseTradingByName',
    description:
      'Get house trading data for a specific representative by name showing their trading activity',
    inputSchema: z.object({
      name: z
        .string()
        .min(1, 'Name is required')
        .describe('The name of the representative to get trading data for'),
    }),
    execute: async ({ name }) =>
      toToolResponse(await getFMPClient().senateHouse.getHouseTradingByName({ name })),
  }),
  defineTool({
    name: 'getSenateTradingRSSFeed',
    description:
      'Get senate trading data through RSS feed with pagination showing recent senate transactions',
    inputSchema: rssFeedSchema,
    // JS default mirrors the Zod default for the Vercel adapter, which (unlike the
    // OpenAI adapter) does not parse input before calling execute.
    execute: async ({ page = 0 }) =>
      toToolResponse(await getFMPClient().senateHouse.getSenateTradingRSSFeed({ page })),
  }),
  defineTool({
    name: 'getHouseTradingRSSFeed',
    description:
      'Get house trading data through RSS feed with pagination showing recent house transactions',
    inputSchema: rssFeedSchema,
    // JS default mirrors the Zod default for the Vercel adapter, which (unlike the
    // OpenAI adapter) does not parse input before calling execute.
    execute: async ({ page = 0 }) =>
      toToolResponse(await getFMPClient().senateHouse.getHouseTradingRSSFeed({ page })),
  }),
];

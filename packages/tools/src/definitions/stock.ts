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

export const stockDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getMarketCap',
    description: 'Get market capitalization for a company showing current market value',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) => toToolResponse(await getFMPClient().stock.getMarketCap(symbol)),
  }),
  defineTool({
    name: 'getStockSplits',
    description: 'Get stock splits history for a company showing all historical stock split events',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().stock.getStockSplits(symbol)),
  }),
  defineTool({
    name: 'getDividendHistory',
    description: 'Get dividend history for a company showing all historical dividend payments',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().stock.getDividendHistory(symbol)),
  }),
  defineTool({
    name: 'getStockPriceChange',
    description:
      'Get the percentage price change for a stock across standard horizons (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 3Y, 5Y, 10Y, max)',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().stock.getPriceChange(symbol)),
  }),
];

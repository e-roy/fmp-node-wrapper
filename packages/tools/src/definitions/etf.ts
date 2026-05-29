import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const etfDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getETFHoldings',
    description:
      'Get ETF holdings for a specific ETF symbol, showing the underlying assets and their weights',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'ETF symbol is required')
        .describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
      date: z
        .string()
        .optional()
        .nullable()
        .describe('Date for holdings in YYYY-MM-DD format (optional)'),
    }),
    execute: async ({ symbol, date }) => {
      // `date` is optional; the holdings params type treats it as required, so widen.
      const params: any = { symbol };
      if (date) {
        params.date = date;
      }
      return toToolResponse(await getFMPClient().etf.getHoldings(params));
    },
  }),
  defineTool({
    name: 'getETFProfile',
    description: 'Get ETF profile information including fund details, expense ratio, and key metrics',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'ETF symbol is required')
        .describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
    }),
    execute: async ({ symbol }) => toToolResponse(await getFMPClient().etf.getProfile(symbol)),
  }),
];

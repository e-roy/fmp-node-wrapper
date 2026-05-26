import { z } from 'zod';
import type { ScreenerParams } from 'fmp-node-api';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const screenerDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'screenStocks',
    description:
      'Screen for stocks matching financial criteria (market cap, price, sector, exchange, etc.). Returns matching companies.',
    inputSchema: z.object({
      marketCapMoreThan: z.number().optional().nullable().describe('Minimum market capitalization'),
      marketCapLowerThan: z.number().optional().nullable().describe('Maximum market capitalization'),
      priceMoreThan: z.number().optional().nullable().describe('Minimum stock price'),
      priceLowerThan: z.number().optional().nullable().describe('Maximum stock price'),
      sector: z.string().optional().nullable().describe('Sector filter (e.g., "Technology")'),
      industry: z.string().optional().nullable().describe('Industry filter'),
      exchange: z.string().optional().nullable().describe('Exchange filter (e.g., "NASDAQ")'),
      country: z.string().optional().nullable().describe('Country filter (e.g., "US")'),
      isEtf: z.boolean().optional().nullable().describe('Restrict to ETFs'),
      isActivelyTrading: z.boolean().optional().nullable().describe('Restrict to actively trading'),
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe('Max number of results to return (default 50)'),
    }),
    execute: async ({ limit = 50, ...filters }) => {
      // Drop null/undefined so they aren't sent as query params.
      const params: Record<string, unknown> = { limit };
      for (const [key, value] of Object.entries(filters)) {
        if (value !== null && value !== undefined) params[key] = value;
      }
      return toToolResponse(await getFMPClient().screener.getScreener(params as ScreenerParams));
    },
  }),
];

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const searchDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'searchSymbol',
    description:
      'Search for a ticker symbol by company name or partial ticker (e.g., resolve "Apple" to "AAPL")',
    inputSchema: z.object({
      query: z.string().min(1).describe('Company name or ticker to search for'),
      limit: z
        .number()
        .int()
        .positive()
        .default(10)
        .describe('Max number of results to return (default 10)'),
      exchange: z
        .string()
        .optional()
        .nullable()
        .describe('Restrict to a specific exchange (optional, e.g., "NASDAQ")'),
    }),
    execute: async ({ query, limit = 10, exchange }) =>
      toToolResponse(
        await getFMPClient().search.search({ query, limit, exchange: exchange ?? undefined }),
      ),
  }),
];

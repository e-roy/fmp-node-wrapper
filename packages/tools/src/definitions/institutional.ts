import { z } from 'zod';
import { getFMPClient } from '@/client';
import { limitRows, toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const institutionalDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getInstitutionalHolders',
    description:
      'Get the largest institutional holders of a stock (by shares held), showing which institutions own shares and their holdings',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'Stock symbol is required')
        .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(20)
        .describe('Max number of holders to return, largest first (default 20)'),
    }),
    // FMP returns thousands of holders in no particular order (~1 MB for AAPL),
    // so sort by shares held and keep the top `limit`.
    execute: async ({ symbol, limit = 20 }) =>
      toToolResponse(
        limitRows(
          await getFMPClient().institutional.getInstitutionalHolders({ symbol }),
          limit,
          (a, b) => b.shares - a.shares,
        ),
      ),
  }),
];

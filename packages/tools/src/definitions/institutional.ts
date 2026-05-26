import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const institutionalDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getInstitutionalHolders',
    description:
      'Get institutional holders for a specific stock symbol showing which institutions own shares and their holdings',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'Stock symbol is required')
        .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
    }),
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().institutional.getInstitutionalHolders({ symbol })),
  }),
];

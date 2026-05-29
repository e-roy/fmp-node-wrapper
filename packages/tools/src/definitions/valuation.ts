import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const symbolSchema = z.object({
  symbol: z.string().min(1).describe('The stock symbol (e.g., AAPL)'),
});

export const valuationDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getDiscountedCashFlow',
    description:
      "Get the discounted-cash-flow (DCF) fair-value estimate vs. the current price for a company",
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().valuation.getDiscountedCashFlow({ symbol })),
  }),
  defineTool({
    name: 'getCompanyRating',
    description: "Get FMP's current rating/score snapshot for a company",
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().valuation.getRatingSnapshot({ symbol })),
  }),
];

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { limitRows, toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const symbolSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
});

export const companyDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getCompanyProfile',
    description: 'Get the company profile for a company',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().company.getCompanyProfile(symbol)),
  }),
  defineTool({
    name: 'getCompanySharesFloat',
    description: 'Get the company shares float',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().company.getSharesFloat(symbol)),
  }),
  defineTool({
    name: 'getCompanyExecutiveCompensation',
    description: 'Get the company executive compensation (at most `limit` records)',
    inputSchema: symbolSchema.extend({
      limit: z
        .number()
        .int()
        .positive()
        .default(20)
        .describe('Max number of compensation records to return (default 20)'),
    }),
    execute: async ({ symbol, limit = 20 }) =>
      toToolResponse(limitRows(await getFMPClient().company.getExecutiveCompensation(symbol), limit)),
  }),
  defineTool({
    name: 'getStockPeers',
    description: 'Get a list of peer companies (with price and market cap) for a company',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().company.getStockPeers(symbol)),
  }),
];

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
    description: 'Get the company executive compensation',
    inputSchema: symbolSchema,
    execute: async ({ symbol }) =>
      toToolResponse(await getFMPClient().company.getExecutiveCompensation(symbol)),
  }),
];

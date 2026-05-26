import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';

export const getCompanyProfile = createOpenAITool({
  name: 'getCompanyProfile',
  description: 'Get the company profile for a company',
  inputSchema: z.object({
    symbol: z
      .string()
      .min(1, 'Stock symbol is required')
      .describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
  }),
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const companyProfile = await fmp.company.getCompanyProfile(symbol);
    return toToolResponse(companyProfile);
  },
});

export const getCompanySharesFloat = createOpenAITool({
  name: 'getCompanySharesFloat',
  description: 'Get the company shares float',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
  }),
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const companySharesFloat = await fmp.company.getSharesFloat(symbol);
    return toToolResponse(companySharesFloat);
  },
});

export const getCompanyExecutiveCompensation = createOpenAITool({
  name: 'getCompanyExecutiveCompensation',
  description: 'Get the company executive compensation',
  inputSchema: z.object({
    symbol: z.string().describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
  }),
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const companyExecutiveCompensation = await fmp.company.getExecutiveCompensation(symbol);
    return toToolResponse(companyExecutiveCompensation);
  },
});

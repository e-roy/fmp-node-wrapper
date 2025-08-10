import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/types';

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
    return JSON.stringify(companyProfile.data, null, 2);
  },
});

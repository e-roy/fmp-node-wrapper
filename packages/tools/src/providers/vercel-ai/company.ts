import { z } from 'zod';
import { createTool } from '@/utils/aisdk-tool-wrapper';
import { getFMPClient } from '@/types';

export const companyTools = {
  getCompanyProfile: createTool({
    name: 'getCompanyProfile',
    description: 'Get the company profile',
    inputSchema: z.object({
      symbol: z.string().describe('The stock ticker symbol (e.g., AAPL)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const companyProfile = await fmp.company.getCompanyProfile(symbol);
      const response = JSON.stringify(companyProfile.data, null, 2);
      return response;
    },
  }),
};

import { z } from 'zod';
import { createTool } from '@/utils/aisdk-tool-wrapper';
import { getFMPClient } from '@/client';

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
  getCompanySharesFloat: createTool({
    name: 'getCompanySharesFloat',
    description: 'Get the company shares float',
    inputSchema: z.object({
      symbol: z.string().describe('The stock ticker symbol (e.g., AAPL)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const companySharesFloat = await fmp.company.getSharesFloat(symbol);
      const response = JSON.stringify(companySharesFloat.data, null, 2);
      return response;
    },
  }),

  getCompanyExecutiveCompensation: createTool({
    name: 'getCompanyExecutiveCompensation',
    description: 'Get the company executive compensation',
    inputSchema: z.object({
      symbol: z.string().describe('The stock ticker symbol (e.g., AAPL)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const companyExecutiveCompensation = await fmp.company.getExecutiveCompensation(symbol);
      const response = JSON.stringify(companyExecutiveCompensation.data, null, 2);
      return response;
    },
  }),
};

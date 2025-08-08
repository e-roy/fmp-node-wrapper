import { z } from 'zod';
import { getFMPClient } from '@/types';
import { createTool } from '@/utils/tool-wrapper';

export const etfTools = {
  getETFHoldings: createTool({
    name: 'getETFHoldings',
    description: 'Get ETF holdings for a specific ETF symbol',
    inputSchema: z.object({
      symbol: z.string().describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
      date: z.string().optional().describe('Date for holdings (YYYY-MM-DD format)'),
    }),
    execute: async ({ symbol, date }) => {
      const fmp = getFMPClient();
      const params: any = { symbol };
      if (date) {
        params.date = date;
      }
      const etfHoldings = await fmp.etf.getHoldings(params);
      const response = JSON.stringify(etfHoldings.data, null, 2);
      return response;
    },
  }),

  getETFProfile: createTool({
    name: 'getETFProfile',
    description: 'Get ETF profile information',
    inputSchema: z.object({
      symbol: z.string().describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const etfProfile = await fmp.etf.getProfile(symbol);
      const response = JSON.stringify(etfProfile.data, null, 2);
      return response;
    },
  }),
};

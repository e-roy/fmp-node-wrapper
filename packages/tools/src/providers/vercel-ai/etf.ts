import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { createTool } from '@/utils/aisdk-tool-wrapper';

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
      const response = toToolResponse(etfHoldings);
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
      const response = toToolResponse(etfProfile);
      return response;
    },
  }),
};

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const stockTools = {
  getMarketCap: createTool({
    name: 'getMarketCap',
    description: 'Get market capitalization for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get market cap for'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const marketCap = await fmp.stock.getMarketCap(symbol);
      const response = JSON.stringify(marketCap.data, null, 2);
      return response;
    },
  }),

  getStockSplits: createTool({
    name: 'getStockSplits',
    description: 'Get stock splits history for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get stock splits for'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const stockSplits = await fmp.stock.getStockSplits(symbol);
      const response = JSON.stringify(stockSplits.data, null, 2);
      return response;
    },
  }),

  getDividendHistory: createTool({
    name: 'getDividendHistory',
    description: 'Get dividend history for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The stock symbol to get dividend history for'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const dividendHistory = await fmp.stock.getDividendHistory(symbol);
      const response = JSON.stringify(dividendHistory.data, null, 2);
      return response;
    },
  }),
};

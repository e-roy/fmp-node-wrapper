import { z } from 'zod';
import { getFMPClient } from '@/types';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const quoteTools = {
  getStockQuote: createTool({
    name: 'getStockQuote',
    description: 'Get the stock quote for a company',
    inputSchema: z.object({
      symbol: z.string().describe('The symbol of the company to get the stock quote for'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const stockQuote = await fmp.quote.getQuote(symbol);
      const response = JSON.stringify(stockQuote.data, null, 2);
      return response;
    },
  }),
};

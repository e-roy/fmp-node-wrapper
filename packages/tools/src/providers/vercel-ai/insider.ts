import { z } from 'zod';
import { createTool } from '@/utils/tool-wrapper';
import { getFMPClient } from '@/types';

export const insiderTools = {
  getInsiderTrading: createTool({
    name: 'getInsiderTrading',
    description: 'Get insider trading data for a specific stock symbol',
    inputSchema: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
      page: z.number().default(0).describe('Page number for pagination'),
    }),
    execute: async ({ symbol, page }) => {
      const fmp = getFMPClient();
      const insiderTrading = await fmp.insider.getInsiderTradesBySymbol(symbol, page);
      const response = JSON.stringify(insiderTrading.data, null, 2);
      return response;
    },
  }),
};

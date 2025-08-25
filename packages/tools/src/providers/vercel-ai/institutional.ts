import { z } from 'zod';
import { getFMPClient } from '@/types';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const institutionalTools = {
  getInstitutionalHolders: createTool({
    name: 'getInstitutionalHolders',
    description: 'Get institutional holders for a specific stock symbol',
    inputSchema: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const institutionalHolders = await fmp.institutional.getInstitutionalHolders({ symbol });
      const response = JSON.stringify(institutionalHolders.data, null, 2);
      return response;
    },
  }),
};

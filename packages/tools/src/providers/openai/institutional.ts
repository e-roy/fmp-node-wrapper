import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/types';

// Input schema for institutional holders with symbol
const institutionalHoldersInputSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
});

export const getInstitutionalHolders = createOpenAITool({
  name: 'getInstitutionalHolders',
  description:
    'Get institutional holders for a specific stock symbol showing which institutions own shares and their holdings',
  inputSchema: institutionalHoldersInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const institutionalHolders = await fmp.institutional.getInstitutionalHolders({ symbol });

    // Return formatted JSON string
    return JSON.stringify(institutionalHolders.data, null, 2);
  },
});

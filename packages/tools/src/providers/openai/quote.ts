import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

// Input schema for stock quote with symbol
const stockQuoteInputSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('The symbol of the company to get the stock quote for'),
});

export const getStockQuote = createOpenAITool({
  name: 'getStockQuote',
  description:
    'Get the real-time stock quote for a company including price, volume, and market data',
  inputSchema: stockQuoteInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const stockQuote = await fmp.quote.getQuote(symbol);
    return JSON.stringify(stockQuote.data, null, 2);
  },
});

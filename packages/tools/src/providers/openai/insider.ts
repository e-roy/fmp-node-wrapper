import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

// Input schema for insider trading with symbol and optional page
const insiderTradingInputSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
  page: z
    .number()
    .int()
    .min(0)
    .default(0)
    .describe('Page number for pagination (optional, defaults to 0)'),
});

export const getInsiderTrading = createOpenAITool({
  name: 'getInsiderTrading',
  description:
    'Get insider trading data for a specific stock symbol showing buy/sell transactions by company insiders',
  inputSchema: insiderTradingInputSchema,
  execute: async ({ symbol, page }) => {
    const fmp = getFMPClient();
    const insiderTrading = await fmp.insider.getInsiderTradesBySymbol(symbol, page);
    return JSON.stringify(insiderTrading.data, null, 2);
  },
});

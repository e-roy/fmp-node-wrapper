import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

// Input schema for symbol-based stock operations
const symbolInputSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('The stock symbol (e.g., AAPL, MSFT, GOOGL)'),
});

export const getMarketCap = createOpenAITool({
  name: 'getMarketCap',
  description: 'Get market capitalization for a company showing current market value',
  inputSchema: symbolInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const marketCap = await fmp.stock.getMarketCap(symbol);
    return JSON.stringify(marketCap.data, null, 2);
  },
});

export const getStockSplits = createOpenAITool({
  name: 'getStockSplits',
  description: 'Get stock splits history for a company showing all historical stock split events',
  inputSchema: symbolInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const stockSplits = await fmp.stock.getStockSplits(symbol);
    return JSON.stringify(stockSplits.data, null, 2);
  },
});

export const getDividendHistory = createOpenAITool({
  name: 'getDividendHistory',
  description: 'Get dividend history for a company showing all historical dividend payments',
  inputSchema: symbolInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const dividendHistory = await fmp.stock.getDividendHistory(symbol);
    return JSON.stringify(dividendHistory.data, null, 2);
  },
});

export const stockTools = [getMarketCap, getStockSplits, getDividendHistory];

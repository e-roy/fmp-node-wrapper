import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

// Input schema for ETF holdings with optional date
const etfHoldingsInputSchema = z.object({
  symbol: z.string().min(1, 'ETF symbol is required').describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
  date: z.string().optional().describe('Date for holdings in YYYY-MM-DD format (optional)'),
});

// Input schema for ETF profile
const etfProfileInputSchema = z.object({
  symbol: z.string().min(1, 'ETF symbol is required').describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
});

export const getETFHoldings = createOpenAITool({
  name: 'getETFHoldings',
  description:
    'Get ETF holdings for a specific ETF symbol, showing the underlying assets and their weights',
  inputSchema: etfHoldingsInputSchema,
  execute: async ({ symbol, date }) => {
    const fmp = getFMPClient();
    const params: any = { symbol };
    if (date) {
      params.date = date;
    }

    const etfHoldings = await fmp.etf.getHoldings(params);
    return JSON.stringify(etfHoldings.data, null, 2);
  },
});

export const getETFProfile = createOpenAITool({
  name: 'getETFProfile',
  description: 'Get ETF profile information including fund details, expense ratio, and key metrics',
  inputSchema: etfProfileInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const etfProfile = await fmp.etf.getProfile(symbol);
    return JSON.stringify(etfProfile.data, null, 2);
  },
});

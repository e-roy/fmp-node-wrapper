import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/types';

// Input schema for symbol-based trading data
const symbolInputSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Stock symbol is required')
    .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
});

// Input schema for name-based trading data
const nameInputSchema = z.object({
  name: z.string().min(1, 'Name is required').describe('The name of the senator or representative'),
});

// Input schema for RSS feed with pagination
const rssFeedInputSchema = z.object({
  page: z
    .number()
    .int()
    .min(0)
    .default(0)
    .describe('Page number for pagination (optional, defaults to 0)'),
});

export const getSenateTrading = createOpenAITool({
  name: 'getSenateTrading',
  description: 'Get senate trading data for a specific stock symbol showing senator transactions',
  inputSchema: symbolInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const senateTrading = await fmp.senateHouse.getSenateTrading({ symbol });
    return JSON.stringify(senateTrading.data, null, 2);
  },
});

export const getHouseTrading = createOpenAITool({
  name: 'getHouseTrading',
  description:
    'Get house trading data for a specific stock symbol showing representative transactions',
  inputSchema: symbolInputSchema,
  execute: async ({ symbol }) => {
    const fmp = getFMPClient();
    const houseTrading = await fmp.senateHouse.getHouseTrading({ symbol });
    return JSON.stringify(houseTrading.data, null, 2);
  },
});

export const getSenateTradingByName = createOpenAITool({
  name: 'getSenateTradingByName',
  description:
    'Get senate trading data for a specific senator by name showing their trading activity',
  inputSchema: nameInputSchema,
  execute: async ({ name }) => {
    const fmp = getFMPClient();
    const senateTradingByName = await fmp.senateHouse.getSenateTradingByName({ name });
    return JSON.stringify(senateTradingByName.data, null, 2);
  },
});

export const getHouseTradingByName = createOpenAITool({
  name: 'getHouseTradingByName',
  description:
    'Get house trading data for a specific representative by name showing their trading activity',
  inputSchema: nameInputSchema,
  execute: async ({ name }) => {
    const fmp = getFMPClient();
    const houseTradingByName = await fmp.senateHouse.getHouseTradingByName({ name });
    return JSON.stringify(houseTradingByName.data, null, 2);
  },
});

export const getSenateTradingRSSFeed = createOpenAITool({
  name: 'getSenateTradingRSSFeed',
  description:
    'Get senate trading data through RSS feed with pagination showing recent senate transactions',
  inputSchema: rssFeedInputSchema,
  execute: async ({ page }) => {
    const fmp = getFMPClient();
    const senateTradingRSSFeed = await fmp.senateHouse.getSenateTradingRSSFeed({ page });
    return JSON.stringify(senateTradingRSSFeed.data, null, 2);
  },
});

export const getHouseTradingRSSFeed = createOpenAITool({
  name: 'getHouseTradingRSSFeed',
  description:
    'Get house trading data through RSS feed with pagination showing recent house transactions',
  inputSchema: rssFeedInputSchema,
  execute: async ({ page }) => {
    const fmp = getFMPClient();
    const houseTradingRSSFeed = await fmp.senateHouse.getHouseTradingRSSFeed({ page });
    return JSON.stringify(houseTradingRSSFeed.data, null, 2);
  },
});

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const senateHouseTools = {
  getSenateTrading: createTool({
    name: 'getSenateTrading',
    description: 'Get senate trading data for a specific stock symbol',
    inputSchema: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const senateTrading = await fmp.senateHouse.getSenateTrading({ symbol });
      const response = toToolResponse(senateTrading);
      return response;
    },
  }),

  getHouseTrading: createTool({
    name: 'getHouseTrading',
    description: 'Get house trading data for a specific stock symbol',
    inputSchema: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
    }),
    execute: async ({ symbol }) => {
      const fmp = getFMPClient();
      const houseTrading = await fmp.senateHouse.getHouseTrading({ symbol });
      const response = toToolResponse(houseTrading);
      return response;
    },
  }),

  getSenateTradingByName: createTool({
    name: 'getSenateTradingByName',
    description: 'Get senate trading data for a specific senator by name',
    inputSchema: z.object({
      name: z.string().describe('The name of the senator to get trading data for'),
    }),
    execute: async ({ name }) => {
      const fmp = getFMPClient();
      const senateTradingByName = await fmp.senateHouse.getSenateTradingByName({ name });
      const response = toToolResponse(senateTradingByName);
      return response;
    },
  }),

  getHouseTradingByName: createTool({
    name: 'getHouseTradingByName',
    description: 'Get house trading data for a specific representative by name',
    inputSchema: z.object({
      name: z.string().describe('The name of the representative to get trading data for'),
    }),
    execute: async ({ name }) => {
      const fmp = getFMPClient();
      const houseTradingByName = await fmp.senateHouse.getHouseTradingByName({ name });
      const response = toToolResponse(houseTradingByName);
      return response;
    },
  }),

  getSenateTradingRSSFeed: createTool({
    name: 'getSenateTradingRSSFeed',
    description: 'Get senate trading data through RSS feed with pagination',
    inputSchema: z.object({
      page: z.number().default(0).describe('Page number for pagination'),
    }),
    execute: async ({ page = 0 }) => {
      const fmp = getFMPClient();
      const senateTradingRSSFeed = await fmp.senateHouse.getSenateTradingRSSFeed({ page });
      const response = toToolResponse(senateTradingRSSFeed);
      return response;
    },
  }),

  getHouseTradingRSSFeed: createTool({
    name: 'getHouseTradingRSSFeed',
    description: 'Get house trading data through RSS feed with pagination',
    inputSchema: z.object({
      page: z.number().default(0).describe('Page number for pagination'),
    }),
    execute: async ({ page = 0 }) => {
      const fmp = getFMPClient();
      const houseTradingRSSFeed = await fmp.senateHouse.getHouseTradingRSSFeed({ page });
      const response = toToolResponse(houseTradingRSSFeed);
      return response;
    },
  }),
};

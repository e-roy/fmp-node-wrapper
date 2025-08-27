import { z } from 'zod';
import { getFMPClient } from '@/client';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const marketTools = {
  getMarketPerformance: createTool({
    name: 'getMarketPerformance',
    description: 'Get overall market performance data',
    inputSchema: z.object({}),
    execute: async () => {
      const fmp = getFMPClient();
      const marketPerformance = await fmp.market.getMarketPerformance();
      const response = JSON.stringify(marketPerformance.data, null, 2);
      return response;
    },
  }),

  getSectorPerformance: createTool({
    name: 'getSectorPerformance',
    description: 'Get sector performance data',
    inputSchema: z.object({}),
    execute: async () => {
      const fmp = getFMPClient();
      const sectorPerformance = await fmp.market.getSectorPerformance();
      const response = JSON.stringify(sectorPerformance.data, null, 2);
      return response;
    },
  }),

  getGainers: createTool({
    name: 'getGainers',
    description: 'Get top gaining stocks',
    inputSchema: z.object({}),
    execute: async () => {
      const fmp = getFMPClient();
      const gainers = await fmp.market.getGainers();
      const response = JSON.stringify(gainers.data, null, 2);
      return response;
    },
  }),

  getLosers: createTool({
    name: 'getLosers',
    description: 'Get top losing stocks',
    inputSchema: z.object({}),
    execute: async () => {
      const fmp = getFMPClient();
      const losers = await fmp.market.getLosers();
      const response = JSON.stringify(losers.data, null, 2);
      return response;
    },
  }),

  getMostActive: createTool({
    name: 'getMostActive',
    description: 'Get most active stocks',
    inputSchema: z.object({}),
    execute: async () => {
      const fmp = getFMPClient();
      const mostActive = await fmp.market.getMostActive();
      const response = JSON.stringify(mostActive.data, null, 2);
      return response;
    },
  }),
};

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const marketTools = {
  getMarketPerformance: createTool({
    name: 'getMarketPerformance',
    description: 'Get overall market performance data',
    inputSchema: z.object({}),
    execute: async () => {
      const fmp = getFMPClient();
      const marketPerformance = await fmp.market.getMarketPerformance();
      const response = toToolResponse(marketPerformance);
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
      const response = toToolResponse(sectorPerformance);
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
      const response = toToolResponse(gainers);
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
      const response = toToolResponse(losers);
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
      const response = toToolResponse(mostActive);
      return response;
    },
  }),
};

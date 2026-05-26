import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';

// Empty schema for tools that don't require parameters
const emptyInputSchema = z.object({});

export const getMarketPerformance = createOpenAITool({
  name: 'getMarketPerformance',
  description: 'Get overall market performance data including major indices performance',
  inputSchema: emptyInputSchema,
  execute: async () => {
    const fmp = getFMPClient();
    const marketPerformance = await fmp.market.getMarketPerformance();
    return toToolResponse(marketPerformance);
  },
});

export const getSectorPerformance = createOpenAITool({
  name: 'getSectorPerformance',
  description: 'Get sector performance data showing how different market sectors are performing',
  inputSchema: emptyInputSchema,
  execute: async () => {
    const fmp = getFMPClient();
    const sectorPerformance = await fmp.market.getSectorPerformance();
    return toToolResponse(sectorPerformance);
  },
});

export const getGainers = createOpenAITool({
  name: 'getGainers',
  description: 'Get top gaining stocks showing the best performing stocks of the day',
  inputSchema: emptyInputSchema,
  execute: async () => {
    const fmp = getFMPClient();
    const gainers = await fmp.market.getGainers();
    return toToolResponse(gainers);
  },
});

export const getLosers = createOpenAITool({
  name: 'getLosers',
  description: 'Get top losing stocks showing the worst performing stocks of the day',
  inputSchema: emptyInputSchema,
  execute: async () => {
    const fmp = getFMPClient();
    const losers = await fmp.market.getLosers();
    return toToolResponse(losers);
  },
});

export const getMostActive = createOpenAITool({
  name: 'getMostActive',
  description: 'Get most active stocks showing stocks with the highest trading volume',
  inputSchema: emptyInputSchema,
  execute: async () => {
    const fmp = getFMPClient();
    const mostActive = await fmp.market.getMostActive();
    return toToolResponse(mostActive);
  },
});

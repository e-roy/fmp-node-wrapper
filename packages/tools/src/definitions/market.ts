import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const empty = z.object({});

export const marketDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getMarketPerformance',
    description: 'Get overall market performance data including major indices performance',
    inputSchema: empty,
    execute: async () => toToolResponse(await getFMPClient().market.getMarketPerformance()),
  }),
  defineTool({
    name: 'getSectorPerformance',
    description: 'Get sector performance data showing how different market sectors are performing',
    inputSchema: empty,
    execute: async () => toToolResponse(await getFMPClient().market.getSectorPerformance()),
  }),
  defineTool({
    name: 'getGainers',
    description: 'Get top gaining stocks showing the best performing stocks of the day',
    inputSchema: empty,
    execute: async () => toToolResponse(await getFMPClient().market.getGainers()),
  }),
  defineTool({
    name: 'getLosers',
    description: 'Get top losing stocks showing the worst performing stocks of the day',
    inputSchema: empty,
    execute: async () => toToolResponse(await getFMPClient().market.getLosers()),
  }),
  defineTool({
    name: 'getMostActive',
    description: 'Get most active stocks showing stocks with the highest trading volume',
    inputSchema: empty,
    execute: async () => toToolResponse(await getFMPClient().market.getMostActive()),
  }),
];

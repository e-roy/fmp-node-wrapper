import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse, toToolResponse } from '@/utils/format-response';
import { capLimit } from '@/utils/tool-input';
import { defineTool, type FMPToolDefinition } from './types';

const empty = z.object({});

const snapshotDateSchema = z.object({
  date: z.string().min(1).describe('Snapshot date in YYYY-MM-DD format'),
  exchange: z
    .string()
    .optional()
    .nullable()
    .describe('Optional exchange filter (e.g., NASDAQ, NYSE)'),
});

export const marketDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getMarketPerformance',
    description:
      'Get overall market performance data including major indices performance (at most `limit` indices)',
    inputSchema: z.object({
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe('Max number of indices to return (default 50, max 100)'),
    }),
    execute: async ({ limit }) => {
      const cap = capLimit(limit, 50, 100);
      return toCappedToolResponse(await getFMPClient().market.getMarketPerformance(), cap.limit, {
        notice: cap.notice,
        max: cap.max,
      });
    },
  }),
  defineTool({
    name: 'getSectorPerformance',
    description:
      'Get a sector-performance snapshot for a given date, showing the average change per sector by exchange',
    inputSchema: snapshotDateSchema,
    execute: async ({ date, exchange }) =>
      toToolResponse(
        await getFMPClient().market.getSectorPerformance({
          date,
          exchange: exchange ?? undefined,
        }),
      ),
  }),
  defineTool({
    name: 'getIndustryPESnapshot',
    description:
      'Get an industry P/E snapshot for a given date, showing the average price-to-earnings ratio per industry by exchange',
    inputSchema: snapshotDateSchema,
    execute: async ({ date, exchange }) =>
      toToolResponse(
        await getFMPClient().market.getIndustryPESnapshot({
          date,
          exchange: exchange ?? undefined,
        }),
      ),
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

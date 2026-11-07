import { z } from 'zod';
import { getFMPClient } from '@/client';
import { limitRows, toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const dateRangeSchema = z.object({
  from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
  limit: z
    .number()
    .int()
    .positive()
    .default(50)
    .describe('Max number of entries to return (default 50)'),
});

export const calendarDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getEarningsCalendar',
    description:
      'Get earnings calendar showing upcoming and recent earnings announcements (at most `limit` entries; narrow the date range for full coverage)',
    inputSchema: dateRangeSchema,
    execute: async ({ from, to, limit = 50 }) =>
      toToolResponse(
        limitRows(
          await getFMPClient().calendar.getEarningsCalendar({
            from: from ?? undefined,
            to: to ?? undefined,
          }),
          limit,
        ),
      ),
  }),
  defineTool({
    name: 'getEconomicCalendar',
    description:
      'Get economic calendar showing upcoming and recent economic events and indicators (at most `limit` entries; narrow the date range for full coverage)',
    inputSchema: dateRangeSchema,
    execute: async ({ from, to, limit = 50 }) =>
      toToolResponse(
        limitRows(
          await getFMPClient().calendar.getEconomicsCalendar({
            from: from ?? undefined,
            to: to ?? undefined,
          }),
          limit,
        ),
      ),
  }),
];

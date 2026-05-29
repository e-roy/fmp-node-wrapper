import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const dateRangeSchema = z.object({
  from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
});

export const calendarDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getEarningsCalendar',
    description: 'Get earnings calendar showing upcoming and recent earnings announcements',
    inputSchema: dateRangeSchema,
    execute: async ({ from, to }) =>
      toToolResponse(
        await getFMPClient().calendar.getEarningsCalendar({
          from: from ?? undefined,
          to: to ?? undefined,
        }),
      ),
  }),
  defineTool({
    name: 'getEconomicCalendar',
    description: 'Get economic calendar showing upcoming and recent economic events and indicators',
    inputSchema: dateRangeSchema,
    execute: async ({ from, to }) =>
      toToolResponse(
        await getFMPClient().calendar.getEconomicsCalendar({
          from: from ?? undefined,
          to: to ?? undefined,
        }),
      ),
  }),
];

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse } from '@/utils/format-response';
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
      'Get earnings calendar showing upcoming and recent earnings announcements, in date order. A week can hold ~2,000 companies worldwide, so pass `symbols` to look up specific companies (e.g. mega-cap tech) instead of scanning the whole calendar.',
    inputSchema: dateRangeSchema.extend({
      symbols: z
        .array(z.string().min(1))
        .optional()
        .nullable()
        .describe('Only return these symbols (e.g., ["AAPL", "MSFT", "NVDA"])'),
    }),
    execute: async ({ from, to, symbols, limit }) => {
      const res = await getFMPClient().calendar.getEarningsCalendar({
        from: from ?? undefined,
        to: to ?? undefined,
      });
      // FMP has no symbol filter for this endpoint, so filter the date range here.
      const wanted = symbols?.length ? new Set(symbols.map(s => s.toUpperCase())) : null;
      const filtered =
        wanted && res.success !== false && Array.isArray(res.data)
          ? { ...res, data: res.data.filter(row => wanted.has(row.symbol.toUpperCase())) }
          : res;
      return toCappedToolResponse(filtered, limit ?? 50, {
        hint: 'Rows are in date order. Pass `symbols` to find specific companies, or narrow the date range.',
      });
    },
  }),
  defineTool({
    name: 'getEconomicCalendar',
    description:
      'Get economic calendar showing upcoming and recent economic events and indicators, in date order (at most `limit` entries; narrow the date range for full coverage)',
    inputSchema: dateRangeSchema,
    execute: async ({ from, to, limit }) =>
      toCappedToolResponse(
        await getFMPClient().calendar.getEconomicsCalendar({
          from: from ?? undefined,
          to: to ?? undefined,
        }),
        limit ?? 50,
        { hint: 'Rows are in date order; narrow the date range to see the rest.' },
      ),
  }),
];

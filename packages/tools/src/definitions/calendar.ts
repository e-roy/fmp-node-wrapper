import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse } from '@/utils/format-response';
import { capLimit } from '@/utils/tool-input';
import { defineTool, type FMPToolDefinition } from './types';

const MAX_ROWS = 100;
// FMP serves at most 90 days (inclusive) per calendar request; a longer range
// silently keeps only its LAST 90 days, dropping the soonest dates.
const MAX_RANGE_DAYS = 90;
const DAY_MS = 24 * 60 * 60 * 1000;

const dateRangeSchema = z.object({
  from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
  limit: z
    .number()
    .int()
    .positive()
    .default(50)
    .describe(`Max number of entries to return (default 50, max ${MAX_ROWS})`),
});

const isoDate = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

/**
 * Keep a requested range within FMP's 90-day window, anchored at `from` (the soonest
 * dates), and return a notice telling the model how to fetch the rest.
 */
export function clampRange(
  from?: string | null,
  to?: string | null,
): { from?: string; to?: string; notice?: string } {
  if (!from) return { to: to ?? undefined };
  const start = Date.parse(from);
  if (Number.isNaN(start)) return { from, to: to ?? undefined };
  const lastAllowed = start + (MAX_RANGE_DAYS - 1) * DAY_MS;
  if (!to) {
    // FMP ignores a lone `from` (it returns the 90 days ending today), so give it
    // an explicit end: the full 90-day window starting at `from`.
    const end = isoDate(lastAllowed);
    return {
      from,
      to: end,
      notice: `No end date given, so this covers ${from} to ${end} (FMP's ${MAX_RANGE_DAYS}-day maximum).`,
    };
  }
  if (!(Date.parse(to) > lastAllowed)) return { from, to };
  const clampedTo = isoDate(lastAllowed);
  const nextFrom = isoDate(lastAllowed + DAY_MS);
  return {
    from,
    to: clampedTo,
    notice: `FMP serves at most ${MAX_RANGE_DAYS} days per request, so this covers ${from} to ${clampedTo}; call again with from=${nextFrom} for the rest.`,
  };
}

export const calendarDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getEarningsCalendar',
    description:
      'Get earnings calendar showing upcoming and recent earnings announcements, in date order. A week can hold ~2,000 companies worldwide, so pass `symbols` to look up specific companies (e.g. mega-cap tech) instead of scanning the whole calendar. Ranges longer than 90 days are cut to the first 90.',
    inputSchema: dateRangeSchema.extend({
      symbols: z
        .array(z.string().min(1))
        .optional()
        .nullable()
        .describe('Only return these symbols (e.g., ["AAPL", "MSFT", "NVDA"])'),
    }),
    execute: async ({ from, to, symbols, limit }) => {
      const range = clampRange(from, to);
      const res = await getFMPClient().calendar.getEarningsCalendar({
        from: range.from,
        to: range.to,
      });
      // FMP has no symbol filter for this endpoint, so filter the date range here.
      const wanted = symbols?.length ? new Set(symbols.map(s => s.toUpperCase())) : null;
      const filtered =
        wanted && res.success !== false && Array.isArray(res.data)
          ? { ...res, data: res.data.filter(row => wanted.has(row.symbol.toUpperCase())) }
          : res;
      const cap = capLimit(limit, 50, MAX_ROWS);
      return toCappedToolResponse(filtered, cap.limit, {
        notice: [range.notice, cap.notice],
        hint: 'Rows are in date order. Pass `symbols` to find specific companies, or narrow the date range.',
      });
    },
  }),
  defineTool({
    name: 'getEconomicCalendar',
    description:
      'Get economic calendar showing upcoming and recent economic events and indicators, in date order (at most `limit` entries; ranges longer than 90 days are cut to the first 90)',
    inputSchema: dateRangeSchema,
    execute: async ({ from, to, limit }) => {
      const range = clampRange(from, to);
      const cap = capLimit(limit, 50, MAX_ROWS);
      return toCappedToolResponse(
        await getFMPClient().calendar.getEconomicsCalendar({ from: range.from, to: range.to }),
        cap.limit,
        {
          notice: [range.notice, cap.notice],
          hint: 'Rows are in date order; narrow the date range to see the rest.',
        },
      );
    },
  }),
];

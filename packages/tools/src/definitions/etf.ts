import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toCappedToolResponse, toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

export const etfDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getETFHoldings',
    description:
      'Get the largest holdings of an ETF (by portfolio weight), showing the underlying assets and their weights',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'ETF symbol is required')
        .describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
      date: z
        .string()
        .optional()
        .nullable()
        .describe('Holdings date in YYYY-MM-DD format (optional; defaults to the latest filing)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe('Max number of holdings to return, largest weight first (default 50)'),
    }),
    execute: async ({ symbol, date, limit }) => {
      const client = getFMPClient();
      // FMP returns no holdings without a date, so default to the latest filing date.
      let holdingsDate = date ?? undefined;
      if (!holdingsDate) {
        const dates = await client.etf.getHoldingDates(symbol);
        if (dates.success !== false && Array.isArray(dates.data)) {
          holdingsDate = dates.data.reduce<string | undefined>(
            (latest, d) => (!latest || d.date > latest ? d.date : latest),
            undefined,
          );
        }
      }
      // `date` is optional; the holdings params type treats it as required, so widen.
      const params: any = { symbol };
      if (holdingsDate) {
        params.date = holdingsDate;
      }
      return toCappedToolResponse(await client.etf.getHoldings(params), limit ?? 50, {
        compare: (a, b) => b.pctVal - a.pctVal,
        hint: `Largest positions first, as of ${holdingsDate ?? 'the requested date'}.`,
      });
    },
  }),
  defineTool({
    name: 'getETFProfile',
    description: 'Get ETF profile information including fund details, expense ratio, and key metrics',
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'ETF symbol is required')
        .describe('ETF symbol (e.g., SPY, QQQ, VTI)'),
    }),
    execute: async ({ symbol }) => toToolResponse(await getFMPClient().etf.getProfile(symbol)),
  }),
];

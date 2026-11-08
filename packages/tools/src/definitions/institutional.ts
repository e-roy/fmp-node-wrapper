import { z } from 'zod';
import type { InstitutionalHolderResponse } from 'fmp-node-api';
import { getFMPClient } from '@/client';
import { toCappedToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

/** Collapse spelling variants of one filer ("BlackRock, Inc." / "BlackRock Inc."). */
const holderKey = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(inc|corp|corporation|co|llc|ltd|lp|plc|the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * FMP returns every 13F filing it has for a symbol — decades of them (~8,500 rows
 * for AAPL, back to 1999). Keep each holder's latest filing, and drop filings more
 * than a year older than the newest one so long-gone positions don't rank as
 * current holders. (Not "latest quarter only": some large filers lag a quarter.)
 */
export function currentHolders(rows: InstitutionalHolderResponse[]): InstitutionalHolderResponse[] {
  const newest = rows.reduce((max, r) => Math.max(max, Date.parse(r.dateReported) || 0), 0);
  const latest = new Map<string, InstitutionalHolderResponse>();
  for (const row of rows) {
    const reported = Date.parse(row.dateReported);
    if (!(reported >= newest - YEAR_MS)) continue;
    const key = holderKey(row.holder);
    const prev = latest.get(key);
    if (!prev || reported > Date.parse(prev.dateReported)) latest.set(key, row);
  }
  return [...latest.values()];
}

export const institutionalDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getInstitutionalHolders',
    description:
      "Get a stock's largest current institutional holders by shares held (each holder's latest 13F filing from the past year)",
    inputSchema: z.object({
      symbol: z
        .string()
        .min(1, 'Stock symbol is required')
        .describe('Stock symbol (e.g., AAPL, MSFT, GOOGL)'),
      limit: z
        .number()
        .int()
        .positive()
        .default(20)
        .describe('Max number of holders to return, largest first (default 20)'),
    }),
    execute: async ({ symbol, limit }) => {
      const res = await getFMPClient().institutional.getInstitutionalHolders({ symbol });
      const current =
        res.success !== false && Array.isArray(res.data)
          ? { ...res, data: currentHolders(res.data) }
          : res;
      return toCappedToolResponse(current, limit ?? 20, {
        compare: (a, b) => b.shares - a.shares,
        hint: 'Holders are ordered by shares held, largest first.',
      });
    },
  }),
];

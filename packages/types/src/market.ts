// Market data types for FMP API
//
// Schema-first: Zod schemas are the source of truth; TypeScript types are
// derived via `z.infer`. Base schemas generated via `gen:schemas`.

import { z } from 'zod';
import { QuoteSchema } from './quote';

// Trading hours + current open/closed status for a single exchange.
// One element per exchange from the stable /all-exchange-market-hours endpoint.
export const ExchangeMarketHoursSchema = z.object({
  exchange: z.string(),
  name: z.string(),
  openingHour: z.string(),
  closingHour: z.string(),
  timezone: z.string(),
  isMarketOpen: z.boolean(),
});

export type ExchangeMarketHours = z.infer<typeof ExchangeMarketHoursSchema>;

export const MarketPerformanceSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  change: z.number(),
  price: z.number(),
  changesPercentage: z.number(),
  // Present on the biggest-gainers/losers/most-actives (stable) endpoints.
  exchange: z.string().optional(),
});

export type MarketPerformance = z.infer<typeof MarketPerformanceSchema>;

// Per-sector average change for a given date/exchange (stable
// /sector-performance-snapshot). `averageChange` is a numeric percentage.
export const MarketSectorPerformanceSchema = z.object({
  date: z.string(),
  sector: z.string(),
  exchange: z.string(),
  averageChange: z.number(),
});

export type MarketSectorPerformance = z.infer<typeof MarketSectorPerformanceSchema>;

// Per-industry P/E for a given date/exchange (stable /industry-pe-snapshot).
export const IndustryPESnapshotSchema = z.object({
  date: z.string(),
  industry: z.string(),
  exchange: z.string(),
  pe: z.number(),
});

export type IndustryPESnapshot = z.infer<typeof IndustryPESnapshotSchema>;

// The `/quotes/index` endpoint (used by both getMarketIndex and
// getMarketPerformance) returns full quote objects for market indices — the
// same shape as Quote, plus an optional `type` discriminator on some responses.
export const MarketIndexSchema = QuoteSchema.extend({
  type: z.string().optional(),
});

export type MarketIndex = z.infer<typeof MarketIndexSchema>;

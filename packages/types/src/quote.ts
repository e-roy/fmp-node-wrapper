// Quote-related types for FMP API
//
// Schema-first: Zod schemas are the source of truth; the TypeScript types are
// derived via `z.infer`. Regenerate the base schemas from interfaces with
// `pnpm --filter fmp-node-types gen:schemas` (see scripts/), then fold edits here.

import { z } from 'zod';

// Quote data structure - unified for all asset types
export const QuoteSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  changesPercentage: z.number(),
  change: z.number(),
  dayLow: z.number(),
  dayHigh: z.number(),
  yearHigh: z.number(),
  yearLow: z.number(),
  marketCap: z.number().nullable(),
  priceAvg50: z.number(),
  priceAvg200: z.number(),
  exchange: z.string(),
  volume: z.number(),
  avgVolume: z.number(),
  open: z.number(),
  previousClose: z.number(),
  eps: z.number().nullable(),
  pe: z.number().nullable(),
  earningsAnnouncement: z.string().nullable(),
  sharesOutstanding: z.number().nullable(),
  timestamp: z.number(),
});

export type Quote = z.infer<typeof QuoteSchema>;

// Historical price data structure
export const HistoricalPriceDataSchema = z.object({
  date: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  adjClose: z.number(),
  volume: z.number(),
  unadjustedVolume: z.number(),
  change: z.number(),
  changePercent: z.number(),
  vwap: z.number(),
  label: z.string(),
  changeOverTime: z.number(),
});

export type HistoricalPriceData = z.infer<typeof HistoricalPriceDataSchema>;

// Historical price response wrapper
export const HistoricalPriceResponseSchema = z.object({
  symbol: z.string(),
  historical: z.array(HistoricalPriceDataSchema),
});

export type HistoricalPriceResponse = z.infer<typeof HistoricalPriceResponseSchema>;

// Intraday bars (/historical-chart/{interval}/{symbol}) return a leaner shape
// than HistoricalPriceData — only OHLCV, no adjusted/derived fields.
export const IntradayPriceSchema = z.object({
  date: z.string(),
  open: z.number(),
  low: z.number(),
  high: z.number(),
  close: z.number(),
  volume: z.number(),
});

export type IntradayPrice = z.infer<typeof IntradayPriceSchema>;

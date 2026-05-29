// Market data types for FMP API
//
// Schema-first: Zod schemas are the source of truth; TypeScript types are
// derived via `z.infer`. Base schemas generated via `gen:schemas`.

import { z } from 'zod';
import { QuoteSchema } from './quote';

// The named-holiday keys vary year to year (e.g. Juneteenth only appears from
// 2021), so every holiday field except `year` is optional.
export const MarketHolidaySchema = z.object({
  year: z.number(),
  'Martin Luther King, Jr. Day': z.string().optional(),
  "Presidents' Day": z.string().optional(),
  'Good Friday': z.string().optional(),
  'Memorial Day': z.string().optional(),
  Juneteenth: z.string().optional(),
  'Independence Day': z.string().optional(),
  'Labor Day': z.string().optional(),
  'Thanksgiving Day': z.string().optional(),
  Christmas: z.string().optional(),
});

export type MarketHoliday = z.infer<typeof MarketHolidaySchema>;

export const MarketHoursSchema = z.object({
  stockExchangeName: z.string(),
  stockMarketHours: z.object({
    openingHour: z.string(),
    closingHour: z.string(),
  }),
  stockMarketHolidays: z.array(MarketHolidaySchema),
  isTheStockMarketOpen: z.boolean(),
  isTheEuronextMarketOpen: z.boolean(),
  isTheForexMarketOpen: z.boolean(),
  isTheCryptoMarketOpen: z.boolean(),
});

export type MarketHours = z.infer<typeof MarketHoursSchema>;

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

export const MarketSectorPerformanceSchema = z.object({
  sector: z.string(),
  // The sector-performance endpoint returns this as a formatted string (e.g. "1.23%").
  changesPercentage: z.string(),
});

export type MarketSectorPerformance = z.infer<typeof MarketSectorPerformanceSchema>;

// The `/quotes/index` endpoint (used by both getMarketIndex and
// getMarketPerformance) returns full quote objects for market indices — the
// same shape as Quote, plus an optional `type` discriminator on some responses.
export const MarketIndexSchema = QuoteSchema.extend({
  type: z.string().optional(),
});

export type MarketIndex = z.infer<typeof MarketIndexSchema>;

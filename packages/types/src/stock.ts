// Stock-related types for FMP API
//
// Schema-first: Zod schemas are the source of truth; TypeScript types are
// derived via `z.infer`. Schemas here are hand-written because `ts-to-zod`
// cannot generate from the generic wrapper interfaces below.

import { z } from 'zod';

export const StockSplitSchema = z.object({
  date: z.string(),
  label: z.string(),
  numerator: z.number(),
  denominator: z.number(),
});

export type StockSplit = z.infer<typeof StockSplitSchema>;

export const StockSplitResponseSchema = z.object({
  symbol: z.string(),
  historical: z.array(StockSplitSchema),
});

export type StockSplitResponse = z.infer<typeof StockSplitResponseSchema>;

export const StockDividendSchema = z.object({
  date: z.string(),
  label: z.string(),
  adjDividend: z.number(),
  dividend: z.number(),
  recordDate: z.string(),
  paymentDate: z.string(),
  declarationDate: z.string(),
});

export type StockDividend = z.infer<typeof StockDividendSchema>;

export const StockDividendResponseSchema = z.object({
  symbol: z.string(),
  historical: z.array(StockDividendSchema),
});

export type StockDividendResponse = z.infer<typeof StockDividendResponseSchema>;

export const MarketCapSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  marketCap: z.number(),
});

export type MarketCap = z.infer<typeof MarketCapSchema>;

export const StockRealTimePriceSchema = z.object({
  symbol: z.string(),
  price: z.number(),
});

export type StockRealTimePrice = z.infer<typeof StockRealTimePriceSchema>;

export const StockRealTimePriceFullSchema = z.object({
  bidSize: z.number(),
  askPrice: z.number(),
  volume: z.number(),
  askSize: z.number(),
  bidPrice: z.number(),
  lastSalePrice: z.number(),
  lastSaleSize: z.number(),
  lastSaleTime: z.number(),
  fmpLast: z.number(),
  lastUpdated: z.number(),
  symbol: z.string(),
});

export type StockRealTimePriceFull = z.infer<typeof StockRealTimePriceFullSchema>;

// Price change across standard horizons (stable /stock-price-change).
// Values are percentage changes; keys mirror FMP's numeric-prefixed fields.
export const StockPriceChangeSchema = z.object({
  symbol: z.string(),
  '1D': z.number(),
  '5D': z.number(),
  '1M': z.number(),
  '3M': z.number(),
  '6M': z.number(),
  ytd: z.number(),
  '1Y': z.number(),
  '3Y': z.number(),
  '5Y': z.number(),
  '10Y': z.number(),
  max: z.number(),
});

export type StockPriceChange = z.infer<typeof StockPriceChangeSchema>;

// Generic response wrappers — kept as plain interfaces because Zod schemas
// cannot represent open generics. Not part of the schema-first surface.

// For endpoints that return { stockList: [...] }
export interface StockListResponse<T> {
  stockList: T[];
}

// For endpoints that return { companiesPriceList: [...] }
export interface CompaniesPriceListResponse<T> {
  companiesPriceList: T[];
}

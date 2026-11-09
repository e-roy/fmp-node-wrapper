// Aftermarket (extended-hours) types for FMP API
//
// Schema-first: Zod schemas are the source of truth; TypeScript types are
// derived via `z.infer`. Field shapes confirmed against the live `stable`
// surface (aftermarket-trade / aftermarket-quote).

import { z } from 'zod';

// Latest extended-hours trade (stable /aftermarket-trade).
export const AftermarketTradeSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  // null when FMP reports no extended-hours trade size (seen after the
  // post-market session closes; verified live 2026-09-26).
  tradeSize: z.number().nullable(),
  timestamp: z.number(),
});

export type AftermarketTrade = z.infer<typeof AftermarketTradeSchema>;

// Latest extended-hours bid/ask (stable /aftermarket-quote).
export const AftermarketQuoteSchema = z.object({
  symbol: z.string(),
  bidSize: z.number(),
  bidPrice: z.number(),
  askSize: z.number(),
  askPrice: z.number(),
  volume: z.number(),
  timestamp: z.number(),
});

export type AftermarketQuote = z.infer<typeof AftermarketQuoteSchema>;

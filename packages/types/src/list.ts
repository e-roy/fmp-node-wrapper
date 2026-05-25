// list types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const StockListSchema = z.object({
    symbol: z.string(),
    exchange: z.string(),
    exchangeShortName: z.string(),
    price: z.number(),
    name: z.string(),
    type: z.string()
});

export const ETFListSchema = z.object({
    symbol: z.string(),
    exchange: z.string(),
    exchangeShortName: z.string(),
    price: z.number(),
    name: z.string(),
    type: z.string()
});

export const CryptoListSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    currency: z.string(),
    stockExchange: z.string(),
    exchangeShortName: z.string()
});

export const ForexListSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    currency: z.string(),
    stockExchange: z.string(),
    exchangeShortName: z.string()
});

export const AvailableIndexesListSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    currency: z.string(),
    stockExchange: z.string(),
    exchangeShortName: z.string()
});

export type StockList = z.infer<typeof StockListSchema>;
export type ETFList = z.infer<typeof ETFListSchema>;
export type CryptoList = z.infer<typeof CryptoListSchema>;
export type ForexList = z.infer<typeof ForexListSchema>;
export type AvailableIndexesList = z.infer<typeof AvailableIndexesListSchema>;

// calendar types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const EarningsCalendarSchema = z.object({
    date: z.string(),
    symbol: z.string(),
    eps: z.number().nullable(),
    epsEstimated: z.number().nullable(),
    time: z.string().nullable(),
    revenue: z.number().nullable(),
    revenueEstimated: z.number().nullable(),
    fiscalDateEnding: z.string(),
    updatedFromDate: z.string()
});

export const EarningsConfirmedSchema = z.object({
    symbol: z.string(),
    exchange: z.string(),
    time: z.string(),
    when: z.string(),
    date: z.string(),
    publicationDate: z.string(),
    title: z.string(),
    url: z.string()
});

export const DividendsCalendarSchema = z.object({
    date: z.string(),
    label: z.string(),
    adjDividend: z.number(),
    symbol: z.string(),
    dividend: z.number(),
    recordDate: z.string().nullable(),
    paymentDate: z.string().nullable(),
    declarationDate: z.string().nullable()
});

export const EconomicsCalendarSchema = z.object({
    date: z.string(),
    country: z.string(),
    event: z.string(),
    currency: z.string(),
    previous: z.number().nullable(),
    estimate: z.number().nullable(),
    actual: z.number().nullable(),
    change: z.number().nullable(),
    impact: z.string(),
    changePercentage: z.number(),
    unit: z.string().nullable()
});

export const IPOCalendarSchema = z.object({
    date: z.string(),
    company: z.string(),
    symbol: z.string(),
    exchange: z.string(),
    actions: z.string(),
    shares: z.number().nullable(),
    priceRange: z.string().nullable(),
    marketCap: z.number().nullable()
});

export const SplitsCalendarSchema = z.object({
    date: z.string(),
    label: z.string(),
    symbol: z.string(),
    numerator: z.number(),
    denominator: z.number()
});

export type EarningsCalendar = z.infer<typeof EarningsCalendarSchema>;
export type EarningsConfirmed = z.infer<typeof EarningsConfirmedSchema>;
export type DividendsCalendar = z.infer<typeof DividendsCalendarSchema>;
export type EconomicsCalendar = z.infer<typeof EconomicsCalendarSchema>;
export type IPOCalendar = z.infer<typeof IPOCalendarSchema>;
export type SplitsCalendar = z.infer<typeof SplitsCalendarSchema>;

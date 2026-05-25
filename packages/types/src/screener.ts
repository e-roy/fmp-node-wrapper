// screener types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const ScreenerParamsSchema = z.object({
    marketCapMoreThan: z.number().optional(),
    marketCapLowerThan: z.number().optional(),
    sector: z.string().optional(),
    industry: z.string().optional(),
    betaMoreThan: z.number().optional(),
    betaLowerThan: z.number().optional(),
    priceMoreThan: z.number().optional(),
    priceLowerThan: z.number().optional(),
    dividendMoreThan: z.number().optional(),
    dividendLowerThan: z.number().optional(),
    volumeMoreThan: z.number().optional(),
    volumeLowerThan: z.number().optional(),
    exchange: z.string().optional(),
    country: z.string().optional(),
    isEtf: z.boolean().optional(),
    isFund: z.boolean().optional(),
    isActivelyTrading: z.boolean().optional(),
    limit: z.number().optional(),
    includeAllShareClasses: z.boolean().optional()
});

export const ScreenerSchema = z.object({
    symbol: z.string(),
    companyName: z.string(),
    marketCap: z.number().nullable(),
    sector: z.string().nullable(),
    industry: z.string().nullable(),
    beta: z.number().nullable(),
    price: z.number(),
    lastAnnualDividend: z.number().nullable(),
    volume: z.number(),
    exchange: z.string(),
    exchangeShortName: z.string(),
    country: z.string(),
    isEtf: z.boolean(),
    isFund: z.boolean(),
    isActivelyTrading: z.boolean()
});

export const AvailableExchangesSchema = z.object({
    exchange: z.string(),
    name: z.string(),
    countryName: z.string(),
    countryCode: z.string(),
    symbolSuffix: z.string(),
    delay: z.string().nullable()
});

export const AvailableSectorsSchema = z.object({
    sector: z.string()
});

export const AvailableIndustriesSchema = z.object({
    industry: z.string()
});

export const AvailableCountriesSchema = z.object({
    country: z.string()
});

export type ScreenerParams = z.infer<typeof ScreenerParamsSchema>;
export type Screener = z.infer<typeof ScreenerSchema>;
export type AvailableExchanges = z.infer<typeof AvailableExchangesSchema>;
export type AvailableSectors = z.infer<typeof AvailableSectorsSchema>;
export type AvailableIndustries = z.infer<typeof AvailableIndustriesSchema>;
export type AvailableCountries = z.infer<typeof AvailableCountriesSchema>;

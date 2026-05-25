// senate-house types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const SenateTradingResponseSchema = z.object({
    symbol: z.string(),
    disclosureDate: z.string(),
    transactionDate: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    office: z.string(),
    district: z.string(),
    owner: z.string(),
    assetDescription: z.string(),
    assetType: z.string(),
    type: z.string(),
    amount: z.string(),
    // The senate-latest RSS feed omits this field that senate-trades includes.
    capitalGainsOver200USD: z.string().optional(),
    comment: z.string(),
    link: z.string()
});

export const HouseTradingResponseSchema = z.object({
    symbol: z.string(),
    disclosureDate: z.string(),
    transactionDate: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    office: z.string(),
    district: z.string(),
    owner: z.string(),
    assetDescription: z.string(),
    assetType: z.string(),
    type: z.string(),
    amount: z.string(),
    capitalGainsOver200USD: z.string(),
    comment: z.string(),
    link: z.string()
});

export const SenateHouseTradingByNameResponseSchema = z.object({
    symbol: z.string(),
    disclosureDate: z.string(),
    transactionDate: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    office: z.string(),
    district: z.string(),
    owner: z.string(),
    assetDescription: z.string(),
    assetType: z.string(),
    type: z.string(),
    amount: z.string(),
    capitalGainsOver200USD: z.string(),
    comment: z.string(),
    link: z.string()
});

export type SenateTradingResponse = z.infer<typeof SenateTradingResponseSchema>;
export type HouseTradingResponse = z.infer<typeof HouseTradingResponseSchema>;
export type SenateHouseTradingByNameResponse = z.infer<typeof SenateHouseTradingByNameResponseSchema>;

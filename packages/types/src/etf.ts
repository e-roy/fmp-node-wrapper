// etf types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const ETFHoldingDatesSchema = z.object({
    date: z.string()
});

export const ETFHoldingSchema = z.object({
    cik: z.string(),
    acceptanceTime: z.string(),
    date: z.string(),
    symbol: z.string(),
    name: z.string(),
    lei: z.string(),
    title: z.string(),
    cusip: z.string(),
    isin: z.string(),
    balance: z.number(),
    units: z.string(),
    cur_cd: z.string(),
    valUsd: z.number(),
    pctVal: z.number(),
    payoffProfile: z.string(),
    assetCat: z.string(),
    issuerCat: z.string(),
    invCountry: z.string(),
    isRestrictedSec: z.string(),
    fairValLevel: z.string(),
    isCashCollateral: z.string(),
    isNonCashCollateral: z.string(),
    isLoanByFund: z.string()
});

export const ETFHolderSchema = z.object({
    asset: z.string(),
    name: z.string(),
    isin: z.string(),
    cusip: z.string(),
    sharesNumber: z.number(),
    weightPercentage: z.number(),
    marketValue: z.number(),
    updated: z.string()
});

export const ETFProfileSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    description: z.string(),
    isin: z.string(),
    assetClass: z.string(),
    securityCusip: z.string(),
    domicile: z.string(),
    website: z.string(),
    etfCompany: z.string(),
    expenseRatio: z.number(),
    assetsUnderManagement: z.number(),
    avgVolume: z.number(),
    inceptionDate: z.string(),
    nav: z.number(),
    navCurrency: z.string(),
    holdingsCount: z.number(),
    updatedAt: z.string(),
    isActivelyTrading: z.boolean(),
    sectorsList: z.array(z.object({
        exposure: z.number(),
        industry: z.string()
    }))
});

export const ETFWeightingSchema = z.object({
    symbol: z.string(),
    sector: z.string(),
    // Sector weighting returns a numeric percentage (country weighting returns a string).
    weightPercentage: z.number()
});

export const ETFCountryWeightingSchema = z.object({
    country: z.string(),
    weightPercentage: z.string()
});

export const ETFStockExposureSchema = z.object({
    etfSymbol: z.string(),
    assetExposure: z.string(),
    sharesNumber: z.number(),
    weightPercentage: z.number(),
    marketValue: z.number()
});

export type ETFHoldingDates = z.infer<typeof ETFHoldingDatesSchema>;
export type ETFHolding = z.infer<typeof ETFHoldingSchema>;
export type ETFHolder = z.infer<typeof ETFHolderSchema>;
export type ETFProfile = z.infer<typeof ETFProfileSchema>;
export type ETFWeighting = z.infer<typeof ETFWeightingSchema>;
export type ETFCountryWeighting = z.infer<typeof ETFCountryWeightingSchema>;
export type ETFStockExposure = z.infer<typeof ETFStockExposureSchema>;

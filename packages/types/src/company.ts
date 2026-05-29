// company types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const CompanyProfileSchema = z.object({
    symbol: z.string(),
    price: z.number(),
    marketCap: z.number(),
    beta: z.number(),
    lastDividend: z.number(),
    range: z.string(),
    change: z.number(),
    changePercentage: z.number(),
    volume: z.number(),
    averageVolume: z.number(),
    companyName: z.string(),
    currency: z.string(),
    cik: z.string(),
    isin: z.string(),
    cusip: z.string(),
    exchangeFullName: z.string(),
    exchange: z.string(),
    industry: z.string(),
    website: z.string(),
    description: z.string(),
    ceo: z.string(),
    sector: z.string(),
    country: z.string(),
    fullTimeEmployees: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    image: z.string(),
    ipoDate: z.string(),
    defaultImage: z.boolean(),
    isEtf: z.boolean(),
    isActivelyTrading: z.boolean(),
    isAdr: z.boolean(),
    isFund: z.boolean()
});

export const ExecutiveCompensationSchema = z.object({
    cik: z.string(),
    symbol: z.string(),
    companyName: z.string(),
    filingDate: z.string(),
    acceptedDate: z.string(),
    nameAndPosition: z.string(),
    year: z.number(),
    salary: z.number(),
    bonus: z.number(),
    stockAward: z.number(),
    optionAward: z.number(),
    incentivePlanCompensation: z.number(),
    allOtherCompensation: z.number(),
    total: z.number(),
    link: z.string()
});

export const CompanyNotesSchema = z.object({
    cik: z.string(),
    symbol: z.string(),
    title: z.string(),
    exchange: z.string()
});

export const HistoricalEmployeeCountSchema = z.object({
    symbol: z.string(),
    cik: z.string(),
    acceptanceTime: z.string(),
    periodOfReport: z.string(),
    companyName: z.string(),
    formType: z.string(),
    filingDate: z.string(),
    employeeCount: z.number(),
    source: z.string()
});

export const SharesFloatSchema = z.object({
    symbol: z.string(),
    freeFloat: z.number(),
    floatShares: z.number(),
    outstandingShares: z.number(),
    source: z.string(),
    date: z.string()
});

export const HistoricalSharesFloatSchema = z.object({
    symbol: z.string(),
    freeFloat: z.number(),
    floatShares: z.string(),
    outstandingShares: z.string(),
    source: z.string().nullable(),
    date: z.string()
});

export const EarningsCallTranscriptSchema = z.object({
    symbol: z.string(),
    quarter: z.number(),
    year: z.number(),
    date: z.string(),
    content: z.string()
});

export const CompanyTranscriptDataSchema = z.tuple([z.number(), z.number(), z.string()]);

// Stock Peers — stable /stock-peers. Peer companies with price + market cap.
// Verified against the live FMP `stable` API (2026-05-27).
export const StockPeerSchema = z.object({
    symbol: z.string(),
    companyName: z.string(),
    price: z.number(),
    mktCap: z.number()
});

export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
export type ExecutiveCompensation = z.infer<typeof ExecutiveCompensationSchema>;
export type CompanyNotes = z.infer<typeof CompanyNotesSchema>;
export type HistoricalEmployeeCount = z.infer<typeof HistoricalEmployeeCountSchema>;
export type SharesFloat = z.infer<typeof SharesFloatSchema>;
export type HistoricalSharesFloat = z.infer<typeof HistoricalSharesFloatSchema>;
export type EarningsCallTranscript = z.infer<typeof EarningsCallTranscriptSchema>;
export type CompanyTranscriptData = z.infer<typeof CompanyTranscriptDataSchema>;
export type StockPeer = z.infer<typeof StockPeerSchema>;

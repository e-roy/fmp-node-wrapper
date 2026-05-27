// valuation types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Verified against the live FMP `stable` API (2026-05-27). Note the DCF price field
// is keyed "Stock Price" (with a space) in the real response.
import { z } from "zod";

export const DCFValuationSchema = z.object({
    symbol: z.string(),
    date: z.string().nullable(),
    dcf: z.number().nullable(),
    "Stock Price": z.number().nullable()
});

export const CompanyRatingSchema = z.object({
    symbol: z.string(),
    // Present on historical rating rows; absent on the current snapshot.
    date: z.string().optional(),
    rating: z.string().nullable(),
    overallScore: z.number().nullable(),
    discountedCashFlowScore: z.number().nullable(),
    returnOnEquityScore: z.number().nullable(),
    returnOnAssetsScore: z.number().nullable(),
    debtToEquityScore: z.number().nullable(),
    priceToEarningsScore: z.number().nullable(),
    priceToBookScore: z.number().nullable()
});

export type DCFValuation = z.infer<typeof DCFValuationSchema>;
export type CompanyRating = z.infer<typeof CompanyRatingSchema>;

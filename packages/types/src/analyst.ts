// analyst types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Verified against the live FMP `stable` API (2026-05-27).
import { z } from "zod";

export const AnalystEstimateSchema = z.object({
    symbol: z.string(),
    date: z.string(),
    revenueLow: z.number().nullable(),
    revenueHigh: z.number().nullable(),
    revenueAvg: z.number().nullable(),
    ebitdaLow: z.number().nullable(),
    ebitdaHigh: z.number().nullable(),
    ebitdaAvg: z.number().nullable(),
    ebitLow: z.number().nullable(),
    ebitHigh: z.number().nullable(),
    ebitAvg: z.number().nullable(),
    netIncomeLow: z.number().nullable(),
    netIncomeHigh: z.number().nullable(),
    netIncomeAvg: z.number().nullable(),
    sgaExpenseLow: z.number().nullable(),
    sgaExpenseHigh: z.number().nullable(),
    sgaExpenseAvg: z.number().nullable(),
    epsAvg: z.number().nullable(),
    epsHigh: z.number().nullable(),
    epsLow: z.number().nullable(),
    numAnalystsRevenue: z.number().nullable(),
    numAnalystsEps: z.number().nullable()
});

export const PriceTargetConsensusSchema = z.object({
    symbol: z.string(),
    targetHigh: z.number().nullable(),
    targetLow: z.number().nullable(),
    targetConsensus: z.number().nullable(),
    targetMedian: z.number().nullable()
});

export const PriceTargetSummarySchema = z.object({
    symbol: z.string(),
    lastMonthCount: z.number().nullable(),
    lastMonthAvgPriceTarget: z.number().nullable(),
    lastQuarterCount: z.number().nullable(),
    lastQuarterAvgPriceTarget: z.number().nullable(),
    lastYearCount: z.number().nullable(),
    lastYearAvgPriceTarget: z.number().nullable(),
    allTimeCount: z.number().nullable(),
    allTimeAvgPriceTarget: z.number().nullable(),
    publishers: z.string().nullable()
});

export const StockGradeSchema = z.object({
    symbol: z.string(),
    date: z.string(),
    gradingCompany: z.string().nullable(),
    previousGrade: z.string().nullable(),
    newGrade: z.string().nullable(),
    action: z.string().nullable()
});

export type AnalystEstimate = z.infer<typeof AnalystEstimateSchema>;
export type PriceTargetConsensus = z.infer<typeof PriceTargetConsensusSchema>;
export type PriceTargetSummary = z.infer<typeof PriceTargetSummarySchema>;
export type StockGrade = z.infer<typeof StockGradeSchema>;

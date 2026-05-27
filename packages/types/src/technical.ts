// technical indicator types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// One schema covers every indicator `type`; the indicator value lands in the
// correspondingly-named optional field (e.g. `sma`, `rsi`). Verified against the
// live FMP `stable` API (2026-05-27).
import { z } from "zod";

export const TechnicalIndicatorSchema = z.object({
    date: z.string(),
    open: z.number().nullable(),
    high: z.number().nullable(),
    low: z.number().nullable(),
    close: z.number().nullable(),
    volume: z.number().nullable(),
    sma: z.number().optional(),
    ema: z.number().optional(),
    wma: z.number().optional(),
    dema: z.number().optional(),
    tema: z.number().optional(),
    rsi: z.number().optional(),
    standardDeviation: z.number().optional(),
    williams: z.number().optional(),
    adx: z.number().optional()
});

export type TechnicalIndicator = z.infer<typeof TechnicalIndicatorSchema>;

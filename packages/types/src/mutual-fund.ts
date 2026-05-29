// mutual-fund types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const MutualFundHoldingSchema = z.object({
    holder: z.string(),
    shares: z.number(),
    dateReported: z.string(),
    change: z.number(),
    weightPercent: z.number()
});

export type MutualFundHolding = z.infer<typeof MutualFundHoldingSchema>;

// institutional types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const Form13FResponseSchema = z.object({
    date: z.string(),
    fillingDate: z.string(),
    acceptedDate: z.string(),
    cik: z.string(),
    cusip: z.string(),
    tickercusip: z.string(),
    nameOfIssuer: z.string(),
    shares: z.number(),
    titleOfClass: z.string(),
    value: z.number(),
    link: z.string(),
    finalLink: z.string()
});

export const InstitutionalHolderResponseSchema = z.object({
    holder: z.string(),
    shares: z.number(),
    dateReported: z.string(),
    change: z.number()
});

export type Form13FResponse = z.infer<typeof Form13FResponseSchema>;
export type InstitutionalHolderResponse = z.infer<typeof InstitutionalHolderResponseSchema>;

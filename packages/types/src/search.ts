// search types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
import { z } from "zod";

export const SearchResultSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    currency: z.string().nullable(),
    stockExchange: z.string().nullable(),
    exchangeShortName: z.string().nullable()
});

export type SearchResult = z.infer<typeof SearchResultSchema>;

// news types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const NewsSchema = z.object({
    // null on market-wide stories with no single ticker (verified live 2026-09-26).
    symbol: z.string().nullable(),
    publishedDate: z.string(),
    publisher: z.string(),
    title: z.string(),
    // null when the article has no image (verified live 2026-09-26).
    image: z.string().nullable(),
    site: z.string(),
    text: z.string(),
    url: z.string()
});

export const ArticleSchema = z.object({
    title: z.string(),
    date: z.string(),
    content: z.string(),
    tickers: z.string(),
    image: z.string(),
    link: z.string(),
    author: z.string(),
    site: z.string()
});

export type News = z.infer<typeof NewsSchema>;
export type Article = z.infer<typeof ArticleSchema>;

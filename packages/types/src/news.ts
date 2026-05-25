// news types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const NewsSchema = z.object({
    symbol: z.string(),
    publishedDate: z.string(),
    publisher: z.string(),
    title: z.string(),
    image: z.string(),
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

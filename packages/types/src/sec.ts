// sec types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const RSSFeedItemSchema = z.object({
    title: z.string(),
    date: z.string(),
    link: z.string(),
    cik: z.string(),
    form_type: z.string(),
    ticker: z.string(),
    done: z.boolean()
});

export const RSSFeedV3ItemSchema = z.object({
    title: z.string(),
    date: z.string(),
    link: z.string(),
    cik: z.string(),
    form_type: z.string(),
    ticker: z.string(),
    done: z.boolean()
});

export const RSSFeed8KItemSchema = z.object({
    title: z.string(),
    symbol: z.string(),
    cik: z.string(),
    link: z.string(),
    finalLink: z.string(),
    date: z.string(),
    process: z.string(),
    hasFinancials: z.string()
});

export const SECFilingSchema = z.object({
    symbol: z.string(),
    cik: z.string(),
    type: z.string(),
    link: z.string(),
    finalLink: z.string(),
    acceptedDate: z.string(),
    fillingDate: z.string()
});

export const IndustryClassificationSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    cik: z.string(),
    sicCode: z.string(),
    industryTitle: z.string(),
    businessAdress: z.string(),
    phoneNumber: z.string()
});

export const IndustryClassificationCodeSchema = z.object({
    office: z.string(),
    sicCode: z.string(),
    industryTitle: z.string()
});

export const RSSFeedParamsSchema = z.object({
    limit: z.number().optional(),
    type: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    isDone: z.boolean().optional()
});

export const RSSFeedV3ParamsSchema = z.object({
    page: z.number().optional(),
    datatype: z.string().optional()
});

export const RSSFeedAllItemSchema = z.object({
    symbol: z.string(),
    fillingDate: z.string(),
    acceptedDate: z.string(),
    cik: z.string(),
    type: z.string(),
    link: z.string(),
    finalLink: z.string()
});

export const RSSFeed8KParamsSchema = z.object({
    page: z.number().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    hasFinancial: z.boolean().optional(),
    limit: z.number().optional()
});

export const SECFilingsParamsSchema = z.object({
    page: z.number().optional(),
    type: z.string().optional()
});

export const IndividualIndustryClassificationParamsSchema = z.object({
    symbol: z.string().optional(),
    cik: z.number().optional(),
    sicCode: z.number().optional()
});

export const IndustryClassificationCodesParamsSchema = z.object({
    industryTitle: z.string().optional(),
    sicCode: z.number().optional()
});

export type RSSFeedItem = z.infer<typeof RSSFeedItemSchema>;
export type RSSFeedV3Item = z.infer<typeof RSSFeedV3ItemSchema>;
export type RSSFeed8KItem = z.infer<typeof RSSFeed8KItemSchema>;
export type SECFiling = z.infer<typeof SECFilingSchema>;
export type IndustryClassification = z.infer<typeof IndustryClassificationSchema>;
export type IndustryClassificationCode = z.infer<typeof IndustryClassificationCodeSchema>;
export type RSSFeedParams = z.infer<typeof RSSFeedParamsSchema>;
export type RSSFeedV3Params = z.infer<typeof RSSFeedV3ParamsSchema>;
export type RSSFeedAllItem = z.infer<typeof RSSFeedAllItemSchema>;
export type RSSFeed8KParams = z.infer<typeof RSSFeed8KParamsSchema>;
export type SECFilingsParams = z.infer<typeof SECFilingsParamsSchema>;
export type IndividualIndustryClassificationParams = z.infer<typeof IndividualIndustryClassificationParamsSchema>;
export type IndustryClassificationCodesParams = z.infer<typeof IndustryClassificationCodesParamsSchema>;

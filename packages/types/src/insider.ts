// insider types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Hand-written (not generated) because ts-to-zod can't process the TransactionType enum.

import { z } from 'zod';

// RSS Feed Response
export const InsiderTradingRSSResponseSchema = z.object({
  symbol: z.string(),
  filingDate: z.string(),
  transactionDate: z.string(),
  reportingCik: z.string(),
  companyCik: z.string(),
  transactionType: z.string(),
  securitiesOwned: z.number(),
  reportingName: z.string(),
  typeOfOwner: z.string(),
  acquisitionOrDisposition: z.string(),
  directOrIndirect: z.string().nullable(),
  formType: z.string(),
  securitiesTransacted: z.number(),
  price: z.number(),
  securityName: z.string(),
  url: z.string(),
});

export type InsiderTradingRSSResponse = z.infer<typeof InsiderTradingRSSResponseSchema>;

// Insider Trading Search Response
export const InsiderTradingSearchResponseSchema = z.object({
  symbol: z.string(),
  filingDate: z.string(),
  transactionDate: z.string(),
  reportingCik: z.string(),
  companyCik: z.string(),
  transactionType: z.string(),
  securitiesOwned: z.number(),
  reportingName: z.string(),
  typeOfOwner: z.string(),
  acquisitionOrDisposition: z.string(),
  directOrIndirect: z.string().nullable(),
  formType: z.string(),
  securitiesTransacted: z.number(),
  price: z.number(),
  securityName: z.string(),
  url: z.string(),
});

export type InsiderTradingSearchResponse = z.infer<typeof InsiderTradingSearchResponseSchema>;

// Transaction Types Response (array of records)
export const TransactionTypeRecordSchema = z.object({
  transactionType: z.string(),
});

export type TransactionTypesResponse = z.infer<typeof TransactionTypeRecordSchema>[];

// Insiders By Symbol Response
export const InsidersBySymbolResponseSchema = z.object({
  typeOfOwner: z.string().nullable(),
  transactionDate: z.string(),
  owner: z.string(),
});

export type InsidersBySymbolResponse = z.infer<typeof InsidersBySymbolResponseSchema>;

// Insider Trade Statistics Response
export const InsiderTradeStatisticsResponseSchema = z.object({
  symbol: z.string(),
  cik: z.string(),
  year: z.number(),
  quarter: z.number(),
  acquiredTransactions: z.number(),
  disposedTransactions: z.number(),
  acquiredDisposedRatio: z.number(),
  totalAcquired: z.number(),
  totalDisposed: z.number(),
  averageAcquired: z.number(),
  averageDisposed: z.number(),
  totalPurchases: z.number(),
  totalSales: z.number(),
});

export type InsiderTradeStatisticsResponse = z.infer<typeof InsiderTradeStatisticsResponseSchema>;

// CIK Mapper Response
export const CikMapperResponseSchema = z.object({
  reportingCik: z.string(),
  reportingName: z.string(),
});

export type CikMapperResponse = z.infer<typeof CikMapperResponseSchema>;

// CIK Mapper By Symbol Response
export const CikMapperBySymbolResponseSchema = z.object({
  symbol: z.string(),
  companyCik: z.string(),
});

export type CikMapperBySymbolResponse = z.infer<typeof CikMapperBySymbolResponseSchema>;

// Beneficial Ownership Response
export const BeneficialOwnershipResponseSchema = z.object({
  cik: z.string(),
  symbol: z.string(),
  filingDate: z.string(),
  acceptedDate: z.string(),
  cusip: z.string(),
  nameOfReportingPerson: z.string(),
  citizenshipOrPlaceOfOrganization: z.string(),
  soleVotingPower: z.string(),
  sharedVotingPower: z.string(),
  soleDispositivePower: z.string(),
  sharedDispositivePower: z.string(),
  amountBeneficiallyOwned: z.string(),
  percentOfClass: z.string(),
  typeOfReportingPerson: z.string(),
  url: z.string(),
});

export type BeneficialOwnershipResponse = z.infer<typeof BeneficialOwnershipResponseSchema>;

// Fail to Deliver Response
export const FailToDeliverResponseSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  price: z.number(),
  quantity: z.number(),
  cusip: z.string(),
  name: z.string(),
});

export type FailToDeliverResponse = z.infer<typeof FailToDeliverResponseSchema>;

// Transaction type enum for better type safety
export enum TransactionType {
  AWARD = 'A-Award',
  CONVERSION = 'C-Conversion',
  RETURN = 'D-Return',
  EXPIRE_SHORT = 'E-ExpireShort',
  IN_KIND = 'F-InKind',
  GIFT = 'G-Gift',
  EXPIRE_LONG = 'H-ExpireLong',
  DISCRETIONARY = 'I-Discretionary',
  OTHER = 'J-Other',
  SMALL = 'L-Small',
  EXEMPT = 'M-Exempt',
  OUT_OF_THE_MONEY = 'O-OutOfTheMoney',
  PURCHASE = 'P-Purchase',
  SALE = 'S-Sale',
  TENDER = 'U-Tender',
  WILL = 'W-Will',
  IN_THE_MONEY = 'X-InTheMoney',
  TRUST = 'Z-Trust',
}

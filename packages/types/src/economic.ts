// economic types for FMP API
//
// Schema-first: Zod schemas are the source of truth; types are derived via z.infer.
// Base schemas generated via `pnpm --filter fmp-node-types gen:schemas`.
import { z } from "zod";

export const EconomicIndicatorSchema = z.object({
    name: z.string(),
    date: z.string(),
    value: z.number()
});

export const TreasuryRateSchema = z.object({
    date: z.string(),
    month1: z.number(),
    month2: z.number(),
    month3: z.number(),
    month6: z.number(),
    year1: z.number(),
    year2: z.number(),
    year3: z.number(),
    year5: z.number(),
    year7: z.number(),
    year10: z.number(),
    year20: z.number(),
    year30: z.number()
});

export const EconomicIndicatorNameSchema = z.union([z.literal("GDP"), z.literal("realGDP"), z.literal("nominalPotentialGDP"), z.literal("realGDPPerCapita"), z.literal("federalFunds"), z.literal("CPI"), z.literal("inflationRate"), z.literal("inflation"), z.literal("retailSales"), z.literal("consumerSentiment"), z.literal("durableGoods"), z.literal("unemploymentRate"), z.literal("totalNonfarmPayroll"), z.literal("initialClaims"), z.literal("industrialProductionTotalIndex"), z.literal("newPrivatelyOwnedHousingUnitsStartedTotalUnits"), z.literal("totalVehicleSales"), z.literal("retailMoneyFunds"), z.literal("smoothedUSRecessionProbabilities"), z.literal("3MonthOr90DayRatesAndYieldsCertificatesOfDeposit"), z.literal("commercialBankInterestRateOnCreditCardPlansAllAccounts"), z.literal("30YearFixedRateMortgageAverage"), z.literal("15YearFixedRateMortgageAverage")]);

export type EconomicIndicator = z.infer<typeof EconomicIndicatorSchema>;
export type TreasuryRate = z.infer<typeof TreasuryRateSchema>;
export type EconomicIndicatorName = z.infer<typeof EconomicIndicatorNameSchema>;

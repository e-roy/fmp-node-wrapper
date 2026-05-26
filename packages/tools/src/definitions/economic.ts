import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { defineTool, type FMPToolDefinition } from './types';

const economicIndicatorNames = [
  'GDP',
  'realGDP',
  'nominalPotentialGDP',
  'realGDPPerCapita',
  'federalFunds',
  'CPI',
  'inflationRate',
  'inflation',
  'retailSales',
  'consumerSentiment',
  'durableGoods',
  'unemploymentRate',
  'totalNonfarmPayroll',
  'initialClaims',
  'industrialProductionTotalIndex',
  'newPrivatelyOwnedHousingUnitsStartedTotalUnits',
  'totalVehicleSales',
  'retailMoneyFunds',
  'smoothedUSRecessionProbabilities',
  '3MonthOr90DayRatesAndYieldsCertificatesOfDeposit',
  'commercialBankInterestRateOnCreditCardPlansAllAccounts',
  '30YearFixedRateMortgageAverage',
  '15YearFixedRateMortgageAverage',
] as const;

export const economicDefinitions: FMPToolDefinition[] = [
  defineTool({
    name: 'getTreasuryRates',
    description: 'Get treasury rates for different maturities over time',
    inputSchema: z.object({
      from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
      to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
    }),
    execute: async ({ from, to }) =>
      toToolResponse(
        await getFMPClient().economic.getTreasuryRates({
          from: from ?? undefined,
          to: to ?? undefined,
        }),
      ),
  }),
  defineTool({
    name: 'getEconomicIndicators',
    description: 'Get economic indicators like GDP, unemployment rate, inflation, etc.',
    inputSchema: z.object({
      name: z.enum(economicIndicatorNames).describe('The name of the economic indicator'),
      from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
      to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
    }),
    execute: async ({ name, from, to }) =>
      toToolResponse(
        await getFMPClient().economic.getEconomicIndicators({
          name,
          from: from ?? undefined,
          to: to ?? undefined,
        }),
      ),
  }),
];

import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

// Input schema for treasury rates with date range
const treasuryRatesInputSchema = z.object({
  from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
});

// Economic indicators enum and schema
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

const economicIndicatorsInputSchema = z.object({
  name: z.enum(economicIndicatorNames).describe('The name of the economic indicator'),
  from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
});

export const getTreasuryRates = createOpenAITool({
  name: 'getTreasuryRates',
  description: 'Get treasury rates for different maturities over time',
  inputSchema: treasuryRatesInputSchema,
  execute: async ({ from, to }) => {
    const fmp = getFMPClient();
    const treasuryRates = await fmp.economic.getTreasuryRates({
      from: from ?? undefined,
      to: to ?? undefined,
    });
    return JSON.stringify(treasuryRates.data, null, 2);
  },
});

export const getEconomicIndicators = createOpenAITool({
  name: 'getEconomicIndicators',
  description: 'Get economic indicators like GDP, unemployment rate, inflation, etc.',
  inputSchema: economicIndicatorsInputSchema,
  execute: async ({ name, from, to }) => {
    const fmp = getFMPClient();
    const economicIndicators = await fmp.economic.getEconomicIndicators({
      name,
      from: from ?? undefined,
      to: to ?? undefined,
    });
    return JSON.stringify(economicIndicators.data, null, 2);
  },
});

import { z } from 'zod';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';
import { createTool } from '@/utils/aisdk-tool-wrapper';

export const economicTools = {
  getTreasuryRates: createTool({
    name: 'getTreasuryRates',
    description: 'Get treasury rates',
    inputSchema: z.object({
      from: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      to: z.string().optional().describe('End date in YYYY-MM-DD format'),
    }),
    execute: async ({ from, to }) => {
      const fmp = getFMPClient();
      const treasuryRates = await fmp.economic.getTreasuryRates({ from, to });
      const response = toToolResponse(treasuryRates);
      return response;
    },
  }),

  getEconomicIndicators: createTool({
    name: 'getEconomicIndicators',
    description: 'Get economic indicators',
    inputSchema: z.object({
      name: z
        .enum([
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
        ])
        .describe('The name of the economic indicator'),
      from: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      to: z.string().optional().describe('End date in YYYY-MM-DD format'),
    }),
    execute: async ({ name, from, to }) => {
      const fmp = getFMPClient();
      const economicIndicators = await fmp.economic.getEconomicIndicators({ name, from, to });
      const response = toToolResponse(economicIndicators);
      return response;
    },
  }),
};

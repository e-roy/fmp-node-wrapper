// Economic endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse, DateRangeParams } from '@/types/common';
import { TreasuryRate, EconomicIndicator, EconomicIndicatorParams } from '@/types/economic';

export class EconomicEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get treasury rates
   * https://site.financialmodelingprep.com/developer/docs#treasury-rates-economics-data
   * @param from - The start date to get the treasury rates for
   * @param to - The end date to get the treasury rates for
   * @returns Treasury rates data
   */
  async getTreasuryRates(params: DateRangeParams): Promise<APIResponse<TreasuryRate[]>> {
    const { from, to } = params;

    const queryParams: DateRangeParams = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get('/treasury', 'v4', queryParams);
  }

  /**
   * Get economic indicators
   * https://site.financialmodelingprep.com/developer/docs#economic-indicators-economics-data
   * @param name - GDP, realGDP, nominalPotentialGDP, realGDPPerCapita, federalFunds, CPI, inflationRate, inflation, retailSales, consumerSentiment, durableGoods, unemploymentRate, totalNonfarmPayroll, initialClaims, industrialProductionTotalIndex, newPrivatelyOwnedHousingUnitsStartedTotalUnits, totalVehicleSales, retailMoneyFunds, smoothedUSRecessionProbabilities, 3MonthOr90DayRatesAndYieldsCertificatesOfDeposit, commercialBankInterestRateOnCreditCardPlansAllAccounts, 30YearFixedRateMortgageAverage, 15YearFixedRateMortgageAverage
   * @param from - The start date to get the economic indicators for
   * @param to - The end date to get the economic indicators for
   * @returns Provides real-time and historical economic data for a variety of economic indicators, such as GDP, unemployment, and inflation.
   */
  async getEconomicIndicators(
    params: EconomicIndicatorParams,
  ): Promise<APIResponse<EconomicIndicator[]>> {
    const { name, from, to } = params;

    const queryParams: EconomicIndicatorParams = { name };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this.client.get(`/economic`, 'v4', queryParams);
  }
}

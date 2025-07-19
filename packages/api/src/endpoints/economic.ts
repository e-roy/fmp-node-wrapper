// Economic endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import { TreasuryRate, EconomicIndicator } from '@/types/economic';

export class EconomicEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get treasury rates data
   *
   * Provides historical treasury rates for various maturities including
   * 1-month, 3-month, 6-month, 1-year, 2-year, 3-year, 5-year, 7-year,
   * 10-year, 20-year, and 30-year treasury bonds. Essential for analyzing
   * interest rate trends, yield curves, and fixed income investments.
   *
   * @param params - Treasury rates request parameters
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to 1 year ago)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to today)
   *
   * @returns Promise resolving to array of treasury rates data with yield information
   *
   * @example
   * ```typescript
   * // Get treasury rates for the last year
   * const treasuryRates = await fmp.economic.getTreasuryRates({
   *   from: '2023-01-01',
   *   to: '2023-12-31'
   * });
   * treasuryRates.data.forEach(rate => {
   *   console.log(`${rate.date}: 10Y ${rate.tenY}%, 2Y ${rate.twoY}%`);
   * });
   *
   * // Get recent treasury rates
   * const recentRates = await fmp.economic.getTreasuryRates({
   *   from: '2024-01-01'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#treasury-rates-economics-data|FMP Treasury Rates Documentation}
   */
  async getTreasuryRates(params: {
    from?: string;
    to?: string;
  }): Promise<APIResponse<TreasuryRate[]>> {
    const { from, to } = params;

    const queryParams: { from?: string; to?: string } = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    return this.client.get('/treasury', 'v4', queryParams);
  }

  /**
   * Get economic indicators data
   *
   * Provides real-time and historical economic data for a wide variety of
   * economic indicators including GDP, unemployment, inflation, retail sales,
   * and many others. Essential for macroeconomic analysis and understanding
   * economic trends and cycles.
   *
   * @param params - Economic indicators request parameters
   * @param params.name - The economic indicator to retrieve
   * @param params.from - Start date in YYYY-MM-DD format (optional, defaults to 1 year ago)
   * @param params.to - End date in YYYY-MM-DD format (optional, defaults to today)
   *
   * @returns Promise resolving to array of economic indicator data with historical values
   *
   * @example
   * ```typescript
   * // Get GDP data for the last year
   * const gdpData = await fmp.economic.getEconomicIndicators({
   *   name: 'GDP',
   *   from: '2023-01-01',
   *   to: '2023-12-31'
   * });
   * gdpData.data.forEach(gdp => {
   *   console.log(`${gdp.date}: GDP $${gdp.value.toLocaleString()} billion`);
   * });
   *
   * // Get unemployment rate data
   * const unemploymentData = await fmp.economic.getEconomicIndicators({
   *   name: 'unemploymentRate',
   *   from: '2024-01-01'
   * });
   *
   * // Get inflation rate data
   * const inflationData = await fmp.economic.getEconomicIndicators({
   *   name: 'inflationRate',
   *   from: '2023-01-01',
   *   to: '2023-12-31'
   * });
   * ```
   *
   * @see {@link https://site.financialmodelingprep.com/developer/docs#economic-indicators-economics-data|FMP Economic Indicators Documentation}
   */
  async getEconomicIndicators(params: {
    name:
      | 'GDP'
      | 'realGDP'
      | 'nominalPotentialGDP'
      | 'realGDPPerCapita'
      | 'federalFunds'
      | 'CPI'
      | 'inflationRate'
      | 'inflation'
      | 'retailSales'
      | 'consumerSentiment'
      | 'durableGoods'
      | 'unemploymentRate'
      | 'totalNonfarmPayroll'
      | 'initialClaims'
      | 'industrialProductionTotalIndex'
      | 'newPrivatelyOwnedHousingUnitsStartedTotalUnits'
      | 'totalVehicleSales'
      | 'retailMoneyFunds'
      | 'smoothedUSRecessionProbabilities'
      | '3MonthOr90DayRatesAndYieldsCertificatesOfDeposit'
      | 'commercialBankInterestRateOnCreditCardPlansAllAccounts'
      | '30YearFixedRateMortgageAverage'
      | '15YearFixedRateMortgageAverage';
    from?: string;
    to?: string;
  }): Promise<APIResponse<EconomicIndicator[]>> {
    const { name, from, to } = params;

    const queryParams: { name: string; from?: string; to?: string } = { name };
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    return this.client.get(`/economic`, 'v4', queryParams);
  }
}

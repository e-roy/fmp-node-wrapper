// Economic indicator types for FMP API

// Economic data interfaces
export interface EconomicIndicator {
  name: string;
  date: string;
  value: number;
}

export interface TreasuryRate {
  date: string;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  year1: number;
  year2: number;
  year3: number;
  year5: number;
  year7: number;
  year10: number;
  year20: number;
  year30: number;
}

// Economic indicator names as per FMP API documentation
export type EconomicIndicatorName =
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

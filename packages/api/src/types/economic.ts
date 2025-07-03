// Economic indicator types for FMP API

import { DateRangeParams } from './common';

// Economic parameter interfaces
export interface EconomicIndicatorParams extends DateRangeParams {}

export interface TreasuryRateParams extends EconomicIndicatorParams {}

export interface FederalFundsRateParams extends EconomicIndicatorParams {}

export interface CPIParams extends EconomicIndicatorParams {}

export interface GDPParams extends EconomicIndicatorParams {}

export interface UnemploymentParams extends EconomicIndicatorParams {}

// Economic data interfaces
export interface EconomicIndicator {
  date: string;
  value: number;
  change: number;
  changePercent: number;
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

export interface FederalFundsRate {
  date: string;
  value: number;
}

export interface CPI {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface GDP {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface Unemployment {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

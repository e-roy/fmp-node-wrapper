// ETF-related types for FMP API

export interface ETFHoldingDates {
  date: string;
}

export interface ETFHolding {
  cik: string;
  acceptanceTime: string;
  date: string;
  symbol: string;
  name: string;
  lei: string;
  title: string;
  cusip: string;
  isin: string;
  balance: number;
  units: string;
  cur_cd: string;
  valUsd: number;
  pctVal: number;
  payoffProfile: string;
  assetCat: string;
  issuerCat: string;
  invCountry: string;
  isRestrictedSec: string;
  fairValLevel: string;
  isCashCollateral: string;
  isNonCashCollateral: string;
  isLoanByFund: string;
}

export interface ETFHolder {
  asset: string;
  name: string;
  isin: string;
  cusip: string;
  sharesNumber: number;
  weightPercentage: number;
  marketValue: number;
  updated: string;
}

export interface ETFProfile {
  symbol: string;
  assetClass: string;
  aum: number;
  avgVolume: number;
  cusip: string;
  description: string;
  domicile: string;
  etfCompany: string;
  expenseRatio: number;
  inceptionDate: string;
  isin: string;
  name: string;
  nav: number;
  navCurrency: string;
  sectorsList: {
    exposure: string;
    industry: string;
  }[];
  website: string;
  holdingsCount: number;
}

export interface ETFWeighting {
  sector: string;
  weightPercentage: string;
}

export interface ETFCountryWeighting {
  country: string;
  weightPercentage: string;
}

export interface ETFStockExposure {
  etfSymbol: string;
  assetExposure: string;
  sharesNumber: number;
  weightPercentage: number;
  marketValue: number;
}

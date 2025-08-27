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
  name: string;
  description: string;
  isin: string;
  assetClass: string;
  securityCusip: string;
  domicile: string;
  website: string;
  etfCompany: string;
  expenseRatio: number;
  assetsUnderManagement: number;
  avgVolume: number;
  inceptionDate: string;
  nav: number;
  navCurrency: string;
  holdingsCount: number;
  updatedAt: string;
  sectorsList: {
    exposure: string;
    industry: string;
  }[];
}

export interface ETFWeighting {
  symbol: string;
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

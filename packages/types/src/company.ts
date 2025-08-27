// Company-related types for FMP API

export interface CompanyProfile {
  symbol: string;
  price: number;
  marketCap: number;
  beta: number;
  lastDividend: number;
  range: string;
  change: number;
  changePercentage: number;
  volume: number;
  averageVolume: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchangeFullName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export interface ExecutiveCompensation {
  cik: string;
  symbol: string;
  companyName: string;
  filingDate: string;
  acceptedDate: string;
  nameAndPosition: string;
  year: number;
  salary: number;
  bonus: number;
  stockAward: number;
  optionAward: number;
  incentivePlanCompensation: number;
  allOtherCompensation: number;
  total: number;
  link: string;
}

export interface CompanyNotes {
  cik: string;
  symbol: string;
  title: string;
  exchange: string;
}

export interface HistoricalEmployeeCount {
  symbol: string;
  cik: string;
  acceptanceTime: string;
  periodOfReport: string;
  companyName: string;
  formType: string;
  filingDate: string;
  employeeCount: number;
  source: string;
}

export interface SharesFloat {
  symbol: string;
  freeFloat: number;
  floatShares: number;
  outstandingShares: number;
  source: string;
  date: string;
}

export interface HistoricalSharesFloat {
  symbol: string;
  freeFloat: number;
  floatShares: string;
  outstandingShares: string;
  source: string;
  date: string;
}

export interface EarningsCallTranscript {
  symbol: string;
  quarter: number;
  year: number;
  date: string;
  content: string;
}

export type CompanyTranscriptData = [number, number, string];

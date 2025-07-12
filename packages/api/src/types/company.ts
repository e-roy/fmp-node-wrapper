export interface CompanyProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
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
  dcfDiff: number;
  dcf: number;
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
  industryTitle: string;
  acceptedDate: string;
  filingDate: string;
  nameAndPosition: string;
  year: number;
  salary: number;
  bonus: number;
  stock_award: number;
  incentive_plan_compensation: number;
  all_other_compensation: number;
  total: number;
  url: string;
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

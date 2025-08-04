// Senate and House trading types for FMP API

// Senate trading response interface
export interface SenateTradingResponse {
  firstName: string;
  lastName: string;
  office: string;
  link: string;
  dateRecieved: string;
  transactionDate: string;
  owner: string;
  assetDescription: string;
  assetType: string;
  type: string;
  amount: string;
  comment: string;
  symbol: string;
}

// House trading response interface
export interface HouseTradingResponse {
  disclosureYear: string;
  disclosureDate: string;
  transactionDate: string;
  owner: string;
  ticker: string;
  assetDescription: string;
  type: string;
  amount: string;
  representative: string;
  district: string;
  link: string;
  capitalGainsOver200USD: string;
}

export interface SenateHouseTradingByNameResponse {
  symbol: string;
  disclosureDate: string;
  transactionDate: string;
  firstName: string;
  lastName: string;
  office: string;
  district: string;
  owner: string;
  assetDescription: string;
  assetType: string;
  type: string;
  amount: string;
  capitalGainsOver200USD: string;
  comment: string;
  link: string;
}

// Senate and House trading types for FMP API

// Parameter interfaces
export interface SenateHouseTradingParams {
  symbol: string;
}

// Senate & House trading RSS feed parameters
export interface SenateHouseTradingRSSFeedParams {
  page: number;
}

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

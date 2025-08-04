// Insider Trading Types

// RSS Feed Response
export interface InsiderTradingRSSResponse {
  title: string;
  fillingDate: string;
  symbol: string;
  link: string;
  reportingCik: string;
  issuerCik: string;
}

// Insider Trading Search Response
export interface InsiderTradingSearchResponse {
  symbol: string;
  filingDate: string;
  transactionDate: string;
  reportingCik: string;
  transactionType: string;
  securitiesOwned: number;
  securitiesTransacted: number;
  companyCik: string;
  reportingName: string;
  typeOfOwner: string;
  link: string;
  securityName: string;
  price: number;
  formType: string;
  acquistionOrDisposition: string;
}

// Transaction Types Response
export type TransactionTypesResponse = string[];

// Insiders By Symbol Response
export interface InsidersBySymbolResponse {
  typeOfOwner: string;
  transactionDate: string;
  owner: string;
}

// Insider Trade Statistics Response
export interface InsiderTradeStatisticsResponse {
  symbol: string;
  cik: string;
  year: number;
  quarter: number;
  purchases: number;
  sales: number;
  buySellRatio: number;
  totalBought: number;
  totalSold: number;
  averageBought: number;
  averageSold: number;
  pPurchases: number;
  sSales: number;
}

// CIK Mapper Response
export interface CikMapperResponse {
  reportingCik: string;
  reportingName: string;
}

// CIK Mapper By Symbol Response
export interface CikMapperBySymbolResponse {
  symbol: string;
  companyCik: string;
}

// Beneficial Ownership Response
export interface BeneficialOwnershipResponse {
  cik: string;
  symbol: string;
  filingDate: string;
  acceptedDate: string;
  cusip: string;
  nameOfReportingPerson: string;
  citizenshipOrPlaceOfOrganization: string;
  soleVotingPower: string;
  sharedVotingPower: string;
  soleDispositivePower: string;
  sharedDispositivePower: string;
  amountBeneficiallyOwned: string;
  percentOfClass: string;
  typeOfReportingPerson: string;
  url: string;
}

// Fail to Deliver Response
export interface FailToDeliverResponse {
  symbol: string;
  date: string;
  price: number;
  quantity: number;
  cusip: string;
  name: string;
}

// Transaction type enum for better type safety
export enum TransactionType {
  AWARD = 'A-Award',
  CONVERSION = 'C-Conversion',
  RETURN = 'D-Return',
  EXPIRE_SHORT = 'E-ExpireShort',
  IN_KIND = 'F-InKind',
  GIFT = 'G-Gift',
  EXPIRE_LONG = 'H-ExpireLong',
  DISCRETIONARY = 'I-Discretionary',
  OTHER = 'J-Other',
  SMALL = 'L-Small',
  EXEMPT = 'M-Exempt',
  OUT_OF_THE_MONEY = 'O-OutOfTheMoney',
  PURCHASE = 'P-Purchase',
  SALE = 'S-Sale',
  TENDER = 'U-Tender',
  WILL = 'W-Will',
  IN_THE_MONEY = 'X-InTheMoney',
  TRUST = 'Z-Trust',
}

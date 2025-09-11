export interface ScreenerParams {
  marketCapMoreThan?: number;
  marketCapLowerThan?: number;
  sector?: string;
  industry?: string;
  betaMoreThan?: number;
  betaLowerThan?: number;
  priceMoreThan?: number;
  priceLowerThan?: number;
  dividendMoreThan?: number;
  dividendLowerThan?: number;
  volumeMoreThan?: number;
  volumeLowerThan?: number;
  exchange?: string;
  country?: string;
  isEtf?: boolean;
  isFund?: boolean;
  isActivelyTrading?: boolean;
  limit?: number;
  includeAllShareClasses?: boolean;
}

export interface Screener {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string;
  industry: string;
  beta: number;
  price: number;
  lastAnnualDividend: number;
  volume: number;
  exchange: string;
  exchangeShortName: string;
  country: string;
  isEtf: boolean;
  isFund: boolean;
  isActivelyTrading: boolean;
}

export interface AvailableExchanges {
  exchange: string;
  name: string;
  countryName: string;
  countryCode: string;
  symbolSuffix: string;
  delay: string;
}

export interface AvailableSectors {
  sector: string;
}

export interface AvailableIndustries {
  industry: string;
}

export interface AvailableCountries {
  country: string;
}

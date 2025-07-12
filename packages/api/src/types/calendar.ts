// Earnings calendar data
export interface EarningsCalendar {
  date: string;
  symbol: string;
  eps: number;
  epsEstimated: number | null;
  time: string;
  revenue: number | null;
  revenueEstimated: number | null;
  fiscalDateEnding: string;
  updatedFromDate: string;
}

// Earnings confirmed data
export interface EarningsConfirmed {
  symbol: string;
  exchange: string;
  time: string;
  when: string;
  date: string;
  publicationDate: string;
  title: string;
  url: string;
}

// Dividends calendar data
export interface DividendsCalendar {
  date: string;
  label: string;
  adjDividend: number;
  symbol: string;
  dividend: number;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
}

// Economics calendar data
export interface EconomicsCalendar {
  date: string;
  country: string;
  event: string;
  currency: string;
  previous: number;
  estimate: number | null;
  actual: number | null;
  change: number;
  impact: string;
  changePercentage: number;
  unit: string | null;
}

// IPO calendar data
export interface IPOCalendar {
  date: string;
  company: string;
  symbol: string;
  exchange: string;
  actions: string;
  shares: number | null;
  priceRange: string | null;
  marketCap: number | null;
}

// Splits calendar data
export interface SplitsCalendar {
  date: string;
  label: string;
  symbol: string;
  numerator: number;
  denominator: number;
}

// Institutional trading types for FMP API

// Parameter interfaces
export interface Form13FParams {
  cik: string;
  date: string;
}

export interface Form13FDatesParams {
  cik: string;
}

export interface InstitutionalHolderParams {
  symbol: string;
}

// Form 13F response interface
export interface Form13FResponse {
  date: string;
  fillingDate: string;
  acceptedDate: string;
  cik: string;
  cusip: string;
  tickerCusip: string;
  nameOfIssuer: string;
  shares: number;
  titleOfClass: string;
  value: number;
  link: string;
  finalLink: string;
}

// Institutional holder response interface
export interface InstitutionalHolderResponse {
  holder: string;
  shares: number;
  dateReported: string;
  change: number;
}

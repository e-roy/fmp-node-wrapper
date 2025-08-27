// Institutional trading types for FMP API

// Form 13F response interface
export interface Form13FResponse {
  date: string;
  fillingDate: string;
  acceptedDate: string;
  cik: string;
  cusip: string;
  tickercusip: string;
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

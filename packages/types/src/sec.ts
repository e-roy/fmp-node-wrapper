// SEC (Securities and Exchange Commission) types

// RSS Feed API (v4) Response
export interface RSSFeedItem {
  title: string;
  date: string;
  link: string;
  cik: string;
  form_type: string;
  ticker: string;
  done: boolean;
}

// RSS Feed V3 API Response
export interface RSSFeedV3Item {
  title: string;
  date: string;
  link: string;
  cik: string;
  form_type: string;
  ticker: string;
  done: boolean;
}

// RSS Feed 8-K API Response
export interface RSSFeed8KItem {
  title: string;
  symbol: string;
  cik: string;
  link: string;
  finalLink: string;
  date: string;
  process: string;
  hasFinancials: string;
}

// SEC Filings API Response
export interface SECFiling {
  symbol: string;
  cik: string;
  type: string;
  link: string;
  finalLink: string;
  acceptedDate: string;
  fillingDate: string;
}

// Industry Classification API Response
export interface IndustryClassification {
  symbol: string;
  name: string;
  cik: string;
  sicCode: string;
  industryTitle: string;
  businessAdress: string;
  phoneNumber: string;
}

// Industry Classification Codes API Response
export interface IndustryClassificationCode {
  office: string;
  sicCode: string;
  industryTitle: string;
}

// RSS Feed API (v4) Parameters
export interface RSSFeedParams {
  limit?: number;
  type?: string;
  from?: string;
  to?: string;
  isDone?: boolean;
}

// RSS Feed V3 API Parameters
export interface RSSFeedV3Params {
  page?: number;
  datatype?: string;
}

// RSS Feed All API Response
export interface RSSFeedAllItem {
  symbol: string;
  fillingDate: string;
  acceptedDate: string;
  cik: string;
  type: string;
  link: string;
  finalLink: string;
}

// RSS Feed 8-K API Parameters
export interface RSSFeed8KParams {
  page?: number;
  from?: string;
  to?: string;
  hasFinancial?: boolean;
  limit?: number;
}

// SEC Filings API Parameters
export interface SECFilingsParams {
  page?: number;
  type?: string;
}

// Individual Industry Classification API Parameters
export interface IndividualIndustryClassificationParams {
  symbol?: string;
  cik?: number;
  sicCode?: number;
}

// Industry Classification Codes API Parameters
export interface IndustryClassificationCodesParams {
  industryTitle?: string;
  sicCode?: number;
}

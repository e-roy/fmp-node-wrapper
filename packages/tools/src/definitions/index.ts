import { quoteDefinitions } from './quote';
import { companyDefinitions } from './company';
import { financialDefinitions } from './financial';
import { calendarDefinitions } from './calendar';
import { economicDefinitions } from './economic';
import { etfDefinitions } from './etf';
import { insiderDefinitions } from './insider';
import { institutionalDefinitions } from './institutional';
import { marketDefinitions } from './market';
import { newsDefinitions } from './news';
import { screenerDefinitions } from './screener';
import { searchDefinitions } from './search';
import { analystDefinitions } from './analyst';
import { valuationDefinitions } from './valuation';
import { technicalDefinitions } from './technical';
import { senateHouseDefinitions } from './senate-house';
import { stockDefinitions } from './stock';
import type { FMPToolDefinition } from './types';

export * from './types';

export {
  quoteDefinitions,
  companyDefinitions,
  financialDefinitions,
  calendarDefinitions,
  economicDefinitions,
  etfDefinitions,
  insiderDefinitions,
  institutionalDefinitions,
  marketDefinitions,
  newsDefinitions,
  screenerDefinitions,
  searchDefinitions,
  analystDefinitions,
  valuationDefinitions,
  technicalDefinitions,
  senateHouseDefinitions,
  stockDefinitions,
};

/** Every tool definition, in a stable order shared by all providers. */
export const allDefinitions: FMPToolDefinition[] = [
  ...quoteDefinitions,
  ...companyDefinitions,
  ...financialDefinitions,
  ...calendarDefinitions,
  ...economicDefinitions,
  ...etfDefinitions,
  ...insiderDefinitions,
  ...institutionalDefinitions,
  ...marketDefinitions,
  ...newsDefinitions,
  ...screenerDefinitions,
  ...searchDefinitions,
  ...analystDefinitions,
  ...valuationDefinitions,
  ...technicalDefinitions,
  ...senateHouseDefinitions,
  ...stockDefinitions,
];

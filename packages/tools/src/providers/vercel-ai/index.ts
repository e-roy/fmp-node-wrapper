import { quoteTools } from './quote';
import { companyTools } from './company';
import { financialTools } from './financial';
import { calendarTools } from './calendar';
import { economicTools } from './economic';
import { etfTools } from './etf';
import { insiderTools } from './insider';
import { institutionalTools } from './institutional';
import { marketTools } from './market';
import { senateHouseTools } from './senate-house';
import { stockTools } from './stock';

// Combine all tools into a single object for AI SDK v2
export const fmpTools = {
  ...quoteTools,
  ...companyTools,
  ...financialTools,
  ...calendarTools,
  ...economicTools,
  ...etfTools,
  ...insiderTools,
  ...institutionalTools,
  ...marketTools,
  ...senateHouseTools,
  ...stockTools,
} as const;

// Re-export individual tool groups
export {
  quoteTools,
  companyTools,
  financialTools,
  calendarTools,
  economicTools,
  etfTools,
  insiderTools,
  institutionalTools,
  marketTools,
  senateHouseTools,
  stockTools,
};

// Re-export types
export type { ToolSet } from 'ai';

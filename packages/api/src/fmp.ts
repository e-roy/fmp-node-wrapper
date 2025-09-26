// Main FMP API client that combines all endpoints

import { FMPClient } from './client';
import { FMPConfig } from 'fmp-node-types';
import { FMPValidation } from './utils/validation';

import { CalendarEndpoints } from './endpoints/calendar';
import { CompanyEndpoints } from './endpoints/company';
import { EconomicEndpoints } from './endpoints/economic';
import { ETFEndpoints } from './endpoints/etf';
import { FinancialEndpoints } from './endpoints/financial';
import { InsiderEndpoints } from './endpoints/insider';
import { InstitutionalEndpoints } from './endpoints/institutional';
import { ListEndpoints } from './endpoints/list';
import { MarketEndpoints } from './endpoints/market';
import { MutualFundEndpoints } from './endpoints/mutual-fund';
import { NewsEndpoints } from './endpoints/news';
import { QuoteEndpoints } from './endpoints/quote';
import { ScreenerEndpoints } from './endpoints/screener';
import { SECEndpoints } from './endpoints/sec';
import { SenateHouseEndpoints } from './endpoints/senate-house';
import { StockEndpoints } from './endpoints/stock';

/**
 * Main FMP API client that provides access to all endpoints
 *
 * @example
 * ```typescript
 * import { FMP } from 'fmp-node-api';
 *
 * // Option 1: Provide API key directly
 * const fmp = new FMP({ apiKey: 'your-api-key' });
 *
 * // Option 2: Use environment variable (FMP_API_KEY)
 * const fmp = new FMP();
 *
 * // Option 3: Provide partial config with environment variable fallback
 * const fmp = new FMP({ timeout: 15000 });
 *
 * // Get quote for any asset type
 * const quote = await fmp.quote.getQuote({ symbol: 'AAPL' });
 *
 * // Get stock-specific data
 * const marketCap = await fmp.stock.getMarketCap({ symbol: 'AAPL' });
 *
 * // Get financial statements
 * const incomeStatement = await fmp.financial.getIncomeStatement({
 *   symbol: 'AAPL',
 *   period: 'annual'
 * });
 *
 * ```
 */
export class FMP {
  public readonly calendar: CalendarEndpoints;
  public readonly company: CompanyEndpoints;
  public readonly economic: EconomicEndpoints;
  public readonly etf: ETFEndpoints;
  public readonly financial: FinancialEndpoints;
  public readonly insider: InsiderEndpoints;
  public readonly institutional: InstitutionalEndpoints;
  public readonly list: ListEndpoints;
  public readonly market: MarketEndpoints;
  public readonly mutualFund: MutualFundEndpoints;
  public readonly news: NewsEndpoints;
  public readonly quote: QuoteEndpoints;
  public readonly screener: ScreenerEndpoints;
  public readonly sec: SECEndpoints;
  public readonly senateHouse: SenateHouseEndpoints;
  public readonly stock: StockEndpoints;

  constructor(config: FMPConfig = {}) {
    // Get API key from config or environment variable
    const apiKey = config.apiKey || process.env.FMP_API_KEY;

    if (!apiKey) {
      throw new Error(
        'FMP API key is required. Please provide it in the config or set the FMP_API_KEY environment variable.',
      );
    }

    // Validate API key at construction time
    if (!FMPValidation.isValidApiKey(apiKey)) {
      throw new Error('Invalid API key format');
    }

    const client = new FMPClient({ ...config, apiKey });

    this.calendar = new CalendarEndpoints(client);
    this.company = new CompanyEndpoints(client);
    this.economic = new EconomicEndpoints(client);
    this.etf = new ETFEndpoints(client);
    this.financial = new FinancialEndpoints(client);
    this.insider = new InsiderEndpoints(client);
    this.institutional = new InstitutionalEndpoints(client);
    this.list = new ListEndpoints(client);
    this.market = new MarketEndpoints(client);
    this.mutualFund = new MutualFundEndpoints(client);
    this.news = new NewsEndpoints(client);
    this.quote = new QuoteEndpoints(client);
    this.screener = new ScreenerEndpoints(client);
    this.sec = new SECEndpoints(client);
    this.senateHouse = new SenateHouseEndpoints(client);
    this.stock = new StockEndpoints(client);
  }

  /**
   * Get the underlying client instance for advanced usage
   */
  getClient(): FMPClient {
    return this.stock['client'];
  }
}

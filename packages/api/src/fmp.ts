// Main FMP API client that combines all endpoints

import { FMPClient } from './client';
import { FMPConfig } from './types/common';
import { FMPValidation } from './utils/validation';
import { StockEndpoints } from './endpoints/stock';
import { FinancialEndpoints } from './endpoints/financial';
import { ETFEndpoints } from './endpoints/etf';
import { EconomicEndpoints } from './endpoints/economic';
import { MarketEndpoints } from './endpoints/market';
import { ListEndpoints } from './endpoints/list';
import { CalendarEndpoints } from './endpoints/calendar';
import { CompanyEndpoints } from './endpoints/company';
import { QuoteEndpoints } from './endpoints/quote';
import { SenateHouseEndpoints } from './endpoints/senate-house';
import { InstitutionalEndpoints } from './endpoints/institutional';
import { InsiderEndpoints } from './endpoints/insider';
import { SECEndpoints } from './endpoints/sec';
import { MutualFundEndpoints } from './endpoints/mutual-fund';

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
  public readonly stock: StockEndpoints;
  public readonly financial: FinancialEndpoints;
  public readonly etf: ETFEndpoints;
  public readonly economic: EconomicEndpoints;
  public readonly market: MarketEndpoints;
  public readonly list: ListEndpoints;
  public readonly calendar: CalendarEndpoints;
  public readonly company: CompanyEndpoints;
  public readonly quote: QuoteEndpoints;
  public readonly senateHouse: SenateHouseEndpoints;
  public readonly institutional: InstitutionalEndpoints;
  public readonly insider: InsiderEndpoints;
  public readonly sec: SECEndpoints;
  public readonly mutualFund: MutualFundEndpoints;

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

    this.stock = new StockEndpoints(client);
    this.financial = new FinancialEndpoints(client);
    this.etf = new ETFEndpoints(client);
    this.economic = new EconomicEndpoints(client);
    this.market = new MarketEndpoints(client);
    this.list = new ListEndpoints(client);
    this.calendar = new CalendarEndpoints(client);
    this.company = new CompanyEndpoints(client);
    this.quote = new QuoteEndpoints(client);
    this.senateHouse = new SenateHouseEndpoints(client);
    this.institutional = new InstitutionalEndpoints(client);
    this.insider = new InsiderEndpoints(client);
    this.sec = new SECEndpoints(client);
    this.mutualFund = new MutualFundEndpoints(client);
  }

  /**
   * Get the underlying client instance for advanced usage
   */
  getClient(): FMPClient {
    return this.stock['client'];
  }
}

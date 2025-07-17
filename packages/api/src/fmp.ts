// Main FMP API client that combines all endpoints

import { FMPClient } from './client';
import { FMPConfig } from './types/common';
import { validateApiKey } from './utils/validation';
import { StockEndpoints } from './endpoints/stock';
import { FinancialEndpoints } from './endpoints/financial';
import { ForexEndpoints } from './endpoints/forex';
import { CryptoEndpoints } from './endpoints/crypto';
import { ETFEndpoints } from './endpoints/etf';
import { MutualFundEndpoints } from './endpoints/mutual-fund';
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

/**
 * Main FMP API client that provides access to all endpoints
 *
 * @example
 * ```typescript
 * import { FMP } from 'fmp-node-api';
 *
 * const fmp = new FMP({ apiKey: 'your-api-key' });
 *
 * // Get stock quote
 * const quote = await fmp.stock.getQuote({ symbol: 'AAPL' });
 *
 * // Get financial statements
 * const incomeStatement = await fmp.financial.getIncomeStatement({
 *   symbol: 'AAPL',
 *   period: 'annual'
 * });
 *
 * // Get forex data
 * const forexQuote = await fmp.forex.getQuote({ symbol: 'EURUSD' });
 * ```
 */
export class FMP {
  public readonly stock: StockEndpoints;
  public readonly financial: FinancialEndpoints;
  public readonly forex: ForexEndpoints;
  public readonly crypto: CryptoEndpoints;
  public readonly etf: ETFEndpoints;
  public readonly mutualFund: MutualFundEndpoints;
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

  constructor(config: FMPConfig) {
    // Validate API key at construction time
    validateApiKey(config.apiKey);

    const client = new FMPClient(config);

    this.stock = new StockEndpoints(client);
    this.financial = new FinancialEndpoints(client);
    this.crypto = new CryptoEndpoints(client);
    this.etf = new ETFEndpoints(client);
    this.market = new MarketEndpoints(client);
    this.list = new ListEndpoints(client);
    this.calendar = new CalendarEndpoints(client);
    this.company = new CompanyEndpoints(client);
    this.quote = new QuoteEndpoints(client);
    this.senateHouse = new SenateHouseEndpoints(client);
    this.institutional = new InstitutionalEndpoints(client);
    this.insider = new InsiderEndpoints(client);
    this.sec = new SECEndpoints(client);

    this.forex = new ForexEndpoints(client);
    this.economic = new EconomicEndpoints(client);
    this.mutualFund = new MutualFundEndpoints(client);
  }

  /**
   * Get the underlying client instance for advanced usage
   */
  getClient(): FMPClient {
    return this.stock['client'];
  }
}

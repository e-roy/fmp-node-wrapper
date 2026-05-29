# FMP Node API Wrapper

A comprehensive Node.js wrapper for the Financial Modeling Prep (FMP) API with full TypeScript support and organized endpoint structure.

> **📖 Visit the [Documentation](https://fmp-node-wrapper-docs.vercel.app/) for detailed information.**

> **🔧 For development information, contributing guidelines, and project details, visit the [main repository](https://github.com/e-roy/fmp-node-wrapper).**

## Features

- 🚀 **Complete TypeScript Support** - Full type safety for all API responses
- 📦 **Organized Structure** - Clean separation of concerns with dedicated modules
- 🔧 **Easy to Use** - Simple, intuitive API with minimal boilerplate
- 📊 **Comprehensive Coverage** - Support for all FMP stable endpoints
- 🛡️ **Input Validation** - Built-in validation for all parameters
- 🎯 **Modular Design** - Import only what you need
- 🧪 **Comprehensive Testing** - Full test suite with 45+ tests covering all endpoints
- 📈 **Real-time Data** - Access to live market data and financial statements

## Installation

```bash
npm install fmp-node-api
# or
yarn add fmp-node-api
# or
pnpm add fmp-node-api
```

## Quick Start

```typescript
import { FMP } from 'fmp-node-api';

// Option 1: Use environment variable (recommended)
const fmp = new FMP(); // Automatically uses FMP_API_KEY from environment

// Option 2: Provide API key directly
const fmp = new FMP({ apiKey: 'your-api-key' });

// Option 3: Provide partial config with environment variable fallback
const fmp = new FMP({ timeout: 15000 }); // Uses FMP_API_KEY from environment

// Get stock quote
const quote = await fmp.quote.getQuote('AAPL');

// Get financial statements
const incomeStatement = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
  period: 'annual',
});

// Get forex data
const forexQuote = await fmp.quote.getQuote('EURUSD');
```

## Configuration

The FMP client supports multiple ways to configure your API key:

### Environment Variable (Recommended)

Set the `FMP_API_KEY` environment variable in your `.env` file or system environment:

```bash
# .env file
FMP_API_KEY=your-api-key-here

# Or set in your system
export FMP_API_KEY=your-api-key-here
```

Then initialize the client without any parameters:

```typescript
import { FMP } from 'fmp-node-api';

const fmp = new FMP(); // Automatically uses FMP_API_KEY
```

### Direct Configuration

Provide the API key directly in the constructor:

```typescript
import { FMP } from 'fmp-node-api';

const fmp = new FMP({
  apiKey: 'your-api-key-here',
  timeout: 10000, // optional
});
```

### Mixed Configuration

You can provide partial configuration and let the client fall back to environment variables:

```typescript
import { FMP } from 'fmp-node-api';

const fmp = new FMP({
  timeout: 15000, // custom timeout
  // apiKey will be loaded from FMP_API_KEY environment variable
});
```

### Configuration Options

```typescript
interface FMPConfig {
  apiKey?: string; // Optional: API key (falls back to FMP_API_KEY env var)
  timeout?: number; // Optional: Request timeout in milliseconds (default: 10000)
}
```

## API Structure

The library is organized into logical modules for easy navigation and usage:

### Main Client

```typescript
import { FMP } from 'fmp-node-api';

// Using environment variable (recommended)
const fmp = new FMP();

// Or with explicit configuration
const fmp = new FMP({
  apiKey: 'your-api-key',
  timeout: 10000, // optional
});
```

### Available Modules

- **`fmp.quote`** - Quote data for stocks, forex, crypto, commodities, and ETFs
- **`fmp.stock`** - Stock market data (market cap, splits, dividends, real-time prices)
- **`fmp.financial`** - Financial statements (income, balance sheet, cash flow)
- **`fmp.company`** - Company information and profiles
- **`fmp.etf`** - ETF data and holdings
- **`fmp.mutualFund`** - Mutual fund data
- **`fmp.economic`** - Economic indicators
- **`fmp.market`** - Market-wide data and performance
- **`fmp.list`** - Stock lists and indices
- **`fmp.screener`** - Stock screener with filters and available exchanges/sectors/industries/countries
- **`fmp.calendar`** - Earnings and economic calendar
- **`fmp.senateHouse`** - Congressional trading data
- **`fmp.institutional`** - Form 13F filings and institutional ownership
- **`fmp.insider`** - Insider trading data
- **`fmp.sec`** - SEC filings and industry classification
- **`fmp.news`** - Financial news articles (general, stock, crypto, forex; by symbol or latest)

## Usage Examples

### Quote Data

```typescript
// Get real-time quote for any asset type
const quote = await fmp.quote.getQuote('AAPL');

// Get multiple quotes
const quotes = await fmp.quote.getQuotes(['AAPL', 'MSFT', 'GOOGL']);

// Get historical prices
const historical = await fmp.quote.getHistoricalPrice({
  symbol: 'AAPL',
  from: '2024-01-01',
  to: '2024-12-31',
});

// Get intraday data
const intraday = await fmp.quote.getIntraday({
  symbol: 'AAPL',
  interval: '1hour',
  from: '2024-01-01',
  to: '2024-01-02',
});
```

### Stock Data

```typescript
// Get market capitalization
const marketCap = await fmp.stock.getMarketCap('AAPL');

// Get stock splits
const splits = await fmp.stock.getStockSplits('AAPL');

// Get dividend history
const dividends = await fmp.stock.getDividendHistory('AAPL');

// Get real-time price data
const realTimePrice = await fmp.stock.getRealTimePrice(['AAPL', 'MSFT', 'GOOGL']);

// Get full real-time price data
const fullRealTimeData = await fmp.stock.getRealTimePriceForMultipleStocks([
  'AAPL',
  'MSFT',
  'GOOGL',
]);
```

### Financial Statements

```typescript
// Get income statement
const income = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
  period: 'annual',
  limit: 10,
});

// Get balance sheet
const balance = await fmp.financial.getBalanceSheet({
  symbol: 'AAPL',
  period: 'quarter',
});

// Get cash flow statement
const cashFlow = await fmp.financial.getCashFlowStatement({
  symbol: 'AAPL',
  period: 'annual',
});

// Get key metrics
const metrics = await fmp.financial.getKeyMetrics({ symbol: 'AAPL' });

// Get financial ratios
const ratios = await fmp.financial.getFinancialRatios({ symbol: 'AAPL' });
```

### Market Data

```typescript
// Get market hours
const hours = await fmp.market.getMarketHours();

// Get market performance
const performance = await fmp.market.getMarketPerformance();

// Get gainers and losers
const gainers = await fmp.market.getGainers();
const losers = await fmp.market.getLosers();

// Get most active stocks
const mostActive = await fmp.market.getMostActive();

// Get sector performance
const sectors = await fmp.market.getSectorPerformance();
```

### Economic Indicators

```typescript
// Get treasury rates
const treasury = await fmp.economic.getTreasuryRates({
  from: '2024-01-01',
  to: '2024-12-31',
});

// Get economic indicators by name (GDP, CPI, federalFunds, unemploymentRate, …)
const gdp = await fmp.economic.getEconomicIndicators({
  name: 'GDP',
  from: '2024-01-01',
  to: '2024-12-31',
});
const cpi = await fmp.economic.getEconomicIndicators({ name: 'CPI' });
const unemployment = await fmp.economic.getEconomicIndicators({ name: 'unemploymentRate' });
```

### Other Asset Classes

```typescript
// Forex
const forexQuote = await fmp.quote.getQuote('EURUSD');

// Cryptocurrency
const cryptoQuote = await fmp.quote.getQuote('BTCUSD');

// Symbol lists
const stocks = await fmp.list.getStockList();
const etfs = await fmp.list.getETFList();
const crypto = await fmp.list.getCryptoList();
const indexes = await fmp.list.getAvailableIndexes();

// Earnings calendar
const earnings = await fmp.calendar.getEarningsCalendar({
  from: '2024-01-01',
  to: '2024-12-31',
});

// Economic calendar
const economic = await fmp.calendar.getEconomicCalendar({
  from: '2024-01-01',
  to: '2024-12-31',
});

// Company profile
const companyProfile = await fmp.company.getCompanyProfile('AAPL');
```

### Stock Screener

```typescript
// Filter stocks by multiple criteria
const results = await fmp.screener.getScreener({
  marketCapMoreThan: 10000000000,
  sector: 'Technology',
  isActivelyTrading: true,
  limit: 50,
});

// Lookups for available filter values
const exchanges = await fmp.screener.getAvailableExchanges();
const sectors = await fmp.screener.getAvailableSectors();
const industries = await fmp.screener.getAvailableIndustries();
const countries = await fmp.screener.getAvailableCountries();
```

### News

```typescript
// Latest news by asset class
const stockNews = await fmp.news.getStockNews({ from: '2024-01-01', to: '2024-01-31' });
const cryptoNews = await fmp.news.getCryptoNews({ limit: 50 });
const forexNews = await fmp.news.getForexNews({ limit: 50 });

// FMP-authored articles
const articles = await fmp.news.getArticles({ page: 1, limit: 20 });

// News for specific symbols
const aaplNews = await fmp.news.getStockNewsBySymbol({ symbols: ['AAPL', 'MSFT'] });
```

## Testing

This package includes comprehensive tests for all endpoints. There are two test scripts available:

### Local Development

```bash
pnpm test
```

- Uses Jest to run all tests
- **Fully mocked and deterministic** — no network and no API key required
- Live API validation is handled separately by `pnpm test:live` (see below)

### Running Specific Tests

```bash
# Run only unit tests (client + main FMP class)
pnpm test:unit

# Run tests for specific endpoints
pnpm test:stock
pnpm test:financial
pnpm test:market
pnpm test:quote
pnpm test:economic
pnpm test:list
pnpm test:calendar
pnpm test:company

# Run all endpoint tests
pnpm test:endpoints

# Inspect one endpoint's raw response against the live API
pnpm test:endpoint <name>

# Validate response shapes against the live API (needs FMP_API_KEY)
pnpm test:live
```

## Response Format

All API methods return a standardized response format:

```typescript
interface APIResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  status: number;
}
```

### Example Response

```typescript
{
  success: true,
  data: {
    symbol: 'AAPL',
    price: 150.25,
    change: 2.15,
    changePercent: 1.45,
    // ... other fields
  },
  error: null,
  status: 200
}
```

## Error Handling

```typescript
try {
  const quote = await fmp.quote.getQuote('INVALID');

  if (!quote.success) {
    console.error('API Error:', quote.error);
    return;
  }

  if (quote.data) {
    console.log('Quote:', quote.data);
  }
} catch (error) {
  console.error('Network Error:', error);
}
```

## Type Safety

The library provides full TypeScript support with comprehensive type definitions included in the main package:

```typescript
import { Quote, MarketCap, IncomeStatement } from 'fmp-node-api';

// All responses are properly typed
const quote: APIResponse<Quote> = await fmp.quote.getQuote('AAPL');
const marketCap: APIResponse<MarketCap> = await fmp.stock.getMarketCap('AAPL');
const income: APIResponse<IncomeStatement[]> = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
});
```

All API responses and parameters are fully typed for complete type safety.

## Utilities

The library includes helpful utilities for data formatting and validation:

```typescript
import {
  formatCurrency,
  formatPercentage,
  formatLargeNumber,
  formatDate,
  formatVolume,
} from 'fmp-node-api';

// Format financial data
const formattedPrice = formatCurrency(150.25); // "$150.25"
const formattedChange = formatPercentage(1.45); // "1.45%"
const formattedMarketCap = formatLargeNumber(2500000000); // "2.50B"
const formattedVolume = formatVolume(1500000); // "1.50M"
const formattedDate = formatDate('2024-01-15'); // "2024-01-15"
```

## Advanced Usage

### Custom Client Configuration

```typescript
import { FMPClient } from 'fmp-node-api';

// Using environment variable
const client = new FMPClient({
  timeout: 15000, // optional, apiKey from FMP_API_KEY env var
});

// Or with explicit API key
const client = new FMPClient({
  apiKey: 'your-api-key',
  timeout: 15000, // optional
});

// Use individual endpoint classes
const stockEndpoints = new StockEndpoints(client);
const marketCap = await stockEndpoints.getMarketCap('AAPL');
```

### Direct API Calls

```typescript
const client = fmp.getClient();
const response = await client.get('/quote/AAPL');
```

## Testing

The library includes a comprehensive test suite with extensive coverage across all endpoints, types, and utilities:

### Available Test Scripts

```bash
# Run all tests
pnpm test

# Run specific test categories
pnpm test:unit          # Unit tests (client, main FMP class)
pnpm test:endpoints     # All endpoint tests (mocked)
pnpm test:stock         # Stock endpoint tests only
pnpm test:financial     # Financial endpoint tests only
pnpm test:market        # Market endpoint tests only
pnpm test:quote         # Quote endpoint tests only
pnpm test:economic      # Economic endpoint tests only
pnpm test:list          # List endpoint tests only
pnpm test:calendar      # Calendar endpoint tests only
pnpm test:company       # Company endpoint tests only

# Manual testing with real API calls
pnpm test:endpoint      # Run a specific endpoint against the live API

# Development
pnpm test:watch         # Watch mode for development
pnpm test:coverage      # Generate coverage report
```

**Note**: Additional endpoint-specific test scripts (`test:etf`, `test:mutual-fund`, `test:senate-house`, `test:institutional`, `test:insider`, `test:sec`) are also available, both here and at the repo root.

### Live API shape check (`test:live`)

`test:live` validates real FMP responses against the canonical Zod schemas in `fmp-node-types` — catching renamed/missing/changed fields and version-mismatch 404s, not just "did it respond". Unlike `test:endpoint` (which prints one endpoint's raw JSON), `test:live` runs many cases and prints a classified summary.

Run from the repo root (it builds `fmp-node-types` first so the runner uses fresh schemas):

```bash
pnpm test:live                                   # all seeded cases
pnpm test:live --category quote,stock            # only these categories
pnpm test:live --endpoint getQuote               # cases whose name matches
pnpm test:live --dry-run                         # list cases, make NO API calls
pnpm test:live --category financial --max-calls 10
```

Each result is classified:

- **PASS** — response matches the schema
- **FAIL** — an expected field is missing or has the wrong (non-null) type
- **SKIP** — plan-locked (HTTP 402/403) or rate/quota limited (429)
- **DRIFT** — extra top-level fields, or a non-nullable field came back `null`

Flags: `--delay <ms>` (default 400) paces calls; `--max-calls <n>` (default 50) caps live calls; `--include-locked` also runs cases marked `planLocked`; `--fail-on-drift` makes DRIFT fail the exit code. The runner is sequential and throttled to stay within limited API plans — the first full run doubles as a calibration pass: mark any consistently plan-locked endpoints `planLocked: true` in `scripts/live/manifest.ts` so later default runs skip them. Exits non-zero when any case FAILs.

> Coverage note: the seeded manifest currently covers the `quote`, `stock`, `financial`, and `market` categories. The classifier logic is unit-tested in `src/__tests__/live/validate.test.ts` (no API key needed).

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- FMP API key

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd fmp-node-wrapper

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your FMP_API_KEY to .env

# Build the package
pnpm build

# Run tests
pnpm test
```

### Available Scripts

```bash
# Build
pnpm build              # Build the package
pnpm dev                # Watch mode for development

# Testing
pnpm test               # Run all tests (mocked, deterministic)
pnpm test:watch         # Watch mode
pnpm test:coverage      # Coverage report
pnpm test:live          # Validate response shapes against the live API
pnpm test:endpoint      # Inspect one endpoint's raw response (live)
pnpm test:unit          # Run unit tests
pnpm test:endpoints     # Run all endpoint tests
pnpm test:stock         # Run stock endpoint tests
pnpm test:financial     # Run financial endpoint tests
pnpm test:market        # Run market endpoint tests
pnpm test:quote         # Run quote endpoint tests
pnpm test:economic      # Run economic endpoint tests
pnpm test:list          # Run list endpoint tests
pnpm test:calendar      # Run calendar endpoint tests
pnpm test:company       # Run company endpoint tests

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix linting issues
pnpm format             # Format code with Prettier
pnpm format:check       # Check code formatting
pnpm type-check         # TypeScript type checking

# Utilities
pnpm clean              # Clean build artifacts
```

## File Structure

```
src/
├── client.ts              # Base HTTP client (v3/v4/stable axios instances)
├── fmp.ts                 # Main FMP class (wires up all endpoint classes)
├── index.ts               # Main exports
├── types-only.ts          # Types-only entry point (fmp-node-api/types)
├── shared.ts              # Shared error types
├── endpoints/             # API endpoint classes (one per category)
│   ├── quote.ts
│   ├── stock.ts
│   ├── financial.ts
│   ├── company.ts
│   ├── etf.ts
│   ├── mutual-fund.ts
│   ├── economic.ts
│   ├── market.ts
│   ├── list.ts
│   ├── screener.ts
│   ├── calendar.ts
│   ├── senate-house.ts
│   ├── institutional.ts
│   ├── insider.ts
│   ├── sec.ts
│   └── news.ts
├── utils/                 # Utility functions
│   ├── validation.ts      # Input validation
│   ├── formatting.ts      # Data formatting
│   ├── constants.ts       # API constants
│   ├── helpers.ts         # Shared helpers
│   ├── debug.ts           # Debug logging
│   └── utils.ts           # Misc utilities
├── live/                  # Live-check classifier (dev-only; not exported/shipped)
│   └── validate.ts        # Relaxed validator / classifier (PASS/FAIL/SKIP/DRIFT)
└── __tests__/             # Jest tests (client, fmp, integration, endpoints/, utils/, live/)

scripts/
├── test-endpoint.ts       # Manual live-API endpoint inspector (raw JSON, one endpoint)
└── live/                  # Live-API shape-check tool (pnpm test:live)
    ├── run.ts             # CLI runner (flags, throttle, budget, summary)
    ├── manifest.ts        # Data-driven registry of cases (endpoint + inputs + schema)
    └── tsconfig.json      # Type-checks the runner (pnpm type-check:live)
```

## Contributing

We welcome contributions! This is a community-driven project, and your help is greatly appreciated.

### Quick Start

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our development guidelines
4. **Run quality checks**: `pnpm lint && pnpm test && pnpm type-check`
5. **Open a Pull Request** with a clear description of your changes

### Development Setup

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Add your FMP_API_KEY to .env

# Build and test
pnpm build
pnpm test
```

### Getting Help

- **📖 [Contributing Guide](https://github.com/e-roy/fmp-node-wrapper/blob/main/CONTRIBUTING.md)**: Detailed guidelines and development setup
- **🐛 [Issues](https://github.com/e-roy/fmp-node-wrapper/issues)**: Report bugs or request features
- **📚 [Documentation](https://fmp-node-wrapper-docs.vercel.app)**: Check the docs first

### Before Contributing

- [ ] Read the [Contributing Guide](https://github.com/e-roy/fmp-node-wrapper/blob/main/CONTRIBUTING.md)
- [ ] Check existing issues to avoid duplicates
- [ ] Test with the latest version of the library
- [ ] Follow our coding standards and testing requirements

## Issues and Support

### Reporting Issues

Before creating an issue, please:

1. **Check existing issues** to avoid duplicates
2. **Search the documentation** for solutions
3. **Test with the latest version** of the library
4. **Provide a minimal reproduction** of the problem

### Issue Guidelines

- **Be specific**: Provide clear, actionable information
- **Include examples**: Code examples help reproduce issues
- **Check versions**: Mention Node.js and library versions
- **Separate concerns**: Don't mix multiple issues in one report

### Support Channels

- **🐛 [GitHub Issues](https://github.com/e-roy/fmp-node-wrapper/issues)**: For bug reports and feature requests
- **📧 [FMP Official Support](https://site.financialmodelingprep.com/developer/docs/stable)**: For issues with the underlying FMP API service

## License

MIT License - see LICENSE file for details.

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/e-roy/fmp-node-wrapper).

## Disclaimer

**This package is not affiliated with, endorsed by, or sponsored by Financial Modeling Prep (FMP).** This is an independent, community-developed Node.js wrapper for the FMP API.

### Important Legal Information

- **No Affiliation**: This library is developed independently and is not officially associated with Financial Modeling Prep
- **No Warranty**: This software is provided "as is" without any warranties, express or implied
- **User Responsibility**: Users are responsible for:
  - Complying with FMP's terms of service and API usage limits
  - Obtaining and maintaining valid API keys from Financial Modeling Prep
  - Ensuring their usage complies with applicable laws and regulations
- **Limitation of Liability**: The developers of this wrapper are not responsible for:
  - Any issues with the underlying FMP API service
  - Data accuracy or availability from the FMP API
  - Any financial losses or damages resulting from the use of this library
  - API rate limiting, downtime, or service interruptions
- **Official Support**: For official support, documentation, or API issues, please contact Financial Modeling Prep directly at their official channels

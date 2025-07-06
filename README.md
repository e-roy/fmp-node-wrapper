# FMP Node Wrapper

A modern, comprehensive Node.js wrapper for the Financial Modeling Prep (FMP) API with full TypeScript support.

## Features

- 🚀 **Complete TypeScript Support** - Full type safety for all API responses
- 📦 **Organized Structure** - Clean separation of concerns with dedicated modules
- 🔧 **Easy to Use** - Simple, intuitive API with minimal boilerplate
- 📊 **Comprehensive Coverage** - Support for all FMP stable endpoints
- 🛡️ **Input Validation** - Built-in validation for all parameters
- 🎯 **Modular Design** - Import only what you need
- 🧪 **Comprehensive Testing** - Full test suite with 45+ tests covering all endpoints

## Installation

```bash
npm install fmp-node-api
# or
yarn add fmp-node-api
# or
pnpm add fmp-node-api
```

## Quick Start

### 1. Get Your API Key

Sign up at [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs/stable) and get your API key.

### 2. Basic Usage

```typescript
import { FMP } from 'fmp-node-api';

// Initialize the client
const fmp = new FMP({
  apiKey: 'your-api-key-here',
});

// Get stock quote
const quote = await fmp.stock.getQuote({ symbol: 'AAPL' });
if (quote.success) {
  console.log('Price:', quote.data[0].price);
}

// Get company profile
const profile = await fmp.stock.getCompanyProfile({ symbol: 'AAPL' });
if (profile.success) {
  console.log('Company:', profile.data[0].companyName);
}
```

## API Examples

### Stock Data

```typescript
// Get real-time quote
const quote = await fmp.stock.getQuote({ symbol: 'AAPL' });

// Get company profile
const profile = await fmp.stock.getCompanyProfile({ symbol: 'AAPL' });

// Get historical prices
const historical = await fmp.stock.getHistoricalPrice({
  symbol: 'AAPL',
  from: '2024-01-01',
  to: '2024-12-31',
});

// Get stock splits
const splits = await fmp.stock.getStockSplits({ symbol: 'AAPL' });

// Get dividend history
const dividends = await fmp.stock.getDividendHistory({ symbol: 'AAPL' });
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
```

### Other Asset Classes

```typescript
// Forex
const forexQuote = await fmp.forex.getQuote({ symbol: 'EURUSD' });

// Cryptocurrency
const cryptoQuote = await fmp.crypto.getQuote({ symbol: 'BTCUSD' });

// ETFs
const etfQuote = await fmp.etf.getQuote({ symbol: 'SPY' });

// Economic indicators
const treasury = await fmp.economic.getTreasuryRates({
  from: '2024-01-01',
  to: '2024-12-31',
});

// Stock lists and indices
const sp500 = await fmp.list.getSP500();
const nasdaq = await fmp.list.getNasdaq100();

// Earnings calendar
const earnings = await fmp.calendar.getEarningsCalendar({
  from: '2024-01-01',
  to: '2024-12-31',
});

// Company search
const companies = await fmp.company.searchCompany({ query: 'Apple' });
```

## Response Format

All API methods return a standardized response format:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}
```

### Example Response

```typescript
{
  success: true,
  data: [
    {
      symbol: 'AAPL',
      price: 150.25,
      change: 2.15,
      changePercent: 1.45,
      // ... other fields
    }
  ],
  status: 200
}
```

## Error Handling

```typescript
try {
  const quote = await fmp.stock.getQuote({ symbol: 'INVALID' });

  if (!quote.success) {
    console.error('API Error:', quote.error);
    return;
  }

  console.log('Quote:', quote.data);
} catch (error) {
  console.error('Network Error:', error);
}
```

## Available Modules

- **`fmp.stock`** - Stock market data (quotes, profiles, historical prices, etc.)
- **`fmp.financial`** - Financial statements (income, balance sheet, cash flow)
- **`fmp.forex`** - Foreign exchange data
- **`fmp.crypto`** - Cryptocurrency data
- **`fmp.etf`** - ETF data and holdings
- **`fmp.mutualFund`** - Mutual fund data
- **`fmp.bond`** - Bond market data
- **`fmp.economic`** - Economic indicators
- **`fmp.market`** - Market-wide data and performance
- **`fmp.list`** - Stock lists and indices
- **`fmp.calendar`** - Earnings and economic calendar
- **`fmp.company`** - Company information and search

## Documentation

- **📚 [Full Documentation](https://fmp-node-wrapper.vercel.app)** - Complete API reference and examples
- **📦 [NPM Package](https://www.npmjs.com/package/fmp-node-api)** - Package information and downloads
- **🐛 [Issues](https://github.com/e-roy/fmp-node-wrapper/issues)** - Report bugs or request features

## Support

- **🐛 [GitHub Issues](https://github.com/e-roy/fmp-node-wrapper/issues)**: For bug reports and feature requests
- **📧 [FMP Official Support](https://site.financialmodelingprep.com/developer/docs/stable)**: For issues with the underlying FMP API service

## Contributing

We welcome contributions! This is a community-driven project, and your help is greatly appreciated.

### Quick Start

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our development guidelines
4. **Run quality checks**: `pnpm lint && pnpm test && pnpm type-check`
5. **Open a Pull Request** with a clear description of your changes

### Getting Help

- **📖 [Contributing Guide](CONTRIBUTING.md)**: Detailed guidelines and development setup
- **🐛 [Issues](https://github.com/e-roy/fmp-node-wrapper/issues)**: Report bugs or request features
- **📚 [Documentation](https://fmp-node-wrapper.vercel.app)**: Check the docs first

### Before Contributing

- [ ] Read the [Contributing Guide](CONTRIBUTING.md)
- [ ] Check existing issues to avoid duplicates
- [ ] Test with the latest version of the library
- [ ] Follow our coding standards and testing requirements

---

## Development

_This section is for developers working on the library itself._

### Project Structure

This is a monorepo containing:

- **`packages/api/`**: Main FMP API wrapper (`fmp-node-api`)
- **`apps/docs/`**: Next.js documentation site

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

### Available Scripts

```bash
# Development & Build
pnpm dev              # All packages
pnpm docs:dev         # Just docs
pnpm api:dev          # Just API
pnpm build            # Build all packages
pnpm clean            # Clean build artifacts
pnpm clean:install    # Clean all node_modules and reinstall

# Testing
pnpm test             # All tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Run tests with coverage report
pnpm test:api         # Manual API tests
pnpm test:endpoint    # Run specific endpoint test (requires cd to packages/api)
pnpm test:unit        # Run unit tests for API package
pnpm test:integration # Run integration tests for API package
pnpm test:endpoints   # Run all endpoint tests
pnpm test:stock       # Run stock endpoint tests
pnpm test:financial   # Run financial endpoint tests
pnpm test:market      # Run market endpoint tests
pnpm test:forex       # Run forex endpoint tests
pnpm test:economic    # Run economic endpoint tests
pnpm test:list        # Run list endpoint tests
pnpm test:calendar    # Run calendar endpoint tests
pnpm test:company     # Run company endpoint tests

# Code Quality
pnpm lint             # Check linting
pnpm lint:fix         # Auto-fix
pnpm format           # Format code
pnpm format:check     # Check code formatting
pnpm type-check       # Type checking

# Publishing
pnpm publish-packages # Build, lint, test, version, and publish packages
```

### Tech Stack

- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Language**: TypeScript
- **Framework**: Next.js 15 + React 19
- **Styling**: Tailwind CSS v4
- **Testing**: Jest + ts-jest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Versioning**: Changesets

## License

MIT

## Disclaimer

**This project is not affiliated with, endorsed by, or sponsored by Financial Modeling Prep (FMP).** This is an independent, community-developed Node.js wrapper for the FMP API.

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

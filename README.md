# FMP Node Wrapper

**FMP Node API:**
[![npm version](https://img.shields.io/npm/v/fmp-node-api.svg)](https://www.npmjs.com/package/fmp-node-api)
[![npm downloads](https://img.shields.io/npm/dm/fmp-node-api.svg)](https://www.npmjs.com/package/fmp-node-api)

**FMP AI Tools:**
[![npm version](https://img.shields.io/npm/v/fmp-ai-tools.svg)](https://www.npmjs.com/package/fmp-ai-tools)
[![npm downloads](https://img.shields.io/npm/dm/fmp-ai-tools.svg)](https://www.npmjs.com/package/fmp-ai-tools)

**Project:**
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/e-roy/fmp-node-wrapper)
[![Test Coverage](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/e-roy/fmp-node-wrapper)

A modern, comprehensive Node.js wrapper for the Financial Modeling Prep (FMP) API with full TypeScript support.

## Features

- 🚀 **Complete TypeScript Support** - Full type safety for all API responses
- 📦 **Organized Structure** - Clean separation of concerns with dedicated modules
- 🔧 **Easy to Use** - Simple, intuitive API with minimal boilerplate
- 📊 **Comprehensive Coverage** - Support for all FMP stable endpoints
- 🛡️ **Input Validation** - Built-in validation for all parameters
- 🎯 **Modular Design** - Import only what you need
- 🧪 **Comprehensive Testing** - Full test suite with 45+ tests covering all endpoints
- 📋 **Shared Types** - Internal types package for consistent type definitions

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

Sign up at [Financial Modeling Prep](https://site.financialmodelingprep.com/pricing-plans?couponCode=eroy) and get your API key. This link will get you 10% off.

### 2. Basic Usage

```typescript
import { FMP } from 'fmp-node-api';

// Option 1: Use environment variable (recommended)
// Set FMP_API_KEY=your-api-key-here in your .env file or environment
const fmp = new FMP();

// Option 2: Provide API key directly
const fmp = new FMP({
  apiKey: 'your-api-key-here',
});

// Get stock quote
const quote = await fmp.quote.getQuote('AAPL');
if (quote.success && quote.data) {
  console.log('Price:', quote.data.price);
}

// Get company profile
const profile = await fmp.company.getCompanyProfile('AAPL');
if (profile.success && profile.data) {
  console.log('Company:', profile.data.companyName);
}
```

## API Examples

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
const forexQuote = await fmp.quote.getQuote('EURUSD');

// Cryptocurrency
const cryptoQuote = await fmp.quote.getQuote('BTCUSD');

// ETFs
const etfQuote = await fmp.quote.getQuote('SPY');

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

## TypeScript Support

The library provides full TypeScript support with comprehensive type definitions included in the main package:

```typescript
import { FMP } from 'fmp-node-api';

// All responses are properly typed
const quote = await fmp.quote.getQuote('AAPL'); // TypeScript knows this returns APIResponse<Quote>
const marketCap = await fmp.stock.getMarketCap('AAPL'); // TypeScript knows this returns APIResponse<MarketCap>
const income = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
}); // TypeScript knows this returns APIResponse<IncomeStatement[]>
```

All API responses and parameters are fully typed for complete type safety.

## Available Modules

- **`fmp.quote`** - Quote data for stocks, forex, crypto, commodities, and ETFs
- **`fmp.stock`** - Stock market data (market cap, splits, dividends, real-time prices)
- **`fmp.financial`** - Financial statements (income, balance sheet, cash flow)
- **`fmp.company`** - Company information and profiles
- **`fmp.etf`** - ETF data and holdings
- **`fmp.mutualFund`** - Mutual fund data
- **`fmp.economic`** - Economic indicators
- **`fmp.market`** - Market-wide data and performance
- **`fmp.list`** - Stock lists and indices
- **`fmp.calendar`** - Earnings and economic calendar
- **`fmp.senateHouse`** - Congressional trading data
- **`fmp.institutional`** - Form 13F filings and institutional ownership
- **`fmp.insider`** - Insider trading data
- **`fmp.sec`** - SEC filings and industry classification

## AI Tools Integration

For AI/LLM integrations, we also provide the `fmp-ai-tools` package:

```bash
npm install fmp-ai-tools
# or
pnpm add fmp-ai-tools
```

### AI Tools Features

- **Vercel AI SDK Integration** - Ready-to-use tools for Vercel AI SDK with `fmpTools`
- **Comprehensive Coverage** - Tools for quotes, financial statements, market data, economic indicators, and more
- **Easy Configuration** - Just set `FMP_API_KEY` environment variable
- **Error Handling** - Graceful error handling with informative messages
- **Modular Design** - Import specific tool categories as needed

### Quick AI Tools Example

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import { fmpTools } from 'fmp-ai-tools/vercel-ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
    tools: fmpTools,
  });

  return result.toUIMessageStreamResponse();
}
```

See the [Vercel AI example](apps/examples/vercel-ai/) for a complete implementation.

## Documentation

- **📚 [Full Documentation](https://fmp-node-wrapper-docs.vercel.app)** - Complete API reference and examples
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
- **📚 [Documentation](https://fmp-node-wrapper-docs.vercel.app)**: Check the docs first

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
- **`packages/tools/`**: AI tools for FMP API integrations (`fmp-ai-tools`)
- **`packages/types/`**: Shared TypeScript types (`fmp-node-types`)
- **`apps/docs/`**: Next.js documentation site
- **`apps/examples/`**: Example applications
  - **`vercel-ai/`**: Vercel AI SDK integration example

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
pnpm tools:dev        # Just tools package
pnpm types:dev        # Just types package
pnpm example:dev      # Just Vercel AI example
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
pnpm test:quote       # Run quote endpoint tests
pnpm test:economic    # Run economic endpoint tests
pnpm test:list        # Run list endpoint tests
pnpm test:calendar    # Run calendar endpoint tests
pnpm test:company     # Run company endpoint tests
pnpm test:etf         # Run ETF endpoint tests
pnpm test:mutual-fund # Run mutual fund endpoint tests
pnpm test:senate-house # Run senate house endpoint tests
pnpm test:institutional # Run institutional endpoint tests
pnpm test:insider     # Run insider endpoint tests
pnpm test:sec         # Run SEC endpoint tests
pnpm test:tools       # Run tools package tests
pnpm test:tool        # Run specific tool test

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

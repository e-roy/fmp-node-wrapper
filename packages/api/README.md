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

const fmp = new FMP({ apiKey: 'your-api-key' });

// Get stock quote
const quote = await fmp.quote.getQuote({ symbol: 'AAPL' });

// Get financial statements
const incomeStatement = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
  period: 'annual',
});

// Get forex data
const forexQuote = await fmp.quote.getQuote({ symbol: 'EURUSD' });
```

## API Structure

The library is organized into logical modules for easy navigation and usage:

### Main Client

```typescript
import { FMP } from 'fmp-node-api';

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
- **`fmp.calendar`** - Earnings and economic calendar
- **`fmp.senateHouse`** - Congressional trading data
- **`fmp.institutional`** - Form 13F filings and institutional ownership
- **`fmp.insider`** - Insider trading data
- **`fmp.sec`** - SEC filings and industry classification

## Usage Examples

### Quote Data

```typescript
// Get real-time quote for any asset type
const quote = await fmp.quote.getQuote({ symbol: 'AAPL' });

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
const marketCap = await fmp.stock.getMarketCap({ symbol: 'AAPL' });

// Get stock splits
const splits = await fmp.stock.getStockSplits({ symbol: 'AAPL' });

// Get dividend history
const dividends = await fmp.stock.getDividendHistory({ symbol: 'AAPL' });

// Get real-time price data
const realTimePrice = await fmp.stock.getRealTimePrice({
  symbols: ['AAPL', 'MSFT', 'GOOGL'],
});

// Get full real-time price data
const fullRealTimeData = await fmp.stock.getRealTimePriceForMultipleStocks({
  symbols: ['AAPL', 'MSFT', 'GOOGL'],
});
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

// Get federal funds rate
const fedRate = await fmp.economic.getFederalFundsRate();

// Get CPI data
const cpi = await fmp.economic.getCPI();

// Get GDP data
const gdp = await fmp.economic.getGDP();

// Get unemployment data
const unemployment = await fmp.economic.getUnemployment();
```

### Other Asset Classes

```typescript
// Forex
const forexQuote = await fmp.quote.getQuote({ symbol: 'EURUSD' });

// Cryptocurrency
const cryptoQuote = await fmp.quote.getQuote({ symbol: 'BTCUSD' });

// Stock lists and indices
const sp500 = await fmp.list.getSP500();
const nasdaq = await fmp.list.getNasdaq100();
const dowJones = await fmp.list.getDowJones();

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

// Company search
const companies = await fmp.company.searchCompany({ query: 'Apple' });

// Company profile
const companyProfile = await fmp.company.getCompanyProfile({ symbol: 'AAPL' });
```

## Testing

This package includes comprehensive tests for all endpoints. There are two test scripts available:

### Local Development

```bash
pnpm test
```

- Uses Jest to run all tests
- Automatically loads API key from `.env` file
- Requires a valid FMP API key in your `.env` file

### CI Environment

```bash
pnpm test:ci
```

- Uses Jest with explicit environment variable passing
- Requires `FMP_API_KEY` environment variable to be set
- Used by CI/CD pipelines

### Running Specific Tests

```bash
# Run only unit tests
pnpm test:unit

# Run only integration tests
pnpm test:integration

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

# Manual testing with real API calls
pnpm test:manual

# Run specific endpoint test
pnpm test:endpoint
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
  const quote = await fmp.quote.getQuote({ symbol: 'INVALID' });

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

The library provides full TypeScript support with comprehensive type definitions:

```typescript
import { Quote, MarketCap, IncomeStatement } from 'fmp-node-api';

// All responses are properly typed
const quote: APIResponse<Quote> = await fmp.quote.getQuote({
  symbol: 'AAPL',
});
const marketCap: APIResponse<MarketCap> = await fmp.stock.getMarketCap({
  symbol: 'AAPL',
});
const income: APIResponse<IncomeStatement[]> = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
});
```

## Utilities

The library includes helpful utilities for data formatting and validation:

```typescript
import {
  formatCurrency,
  formatPercentage,
  formatLargeNumber,
  formatDate,
  formatVolume,
  formatNumber,
  formatTimestamp,
  formatReadableDate,
} from 'fmp-node-api';

// Format financial data
const formattedPrice = formatCurrency(150.25); // "$150.25"
const formattedChange = formatPercentage(1.45); // "1.45%"
const formattedMarketCap = formatLargeNumber(2500000000); // "2.50B"
const formattedVolume = formatVolume(1500000); // "1.50M"
const formattedDate = formatDate('2024-01-15'); // "2024-01-15"
const formattedTimestamp = formatTimestamp(1705276800); // "1/15/2024, 12:00:00 AM"
```

## Advanced Usage

### Custom Client Configuration

```typescript
import { FMPClient } from 'fmp-node-api';

const client = new FMPClient({
  apiKey: 'your-api-key',
  timeout: 15000, // optional
});

// Use individual endpoint classes
const stockEndpoints = new StockEndpoints(client);
const marketCap = await stockEndpoints.getMarketCap({ symbol: 'AAPL' });
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
pnpm test:integration   # Integration tests
pnpm test:endpoints     # All endpoint tests
pnpm test:stock         # Stock endpoint tests only
pnpm test:financial     # Financial endpoint tests only
pnpm test:market        # Market endpoint tests only
pnpm test:quote         # Quote endpoint tests only
pnpm test:economic      # Economic endpoint tests only
pnpm test:list          # List endpoint tests only
pnpm test:calendar      # Calendar endpoint tests only
pnpm test:company       # Company endpoint tests only

# Manual testing with real API calls
pnpm test:manual        # Test real API integration
pnpm test:endpoint      # Run specific endpoint test

# Development
pnpm test:watch         # Watch mode for development
pnpm test:coverage      # Generate coverage report
```

**Note**: Additional endpoint-specific test scripts (crypto, etf, mutual-fund) are available in the package-level scripts but not exposed at the root level.

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
pnpm test               # Run all tests
pnpm test:watch         # Watch mode
pnpm test:coverage      # Coverage report
pnpm test:manual        # Manual API testing
pnpm test:endpoint      # Run specific endpoint test
pnpm test:unit          # Run unit tests
pnpm test:integration   # Run integration tests
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
├── client.ts              # Base HTTP client
├── fmp.ts                 # Main FMP class
├── index.ts               # Main exports
├── shared.ts              # Shared types and utilities
├── types/                 # Type definitions
│   ├── index.ts
│   ├── common.ts          # Common types
│   ├── stock.ts           # Stock types
│   ├── financial.ts       # Financial types
│   ├── quote.ts           # Quote types
│   ├── etf.ts             # ETF types
│   ├── mutual-fund.ts     # Mutual fund types
│   ├── economic.ts        # Economic types
│   ├── market.ts          # Market types
│   ├── list.ts            # List types
│   ├── calendar.ts        # Calendar types
│   ├── company.ts         # Company types
│   ├── senate-house.ts    # Senate house types
│   ├── institutional.ts   # Institutional types
│   ├── insider.ts         # Insider types
│   └── sec.ts             # SEC types
├── endpoints/             # API endpoint classes
│   ├── index.ts
│   ├── stock.ts
│   ├── financial.ts
│   ├── quote.ts
│   ├── etf.ts
│   ├── mutual-fund.ts
│   ├── economic.ts
│   ├── market.ts
│   ├── list.ts
│   ├── calendar.ts
│   ├── company.ts
│   ├── senate-house.ts
│   ├── institutional.ts
│   ├── insider.ts
│   └── sec.ts
├── utils/                 # Utility functions
│   ├── index.ts
│   ├── validation.ts      # Input validation
│   ├── formatting.ts      # Data formatting
│   └── constants.ts       # API constants
├── __tests__/            # Test files
│   ├── client.test.ts
│   ├── fmp.test.ts
│   ├── integration.test.ts
│   ├── endpoints/         # Endpoint tests
│   │   ├── stock.test.ts
│   │   ├── financial.test.ts
│   │   ├── market.test.ts
│   │   ├── quote.test.ts
│   │   ├── economic.test.ts
│   │   ├── etf.test.ts
│   │   ├── mutual-fund.test.ts
│   │   ├── list.test.ts
│   │   ├── calendar.test.ts
│   │   └── company.test.ts
│   ├── types/             # Type definition tests
│   │   ├── common.test.ts
│   │   ├── stock.test.ts
│   │   └── financial.test.ts
│   └── utils/             # Test utilities
│       ├── formatting.test.ts
│       ├── validation.test.ts
│       └── test-setup.ts
└── scripts/              # Build and utility scripts
    └── test-manual.ts     # Manual API testing script
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

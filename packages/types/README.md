# @fmp/types

**Internal package** - Shared TypeScript types for the FMP Node Wrapper ecosystem.

## Overview

This is an **internal package** used within the FMP Node Wrapper monorepo. It contains all TypeScript type definitions used across the FMP Node Wrapper packages.

## ⚠️ Important Note

**This package is NOT published to npm and should NOT be installed directly by users.**

All types are available through the main `fmp-node-api` package:

```bash
npm install fmp-node-api
# or
yarn add fmp-node-api
# or
pnpm add fmp-node-api
```

## Usage (for end users)

```typescript
import type { Quote, CompanyProfile, FinancialStatement } from 'fmp-node-api';

// Use types in your code
const quote: Quote = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 150.0,
  // ... other properties
};
```

## Available Types

### Common Types

- `APIResponse<T>` - Base API response wrapper
- `FMPConfig` - Configuration interface
- `SymbolParams` - Symbol-based parameters
- `DateRangeParams` - Date range parameters
- `PaginationParams` - Pagination parameters
- `PeriodParams` - Period parameters (annual/quarter)

### Quote Types

- `Quote` - Unified quote data structure
- `HistoricalPriceData` - Historical price data
- `HistoricalPriceResponse` - Historical price response

### Financial Types

- `IncomeStatement` - Income statement data
- `BalanceSheet` - Balance sheet data
- `CashFlowStatement` - Cash flow statement data
- `FinancialRatio` - Financial ratios
- `Earnings` - Earnings data

### Company Types

- `CompanyProfile` - Company information
- `Executive` - Executive data
- `Employee` - Employee information

### Market Types

- `MarketIndex` - Market index data
- `SectorPerformance` - Sector performance data

### And many more...

## Development

This package is part of the FMP Node Wrapper monorepo. To contribute:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build the package: `pnpm build`
4. Run tests: `pnpm test`

## License

MIT

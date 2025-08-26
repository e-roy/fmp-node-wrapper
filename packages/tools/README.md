# FMP AI Tools

AI tools for Financial Modeling Prep (FMP) Node API - compatible with Vercel AI SDK, OpenAI Agents, and more.

This package provides pre-built AI tools that can be used with various AI frameworks. For direct API access, use the `fmp-node-api` package.

## Installation

```bash
npm install fmp-ai-tools
# or
pnpm add fmp-ai-tools
# or
yarn add fmp-ai-tools
```

## Version Compatibility

### OpenAI Agents Compatibility

**⚠️ Important**: This package requires `@openai/agents` version `^0.0.17` or higher due to breaking changes in the API.

If you're using an older version, you'll encounter errors like:

```
Zod field uses .optional() without .nullable() which is not supported by the API
```

## Quick Start

### Vercel AI SDK (Recommended)

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { fmpTools } from 'fmp-ai-tools/vercel-ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
    tools: fmpTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
```

### OpenAI Agents

```typescript
import { Agent } from '@openai/agents';
import { fmpTools } from 'fmp-ai-tools/openai';

const agent = new Agent({
  name: 'Financial Analyst',
  instructions: 'You are a financial analyst with access to real-time market data.',
  tools: fmpTools,
});

const result = await agent.run({
  messages: [
    {
      role: 'user',
      content:
        'Get the current stock quote for Apple (AAPL) and show me their latest balance sheet',
    },
  ],
});
```

## Configuration

**Important**: You must set your FMP API key as an environment variable for the tools to work:

```bash
FMP_API_KEY=your_api_key_here
```

The tools internally use the `fmp-node-api` library, which reads this environment variable to authenticate with the Financial Modeling Prep API.

## Available Tools

### Quote Tools

- `getStockQuote` - Get real-time stock quote for a company

### Company Tools

- `getCompanyProfile` - Get comprehensive company profile and information

### Financial Tools

- `getBalanceSheet` - Get balance sheet statements (annual/quarterly)
- `getIncomeStatement` - Get income statements (annual/quarterly)
- `getCashFlowStatement` - Get cash flow statements (annual/quarterly)
- `getFinancialRatios` - Get financial ratios and metrics (annual/quarterly)

### Stock Tools

- `getMarketCap` - Get market capitalization for a company
- `getStockSplits` - Get historical stock splits for a company
- `getDividendHistory` - Get dividend history and payments for a company

### Market Tools

- `getMarketPerformance` - Get overall market performance data
- `getSectorPerformance` - Get sector performance data
- `getGainers` - Get top gaining stocks
- `getLosers` - Get top losing stocks
- `getMostActive` - Get most actively traded stocks

### Economic Tools

- `getTreasuryRates` - Get treasury rates and yields
- `getEconomicIndicators` - Get economic indicators (GDP, CPI, unemployment, etc.)

### ETF Tools

- `getETFHoldings` - Get holdings for a specific ETF
- `getETFProfile` - Get ETF profile and information

### Calendar Tools

- `getEarningsCalendar` - Get upcoming earnings calendar
- `getEconomicCalendar` - Get economic calendar events

### Senate & House Trading Tools

- `getSenateTrading` - Get recent Senate trading activity
- `getHouseTrading` - Get recent House trading activity
- `getSenateTradingByName` - Get Senate trading by politician name
- `getHouseTradingByName` - Get House trading by politician name
- `getSenateTradingRSSFeed` - Get Senate trading RSS feed
- `getHouseTradingRSSFeed` - Get House trading RSS feed

### Institutional Tools

- `getInstitutionalHolders` - Get institutional holders for a company

### Insider Trading Tools

- `getInsiderTrading` - Get insider trading data for a company

## Using Individual Tools

You can import and use specific tool categories or individual tools from either provider:

### Import Specific Categories (Vercel AI)

```typescript
import { quoteTools, financialTools, marketTools } from 'fmp-ai-tools/vercel-ai';

// Use only quote and financial tools
const selectedTools = {
  ...quoteTools,
  ...financialTools,
};

// Use with Vercel AI SDK
const result = streamText({
  model: openai('gpt-4o-mini'),
  messages: convertToModelMessages(messages),
  tools: selectedTools,
});
```

### Import Specific Categories (OpenAI)

```typescript
import { quoteTools, financialTools, marketTools } from 'fmp-ai-tools/openai';

// Use only quote and financial tools
const selectedTools = [...quoteTools, ...financialTools];

// Use with OpenAI Agents
const agent = new Agent({
  name: 'Financial Analyst',
  instructions: 'You are a financial analyst with access to real-time market data.',
  tools: selectedTools,
});
```

### Import Individual Tools

```typescript
// Vercel AI SDK
import { getStockQuote, getCompanyProfile } from 'fmp-ai-tools/vercel-ai';

// OpenAI Agents
import { getStockQuote, getCompanyProfile } from 'fmp-ai-tools/openai';
```

## Example Tool Usage

Here are some example prompts you can use with the tools:

**Stock Analysis:**

```
"Get the current stock quote for Apple (AAPL) and show me their latest balance sheet"
```

**Market Research:**

```
"What are the top gaining stocks today and show me the overall market performance?"
```

**Economic Analysis:**

```
"Get the current treasury rates and show me the latest GDP data"
```

**ETF Research:**

```
"Show me the holdings of SPY ETF and get its profile information"
```

**Financial Analysis:**

```
"Get Apple's income statement, cash flow statement, and financial ratios for the last year"
```

## Tool Parameters

Each tool accepts specific parameters. Here are some common ones:

- `symbol` - Stock/ETF symbol (e.g., "AAPL", "SPY")
- `period` - For financial statements: "annual" or "quarter"
- `from` - Start date in YYYY-MM-DD format
- `to` - End date in YYYY-MM-DD format
- `name` - For economic indicators: specific indicator name

## Error Handling

The tools handle API errors gracefully and will return informative error messages if:

- The API key is invalid or missing
- The requested data is not available
- Rate limits are exceeded
- Invalid parameters are provided

## Testing Tools

Test individual tools:

```bash
# Test specific tools
pnpm test:tool getStockQuote
pnpm test:tool getCompanyProfile
pnpm test:tool getBalanceSheet
pnpm test:tool getMarketPerformance
```

## For Direct API Access

If you need direct access to the FMP API without AI tools, use the `fmp-node-api` package:

```typescript
import { FMP } from 'fmp-node-api';

const fmp = new FMP({ apiKey: 'your_api_key_here' });

// Direct API calls
const quote = await fmp.quote.getQuote('AAPL');
const profile = await fmp.company.getCompanyProfile('AAPL');
```

## License

MIT

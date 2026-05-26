# FMP AI Tools

AI tools for Financial Modeling Prep (FMP) Node API - compatible with Vercel AI SDK, OpenAI Agents, and more.

This package provides pre-built AI tools that can be used with various AI frameworks. For direct API access, use the `fmp-node-api` package.

## Installation

```bash
pnpm add fmp-ai-tools     # or: npm install fmp-ai-tools / yarn add fmp-ai-tools
```

`fmp-ai-tools` has two entry points. `ai` and `@openai/agents` are **optional peer dependencies**, so install only the SDK for the entry point you use, plus `zod`.

### Vercel AI SDK — `fmp-ai-tools/vercel-ai`

```bash
pnpm add ai zod
```

- `ai`: `>=6.0.0`
- `zod`: `^4.0.0`

### OpenAI Agents — `fmp-ai-tools/openai`

```bash
pnpm add @openai/agents zod
```

- `@openai/agents`: `>=0.11.0`
- `zod`: `^4.0.0`

Both entry points are imported with a normal static `import` — no `serverExternalPackages`, `createRequire`, or other bundler workarounds are needed (Next.js App Router and Turbopack included).

## Quick Start

### Vercel AI SDK (Recommended)

`convertToModelMessages` is **async in `ai` v6** — be sure to `await` it.

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { fmpTools } from 'fmp-ai-tools/vercel-ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: await convertToModelMessages(messages),
    tools: fmpTools,
    stopWhen: stepCountIs(5),
    // FMP tools have optional params; relax strict JSON schema so the model
    // can omit them (@ai-sdk/openai v3 defaults strictJsonSchema: true).
    providerOptions: { openai: { strictJsonSchema: false } },
  });

  return result.toUIMessageStreamResponse();
}
```

### OpenAI Agents

```typescript
// app/api/chat/route.ts
import { Agent, run } from '@openai/agents';
import { fmpTools } from 'fmp-ai-tools/openai';

const agent = new Agent({
  name: 'Financial Analyst',
  model: 'gpt-4o-mini',
  instructions: 'You are a financial analyst with access to real-time market data.',
  tools: fmpTools,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const result = await run(agent, message);

  return Response.json({ output: result.finalOutput });
}
```

## Configuration

**Important**: You must set your FMP API key as an environment variable for the tools to work:

```bash
FMP_API_KEY=your_api_key_here
```

Get your API key from [Financial Modeling Prep](https://site.financialmodelingprep.com/pricing-plans?couponCode=eroy) and get your API key. This link will get you 10% off.

The tools internally use the `fmp-node-api` library, which reads this environment variable to authenticate with the Financial Modeling Prep API.

### Debugging and Logging

**⚠️ Development Only**: These logging features are intended for debugging and development, not production use.

Two logging modes controlled by environment variables:

#### Full Logging Mode

```bash
FMP_TOOLS_LOG_API_RESULTS=true
```

Logs: tool name, input parameters, result summary with token count, execution time.

#### Data-Only Logging Mode

```bash
FMP_TOOLS_LOG_DATA_ONLY=true
```

Logs: result summary and formatted JSON response data.

#### Example Output

**Full Logging:**

```
🔧 getStockQuote: object (~28 tokens)
⏱️ Execution Time: 245ms
```

**Data-Only Logging:**

```
📤 Result: { "symbol": "AAPL", "price": 150.25, ... }
```

**Note**: Both modes are disabled by default. Use only during development.

## Available Tools

### Quote Tools

- `getStockQuote` - Get real-time stock quote for a company

### Company Tools

- `getCompanyProfile` - Get comprehensive company profile and information
- `getCompanySharesFloat` - Get shares float and outstanding share data
- `getCompanyExecutiveCompensation` - Get executive compensation data

### Financial Tools

- `getBalanceSheet` - Get balance sheet statements (annual/quarterly)
- `getIncomeStatement` - Get income statements (annual/quarterly)
- `getCashFlowStatement` - Get cash flow statements (annual/quarterly)
- `getKeyMetrics` - Get key financial metrics (annual/quarterly)
- `getFinancialRatios` - Get financial ratios and metrics (annual/quarterly)
- `getEnterpriseValue` - Get enterprise value data
- `getIncomeGrowth` - Get income statement growth metrics
- `getBalanceSheetGrowth` - Get balance sheet growth metrics
- `getCashflowGrowth` - Get cash flow growth metrics
- `getFinancialGrowth` - Get overall financial growth metrics
- `getEarningsHistorical` - Get historical earnings data

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
  messages: await convertToModelMessages(messages),
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

When a request fails, a tool returns a structured JSON error (instead of `null`) so the model can explain *why* to the user:

```json
{ "error": true, "type": "plan-restricted", "message": "This endpoint is not available on your current FMP plan. (403: ...)", "status": 403 }
```

The `type` field classifies the failure so your agent can react appropriately:

| `type`            | Meaning                                                      |
| ----------------- | ------------------------------------------------------------ |
| `plan-restricted` | Endpoint isn't included in your FMP subscription (402/403)   |
| `rate-limit`      | FMP quota / rate limit reached (429)                         |
| `auth`            | Invalid or missing `FMP_API_KEY` (401)                       |
| `not-found`       | Resource does not exist (404)                                |
| `bad-request`     | Invalid parameters (400)                                     |
| `network`         | No response from FMP (timeout / offline)                     |
| `unknown`         | Anything else                                                |

This is especially useful on lower FMP tiers: an agent calling an endpoint your plan doesn't cover now gets a clear `plan-restricted` message it can relay, rather than empty data. (Direct `fmp-node-api` callers get the same classification via `response.errorType`.)

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

## Architecture

Each tool is defined **once**, provider-agnostically, then adapted to each AI SDK:

```
src/definitions/<category>.ts   one FMPToolDefinition per tool: { name, description, inputSchema (Zod), execute }
src/utils/aisdk-tool-wrapper.ts   createTool()      → Vercel AI SDK tool
src/utils/openai-tool-wrapper.ts  createOpenAITool() → OpenAI Agents tool
src/providers/<provider>/index.ts builds that provider's public shape from the shared definitions
```

A definition's `execute` calls the `fmp-node-api` method and returns `toToolResponse(...)`, which formats the result (or a structured error) for the model. The adapters add logging and error catching; the OpenAI adapter also validates input against the Zod schema.

### Adding a tool

1. Add a `defineTool({ name, description, inputSchema, execute })` to the relevant `src/definitions/<category>.ts` (or create a new category file and register it in `src/definitions/index.ts`).
2. Add a one-line individual export to each provider's `index.ts` (`src/providers/vercel-ai/index.ts` and `src/providers/openai/index.ts`). It flows into the category group and `fmpTools` automatically.
3. Add a test and run `pnpm --filter fmp-ai-tools test`.

Adding a brand-new provider is a single adapter (`src/utils/<provider>-tool-wrapper.ts`) plus a `src/providers/<provider>/index.ts`.

## License

MIT

# fmp-node-types

## 0.2.0-beta.4

### Patch Changes

- Correct the analyst/valuation schemas to match the live FMP `stable` API (verified):
  - **AnalystEstimate**: fields drop the `estimated` prefix and use the real names (`revenueLow/High/Avg`, `ebitda*`, `ebit*`, `netIncome*`, `sgaExpense*`, `epsAvg/High/Low`, `numAnalystsRevenue`, `numAnalystsEps`).
  - **PriceTargetSummary**: count fields are `lastMonthCount`/`lastQuarterCount`/`lastYearCount`/`allTimeCount`.
  - **DCFValuation**: the price field is keyed `"Stock Price"` (with a space).
  - **CompanyRating**: gains an optional `date` (present on historical rows).
  - `analyst.getEstimates` now defaults `period` to `annual` (the `stable` endpoint returns 400 without it).

## 0.2.0-beta.3

### Minor Changes

- Add three new endpoint categories:
  - **`fmp.analyst`** — `getEstimates`, `getPriceTargetConsensus`, `getPriceTargetSummary`, `getGrades`.
  - **`fmp.valuation`** — `getDiscountedCashFlow`, `getRatingSnapshot`, `getHistoricalRating`.
  - **`fmp.technical`** — `getTechnicalIndicator` (SMA/EMA/RSI/etc. via a `type` param).

  Adds the matching `SearchResult`-style types and live-API shape-check manifest cases.

## 0.2.0-beta.2

### Minor Changes

- Add a `/search` endpoint: `fmp.search.search({ query, limit?, exchange? })` resolves a company name or partial ticker to matching symbols, returning the new `SearchResult` type. Wired into the live-API shape-check manifest.

## 0.2.0-beta.1

### Minor Changes

- Typed error classification for FMP failures, surfaced through the AI tools.
  - **fmp-node-types**: `APIResponse` gains an optional `errorType` (`plan-restricted | rate-limit | auth | not-found | bad-request | network | unknown`).
  - **fmp-node-api**: the client now reads FMP's real error message from the response body and classifies failures (new `classifyError` export). Plan/subscription-restricted endpoints (402/403 or "Exclusive/Special Endpoint") are reported as `plan-restricted` instead of a generic error.
  - **fmp-ai-tools**: every tool now returns a structured error (`{ error, type, message, status }`) to the model on failure instead of `null`, so an agent can explain _why_ a call failed — e.g. that the data requires a higher FMP plan.

## 0.2.0-beta.0

### Minor Changes

- Schema-first types and updated AI SDKs.
  - **fmp-node-types**: now ships Zod schemas as the source of truth, with TypeScript types derived via `z.infer`.
  - **fmp-node-api**: consumes the schema-first types; response types corrected against the live FMP API (e.g. `getIntraday` → `IntradayPrice[]`, `getMarketPerformance`/`getMarketIndex` → quote-shaped `MarketIndex[]`, plus nullability fixes). Adds an internal live-API shape-check tool.
  - **fmp-ai-tools**: updated to Vercel AI SDK v6 (`ai@6`, `@ai-sdk/*@3`), `@openai/agents@0.11.5`, and Zod 4. The OpenAI tool wrapper now passes the Zod schema natively to `tool()`.

## 0.1.4

### Patch Changes

- Added news endpoints - fmp-node-api, added shares float and executive compensation to fmp-ai-tools

## 0.1.3

### Patch Changes

- working tools without helper functions, expand financial tools, added screener in api wrapper

## 0.1.2

### Patch Changes

- publish seperate library for types

## 0.1.1

### Patch Changes

- update some of the endpoints to stable api, update tools to use v0.0.17 openai agents, added logger for tools

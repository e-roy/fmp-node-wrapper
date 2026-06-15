# fmp-node-types

## 0.2.3

### Patch Changes

- 06e9575: Add Starter-accessible live market-data endpoints and migrate two market methods to the `stable` surface.

  New endpoints (and matching AI tools for both the Vercel AI SDK and OpenAI Agents):
  - `fmp.quote.getQuoteShort(symbol)` — lean price/change/volume quote (`getStockQuoteShort` tool)
  - `fmp.aftermarket.getTrade(symbol)` / `fmp.aftermarket.getQuote(symbol)` — new `aftermarket` endpoint class for extended-hours trade and bid/ask (`getAftermarketTrade` / `getAftermarketQuote` tools)
  - `fmp.stock.getPriceChange(symbol)` — price change across 1D…10Y/max horizons (`getStockPriceChange` tool)
  - `fmp.market.getIndustryPESnapshot({ date })` — per-industry P/E snapshot (`getIndustryPESnapshot` tool)

  **Breaking changes** (two methods migrated from `v3` to `stable`):
  - `fmp.market.getMarketHours()` now returns an **array** of per-exchange market hours (`ExchangeMarketHours[]`, with `isMarketOpen`) instead of a single `MarketHours` object. The `MarketHours` and `MarketHoliday` types are removed.
  - `fmp.market.getSectorPerformance(params)` now **requires** `{ date }` (YYYY-MM-DD, plus optional `exchange`/`sector`) and returns `MarketSectorPerformance[]` with `{ date, sector, exchange, averageChange: number }` instead of `{ sector, changesPercentage: string }`. The `getSectorPerformance` AI tool now takes a `date` input.

  Note: on the FMP Starter plan the sector/industry snapshot endpoints are available for recent dates only; older `date` values require a higher tier.

## 0.2.0

### Minor Changes

- 7030a68: Add three new endpoint categories:
  - **`fmp.analyst`** — `getEstimates`, `getPriceTargetConsensus`, `getPriceTargetSummary`, `getGrades`.
  - **`fmp.valuation`** — `getDiscountedCashFlow`, `getRatingSnapshot`, `getHistoricalRating`.
  - **`fmp.technical`** — `getTechnicalIndicator` (SMA/EMA/RSI/etc. via a `type` param).

  Adds the matching `SearchResult`-style types and live-API shape-check manifest cases.

- 005a6e9: Typed error classification for FMP failures, surfaced through the AI tools.
  - **fmp-node-types**: `APIResponse` gains an optional `errorType` (`plan-restricted | rate-limit | auth | not-found | bad-request | network | unknown`).
  - **fmp-node-api**: the client now reads FMP's real error message from the response body and classifies failures (new `classifyError` export). Plan/subscription-restricted endpoints (402/403 or "Exclusive/Special Endpoint") are reported as `plan-restricted` instead of a generic error.
  - **fmp-ai-tools**: every tool now returns a structured error (`{ error, type, message, status }`) to the model on failure instead of `null`, so an agent can explain _why_ a call failed — e.g. that the data requires a higher FMP plan.

- 0260327: Add a `/search` endpoint: `fmp.search.search({ query, limit?, exchange? })` resolves a company name or partial ticker to matching symbols, returning the new `SearchResult` type. Wired into the live-API shape-check manifest.
- bad0c16: Add 7 Starter-plan-verified endpoints (each with a matching AI tool; tool count 49 → 56):
  - **`fmp.financial`** — `getFinancialScores` (Altman Z-Score + Piotroski), `getKeyMetricsTTM`, `getFinancialRatiosTTM`, `getRevenueProductSegmentation`, `getRevenueGeographicSegmentation`.
  - **`fmp.analyst`** — `getGradesConsensus` (buy/hold/sell counts + overall consensus).
  - **`fmp.company`** — `getStockPeers` (peer companies with price + market cap).

  Adds canonical Zod schemas/types, live-API shape-check manifest cases (all PASS, 0 drift against the live `stable` API), docs for the new financial/company endpoints, and a new analyst documentation page.

- e7042b4: Schema-first types and updated AI SDKs.
  - **fmp-node-types**: now ships Zod schemas as the source of truth, with TypeScript types derived via `z.infer`.
  - **fmp-node-api**: consumes the schema-first types; response types corrected against the live FMP API (e.g. `getIntraday` → `IntradayPrice[]`, `getMarketPerformance`/`getMarketIndex` → quote-shaped `MarketIndex[]`, plus nullability fixes). Adds an internal live-API shape-check tool.
  - **fmp-ai-tools**: updated to Vercel AI SDK v6 (`ai@6`, `@ai-sdk/*@3`), `@openai/agents@0.11.5`, and Zod 4. The OpenAI tool wrapper now passes the Zod schema natively to `tool()`.

### Patch Changes

- 7030a68: Correct the analyst/valuation schemas to match the live FMP `stable` API (verified):
  - **AnalystEstimate**: fields drop the `estimated` prefix and use the real names (`revenueLow/High/Avg`, `ebitda*`, `ebit*`, `netIncome*`, `sgaExpense*`, `epsAvg/High/Low`, `numAnalystsRevenue`, `numAnalystsEps`).
  - **PriceTargetSummary**: count fields are `lastMonthCount`/`lastQuarterCount`/`lastYearCount`/`allTimeCount`.
  - **DCFValuation**: the price field is keyed `"Stock Price"` (with a space).
  - **CompanyRating**: gains an optional `date` (present on historical rows).
  - `analyst.getEstimates` now defaults `period` to `annual` (the `stable` endpoint returns 400 without it).

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

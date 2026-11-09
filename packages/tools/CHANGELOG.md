# fmp-ai-tools

## 0.2.4-beta.3

### Patch Changes

- AI-tool output bounds, calendar date ranges, and defaults:
  - **AI tools — hard maximums**: every `limit` now has a maximum (listed in its description, e.g. "default 50, max 100"); larger requests are capped instead of returning hundreds of kilobytes.
  - **AI tools — no silent truncation anywhere**: `getHistoricalPrice`, `getIntraday`, `getStockGrades` and `getTechnicalIndicator` now flag cut results too, and the truncation envelope carries numeric `total` and `returned` alongside the `note`.
  - **AI tools — calendar ranges**: FMP serves at most 90 days per earnings/economic calendar request and silently keeps only the last 90 of a longer range. The tools now cut long ranges to the first 90 days and say where to continue.
  - **AI tools — `getInstitutionalHolders`**: considers only the last two reporting quarters, so a filer that has since been replaced by successor entities isn't counted next to them.
  - **AI tools — defaults**: `null` now means "use the default" for every defaulted parameter (e.g. `period`, `interval`, `timeframe`), on both providers.
  - **Docs**: `getEarningsCalendar` / `getEconomicsCalendar` document FMP's 90-day window, and `getEarningsConfirmed` documents that FMP returns upcoming confirmations only, at most 100 rows per request.

- Updated dependencies
  - fmp-node-api@0.2.4-beta.3

## 0.2.4-beta.2

### Patch Changes

- Schema and AI-tool fixes:
  - **ExchangeMarketHours**: add optional `openingAdditional` / `closingAdditional` (the afternoon session for exchanges with a midday break, e.g. HKSE).
  - **EarningsConfirmed**: `time` and `when` are now `string | null` — FMP leaves them null until a time is confirmed.
  - **EconomicsCalendar**: `changePercentage` is now `number | null`.
  - **AI tools — no silent truncation**: capped tools now return `{ data, truncated: true, note }` (e.g. "Showing 50 of 1969 rows…") when rows are cut, instead of a bare partial list.
  - **AI tools — `getEarningsCalendar`**: new `symbols` filter, so "upcoming earnings for AAPL/MSFT/NVDA" works even though a single week holds ~2,000 companies worldwide.
  - **AI tools — `getInstitutionalHolders`**: keeps each holder's latest filing from the past year and merges name variants, so stale filings (e.g. a 2024 "BlackRock Inc." next to 2026 "BlackRock, Inc.") no longer rank as current holders.
  - **AI tools — `getETFHoldings`**: defaults to the latest holdings date (FMP returns nothing without one).
  - **AI tools — defaults**: a `null` `limit` now falls back to the default instead of returning an empty list, and `getEarningsHistorical` defaults to 10 rows on every provider (was 5 when called without input parsing).

- Updated dependencies
  - fmp-node-api@0.2.4-beta.2

## 0.2.4-beta.1

### Patch Changes

- Packaging, schema and AI-tool fixes:
  - **Types no longer degrade to `any`**: `fmp-node-types` is now a real dependency of `fmp-node-api`, so the published types resolve against its own `zod@3`. Apps on zod 4 (every `fmp-ai-tools` user) or without zod previously got silently-`any` fields (e.g. `Quote['price']` accepted a string).
  - **Schemas are type-only re-exports**: `fmp-node-api` and `fmp-node-api/types` re-export the types with `export type *`. The Zod schemas (e.g. `QuoteSchema`) were declared as values but never shipped at runtime — using one is now a compile error instead of `undefined` at runtime. Import schemas from `fmp-node-types` directly if you need them.
  - **IPOCalendar**: add `dealSize` (`number | null`; null until the offering is priced).
  - **Exports**: `./package.json` is now exported from all three packages.
  - **AI tools — bounded outputs**: tools that wrap large list endpoints take an optional `limit` so one call can't overflow the model's context (e.g. the earnings calendar returned ~1.5 MB for one week): `getEarningsCalendar`, `getEconomicCalendar` (default 50), `getInstitutionalHolders` (default 20, largest holders first), `getETFHoldings` (default 50, largest weight first), `getMarketPerformance` (default 50), `getCompanyExecutiveCompensation` (default 20), `getSenateTradingByName` / `getHouseTradingByName` (default 50).
  - **AI tools — ratio descriptions**: `getFinancialRatios` / `getFinancialRatiosTTM` now name the valuation multiples they return (P/E incl. diluted P/E, PEG, P/B, P/S, P/FCF, EV multiple) so models use them instead of deriving P/E.

- Updated dependencies
  - fmp-node-api@0.2.4-beta.1

## 0.2.4-beta.0

### Patch Changes

- c628484: Sync schemas with the live FMP API (drift found by the full live check):
  - **FinancialRatios** / **FinancialRatiosTTM**: add `priceToEarningsDilutedRatio` and `priceToEarningsDilutedGrowthRatio` (and their `…TTM` forms).
  - **SenateTradingResponse**, **HouseTradingResponse**, **SenateHouseTradingByNameResponse**: add `senateID` (the member's congressional Bioguide ID; present on House rows too).
  - **Screener**: add `avgVolume`.
  - **AftermarketTrade**: `tradeSize` is now `number | null` — FMP returns `null` when no extended-hours trade size is reported (e.g. after the post-market session closes).
  - **News**: `symbol` is now `string | null` (market-wide stories have no single ticker) and `image` is now `string | null` (articles without an image).

  Docs: FMP API-key links are now plain links (no referral code or discount wording).

- Updated dependencies [c628484]
  - fmp-node-api@0.2.4-beta.0

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

- Updated dependencies [06e9575]
  - fmp-node-api@0.2.3

## 0.2.1

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.2.1

## 0.2.0

### Minor Changes

- 7030a68: Add AI tools for the new analyst, valuation, and technical endpoints: `getAnalystEstimates`, `getPriceTargetConsensus`, `getStockGrades`, `getDiscountedCashFlow`, `getCompanyRating`, and `getTechnicalIndicator`. List-returning tools apply a default result `limit`.
- 005a6e9: Typed error classification for FMP failures, surfaced through the AI tools.
  - **fmp-node-types**: `APIResponse` gains an optional `errorType` (`plan-restricted | rate-limit | auth | not-found | bad-request | network | unknown`).
  - **fmp-node-api**: the client now reads FMP's real error message from the response body and classifies failures (new `classifyError` export). Plan/subscription-restricted endpoints (402/403 or "Exclusive/Special Endpoint") are reported as `plan-restricted` instead of a generic error.
  - **fmp-ai-tools**: every tool now returns a structured error (`{ error, type, message, status }`) to the model on failure instead of `null`, so an agent can explain _why_ a call failed — e.g. that the data requires a higher FMP plan.

- bad0c16: Add 7 Starter-plan-verified endpoints (each with a matching AI tool; tool count 49 → 56):
  - **`fmp.financial`** — `getFinancialScores` (Altman Z-Score + Piotroski), `getKeyMetricsTTM`, `getFinancialRatiosTTM`, `getRevenueProductSegmentation`, `getRevenueGeographicSegmentation`.
  - **`fmp.analyst`** — `getGradesConsensus` (buy/hold/sell counts + overall consensus).
  - **`fmp.company`** — `getStockPeers` (peer companies with price + market cap).

  Adds canonical Zod schemas/types, live-API shape-check manifest cases (all PASS, 0 drift against the live `stable` API), docs for the new financial/company endpoints, and a new analyst documentation page.

- 0260327: Add client configuration and new tools.
  - **Client**: the FMP client is now memoized (no longer reconstructed on every tool call), and a new `configureFMPClient({ apiKey, timeout })` (exported from both entry points) lets consumers configure it instead of relying solely on the `FMP_API_KEY` environment variable.
  - **New tools**: `getHistoricalPrice` and `getIntraday` (price history), `getStockNews` and `getStockNewsBySymbol` (news), `screenStocks` (screener), and `searchSymbol` (symbol search). High-volume tools apply a default result `limit` to keep outputs context-friendly.

- e7042b4: Schema-first types and updated AI SDKs.
  - **fmp-node-types**: now ships Zod schemas as the source of truth, with TypeScript types derived via `z.infer`.
  - **fmp-node-api**: consumes the schema-first types; response types corrected against the live FMP API (e.g. `getIntraday` → `IntradayPrice[]`, `getMarketPerformance`/`getMarketIndex` → quote-shaped `MarketIndex[]`, plus nullability fixes). Adds an internal live-API shape-check tool.
  - **fmp-ai-tools**: updated to Vercel AI SDK v6 (`ai@6`, `@ai-sdk/*@3`), `@openai/agents@0.11.5`, and Zod 4. The OpenAI tool wrapper now passes the Zod schema natively to `tool()`.

### Patch Changes

- e7042b4: Loosen the `@openai/agents` (`^0.11.0`) and `ai` (`^6.0.0`) dependency ranges so installs resolve to settled, widely-available versions instead of being pinned to the newest release. This avoids install failures for consumers using pnpm's `minimum-release-age` supply-chain guard, which previously had no mature version to resolve.
- e7042b4: Make the `fmp-ai-tools/openai` entry point bundler-safe so it works in Next.js (App Router / Turbopack) with a normal static import. Removed the filesystem-based `checkOpenAIAgentsVersion()` that ran on import (it used `require.resolve`/`fs` and broke under bundlers), and moved `@openai/agents` and `ai` to **optional** `peerDependencies`. Consumers no longer need `serverExternalPackages`, `createRequire`, or any other workaround.
- 005a6e9: Tools no longer throw out of `execute`. A thrown error — most importantly a missing/invalid `FMP_API_KEY`, which throws from the `FMP` constructor before any request is made — is now caught at the tool boundary and returned to the model as the same structured `{ error, type, message, status }` shape (with `type: "auth"` for key problems). Previously the raw exception reached the AI SDK and the agent received only a vague failure with no reason.
- 1736ba8: Internal refactor: each tool is now defined once in a shared `definitions/` layer, with the Vercel AI and OpenAI wrappers acting as thin per-provider adapters. The public API (tool names, subpath exports `fmp-ai-tools/vercel-ai` and `fmp-ai-tools/openai`, `fmpTools`, category groups, and individual tools) is unchanged. Minor drift between the two providers was canonicalized: numeric params use `z.number()` (OpenAI no longer string-coerces), and descriptions/validation use the richer variant. Adding a new provider is now a single adapter file.
- Updated dependencies [7030a68]
- Updated dependencies [005a6e9]
- Updated dependencies [7030a68]
- Updated dependencies [0260327]
- Updated dependencies [bad0c16]
- Updated dependencies [e7042b4]
  - fmp-node-api@0.2.0

## 0.2.0-beta.8

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.2.0-beta.4

## 0.2.0-beta.7

### Minor Changes

- Add AI tools for the new analyst, valuation, and technical endpoints: `getAnalystEstimates`, `getPriceTargetConsensus`, `getStockGrades`, `getDiscountedCashFlow`, `getCompanyRating`, and `getTechnicalIndicator`. List-returning tools apply a default result `limit`.

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.2.0-beta.3

## 0.2.0-beta.6

### Minor Changes

- Add client configuration and new tools.
  - **Client**: the FMP client is now memoized (no longer reconstructed on every tool call), and a new `configureFMPClient({ apiKey, timeout })` (exported from both entry points) lets consumers configure it instead of relying solely on the `FMP_API_KEY` environment variable.
  - **New tools**: `getHistoricalPrice` and `getIntraday` (price history), `getStockNews` and `getStockNewsBySymbol` (news), `screenStocks` (screener), and `searchSymbol` (symbol search). High-volume tools apply a default result `limit` to keep outputs context-friendly.

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.2.0-beta.2

## 0.2.0-beta.5

### Patch Changes

- Internal refactor: each tool is now defined once in a shared `definitions/` layer, with the Vercel AI and OpenAI wrappers acting as thin per-provider adapters. The public API (tool names, subpath exports `fmp-ai-tools/vercel-ai` and `fmp-ai-tools/openai`, `fmpTools`, category groups, and individual tools) is unchanged. Minor drift between the two providers was canonicalized: numeric params use `z.number()` (OpenAI no longer string-coerces), and descriptions/validation use the richer variant. Adding a new provider is now a single adapter file.

## 0.2.0-beta.4

### Patch Changes

- Tools no longer throw out of `execute`. A thrown error — most importantly a missing/invalid `FMP_API_KEY`, which throws from the `FMP` constructor before any request is made — is now caught at the tool boundary and returned to the model as the same structured `{ error, type, message, status }` shape (with `type: "auth"` for key problems). Previously the raw exception reached the AI SDK and the agent received only a vague failure with no reason.

## 0.2.0-beta.3

### Minor Changes

- Typed error classification for FMP failures, surfaced through the AI tools.
  - **fmp-node-types**: `APIResponse` gains an optional `errorType` (`plan-restricted | rate-limit | auth | not-found | bad-request | network | unknown`).
  - **fmp-node-api**: the client now reads FMP's real error message from the response body and classifies failures (new `classifyError` export). Plan/subscription-restricted endpoints (402/403 or "Exclusive/Special Endpoint") are reported as `plan-restricted` instead of a generic error.
  - **fmp-ai-tools**: every tool now returns a structured error (`{ error, type, message, status }`) to the model on failure instead of `null`, so an agent can explain _why_ a call failed — e.g. that the data requires a higher FMP plan.

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.2.0-beta.1

## 0.2.0-beta.2

### Patch Changes

- Make the `fmp-ai-tools/openai` entry point bundler-safe so it works in Next.js (App Router / Turbopack) with a normal static import. Removed the filesystem-based `checkOpenAIAgentsVersion()` that ran on import (it used `require.resolve`/`fs` and broke under bundlers), and moved `@openai/agents` and `ai` to **optional** `peerDependencies`. Consumers no longer need `serverExternalPackages`, `createRequire`, or any other workaround.

## 0.2.0-beta.1

### Patch Changes

- Loosen the `@openai/agents` (`^0.11.0`) and `ai` (`^6.0.0`) dependency ranges so installs resolve to settled, widely-available versions instead of being pinned to the newest release. This avoids install failures for consumers using pnpm's `minimum-release-age` supply-chain guard, which previously had no mature version to resolve.

## 0.2.0-beta.0

### Minor Changes

- Schema-first types and updated AI SDKs.
  - **fmp-node-types**: now ships Zod schemas as the source of truth, with TypeScript types derived via `z.infer`.
  - **fmp-node-api**: consumes the schema-first types; response types corrected against the live FMP API (e.g. `getIntraday` → `IntradayPrice[]`, `getMarketPerformance`/`getMarketIndex` → quote-shaped `MarketIndex[]`, plus nullability fixes). Adds an internal live-API shape-check tool.
  - **fmp-ai-tools**: updated to Vercel AI SDK v6 (`ai@6`, `@ai-sdk/*@3`), `@openai/agents@0.11.5`, and Zod 4. The OpenAI tool wrapper now passes the Zod schema natively to `tool()`.

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.2.0-beta.0

## 0.0.12

### Patch Changes

- Added news endpoints - fmp-node-api, added shares float and executive compensation to fmp-ai-tools
- Updated dependencies
  - fmp-node-api@0.1.9

## 0.0.11

### Patch Changes

- working tools without helper functions, expand financial tools, added screener in api wrapper
- Updated dependencies
  - fmp-node-api@0.1.8

## 0.0.10

### Patch Changes

- publish seperate library for types
- Updated dependencies
  - fmp-node-api@0.1.7

## 0.0.9

### Patch Changes

- fix publish errors
- Updated dependencies
  - fmp-node-api@0.1.6

## 0.0.8

### Patch Changes

- Updated dependencies
  - fmp-node-api@0.1.5

## 0.0.7

### Patch Changes

- fix dependency error
- Updated dependencies
  - fmp-node-api@0.1.4

## 0.0.6

### Patch Changes

- update some of the endpoints to stable api, update tools to use v0.0.17 openai agents, added logger for tools
- Updated dependencies
  - fmp-node-api@0.1.3

## 0.0.4

### Patch Changes

- 0b10d77: Initial release
- add openai provider for use with the @openai/agents library
- 9d235e3: fixed publish error

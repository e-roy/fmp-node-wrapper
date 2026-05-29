# fmp-ai-tools

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

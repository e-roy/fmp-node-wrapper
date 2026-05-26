# fmp-node-api

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

## 0.1.9

### Patch Changes

- Added news endpoints - fmp-node-api, added shares float and executive compensation to fmp-ai-tools

## 0.1.8

### Patch Changes

- working tools without helper functions, expand financial tools, added screener in api wrapper

## 0.1.7

### Patch Changes

- publish seperate library for types

## 0.1.6

### Patch Changes

- fix publish errors

## 0.1.5

### Patch Changes

- fix dependency error

## 0.1.4

### Patch Changes

- fix dependency error

## 0.1.3

### Patch Changes

- update some of the endpoints to stable api, update tools to use v0.0.17 openai agents, added logger for tools
- Updated dependencies
  - @fmp/types@0.1.1

## 0.1.2

### Patch Changes

- added missing types

## 0.1.1

### Patch Changes

- feat: optimize package size - remove source maps and unused entry points

## 0.1.0

### Minor Changes

- feat: add runtime method discovery helpers and utility system - feat: add environment variable support for API key configuration - refactor: improve JSDoc documentation and parameter patterns across all endpoints

## 0.0.8

### Patch Changes

- add insitituional, insider and sec endpoints

## 0.0.7

### Patch Changes

- add endpoints for real time stock prices, transcript dates, confirmed earnings and search house and senate by name

## 0.0.6

### Patch Changes

- 3ed8858: add endpoints for senate and house trading. fix broken endpoints for forex, economic, mutual fund and bond

## 0.0.5

### Patch Changes

- c209f7d: Add quote endpoints, a unified way to get quotes for all assets instead of seperating out each asset class

## 0.0.4

### Patch Changes

- Removed wrap on all endpoints and only use for endpoints that return a single object. fixed and cleaned up endpoints for etf, crypto, market and financial.

## 0.0.3

### Patch Changes

- Library will now handle which version of fmp endpoints to use. Expand endpoints to include list, calendar and company data. Fixed various type errors.

## 0.0.2

### Patch Changes

- 0618527: Initial release

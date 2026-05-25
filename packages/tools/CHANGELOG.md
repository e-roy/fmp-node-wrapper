# fmp-ai-tools

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

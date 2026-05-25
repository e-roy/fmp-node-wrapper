---
"fmp-node-types": minor
"fmp-node-api": minor
"fmp-ai-tools": minor
---

Schema-first types and updated AI SDKs.

- **fmp-node-types**: now ships Zod schemas as the source of truth, with TypeScript types derived via `z.infer`.
- **fmp-node-api**: consumes the schema-first types; response types corrected against the live FMP API (e.g. `getIntraday` → `IntradayPrice[]`, `getMarketPerformance`/`getMarketIndex` → quote-shaped `MarketIndex[]`, plus nullability fixes). Adds an internal live-API shape-check tool.
- **fmp-ai-tools**: updated to Vercel AI SDK v6 (`ai@6`, `@ai-sdk/*@3`), `@openai/agents@0.11.5`, and Zod 4. The OpenAI tool wrapper now passes the Zod schema natively to `tool()`.

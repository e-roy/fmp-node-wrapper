---
"fmp-node-types": patch
"fmp-node-api": patch
"fmp-ai-tools": patch
---

AI-tool consistency fixes:

- **`getAnalystEstimates`**: `limit` max is now 10 — FMP's Starter plan rejects more as a premium query parameter, which surfaced as a misleading "not available on your plan" error.
- **OpenAI Agents provider — `null` defaults**: the Agents SDK validates input before the tool runs, so `null` for a defaulted parameter was rejected there. The SDK now receives a schema whose defaulted fields also accept `null`, and the tool applies the default — matching the Vercel AI SDK provider.
- **Calendar tools — lone `from`**: FMP ignores a `from` without a `to` (it returns the 90 days ending today). The tools now send an explicit 90-day window starting at `from` and say so.
- **`getHistoricalPrice`**: the truncation envelope now has the same keys as every other tool (`{ data, truncated, total, returned, note }`, with `{ symbol, historical }` in `data`).
- **Over-the-max requests**: tools whose limit is applied by the API (news, screener, search, statements, estimates, earnings history) now include a `note` when the requested `limit` exceeded the maximum, instead of quietly returning fewer rows.
- **Docs**: `getEarningsConfirmed` returns at most 100 rows per request, and which 100 isn't guaranteed — query short ranges for complete coverage.

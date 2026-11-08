---
"fmp-node-types": patch
"fmp-node-api": patch
"fmp-ai-tools": patch
---

Schema and AI-tool fixes:

- **ExchangeMarketHours**: add optional `openingAdditional` / `closingAdditional` (the afternoon session for exchanges with a midday break, e.g. HKSE).
- **EarningsConfirmed**: `time` and `when` are now `string | null` — FMP leaves them null until a time is confirmed.
- **EconomicsCalendar**: `changePercentage` is now `number | null`.
- **AI tools — no silent truncation**: capped tools now return `{ data, truncated: true, note }` (e.g. "Showing 50 of 1969 rows…") when rows are cut, instead of a bare partial list.
- **AI tools — `getEarningsCalendar`**: new `symbols` filter, so "upcoming earnings for AAPL/MSFT/NVDA" works even though a single week holds ~2,000 companies worldwide.
- **AI tools — `getInstitutionalHolders`**: keeps each holder's latest filing from the past year and merges name variants, so stale filings (e.g. a 2024 "BlackRock Inc." next to 2026 "BlackRock, Inc.") no longer rank as current holders.
- **AI tools — `getETFHoldings`**: defaults to the latest holdings date (FMP returns nothing without one).
- **AI tools — defaults**: a `null` `limit` now falls back to the default instead of returning an empty list, and `getEarningsHistorical` defaults to 10 rows on every provider (was 5 when called without input parsing).

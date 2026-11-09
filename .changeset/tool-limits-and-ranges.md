---
"fmp-node-types": patch
"fmp-node-api": patch
"fmp-ai-tools": patch
---

AI-tool output bounds, calendar date ranges, and defaults:

- **AI tools — hard maximums**: every `limit` now has a maximum (listed in its description, e.g. "default 50, max 100"); larger requests are capped instead of returning hundreds of kilobytes.
- **AI tools — no silent truncation anywhere**: `getHistoricalPrice`, `getIntraday`, `getStockGrades` and `getTechnicalIndicator` now flag cut results too, and the truncation envelope carries numeric `total` and `returned` alongside the `note`.
- **AI tools — calendar ranges**: FMP serves at most 90 days per earnings/economic calendar request and silently keeps only the last 90 of a longer range. The tools now cut long ranges to the first 90 days and say where to continue.
- **AI tools — `getInstitutionalHolders`**: considers only the last two reporting quarters, so a filer that has since been replaced by successor entities isn't counted next to them.
- **AI tools — defaults**: `null` now means "use the default" for every defaulted parameter (e.g. `period`, `interval`, `timeframe`), on both providers.
- **Docs**: `getEarningsCalendar` / `getEconomicsCalendar` document FMP's 90-day window, and `getEarningsConfirmed` documents that FMP returns upcoming confirmations only, at most 100 rows per request.

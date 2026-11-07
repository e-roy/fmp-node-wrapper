---
"fmp-node-types": patch
"fmp-node-api": patch
"fmp-ai-tools": patch
---

Fixes found while testing 0.2.4-beta.0 in a downstream app:

- **Types no longer degrade to `any`**: `fmp-node-types` is now a real dependency of `fmp-node-api`, so the published types resolve against its own `zod@3`. Apps on zod 4 (every `fmp-ai-tools` user) or without zod previously got silently-`any` fields (e.g. `Quote['price']` accepted a string).
- **Schemas are type-only re-exports**: `fmp-node-api` and `fmp-node-api/types` re-export the types with `export type *`. The Zod schemas (e.g. `QuoteSchema`) were declared as values but never shipped at runtime — using one is now a compile error instead of `undefined` at runtime. Import schemas from `fmp-node-types` directly if you need them.
- **IPOCalendar**: add `dealSize` (`number | null`; null until the offering is priced).
- **Exports**: `./package.json` is now exported from all three packages.
- **AI tools — bounded outputs**: tools that wrap large list endpoints take an optional `limit` so one call can't overflow the model's context (e.g. the earnings calendar returned ~1.5 MB for one week): `getEarningsCalendar`, `getEconomicCalendar` (default 50), `getInstitutionalHolders` (default 20, largest holders first), `getETFHoldings` (default 50, largest weight first), `getMarketPerformance` (default 50), `getCompanyExecutiveCompensation` (default 20), `getSenateTradingByName` / `getHouseTradingByName` (default 50).
- **AI tools — ratio descriptions**: `getFinancialRatios` / `getFinancialRatiosTTM` now name the valuation multiples they return (P/E incl. diluted P/E, PEG, P/B, P/S, P/FCF, EV multiple) so models use them instead of deriving P/E.

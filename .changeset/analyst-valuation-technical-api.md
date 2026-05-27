---
"fmp-node-types": minor
"fmp-node-api": minor
---

Add three new endpoint categories:

- **`fmp.analyst`** — `getEstimates`, `getPriceTargetConsensus`, `getPriceTargetSummary`, `getGrades`.
- **`fmp.valuation`** — `getDiscountedCashFlow`, `getRatingSnapshot`, `getHistoricalRating`.
- **`fmp.technical`** — `getTechnicalIndicator` (SMA/EMA/RSI/etc. via a `type` param).

Adds the matching `SearchResult`-style types and live-API shape-check manifest cases.

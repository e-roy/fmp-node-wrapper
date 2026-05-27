---
"fmp-node-types": patch
"fmp-node-api": patch
---

Correct the analyst/valuation schemas to match the live FMP `stable` API (verified):

- **AnalystEstimate**: fields drop the `estimated` prefix and use the real names (`revenueLow/High/Avg`, `ebitda*`, `ebit*`, `netIncome*`, `sgaExpense*`, `epsAvg/High/Low`, `numAnalystsRevenue`, `numAnalystsEps`).
- **PriceTargetSummary**: count fields are `lastMonthCount`/`lastQuarterCount`/`lastYearCount`/`allTimeCount`.
- **DCFValuation**: the price field is keyed `"Stock Price"` (with a space).
- **CompanyRating**: gains an optional `date` (present on historical rows).
- `analyst.getEstimates` now defaults `period` to `annual` (the `stable` endpoint returns 400 without it).

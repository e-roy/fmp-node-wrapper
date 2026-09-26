---
"fmp-node-types": patch
"fmp-node-api": patch
"fmp-ai-tools": patch
---

Sync schemas with the live FMP API (drift found by the full live check):

- **FinancialRatios** / **FinancialRatiosTTM**: add `priceToEarningsDilutedRatio` and `priceToEarningsDilutedGrowthRatio` (and their `…TTM` forms).
- **SenateTradingResponse**, **HouseTradingResponse**, **SenateHouseTradingByNameResponse**: add `senateID` (the member's congressional Bioguide ID; present on House rows too).
- **Screener**: add `avgVolume`.
- **AftermarketTrade**: `tradeSize` is now `number | null` — FMP returns `null` when no extended-hours trade size is reported (e.g. after the post-market session closes).
- **News**: `symbol` is now `string | null` (market-wide stories have no single ticker) and `image` is now `string | null` (articles without an image).

Docs: FMP API-key links are now plain links (no referral code or discount wording).

---
'fmp-node-types': patch
'fmp-node-api': patch
'fmp-ai-tools': patch
---

Add Starter-accessible live market-data endpoints and migrate two market methods to the `stable` surface.

New endpoints (and matching AI tools for both the Vercel AI SDK and OpenAI Agents):

- `fmp.quote.getQuoteShort(symbol)` — lean price/change/volume quote (`getStockQuoteShort` tool)
- `fmp.aftermarket.getTrade(symbol)` / `fmp.aftermarket.getQuote(symbol)` — new `aftermarket` endpoint class for extended-hours trade and bid/ask (`getAftermarketTrade` / `getAftermarketQuote` tools)
- `fmp.stock.getPriceChange(symbol)` — price change across 1D…10Y/max horizons (`getStockPriceChange` tool)
- `fmp.market.getIndustryPESnapshot({ date })` — per-industry P/E snapshot (`getIndustryPESnapshot` tool)

**Breaking changes** (two methods migrated from `v3` to `stable`):

- `fmp.market.getMarketHours()` now returns an **array** of per-exchange market hours (`ExchangeMarketHours[]`, with `isMarketOpen`) instead of a single `MarketHours` object. The `MarketHours` and `MarketHoliday` types are removed.
- `fmp.market.getSectorPerformance(params)` now **requires** `{ date }` (YYYY-MM-DD, plus optional `exchange`/`sector`) and returns `MarketSectorPerformance[]` with `{ date, sector, exchange, averageChange: number }` instead of `{ sector, changesPercentage: string }`. The `getSectorPerformance` AI tool now takes a `date` input.

Note: on the FMP Starter plan the sector/industry snapshot endpoints are available for recent dates only; older `date` values require a higher tier.

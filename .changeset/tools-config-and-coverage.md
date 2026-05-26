---
"fmp-ai-tools": minor
---

Add client configuration and new tools.

- **Client**: the FMP client is now memoized (no longer reconstructed on every tool call), and a new `configureFMPClient({ apiKey, timeout })` (exported from both entry points) lets consumers configure it instead of relying solely on the `FMP_API_KEY` environment variable.
- **New tools**: `getHistoricalPrice` and `getIntraday` (price history), `getStockNews` and `getStockNewsBySymbol` (news), `screenStocks` (screener), and `searchSymbol` (symbol search). High-volume tools apply a default result `limit` to keep outputs context-friendly.

---
"fmp-node-types": minor
"fmp-node-api": minor
"fmp-ai-tools": minor
---

Add 7 Starter-plan-verified endpoints (each with a matching AI tool; tool count 49 → 56):

- **`fmp.financial`** — `getFinancialScores` (Altman Z-Score + Piotroski), `getKeyMetricsTTM`, `getFinancialRatiosTTM`, `getRevenueProductSegmentation`, `getRevenueGeographicSegmentation`.
- **`fmp.analyst`** — `getGradesConsensus` (buy/hold/sell counts + overall consensus).
- **`fmp.company`** — `getStockPeers` (peer companies with price + market cap).

Adds canonical Zod schemas/types, live-API shape-check manifest cases (all PASS, 0 drift against the live `stable` API), docs for the new financial/company endpoints, and a new analyst documentation page.

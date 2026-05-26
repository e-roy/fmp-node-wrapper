---
"fmp-node-types": minor
"fmp-node-api": minor
---

Add a `/search` endpoint: `fmp.search.search({ query, limit?, exchange? })` resolves a company name or partial ticker to matching symbols, returning the new `SearchResult` type. Wired into the live-API shape-check manifest.

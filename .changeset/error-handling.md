---
"fmp-node-types": minor
"fmp-node-api": minor
"fmp-ai-tools": minor
---

Typed error classification for FMP failures, surfaced through the AI tools.

- **fmp-node-types**: `APIResponse` gains an optional `errorType` (`plan-restricted | rate-limit | auth | not-found | bad-request | network | unknown`).
- **fmp-node-api**: the client now reads FMP's real error message from the response body and classifies failures (new `classifyError` export). Plan/subscription-restricted endpoints (402/403 or "Exclusive/Special Endpoint") are reported as `plan-restricted` instead of a generic error.
- **fmp-ai-tools**: every tool now returns a structured error (`{ error, type, message, status }`) to the model on failure instead of `null`, so an agent can explain *why* a call failed — e.g. that the data requires a higher FMP plan.

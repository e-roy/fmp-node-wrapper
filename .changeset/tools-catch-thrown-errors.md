---
"fmp-ai-tools": patch
---

Tools no longer throw out of `execute`. A thrown error — most importantly a missing/invalid `FMP_API_KEY`, which throws from the `FMP` constructor before any request is made — is now caught at the tool boundary and returned to the model as the same structured `{ error, type, message, status }` shape (with `type: "auth"` for key problems). Previously the raw exception reached the AI SDK and the agent received only a vague failure with no reason.

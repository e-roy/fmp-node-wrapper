---
"fmp-ai-tools": patch
---

Internal refactor: each tool is now defined once in a shared `definitions/` layer, with the Vercel AI and OpenAI wrappers acting as thin per-provider adapters. The public API (tool names, subpath exports `fmp-ai-tools/vercel-ai` and `fmp-ai-tools/openai`, `fmpTools`, category groups, and individual tools) is unchanged. Minor drift between the two providers was canonicalized: numeric params use `z.number()` (OpenAI no longer string-coerces), and descriptions/validation use the richer variant. Adding a new provider is now a single adapter file.

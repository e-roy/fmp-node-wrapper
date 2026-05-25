---
"fmp-ai-tools": patch
---

Loosen the `@openai/agents` (`^0.11.0`) and `ai` (`^6.0.0`) dependency ranges so installs resolve to settled, widely-available versions instead of being pinned to the newest release. This avoids install failures for consumers using pnpm's `minimum-release-age` supply-chain guard, which previously had no mature version to resolve.

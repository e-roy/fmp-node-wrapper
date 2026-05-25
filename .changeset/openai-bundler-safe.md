---
"fmp-ai-tools": patch
---

Make the `fmp-ai-tools/openai` entry point bundler-safe so it works in Next.js (App Router / Turbopack) with a normal static import. Removed the filesystem-based `checkOpenAIAgentsVersion()` that ran on import (it used `require.resolve`/`fs` and broke under bundlers), and moved `@openai/agents` and `ai` to **optional** `peerDependencies`. Consumers no longer need `serverExternalPackages`, `createRequire`, or any other workaround.

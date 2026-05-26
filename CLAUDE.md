# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Monorepo managed with **pnpm workspaces** + **Turborepo**. Three published packages plus apps:

- `packages/types/` (`fmp-node-types`) — shared TypeScript interfaces, one file per endpoint category. No runtime code. Internal-only; not published standalone but bundled into the others.
- `packages/api/` (`fmp-node-api`) — the main API wrapper. Depends on `fmp-node-types`.
- `packages/tools/` (`fmp-ai-tools`) — AI/LLM tool definitions. Depends on `fmp-node-api` and `fmp-node-types`.
- `apps/docs/` — Next.js 15 documentation site that consumes `fmp-node-api`.
- `apps/examples/vercel-ai/` — example Next.js app using `fmp-ai-tools`.

Dependency chain is `types → api → tools`. Turbo encodes this: most tasks `dependsOn: ["^build"]`, so a change in `types` requires upstream packages to rebuild before their tests/type-checks pass.

## Commands

**Always run from the repo root, and use `pnpm` exclusively** (npm/yarn will break the workspace). Turbo fans tasks out to packages.

```bash
pnpm build              # build all packages (tsup, respects dep order)
pnpm test               # all tests (depends on ^build)
pnpm type-check         # tsc --noEmit across packages
pnpm lint               # NOTE: only lints packages/api + apps/docs
pnpm lint:all           # turbo lint across every package (incl. tools)
pnpm format             # prettier --write
```

Per-endpoint Jest runs (filter to `fmp-node-api`), e.g. `pnpm test:quote`, `pnpm test:stock`, `pnpm test:financial`, `pnpm test:sec`, etc. Also `pnpm test:unit` (client + fmp), `pnpm test:endpoints`, `pnpm test:tools`. **All Jest tests are fully mocked and deterministic — no network or API key required.** Live API validation is a separate concern handled by `pnpm test:live` (shape-checks responses against the canonical Zod schemas; see below).

Run a single test file directly:
```bash
pnpm --filter fmp-node-api exec jest src/__tests__/endpoints/quote.test.ts
```

Manual live-API smoke tests (hit the real FMP API, need `FMP_API_KEY`):
```bash
pnpm test:endpoint <name>   # packages/api/scripts/test-endpoint.ts (raw JSON, one endpoint)
pnpm test:tool              # packages/tools manual tool runner
pnpm test:live [flags]      # live-API shape check vs Zod schemas; PASS/FAIL/SKIP/DRIFT (packages/api/scripts/live)
```

`test:live` validates real responses against the canonical Zod schemas in `fmp-node-types` (schema-first; types are `z.infer`). It is sequential + throttled and supports `--category`, `--endpoint`, `--delay`, `--max-calls`, `--dry-run`, `--include-locked`, `--fail-on-drift`. Seeded for `quote`/`stock`/`financial`/`market`; classifier logic is unit-tested in `packages/api/src/__tests__/live/`. Add new cases in `scripts/live/manifest.ts`.

### API key for tests

The live-check tool (`test:live`) and manual scripts read `FMP_API_KEY` from a root `.env` (`cp .env.example .env`); the mocked Jest suite does not need it. Turbo passes `FMP_API_KEY` through to test tasks (see `turbo.json` `env`). Constructing `new FMP()` with no key falls back to `process.env.FMP_API_KEY` and throws if absent or malformed (`FMPValidation.isValidApiKey`).

## Architecture

### The API client (`packages/api`)

`FMP` (`src/fmp.ts`) is the public entry point. It validates the key, builds one `FMPClient`, and instantiates every endpoint class with it, exposing them as readonly fields (`fmp.quote`, `fmp.stock`, `fmp.financial`, …). To add an endpoint category, add the class in `src/endpoints/`, wire it in `fmp.ts`, and re-export it from `src/index.ts`.

`FMPClient` (`src/client.ts`) is the key abstraction. **FMP has three live API surfaces — `v3`, `v4`, and `stable` — so the client holds three separate axios instances.** Every endpoint method passes the version explicitly: `this.client.get('/path', 'v3', params)`. An interceptor injects `apikey` into every request. Picking the wrong version is a common source of 404s.

Two fetch methods with different response shaping, both returning `APIResponse<T>` (`{ success, data, error, status }`) and never throwing (errors are captured into the response):
- `get<T>` — for list endpoints. Normalizes so `data` is always an array (null/undefined → `[]`).
- `getSingle<T>` — for single-object endpoints. Unwraps a single-element array to the object and normalizes null → `{}`.

Choose `get` vs `getSingle` based on whether the endpoint conceptually returns one record or many.

### Types (`packages/types`)

All interfaces live here and are imported by package name (`import { Quote } from 'fmp-node-types'`), not relative paths — both `api` and `tools` resolve it as a workspace dependency. When adding/changing an endpoint, update the matching type file here first.

### Path aliases

Inside `packages/api` and `packages/tools`, source uses the `@/` alias for `src/` (e.g. `import { FMPClient } from '@/client'`), configured in each package's `tsconfig.json` and resolved by tsup/tsx. Jest maps `fmp-node-api` → `packages/api/src` (see root `jest.config.js`) so tools tests run against API source without a build.

### AI tools (`packages/tools`)

Tools wrap the `fmp-node-api` client for LLM use. `getFMPClient()` (`src/client.ts`) just does `new FMP()` (env-var key).

**Each tool is defined once** in `src/definitions/<category>.ts` as a provider-agnostic `FMPToolDefinition` (`{ name, description, inputSchema (Zod), execute }`); `execute` calls the `fmp-node-api` method and returns `toToolResponse(...)`. `src/definitions/index.ts` aggregates the per-category arrays into `allDefinitions`.

**Per-provider adapters** turn a definition into an SDK-specific tool: `createTool` (`src/utils/aisdk-tool-wrapper.ts`) for the Vercel AI SDK and `createOpenAITool` (`src/utils/openai-tool-wrapper.ts`) for OpenAI Agents. Both add logging + error catching (`toToolError`); the OpenAI adapter also `inputSchema.parse()`s input (the Vercel SDK does that itself).

Each provider's `index.ts` (`src/providers/vercel-ai/`, `src/providers/openai/`) maps the shared definitions through its adapter and rebuilds that provider's public shape — Vercel exposes a `ToolSet` object (`fmpTools`) + category objects; OpenAI exposes `Tool[]` arrays. Both also re-export every tool individually. The package exports per-provider subpaths `fmp-ai-tools/vercel-ai` and `fmp-ai-tools/openai`.

To add a tool: add one `defineTool({...})` to the relevant `src/definitions/<category>.ts`, then add a one-line individual export to each provider's `index.ts` (it flows into the category group and `fmpTools` automatically). Adding a new provider is one adapter + one `providers/<name>/index.ts`.

## Build & publish

Each package builds with **tsup** to dual CJS+ESM with `.d.ts` (see per-package `tsup.config.ts`); `axios` is marked external in the API build. Versioning/publishing uses **Changesets**: `pnpm changeset` to record a change, `pnpm publish-packages` to build+lint+test+version+publish.

## Conventions

- Files: kebab-case. Functions/vars: camelCase. Classes/interfaces/types: PascalCase. Constants: UPPER_SNAKE_CASE.
- Prefer `interface` for object shapes; avoid `any` (use `unknown`). Strict mode is on.
- The published tools package is `fmp-ai-tools` (not `fmp-tools`); types are `fmp-node-types`; the API is `fmp-node-api`. When docs and code disagree, trust the code in `src/`.

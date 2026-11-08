#!/usr/bin/env node
//
// Live-API shape-check runner.
//
// Calls fmp-node-api endpoints against the REAL FMP API (throttled, sequential)
// and validates each response against its canonical Zod schema, classifying
// results PASS / FAIL / SKIP / DRIFT. Exits non-zero if any FAIL occurred
// (or any DRIFT with --fail-on-drift).
//
// Usage:
//   pnpm test:live [flags]
//   pnpm test:live --category quote,stock --delay 400 --max-calls 20
//   pnpm test:live --endpoint getQuote --dry-run
//
// Flags:
//   --category <csv>     only run these categories (e.g. quote,stock,senate-house)
//   --endpoint <substr>  only run cases whose name includes <substr>
//   --delay <ms>         delay between calls (default 400)
//   --timeout <ms>       per-request timeout (default 30000)
//   --max-calls <n>      optional cap on live calls this run (default: no cap)
//   --sample <n>         array elements validated per response (default 3)
//   --include-locked     also run cases marked planLocked
//   --fail-on-drift      treat DRIFT as a failure for the exit code
//   --dry-run            list selected cases and planned call count; make no calls
//   --help, -h           show this help

import { config } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

const envPath = resolve(__dirname, '../../../../.env');
if (existsSync(envPath)) {
  config({ path: envPath });
}

import { FMP } from '../../src/fmp';
import { manifest, type Category, type LiveCase } from './manifest';
import { classifyResult, isTransientFailure, type Outcome, type TransportResult } from '../../src/live/validate';

/** Pause before re-trying a transient (network / 5xx) failure. */
const RETRY_BACKOFF_MS = 2000;

type DisplayOutcome = Outcome | 'NRUN';

interface Row {
  name: string;
  category: Category;
  outcome: DisplayOutcome;
  detail: string;
  ms: number | null;
}

const COLORS: Record<DisplayOutcome, string> = {
  PASS: '\x1b[32m',
  FAIL: '\x1b[31m',
  SKIP: '\x1b[33m',
  DRIFT: '\x1b[35m',
  NRUN: '\x1b[90m',
};
const RESET = '\x1b[0m';

function color(outcome: DisplayOutcome, text: string): string {
  return `${COLORS[outcome]}${text}${RESET}`;
}

function getFlag(args: string[], name: string): string | undefined {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(`--${name}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function callCase(c: LiveCase, fmp: FMP): Promise<TransportResult> {
  try {
    return await c.call(fmp);
  } catch (err) {
    return { success: false, data: null, error: err instanceof Error ? err.message : String(err), status: 0 };
  }
}

const HELP = `Live-API shape-check runner

Usage: pnpm test:live [flags]

  --category <csv>     only run these categories (e.g. quote,stock,senate-house)
  --endpoint <substr>  only run cases whose name includes <substr>
  --delay <ms>         delay between calls (default 400)
  --timeout <ms>       per-request timeout (default 30000)
  --max-calls <n>      optional cap on live calls this run (default: no cap)
  --sample <n>         array elements validated per response (default 3)
  --include-locked     also run cases marked planLocked
  --fail-on-drift      treat DRIFT as a failure for the exit code
  --dry-run            list selected cases and planned call count; make no calls
  --help, -h           show this help
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (hasFlag(args, 'help') || args.includes('-h')) {
    console.log(HELP);
    return;
  }

  const categoryFilter = getFlag(args, 'category')?.split(',').map((s) => s.trim()).filter(Boolean);
  const endpointFilter = getFlag(args, 'endpoint');
  const delay = Number(getFlag(args, 'delay') ?? 400);
  const timeout = Number(getFlag(args, 'timeout') ?? 30000);
  // No cap unless --max-calls is passed: a fixed default silently left the tail of
  // the manifest unchecked once the manifest outgrew it.
  const maxCallsFlag = getFlag(args, 'max-calls');
  const maxCalls = maxCallsFlag === undefined ? Infinity : Number(maxCallsFlag);
  const includeLocked = hasFlag(args, 'include-locked');
  const failOnDrift = hasFlag(args, 'fail-on-drift');
  const dryRun = hasFlag(args, 'dry-run');
  const sampleSize = Number(getFlag(args, 'sample') ?? 3);

  if (!(maxCalls >= 0) || !(timeout > 0)) {
    console.error('❌ --max-calls must be a number >= 0 and --timeout a number > 0.');
    process.exit(1);
  }
  const budgetLabel = Number.isFinite(maxCalls) ? String(maxCalls) : 'none';

  let selected: LiveCase[] = manifest;
  if (categoryFilter && categoryFilter.length > 0) {
    selected = selected.filter((c) => categoryFilter.includes(c.category));
  }
  if (endpointFilter) {
    selected = selected.filter((c) => c.name.toLowerCase().includes(endpointFilter.toLowerCase()));
  }
  if (!includeLocked) {
    selected = selected.filter((c) => !c.planLocked);
  }

  if (selected.length === 0) {
    console.log('No cases match the given filters.');
    process.exit(1);
  }

  const plannedCalls = Math.min(selected.length, maxCalls);

  if (dryRun) {
    console.log(`\nDRY RUN — ${selected.length} case(s) selected, would make ${plannedCalls} call(s) (budget ${budgetLabel}):\n`);
    for (const c of selected) {
      console.log(`  ${c.category.padEnd(10)} ${c.name}${c.planLocked ? '  (plan-locked)' : ''}`);
    }
    console.log('');
    return;
  }

  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    console.error('❌ FMP_API_KEY not found. Set it in the repo-root .env (cp .env.example .env).');
    process.exit(1);
  }

  const fmp = new FMP({ apiKey, timeout });
  const rows: Row[] = [];
  let calls = 0;
  let stopped = false;

  console.log(`\nRunning ${plannedCalls} live call(s) (delay ${delay}ms, timeout ${timeout}ms, budget ${budgetLabel})...\n`);

  for (const c of selected) {
    if (stopped) {
      rows.push({ name: c.name, category: c.category, outcome: 'NRUN', detail: 'stopped (rate limit)', ms: null });
      continue;
    }
    if (calls >= maxCalls) {
      rows.push({ name: c.name, category: c.category, outcome: 'NRUN', detail: 'budget reached', ms: null });
      continue;
    }
    if (calls > 0) await sleep(delay);

    const start = Date.now();
    let res = await callCase(c, fmp);
    calls++;
    let retried = false;
    if (isTransientFailure(res)) {
      // One retry so a transient blip (timeout / reset / 5xx) doesn't fail the whole run.
      await sleep(RETRY_BACKOFF_MS);
      res = await callCase(c, fmp);
      calls++;
      retried = true;
    }
    const ms = Date.now() - start;

    const cls = classifyResult(res, c.schema, c.kind, Math.max(sampleSize, c.sample ?? 0));
    const detail = retried ? `${cls.detail} (retried)`.trim() : cls.detail;
    rows.push({ name: c.name, category: c.category, outcome: cls.outcome, detail, ms });
    if (cls.stopRun) stopped = true;
  }

  // Results table
  const catWidth = Math.max(...rows.map((r) => r.category.length));
  const nameWidth = Math.max(...rows.map((r) => r.name.length), 20);
  for (const r of rows) {
    const ms = r.ms === null ? '—' : `${r.ms}ms`;
    const line = `${r.category.padEnd(catWidth)}  ${r.name.padEnd(nameWidth)}  ${color(r.outcome, r.outcome.padEnd(5))}  ${ms.padStart(7)}  ${r.detail}`;
    console.log(line);
  }

  // Summary
  const count = (o: DisplayOutcome) => rows.filter((r) => r.outcome === o).length;
  const pass = count('PASS');
  const fail = count('FAIL');
  const skip = count('SKIP');
  const drift = count('DRIFT');
  const nrun = count('NRUN');

  console.log(
    `\n${calls} call(s) made · ` +
      `${color('PASS', `${pass} pass`)} · ` +
      `${color('FAIL', `${fail} fail`)} · ` +
      `${color('SKIP', `${skip} skip`)} · ` +
      `${color('DRIFT', `${drift} drift`)}` +
      (nrun > 0 ? ` · ${color('NRUN', `${nrun} not run`)}` : ''),
  );

  const failed = fail > 0 || (failOnDrift && drift > 0);
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error('❌ Runner error:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});

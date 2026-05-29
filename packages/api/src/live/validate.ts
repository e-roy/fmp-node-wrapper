// Relaxed shape validator + result classifier for the live-API check tool.
//
// The canonical schemas in `fmp-node-types` are strict (they ship to users).
// Here we wrap them in a tolerant mode so FMP's real-world looseness surfaces
// as DRIFT signals rather than false FAILs:
//
//   PASS  - response matches the schema's known fields
//   FAIL  - an expected field is missing, or has the wrong (non-null) type
//   SKIP  - transport-level: plan-locked (402/403) or quota/rate-limited (429)
//   DRIFT - extra top-level keys, or a non-nullable field came back null
//
// Note: extra-key (DRIFT) detection is top-level only; extra keys nested inside
// sub-objects are not reported in this iteration.

import { z } from 'zod';
import { classifyError } from '../utils/error-classifier';

export type Outcome = 'PASS' | 'FAIL' | 'SKIP' | 'DRIFT';

/** The subset of `APIResponse<T>` the classifier needs. */
export interface TransportResult {
  success: boolean;
  data: unknown;
  error: string | null;
  status: number;
}

export interface Classification {
  outcome: Outcome;
  detail: string;
  /** Set when a quota/rate limit was hit and the run should stop early. */
  stopRun?: boolean;
}

const OUTCOME_RANK: Record<Outcome, number> = { PASS: 0, DRIFT: 1, SKIP: 2, FAIL: 3 };

/**
 * Classify a transport-level outcome. Returns null when the request succeeded
 * (so the caller proceeds to shape validation). Delegates the failure
 * categorization to the shared `classifyError` so the live tool and the
 * production client agree on what counts as plan-locked / rate-limited.
 */
export function classifyTransport(res: TransportResult): Classification | null {
  if (res.success) return null;

  const { errorType } = classifyError(res.status, res.error ?? '');

  if (errorType === 'rate-limit') {
    return { outcome: 'SKIP', detail: `quota/rate limit (${res.status}): ${res.error ?? ''}`.trim(), stopRun: true };
  }

  if (errorType === 'plan-restricted') {
    return { outcome: 'SKIP', detail: `plan-locked (${res.status}): ${res.error ?? ''}`.trim() };
  }

  return { outcome: 'FAIL', detail: `request failed (${res.status}): ${res.error || 'unknown error'}` };
}

/** Classify a single object value against an (object) schema. */
export function classifyShape(schema: z.ZodTypeAny, value: unknown): Classification {
  const driftDetails: string[] = [];

  // Pass 1: tolerate unknown keys; judge known fields.
  const passthrough = schema instanceof z.ZodObject ? schema.passthrough() : schema;
  const result = passthrough.safeParse(value);

  if (!result.success) {
    const failIssues: string[] = [];
    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || '(root)';
      if (issue.code === 'invalid_type') {
        if (issue.received === 'null') {
          // Non-nullable field came back null -> candidate to make schema nullable.
          driftDetails.push(`${path}: null (expected ${issue.expected})`);
          continue;
        }
        // 'undefined' (missing) or a genuinely wrong type -> contract failure.
        failIssues.push(`${path}: expected ${issue.expected}, got ${issue.received}`);
      } else {
        failIssues.push(`${path}: ${issue.message}`);
      }
    }
    if (failIssues.length > 0) {
      return { outcome: 'FAIL', detail: failIssues.join('; ') };
    }
    // Otherwise: only null-drift issues — fall through to PASS/DRIFT.
  }

  // Pass 2: detect extra top-level keys (the API added fields our type lacks).
  if (schema instanceof z.ZodObject) {
    const strict = schema.strict().safeParse(value);
    if (!strict.success) {
      for (const issue of strict.error.issues) {
        if (issue.code === 'unrecognized_keys') {
          driftDetails.push(`extra keys: ${issue.keys.join(', ')}`);
        }
      }
    }
  }

  if (driftDetails.length > 0) {
    return { outcome: 'DRIFT', detail: driftDetails.join('; ') };
  }
  return { outcome: 'PASS', detail: '' };
}

/**
 * Classify a full result: transport first, then shape. For array payloads the
 * first `sampleSize` elements are validated and the worst outcome wins.
 */
export function classifyResult(
  res: TransportResult,
  schema: z.ZodTypeAny,
  kind: 'object' | 'array',
  sampleSize = 3,
): Classification {
  const transport = classifyTransport(res);
  if (transport) return transport;

  const data = res.data;

  if (kind === 'array') {
    if (!Array.isArray(data)) {
      return { outcome: 'FAIL', detail: `expected array, got ${data === null ? 'null' : typeof data}` };
    }
    if (data.length === 0) {
      return { outcome: 'PASS', detail: '0 rows' };
    }
    let worst: Classification = { outcome: 'PASS', detail: `${data.length} rows` };
    data.slice(0, sampleSize).forEach((el, i) => {
      const c = classifyShape(schema, el);
      if (OUTCOME_RANK[c.outcome] > OUTCOME_RANK[worst.outcome]) {
        worst = { outcome: c.outcome, detail: `[${i}] ${c.detail}` };
      }
    });
    return worst;
  }

  return classifyShape(schema, data);
}

import { z } from 'zod';

/** Drop top-level `null`s — models and direct callers send `null` to mean "not set". */
export function stripNulls(input: unknown): unknown {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return input;
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== null));
}

/**
 * Normalize tool input the same way on every provider: drop top-level `null`s, then
 * parse so Zod defaults fill in (e.g. `limit`, `period`, `interval`). Input that
 * doesn't parse is returned null-stripped, leaving validation to the SDK as before.
 */
export function applyDefaults(schema: z.ZodTypeAny, input: unknown): any {
  const stripped = stripNulls(input);
  const parsed = schema.safeParse(stripped);
  return parsed.success ? parsed.data : stripped;
}

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

/**
 * A copy of `schema` whose defaulted fields also accept `null`. SDKs that validate
 * input before calling the tool (OpenAI Agents) would otherwise reject `null` for
 * e.g. `limit`; the tool then strips the nulls and applies the real defaults.
 */
export function acceptNullForDefaults(schema: z.ZodObject<any>): z.ZodObject<any> {
  const shape = Object.fromEntries(
    Object.entries(schema.shape).map(([key, field]) => {
      if (!(field instanceof z.ZodDefault)) return [key, field];
      const nullable = field.nullable();
      return [key, field.description ? nullable.describe(field.description) : nullable];
    }),
  );
  return z.object(shape);
}

/**
 * Resolve a requested `limit` against its default and hard maximum. When the request
 * exceeds the maximum, `notice` tells the model so a shorter list isn't a surprise.
 */
export function capLimit(
  requested: number | null | undefined,
  defaultRows: number,
  maxRows: number,
): { limit: number; max: number; notice?: string } {
  const wanted = requested ?? defaultRows;
  if (wanted <= maxRows) return { limit: wanted, max: maxRows };
  return {
    limit: maxRows,
    max: maxRows,
    notice: `Requested ${wanted} rows, but this tool returns at most ${maxRows} per call.`,
  };
}

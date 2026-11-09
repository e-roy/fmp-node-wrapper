import type { APIResponse, FMPErrorType } from 'fmp-node-api';

/**
 * Format an `fmp-node-api` response into the string an AI tool returns to the model.
 *
 * On success, returns the data as pretty JSON (or a clear "no data" note when the
 * payload is empty). On failure, returns a structured error object — including the
 * classified `type` (e.g. `plan-restricted`, `rate-limit`, `auth`) — so the model
 * can explain *why* the call failed instead of receiving a bare `null`.
 */
export function toToolResponse(res: APIResponse<unknown>): string {
  // Only an explicit failure surfaces an error; the client always sets `success`.
  if (res.success === false) {
    return JSON.stringify({
      error: true,
      type: res.errorType ?? 'unknown',
      message: res.error ?? 'The request failed.',
      status: res.status,
    });
  }

  if (isEmpty(res.data)) {
    return JSON.stringify({ data: [], note: 'No data was returned for this request.' });
  }
  return JSON.stringify(res.data, null, 2);
}

/**
 * Cap an array payload at `limit` rows (optionally sorting first) so a single tool
 * call can't flood the model's context — some FMP endpoints return thousands of
 * rows (megabytes of JSON). Failed and non-array responses pass through unchanged.
 */
export function limitRows<T>(
  res: APIResponse<T[]>,
  limit: number,
  compare?: (a: T, b: T) => number,
): APIResponse<T[]> {
  // Same rule as toToolResponse: only an explicit failure skips the cap.
  if (res.success === false || !Array.isArray(res.data)) return res;
  const rows = compare ? [...res.data].sort(compare) : res.data;
  return { ...res, data: rows.slice(0, limit) };
}

/**
 * `toToolResponse` for list endpoints, capped at `limit` rows. When rows are cut (or
 * a `notice` must reach the model, e.g. a clamped date range), the model receives
 * `{ data, truncated, total, returned, note }` instead of a silently partial list.
 */
export function toCappedToolResponse<T>(
  res: APIResponse<T[]>,
  limit: number,
  options: { compare?: (a: T, b: T) => number; hint?: string; notice?: string } = {},
): string {
  const total = res.success !== false && Array.isArray(res.data) ? res.data.length : 0;
  const capped = limitRows(res, limit, options.compare);
  const truncated = total > limit;
  if (capped.success === false || !Array.isArray(capped.data) || (!truncated && !options.notice)) {
    return toToolResponse(capped);
  }
  const note = [
    truncated ? `Showing ${capped.data.length} of ${total} rows.` : undefined,
    options.notice,
    truncated ? (options.hint ?? 'Increase `limit` to see more.') : undefined,
  ]
    .filter(Boolean)
    .join(' ');
  return JSON.stringify(
    { data: capped.data, truncated, total, returned: capped.data.length, note },
    null,
    2,
  );
}

/**
 * Format a *thrown* error into the same structured shape `toToolResponse` uses.
 *
 * Some failures throw instead of returning an `APIResponse` — most notably a
 * missing/invalid `FMP_API_KEY`, which throws from the `FMP` constructor before
 * any request is made. Catching these at the tool boundary lets the model relay
 * the real reason instead of receiving a bare exception.
 */
export function toToolError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  let type: FMPErrorType = 'unknown';
  if (/api[\s_-]?key/i.test(message)) {
    type = 'auth';
  }
  return JSON.stringify({ error: true, type, message, status: 0 });
}

function isEmpty(data: unknown): boolean {
  if (data == null) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') return Object.keys(data as object).length === 0;
  return false;
}

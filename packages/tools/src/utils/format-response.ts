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

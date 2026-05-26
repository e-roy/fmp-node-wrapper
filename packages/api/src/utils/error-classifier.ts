// Classifies a failed FMP request into a typed category + human-readable message.
//
// FMP signals plan/subscription restrictions in two ways: HTTP 402/403, and/or a
// message body like "Special Endpoint : This endpoint is only for users with..."
// or "Exclusive Endpoint". This classifier folds both signals into a single
// `FMPErrorType` so callers (and AI tools) can react to the *kind* of failure.

import type { FMPErrorType } from 'fmp-node-types';

/** Message patterns FMP uses for plan/subscription-locked endpoints. */
const PLAN_LOCKED_PATTERNS = [
  /exclusive endpoint/i,
  /not available under your current/i,
  /premium/i,
  /special endpoint/i,
  /upgrade your plan/i,
];

export interface ClassifiedError {
  errorType: FMPErrorType;
  message: string;
}

/**
 * Classify a failed request.
 *
 * @param status HTTP status code; use `0` when no HTTP response was received
 *               (network error / timeout), which maps to `network`.
 * @param rawMessage The best available message — prefer FMP's response body over
 *                   axios's generic "Request failed with status code N".
 */
export function classifyError(status: number, rawMessage: string): ClassifiedError {
  const msg = rawMessage?.trim() || 'Unknown error occurred';
  const matchesPlanPattern = PLAN_LOCKED_PATTERNS.some(re => re.test(msg));

  if (status === 429) {
    return { errorType: 'rate-limit', message: `FMP rate limit reached: ${msg}` };
  }
  if (status === 401) {
    return {
      errorType: 'auth',
      message: `FMP authentication failed (check your FMP_API_KEY): ${msg}`,
    };
  }
  if (status === 402 || status === 403 || matchesPlanPattern) {
    return {
      errorType: 'plan-restricted',
      message: `This endpoint is not available on your current FMP plan. (${status}: ${msg})`,
    };
  }
  if (status === 404) {
    return { errorType: 'not-found', message: `Not found: ${msg}` };
  }
  if (status === 400) {
    return { errorType: 'bad-request', message: `Invalid request: ${msg}` };
  }
  if (status === 0) {
    return { errorType: 'network', message: `Network error: ${msg}` };
  }
  return { errorType: 'unknown', message: msg };
}

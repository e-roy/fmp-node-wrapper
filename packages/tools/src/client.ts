/**
 * Internal FMP API client used by the tools.
 *
 * The client is memoized so tools reuse a single `FMP` instance instead of
 * constructing one (and re-validating the API key) on every tool call. By
 * default it reads the `FMP_API_KEY` environment variable; consumers can call
 * `configureFMPClient(...)` once at startup to provide a key/timeout explicitly.
 */
import { FMP, type FMPConfig } from 'fmp-node-api';

let cached: FMP | undefined;
let configured: FMPConfig | undefined;

/**
 * Configure the FMP client used by all tools. Optional — by default the client
 * reads the `FMP_API_KEY` environment variable. Call once before using the tools.
 */
export function configureFMPClient(config: FMPConfig): void {
  configured = config;
  cached = undefined; // rebuilt lazily on next use
}

/** Reset the memoized client and configuration (mainly for tests / serverless reuse). */
export function resetFMPClient(): void {
  cached = undefined;
  configured = undefined;
}

/** Get the memoized FMP client instance (internal use by tools). */
export function getFMPClient(): FMP {
  if (!cached) {
    cached = new FMP(configured);
  }
  return cached;
}

/**
 * Internal FMP API client instance
 * Used internally by the tools, not exported publicly
 */
import { FMP } from 'fmp-node-api';

// Create a function to get the FMP client instance (internal use only)
export function getFMPClient() {
  return new FMP();
}

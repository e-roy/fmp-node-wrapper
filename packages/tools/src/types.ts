/**
 * Tool interface that matches the ai library's expected format
 * This is what the ai library produces when using their tool() function
 */
export interface Tool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, any>;
      required: string[];
    };
  };
  execute: (args: any) => Promise<string>;
}

/**
 * Internal FMP API client instance
 * Used internally by the tools, not exported publicly
 */
import { FMP } from 'fmp-node-api';

// Create a function to get the FMP client instance (internal use only)
export function getFMPClient() {
  return new FMP();
}

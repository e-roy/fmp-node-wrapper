import { z } from 'zod';

/**
 * Provider-agnostic definition of an FMP tool: its name, model-facing description,
 * Zod input schema, and the execute body (which returns the string the model receives,
 * already run through `toToolResponse`).
 *
 * Per-provider adapters (`createTool` for Vercel AI, `createOpenAITool` for OpenAI Agents)
 * turn a definition into an SDK-specific tool. Defining each tool once here keeps the
 * providers in sync and makes adding a new provider a single adapter file.
 */
export interface FMPToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  execute: (args: any) => Promise<string>;
}

/**
 * Identity helper that preserves per-tool inference of `execute`'s args from the schema
 * at the definition site, while widening the result to `FMPToolDefinition` so definitions
 * can be collected into a single array.
 */
export function defineTool<T extends z.ZodObject<any>>(def: {
  name: string;
  description: string;
  inputSchema: T;
  execute: (args: z.infer<T>) => Promise<string>;
}): FMPToolDefinition {
  return def as FMPToolDefinition;
}

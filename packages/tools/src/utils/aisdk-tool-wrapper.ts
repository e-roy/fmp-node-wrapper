import { z } from 'zod';
import { tool } from 'ai';
import { logApiExecutionWithTiming } from './logger';

interface AISDKToolConfig {
  name: string;
  description: string;
  inputSchema: z.ZodSchema;
  execute: (input: any) => Promise<string>;
}

export const createTool = (config: AISDKToolConfig) => {
  const { name, description, inputSchema, execute } = config;
  return tool({
    description,
    // `as any` avoids ai@6 tool()'s excessively-deep type instantiation on a
    // generic Zod schema; the real Zod schema is still passed at runtime.
    inputSchema: inputSchema as any,
    execute: async (input: any) => {
      return await logApiExecutionWithTiming(name, input, () => execute(input));
    },
  });
};

import { z } from 'zod';
import { tool, ToolSet } from 'ai';
import { logApiExecutionWithTiming } from './logger';

interface ToolConfig {
  name: string;
  description: string;
  inputSchema: z.ZodSchema;
  execute: (input: any) => Promise<string>;
}

export const createTool = (config: ToolConfig) => {
  const { name, description, inputSchema, execute } = config;
  return tool({
    description,
    inputSchema,
    execute: async (input: any) => {
      return await logApiExecutionWithTiming(name, input, () => execute(input));
    },
  } as ToolSet);
};

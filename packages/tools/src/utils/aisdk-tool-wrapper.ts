import { z } from 'zod';
import { logApiExecutionWithTiming } from './logger';

// Tool configuration interface for AI SDK v2
export interface ToolConfig<T extends z.ZodType> {
  name: string;
  description: string;
  inputSchema: T;
  execute: (args: z.infer<T>) => Promise<string>;
}

// Simple tool interface that's compatible with AI SDK ToolSet
export interface SimpleTool {
  name: string;
  description: string;
  inputSchema: z.ZodType;
  execute: (args: any) => Promise<string>;
}

// AI SDK v2 compatible tool creator that returns a simple tool object
// This avoids the complex type inference issues with the AI SDK's Tool type
export function createTool<T extends z.ZodType>(config: ToolConfig<T>): SimpleTool {
  const { name, description, inputSchema, execute } = config;

  return {
    name,
    description,
    inputSchema,
    execute: async (args: z.infer<T>) => {
      return await logApiExecutionWithTiming(name, args, () => execute(args));
    },
  };
}

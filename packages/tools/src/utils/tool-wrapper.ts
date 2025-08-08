import { z } from 'zod';
import { tool } from 'ai';

// Tool configuration interface for AI SDK v2
export interface ToolConfig<T extends z.ZodType> {
  name: string;
  description: string;
  inputSchema: T;
  execute: (args: z.infer<T>) => Promise<string>;
}

// AI SDK v2 compatible tool creator using the ai library's tool function
export function createTool<T extends z.ZodType>(config: ToolConfig<T>) {
  const { name, description, inputSchema, execute } = config;

  // Use the AI SDK's tool function to create a compatible tool
  return tool({
    name,
    description,
    inputSchema,
    execute,
  } as any); // Use type assertion to avoid deep type inference issues
}

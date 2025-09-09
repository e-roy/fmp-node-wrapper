import { z } from 'zod';
import { tool } from 'ai';
// import { logApiExecutionWithTiming } from './logger';

// // Tool configuration interface for AI SDK v2
// export interface ToolConfig<T extends z.ZodType> {
//   name: string;
//   description: string;
//   inputSchema: T;
//   execute: (args: z.infer<T>) => Promise<string>;
// }

// // AI SDK v2 compatible tool creator using the ai library's tool function
// // This properly converts Zod schemas to JSON Schema format
// export function createTool<T extends z.ZodType>(config: ToolConfig<T>) {
//   const { name, description, inputSchema, execute } = config;

//   // Use the AI SDK's tool function which properly handles Zod to JSON Schema conversion
//   // Use type assertion to bypass complex type inference issues
//   return tool({
//     description,
//     parameters: inputSchema,
//     execute: async (args: z.infer<T>) => {
//       return await logApiExecutionWithTiming(name, args, () => execute(args));
//     },
//   } as any);
// }

interface ToolConfig {
  name: string;
  description: string;
  inputSchema: z.ZodSchema;
  execute: (input: any) => Promise<string>;
}

export const createTool = (config: ToolConfig) => {
  const { name, description, inputSchema, execute } = config;
  return tool({
    // name,
    description,
    inputSchema,
    execute: async (input: any) => {
      console.log(`🔧 Tool: ${name}`);
      const result = await execute(input);
      console.log(`🔧 Tool Result: ${name}`, result);
      return result;
      // return await logApiExecutionWithTiming(name, input, () => execute(input));
    },
  } as any);
};

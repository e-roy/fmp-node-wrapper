import { z } from 'zod';
import { tool } from '@openai/agents';
import { logApiExecutionWithTiming } from './logger';

export interface OpenAIToolConfig<T extends z.ZodObject<any>> {
  name: string;
  description: string;
  inputSchema: T;
  execute: (args: z.infer<T>) => Promise<string>;
}

export function createOpenAITool<T extends z.ZodObject<any>>(config: OpenAIToolConfig<T>) {
  const { name, description, inputSchema, execute } = config;

  // @openai/agents derives the JSON schema from the Zod schema and validates
  // input against it before invoking execute. The cast widens our generic T to
  // the SDK's ZodObjectLike `parameters` type (runtime value is the real schema).
  // We also parse here so Zod defaults/coercion are applied consistently before
  // execute, regardless of whether the caller pre-validated.
  return tool({
    name,
    description,
    parameters: inputSchema as z.ZodObject<any>,
    execute: async (input: unknown) => {
      const args = inputSchema.parse(input) as z.infer<T>;
      return await logApiExecutionWithTiming(name, args, () => execute(args));
    },
  });
}

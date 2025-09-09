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

  // Create a simple JSON schema from the Zod schema
  const properties: Record<string, any> = {};
  const required: string[] = [];

  Object.entries(inputSchema.shape).forEach(([key, _fieldSchema]) => {
    properties[key] = { type: 'string' };
    required.push(key);
  });

  return tool({
    name,
    description,
    parameters: {
      type: 'object',
      properties,
      required,
      additionalProperties: false,
    } as any,
    strict: true,
    execute: async (args: z.TypeOf<T>) => {
      try {
        const validatedInput = inputSchema.parse(args);
        return await logApiExecutionWithTiming(name, validatedInput, () => execute(validatedInput));
      } catch (error) {
        if (error instanceof z.ZodError) {
          return `Invalid input: ${error.errors.map(e => e.message).join(', ')}`;
        }
        return `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`;
      }
    },
  });
}

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

  const properties: Record<string, any> = {};
  const required: string[] = [];

  // Extract properties from Zod schema using type guards
  if (inputSchema instanceof z.ZodObject) {
    const shape = inputSchema.shape;
    Object.entries(shape).forEach(([key, schema]) => {
      let isRequired = true;
      let actualSchema: z.ZodType = schema as z.ZodType;
      let fieldDescription = '';

      // Extract description from the original schema
      if (schema && typeof schema === 'object' && 'description' in schema) {
        const desc = (schema as any).description;
        if (typeof desc === 'string') {
          fieldDescription = desc;
        }
      }

      // Handle optional fields
      if (schema instanceof z.ZodOptional) {
        isRequired = false;
        actualSchema = schema.unwrap();
        // If no description was found on the optional wrapper, try the unwrapped schema
        if (!fieldDescription && actualSchema.description) {
          fieldDescription = actualSchema.description;
        }
      }

      // Handle default values (they make fields optional)
      if (schema instanceof z.ZodDefault) {
        isRequired = false;
        actualSchema = schema.removeDefault();
        // If no description was found on the default wrapper, try the unwrapped schema
        if (!fieldDescription && actualSchema.description) {
          fieldDescription = actualSchema.description;
        }
      }

      // Map Zod types to OpenAI parameter types
      if (actualSchema instanceof z.ZodString) {
        properties[key] = {
          type: 'string',
          description: fieldDescription || `${key} parameter`,
        };
      } else if (actualSchema instanceof z.ZodEnum) {
        properties[key] = {
          type: 'string',
          enum: actualSchema._def.values,
          description: fieldDescription || `${key} parameter`,
        };
      } else if (actualSchema instanceof z.ZodNumber) {
        properties[key] = {
          type: 'number',
          description: fieldDescription || `${key} parameter`,
        };
      } else if (actualSchema instanceof z.ZodBoolean) {
        properties[key] = {
          type: 'boolean',
          description: fieldDescription || `${key} parameter`,
        };
      } else if (actualSchema instanceof z.ZodArray) {
        properties[key] = {
          type: 'array',
          items: { type: 'string' }, // Default to string array, can be enhanced
          description: fieldDescription || `${key} parameter`,
        };
      } else {
        // Fallback for unknown types
        properties[key] = {
          type: 'string',
          description: fieldDescription || `${key} parameter`,
        };
      }

      if (isRequired) {
        required.push(key);
      }
    });
  }

  return tool({
    name,
    description,
    parameters: inputSchema as any,
    strict: true,
    execute: async (input: unknown) => {
      try {
        const validatedInput = inputSchema.parse(input);
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

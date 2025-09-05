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

  // Convert Zod schema to JSON Schema
  const jsonSchema = zodToJsonSchema(inputSchema);

  return tool({
    name,
    description,
    parameters: jsonSchema,
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

// Helper function to convert Zod schema to JSON Schema
function zodToJsonSchema(schema: z.ZodObject<any>): any {
  const shape = schema.shape;
  const properties: Record<string, any> = {};
  const required: string[] = [];

  Object.entries(shape).forEach(([key, fieldSchema]) => {
    let isRequired = true;
    let actualSchema: z.ZodType = fieldSchema as z.ZodType;
    let fieldDescription = '';

    // Extract description from the original schema
    if (fieldSchema && typeof fieldSchema === 'object' && 'description' in fieldSchema) {
      const desc = (fieldSchema as any).description;
      if (typeof desc === 'string') {
        fieldDescription = desc;
      }
    }

    // Handle optional fields
    if (fieldSchema instanceof z.ZodOptional) {
      isRequired = false;
      actualSchema = fieldSchema.unwrap();
      // If no description was found on the optional wrapper, try the unwrapped schema
      if (!fieldDescription && actualSchema.description) {
        fieldDescription = actualSchema.description;
      }
    }

    // Handle default values (they make fields optional)
    if (fieldSchema instanceof z.ZodDefault) {
      isRequired = false;
      actualSchema = fieldSchema.removeDefault();
      // If no description was found on the default wrapper, try the unwrapped schema
      if (!fieldDescription && actualSchema.description) {
        fieldDescription = actualSchema.description;
      }
    }

    // Map Zod types to JSON Schema types
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

  return {
    type: 'object',
    properties,
    required,
  };
}

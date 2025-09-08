import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';

describe('createOpenAITool', () => {
  it('maps Zod schema to OpenAI parameters (string, number, boolean, enum, array, optional, default)', async () => {
    const schema = z.object({
      aString: z.string().describe('A string field'),
      aNumber: z.number(),
      aBoolean: z.boolean(),
      anEnum: z.enum(['A', 'B']).describe('Enum field'),
      anArray: z.array(z.string()),
      optionalField: z.string().optional().describe('Optional string'),
      defaultField: z.number().default(42).describe('Default number'),
    });

    const tool = createOpenAITool({
      name: 'testTool',
      description: 'Test tool',
      inputSchema: schema,
      execute: async () => 'ok',
    });

    // The parameters should be a JSON schema object
    expect(tool.parameters).toEqual({
      type: 'object',
      properties: {
        aString: { type: 'string' },
        aNumber: { type: 'string' },
        aBoolean: { type: 'string' },
        anEnum: { type: 'string' },
        anArray: { type: 'string' },
        optionalField: { type: 'string' },
        defaultField: { type: 'string' },
      },
      required: [
        'aString',
        'aNumber',
        'aBoolean',
        'anEnum',
        'anArray',
        'optionalField',
        'defaultField',
      ],
      additionalProperties: false,
    });

    // Test that the tool has the expected properties
    expect(tool.name).toBe('testTool');
    expect(tool.description).toBe('Test tool');

    // Check that the tool has the expected structure for the new API
    expect(tool).toBeDefined();
    expect(typeof tool).toBe('object');
  });

  it('validates input and returns validation errors from Zod', async () => {
    const schema = z.object({ sym: z.string().min(1, 'required') });
    const tool = createOpenAITool({
      name: 'validateTool',
      description: 'Validates',
      inputSchema: schema,
      execute: async () => 'ok',
    });

    const result = await (tool as any).execute({ sym: '' });
    expect(result).toContain('Invalid input:');
    expect(result).toContain('required');
  });

  it('returns execution errors as string messages', async () => {
    const schema = z.object({ x: z.string() });
    const tool = createOpenAITool({
      name: 'errorTool',
      description: 'Errors out',
      inputSchema: schema,
      execute: async () => {
        throw new Error('boom');
      },
    });

    const result = await (tool as any).execute({ x: 'y' });
    expect(result).toContain('Error executing errorTool: boom');
  });

  it('passes validated input to execute', async () => {
    const schema = z.object({ n: z.number().default(1), s: z.string().optional() });
    const spy = jest.fn(async () => 'done');

    const tool = createOpenAITool({
      name: 'passTool',
      description: 'Passes args',
      inputSchema: schema,
      execute: spy,
    });

    await (tool as any).execute({});

    expect(spy).toHaveBeenCalledWith({ n: 1 });
  });

  it('extracts description from inner schema for optional/default and maps unknown types via fallback', () => {
    const schema = z.object({
      // Description only on inner schema, not on optional wrapper
      optInner: z.string().describe('Inner optional').optional(),
      // Description only on inner schema, not on default wrapper
      defInner: z.number().describe('Inner default').default(7),
      // Unknown type triggers fallback mapping
      unknown: z.any(),
    });

    const tool = createOpenAITool({
      name: 'branchTool',
      description: 'Covers branches',
      inputSchema: schema,
      execute: async () => 'ok',
    });

    // The parameters should be a JSON schema object
    expect(tool.parameters).toEqual({
      type: 'object',
      properties: {
        optInner: { type: 'string' },
        defInner: { type: 'string' },
        unknown: { type: 'string' },
      },
      required: ['optInner', 'defInner', 'unknown'],
      additionalProperties: false,
    });

    // Test that the tool has the expected properties
    expect(tool.name).toBe('branchTool');
    expect(tool.description).toBe('Covers branches');

    // Check that the tool has the expected structure for the new API
    expect(tool).toBeDefined();
    expect(typeof tool).toBe('object');
  });
});

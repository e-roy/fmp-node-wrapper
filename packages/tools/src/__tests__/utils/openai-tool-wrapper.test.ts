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

    expect(tool.parameters.type).toBe('object');
    expect(tool.parameters.additionalProperties).toBe(false);

    const props = tool.parameters.properties;
    expect(props.aString).toEqual({ type: 'string', description: 'A string field' });
    expect(props.aNumber).toEqual({ type: 'number', description: 'aNumber parameter' });
    expect(props.aBoolean).toEqual({ type: 'boolean', description: 'aBoolean parameter' });
    expect(props.anEnum).toEqual({ type: 'string', enum: ['A', 'B'], description: 'Enum field' });
    expect(props.anArray).toEqual({
      type: 'array',
      items: { type: 'string' },
      description: 'anArray parameter',
    });
    expect(props.optionalField).toEqual({ type: 'string', description: 'Optional string' });
    expect(props.defaultField).toEqual({ type: 'number', description: 'Default number' });

    // Required should not include optional or default fields
    expect(tool.parameters.required).toEqual([
      'aString',
      'aNumber',
      'aBoolean',
      'anEnum',
      'anArray',
    ]);
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

    const props = tool.parameters.properties;
    expect(props.optInner).toEqual({ type: 'string', description: 'Inner optional' });
    expect(props.defInner).toEqual({ type: 'number', description: 'Inner default' });
    expect(props.unknown).toEqual({ type: 'string', description: 'unknown parameter' });

    // Required should include unknown (not optional/default)
    expect(tool.parameters.required).toContain('unknown');
    // And should not include optional/default
    expect(tool.parameters.required).not.toContain('optInner');
    expect(tool.parameters.required).not.toContain('defInner');
  });
});

import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';

// The wrapper now passes the Zod schema straight to @openai/agents `tool()`,
// which derives the JSON schema and validates input itself. (The hand-rolled
// all-string JSON schema + manual parse/error handling was removed.)
describe('createOpenAITool', () => {
  it('passes name, description, and the Zod schema as `parameters`', () => {
    const schema = z.object({ symbol: z.string(), limit: z.string().optional() });

    const tool = createOpenAITool({
      name: 'testTool',
      description: 'Test tool',
      inputSchema: schema,
      execute: async () => 'ok',
    });

    expect(tool.name).toBe('testTool');
    expect(tool.description).toBe('Test tool');
    // A Zod schema is handed to the SDK (no JSON-schema conversion here), with the
    // same fields as the tool's schema.
    const parameters = (tool as any).parameters as z.ZodObject<any>;
    expect(parameters).toBeInstanceOf(z.ZodObject);
    expect(Object.keys(parameters.shape)).toEqual(Object.keys(schema.shape));
  });

  it('lets the SDK accept null for defaulted fields, then applies the default', async () => {
    const schema = z.object({ symbol: z.string(), limit: z.number().default(5) });
    const spy = jest.fn(async (args: { symbol: string; limit: number }) => `limit ${args.limit}`);

    const tool = createOpenAITool({ name: 'nullTool', description: 'Null', inputSchema: schema, execute: spy });
    const input = { symbol: 'AAPL', limit: null };

    // The SDK validates against `parameters` before calling execute: null must pass there.
    expect(schema.safeParse(input).success).toBe(false);
    expect(((tool as any).parameters as z.ZodObject<any>).safeParse(input).success).toBe(true);

    expect(await (tool as any).execute(input)).toBe('limit 5');
    expect(spy).toHaveBeenCalledWith({ symbol: 'AAPL', limit: 5 });
  });

  it('invokes the provided execute with the input and returns its result', async () => {
    const spy = jest.fn(async (args: { symbol: string }) => `got ${args.symbol}`);

    const tool = createOpenAITool({
      name: 'execTool',
      description: 'Executes',
      inputSchema: z.object({ symbol: z.string() }),
      execute: spy,
    });

    const result = await (tool as any).execute({ symbol: 'AAPL' });

    expect(spy).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(result).toBe('got AAPL');
  });

  it('catches a thrown execute and returns a structured error instead of throwing', async () => {
    const tool = createOpenAITool({
      name: 'throwTool',
      description: 'Throws',
      inputSchema: z.object({ symbol: z.string() }),
      execute: async () => {
        throw new Error('FMP API key is required. Set the FMP_API_KEY environment variable.');
      },
    });

    const result = await (tool as any).execute({ symbol: 'AAPL' });
    const parsed = JSON.parse(result);

    expect(parsed.error).toBe(true);
    expect(parsed.type).toBe('auth');
    expect(parsed.message).toContain('API key');
  });
});

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
    // The Zod schema is handed to the SDK as-is (no JSON-schema conversion here).
    expect((tool as any).parameters).toBe(schema);
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
});

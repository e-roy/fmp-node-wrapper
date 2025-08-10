import * as OpenAIMocks from '@/__tests__/mocks/openai-agents';

describe('openai-agents mocks', () => {
  it('tool mock returns an object with given config', async () => {
    const execute = jest.fn(async () => 'ok');
    const t = OpenAIMocks.tool({
      name: 't',
      description: 'desc',
      parameters: { type: 'object', properties: {}, required: [] },
      execute,
    } as any);

    expect(t.name).toBe('t');
    expect(t.description).toBe('desc');
    expect(t.parameters).toEqual({ type: 'object', properties: {}, required: [] });

    const res = await t.execute({});
    expect(execute).toHaveBeenCalledWith({});
    expect(res).toBe('ok');
  });

  it('Agent mock constructs and exposes run that returns messages', async () => {
    const a = OpenAIMocks.Agent({ name: 'agent', instructions: 'do', tools: [] } as any);
    expect(a.name).toBe('agent');
    expect(a.instructions).toBe('do');
    expect(a.tools).toEqual([]);

    const out = await a.run({} as any);
    expect(out).toHaveProperty('messages');
    expect(Array.isArray(out.messages)).toBe(true);
    expect(out.messages[0]).toEqual({
      role: 'assistant',
      content: 'Mock response from OpenAI Agent',
    });
  });
});

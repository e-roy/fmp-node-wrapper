// Mock for @openai/agents module
export const tool = jest.fn().mockImplementation(config => ({
  name: config.name,
  description: config.description,
  parameters: config.parameters,
  execute: config.execute,
}));

export const Agent = jest.fn().mockImplementation(config => ({
  name: config.name,
  instructions: config.instructions,
  tools: config.tools,
  run: jest.fn().mockResolvedValue({
    messages: [
      {
        role: 'assistant',
        content: 'Mock response from OpenAI Agent',
      },
    ],
  }),
}));

export type Tool = {
  name: string;
  description: string;
  parameters: any;
  execute: (input: any) => Promise<string>;
};

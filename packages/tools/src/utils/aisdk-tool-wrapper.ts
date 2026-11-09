import { z } from 'zod';
import { tool } from 'ai';
import { logApiExecutionWithTiming } from './logger';
import { toToolError } from './format-response';
import { applyDefaults } from './tool-input';

interface AISDKToolConfig {
  name: string;
  description: string;
  inputSchema: z.ZodSchema;
  execute: (input: any) => Promise<string>;
}

export const createTool = (config: AISDKToolConfig) => {
  const { name, description, inputSchema, execute } = config;
  return tool({
    description,
    // `as any` avoids ai@6 tool()'s excessively-deep type instantiation on a
    // generic Zod schema; the real Zod schema is still passed at runtime.
    inputSchema: inputSchema as any,
    execute: async (input: any) => {
      try {
        // The AI SDK validates model input, but direct `execute` calls skip that, so
        // apply schema defaults (and treat `null` as "not set") here as well.
        const args = applyDefaults(inputSchema, input);
        return await logApiExecutionWithTiming(name, args, () => execute(args));
      } catch (error) {
        // Never throw out of a tool — return a structured error the model can
        // relay (e.g. a missing FMP_API_KEY, which throws from `new FMP()`).
        return toToolError(error);
      }
    },
  });
};

import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { fmpTools } from 'fmp-ai-tools/vercel-ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    // ai@6: convertToModelMessages is now async.
    messages: await convertToModelMessages(messages),
    tools: fmpTools,
    stopWhen: stepCountIs(5),
    // @ai-sdk/openai@3 defaults strictJsonSchema:true; FMP tools use optional
    // params, which OpenAI strict function schemas reject — so disable it.
    providerOptions: { openai: { strictJsonSchema: false } },
  });

  return result.toUIMessageStreamResponse();
}

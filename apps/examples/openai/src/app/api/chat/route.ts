import { Agent, run } from '@openai/agents';
import { fmpTools } from 'fmp-ai-tools/openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the latest user message
    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== 'user') {
      return Response.json({ error: 'No user message found' }, { status: 400 });
    }

    // Create an agent with the FMP tools
    const agent = new Agent({
      name: 'Stock Agent',
      model: 'gpt-4o-mini',
      tools: fmpTools,
    });

    // Run the agent with the user's message
    const result = await run(agent, userMessage.content);

    // Return the agent's response
    return Response.json({
      role: 'assistant',
      content: result.finalOutput,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

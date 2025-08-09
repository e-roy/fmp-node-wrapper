# FMP Tools - Vercel AI Example

This example demonstrates how to use FMP Tools with the Vercel AI SDK to create an AI-powered chat interface for financial data.

## Features

- **Real-time Chat Interface** - Ask questions about stocks and financial data
- **AI-Powered Responses** - Uses GPT-4 with FMP tools to provide accurate financial information
- **Tool Integration** - Automatically uses the appropriate FMP tools based on your questions
- **Streaming Responses** - Real-time streaming of AI responses with stop capability
- **Modern UI** - Clean, responsive interface built with Next.js and Tailwind CSS
- **Enhanced UX** - Enter to send messages, Shift+Enter for new lines, stop button for canceling responses

## Available Tools

The example includes access to all FMP tools:

- **Quote Tools** - Get stock quotes
- **Company Tools** - Get company profiles and information
- **Financial Tools** - Get balance sheets, income statements, cash flow statements, and financial ratios
- **Stock Tools** - Get market cap, stock splits, and dividend history
- **Market Tools** - Get market performance, sector performance, gainers, losers, and most active stocks
- **Calendar Tools** - Get earnings and economic calendars

## Getting Started

### Prerequisites

1. **FMP API Key** - Get your API key from [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/)
2. **OpenAI API Key** - Get your API key from [OpenAI](https://platform.openai.com/api-keys)

**Note**: This example uses the Vercel AI SDK v5.0.5 with AI SDK providers v2.0.3.

### Environment Variables

Create a `.env.local` file in the root of this example:

```bash
FMP_API_KEY=your_fmp_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the example.

## Example Questions

Try asking these questions in the chat:

- "What's Apple's current stock price?"
- "Show me Tesla's financial ratios"
- "What are today's top gainers?"
- "Get Microsoft's balance sheet"
- "What's the market performance today?"
- "Show me the earnings calendar for this week"

## How It Works

1. **User Input** - User asks a question about financial data
2. **AI Processing** - GPT-4 analyzes the question and determines which FMP tools to use
3. **Tool Execution** - The appropriate FMP tools are called to fetch real financial data
4. **Response Generation** - AI generates a natural language response using the fetched data
5. **Streaming Display** - Response is streamed back to the user in real-time

## Code Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts     # API route that handles chat with FMP tools
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chat interface
└── components/
    ├── chat-input.tsx       # Enhanced chat input with Enter/Stop support
    ├── chat-messages.tsx    # Chat messages display with streaming
    └── tool-info.tsx        # Tool information sidebar
```

## Key Integration Points

### API Route (`src/app/api/chat/route.ts`)

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { fmpTools } from 'fmp-ai-tools/vercel-ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
    tools: fmpTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
```

### Chat Interface (`src/app/page.tsx`)

```typescript
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const { messages, sendMessage, status, stop } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
  onFinish: message => {
    console.log('🔥 onFinish ===>', message);
  },
});
```

## Customization

You can easily customize this example by:

- **Adding more tools** - Import additional tool categories from `fmp-ai-tools/vercel-ai`
- **Changing the model** - Use different AI models supported by the Vercel AI SDK
- **Modifying the UI** - Update the components to match your design
- **Adding features** - Implement user authentication, conversation history, etc.
- **Enhancing UX** - Add loading indicators, error handling, retry mechanisms
- **Extending tools** - Create custom tools for specific financial data needs

## Learn More

- [FMP Tools Documentation](../../../packages/tools/README.md)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs/)

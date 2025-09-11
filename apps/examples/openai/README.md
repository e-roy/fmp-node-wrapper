# FMP Tools - OpenAI Example

This example demonstrates how to use FMP Tools with the OpenAI Agents SDK to create an AI-powered financial assistant.

## Features

- **AI Agent Interface** - Uses OpenAI Agents SDK for intelligent tool selection and reasoning
- **Financial Data Integration** - Access to Financial Modeling Prep (FMP) data through type-safe tools
- **Simple Chat Interface** - Clean, responsive UI built with Next.js and Tailwind CSS
- **Company Profiles** - Get detailed company information including business description, sector, industry, and key metrics

## Available Tools

This example currently includes:

- **getCompanyProfile** - Get comprehensive company profile information

Additional tools from the FMP Tools library can be easily added to expand functionality.

## Getting Started

### Prerequisites

1. **FMP API Key** - Get your API key from [Financial Modeling Prep](https://site.financialmodelingprep.com/pricing-plans?couponCode=eroy) - Link for 10% off
2. **OpenAI API Key** - Get your API key from [OpenAI](https://platform.openai.com/api-keys)

### Environment Variables

Create a `.env.local` file in the root of this example:

```bash
FMP_API_KEY=your_fmp_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

```bash
# Navigate to the project root
cd fmp-node-wrapper

# Install dependencies
pnpm install

# Navigate to the OpenAI example
cd apps/examples/openai

# Run the development server
pnpm dev
```

The app will start on [http://localhost:3001](http://localhost:3001) (different port from Vercel AI example).

## Example Questions

Try asking these questions in the chat:

- "What's Apple's company profile?"
- "Tell me about Tesla's business"
- "Get Microsoft's company information"
- "Show me Google's company profile"
- "What does Amazon do as a company?"

## How It Works

1. **User Input** - User asks a question about a company
2. **AI Agent Processing** - OpenAI Agent analyzes the question and determines if it needs to use tools
3. **Tool Execution** - The agent calls the appropriate FMP tools to fetch real financial data
4. **Response Generation** - Agent processes the data and generates a natural language response
5. **Display** - Response is shown to the user in the chat interface

## Code Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts     # API route using OpenAI Agents with FMP tools
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chat interface
└── components/
    ├── chat-input.tsx       # Chat input component
    ├── chat-messages.tsx    # Chat messages display
    └── tool-info.tsx        # Tool information sidebar
```

## Key Integration Points

### API Route (`src/app/api/chat/route.ts`)

```typescript
import { Agent, run } from '@openai/agents';
import { getCompanyProfile } from 'fmp-ai-tools/openai';

const agent = new Agent({
  model: 'gpt-4o-mini',
  instructions: 'You are a financial assistant...',
  tools: [getCompanyProfile],
});

const result = await run(agent, userMessage.content);
```

### Chat Interface (`src/app/page.tsx`)

```typescript
const sendMessage = async (content: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [...messages, userMessage] }),
  });

  const assistantMessage = await response.json();
  setMessages(prev => [...prev, assistantMessage]);
};
```

## Differences from Vercel AI Example

1. **Agent Architecture** - Uses OpenAI Agents SDK instead of Vercel AI SDK
2. **Tool Format** - Uses OpenAI's tool format with parameter schemas
3. **Response Handling** - Direct agent execution instead of streaming
4. **Port** - Runs on port 3001 to avoid conflicts with Vercel AI example

## Extending the Example

You can easily extend this example by:

1. **Adding More Tools** - Import additional tools from `fmp-ai-tools/openai`
2. **Enhanced Instructions** - Modify the agent's instructions for specialized behavior
3. **Tool Combinations** - Add tools that work together for complex financial analysis
4. **Error Handling** - Implement robust error handling and retry logic
5. **UI Improvements** - Add features like conversation history, export functionality

## Adding New Tools

To add more FMP tools to the agent:

```typescript
import {
  getCompanyProfile,
  // Add more tools as they become available
} from 'fmp-ai-tools/openai';

const agent = new Agent({
  model: 'gpt-4o-mini',
  instructions: '...',
  tools: [
    getCompanyProfile,
    // Add more tools here
  ],
});
```

## Learn More

- [FMP Tools Documentation](../../../packages/tools/README.md)
- [OpenAI Agents SDK Documentation](https://github.com/openai/agents)
- [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

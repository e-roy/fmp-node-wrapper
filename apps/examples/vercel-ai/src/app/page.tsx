'use client';

import { useChat } from '@ai-sdk/react';
import { ChatInput } from '@/components/chat-input';
import { ChatMessages } from '@/components/chat-messages';
import { ToolInfo } from '@/components/tool-info';
import { DefaultChatTransport } from 'ai';

export default function Home() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onFinish: message => {
      console.log('🔥 onFinish ===>', message);
    },
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">FMP Tools - Vercel AI Example</h1>
          <p className="text-gray-600 mt-1">
            Ask questions about stocks, financial data, and market information using AI-powered
            tools
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full p-6 gap-6">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 max-h-[calc(100vh-240px)] overflow-y-auto">
            <ChatMessages messages={messages} isLoading={status === 'streaming'} />
          </div>

          <div className="mt-4">
            <ChatInput
              onSendMessage={message => sendMessage({ text: message })}
              isLoading={status === 'streaming'}
              onStop={stop}
            />
          </div>
        </div>

        {/* Tool Info Sidebar */}
        <div className="w-80 max-h-[calc(100vh-170px)] overflow-y-auto">
          <ToolInfo />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChatInput } from '@/components/chat-input';
import { ChatMessages } from '@/components/chat-messages';
import { ToolInfo } from '@/components/tool-info';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const assistantMessage = await response.json();

      setMessages(prev => [
        ...prev,
        {
          ...assistantMessage,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">FMP Tools - OpenAI Example</h1>
          <p className="text-gray-600 mt-1">
            Ask questions about stocks, financial data, and market information using OpenAI Agents
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full p-6 gap-6">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 max-h-[calc(100vh-240px)] overflow-y-auto">
            <ChatMessages messages={messages} isLoading={isLoading} />
          </div>

          <div className="mt-4">
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
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

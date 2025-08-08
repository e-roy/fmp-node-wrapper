'use client';

import { UIMessage } from '@ai-sdk/react';

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <div className="whitespace-pre-wrap">
              {message.parts
                ?.map((part, _index) => (part.type === 'text' ? part.text : null))
                .join('')}
            </div>
            {message.parts?.some(part => part.type === 'tool-call') && (
              <div className="mt-2 text-sm opacity-75">
                <div className="font-semibold">Tools used:</div>
                {message.parts
                  ?.filter(part => part.type === 'tool-call')
                  .map((tool, index) => (
                    <div key={index} className="ml-2">
                      • {(tool as any).toolName}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span>Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

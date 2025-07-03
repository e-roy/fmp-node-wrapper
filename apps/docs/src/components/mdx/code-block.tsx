'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showCopyButton?: boolean;
}

// Minimal function to handle MDX template literal indentation stripping
function handleIndentation(code: string): string {
  const lines = code.split('\n');

  // Find the minimum indentation (excluding empty lines)
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim() === '') continue; // Skip empty lines
    const indent = line.length - line.trimStart().length;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }

  // If no indentation found or all lines are empty, return as is
  if (minIndent === Infinity || minIndent === 0) {
    return code;
  }

  // Remove the minimum indentation from all lines
  const result = lines
    .map(line => {
      if (line.trim() === '') return line; // Keep empty lines as is
      return line.slice(minIndent);
    })
    .join('\n');

  return result;
}

export function CodeBlock({
  children,
  language = 'typescript',
  filename,
  showCopyButton = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Handle the indentation issue caused by MDX template literal processing
  const processedCode = handleIndentation(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-6 group relative">
      {filename && (
        <div className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-t-lg text-sm font-mono flex justify-between items-center">
          <span>{filename}</span>
          {showCopyButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className={cn(
                'opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 text-neutral-300 hover:text-white hover:bg-neutral-700',
              )}
              title="Copy code"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            </Button>
          )}
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
            fontSize: '0.875rem',
          }}
          showLineNumbers
        >
          {processedCode}
        </SyntaxHighlighter>
        {showCopyButton && !filename && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className={cn(
              'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-neutral-800/80 hover:bg-neutral-700 h-8 w-8 text-neutral-300 hover:text-white',
            )}
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}

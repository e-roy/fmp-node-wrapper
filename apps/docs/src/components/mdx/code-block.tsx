'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Copy, Check } from 'lucide-react';

type LazyHighlighterProps = {
  language?: string;
  filename?: string;
  code: string;
};

export interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showCopyButton?: boolean;
}

// Minimal function to handle MDX template literal indentation stripping
function handleIndentation(code: string): string {
  if (typeof code !== 'string') {
    return String(code);
  }
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

function normalizeLanguage(lang?: string): string | undefined {
  if (!lang) return undefined;
  const lower = lang.toLowerCase();
  if (lower === 'env' || lower === 'sh' || lower === 'shell') return 'bash';
  if (lower === 'ts') return 'typescript';
  if (lower === 'js') return 'javascript';
  if (lower === 'gitignore') return 'bash';
  return lower;
}

// Friendly label for the right-aligned language tag.
function langLabel(lang?: string): string {
  const n = normalizeLanguage(lang);
  switch (n) {
    case 'typescript':
      return 'TypeScript';
    case 'javascript':
      return 'JavaScript';
    case 'tsx':
      return 'TSX';
    case 'bash':
      return 'bash';
    case 'json':
      return 'JSON';
    case 'diff':
      return 'diff';
    default:
      return n ? n : '';
  }
}

export function CodeBlock({
  children,
  language = 'typescript',
  filename,
  showCopyButton = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const processedCode = handleIndentation(children);
  const tabLabel = filename || langLabel(language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedCode);
    } catch (err) {
      console.error('Failed to copy code:', err);
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="f-code" style={{ margin: '6px 0' }}>
      <div className="f-code-head">
        <span className="f-code-tab on">{tabLabel}</span>
        <span className="f-code-lang">
          {langLabel(language)}
          {showCopyButton && (
            <button
              className="f-copybtn"
              style={{ width: 26, height: 26 }}
              onClick={handleCopy}
              title="Copy code"
              aria-label="Copy code"
              type="button"
            >
              {copied ? (
                <span className="f-ok">
                  <Check size={12} />
                </span>
              ) : (
                <Copy size={13} />
              )}
            </button>
          )}
        </span>
      </div>
      <LazyHighlighter
        language={normalizeLanguage(language)}
        filename={filename}
        code={processedCode}
      />
    </div>
  );
}

const LazyHighlighter = dynamic<LazyHighlighterProps>(
  () => import('@/components/mdx/lazy-highlighter').then(m => m.LazyHighlighter),
  { ssr: false },
);

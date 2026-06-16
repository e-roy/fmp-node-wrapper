'use client';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';

// Register a minimal set of languages to keep bundle size small
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('diff', diff);

// Custom Prism theme mapped to the redesign token colors.
// keyword -> violet, string -> emerald, fn/prop -> blue, number -> amber,
// comment -> muted italic, plain -> t1/t2. Background is transparent so the
// surrounding .f-code window (var(--code)) shows through.
const base = {
  color: 'var(--t1)',
  background: 'transparent',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  lineHeight: 1.75,
};

const fmpPrismTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': base,
  'pre[class*="language-"]': base,
  comment: { color: 'var(--t3)', fontStyle: 'italic' },
  prolog: { color: 'var(--t3)' },
  doctype: { color: 'var(--t3)' },
  cdata: { color: 'var(--t3)' },
  punctuation: { color: 'var(--t2)' },
  property: { color: 'var(--blue)' },
  tag: { color: 'var(--blue)' },
  boolean: { color: 'var(--amber)' },
  number: { color: 'var(--amber)' },
  constant: { color: 'var(--amber)' },
  symbol: { color: 'var(--amber)' },
  deleted: { color: 'var(--down)' },
  selector: { color: 'var(--acc)' },
  'attr-name': { color: 'var(--blue)' },
  string: { color: 'var(--acc)' },
  char: { color: 'var(--acc)' },
  builtin: { color: 'var(--blue)' },
  inserted: { color: 'var(--acc)' },
  operator: { color: 'var(--t2)' },
  entity: { color: 'var(--t1)' },
  url: { color: 'var(--acc)' },
  variable: { color: 'var(--t1)' },
  atrule: { color: 'var(--vio)' },
  'attr-value': { color: 'var(--acc)' },
  keyword: { color: 'var(--vio)' },
  function: { color: 'var(--blue)' },
  'class-name': { color: 'var(--blue)' },
  regex: { color: 'var(--amber)' },
  important: { color: 'var(--down)', fontWeight: 'bold' },
};

export function LazyHighlighter({
  language,
  filename,
  code,
}: {
  language?: string;
  filename?: string;
  code: string;
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={fmpPrismTheme}
      customStyle={{
        margin: 0,
        padding: '18px 20px',
        background: 'transparent',
        borderRadius: 0,
        fontSize: '13px',
        lineHeight: 1.75,
      }}
      codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

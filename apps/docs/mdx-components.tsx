import React from 'react';
import { CodeBlock, CodeBlockProps } from '@/components/mdx/code-block';
import {
  ApiTable,
  ApiTableProps,
  ParameterTable,
  ParameterTableProps,
} from '@/components/mdx/api-table';

type MDXComponents = Record<
  string,
  | React.ComponentType<Record<string, unknown>>
  | React.ComponentType<CodeBlockProps>
  | React.ComponentType<ApiTableProps>
  | React.ComponentType<ParameterTableProps>
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: React.ComponentProps<'h1'>) => (
      <h1 className="text-4xl font-bold mb-6" {...props} />
    ),
    h2: (props: React.ComponentProps<'h2'>) => (
      <h2 className="text-2xl font-semibold mb-4" {...props} />
    ),
    h3: (props: React.ComponentProps<'h3'>) => (
      <h3 className="text-xl font-semibold mb-3" {...props} />
    ),
    p: (props: React.ComponentProps<'p'>) => (
      <p className="mb-4 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    ul: (props: React.ComponentProps<'ul'>) => (
      <ul className="list-disc list-inside mb-4" {...props} />
    ),
    ol: (props: React.ComponentProps<'ol'>) => (
      <ol className="list-decimal list-inside mb-4" {...props} />
    ),
    li: (props: React.ComponentProps<'li'>) => <li className="mb-1" {...props} />,
    code: (props: React.ComponentProps<'code'>) => (
      <code
        className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),
    pre: (props: React.ComponentProps<'pre'>) => <pre className="mb-4" {...props} />,
    blockquote: (props: React.ComponentProps<'blockquote'>) => (
      <blockquote
        className="border-l-4 border-blue-500 pl-4 italic text-neutral-600 dark:text-neutral-400 mb-4"
        {...props}
      />
    ),
    table: (props: React.ComponentProps<'table'>) => (
      <div className="overflow-x-auto mb-4">
        <table
          className="min-w-full border border-neutral-300 dark:border-neutral-600 rounded-lg border-collapse"
          {...props}
        />
      </div>
    ),
    thead: (props: React.ComponentProps<'thead'>) => <thead {...props} />,
    tbody: (props: React.ComponentProps<'tbody'>) => <tbody {...props} />,
    tr: (props: React.ComponentProps<'tr'>) => (
      <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700" {...props} />
    ),
    th: (props: React.ComponentProps<'th'>) => (
      <th
        className="px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800"
        {...props}
      />
    ),
    td: (props: React.ComponentProps<'td'>) => (
      <td
        className="px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-600"
        {...props}
      />
    ),
    // Custom components
    CodeBlock,
    ApiTable,
    ParameterTable,
    ...components,
  };
}

import React from 'react';
import { CodeBlock, CodeBlockProps } from '@/components/mdx/code-block';
import {
  ApiTable,
  ApiTableProps,
  ParameterTable,
  ParameterTableProps,
} from '@/components/mdx/api-table';
import { Callout } from '@/components/docs/callout';

type MDXComponents = Record<
  string,
  | React.ComponentType<Record<string, unknown>>
  | React.ComponentType<CodeBlockProps>
  | React.ComponentType<ApiTableProps>
  | React.ComponentType<ParameterTableProps>
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings/paragraphs are styled by the global `.f-prose` rules; ids come
    // from rehype-slug and flow through props for scroll-spy/TOC anchoring.
    h1: (props: React.ComponentProps<'h1'>) => <h1 {...props} />,
    h2: (props: React.ComponentProps<'h2'>) => <h2 {...props} />,
    h3: (props: React.ComponentProps<'h3'>) => <h3 {...props} />,
    h4: (props: React.ComponentProps<'h4'>) => (
      <h4 className="text-[15px] font-semibold text-t1" {...props} />
    ),
    p: (props: React.ComponentProps<'p'>) => <p {...props} />,
    ul: (props: React.ComponentProps<'ul'>) => (
      <ul
        className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] text-t2 marker:text-t3"
        {...props}
      />
    ),
    ol: (props: React.ComponentProps<'ol'>) => (
      <ol
        className="list-decimal pl-5 flex flex-col gap-1.5 text-[15px] text-t2 marker:text-t3"
        {...props}
      />
    ),
    li: (props: React.ComponentProps<'li'>) => <li {...props} />,
    a: (props: React.ComponentProps<'a'>) => <a {...props} />,
    strong: (props: React.ComponentProps<'strong'>) => (
      <strong className="font-semibold text-t1" {...props} />
    ),
    hr: (props: React.ComponentProps<'hr'>) => (
      <hr className="border-0 border-t border-border my-2" {...props} />
    ),
    blockquote: (props: React.ComponentProps<'blockquote'>) => (
      <blockquote className="border-l-2 border-acc-line pl-4 italic text-t3" {...props} />
    ),
    code: ({ className, ...props }: React.ComponentProps<'code'>) => {
      // Fenced/block code carries a `language-*` class; inline code does not.
      const isBlock = typeof className === 'string' && className.includes('language-');
      if (isBlock) {
        return <code className={className} {...props} />;
      }
      return <code className="f-inline-code" {...props} />;
    },
    pre: (props: React.ComponentProps<'pre'>) => (
      <pre
        className="f-code overflow-x-auto p-[18px] font-mono text-[13px] leading-[1.75] text-t2"
        {...props}
      />
    ),
    table: (props: React.ComponentProps<'table'>) => (
      <div className="f-tablewrap" style={{ margin: '6px 0' }}>
        <table className="f-table" {...props} />
      </div>
    ),
    thead: (props: React.ComponentProps<'thead'>) => <thead {...props} />,
    tbody: (props: React.ComponentProps<'tbody'>) => <tbody {...props} />,
    tr: (props: React.ComponentProps<'tr'>) => <tr {...props} />,
    th: (props: React.ComponentProps<'th'>) => <th {...props} />,
    td: (props: React.ComponentProps<'td'>) => <td {...props} />,
    // Custom components
    CodeBlock,
    ApiTable,
    ParameterTable,
    Callout,
    ...components,
  };
}

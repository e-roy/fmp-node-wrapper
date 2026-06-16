import { DocsLayout } from '@/components/docs/docs-layout';
import type { NavGroup } from '@/components/docs/docs-sidebar';

const toolsNavigationGroups: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Tools Overview', href: '/docs/tools' },
      { name: 'Vercel AI SDK', href: '/docs/tools/vercel-ai' },
      { name: 'OpenAI Agents', href: '/docs/tools/openai' },
    ],
  },
  {
    title: 'Tool Reference',
    items: [{ name: 'Tool Categories', href: '/docs/tools/categories' }],
  },
  {
    title: 'Advanced',
    items: [
      { name: 'Best Practices', href: '/docs/tools/best-practices' },
      { name: 'Error Handling', href: '/docs/tools/error-handling' },
    ],
  },
];

export default function ToolsDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout section="tools" accent="violet" groups={toolsNavigationGroups}>
      {children}
    </DocsLayout>
  );
}

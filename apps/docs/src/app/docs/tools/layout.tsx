'use client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const toolsNavigationGroups = [
  {
    title: 'Documentation',
    items: [
      { name: 'Tools Overview', href: '/docs/tools' },
      { name: 'Categories', href: '/docs/tools/categories' },
      { name: 'Vercel AI SDK', href: '/docs/tools/vercel-ai' },
      { name: 'OpenAI Provider', href: '/docs/tools/openai' },
    ],
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
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-purple-50 dark:bg-purple-950/20 border-b border-purple-200 dark:border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                ← Back to Home
              </Link>
              <div className="h-4 w-px bg-purple-300 dark:bg-purple-700"></div>
              <h1 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                FMP Tools Documentation
              </h1>
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">AI Tools for FMP API</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-8">
              <div className="space-y-6">
                {toolsNavigationGroups.map(group => (
                  <div key={group.title}>
                    <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                      {group.title}
                    </h3>
                    <ul className="space-y-1">
                      {group.items.map(item => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={`px-3 py-2 text-sm block rounded-md transition-colors ${
                                isActive
                                  ? 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/50 font-medium'
                                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                              }`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <Card>
              <CardContent>{children}</CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

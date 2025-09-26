'use client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/footer';

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
    <div className="h-full flex flex-col">
      {/* Header - Fixed at top */}
      <header className="bg-purple-50 dark:bg-purple-950/20 border-b border-purple-200 dark:border-purple-800 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
              <Link
                href="/"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm lg:text-base whitespace-nowrap"
              >
                ← Back to Home
              </Link>
              <div className="h-4 w-px bg-purple-300 dark:bg-purple-700 hidden sm:block"></div>
              <h1 className="text-base lg:text-lg font-semibold text-purple-900 dark:text-purple-100 truncate">
                FMP Tools Documentation
              </h1>
            </div>
            <div className="text-xs lg:text-sm text-purple-600 dark:text-purple-400 hidden sm:block">
              AI Tools for FMP API
            </div>
          </div>
        </div>
      </header>

      {/* Main content area - Takes remaining height */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop Layout - Side by side with separate scrolls */}
        <div className="hidden lg:flex h-full">
          {/* Sidebar - Fixed width with own scroll */}
          <aside className="w-[25vw] flex-shrink-0 border-r border-neutral-200 dark:border-neutral-700 h-full">
            <div className="h-full overflow-y-auto">
              <div className="p-6 space-y-6 max-w-xs ml-auto">
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
            </div>
          </aside>

          {/* Content - Flexible width with own scroll */}
          <main className="flex-1 overflow-y-auto h-full">
            <div className="p-6 max-w-6xl mx-auto">
              <Card>
                <CardContent>{children}</CardContent>
              </Card>
            </div>
            <Footer />
          </main>
        </div>

        {/* Mobile Layout - Single scroll area */}
        <div className="lg:hidden h-full overflow-y-auto">
          {/* Mobile Navigation */}
          <div className="p-4 space-y-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
            {toolsNavigationGroups.map(group => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
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

          {/* Mobile Content */}
          <div className="sm:p-4 max-w-6xl mx-auto">
            <Card>
              <CardContent>{children}</CardContent>
            </Card>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

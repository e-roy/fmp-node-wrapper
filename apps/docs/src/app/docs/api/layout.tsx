'use client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/footer';

const apiNavigationGroups = [
  {
    title: 'Documentation',
    items: [
      { name: 'Getting Started', href: '/docs/api/getting-started' },
      { name: 'Configuration', href: '/docs/api/configuration' },
      { name: 'API Reference', href: '/docs/api' },
      { name: 'Examples', href: '/docs/api/examples' },
    ],
  },
  {
    title: 'Quotes',
    items: [{ name: 'Quote Endpoints', href: '/docs/api/quote' }],
  },
  {
    title: 'Asset Classes',
    items: [
      { name: 'Stock Endpoints', href: '/docs/api/stock' },
      { name: 'Financial Endpoints', href: '/docs/api/financial' },
      { name: 'ETF Endpoints', href: '/docs/api/etf' },
      { name: 'Mutual Fund Endpoints', href: '/docs/api/mutual-fund' },
    ],
  },
  {
    title: 'Market Data',
    items: [
      { name: 'Market Endpoints', href: '/docs/api/market' },
      { name: 'Economic Endpoints', href: '/docs/api/economic' },
      { name: 'News Endpoints', href: '/docs/api/news' },
    ],
  },
  {
    title: 'Information',
    items: [
      { name: 'List Endpoints', href: '/docs/api/list' },
      { name: 'Calendar Endpoints', href: '/docs/api/calendar' },
      { name: 'Company Endpoints', href: '/docs/api/company' },
      { name: 'Screener Endpoints', href: '/docs/api/screener' },
      { name: 'Senate & House Trading', href: '/docs/api/senate-house' },
      { name: 'Institutional Endpoints', href: '/docs/api/institutional' },
      { name: 'Insider Endpoints', href: '/docs/api/insider' },
      { name: 'SEC Endpoints', href: '/docs/api/sec' },
    ],
  },
  {
    title: 'Resources',
    items: [{ name: 'Helper Utilities', href: '/docs/api/helpers' }],
  },
];

export default function APIDocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col">
      {/* Header - Fixed at top */}
      <header className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-800 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm lg:text-base whitespace-nowrap"
              >
                ← Back to Home
              </Link>
              <div className="h-4 w-px bg-blue-300 dark:bg-blue-700 hidden sm:block"></div>
              <h1 className="text-base lg:text-lg font-semibold text-blue-900 dark:text-blue-100 truncate">
                FMP Node API Documentation
              </h1>
            </div>
            <div className="text-xs lg:text-sm text-blue-600 dark:text-blue-400 hidden sm:block">
              Core API Wrapper
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
                {apiNavigationGroups.map(group => (
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
                                  ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50 font-medium'
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
            {apiNavigationGroups.map(group => (
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
                              ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50 font-medium'
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

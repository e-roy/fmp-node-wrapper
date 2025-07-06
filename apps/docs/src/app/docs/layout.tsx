'use client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationGroups = [
  {
    title: 'Documentation',
    items: [
      { name: 'Getting Started', href: '/docs/getting-started' },
      { name: 'API Reference', href: '/docs/api' },
    ],
  },
  {
    title: 'Asset Classes',
    items: [
      { name: 'Stock Endpoints', href: '/docs/api/stock' },
      { name: 'Financial Endpoints', href: '/docs/api/financial' },
      { name: 'Forex Endpoints', href: '/docs/api/forex' },
      { name: 'Crypto Endpoints', href: '/docs/api/crypto' },
      { name: 'ETF Endpoints', href: '/docs/api/etf' },
      { name: 'Mutual Fund Endpoints', href: '/docs/api/mutual-fund' },
      { name: 'Bond Endpoints', href: '/docs/api/bond' },
    ],
  },
  {
    title: 'Market Data',
    items: [
      { name: 'Market Endpoints', href: '/docs/api/market' },
      { name: 'Economic Endpoints', href: '/docs/api/economic' },
    ],
  },
  {
    title: 'Information',
    items: [
      { name: 'List Endpoints', href: '/docs/api/list' },
      { name: 'Calendar Endpoints', href: '/docs/api/calendar' },
      { name: 'Company Endpoints', href: '/docs/api/company' },
    ],
  },
  {
    title: 'Resources',
    items: [{ name: 'Examples', href: '/docs/examples' }],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-8">
              <div className="space-y-6">
                {navigationGroups.map(group => (
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

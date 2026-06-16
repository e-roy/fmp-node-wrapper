import { DocsLayout } from '@/components/docs/docs-layout';
import type { NavGroup } from '@/components/docs/docs-sidebar';

const apiNavigationGroups: NavGroup[] = [
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
      { name: 'Aftermarket Endpoints', href: '/docs/api/aftermarket' },
      { name: 'Economic Endpoints', href: '/docs/api/economic' },
      { name: 'News Endpoints', href: '/docs/api/news' },
    ],
  },
  {
    title: 'Analysis',
    items: [{ name: 'Analyst Endpoints', href: '/docs/api/analyst' }],
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
  return (
    <DocsLayout section="api" accent="emerald" groups={apiNavigationGroups}>
      {children}
    </DocsLayout>
  );
}

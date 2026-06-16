'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, FileText, ArrowLeft } from 'lucide-react';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <SiteNav />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-acc-dim border border-acc-line">
              <span className="text-2xl font-bold text-acc">404</span>
            </div>
            <h1 className="text-3xl font-bold text-t1 mb-2">Page Not Found</h1>
            <p className="text-t2 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
              moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/docs/api">
                <FileText className="w-4 h-4 mr-2" />
                Browse Documentation
              </Link>
            </Button>

            <Button variant="ghost" className="w-full text-t2" onClick={handleGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-t3">
              If you believe this is an error, please{' '}
              <a
                href="https://github.com/e-roy/fmp-node-wrapper/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-acc hover:underline"
              >
                report an issue
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

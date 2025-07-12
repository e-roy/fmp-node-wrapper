'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, FileText, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">404</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted,
            or you entered the wrong URL.
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
            <Link href="/docs">
              <FileText className="w-4 h-4 mr-2" />
              Browse Documentation
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full text-neutral-600 dark:text-neutral-400"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            If you believe this is an error, please{' '}
            <a
              href="https://github.com/e-roy/fmp-node-wrapper/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              report an issue
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

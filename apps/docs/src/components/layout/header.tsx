'use client';

import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                FMP Node Wrapper
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/docs"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Documentation
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            >
              <a
                href="https://github.com/e-roy/fmp-node-wrapper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-8 w-8" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

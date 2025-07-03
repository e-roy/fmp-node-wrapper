import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-neutral-600 dark:text-neutral-300">
              FMP Node Wrapper
            </span>
          </div>

          <div className="flex space-x-6 text-sm text-neutral-500 dark:text-neutral-400">
            <a
              href="https://github.com/e-roy/fmp-node-wrapper"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://site.financialmodelingprep.com/developer/docs/stable"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              FMP API Docs
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

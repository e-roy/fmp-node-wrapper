import React from 'react';

const GITHUB_URL = 'https://github.com/e-roy/fmp-node-wrapper';
const ISSUES_URL = 'https://github.com/e-roy/fmp-node-wrapper/issues';
const NPM_URL = 'https://www.npmjs.com/package/fmp-node-api';
const FMP_DOCS_URL = 'https://site.financialmodelingprep.com/developer/docs/stable';

export function Footer() {
  return (
    <footer className="f-foot">
      <span>MIT © 2026 — Independent project, not affiliated with Financial Modeling Prep</span>
      <span className="links">
        <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
          npm
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
          Issues
        </a>
        <a href={FMP_DOCS_URL} target="_blank" rel="noopener noreferrer">
          FMP API Docs
        </a>
      </span>
    </footer>
  );
}

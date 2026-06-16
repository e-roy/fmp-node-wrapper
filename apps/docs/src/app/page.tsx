import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { SiteNav } from '@/components/layout/site-nav';
import { Footer } from '@/components/layout/footer';
import { InstallPill } from '@/components/layout/pills';
import { Tick } from '@/components/layout/brand';
import { InteractiveCodeBox } from '@/components/landing/interactive-code-box';

const AFFILIATE_URL =
  'https://site.financialmodelingprep.com/pricing-plans?couponCode=eroy';

function HeroAffiliate() {
  return (
    <a
      href={AFFILIATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 22,
        padding: '7px 8px 7px 7px',
        borderRadius: 99,
        border: '1px solid var(--acc-line)',
        background: 'var(--acc-dim)',
        fontSize: 13,
        color: 'var(--t2)',
        alignSelf: 'flex-start',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--acc)',
          background: 'oklch(0.78 0.14 163 / 0.18)',
          borderRadius: 99,
          padding: '2px 9px',
        }}
      >
        10% OFF
      </span>
      <span>
        Get your FMP API key with code{' '}
        <span style={{ color: 'var(--t1)', fontFamily: 'var(--font-mono)' }}>eroy</span>
      </span>
      <span style={{ color: 'var(--acc)', display: 'inline-flex' }}>
        <ArrowRight size={15} />
      </span>
    </a>
  );
}

const STATS: Array<[string, string]> = [
  ['16', 'API modules'],
  ['100%', 'typed responses'],
  ['45+', 'endpoint tests'],
  ['2', 'packages, one ecosystem'],
];

const WHY: Array<[string, string, string]> = [
  ['TS', 'Type safe', 'Every response and parameter is fully typed.'],
  ['{}', 'Easy to use', 'One client, sixteen modules, zero boilerplate.'],
  ['$_', 'High performance', 'Thin wrapper — optimized for speed and efficiency.'],
  ['AI', 'AI ready', 'Tool definitions for Vercel AI SDK & OpenAI Agents SDK.'],
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteNav active="api" />

      {/* split hero with interactive code box */}
      <div className="f-hero">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="f-chips" style={{ marginBottom: 22 }}>
            <span className="f-chip">MIT</span>
            <span className="f-chip">TypeScript 5</span>
            <span className="f-chip">Node 20+</span>
          </div>
          <h1 style={{ textWrap: 'balance' }}>
            The Node.js toolkit for Financial Modeling Prep
          </h1>
          <p
            style={{
              fontSize: 17,
              color: 'var(--t2)',
              marginTop: 18,
              maxWidth: 480,
              textWrap: 'pretty',
            }}
          >
            One typed client for quotes, financials, and market data — plus ready-made tools for
            AI SDK integrations.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 28,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link className="f-btn primary" href="/docs/api">
              Get started →
            </Link>
            <Link className="f-btn ghost" href="/docs/tools">
              AI Tools docs
            </Link>
            <a
              className="f-btn ghost"
              href="https://github.com/e-roy/fmp-node-wrapper"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star size={15} /> Star on GitHub
            </a>
          </div>
          <InstallPill
            command="npm install fmp-node-api"
            style={{ marginTop: 16, alignSelf: 'flex-start' }}
          />
          <HeroAffiliate />
        </div>
        <div>
          <InteractiveCodeBox />
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--t3)',
              marginTop: 12,
              textAlign: 'center',
            }}
          >
            Pick an example, then press Run — illustrative responses.
          </p>
        </div>
      </div>

      {/* stats strip */}
      <div className="f-statsband">
        <div className="f-stats">
          {STATS.map(([n, l]) => (
            <div className="f-stat" key={l}>
              <div className="num">{n}</div>
              <div className="lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* package cards */}
      <div className="f-pkgs">
        <div className="f-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="f-glyph" style={{ color: 'var(--acc)' }}>
              $_
            </span>
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>
                fmp-node-api
              </h2>
              <p style={{ fontSize: 13.5, color: 'var(--t3)' }}>
                Core API wrapper for direct FMP access
              </p>
            </div>
            <span className="f-chip acc" style={{ marginLeft: 'auto' }}>
              v0.2.x
            </span>
          </div>
          <ul className="f-check">
            <li>
              <Tick /> Complete TypeScript support
            </li>
            <li>
              <Tick /> All FMP stable endpoints covered
            </li>
            <li>
              <Tick /> Built-in validation &amp; error handling
            </li>
            <li>
              <Tick /> Modular design — import what you need
            </li>
          </ul>
          <InstallPill
            command="npm install fmp-node-api"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          />
          <Link href="/docs/api" style={{ color: 'var(--acc)', fontSize: 14, fontWeight: 550 }}>
            API documentation →
          </Link>
        </div>

        <div className="f-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="f-glyph" style={{ color: 'var(--vio)' }}>
              AI
            </span>
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>
                fmp-ai-tools
              </h2>
              <p style={{ fontSize: 13.5, color: 'var(--t3)' }}>
                Financial tools for LLM integrations
              </p>
            </div>
            <span className="f-chip vio" style={{ marginLeft: 'auto' }}>
              v0.2.x
            </span>
          </div>
          <ul className="f-check vio">
            <li>
              <Tick violet /> Vercel AI SDK integration
            </li>
            <li>
              <Tick violet /> OpenAI Agents SDK integration
            </li>
            <li>
              <Tick violet /> Ready-to-use tool definitions
            </li>
            <li>
              <Tick violet /> Chatbot &amp; assistant ready
            </li>
          </ul>
          <InstallPill
            command="npm install fmp-ai-tools"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          />
          <Link href="/docs/tools" style={{ color: 'var(--vio)', fontSize: 14, fontWeight: 550 }}>
            Tools documentation →
          </Link>
        </div>
      </div>

      {/* why grid */}
      <div className="f-whywrap">
        <p className="f-sectionlabel" style={{ marginBottom: 22 }}>
          Why this wrapper
        </p>
        <div className="f-why">
          {WHY.map(([g, t, d]) => (
            <div key={t} style={{ borderTop: '1px solid var(--line2)', paddingTop: 18 }}>
              <span
                className="f-glyph"
                style={{ width: 32, height: 32, fontSize: 11.5, marginBottom: 12 }}
              >
                {g}
              </span>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>{t}</h3>
              <p
                style={{ fontSize: 13.5, color: 'var(--t3)', marginTop: 4, textWrap: 'pretty' }}
              >
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

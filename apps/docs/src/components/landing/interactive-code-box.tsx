'use client';

import React, { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Syntax span helpers (match the .tk/.ts/.tf/.tn/.tc/.tp token colors).
const K = ({ children }: { children: React.ReactNode }) => <span className="tk">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="ts">{children}</span>;
const Fn = ({ children }: { children: React.ReactNode }) => <span className="tf">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="tn">{children}</span>;
const C = ({ children }: { children: React.ReactNode }) => <span className="tc">{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span className="tp">{children}</span>;

type Example = {
  id: string;
  label: string;
  dot: 'acc' | 'ai';
  file: string;
  resFile: string;
  request: () => React.ReactNode;
  response: () => React.ReactNode;
  raw: string;
};

const EXAMPLES: Example[] = [
  {
    id: 'quote',
    label: 'Quote',
    dot: 'acc',
    file: 'quote.ts',
    resFile: 'quote.json',
    raw: `import { FMP } from 'fmp-node-api';

const fmp = new FMP();

// real-time quote — stocks, crypto, forex, ETFs
const quote = await fmp.quote.getQuote('AAPL');
console.log(quote.data?.price);`,
    request: () => (
      <>
        <K>import</K> {'{ '}
        <P>FMP</P>
        {' }'} <K>from</K> <S>&apos;fmp-node-api&apos;</S>;{'\n'}
        {'\n'}
        <K>const</K> <P>fmp</P> = <K>new</K> <Fn>FMP</Fn>();{'\n'}
        {'\n'}
        <C>{'// real-time quote — stocks, crypto, forex, ETFs'}</C>
        {'\n'}
        <K>const</K> <P>quote</P> = <K>await</K> <P>fmp</P>.<Fn>quote</Fn>.<Fn>getQuote</Fn>(
        <S>&apos;AAPL&apos;</S>);{'\n'}
        <P>console</P>.<Fn>log</Fn>(<P>quote</P>.<Fn>data</Fn>?.<Fn>price</Fn>);
      </>
    ),
    response: () => (
      <>
        {'{'}
        {'\n'}
        {'  '}
        <Fn>success</Fn>: <K>true</K>,{'\n'}
        {'  '}
        <Fn>data</Fn>: {'{'}
        {'\n'}
        {'    '}
        <Fn>symbol</Fn>: <S>&apos;AAPL&apos;</S>,{'\n'}
        {'    '}
        <Fn>name</Fn>: <S>&apos;Apple Inc.&apos;</S>,{'\n'}
        {'    '}
        <Fn>price</Fn>: <N>150.25</N>,{'\n'}
        {'    '}
        <Fn>changesPercentage</Fn>: <N>2.15</N>,{'\n'}
        {'    '}
        <Fn>marketCap</Fn>: <N>2375000000000</N>,{'\n'}
        {'    '}
        <Fn>exchange</Fn>: <S>&apos;NASDAQ&apos;</S>
        {'\n'}
        {'  '}
        {'}'},{'\n'}
        {'  '}
        <Fn>status</Fn>: <N>200</N>
        {'\n'}
        {'}'}
      </>
    ),
  },
  {
    id: 'financials',
    label: 'Financials',
    dot: 'acc',
    file: 'financials.ts',
    resFile: 'income.json',
    raw: `// annual income statement, most recent year
const income = await fmp.financial.getIncomeStatement({
  symbol: 'AAPL',
  period: 'annual',
  limit: 1,
});`,
    request: () => (
      <>
        <C>{'// annual income statement, most recent year'}</C>
        {'\n'}
        <K>const</K> <P>income</P> = <K>await</K> <P>fmp</P>.<Fn>financial</Fn>.
        <Fn>getIncomeStatement</Fn>({'{'}
        {'\n'}
        {'  '}
        <Fn>symbol</Fn>: <S>&apos;AAPL&apos;</S>,{'\n'}
        {'  '}
        <Fn>period</Fn>: <S>&apos;annual&apos;</S>,{'\n'}
        {'  '}
        <Fn>limit</Fn>: <N>1</N>,{'\n'}
        {'}'});
      </>
    ),
    response: () => (
      <>
        {'{'}
        {'\n'}
        {'  '}
        <Fn>success</Fn>: <K>true</K>,{'\n'}
        {'  '}
        <Fn>data</Fn>: [{'{'}
        {'\n'}
        {'    '}
        <Fn>date</Fn>: <S>&apos;2024-09-28&apos;</S>,{'\n'}
        {'    '}
        <Fn>revenue</Fn>: <N>391035000000</N>,{'\n'}
        {'    '}
        <Fn>grossProfit</Fn>: <N>180683000000</N>,{'\n'}
        {'    '}
        <Fn>netIncome</Fn>: <N>93736000000</N>,{'\n'}
        {'    '}
        <Fn>eps</Fn>: <N>6.11</N>
        {'\n'}
        {'  '}
        {'}'}],{'\n'}
        {'  '}
        <Fn>status</Fn>: <N>200</N>
        {'\n'}
        {'}'}
      </>
    ),
  },
  {
    id: 'screener',
    label: 'Screener',
    dot: 'acc',
    file: 'screener.ts',
    resFile: 'screener.json',
    raw: `// large-cap technology stocks
const results = await fmp.screener.getScreener({
  marketCapMoreThan: 1_000_000_000_000,
  sector: 'Technology',
  limit: 3,
});`,
    request: () => (
      <>
        <C>{'// large-cap technology stocks'}</C>
        {'\n'}
        <K>const</K> <P>results</P> = <K>await</K> <P>fmp</P>.<Fn>screener</Fn>.<Fn>getScreener</Fn>(
        {'{'}
        {'\n'}
        {'  '}
        <Fn>marketCapMoreThan</Fn>: <N>1_000_000_000_000</N>,{'\n'}
        {'  '}
        <Fn>sector</Fn>: <S>&apos;Technology&apos;</S>,{'\n'}
        {'  '}
        <Fn>limit</Fn>: <N>3</N>,{'\n'}
        {'}'});
      </>
    ),
    response: () => (
      <>
        {'['}
        {'\n'}
        {'  '}
        {'{'} <Fn>symbol</Fn>: <S>&apos;AAPL&apos;</S>,{'  '}
        <Fn>marketCap</Fn>: <N>2.37e12</N> {'}'},{'\n'}
        {'  '}
        {'{'} <Fn>symbol</Fn>: <S>&apos;MSFT&apos;</S>,{'  '}
        <Fn>marketCap</Fn>: <N>2.42e12</N> {'}'},{'\n'}
        {'  '}
        {'{'} <Fn>symbol</Fn>: <S>&apos;NVDA&apos;</S>,{'  '}
        <Fn>marketCap</Fn>: <N>1.15e12</N> {'}'}
        {'\n'}
        {']'}
      </>
    ),
  },
  {
    id: 'ai',
    label: 'AI Tools',
    dot: 'ai',
    file: 'agent.ts',
    resFile: 'stream.txt',
    raw: `import { fmpTools } from 'fmp-ai-tools/vercel-ai';

const result = streamText({
  model: openai('gpt-4o-mini'),
  tools: fmpTools,
  prompt: 'How did AAPL perform today?',
});`,
    request: () => (
      <>
        <K>import</K> {'{ '}
        <P>fmpTools</P>
        {' }'} <K>from</K> <S>&apos;fmp-ai-tools/vercel-ai&apos;</S>;{'\n'}
        {'\n'}
        <K>const</K> <P>result</P> = <Fn>streamText</Fn>({'{'}
        {'\n'}
        {'  '}
        <Fn>model</Fn>: <Fn>openai</Fn>(<S>&apos;gpt-4o-mini&apos;</S>),{'\n'}
        {'  '}
        <Fn>tools</Fn>: <P>fmpTools</P>,{'\n'}
        {'  '}
        <Fn>prompt</Fn>: <S>&apos;How did AAPL perform today?&apos;</S>,{'\n'}
        {'}'});
      </>
    ),
    response: () => (
      <>
        <C>{'// tool call resolved by fmp-ai-tools'}</C>
        {'\n'}
        <P>→</P> <Fn>getQuote</Fn>({'{ '}
        <Fn>symbol</Fn>: <S>&apos;AAPL&apos;</S>
        {' }'}){'\n'}
        {'\n'}
        <C>{'// assistant'}</C>
        {'\n'}
        <P>
          AAPL closed at <span className="ts">$150.25</span>, up{'\n'}
          <span className="ts">2.15%</span> on the day with strong volume.
        </P>
      </>
    ),
  },
];

export function InteractiveCodeBox() {
  const [exId, setExId] = useState('quote');
  const [view, setView] = useState<'request' | 'response'>('request');
  const [busy, setBusy] = useState(false);
  const [ran, setRan] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ex = EXAMPLES.find(e => e.id === exId) || EXAMPLES[0];
  const hasRun = !!ran[exId];

  const pick = (id: string) => {
    setExId(id);
    setView('request');
    setCopied(false);
  };

  const run = () => {
    if (busy) return;
    setBusy(true);
    setView('request');
    timer.current = setTimeout(() => {
      setBusy(false);
      setRan(r => ({ ...r, [exId]: true }));
      setView('response');
    }, 700);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ex.raw);
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  };

  const showResponse = view === 'response' && hasRun;

  return (
    <div className="f-ic">
      <div className="f-ic-tabs">
        {EXAMPLES.map(e => (
          <button
            key={e.id}
            type="button"
            className={
              'f-ic-tab' + (e.dot === 'ai' ? ' ai' : '') + (e.id === exId ? ' on' : '')
            }
            onClick={() => pick(e.id)}
          >
            <span className="d" />
            {e.label}
          </button>
        ))}
        <span className="f-ic-win">
          <i style={{ background: 'var(--down)' }} />
          <i style={{ background: 'var(--amber)' }} />
          <i style={{ background: 'var(--acc)' }} />
        </span>
      </div>

      <div className="f-ic-body">
        <pre key={exId + view + (busy ? 'b' : '')}>
          <span className={showResponse ? 'f-reveal' : ''}>
            {showResponse ? ex.response() : ex.request()}
          </span>
          {busy ? <span className="f-cursor" /> : null}
        </pre>
      </div>

      <div className="f-ic-toolbar">
        <div className="f-seg">
          <button
            type="button"
            className={view === 'request' ? 'on' : ''}
            onClick={() => setView('request')}
          >
            Request
          </button>
          <button
            type="button"
            className={view === 'response' ? 'on' : ''}
            onClick={() => hasRun && setView('response')}
            disabled={!hasRun}
          >
            Response
          </button>
        </div>
        <span className="f-ic-lang">{showResponse ? ex.resFile : ex.file}</span>
        <button className="f-copybtn" onClick={copy} title="Copy" aria-label="Copy code" type="button">
          {copied ? (
            <span className="f-ok">
              <Check size={13} />
            </span>
          ) : (
            <Copy size={13} />
          )}
        </button>
        <button
          type="button"
          className={'f-run' + (busy ? ' busy' : '')}
          onClick={run}
          aria-label="Run example"
        >
          {busy ? (
            <>
              <span className="dot" />
              Running…
            </>
          ) : (
            <>
              <span className="tri" />
              Run
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import { z } from 'zod';
import {
  classifyTransport,
  classifyShape,
  classifyResult,
  type TransportResult,
} from '../../live/validate';

const Sample = z.object({
  symbol: z.string(),
  price: z.number(),
  marketCap: z.number().nullable(),
});

const ok = (over: Partial<TransportResult> = {}): TransportResult => ({
  success: true,
  data: null,
  error: null,
  status: 200,
  ...over,
});

describe('classifyTransport', () => {
  it('returns null when the request succeeded', () => {
    expect(classifyTransport(ok())).toBeNull();
  });

  it('classifies 402/403 as plan-locked SKIP', () => {
    expect(classifyTransport({ success: false, data: null, error: 'no', status: 402 })?.outcome).toBe('SKIP');
    expect(classifyTransport({ success: false, data: null, error: 'no', status: 403 })?.outcome).toBe('SKIP');
  });

  it('classifies plan-locked by message even on other status', () => {
    const c = classifyTransport({ success: false, data: null, error: 'Exclusive Endpoint: upgrade', status: 200 });
    expect(c?.outcome).toBe('SKIP');
  });

  it('classifies 429 as SKIP with stopRun', () => {
    const c = classifyTransport({ success: false, data: null, error: 'Limit Reach', status: 429 });
    expect(c?.outcome).toBe('SKIP');
    expect(c?.stopRun).toBe(true);
  });

  it('classifies other failures as FAIL', () => {
    expect(classifyTransport({ success: false, data: null, error: 'boom', status: 500 })?.outcome).toBe('FAIL');
  });
});

describe('classifyShape', () => {
  it('PASS on a clean object (incl. allowed null on nullable field)', () => {
    expect(classifyShape(Sample, { symbol: 'AAPL', price: 1, marketCap: null }).outcome).toBe('PASS');
  });

  it('FAIL on a missing required field', () => {
    expect(classifyShape(Sample, { symbol: 'AAPL', marketCap: 1 }).outcome).toBe('FAIL');
  });

  it('FAIL on a wrong (non-null) type', () => {
    expect(classifyShape(Sample, { symbol: 'AAPL', price: 'nope', marketCap: 1 }).outcome).toBe('FAIL');
  });

  it('DRIFT when a non-nullable field comes back null', () => {
    expect(classifyShape(Sample, { symbol: 'AAPL', price: null, marketCap: 1 }).outcome).toBe('DRIFT');
  });

  it('DRIFT on an extra top-level key', () => {
    const c = classifyShape(Sample, { symbol: 'AAPL', price: 1, marketCap: 1, currency: 'USD' });
    expect(c.outcome).toBe('DRIFT');
    expect(c.detail).toContain('currency');
  });
});

describe('classifyResult', () => {
  it('SKIPs a transport failure before shape checks', () => {
    expect(classifyResult({ success: false, data: null, error: 'x', status: 402 }, Sample, 'object').outcome).toBe('SKIP');
  });

  it('validates an object payload', () => {
    expect(classifyResult(ok({ data: { symbol: 'AAPL', price: 1, marketCap: 1 } }), Sample, 'object').outcome).toBe('PASS');
  });

  it('treats an empty array as PASS (0 rows)', () => {
    const c = classifyResult(ok({ data: [] }), Sample, 'array');
    expect(c.outcome).toBe('PASS');
    expect(c.detail).toContain('0 rows');
  });

  it('FAILs an array whose elements break the schema', () => {
    const c = classifyResult(ok({ data: [{ symbol: 'AAPL', price: 'bad', marketCap: 1 }] }), Sample, 'array');
    expect(c.outcome).toBe('FAIL');
  });

  it('FAILs when an array is expected but a non-array is returned', () => {
    expect(classifyResult(ok({ data: { not: 'an array' } }), Sample, 'array').outcome).toBe('FAIL');
  });
});

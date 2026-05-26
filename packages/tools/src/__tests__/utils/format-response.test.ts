import { toToolResponse, toToolError } from '@/utils/format-response';

describe('toToolResponse', () => {
  it('returns pretty JSON of data on success', () => {
    const out = toToolResponse({
      success: true,
      data: [{ symbol: 'AAPL', price: 1 }],
      error: null,
      status: 200,
    });
    expect(JSON.parse(out)).toEqual([{ symbol: 'AAPL', price: 1 }]);
  });

  it('returns a "no data" note when a successful payload is empty', () => {
    const out = toToolResponse({ success: true, data: [], error: null, status: 200 });
    expect(JSON.parse(out)).toEqual({ data: [], note: expect.stringContaining('No data') });
  });

  it('surfaces a structured error with the classified type on failure', () => {
    const out = toToolResponse({
      success: false,
      data: null,
      error: 'This endpoint is not available on your current FMP plan. (403: ...)',
      errorType: 'plan-restricted',
      status: 403,
    });
    expect(JSON.parse(out)).toEqual({
      error: true,
      type: 'plan-restricted',
      message: expect.stringContaining('not available on your current FMP plan'),
      status: 403,
    });
  });

  it('defaults type to unknown when errorType is absent', () => {
    const out = toToolResponse({ success: false, data: null, error: 'boom', status: 500 });
    expect(JSON.parse(out).type).toBe('unknown');
  });

  it('treats a response without an explicit failure as success', () => {
    // Defensive: partial responses (no `success` field) should still return data.
    const out = toToolResponse({ data: { ok: true } } as never);
    expect(JSON.parse(out)).toEqual({ ok: true });
  });
});

describe('toToolError', () => {
  it('classifies a missing/invalid FMP API key as auth', () => {
    const out = toToolError(
      new Error(
        'FMP API key is required. Please provide it in the config or set the FMP_API_KEY environment variable.',
      ),
    );
    const parsed = JSON.parse(out);
    expect(parsed).toEqual({
      error: true,
      type: 'auth',
      message: expect.stringContaining('API key'),
      status: 0,
    });
  });

  it('falls back to unknown for other thrown errors', () => {
    const parsed = JSON.parse(toToolError(new Error('something exploded')));
    expect(parsed.type).toBe('unknown');
    expect(parsed.error).toBe(true);
  });

  it('handles non-Error throwables', () => {
    expect(JSON.parse(toToolError('boom')).message).toBe('boom');
  });
});

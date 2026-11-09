import { z } from 'zod';
import { applyDefaults, capLimit, stripNulls } from '@/utils/tool-input';

const schema = z.object({
  symbol: z.string().min(1),
  timeframe: z.enum(['1day', '1week']).default('1day'),
  limit: z.number().int().positive().default(50),
  from: z.string().optional().nullable(),
});

describe('stripNulls', () => {
  it('drops top-level nulls and leaves other values alone', () => {
    expect(stripNulls({ a: null, b: 0, c: '', d: [null] })).toEqual({ b: 0, c: '', d: [null] });
  });

  it('passes non-objects through', () => {
    expect(stripNulls(null)).toBeNull();
    expect(stripNulls([1])).toEqual([1]);
  });
});

describe('capLimit', () => {
  it('uses the default when nothing (or null) is requested', () => {
    expect(capLimit(undefined, 20, 50)).toEqual({ limit: 20, max: 50 });
    expect(capLimit(null, 20, 50)).toEqual({ limit: 20, max: 50 });
  });

  it('caps at the maximum and says so', () => {
    expect(capLimit(2000, 20, 50)).toEqual({
      limit: 50,
      max: 50,
      notice: 'Requested 2000 rows, but this tool returns at most 50 per call.',
    });
  });
});

describe('applyDefaults', () => {
  it('treats null as "not set" so schema defaults apply', () => {
    expect(applyDefaults(schema, { symbol: 'AAPL', timeframe: null, limit: null, from: null })).toEqual({
      symbol: 'AAPL',
      timeframe: '1day',
      limit: 50,
    });
  });

  it('falls back to the null-stripped input when it does not parse', () => {
    expect(applyDefaults(schema, { limit: null })).toEqual({});
  });
});

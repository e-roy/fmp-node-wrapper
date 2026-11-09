import { z } from 'zod';
import { applyDefaults, stripNulls } from '@/utils/tool-input';

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

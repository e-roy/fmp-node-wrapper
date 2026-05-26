import { z } from 'zod';
import { allDefinitions, financialDefinitions } from '@/definitions';

describe('tool definitions', () => {
  it('every definition has a non-empty name, description, and Zod object schema', () => {
    for (const def of allDefinitions) {
      expect(typeof def.name).toBe('string');
      expect(def.name.length).toBeGreaterThan(0);
      expect(def.description.length).toBeGreaterThan(0);
      expect(def.inputSchema).toBeInstanceOf(z.ZodObject);
      expect(typeof def.execute).toBe('function');
    }
  });

  it('numeric params are numbers with numeric defaults (not string-coerced)', () => {
    const balanceSheet = financialDefinitions.find(d => d.name === 'getBalanceSheet')!;
    const parsed = balanceSheet.inputSchema.parse({ symbol: 'AAPL' });
    expect(parsed).toEqual({ symbol: 'AAPL', period: 'annual', limit: 5 });
    expect(typeof parsed.limit).toBe('number');
  });
});

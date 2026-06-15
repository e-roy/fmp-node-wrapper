import { allDefinitions } from '@/definitions';
import { fmpTools as vercelTools } from '@/providers/vercel-ai';
import { fmpTools as openaiTools } from '@/providers/openai';

// Guards against the two providers drifting apart: both must expose exactly the
// tools declared once in the shared definitions, with matching descriptions.
describe('cross-provider consistency', () => {
  const names = allDefinitions.map(d => d.name);

  it('has 61 uniquely-named definitions', () => {
    expect(names.length).toBe(61);
    expect(new Set(names).size).toBe(61);
  });

  it('Vercel AI exposes exactly the defined tools', () => {
    expect(new Set(Object.keys(vercelTools))).toEqual(new Set(names));
  });

  it('OpenAI exposes exactly the defined tools', () => {
    const openaiNames = (openaiTools as Array<{ name: string }>).map(t => t.name);
    expect(new Set(openaiNames)).toEqual(new Set(names));
  });

  it('descriptions match across both providers and the definition', () => {
    const openaiByName = new Map(
      (openaiTools as Array<{ name: string; description: string }>).map(t => [
        t.name,
        t.description,
      ]),
    );
    for (const def of allDefinitions) {
      expect((vercelTools as Record<string, { description: string }>)[def.name].description).toBe(
        def.description,
      );
      expect(openaiByName.get(def.name)).toBe(def.description);
    }
  });
});

// Post-build fix for the bundled declaration files.
//
// tsup's declaration bundler (rollup-plugin-dts) rewrites the source's
// `export type * from 'fmp-node-types'` as `export * from 'fmp-node-types'`.
// That re-exports the Zod schema *values* from the .d.ts even though the runtime
// JS never ships them — importing one (e.g. `QuoteSchema`) compiles but is
// `undefined` at runtime. Restore the type-only form after every build, and fail
// loudly if the emitted output ever stops matching.
import { readFileSync, writeFileSync } from 'node:fs';

const FILES = ['dist/index.d.ts', 'dist/index.d.mts', 'dist/types-only.d.ts', 'dist/types-only.d.mts'];
const FROM = "export * from 'fmp-node-types';";
const TO = "export type * from 'fmp-node-types';";

for (const file of FILES) {
  const src = readFileSync(file, 'utf8');
  if (!src.includes(FROM)) {
    throw new Error(`${file}: expected "${FROM}" — the declaration output changed; update this script.`);
  }
  writeFileSync(file, src.replace(FROM, TO));
}
console.log(`Restored type-only fmp-node-types re-exports in ${FILES.length} declaration files.`);

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/types-only.ts', 'src/utils/validation.ts'],
  format: ['cjs', 'esm'],
  dts: true,

  clean: true,
  treeshake: true,
  minify: true,
});

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'providers/vercel-ai/index': 'src/providers/vercel-ai/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
      '@/types': './src/types',
      '@/providers': './src/providers',
      '@/providers/vercel-ai': './src/providers/vercel-ai',
    };
  },
});

import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['fmp-node-api'],
};

// Note: Next 16 defaults to Turbopack for builds, which requires serializable
// loader options. Pass remark/rehype plugins as string IDs (or `[name, options]`
// tuples) instead of imported functions so Turbopack can serialize them.
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [['remark-gfm', {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

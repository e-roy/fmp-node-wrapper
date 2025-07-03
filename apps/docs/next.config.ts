import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['fmp-node-api'],
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);

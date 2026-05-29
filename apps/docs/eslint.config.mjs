// Flat ESLint config for the docs site.
// Next 16 removed `next lint`, so we wire ESLint directly using the flat-config
// array exported by eslint-config-next/core-web-vitals (which extends the base
// next config with the Core Web Vitals rule pack).
import nextConfig from 'eslint-config-next/core-web-vitals';

export default nextConfig;

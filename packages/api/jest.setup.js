// Jest setup file to ensure environment variables are loaded
const { config } = require('dotenv');
const { resolve } = require('path');

// Only load .env file if not in CI (CI should have env vars set directly)
if (process.env.CI !== 'true') {
  config({ path: resolve(__dirname, '../../.env'), override: false });
}

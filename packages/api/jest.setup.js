// Jest setup file to ensure environment variables are loaded
const { config } = require('dotenv');
const { resolve } = require('path');

// Debug logging
console.log('JEST SETUP - CI:', process.env.CI);
console.log('JEST SETUP - FMP_API_KEY before dotenv:', process.env.FMP_API_KEY ? 'SET' : 'NOT SET');

// Only load .env file if not in CI (CI should have env vars set directly)
if (process.env.CI !== 'true') {
  config({ path: resolve(__dirname, '../../.env'), override: false });
  console.log('JEST SETUP - Loaded .env file');
} else {
  console.log('JEST SETUP - Skipping .env file (CI environment)');
}

console.log('JEST SETUP - FMP_API_KEY after dotenv:', process.env.FMP_API_KEY ? 'SET' : 'NOT SET');
console.log(
  'JEST SETUP - FMP_API_KEY length:',
  process.env.FMP_API_KEY ? process.env.FMP_API_KEY.length : 'N/A',
);

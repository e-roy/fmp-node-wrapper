// Jest setup file to ensure environment variables are loaded
const { config } = require('dotenv');
const { resolve } = require('path');

// Load .env file
config({ path: resolve(__dirname, '../../.env'), override: false });

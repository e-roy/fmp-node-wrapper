// Jest setup file to ensure environment variables are loaded
const { config } = require('dotenv');
const { resolve } = require('path');

// Always try to load .env file (for local development)
config({ path: resolve(__dirname, '../../.env'), override: false });

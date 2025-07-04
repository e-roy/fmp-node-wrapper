// Load environment variables from .env file in root directory (for local development)
const { config } = require('dotenv');
const { resolve } = require('path');
const { existsSync } = require('fs');

// Only load .env file if it exists (for local development)
// In CI, environment variables are already set
const envPath = resolve(__dirname, '../../.env');
if (existsSync(envPath)) {
  config({ path: envPath });
}

// Jest setup file for handling environment variables and API keys
// This file runs before each test

// Set up environment variables for testing
process.env.NODE_ENV = 'test';

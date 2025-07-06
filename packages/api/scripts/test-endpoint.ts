#!/usr/bin/env node

// Load environment variables from .env file in root directory
import { config } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

const envPath = resolve(__dirname, '../../../.env');
console.log('Looking for .env file at:', envPath);
console.log('File exists:', existsSync(envPath));

if (existsSync(envPath)) {
  config({ path: envPath });
  console.log('Loaded .env file');
} else {
  console.log('No .env file found');
}

console.log('FMP_API_KEY exists:', !!process.env.FMP_API_KEY);

import { FMP } from '../src/fmp';

async function testEndpoint() {
  const API_KEY = process.env.FMP_API_KEY;
  const endpoint = process.argv[2];

  if (!API_KEY) {
    console.log('❌ No FMP_API_KEY found in environment variables');
    console.log('Please set FMP_API_KEY in your .env file');
    process.exit(1);
  }

  if (!endpoint) {
    console.log('❌ Please specify an endpoint to test');
    console.log('Usage: pnpm test:endpoint <endpoint>');
    console.log('');
    console.log('Available endpoints:');
    console.log('  quote, profile, historical, stock-list, market-cap');
    console.log('  income-statement, balance-sheet, cash-flow');
    console.log('  market-hours, gainers, losers, most-active');
    console.log('  forex-quote, crypto-quote, treasury-rates');
    console.log('');
    console.log('Example: pnpm test:endpoint quote');
    process.exit(1);
  }

  const fmp = new FMP({ apiKey: API_KEY });

  try {
    console.log(`🔍 Testing ${endpoint}...`);

    let result;
    switch (endpoint.toLowerCase()) {
      // Stock endpoints
      case 'quote':
        result = await fmp.stock.getQuote({ symbol: 'AAPL' });
        break;
      case 'profile':
        result = await fmp.stock.getCompanyProfile({ symbol: 'AAPL' });
        break;
      case 'historical':
        result = await fmp.stock.getHistoricalPrice({
          symbol: 'AAPL',
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'market-cap':
        result = await fmp.stock.getMarketCap({ symbol: 'AAPL' });
        break;
      case 'stock-splits':
        result = await fmp.stock.getStockSplits({ symbol: 'AAPL' });
        break;
      case 'dividend-history':
        result = await fmp.stock.getDividendHistory({ symbol: 'AAPL' });
        break;

      // Financial endpoints
      case 'income-statement':
        result = await fmp.financial.getIncomeStatement({
          symbol: 'AAPL',
          period: 'annual',
          limit: 1,
        });
        break;
      case 'balance-sheet':
        result = await fmp.financial.getBalanceSheet({
          symbol: 'AAPL',
          period: 'annual',
          limit: 1,
        });
        break;
      case 'cash-flow':
        result = await fmp.financial.getCashFlowStatement({
          symbol: 'AAPL',
          period: 'annual',
          limit: 1,
        });
        break;

      // Market endpoints
      case 'market-hours':
        result = await fmp.market.getMarketHours();
        break;
      case 'gainers':
        result = await fmp.market.getGainers();
        break;
      case 'losers':
        result = await fmp.market.getLosers();
        break;
      case 'most-active':
        result = await fmp.market.getMostActive();
        break;

      // List endpoints
      case 'stock-list':
        result = await fmp.list.getStockList();
        break;
      case 'etf-list':
        result = await fmp.list.getETFList();
        break;
      case 'crypto-list':
        result = await fmp.list.getCryptoList();
        break;
      case 'forex-list':
        result = await fmp.list.getForexList();
        break;
      case 'available-indexes':
        result = await fmp.list.getAvailableIndexes();
        break;

      // Calendar endpoints
      case 'earnings-calendar':
        result = await fmp.calendar.getEarningsCalendar({
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'dividends-calendar':
        result = await fmp.calendar.getDividendsCalendar({
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'economics-calendar':
        result = await fmp.calendar.getEconomicsCalendar({
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'ipo-calendar':
        result = await fmp.calendar.getIPOCalendar({
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'splits-calendar':
        result = await fmp.calendar.getSplitsCalendar({
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;

      case 'forex-quote':
        result = await fmp.forex.getQuote({ symbol: 'EURUSD' });
        break;
      case 'crypto-quote':
        result = await fmp.crypto.getQuote({ symbol: 'BTCUSD' });
        break;
      case 'treasury-rates':
        result = await fmp.economic.getTreasuryRates({
          from: '2024-01-01',
          to: '2024-12-31',
        });
        break;
      default:
        console.log(`❌ Unknown endpoint: ${endpoint}`);
        process.exit(1);
    }

    console.log('\n📊 RESULT:');
    console.log('='.repeat(50));

    if (result.success) {
      console.log('✅ Success!');
      console.log('');
      console.log('📋 Raw API Response:');
      console.log(JSON.stringify(result, null, 2));
      console.log('');
      console.log('📋 Data Structure:');
      console.log(`Type: ${Array.isArray(result.data) ? 'Array' : typeof result.data}`);

      if (Array.isArray(result.data)) {
        console.log(`Length: ${result.data.length}`);
        if (result.data.length > 0) {
          console.log('');
          console.log('🔍 First Item:');
          console.log(JSON.stringify(result.data[0], null, 2));
        }
      } else {
        console.log('');
        console.log('🔍 Data:');
        console.log(JSON.stringify(result.data, null, 2));
      }
    } else {
      console.log('❌ Failed:');
      console.log(result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
  }
}

testEndpoint();
// https://financialmodelingprep.com/api/v3/earning_call_transcript/AAPL?year=2020&quarter=3

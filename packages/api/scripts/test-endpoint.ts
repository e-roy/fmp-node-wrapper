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
    console.log('  quote, quotes, historical, intraday, stock-list, market-cap');
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
      // Quote endpoints
      case 'quote':
        result = await fmp.quote.getQuote({ symbol: 'AAPL' });
        break;
      case 'quote-crypto':
        result = await fmp.quote.getQuote({ symbol: 'BTCUSD' });
        break;
      case 'quote-forex':
        result = await fmp.quote.getQuote({ symbol: 'EURUSD' });
        break;
      case 'quote-commodity':
        result = await fmp.quote.getQuote({ symbol: 'ZOUSX' });
        break;
      case 'quote-etf':
        result = await fmp.quote.getQuote({ symbol: 'SPY' });
        break;
      case 'quotes':
        result = await fmp.quote.getQuotes(['AAPL', 'GOOGL']);
        break;

      case 'historical':
        result = await fmp.quote.getHistoricalPrice({
          symbol: 'AAPL',
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'intraday':
        result = await fmp.quote.getIntraday({
          symbol: 'BTCUSD',
          interval: '5min',
          from: '2024-01-01',
          to: '2024-01-02',
        });
        break;

      // Stock endpoints
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
          limit: 2,
        });
        break;
      case 'balance-sheet':
        result = await fmp.financial.getBalanceSheet({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'cash-flow':
        result = await fmp.financial.getCashFlowStatement({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'key-metrics':
        result = await fmp.financial.getKeyMetrics({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'financial-ratios':
        result = await fmp.financial.getFinancialRatios({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'enterprise-value':
        result = await fmp.financial.getEnterpriseValue({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'cashflow-growth':
        result = await fmp.financial.getCashflowGrowth({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'income-growth':
        result = await fmp.financial.getIncomeGrowth({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'balance-sheet-growth':
        result = await fmp.financial.getBalanceSheetGrowth({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'financial-growth':
        result = await fmp.financial.getFinancialGrowth({
          symbol: 'AAPL',
          period: 'annual',
          limit: 2,
        });
        break;
      case 'earnings-historical':
        result = await fmp.financial.getEarningsHistorical({
          symbol: 'AAPL',
          limit: 2,
        });
        break;
      case 'earnings-surprises':
        result = await fmp.financial.getEarningsSurprises({
          symbol: 'AAPL',
        });
        break;

      // Company endpoints
      case 'company-profile':
        result = await fmp.company.getCompanyProfile({ symbol: 'AAPL' });
        break;
      case 'executive-compensation':
        result = await fmp.company.getExecutiveCompensation({ symbol: 'AAPL' });
        break;
      case 'company-notes':
        result = await fmp.company.getCompanyNotes({ symbol: 'AAPL' });
        break;
      case 'historical-employee-count':
        result = await fmp.company.getHistoricalEmployeeCount({ symbol: 'AAPL' });
        break;
      case 'shares-float':
        result = await fmp.company.getSharesFloat({ symbol: 'AAPL' });
        break;
      case 'historical-shares-float':
        result = await fmp.company.getHistoricalSharesFloat({ symbol: 'AAPL' });
        break;
      case 'earnings-call-transcript':
        result = await fmp.company.getEarningsCallTranscript({
          symbol: 'AAPL',
          year: 2020,
          quarter: 3,
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
      case 'active':
        result = await fmp.market.getMostActive();
        break;
      case 'sector-performance':
        result = await fmp.market.getSectorPerformance();
        break;
      case 'market-index':
        result = await fmp.market.getMarketIndex();
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

      // ETF endpoints
      case 'etf-holding-dates':
        result = await fmp.etf.getHoldingDates({ symbol: 'SPY' });
        break;
      case 'etf-holdings':
        result = await fmp.etf.getHoldings({ symbol: 'SPY', date: '2023-09-30' });
        break;
      case 'etf-holder':
        result = await fmp.etf.getHolder({ symbol: 'SPY' });
        break;
      case 'etf-profile':
        result = await fmp.etf.getProfile({ symbol: 'SPY' });
        break;
      case 'etf-sector-weighting':
        result = await fmp.etf.getSectorWeighting({ symbol: 'SPY' });
        break;
      case 'etf-country-weighting':
        result = await fmp.etf.getCountryWeighting({ symbol: 'SPY' });
        break;
      case 'etf-stock-exposure':
        result = await fmp.etf.getStockExposure({ symbol: 'SPY' });
        break;

      // crypto endpoints
      case 'crypto-historical':
        result = await fmp.crypto.getHistoricalPrice({
          symbol: 'BTCUSD',
          from: '2024-01-01',
          to: '2024-01-31',
        });
        break;
      case 'crypto-quote':
        result = await fmp.crypto.getQuote({ symbol: 'BTCUSD' });
        break;

      case 'forex-quote':
        result = await fmp.forex.getQuote({ symbol: 'EURUSD' });
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

      // if (Array.isArray(result.data)) {
      //   console.log(`Length: ${result.data.length}`);
      //   if (result.data.length > 0) {
      //     console.log('');
      //     console.log('🔍 First Item:');
      //     console.log(JSON.stringify(result.data[0], null, 2));
      //   }
      // } else {
      //   console.log('');
      //   console.log('🔍 Data:');
      //   console.log(JSON.stringify(result.data, null, 2));
      // }
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

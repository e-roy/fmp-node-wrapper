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

// Import the tools from Vercel AI provider
import { fmpTools } from '../src/providers/vercel-ai';

async function testTools() {
  const API_KEY = process.env.FMP_API_KEY;

  // Parse command line arguments
  const args = process.argv.slice(2);
  const toolName = args[0];

  if (!API_KEY) {
    console.log('❌ No FMP_API_KEY found in environment variables');
    console.log('Please set FMP_API_KEY in your .env file');
    process.exit(1);
  }

  if (!toolName) {
    console.log('❌ Please specify a tool to test');
    console.log('Usage: pnpm test:tool <tool-name>');
    console.log('');
    console.log('Available tools:');
    console.log('');
    console.log('📊 Quote Tools:');
    console.log('  getStockQuote');
    console.log('');
    console.log('🏢 Company Tools:');
    console.log('  getCompanyProfile');
    console.log('');
    console.log('💰 Financial Tools:');
    console.log('  getBalanceSheet, getIncomeStatement, getCashFlowStatement, getFinancialRatios');
    console.log('');
    console.log('📈 Stock Tools:');
    console.log('  getMarketCap, getStockSplits, getDividendHistory');
    console.log('');
    console.log('🏛️ Senate & House Trading Tools:');
    console.log(
      '  getSenateTrading, getHouseTrading, getSenateTradingByName, getHouseTradingByName',
    );
    console.log('  getSenateTradingRSSFeed, getHouseTradingRSSFeed');
    console.log('');
    console.log('👥 Insider Trading Tools:');
    console.log('  getInsiderTrading');
    console.log('');
    console.log('🏦 Institutional Tools:');
    console.log('  getInstitutionalHolders');
    console.log('');
    console.log('📊 ETF Tools:');
    console.log('  getETFHoldings, getETFProfile');
    console.log('');
    console.log('📈 Market Tools:');
    console.log(
      '  getMarketPerformance, getSectorPerformance, getGainers, getLosers, getMostActive',
    );
    console.log('');
    console.log('📅 Calendar Tools:');
    console.log('  getEarningsCalendar, getEconomicCalendar');
    console.log('');
    console.log('📊 Economic Tools:');
    console.log('  getTreasuryRates, getEconomicIndicators');
    console.log('');
    console.log('Examples:');
    console.log('  pnpm test:tool getStockQuote');
    process.exit(1);
  }

  const tool = (fmpTools as Record<string, any>)[toolName];

  if (!tool) {
    console.log(`❌ Unknown tool: ${toolName}`);
    console.log('Use "pnpm test:tool" without arguments to see available tools');
    process.exit(1);
  }

  try {
    console.log(`🔍 Testing ${toolName}...`);
    console.log('');
    console.log('📋 Tool Information:');
    console.log('='.repeat(50));

    // Display tool information
    console.log(`Name: ${toolName}`);
    console.log(`Description: ${tool.description}`);
    console.log(`Type: function`);
    console.log('');
    console.log('📝 Parameters:');
    console.log(JSON.stringify(tool.inputSchema, null, 2));
    console.log('');

    // Define test parameters for each tool
    const testParams = getTestParameters(toolName);

    console.log('🧪 Test Parameters:');
    console.log(JSON.stringify(testParams, null, 2));
    console.log('');

    console.log('🚀 Executing tool...');
    console.log('='.repeat(50));

    const startTime = Date.now();
    const result = await (tool as any).execute(testParams);
    const endTime = Date.now();

    console.log(`⏱️  Execution time: ${endTime - startTime}ms`);
    console.log('');
    console.log('📊 RESULT:');
    console.log('='.repeat(50));

    if (result) {
      console.log('✅ Success!');
      console.log('');
      console.log('📋 Raw Output:');
      console.log(result);
      console.log('');

      try {
        const parsedResult = JSON.parse(result);
        console.log('📋 Data Structure:');
        console.log(`Type: ${Array.isArray(parsedResult) ? 'Array' : typeof parsedResult}`);

        if (Array.isArray(parsedResult)) {
          console.log(`Length: ${parsedResult.length}`);
          if (parsedResult.length > 0) {
            console.log('');
            console.log('🔍 First Item:');
            console.log(JSON.stringify(parsedResult[0], null, 2));
          }
        } else {
          console.log('');
          console.log('🔍 Data:');
          console.log(JSON.stringify(parsedResult, null, 2));
        }
      } catch (parseError) {
        console.log('⚠️  Output is not valid JSON, showing as string');
      }
    } else {
      console.log('❌ No result returned');
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

function getTestParameters(toolName: string): any {
  switch (toolName) {
    // Quote tools
    case 'getStockQuote':
      return { symbol: 'AAPL' };

    // Company tools
    case 'getCompanyProfile':
      return { symbol: 'AAPL' };

    // Financial tools
    case 'getBalanceSheet':
      return { symbol: 'AAPL', period: 'annual', limit: 2 };
    case 'getIncomeStatement':
      return { symbol: 'AAPL', period: 'annual', limit: 2 };
    case 'getCashFlowStatement':
      return { symbol: 'AAPL', period: 'annual', limit: 2 };
    case 'getFinancialRatios':
      return { symbol: 'AAPL', period: 'annual', limit: 2 };

    // Stock tools
    case 'getMarketCap':
      return { symbol: 'AAPL' };
    case 'getStockSplits':
      return { symbol: 'AAPL' };
    case 'getDividendHistory':
      return { symbol: 'AAPL' };

    // Senate & House tools
    case 'getSenateTrading':
      return { symbol: 'AAPL' };
    case 'getHouseTrading':
      return { symbol: 'AAPL' };
    case 'getSenateTradingByName':
      return { name: 'Jerry' };
    case 'getHouseTradingByName':
      return { name: 'Nancy' };
    case 'getSenateTradingRSSFeed':
      return { page: 0 };
    case 'getHouseTradingRSSFeed':
      return { page: 0 };

    // Insider tools
    case 'getInsiderTrading':
      return { symbol: 'AAPL', page: 0 };

    // Institutional tools
    case 'getInstitutionalHolders':
      return { symbol: 'AAPL' };

    // ETF tools
    case 'getETFHoldings':
      return { symbol: 'SPY', date: '2023-09-30' };
    case 'getETFProfile':
      return { symbol: 'SPY' };

    // Market tools
    case 'getMarketPerformance':
      return {};
    case 'getSectorPerformance':
      return {};
    case 'getGainers':
      return {};
    case 'getLosers':
      return {};
    case 'getMostActive':
      return {};

    // Calendar tools
    case 'getEarningsCalendar':
      return { from: '2024-01-01', to: '2024-01-31' };
    case 'getEconomicCalendar':
      return { from: '2024-01-01', to: '2024-01-31' };

    // Economic tools
    case 'getTreasuryRates':
      return { from: '2024-01-01', to: '2024-01-31' };
    case 'getEconomicIndicators':
      return { name: 'GDP', from: '2024-01-01', to: '2024-01-31' };

    default:
      return {};
  }
}

testTools();

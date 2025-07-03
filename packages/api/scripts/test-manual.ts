#!/usr/bin/env node

import { FMP } from '../src/fmp';

async function testAPI() {
  const API_KEY = process.env.FMP_API_KEY;

  if (!API_KEY) {
    console.log('❌ No FMP_API_KEY found in environment variables');
    console.log('Please set FMP_API_KEY in your .env file in the root directory');
    process.exit(1);
  }

  console.log('🚀 Testing FMP API Package...\n');

  try {
    // Initialize the FMP client
    const fmp = new FMP({
      apiKey: API_KEY,
    });

    // Test 1: Get stock quote
    console.log('📈 Testing Stock Quote...');
    const quote = await fmp.stock.getQuote({ symbol: 'AAPL' });

    if (quote.success && quote.data && quote.data.length > 0) {
      const stock = quote.data[0];
      console.log(
        `✅ AAPL Quote: $${stock.price} (${stock.change > 0 ? '+' : ''}${
          stock.change
        } | ${stock.changePercent}%)`,
      );
      console.log(`   Market Cap: $${(stock.marketCap / 1e9).toFixed(2)}B`);
      console.log(`   Volume: ${stock.volume.toLocaleString()}\n`);
    } else {
      console.log('❌ Failed to get stock quote:', quote.error);
    }

    // Test 2: Get company profile
    console.log('🏢 Testing Company Profile...');
    const profile = await fmp.stock.getCompanyProfile({ symbol: 'AAPL' });

    if (profile.success && profile.data && profile.data.length > 0) {
      const company = profile.data[0];
      console.log(`✅ ${company.companyName} (${company.symbol})`);
      console.log(`   Industry: ${company.industry}`);
      console.log(`   Sector: ${company.sector}`);
      console.log(`   Market Cap: $${(company.marketCap / 1e9).toFixed(2)}B\n`);
    } else {
      console.log('❌ Failed to get company profile:', profile.error);
    }

    // Test 3: Get financial statements
    console.log('📊 Testing Financial Statements...');
    const incomeStatement = await fmp.financial.getIncomeStatement({
      symbol: 'AAPL',
      period: 'annual',
      limit: 1,
    });

    if (incomeStatement.success && incomeStatement.data && incomeStatement.data.length > 0) {
      const statement = incomeStatement.data[0];
      console.log(`✅ Income Statement for ${statement.calendarYear}`);
      console.log(`   Period: ${statement.period}`);
      console.log(`   Date: ${statement.date}\n`);
    } else {
      console.log('❌ Failed to get income statement:', incomeStatement.error);
    }

    // Test 4: Get market hours
    console.log('🕐 Testing Market Hours...');
    const marketHours = await fmp.market.getMarketHours();

    if (marketHours.success && marketHours.data) {
      console.log(`✅ Market Hours: ${marketHours.data.stockExchangeName}`);
      console.log(`   Stock Market Open: ${marketHours.data.isTheStockMarketOpen}`);
      console.log(`   Forex Market Open: ${marketHours.data.isTheForexMarketOpen}`);
      console.log(`   Crypto Market Open: ${marketHours.data.isTheCryptoMarketOpen}\n`);
    } else {
      console.log('❌ Failed to get market hours:', marketHours.error);
    }

    console.log('🎉 All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testAPI();

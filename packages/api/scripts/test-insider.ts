#!/usr/bin/env tsx

import { FMP } from '../src/fmp';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.FMP_API_KEY;

if (!API_KEY) {
  console.error('❌ FMP_API_KEY environment variable is required');
  process.exit(1);
}

const fmp = new FMP({ apiKey: API_KEY });

async function testInsiderEndpoints() {
  console.log('🧪 Testing Insider Trading Endpoints...\n');

  try {
    // Test 1: Get insider trading RSS feed
    console.log('1️⃣ Testing getInsiderTradingRSS...');
    const rssResult = await fmp.insider.getInsiderTradingRSS({ page: 0 });
    if (rssResult.success && rssResult.data) {
      console.log(`✅ RSS Feed: Found ${rssResult.data.length} entries`);
      if (rssResult.data.length > 0) {
        console.log(`   Sample: ${rssResult.data[0].title}`);
      }
    } else {
      console.log('❌ RSS Feed failed:', rssResult.error);
    }

    // Test 2: Get transaction types
    console.log('\n2️⃣ Testing getTransactionTypes...');
    const transactionTypesResult = await fmp.insider.getTransactionTypes();
    if (transactionTypesResult.success && transactionTypesResult.data) {
      console.log(`✅ Transaction Types: Found ${transactionTypesResult.data.length} types`);
      console.log(`   Types: ${transactionTypesResult.data.slice(0, 5).join(', ')}...`);
    } else {
      console.log('❌ Transaction Types failed:', transactionTypesResult.error);
    }

    // Test 3: Search insider trading for AAPL
    console.log('\n3️⃣ Testing searchInsiderTrading for AAPL...');
    const searchResult = await fmp.insider.searchInsiderTrading({ symbol: 'AAPL', page: 0 });
    if (searchResult.success && searchResult.data) {
      console.log(`✅ Insider Trading Search: Found ${searchResult.data.length} trades`);
      if (searchResult.data.length > 0) {
        const trade = searchResult.data[0];
        console.log(
          `   Sample: ${trade.reportingName} - ${trade.transactionType} - ${trade.securitiesTransacted} shares`,
        );
      }
    } else {
      console.log('❌ Insider Trading Search failed:', searchResult.error);
    }

    // Test 4: Get insiders by symbol
    console.log('\n4️⃣ Testing getInsidersBySymbol for AAPL...');
    const insidersResult = await fmp.insider.getInsidersBySymbol({ symbol: 'AAPL' });
    if (insidersResult.success && insidersResult.data) {
      console.log(`✅ Insiders by Symbol: Found ${insidersResult.data.length} insiders`);
      if (insidersResult.data.length > 0) {
        console.log(
          `   Sample: ${insidersResult.data[0].owner} - ${insidersResult.data[0].typeOfOwner}`,
        );
      }
    } else {
      console.log('❌ Insiders by Symbol failed:', insidersResult.error);
    }

    // Test 5: Get insider trade statistics
    console.log('\n5️⃣ Testing getInsiderTradeStatistics for AAPL...');
    const statsResult = await fmp.insider.getInsiderTradeStatistics({ symbol: 'AAPL' });
    if (statsResult.success && statsResult.data) {
      console.log(`✅ Insider Trade Statistics: Found ${statsResult.data.length} records`);
      if (statsResult.data.length > 0) {
        const stat = statsResult.data[0];
        console.log(
          `   Sample: ${stat.year} Q${stat.quarter} - ${stat.purchases} purchases, ${stat.sales} sales`,
        );
      }
    } else {
      console.log('❌ Insider Trade Statistics failed:', statsResult.error);
    }

    // Test 6: Get CIK mapper
    console.log('\n6️⃣ Testing getCikMapper...');
    const cikMapperResult = await fmp.insider.getCikMapper({ page: 0 });
    if (cikMapperResult.success && cikMapperResult.data) {
      console.log(`✅ CIK Mapper: Found ${cikMapperResult.data.length} entries`);
      if (cikMapperResult.data.length > 0) {
        console.log(
          `   Sample: ${cikMapperResult.data[0].reportingName} (${cikMapperResult.data[0].reportingCik})`,
        );
      }
    } else {
      console.log('❌ CIK Mapper failed:', cikMapperResult.error);
    }

    // Test 7: Get CIK mapper by name
    console.log('\n7️⃣ Testing getCikMapperByName for "zuckerberg"...');
    const cikByNameResult = await fmp.insider.getCikMapperByName({ name: 'zuckerberg' });
    if (cikByNameResult.success && cikByNameResult.data) {
      console.log(`✅ CIK Mapper by Name: Found ${cikByNameResult.data.length} entries`);
      if (cikByNameResult.data.length > 0) {
        console.log(
          `   Sample: ${cikByNameResult.data[0].reportingName} (${cikByNameResult.data[0].reportingCik})`,
        );
      }
    } else {
      console.log('❌ CIK Mapper by Name failed:', cikByNameResult.error);
    }

    // Test 8: Get CIK mapper by symbol
    console.log('\n8️⃣ Testing getCikMapperBySymbol for MSFT...');
    const cikBySymbolResult = await fmp.insider.getCikMapperBySymbol({ symbol: 'MSFT' });
    if (cikBySymbolResult.success && cikBySymbolResult.data) {
      console.log(`✅ CIK Mapper by Symbol: Found data for ${cikBySymbolResult.data.symbol}`);
      console.log(
        `   Symbol: ${cikBySymbolResult.data.symbol} (${cikBySymbolResult.data.companyCik})`,
      );
    } else {
      console.log('❌ CIK Mapper by Symbol failed:', cikBySymbolResult.error);
    }

    // Test 9: Get beneficial ownership
    console.log('\n9️⃣ Testing getBeneficialOwnership for AAPL...');
    const beneficialResult = await fmp.insider.getBeneficialOwnership({ symbol: 'AAPL' });
    if (beneficialResult.success && beneficialResult.data) {
      console.log(`✅ Beneficial Ownership: Found ${beneficialResult.data.length} entries`);
      if (beneficialResult.data.length > 0) {
        console.log(
          `   Sample: ${beneficialResult.data[0].nameOfReportingPerson} - ${beneficialResult.data[0].percentOfClass}%`,
        );
      }
    } else {
      console.log('❌ Beneficial Ownership failed:', beneficialResult.error);
    }

    // Test 10: Get fail to deliver
    console.log('\n🔟 Testing getFailToDeliver for GE...');
    const failToDeliverResult = await fmp.insider.getFailToDeliver({ symbol: 'GE' });
    if (failToDeliverResult.success && failToDeliverResult.data) {
      console.log(`✅ Fail to Deliver: Found ${failToDeliverResult.data.length} entries`);
      if (failToDeliverResult.data.length > 0) {
        console.log(
          `   Sample: ${failToDeliverResult.data[0].date} - ${failToDeliverResult.data[0].quantity} shares at $${failToDeliverResult.data[0].price}`,
        );
      }
    } else {
      console.log('❌ Fail to Deliver failed:', failToDeliverResult.error);
    }

    // Test 11: Test convenience methods
    console.log('\n1️⃣1️⃣ Testing convenience methods...');

    // Test getInsiderTradesBySymbol
    const tradesBySymbolResult = await fmp.insider.getInsiderTradesBySymbol('AAPL');
    if (tradesBySymbolResult.success && tradesBySymbolResult.data) {
      console.log(`✅ getInsiderTradesBySymbol: Found ${tradesBySymbolResult.data.length} trades`);
    }

    // Test getInsiderTradesByType
    const tradesByTypeResult = await fmp.insider.getInsiderTradesByType('P-Purchase');
    if (tradesByTypeResult.success && tradesByTypeResult.data) {
      console.log(
        `✅ getInsiderTradesByType: Found ${tradesByTypeResult.data.length} purchase trades`,
      );
    }

    console.log('\n🎉 All insider trading endpoint tests completed!');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the tests
testInsiderEndpoints().catch(console.error);

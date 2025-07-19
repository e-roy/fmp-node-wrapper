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
    console.log('  institutional-holder, form-13f, form-13f-dates');
    console.log('  insider-trading-rss, insider-trading-search, transaction-types');
    console.log('  insiders-by-symbol, insider-trade-statistics, cik-mapper');
    console.log('  beneficial-ownership, fail-to-deliver');
    console.log(
      '  sec-rss-feed, sec-rss-feed-all, sec-industry-classification, sec-industry-classification-cik, sec-all-industry-classifications',
    );
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
        result = await fmp.quote.getQuote('AAPL');
        break;
      case 'quote-crypto':
        result = await fmp.quote.getQuote('BTCUSD');
        break;
      case 'quote-forex':
        result = await fmp.quote.getQuote('EURUSD');
        break;
      case 'quote-commodity':
        result = await fmp.quote.getQuote('ZOUSX');
        break;
      case 'quote-etf':
        result = await fmp.quote.getQuote('SPY');
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
        result = await fmp.stock.getMarketCap('AAPL');
        break;
      case 'stock-splits':
        result = await fmp.stock.getStockSplits('AAPL');
        break;
      case 'dividend-history':
        result = await fmp.stock.getDividendHistory('AAPL');
        break;
      case 'real-time-price':
        result = await fmp.stock.getRealTimePrice(['AAPL', 'MSFT', 'GOOGL']);
        break;
      case 'real-time-price-full':
        result = await fmp.stock.getRealTimePriceForMultipleStocks(['AAPL', 'MSFT', 'GOOGL']);
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
        result = await fmp.financial.getEarningsSurprises('AAPL');
        break;

      // Company endpoints
      case 'company-profile':
        result = await fmp.company.getCompanyProfile('AAPL');
        break;
      case 'executive-compensation':
        result = await fmp.company.getExecutiveCompensation('AAPL');
        break;
      case 'company-notes':
        result = await fmp.company.getCompanyNotes('AAPL');
        break;
      case 'historical-employee-count':
        result = await fmp.company.getHistoricalEmployeeCount('AAPL');
        break;
      case 'shares-float':
        result = await fmp.company.getSharesFloat('AAPL');
        break;
      case 'historical-shares-float':
        result = await fmp.company.getHistoricalSharesFloat('AAPL');
        break;
      case 'earnings-call-transcript':
        result = await fmp.company.getEarningsCallTranscript({
          symbol: 'AAPL',
          year: 2020,
          quarter: 3,
        });
        break;
      case 'company-transcript-data':
        result = await fmp.company.getCompanyTranscriptData('AAPL');
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
      case 'earnings-confirmed':
        result = await fmp.calendar.getEarningsConfirmed({
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
        result = await fmp.etf.getHoldingDates('SPY');
        break;
      case 'etf-holdings':
        result = await fmp.etf.getHoldings({ symbol: 'SPY', date: '2023-09-30' });
        break;
      case 'etf-holder':
        result = await fmp.etf.getHolder('SPY');
        break;
      case 'etf-profile':
        result = await fmp.etf.getProfile('SPY');
        break;
      case 'etf-sector-weighting':
        result = await fmp.etf.getSectorWeighting('SPY');
        break;
      case 'etf-country-weighting':
        result = await fmp.etf.getCountryWeighting('SPY');
        break;
      case 'etf-stock-exposure':
        result = await fmp.etf.getStockExposure('SPY');
        break;

      // Senate & House Trading endpoints
      case 'senate-trading':
        result = await fmp.senateHouse.getSenateTrading({
          symbol: 'AAPL',
        });
        break;
      case 'senate-trading-rss-feed':
        result = await fmp.senateHouse.getSenateTradingRSSFeed({
          page: 0,
        });
        break;
      case 'senate-trading-by-name':
        result = await fmp.senateHouse.getSenateTradingByName({
          name: 'Jerry',
        });
        break;
      case 'house-trading':
        result = await fmp.senateHouse.getHouseTrading({
          symbol: 'AAPL',
        });
        break;
      case 'house-trading-rss-feed':
        result = await fmp.senateHouse.getHouseTradingRSSFeed({
          page: 0,
        });
        break;
      case 'house-trading-by-name':
        result = await fmp.senateHouse.getHouseTradingByName({
          name: 'nancy pelosi',
        });
        break;

      // mutual fund endpoints
      case 'mutual-fund-holders':
        result = await fmp.mutualFund.getHolders('AAPL');
        break;

      // economic endpoints
      case 'treasury-rates':
        result = await fmp.economic.getTreasuryRates({
          from: '2024-01-01',
          to: '2024-12-31',
        });
        break;

      case 'cpi':
        result = await fmp.economic.getEconomicIndicators({
          name: 'CPI', // CPI, inflationRate, inflation, retailSales, consumerSentiment, durableGoods, unemploymentRate, totalNonfarmPayroll, initialClaims, industrialProductionTotalIndex, newPrivatelyOwnedHousingUnitsStartedTotalUnits, totalVehicleSales, retailMoneyFunds, smoothedUSRecessionProbabilities, 3MonthOr90DayRatesAndYieldsCertificatesOfDeposit, commercialBankInterestRateOnCreditCardPlansAllAccounts, 30YearFixedRateMortgageAverage, 15YearFixedRateMortgageAverage
          from: '2024-01-01',
          to: '2024-12-31',
        });
        break;
      case 'unemployment':
        result = await fmp.economic.getEconomicIndicators({
          name: 'unemploymentRate',
          from: '2024-01-01',
          to: '2024-12-31',
        });
        break;
      case 'inflation':
        result = await fmp.economic.getEconomicIndicators({
          name: 'inflation',
          from: '2024-01-01',
          to: '2024-12-31',
        });
        break;

      // institutional endpoints
      case 'institutional-holder':
        result = await fmp.institutional.getInstitutionalHolders({
          symbol: 'AAPL',
        });
        break;
      case 'form-13f':
        result = await fmp.institutional.getForm13F({
          cik: '0001388838',
          date: '2021-09-30',
        });
        break;
      case 'form-13f-dates':
        result = await fmp.institutional.getForm13FDates({
          cik: '0001067983',
        });
        break;

      // insider endpoints
      case 'insider-trading-rss':
        result = await fmp.insider.getInsiderTradingRSS({
          page: 0,
        });
        break;
      case 'insider-trading-search':
        result = await fmp.insider.searchInsiderTrading({
          symbol: 'AAPL',
          page: 0,
        });
        break;
      case 'insider-trading-search-by-type':
        result = await fmp.insider.searchInsiderTrading({
          transactionType: 'P-Purchase',
          page: 0,
        });
        break;
      case 'transaction-types':
        result = await fmp.insider.getTransactionTypes();
        break;
      case 'insiders-by-symbol':
        result = await fmp.insider.getInsidersBySymbol({
          symbol: 'AAPL',
        });
        break;
      case 'insider-trade-statistics':
        result = await fmp.insider.getInsiderTradeStatistics({
          symbol: 'AAPL',
        });
        break;
      case 'cik-mapper':
        result = await fmp.insider.getCikMapper({
          page: 0,
        });
        break;
      case 'cik-mapper-by-name':
        result = await fmp.insider.getCikMapperByName({
          name: 'zuckerberg',
          page: 0,
        });
        break;
      case 'cik-mapper-by-symbol':
        result = await fmp.insider.getCikMapperBySymbol({
          symbol: 'MSFT',
        });
        break;
      case 'beneficial-ownership':
        result = await fmp.insider.getBeneficialOwnership({
          symbol: 'AAPL',
        });
        break;
      case 'fail-to-deliver':
        result = await fmp.insider.getFailToDeliver({
          symbol: 'GE',
          page: 0,
        });
        break;
      case 'insider-trades-by-symbol':
        result = await fmp.insider.getInsiderTradesBySymbol('AAPL');
        break;
      case 'insider-trades-by-type':
        result = await fmp.insider.getInsiderTradesByType('P-Purchase');
        break;
      case 'insider-trades-by-reporting-cik':
        result = await fmp.insider.getInsiderTradesByReportingCik('0001767094');
        break;
      case 'insider-trades-by-company-cik':
        result = await fmp.insider.getInsiderTradesByCompanyCik('0000320193');
        break;

      // SEC endpoints
      case 'sec-rss-feed':
        result = await fmp.sec.getRSSFeed({
          limit: 5,
          type: '10-K',
          from: '2024-01-01',
          to: '2024-12-31',
          isDone: true,
        });
        break;
      case 'sec-rss-feed-all':
        result = await fmp.sec.getRSSFeedAll({
          page: 0,
          datatype: 'csv',
        });
        break;
      case 'sec-rss-feed-v3':
        result = await fmp.sec.getRSSFeedV3({
          page: 0,
        });
        break;
      case 'sec-rss-feed-8k':
        result = await fmp.sec.getRSSFeed8K({
          page: 0,
        });
        break;
      case 'sec-filings':
        result = await fmp.sec.getSECFilings({
          symbol: 'AAPL',
          params: {
            page: 0,
          },
        });
        break;
      case 'sec-industry-classification':
        result = await fmp.sec.getIndividualIndustryClassification({ symbol: 'AAPL' });
        break;
      case 'sec-industry-classification-cik':
        result = await fmp.sec.getIndividualIndustryClassification({ cik: '0001708646' });
        break;
      case 'sec-all-industry-classifications':
        result = await fmp.sec.getAllIndustryClassifications();
        break;
      case 'sec-industry-classification-codes':
        result = await fmp.sec.getIndustryClassificationCodes({
          industryTitle: 'Software',
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

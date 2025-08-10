'use client';

export function ToolInfo() {
  const toolCategories = [
    {
      name: 'Company Tools',
      tools: [
        { name: 'getCompanyProfile', description: 'Get detailed company profile and information' },
      ],
      description: 'Company information and profiles',
    },
    {
      name: 'Quote Tools',
      tools: [
        { name: 'getStockQuote', description: 'Get real-time stock quotes and pricing data' },
      ],
      description: 'Stock quotes and pricing',
    },
    {
      name: 'Financial Tools',
      tools: [
        { name: 'getBalanceSheet', description: 'Get company balance sheet data' },
        { name: 'getIncomeStatement', description: 'Get company income statement data' },
        { name: 'getCashFlowStatement', description: 'Get company cash flow statement data' },
        { name: 'getFinancialRatios', description: 'Get key financial ratios and metrics' },
      ],
      description: 'Financial statements and ratios',
    },
    {
      name: 'Stock Tools',
      tools: [
        { name: 'getMarketCap', description: 'Get market capitalization data' },
        { name: 'getStockSplits', description: 'Get historical stock split information' },
        { name: 'getDividendHistory', description: 'Get dividend payment history' },
      ],
      description: 'Stock-specific data and history',
    },
    {
      name: 'Market Tools',
      tools: [
        { name: 'getMarketPerformance', description: 'Get overall market performance data' },
        { name: 'getSectorPerformance', description: 'Get sector-wise performance metrics' },
        { name: 'getGainers', description: 'Get top gaining stocks' },
        { name: 'getLosers', description: 'Get top losing stocks' },
        { name: 'getMostActive', description: 'Get most actively traded stocks' },
      ],
      description: 'Market performance and rankings',
    },
    {
      name: 'Calendar Tools',
      tools: [
        { name: 'getEarningsCalendar', description: 'Get upcoming earnings announcements' },
        { name: 'getEconomicCalendar', description: 'Get economic events and indicators' },
      ],
      description: 'Earnings and economic calendars',
    },
    {
      name: 'Economic Tools',
      tools: [
        { name: 'getTreasuryRates', description: 'Get current treasury rates and yields' },
        { name: 'getEconomicIndicators', description: 'Get key economic indicators' },
      ],
      description: 'Economic data and indicators',
    },
    {
      name: 'ETF Tools',
      tools: [
        { name: 'getETFHoldings', description: 'Get ETF holdings and allocations' },
        { name: 'getETFProfile', description: 'Get ETF profile and information' },
      ],
      description: 'ETF data and holdings',
    },
    {
      name: 'Insider Tools',
      tools: [{ name: 'getInsiderTrading', description: 'Get insider trading activity' }],
      description: 'Insider trading data',
    },
    {
      name: 'Institutional Tools',
      tools: [{ name: 'getInstitutionalHolders', description: 'Get institutional ownership data' }],
      description: 'Institutional ownership',
    },
    {
      name: 'Congressional Tools',
      tools: [
        { name: 'getSenateTrading', description: 'Get Senate trading activity by stock' },
        { name: 'getHouseTrading', description: 'Get House trading activity by stock' },
        { name: 'getSenateTradingByName', description: 'Get trading activity by senator name' },
        {
          name: 'getHouseTradingByName',
          description: 'Get trading activity by representative name',
        },
        { name: 'getSenateTradingRSSFeed', description: 'Get recent Senate trading via RSS' },
        { name: 'getHouseTradingRSSFeed', description: 'Get recent House trading via RSS' },
      ],
      description: 'Congressional trading transparency',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Tools (28 Tools)</h2>
      <p className="text-sm text-gray-600 mb-6">
        Ask questions about companies, stocks, markets, economics, or congressional trading. The AI
        agent will automatically use the appropriate tools from our comprehensive financial toolkit
        to answer your questions.
      </p>

      <div className="space-y-4">
        {toolCategories.map(category => (
          <div key={category.name} className="border-b border-gray-100 pb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">{category.name}</h3>
            <p className="text-xs text-green-600 mb-2">{category.description}</p>
            <div className="space-y-1">
              {category.tools.map(tool => (
                <div key={tool.name} className="text-xs text-gray-600">
                  <span className="font-mono text-gray-800">{tool.name}</span>
                  <span className="ml-2">- {tool.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-sm font-medium text-green-900 mb-2">Example Questions</h3>
        <ul className="text-xs text-green-800 space-y-1">
          <li>• "What's Apple's company profile and current stock price?"</li>
          <li>• "Show me Tesla's financial statements and market cap"</li>
          <li>• "Get the top market gainers and losers today"</li>
          <li>• "What are the upcoming earnings this week?"</li>
          <li>• "Show me Nancy Pelosi's recent stock trades"</li>
          <li>• "Get Microsoft's dividend history and stock splits"</li>
          <li>• "What are current treasury rates and economic indicators?"</li>
          <li>• "Show me SPY's ETF holdings and institutional owners"</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">OpenAI Agents + FMP Tools</h3>
        <p className="text-xs text-blue-800">
          This example uses the OpenAI Agents SDK with 28 Financial Modeling Prep tools to create an
          intelligent financial assistant that can analyze markets, track congressional trading,
          review financial statements, and provide comprehensive investment research.
        </p>
      </div>
    </div>
  );
}

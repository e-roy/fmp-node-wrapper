'use client';

export function ToolInfo() {
  const toolCategories = [
    {
      name: 'Quote Tools',
      tools: [{ name: 'getStockQuote', description: 'Get stock quote for a company' }],
    },
    {
      name: 'Company Tools',
      tools: [{ name: 'getCompanyProfile', description: 'Get company profile and information' }],
    },
    {
      name: 'Financial Tools',
      tools: [
        { name: 'getBalanceSheet', description: 'Get balance sheet statements' },
        { name: 'getIncomeStatement', description: 'Get income statements' },
        { name: 'getCashFlowStatement', description: 'Get cash flow statements' },
        { name: 'getFinancialRatios', description: 'Get financial ratios' },
      ],
    },
    {
      name: 'Stock Tools',
      tools: [
        { name: 'getMarketCap', description: 'Get market capitalization' },
        { name: 'getStockSplits', description: 'Get stock splits history' },
        { name: 'getDividendHistory', description: 'Get dividend history' },
      ],
    },
    {
      name: 'Market Tools',
      tools: [
        { name: 'getMarketPerformance', description: 'Get overall market performance' },
        { name: 'getSectorPerformance', description: 'Get sector performance' },
        { name: 'getGainers', description: 'Get top gaining stocks' },
        { name: 'getLosers', description: 'Get top losing stocks' },
        { name: 'getMostActive', description: 'Get most active stocks' },
      ],
    },
    {
      name: 'Calendar Tools',
      tools: [
        { name: 'getEarningsCalendar', description: 'Get earnings calendar' },
        { name: 'getEconomicCalendar', description: 'Get economic calendar' },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Tools</h2>
      <p className="text-sm text-gray-600 mb-6">
        Ask questions about stocks, financial data, and market information. The AI will
        automatically use the appropriate tools to answer your questions.
      </p>

      <div className="space-y-4">
        {toolCategories.map(category => (
          <div key={category.name} className="border-b border-gray-100 pb-4 last:border-b-0">
            <h3 className="text-sm font-medium text-gray-900 mb-2">{category.name}</h3>
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

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Example Questions</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• "What's Apple's current stock price?"</li>
          <li>• "Show me Tesla's financial ratios"</li>
          <li>• "What are today's top gainers?"</li>
          <li>• "Get Microsoft's balance sheet"</li>
          <li>• "What's the market performance today?"</li>
        </ul>
      </div>
    </div>
  );
}

import { fmpTools } from '@/providers/vercel-ai';

// Mock the FMP client
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    quote: { getQuote: jest.fn() },
    company: { getCompanyProfile: jest.fn() },
    financial: { getBalanceSheet: jest.fn() },
  })),
}));

describe('FMP Tools', () => {
  describe('Vercel AI SDK Tools', () => {
    it('should have getStockQuote tool', () => {
      expect(fmpTools.getStockQuote).toBeDefined();
      expect(fmpTools.getStockQuote.description).toBe('Get the stock quote for a company');
    });

    it('should have getCompanyProfile tool', () => {
      expect(fmpTools.getCompanyProfile).toBeDefined();
      expect(fmpTools.getCompanyProfile.description).toBe('Get the company profile');
    });

    it('should have getBalanceSheet tool', () => {
      expect(fmpTools.getBalanceSheet).toBeDefined();
      expect(fmpTools.getBalanceSheet.description).toBe('Get balance sheet for a company');
    });

    it('should have getIncomeStatement tool', () => {
      expect(fmpTools.getIncomeStatement).toBeDefined();
      expect(fmpTools.getIncomeStatement.description).toBe('Get income statement for a company');
    });

    it('should have getCashFlowStatement tool', () => {
      expect(fmpTools.getCashFlowStatement).toBeDefined();
      expect(fmpTools.getCashFlowStatement.description).toBe(
        'Get cash flow statement for a company',
      );
    });

    it('should have correct tool structure for all tools', () => {
      Object.values(fmpTools).forEach(tool => {
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('inputSchema');
        expect(tool).toHaveProperty('execute');
        expect(typeof tool.execute).toBe('function');
      });
    });
  });
});

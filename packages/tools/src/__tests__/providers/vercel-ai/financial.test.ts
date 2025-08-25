import { financialTools } from '@/providers/vercel-ai/financial';

const mockFinancial = {
  getBalanceSheet: jest.fn(),
  getIncomeStatement: jest.fn(),
  getCashFlowStatement: jest.fn(),
  getFinancialRatios: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    financial: mockFinancial,
  })),
}));

describe('Vercel AI Financial Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getBalanceSheet executes and returns data', async () => {
    mockFinancial.getBalanceSheet.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (financialTools.getBalanceSheet.execute as any)({
      symbol: 'AAPL',
      period: 'annual',
    });

    expect(mockFinancial.getBalanceSheet).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getIncomeStatement executes and returns data', async () => {
    mockFinancial.getIncomeStatement.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (financialTools.getIncomeStatement.execute as any)({
      symbol: 'AAPL',
      period: 'annual',
    });

    expect(mockFinancial.getIncomeStatement).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getCashFlowStatement executes and returns data', async () => {
    mockFinancial.getCashFlowStatement.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (financialTools.getCashFlowStatement.execute as any)({
      symbol: 'AAPL',
      period: 'annual',
    });

    expect(mockFinancial.getCashFlowStatement).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getFinancialRatios executes and returns data', async () => {
    mockFinancial.getFinancialRatios.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (financialTools.getFinancialRatios.execute as any)({
      symbol: 'AAPL',
      period: 'annual',
    });

    expect(mockFinancial.getFinancialRatios).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

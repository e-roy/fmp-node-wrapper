import {
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getFinancialRatios,
} from '@/providers/openai/financial';

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

describe('OpenAI Financial Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getBalanceSheet executes and returns data', async () => {
    mockFinancial.getBalanceSheet.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getBalanceSheet as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getBalanceSheet).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getIncomeStatement executes and returns data', async () => {
    mockFinancial.getIncomeStatement.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getIncomeStatement as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getIncomeStatement).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getCashFlowStatement executes and returns data', async () => {
    mockFinancial.getCashFlowStatement.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getCashFlowStatement as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getCashFlowStatement).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getFinancialRatios executes and returns data', async () => {
    mockFinancial.getFinancialRatios.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getFinancialRatios as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getFinancialRatios).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

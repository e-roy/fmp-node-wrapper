import {
  getBalanceSheet,
  getIncomeStatement,
  getCashFlowStatement,
  getKeyMetrics,
  getFinancialRatios,
  getEnterpriseValue,
  getCashflowGrowth,
  getIncomeGrowth,
  getBalanceSheetGrowth,
  getFinancialGrowth,
  getEarningsHistorical,
} from '@/providers/openai/financial';

const mockFinancial = {
  getBalanceSheet: jest.fn(),
  getIncomeStatement: jest.fn(),
  getCashFlowStatement: jest.fn(),
  getKeyMetrics: jest.fn(),
  getFinancialRatios: jest.fn(),
  getEnterpriseValue: jest.fn(),
  getCashflowGrowth: jest.fn(),
  getIncomeGrowth: jest.fn(),
  getBalanceSheetGrowth: jest.fn(),
  getFinancialGrowth: jest.fn(),
  getEarningsHistorical: jest.fn(),
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
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getIncomeStatement executes and returns data', async () => {
    mockFinancial.getIncomeStatement.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getIncomeStatement as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getIncomeStatement).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getCashFlowStatement executes and returns data', async () => {
    mockFinancial.getCashFlowStatement.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getCashFlowStatement as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getCashFlowStatement).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getKeyMetrics executes and returns data', async () => {
    mockFinancial.getKeyMetrics.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getKeyMetrics as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getKeyMetrics).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getFinancialRatios executes and returns data', async () => {
    mockFinancial.getFinancialRatios.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getFinancialRatios as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getFinancialRatios).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getEnterpriseValue executes and returns data', async () => {
    mockFinancial.getEnterpriseValue.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getEnterpriseValue as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getEnterpriseValue).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getCashflowGrowth executes and returns data', async () => {
    mockFinancial.getCashflowGrowth.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getCashflowGrowth as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getCashflowGrowth).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getIncomeGrowth executes and returns data', async () => {
    mockFinancial.getIncomeGrowth.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getIncomeGrowth as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getIncomeGrowth).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getBalanceSheetGrowth executes and returns data', async () => {
    mockFinancial.getBalanceSheetGrowth.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getBalanceSheetGrowth as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getBalanceSheetGrowth).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getFinancialGrowth executes and returns data', async () => {
    mockFinancial.getFinancialGrowth.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getFinancialGrowth as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getFinancialGrowth).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 5,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getEarningsHistorical executes and returns data', async () => {
    mockFinancial.getEarningsHistorical.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });
    const result = await (getEarningsHistorical as any).execute({ symbol: 'AAPL' });
    expect(mockFinancial.getEarningsHistorical).toHaveBeenCalledWith({
      symbol: 'AAPL',
      limit: 10,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

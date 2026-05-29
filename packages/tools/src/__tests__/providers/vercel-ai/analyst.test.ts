import { analystTools } from '@/providers/vercel-ai';

const mockAnalyst = {
  getEstimates: jest.fn(),
  getPriceTargetConsensus: jest.fn(),
  getGrades: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    analyst: mockAnalyst,
  })),
}));

describe('Vercel AI Analyst Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAnalystEstimates applies period/limit defaults', async () => {
    mockAnalyst.getEstimates.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (analystTools.getAnalystEstimates.execute as any)({ symbol: 'AAPL' });

    expect(mockAnalyst.getEstimates).toHaveBeenCalledWith({
      symbol: 'AAPL',
      period: 'annual',
      limit: 10,
    });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });

  it('getPriceTargetConsensus forwards the symbol', async () => {
    mockAnalyst.getPriceTargetConsensus.mockResolvedValueOnce({ data: { symbol: 'AAPL' } });

    const result = await (analystTools.getPriceTargetConsensus.execute as any)({ symbol: 'AAPL' });

    expect(mockAnalyst.getPriceTargetConsensus).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL' });
  });

  it('getStockGrades caps the array to the limit', async () => {
    const grades = Array.from({ length: 40 }, (_, i) => ({ newGrade: `g${i}` }));
    mockAnalyst.getGrades.mockResolvedValueOnce({
      success: true,
      data: grades,
      error: null,
      status: 200,
    });

    const result = await (analystTools.getStockGrades.execute as any)({ symbol: 'AAPL', limit: 5 });

    expect(mockAnalyst.getGrades).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toHaveLength(5);
  });
});

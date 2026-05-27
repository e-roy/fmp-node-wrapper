import { technicalTools } from '@/providers/vercel-ai';

const mockTechnical = {
  getTechnicalIndicator: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    technical: mockTechnical,
  })),
}));

describe('Vercel AI Technical Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTechnicalIndicator applies defaults and caps the array to the limit', async () => {
    const bars = Array.from({ length: 100 }, (_, i) => ({ date: `d${i}`, rsi: i }));
    mockTechnical.getTechnicalIndicator.mockResolvedValueOnce({
      success: true,
      data: bars,
      error: null,
      status: 200,
    });

    const result = await (technicalTools.getTechnicalIndicator.execute as any)({
      symbol: 'AAPL',
      type: 'rsi',
      periodLength: 14,
      limit: 10,
    });

    expect(mockTechnical.getTechnicalIndicator).toHaveBeenCalledWith({
      symbol: 'AAPL',
      type: 'rsi',
      periodLength: 14,
      timeframe: '1day',
    });
    expect(JSON.parse(result)).toHaveLength(10);
  });
});

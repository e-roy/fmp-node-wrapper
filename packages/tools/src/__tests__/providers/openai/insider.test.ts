import { getInsiderTrading } from '@/providers/openai/insider';

const mockInsider = {
  getInsiderTradesBySymbol: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    insider: mockInsider,
  })),
}));

describe('OpenAI Insider Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getInsiderTrading executes and returns data (default page)', async () => {
    mockInsider.getInsiderTradesBySymbol.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (getInsiderTrading as any).execute({ symbol: 'AAPL' });

    expect(mockInsider.getInsiderTradesBySymbol).toHaveBeenCalledWith('AAPL', 0);
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

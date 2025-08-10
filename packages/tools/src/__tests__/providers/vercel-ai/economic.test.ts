import { economicTools } from '@/providers/vercel-ai/economic';

const mockEconomic = {
  getTreasuryRates: jest.fn(),
  getEconomicIndicators: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    economic: mockEconomic,
  })),
}));

describe('Vercel AI Economic Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTreasuryRates executes and returns data', async () => {
    mockEconomic.getTreasuryRates.mockResolvedValueOnce({ data: [{ date: '2024-01-15' }] });

    const params = { from: '2024-01-01', to: '2024-01-31' };
    const result = await (economicTools.getTreasuryRates.execute as any)(params);

    expect(mockEconomic.getTreasuryRates).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ date: '2024-01-15' }]);
  });

  it('getEconomicIndicators executes and returns data', async () => {
    mockEconomic.getEconomicIndicators.mockResolvedValueOnce({ data: [{ indicator: 'GDP' }] });

    const result = await (economicTools.getEconomicIndicators.execute as any)({ name: 'GDP' });

    expect(mockEconomic.getEconomicIndicators).toHaveBeenCalledWith({
      name: 'GDP',
      from: undefined,
      to: undefined,
    });
    expect(JSON.parse(result)).toEqual([{ indicator: 'GDP' }]);
  });
});

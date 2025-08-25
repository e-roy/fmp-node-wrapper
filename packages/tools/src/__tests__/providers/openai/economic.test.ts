import { getTreasuryRates, getEconomicIndicators } from '@/providers/openai/economic';

const mockEconomic = {
  getTreasuryRates: jest.fn(),
  getEconomicIndicators: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    economic: mockEconomic,
  })),
}));

describe('OpenAI Economic Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTreasuryRates executes and returns data', async () => {
    mockEconomic.getTreasuryRates.mockResolvedValueOnce({ data: [{ date: '2024-01-15' }] });
    const params = { from: '2024-01-01', to: '2024-01-31' };

    const result = await (getTreasuryRates as any).execute(params);

    expect(mockEconomic.getTreasuryRates).toHaveBeenCalledWith(params);
    expect(JSON.parse(result)).toEqual([{ date: '2024-01-15' }]);
  });

  it('getEconomicIndicators executes and returns data', async () => {
    mockEconomic.getEconomicIndicators.mockResolvedValueOnce({ data: [{ name: 'GDP' }] });

    const result = await (getEconomicIndicators as any).execute({ name: 'GDP' });

    expect(mockEconomic.getEconomicIndicators).toHaveBeenCalledWith({
      name: 'GDP',
      from: undefined,
      to: undefined,
    });
    expect(JSON.parse(result)).toEqual([{ name: 'GDP' }]);
  });
});

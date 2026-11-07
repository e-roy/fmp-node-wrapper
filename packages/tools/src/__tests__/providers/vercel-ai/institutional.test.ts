import { institutionalTools } from '@/providers/vercel-ai';

const mockInstitutional = {
  getInstitutionalHolders: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    institutional: mockInstitutional,
  })),
}));

describe('Vercel AI Institutional Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getInstitutionalHolders executes and returns data', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({
      data: [{ holder: 'Vanguard' }],
    });

    const result = await (institutionalTools.getInstitutionalHolders.execute as any)({
      symbol: 'AAPL',
    });

    expect(mockInstitutional.getInstitutionalHolders).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual([{ holder: 'Vanguard' }]);
  });

  it('getInstitutionalHolders returns the largest `limit` holders first', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({
      success: true,
      data: [
        { holder: 'Small', shares: 10 },
        { holder: 'Largest', shares: 300 },
        { holder: 'Middle', shares: 200 },
      ],
    });

    const result = await (institutionalTools.getInstitutionalHolders.execute as any)({
      symbol: 'AAPL',
      limit: 2,
    });

    expect(JSON.parse(result).map((h: { holder: string }) => h.holder)).toEqual([
      'Largest',
      'Middle',
    ]);
  });
});

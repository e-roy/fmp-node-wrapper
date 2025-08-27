import { institutionalTools } from '@/providers/vercel-ai/institutional';

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
});

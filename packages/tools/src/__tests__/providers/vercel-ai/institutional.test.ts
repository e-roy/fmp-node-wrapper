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
      data: [{ holder: 'Vanguard', shares: 1, dateReported: '2026-09-30' }],
    });

    const result = await (institutionalTools.getInstitutionalHolders.execute as any)({
      symbol: 'AAPL',
    });

    expect(mockInstitutional.getInstitutionalHolders).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual([{ holder: 'Vanguard', shares: 1, dateReported: '2026-09-30' }]);
  });

  it('getInstitutionalHolders returns the largest `limit` holders first, flagged as truncated', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({
      success: true,
      data: [
        { holder: 'Small', shares: 10, dateReported: '2026-09-30' },
        { holder: 'Largest', shares: 300, dateReported: '2026-09-30' },
        { holder: 'Middle', shares: 200, dateReported: '2026-06-30' },
      ],
    });

    const result = JSON.parse(
      await (institutionalTools.getInstitutionalHolders.execute as any)({ symbol: 'AAPL', limit: 2 }),
    );

    expect(result.data.map((h: { holder: string }) => h.holder)).toEqual(['Largest', 'Middle']);
    expect(result.truncated).toBe(true);
    expect(result.note).toContain('Showing 2 of 3 rows');
  });

  it('getInstitutionalHolders keeps the last two quarters and merges name variants', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({
      success: true,
      data: [
        { holder: 'BlackRock, Inc.', shares: 1163, dateReported: '2026-06-30' },
        { holder: 'BlackRock Inc.', shares: 1050, dateReported: '2026-03-31' },
        { holder: 'BlackRock Fund Advisors', shares: 77, dateReported: '2016-12-31' },
        { holder: 'VANGUARD GROUP INC', shares: 1426, dateReported: '2025-12-31' },
        { holder: 'VANGUARD CAPITAL MANAGEMENT LLC', shares: 900, dateReported: '2026-09-30' },
      ],
    });

    const result = JSON.parse(
      await (institutionalTools.getInstitutionalHolders.execute as any)({ symbol: 'AAPL' }),
    );

    // Newest is 2026-09-30, so 2026-06-30 stays; 2026-03-31 and older (incl. the
    // pre-restructuring Vanguard entity) drop out. Largest first.
    expect(result.map((h: { holder: string }) => h.holder)).toEqual([
      'BlackRock, Inc.',
      'VANGUARD CAPITAL MANAGEMENT LLC',
    ]);
  });

  it('getInstitutionalHolders enforces the max limit', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({
      success: true,
      data: Array.from({ length: 150 }, (_, i) => ({ holder: `H${i}`, shares: i, dateReported: '2026-09-30' })),
    });

    const result = JSON.parse(
      await (institutionalTools.getInstitutionalHolders.execute as any)({ symbol: 'AAPL', limit: 2000 }),
    );

    expect(result).toMatchObject({ truncated: true, total: 150, returned: 100 });
  });

  it('getInstitutionalHolders falls back to the default limit when limit is null', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({
      success: true,
      data: [{ holder: 'Vanguard', shares: 1, dateReported: '2026-09-30' }],
    });

    const result = JSON.parse(
      await (institutionalTools.getInstitutionalHolders.execute as any)({ symbol: 'AAPL', limit: null }),
    );

    expect(result).toHaveLength(1);
  });
});

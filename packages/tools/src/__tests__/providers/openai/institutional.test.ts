import { getInstitutionalHolders } from '@/providers/openai';

const mockInstitutional = {
  getInstitutionalHolders: jest.fn(),
};

jest.mock('@/client', () => ({
  getFMPClient: jest.fn(() => ({
    institutional: mockInstitutional,
  })),
}));

describe('getInstitutionalHolders (minimal coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('executes and returns data (happy path)', async () => {
    const holder = { holder: 'VANGUARD GROUP INC', shares: 100, dateReported: '2026-09-30', change: 0 };
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({ data: [holder] });

    const result = await (getInstitutionalHolders as any).execute({ symbol: 'AAPL' });

    expect(mockInstitutional.getInstitutionalHolders).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual([holder]);
  });
});

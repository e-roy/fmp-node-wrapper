import { getInstitutionalHolders } from '@/providers/openai/institutional';

const mockInstitutional = {
  getInstitutionalHolders: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    institutional: mockInstitutional,
  })),
}));

describe('getInstitutionalHolders (minimal coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('executes and returns data (happy path)', async () => {
    mockInstitutional.getInstitutionalHolders.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (getInstitutionalHolders as any).execute({ symbol: 'AAPL' });

    expect(mockInstitutional.getInstitutionalHolders).toHaveBeenCalledWith({ symbol: 'AAPL' });
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

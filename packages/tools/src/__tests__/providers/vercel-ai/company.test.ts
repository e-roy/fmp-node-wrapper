import { companyTools } from '@/providers/vercel-ai/company';

const mockCompany = {
  getCompanyProfile: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    company: mockCompany,
  })),
}));

describe('Vercel AI Company Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getCompanyProfile executes and returns data', async () => {
    mockCompany.getCompanyProfile.mockResolvedValueOnce({ data: { symbol: 'AAPL' } });

    const result = await (companyTools.getCompanyProfile.execute as any)({ symbol: 'AAPL' });

    expect(mockCompany.getCompanyProfile).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL' });
  });
});

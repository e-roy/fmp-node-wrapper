import { getCompanyProfile } from '@/providers/openai/company';

const mockCompany = {
  getCompanyProfile: jest.fn(),
};

jest.mock('@/types', () => ({
  getFMPClient: jest.fn(() => ({
    company: mockCompany,
  })),
}));

describe('OpenAI Company Tools (minimal)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getCompanyProfile executes and returns data', async () => {
    mockCompany.getCompanyProfile.mockResolvedValueOnce({ data: [{ symbol: 'AAPL' }] });

    const result = await (getCompanyProfile as any).execute({ symbol: 'AAPL' });

    expect(mockCompany.getCompanyProfile).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL' }]);
  });
});

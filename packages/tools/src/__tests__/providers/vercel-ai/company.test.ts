import { companyTools } from '@/providers/vercel-ai/company';

const mockCompany = {
  getCompanyProfile: jest.fn(),
  getSharesFloat: jest.fn(),
  getExecutiveCompensation: jest.fn(),
};

jest.mock('@/client', () => ({
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

  it('getCompanySharesFloat executes and returns data', async () => {
    mockCompany.getSharesFloat.mockResolvedValueOnce({
      data: { symbol: 'AAPL', sharesFloat: 1000000 },
    });

    const result = await (companyTools.getCompanySharesFloat.execute as any)({ symbol: 'AAPL' });

    expect(mockCompany.getSharesFloat).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL', sharesFloat: 1000000 });
  });

  it('getCompanyExecutiveCompensation executes and returns data', async () => {
    mockCompany.getExecutiveCompensation.mockResolvedValueOnce({
      data: { symbol: 'AAPL', compensation: 1000000 },
    });

    const result = await (companyTools.getCompanyExecutiveCompensation.execute as any)({
      symbol: 'AAPL',
    });

    expect(mockCompany.getExecutiveCompensation).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual({ symbol: 'AAPL', compensation: 1000000 });
  });
});

import {
  getCompanyProfile,
  getCompanySharesFloat,
  getCompanyExecutiveCompensation,
} from '@/providers/openai/company';

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

  it('getCompanySharesFloat executes and returns data', async () => {
    mockCompany.getSharesFloat.mockResolvedValueOnce({
      data: [{ symbol: 'AAPL', sharesFloat: 1000000 }],
    });

    const result = await (getCompanySharesFloat as any).execute({ symbol: 'AAPL' });

    expect(mockCompany.getSharesFloat).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL', sharesFloat: 1000000 }]);
  });

  it('getCompanyExecutiveCompensation executes and returns data', async () => {
    mockCompany.getExecutiveCompensation.mockResolvedValueOnce({
      data: [{ symbol: 'AAPL', compensation: 1000000 }],
    });

    const result = await (getCompanyExecutiveCompensation as any).execute({ symbol: 'AAPL' });

    expect(mockCompany.getExecutiveCompensation).toHaveBeenCalledWith('AAPL');
    expect(JSON.parse(result)).toEqual([{ symbol: 'AAPL', compensation: 1000000 }]);
  });
});

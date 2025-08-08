import { companyTools } from '@/providers/vercel-ai/company';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    company: {
      getCompanyProfile: jest.fn().mockResolvedValue({
        data: {
          symbol: 'AAPL',
          companyName: 'Apple Inc.',
          ceo: 'Timothy D. Cook',
          sector: 'Technology',
          industry: 'Consumer Electronics',
          website: 'https://www.apple.com',
          description: 'Apple Inc. designs, manufactures, and markets smartphones...',
        },
      }),
    },
  })),
}));

describe('Vercel AI Company Tools', () => {
  describe('getCompanyProfile', () => {
    it('should be defined', () => {
      expect(companyTools.getCompanyProfile).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = companyTools.getCompanyProfile;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(companyTools.getCompanyProfile.description).toBe('Get the company profile');
    });

    it('should have correct input schema', () => {
      const tool = companyTools.getCompanyProfile;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getCompanyProfile tool', async () => {
      const tool = companyTools.getCompanyProfile;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});

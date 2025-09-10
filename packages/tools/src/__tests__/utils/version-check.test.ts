// Mock console.warn to capture output
const mockConsoleWarn = jest.fn();
const originalConsoleWarn = console.warn;

describe('Version Check Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleWarn.mockClear();
    console.warn = mockConsoleWarn;
  });

  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  describe('error messages', () => {
    it('should provide helpful error messages', async () => {
      const { checkOpenAIAgentsVersion } = await import('../../utils/version-check');

      const originalResolve = require.resolve;
      require.resolve = jest.fn().mockImplementation(() => {
        throw new Error('Cannot resolve module');
      }) as unknown as typeof require.resolve;

      expect(() => checkOpenAIAgentsVersion()).toThrow('npm install @openai/agents');
      expect(() => checkOpenAIAgentsVersion()).toThrow('@openai/agents package not found');

      require.resolve = originalResolve;
    });
  });
});

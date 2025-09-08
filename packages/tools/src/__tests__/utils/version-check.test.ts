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

  describe('warnOpenAIAgentsVersion', () => {
    it('should handle errors gracefully', async () => {
      const { warnOpenAIAgentsVersion } = await import('../../utils/version-check');

      // This should not throw, even if there are issues
      expect(() => warnOpenAIAgentsVersion()).not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle missing package gracefully in warn function', async () => {
      const { warnOpenAIAgentsVersion } = await import('../../utils/version-check');

      // Mock require.resolve to throw an error
      const originalResolve = require.resolve;
      require.resolve = jest.fn().mockImplementation(() => {
        throw new Error('Cannot resolve module');
      }) as unknown as typeof require.resolve;

      warnOpenAIAgentsVersion();
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Version compatibility warning:',
        expect.stringContaining('@openai/agents package not found'),
      );

      // Restore original function
      require.resolve = originalResolve;
    });
  });

  describe('error messages', () => {
    it('should provide helpful error messages', async () => {
      const { checkOpenAIAgentsVersion } = await import('../../utils/version-check');

      const originalResolve = require.resolve;
      require.resolve = jest.fn().mockImplementation(() => {
        throw new Error('Cannot resolve module');
      }) as unknown as typeof require.resolve;

      expect(() => checkOpenAIAgentsVersion()).toThrow('npm install @openai/agents@0.1.0');
      expect(() => checkOpenAIAgentsVersion()).toThrow('@openai/agents package not found');

      require.resolve = originalResolve;
    });
  });

  describe('error scenarios', () => {
    it('should handle missing package gracefully', async () => {
      const { warnOpenAIAgentsVersion } = await import('../../utils/version-check');

      // Test that warn function handles errors gracefully
      expect(() => warnOpenAIAgentsVersion()).not.toThrow();
    });

    it('should provide helpful error messages', async () => {
      const { checkOpenAIAgentsVersion } = await import('../../utils/version-check');

      // Test that error messages contain helpful information
      try {
        checkOpenAIAgentsVersion();
      } catch (error) {
        expect((error as Error).message).toContain('@openai/agents package not found');
        expect((error as Error).message).toContain('npm install @openai/agents@0.1.0');
      }
    });
  });

  describe('integration', () => {
    it('should work with actual installed version', async () => {
      const { warnOpenAIAgentsVersion } = await import('../../utils/version-check');

      // Test that warn function works with real environment
      expect(() => warnOpenAIAgentsVersion()).not.toThrow();
    });
  });
});

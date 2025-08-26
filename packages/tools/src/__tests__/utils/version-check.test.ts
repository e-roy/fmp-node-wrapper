// Mock console.warn to capture output
const mockConsoleWarn = jest.fn();
const originalConsoleWarn = console.warn;

// Mock the @openai/agents module
jest.mock('@openai/agents', () => ({
  tool: jest.fn(),
}));

describe('Version Check Utility', () => {
  let mockTool: jest.MockedFunction<any>;
  let versionCheckModule: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockConsoleWarn.mockClear();
    console.warn = mockConsoleWarn;

    // Get the mocked tool function
    const openaiAgents = await import('@openai/agents');
    mockTool = openaiAgents.tool;

    // Import the version check module
    versionCheckModule = await import('../../utils/version-check');
  });

  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  describe('checkOpenAIAgentsVersion', () => {
    it('should pass when @openai/agents is compatible', () => {
      mockTool.mockReturnValue({});

      expect(() => versionCheckModule.checkOpenAIAgentsVersion()).not.toThrow();
    });

    it('should throw error when @openai/agents is incompatible', () => {
      mockTool.mockImplementation(() => {
        throw new Error('Zod field uses .optional() without .nullable()');
      });

      expect(() => versionCheckModule.checkOpenAIAgentsVersion()).toThrow(
        'Incompatible @openai/agents version detected',
      );
      expect(() => versionCheckModule.checkOpenAIAgentsVersion()).toThrow(
        'This package requires version ^0.0.17 or higher',
      );
      expect(() => versionCheckModule.checkOpenAIAgentsVersion()).toThrow(
        'npm install @openai/agents@latest',
      );
    });

    it('should include error details in thrown message', () => {
      const testError = new Error('Test error message');
      mockTool.mockImplementation(() => {
        throw testError;
      });

      expect(() => versionCheckModule.checkOpenAIAgentsVersion()).toThrow(
        'Error details: Test error message',
      );
    });
  });

  describe('warnOpenAIAgentsVersion', () => {
    it('should not warn when version is compatible', () => {
      mockTool.mockReturnValue({});

      versionCheckModule.warnOpenAIAgentsVersion();
      expect(mockConsoleWarn).not.toHaveBeenCalled();
    });

    it('should warn when version is incompatible', () => {
      mockTool.mockImplementation(() => {
        throw new Error('Incompatible version');
      });

      versionCheckModule.warnOpenAIAgentsVersion();
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Version compatibility warning:',
        'Incompatible @openai/agents version detected. This package requires version ^0.0.17 or higher due to breaking changes in the API. Please upgrade with: npm install @openai/agents@latest\n\nError details: Incompatible version',
      );
    });

    it('should handle non-Error objects thrown', () => {
      mockTool.mockImplementation(() => {
        throw 'String error';
      });

      versionCheckModule.warnOpenAIAgentsVersion();
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        '⚠️  Version compatibility warning:',
        'Incompatible @openai/agents version detected. This package requires version ^0.0.17 or higher due to breaking changes in the API. Please upgrade with: npm install @openai/agents@latest\n\nError details: String error',
      );
    });
  });
});

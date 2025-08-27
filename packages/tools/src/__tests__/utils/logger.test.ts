import {
  isApiLoggingEnabled,
  isDataOnlyLoggingEnabled,
  logApiExecution,
  logDataOnly,
  logApiExecutionWithTiming,
} from '../../utils/logger';

// Mock console.log to capture output
const mockConsoleLog = jest.fn();
const originalConsoleLog = console.log;

describe('Logger Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog.mockClear();
    console.log = mockConsoleLog;
    delete process.env.FMP_TOOLS_LOG_API_RESULTS;
    delete process.env.FMP_TOOLS_LOG_DATA_ONLY;
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  describe('Environment Variable Checks', () => {
    it('should check API logging environment variable', () => {
      expect(isApiLoggingEnabled()).toBe(false);
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';
      expect(isApiLoggingEnabled()).toBe(true);
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'false';
      expect(isApiLoggingEnabled()).toBe(false);
    });

    it('should check data-only logging environment variable', () => {
      expect(isDataOnlyLoggingEnabled()).toBe(false);
      process.env.FMP_TOOLS_LOG_DATA_ONLY = 'true';
      expect(isDataOnlyLoggingEnabled()).toBe(true);
      process.env.FMP_TOOLS_LOG_DATA_ONLY = 'false';
      expect(isDataOnlyLoggingEnabled()).toBe(false);
    });
  });

  describe('logApiExecution', () => {
    const mockOptions = {
      toolName: 'testTool',
      input: { symbol: 'AAPL' },
      result: { price: 150.25 },
      executionTime: 100,
    };

    it('should not log when disabled', () => {
      logApiExecution(mockOptions);
      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('should log when enabled', () => {
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';
      logApiExecution(mockOptions);

      const calls = mockConsoleLog.mock.calls;
      expect(calls.some(call => call[0].includes('🔧 FMP Tool Execution: testTool'))).toBe(true);
      expect(calls.some(call => call[0].includes('⏱️  Execution Time: 100ms'))).toBe(true);
    });

    it('should handle different result types', () => {
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';

      logApiExecution({ ...mockOptions, result: [1, 2, 3] });
      logApiExecution({ ...mockOptions, result: 'test string' });
      logApiExecution({ ...mockOptions, result: null });

      expect(mockConsoleLog).toHaveBeenCalled();
    });
  });

  describe('logDataOnly', () => {
    const mockOptions = {
      toolName: 'testTool',
      input: { symbol: 'AAPL' },
      result: { price: 150.25 },
      executionTime: 100,
    };

    it('should not log when disabled', () => {
      logDataOnly(mockOptions);
      expect(mockConsoleLog).not.toHaveBeenCalled();
    });

    it('should log when enabled', () => {
      process.env.FMP_TOOLS_LOG_DATA_ONLY = 'true';
      logDataOnly(mockOptions);

      const calls = mockConsoleLog.mock.calls;
      expect(calls.some(call => call[0].includes('📤 Result:'))).toBe(true);
      expect(calls.some(call => call[0].includes('"price": 150.25'))).toBe(true);
    });

    it('should handle different result types', () => {
      process.env.FMP_TOOLS_LOG_DATA_ONLY = 'true';

      logDataOnly({ ...mockOptions, result: '{"json": "string"}' });
      logDataOnly({ ...mockOptions, result: 'plain string' });
      logDataOnly({ ...mockOptions, result: [{ id: 1 }, { id: 2 }] });

      expect(mockConsoleLog).toHaveBeenCalled();
    });
  });

  describe('logApiExecutionWithTiming', () => {
    const mockExecuteFn = jest.fn();
    const mockInput = { symbol: 'AAPL' };

    beforeEach(() => {
      mockExecuteFn.mockClear();
    });

    it('should execute function and return result', async () => {
      const expectedResult = { price: 150.25 };
      mockExecuteFn.mockResolvedValue(expectedResult);

      const result = await logApiExecutionWithTiming('testTool', mockInput, mockExecuteFn);
      expect(result).toEqual(expectedResult);
      expect(mockExecuteFn).toHaveBeenCalled();
    });

    it('should log when API logging is enabled', async () => {
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';
      mockExecuteFn.mockResolvedValue({ price: 150.25 });

      await logApiExecutionWithTiming('testTool', mockInput, mockExecuteFn);
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should log when data-only logging is enabled', async () => {
      process.env.FMP_TOOLS_LOG_DATA_ONLY = 'true';
      mockExecuteFn.mockResolvedValue({ price: 150.25 });

      await logApiExecutionWithTiming('testTool', mockInput, mockExecuteFn);
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';
      const error = new Error('API Error');
      mockExecuteFn.mockRejectedValue(error);

      await expect(logApiExecutionWithTiming('testTool', mockInput, mockExecuteFn)).rejects.toThrow(
        'API Error',
      );
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should measure execution time', async () => {
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';
      mockExecuteFn.mockResolvedValue({ price: 150.25 });

      const startTime = Date.now();
      await logApiExecutionWithTiming('testTool', mockInput, mockExecuteFn);
      const endTime = Date.now();

      const calls = mockConsoleLog.mock.calls;
      const executionTimeLog = calls.find(call => call[0].includes('⏱️  Execution Time:'));
      expect(executionTimeLog).toBeDefined();

      const executionTimeMatch = executionTimeLog![0].match(/Execution Time: (\d+)ms/);
      const loggedTime = parseInt(executionTimeMatch![1]);
      expect(loggedTime).toBeGreaterThanOrEqual(0);
      expect(loggedTime).toBeLessThanOrEqual(endTime - startTime + 10);
    });
  });

  describe('Token Estimation', () => {
    beforeEach(() => {
      process.env.FMP_TOOLS_LOG_API_RESULTS = 'true';
    });

    it('should handle various result types', () => {
      logApiExecution({ toolName: 'test', input: {}, result: null, executionTime: 100 });
      logApiExecution({ toolName: 'test', input: {}, result: 'test string', executionTime: 100 });
      logApiExecution({ toolName: 'test', input: {}, result: [1, 2, 3], executionTime: 100 });
      logApiExecution({
        toolName: 'test',
        input: {},
        result: { key: 'value' },
        executionTime: 100,
      });
      logApiExecution({ toolName: 'test', input: {}, result: 42, executionTime: 100 });

      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should handle edge cases', () => {
      logApiExecution({ toolName: 'test', input: {}, result: '', executionTime: 100 });
      logApiExecution({ toolName: 'test', input: {}, result: {}, executionTime: 100 });
      logApiExecution({ toolName: 'test', input: {}, result: [], executionTime: 100 });
      logApiExecution({
        toolName: 'test',
        input: {},
        result: 'AAPL MSFT $150.25',
        executionTime: 100,
      });

      expect(mockConsoleLog).toHaveBeenCalled();
    });
  });
});

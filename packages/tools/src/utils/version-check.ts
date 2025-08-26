/**
 * Checks if the installed version of @openai/agents is compatible
 * with this package. Throws an error if incompatible.
 */
export function checkOpenAIAgentsVersion(): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { tool } = require('@openai/agents');

    // Test if the tool function accepts the new API structure
    // This is a runtime check that will fail with older versions
    tool({
      name: 'test',
      description: 'test',
      parameters: { type: 'object', properties: {} },
      strict: true,
      execute: async () => 'test',
    });

    // If we get here, the version is compatible (silent success)
  } catch (error) {
    // If the tool creation fails, it's likely an incompatible version
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Incompatible @openai/agents version detected. ` +
        `This package requires version ^0.0.17 or higher due to breaking changes in the API. ` +
        `Please upgrade with: npm install @openai/agents@latest\n\n` +
        `Error details: ${errorMessage}`,
    );
  }
}

/**
 * Logs a warning if the version check fails but doesn't throw
 */
export function warnOpenAIAgentsVersion(): void {
  try {
    checkOpenAIAgentsVersion();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn('⚠️  Version compatibility warning:', errorMessage);
  }
}

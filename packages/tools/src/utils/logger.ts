/**
 * Logger utility for tools package
 * Controls logging of API results based on environment variable
 */

interface LogOptions {
  toolName: string;
  input: unknown;
  result: unknown;
  executionTime?: number;
}

/**
 * Check if API result logging is enabled via environment variable
 * Defaults to false if not set
 */
export function isApiLoggingEnabled(): boolean {
  return process.env.FMP_TOOLS_LOG_API_RESULTS === 'true';
}

/**
 * Check if data-only logging is enabled via environment variable
 * Defaults to false if not set
 */
export function isDataOnlyLoggingEnabled(): boolean {
  return process.env.FMP_TOOLS_LOG_DATA_ONLY === 'true';
}

/**
 * Estimate token count for LLM context (JSON-optimized)
 * JSON has many structural characters that count as single tokens
 */
function estimateTokenCount(text: string): number {
  // Try to parse as JSON first for better estimation
  try {
    const parsed = JSON.parse(text);
    return estimateTokenCountForData(parsed);
  } catch {
    // Not JSON, use text-based estimation
    return estimateTokenCountForText(text);
  }
}

/**
 * Estimate tokens for parsed JSON data
 */
function estimateTokenCountForData(data: unknown): number {
  if (data === null || data === undefined) {
    return 1; // null/undefined is typically 1 token
  }

  if (typeof data === 'string') {
    // Strings are typically tokenized by words/symbols
    // Financial data often has short strings like "AAPL", "USD", etc.
    return Math.ceil(data.length / 3); // More conservative for short strings
  }

  if (typeof data === 'number') {
    // Numbers are typically 1-2 tokens depending on size
    return data.toString().length > 10 ? 2 : 1;
  }

  if (typeof data === 'boolean') {
    return 1; // true/false are single tokens
  }

  if (Array.isArray(data)) {
    // Arrays: count structural tokens + content tokens
    let tokens = 2; // [ and ]
    for (const item of data) {
      tokens += estimateTokenCountForData(item);
      if (data.indexOf(item) < data.length - 1) {
        tokens += 1; // comma separator
      }
    }
    return tokens;
  }

  if (typeof data === 'object') {
    // Objects: count structural tokens + key-value pairs
    let tokens = 2; // { and }
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = (data as Record<string, unknown>)[key];

      // Key (quoted string)
      tokens += Math.ceil(key.length / 3);
      tokens += 2; // quotes around key

      // Colon separator
      tokens += 1;

      // Value
      tokens += estimateTokenCountForData(value);

      // Comma separator (except for last item)
      if (i < keys.length - 1) {
        tokens += 1;
      }
    }
    return tokens;
  }

  return 1; // fallback
}

/**
 * Estimate tokens for plain text (non-JSON)
 */
function estimateTokenCountForText(text: string): number {
  // For plain text, use a more conservative estimate
  // Consider that financial data often has numbers, symbols, and abbreviations
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokens = 0;

  for (const word of words) {
    if (/^\d+$/.test(word)) {
      // Pure numbers are typically 1-2 tokens
      tokens += word.length > 8 ? 2 : 1;
    } else if (/^[A-Z]+$/.test(word)) {
      // All caps (like stock symbols) are often single tokens
      tokens += 1;
    } else if (/^\$[\d,]+\.?\d*$/.test(word)) {
      // Currency amounts are typically 2-3 tokens
      tokens += 3;
    } else {
      // Regular words: roughly 3-4 characters per token
      tokens += Math.ceil(word.length / 3.5);
    }
  }

  return tokens;
}

/**
 * Get simple metadata about the result for LLM context
 */
function getResultInfo(result: unknown): string {
  if (result === null || result === undefined) {
    return 'null/undefined';
  }

  if (typeof result === 'string') {
    const tokenCount = estimateTokenCount(result);
    try {
      const parsed = JSON.parse(result);
      if (Array.isArray(parsed)) {
        return `JSON string (array of ${parsed.length} items, ~${tokenCount} tokens)`;
      }
    } catch {
      // Not JSON
    }
    return `string (${result.length} chars, ~${tokenCount} tokens)`;
  }

  if (Array.isArray(result)) {
    const jsonStr = JSON.stringify(result);
    const tokenCount = estimateTokenCount(jsonStr);
    return `array (${result.length} items, ~${tokenCount} tokens)`;
  }

  if (typeof result === 'object') {
    const jsonStr = JSON.stringify(result);
    const tokenCount = estimateTokenCount(jsonStr);
    return `object (~${tokenCount} tokens)`;
  }

  return typeof result;
}

/**
 * Log API tool execution details when enabled
 */
export function logApiExecution(options: LogOptions): void {
  if (!isApiLoggingEnabled()) {
    return;
  }

  const { toolName, input, result, executionTime } = options;

  console.log('\n' + '='.repeat(80));
  console.log(`🔧 FMP Tool Execution: ${toolName}`);
  console.log('='.repeat(80));

  console.log('\n📥 Input:');
  console.log(JSON.stringify(input, null, 2));

  const resultInfo = getResultInfo(result);

  console.log(`🔧 ${toolName}: ${resultInfo}`);

  if (executionTime !== undefined) {
    console.log(`\n⏱️  Execution Time: ${executionTime}ms`);
  }

  console.log('='.repeat(80) + '\n');
}

/**
 * Log data-only information for LLM context (when enabled)
 */
export function logDataOnly(options: LogOptions): void {
  if (!isDataOnlyLoggingEnabled()) {
    return;
  }

  const { result } = options;

  console.log('\n📤 Result:');
  if (typeof result === 'string') {
    try {
      // Try to parse and pretty-print if it's JSON
      const parsed = JSON.parse(result);
      console.log(JSON.stringify(parsed, null, 2));
    } catch {
      // If not JSON, log as-is
      console.log(result);
    }
  } else {
    console.log(JSON.stringify(result, null, 2));
  }

  console.log('='.repeat(80) + '\n');
}

/**
 * Log API tool execution with timing
 */
export async function logApiExecutionWithTiming<T>(
  toolName: string,
  input: unknown,
  executeFn: () => Promise<T>,
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await executeFn();
    const executionTime = Date.now() - startTime;

    logApiExecution({
      toolName,
      input,
      result,
      executionTime,
    });

    // Also log data-only info if enabled
    logDataOnly({
      toolName,
      input,
      result,
      executionTime,
    });

    return result;
  } catch (error) {
    const executionTime = Date.now() - startTime;

    // Log error case as well
    if (isApiLoggingEnabled()) {
      console.log('\n' + '='.repeat(80));
      console.log(`❌ FMP Tool Execution Error: ${toolName}`);
      console.log('='.repeat(80));
      console.log('\n📥 Input:');
      console.log(JSON.stringify(input, null, 2));
      console.log('\n❌ Error:');
      console.log(error instanceof Error ? error.message : String(error));
      console.log(`\n⏱️  Execution Time: ${executionTime}ms`);
      console.log('='.repeat(80) + '\n');
    }

    throw error;
  }
}

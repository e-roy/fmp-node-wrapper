// Shared types and utilities for FMP API wrapper

// Common error types
export class FMPError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'FMPError';
  }
}

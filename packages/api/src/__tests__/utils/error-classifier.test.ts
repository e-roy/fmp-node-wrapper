import { classifyError } from '../../utils/error-classifier';

describe('classifyError', () => {
  it('classifies 401 as auth', () => {
    const c = classifyError(401, 'Invalid API KEY');
    expect(c.errorType).toBe('auth');
    expect(c.message).toContain('FMP_API_KEY');
  });

  it('classifies 402 and 403 as plan-restricted', () => {
    expect(classifyError(402, 'nope').errorType).toBe('plan-restricted');
    expect(classifyError(403, 'nope').errorType).toBe('plan-restricted');
  });

  it('classifies plan-locked message patterns regardless of status', () => {
    expect(classifyError(200, 'Exclusive Endpoint: upgrade').errorType).toBe('plan-restricted');
    expect(
      classifyError(200, 'Special Endpoint : This endpoint is only for premium users.').errorType,
    ).toBe('plan-restricted');
    expect(classifyError(200, 'Please upgrade your plan').errorType).toBe('plan-restricted');
  });

  it('classifies 429 as rate-limit', () => {
    const c = classifyError(429, 'Limit Reach');
    expect(c.errorType).toBe('rate-limit');
    expect(c.message).toContain('rate limit');
  });

  it('classifies 404 as not-found', () => {
    expect(classifyError(404, 'nothing here').errorType).toBe('not-found');
  });

  it('classifies 400 as bad-request', () => {
    expect(classifyError(400, 'bad symbol').errorType).toBe('bad-request');
  });

  it('classifies status 0 (no HTTP response) as network', () => {
    expect(classifyError(0, 'ECONNREFUSED').errorType).toBe('network');
  });

  it('classifies unmapped 5xx as unknown', () => {
    expect(classifyError(500, 'boom').errorType).toBe('unknown');
  });

  it('falls back to a default message when none is provided', () => {
    expect(classifyError(500, '').message).toBe('Unknown error occurred');
  });
});

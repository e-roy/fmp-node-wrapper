const FMP = jest.fn().mockImplementation((config?: unknown) => ({ __mockFmp: true, config }));

jest.mock('fmp-node-api', () => ({ FMP }));

import { getFMPClient, configureFMPClient, resetFMPClient } from '@/client';

describe('client', () => {
  beforeEach(() => {
    FMP.mockClear();
    resetFMPClient();
  });

  it('creates an FMP client instance', () => {
    const client = getFMPClient();
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');
  });

  it('memoizes the client across calls (constructs FMP once)', () => {
    const a = getFMPClient();
    const b = getFMPClient();
    expect(a).toBe(b);
    expect(FMP).toHaveBeenCalledTimes(1);
  });

  it('configureFMPClient passes config and rebuilds on next use', () => {
    getFMPClient(); // build with default (undefined) config
    expect(FMP).toHaveBeenLastCalledWith(undefined);

    configureFMPClient({ apiKey: 'test-key' });
    getFMPClient();
    expect(FMP).toHaveBeenLastCalledWith({ apiKey: 'test-key' });
    expect(FMP).toHaveBeenCalledTimes(2);
  });

  it('resetFMPClient clears the cache so a new instance is built', () => {
    getFMPClient();
    resetFMPClient();
    getFMPClient();
    expect(FMP).toHaveBeenCalledTimes(2);
  });
});

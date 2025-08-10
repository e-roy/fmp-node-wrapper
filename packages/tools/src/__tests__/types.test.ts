jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({ __mockFmp: true })),
}));

import { getFMPClient } from '@/types';

describe('types.getFMPClient', () => {
  it('constructs and returns an FMP client instance', () => {
    const client = getFMPClient();
    expect(client).toEqual({ __mockFmp: true });

    const { FMP } = jest.requireMock('fmp-node-api');
    expect(FMP).toHaveBeenCalledTimes(1);
    expect(typeof FMP).toBe('function');
  });
});
